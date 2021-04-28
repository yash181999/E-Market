import { Button } from "@material-ui/core";
import { Favorite, FavoriteBorder, Star } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ProductListItem from "../Components/ProductListItem";
import { db } from "../firebase";
import "./CategoryPage.css";
import Shimmer from "react-shimmer-effect";
import { useStateValue } from "../StateProvider";

function CategoryPage() {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState();
  const [sortBy, setSortBy] = useState("asc");
  const [category, setCategory] = useState(null);
  const [{ user }] = useStateValue();
  const [heading,setHeading] = useState('');

  const priceLowToHigh = () => {
    setSortBy("asc");
  };

  const priceHighToLow = () => {
    setSortBy("desc");
  };

  const getMobiles =  () => {
    setLoading(true);
     db
      .collection("Product")
      .where("productCategory", "==", "Mobile")
      .orderBy("productPrice", sortBy)
      .onSnapshot((value) => {
        setMobiles(value.docs);
      });
      setHeading('Mobile')
    setLoading(false);
  };

  const getComputers =  () => {
    setLoading(true);
     db
      .collection("Product")
      .where("productCategory", "==", "Computer")
      .orderBy("productPrice", sortBy)
      .onSnapshot((value) => {
        setMobiles(value.docs);
      });
      setHeading("Computers");
    setLoading(false);
  };

  const getTablets =  () => {
    setLoading(true);
     db
      .collection("Product")
      .where("productCategory", "==", "Tablet")
      .orderBy("productPrice", sortBy)
      .onSnapshot((value) => {
        setMobiles(value.docs);
      });
      setHeading("Tablets");
    setLoading(false);
  };

  const getAcessories =  () => {
    setLoading(true);
     db
      .collection("Product")
      .where("productCategory", "==", "Acessories")
      .orderBy("productPrice", sortBy)
      .onSnapshot((value) => {
        setMobiles(value.docs);
      });
      setHeading("Acessories");
    setLoading(false);
  };


  useEffect(() => {
    let location = window.location.pathname;
    console.log("locaiton : ", location);

    if (location === "/category_page/mobile") getMobiles();
    else if (location === "/category_page/computer") getComputers();
    else if (location === "/category_page/tablet") getTablets();
    else if (location === "/category_page/acessories") getAcessories();
  }, [sortBy]);

  return (
    <div className="categoryPage">
      <div className="categoryPage__head">
        <h4>{`Showing results for ${heading}`}</h4>
      </div>
      <br></br>
      <div className="categoryPage__sort">
        <strong>Sort by -</strong>
        <p
          onClick={priceLowToHigh}
          className={`${sortBy === "asc" && "categoryPage__sort__border"}`}
        >
          Price Low to high
        </p>
        <p
          onClick={priceHighToLow}
          className={`${sortBy === "desc" && "categoryPage__sort__border"}`}
        >
          Price High to low
        </p>
      </div>

      {!loading ? (
        mobiles.map((value) => {
          return (
            <ProductListItem
              key={value.id}
              docId={value.id}
              inWishlist={
                value.data().wishlist?.includes(user.uid) ? true : false
              }
              productData={value.data()}
            ></ProductListItem>
          );
        })
      ) : (
        <div>
          <Shimmer>
            <div className="shimmer__box"></div>
            <br></br>
            <div className="shimmer__box"></div>
          </Shimmer>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
