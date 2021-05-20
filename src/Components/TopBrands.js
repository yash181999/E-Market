import React from "react";
import { useHistory } from "react-router";
import "./TopBrands.css";

function TopBrands() {
  const history = useHistory();

  return (
    <div className="topBrands">
      <h1>Top Brands</h1>
      <div className="topBrands__containt">
        <div
          id="samsung"
          onClick={() => history.push("/category_page/samsung")}
          className="topBrands__item"
        >
          <img
            className="topBrands__itemImage"
            src="https://pngimg.com/uploads/samsung_logo/samsung_logo_PNG14.png"
          />
        </div>
        <div
          id="apple"
          onClick={() => history.push("/category_page/apple")}
          className="topBrands__item"
        >
          <img
            className="topBrands__itemImage"
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png"
          />
        </div>
        <div
          id="dell"
          onClick={() => history.push("/category_page/dell")}
          className="topBrands__item"
        >
          <img
            className="topBrands__itemImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/600px-Dell_Logo.svg.png"
          />
        </div>
        <div
          id="hp"
          onClick={() => history.push("/category_page/hp")}
          className="topBrands__item"
        >
          <img
            className="topBrands__itemImage"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6f/HP_logo_630x630.png"
          />
        </div>
        <div
          id="lenovo"
          onClick={() => history.push("/category_page/lenovo")}
          className="topBrands__item"
        >
          <img
            className="topBrands__itemImage"
            src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Lenovo_Corporate_Logo.png"
          />
        </div>
      </div>
    </div>
  );
}

export default TopBrands;
