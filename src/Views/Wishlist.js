import { Button, IconButton } from "@material-ui/core";
import { Delete, Star } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import WishlistItem from "../Components/WishlistItem";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Wishlist.css";

function Wishlist() {
  const [wishlistData, setWishlistData] = useState([]);
  const [{ user }] = useStateValue();

  const getWishlistData = () => {
    user &&
      db
        .collection("Product")
        .where("wishlist", "array-contains", user.uid)
        .onSnapshot((value) => {
          setWishlistData(value.docs);
        });
  };

  useEffect(() => {
    getWishlistData();
  }, [user]);

  return (
    <div className="wishlist">
      <h2>My Wishlist (8)</h2>
      {wishlistData.length > 0 &&
        user &&
        wishlistData.map((value) => {
          return <WishlistItem key={value.id} docId = {value.id} productData = {value.data()}/>
        })}
    </div>
  );
}

export default Wishlist;
