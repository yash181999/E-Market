import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import HomeCarousal from "../Components/HomeCarousal";
import TopBrands from "../Components/TopBrands";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Caruosal */}
      <HomeCarousal />
      {/* Categories */}
      <Categories />
      {/* Top Brands */}
      <TopBrands />

      
    </div>
  );
}

export default Home;
