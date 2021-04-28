import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import {
  Favorite,
  FavoriteBorder,
  ShoppingCartOutlined,
  Star,
} from "@material-ui/icons";
import { addToCart, addToWishlist, db, removeFromWishlist } from "../firebase";
import { useHistory } from "react-router";
import { useGlobalContext } from "../context";
import { useStateValue } from "../StateProvider";

function ProductListItem({ inWishlist, productData, docId }) {
  const history = useHistory();

  const { setClickedDocId } = useGlobalContext();
  const [inFavorites, setInFavorites] = useState(false);
  const [{ user }] = useStateValue();

  const addToFavorites = async () => {
    setInFavorites(true);
    user && (await addToWishlist(user.uid, docId));
  };

  const removeFromFavorites = async () => {
    setInFavorites(false);
    user && (await removeFromWishlist(user.uid, docId));
  };

  useEffect(() => {
    if (inWishlist === true) {
      setInFavorites(true);
    }
  }, []);

  const goToProductPage = () => {
    localStorage.setItem("clickedDocId", docId);
    setClickedDocId(docId);
    docId && history.push(`/product_page/${docId}`);
  };

  const addToBag = async () => {
    if (!productData.cart?.includes(user?.uid)) {
      await addToCart(user.uid, docId);
    } else {
      history.push("/cart");
    }
  };

  

  return (
    <div className="list__item">
      <img src={productData.imageOne} />
      {inFavorites === false && (
        <IconButton onClick={addToFavorites}>
          <FavoriteBorder fontSize="small" />
        </IconButton>
      )}
      {inFavorites === true && (
        <IconButton onClick={removeFromFavorites}>
          <Favorite fontSize="small" color="error"></Favorite>
        </IconButton>
      )}
      <div className="product__details">
        <h3 onClick={goToProductPage} className="product__name">
          {productData.productName}
        </h3>
        <p className="list__itemRating">
          4.4
          <Star className="list__icon" />
        </p>
        <div className="product__price">{`Rs.${productData.productPrice}`}</div>
        <div className="product__btnContainer">
          <Button onClick={addToBag}>
            <ShoppingCartOutlined color="black" fontSize="small" />
            {`${
              productData.cart?.includes(user?.uid)
                ? "Go to cart"
                : "Add to cart"
            }`}
          </Button>
        </div>
      </div>
      <div className="listItem_details">{productData.productDetails}</div>
    </div>
  );
}

export default ProductListItem;
