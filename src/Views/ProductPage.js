import { Button, IconButton, MobileStepper, useTheme } from "@material-ui/core";
import {
  ArrowLeft,
  Favorite,
  FavoriteBorder,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocalOffer,
  ShoppingCartOutlined,
  Star,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SwipeableViews from "react-swipeable-views";
import Reviews from "../Components/Reviews";
import { useGlobalContext } from "../context";
import { addToCart, addToWishlist, db, removeFromWishlist } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./ProductPage.css";

function ProductPage() {
  const { clickedDocId } = useGlobalContext();
  const history = useHistory();
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [{ user }] = useStateValue();
  const [docId, setDocId] = useState(null);
  const [inFavorites, setInFavorites] = useState(false);

  const handleNext = () => {
    setIndex(1);
  };

  const handleBack = () => {
    setIndex(0);
  };

  const getProductData = () => {
    db.collection("Product")
      .doc(clickedDocId)
      .onSnapshot((value) => {
        setProductData(value.data());
        setDocId(value.id);
      });
  };

  useEffect(() => {
    getProductData();
    if (productData) {
      let array = [productData.imageOne, productData.imageTwo];
      setImages(array);
    }
  }, [clickedDocId]);

  const addToFavorites = async () => {
    setInFavorites(true);
    user && (await addToWishlist(user.uid, docId));
  };

  const removeFromFavorites = async () => {
    setInFavorites(false);
    user && (await removeFromWishlist(user.uid, docId));
  };

  const addToBag = async () => {
    if (!productData.cart?.includes(user?.uid)) {
      await addToCart(user.uid, docId);
    } else {
      history.push("/cart");
    }
  };

  return (
    productData &&
    docId && (
      <>
        <div className="productPage">
          <div className="productPage__imageContainer">
            <img
              alt={index}
              src={index === 0 ? productData.imageOne : productData.imageTwo}
            ></img>
            <div className="stepper">
              <IconButton onClick={handleBack} disabled={index === 0}>
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton onClick={handleNext} disabled={index === 1}>
                <KeyboardArrowRight />
              </IconButton>
            </div>
            <div className="product__btnContainer">
              <Button onClick={addToBag} fullWidth>
                <ShoppingCartOutlined color="black" fontSize="small" />
                {`${
                  productData.cart?.includes(user?.uid)
                    ? "Go to cart"
                    : "Add to cart"
                }`}
              </Button>
              <Button fullWidth>Buy Now</Button>
            </div>
          </div>
          {(!productData.wishlist ||
            !productData.wishlist?.includes(user?.uid)) && (
            <IconButton
              style={{ width: "40px", height: "40px" }}
              onClick={addToFavorites}
            >
              <FavoriteBorder fontSize="small" />
            </IconButton>
          )}
          {productData?.wishlist?.includes(user?.uid) && (
            <IconButton
              style={{ width: "40px", height: "40px" }}
              onClick={removeFromFavorites}
            >
              <Favorite fontSize="small" color="error"></Favorite>
            </IconButton>
          )}
          <div className="prodcutPage__detailsContainer">
            <h3>{productData.productName}</h3>
            <p className="list__itemRating">
              4.4
              <Star className="list__icon" />
            </p>
            <div className="product__price">{`Rs.${productData.productPrice}`}</div>

            <br></br>
            <h4>Product Details</h4>
            <br></br>
            <p>{productData.productDetails}</p>

            <br></br>
            <br></br>
            <div className="productOffers">
              <h3>Available Offers</h3>
              <p>
                <LocalOffer
                  className="offer__icon"
                  color="inherit"
                  fontSize="small"
                />{" "}
                Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit
                CardT&C
              </p>
              <p>
                <LocalOffer
                  className="offer__icon"
                  color="inherit"
                  fontSize="small"
                />{" "}
                Bank OfferFlat ₹75 discount on UPI transaction above ₹10,000 in
                a single cart valueT&C
              </p>
              <p>
                <LocalOffer
                  className="offer__icon"
                  color="inherit"
                  fontSize="small"
                />{" "}
                Bank OfferFlat ₹75 discount on RuPay transaction above ₹7,500/-
                in a single cart value.T&C
              </p>
            </div>
          </div>
        </div>
        <div className="reviews__container">
          <h2>Reviews and Ratings</h2>
          <Reviews></Reviews>
          <Reviews></Reviews>
          <Reviews></Reviews>
          <Reviews></Reviews>
          <Reviews></Reviews>
        </div>
      </>
    )
  );
}

export default ProductPage;
