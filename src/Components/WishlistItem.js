import { IconButton } from "@material-ui/core";
import { Delete, Star } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import { useGlobalContext } from "../context";
import { removeFromWishlist } from "../firebase";
import { useStateValue } from "../StateProvider";

function WishlistItem({docId, productData }) {

  const [{user}]  = useStateValue();
    const { setClickedDocId } = useGlobalContext();
   const history = useHistory();

   const removeFromFavorites = async() => {
    user && await removeFromWishlist(user.uid,docId);
   }

const goToProductPage = () => {
  localStorage.setItem("clickedDocId", docId);
  setClickedDocId(docId);
  docId && history.push(`/product_page/${docId}`);
};

  return (
    productData && (
      <div className="wishlistItem">
        <img src={productData.imageOne} />
        <div className="wishlistDetails">
          <p onClick  = {goToProductPage} className='productName'>{productData.productName}</p>
          <p className="list__itemRating">
            4.4
            <Star className="list__icon" />
          </p>
          <h4>{`Rs. ${productData.productPrice}`}</h4>
        </div>

        <IconButton onClick = {removeFromFavorites} style={{ height: "40px", width: "40px" }}>
          <Delete></Delete>
        </IconButton>
      </div>
    )
  );
}

export default WishlistItem;
