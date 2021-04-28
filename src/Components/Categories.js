import { Divider } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import "./Categories.css";



function Categories() {

  const history = useHistory();


   const goToMobileCategory = () => {
     history.push('/category_page/mobile')
   };

   const goToComputerCategory = () => {
     history.push('/category_page/computer')
   };

   const goToTabletCategory = () => {
     history.push('/category_page/tablet')
   };

   const goToAcessoriesCategory = () => {
     history.push('/category_page/acessories')
   };

  return (
    <div className="categories">
      <h1>Categories</h1>
      <div className="categories__containt">
        {/* Mobiles */}
        <div onClick = {goToMobileCategory} className="categories__item">
          <p>Mobiles</p>
          <img
            className="categories__itemImage"
            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000"
          />
        </div>

        {/* Computers */}

        <div onClick = {goToComputerCategory} className="categories__item">
          <p>Computers</p>
          <img
            className="categories__itemImage"
            src="https://rukminim1.flixcart.com/image/832/832/khdqnbk0/computer/e/6/n/apple-original-imafxfyq4agsgysn.jpeg?q=70"
          />
        </div>

        {/* Tablets */}
        <div onClick = {goToTabletCategory} className="categories__item">
          <p>Tablets</p>
          <img
            className="categories__itemImage"
            src="https://rukminim1.flixcart.com/image/832/832/k0lbdzk0pkrrdj/tablet/h/d/k/apple-muqy2hn-a-original-imaff848szekvdsz.jpeg?q=70"
          />
        </div>

        {/* Acessories */}
        <div onClick = {goToAcessoriesCategory} className="categories__item">
          <p>Acessories</p>
          <img
            className="categories__itemImage"
            src="https://rukminim1.flixcart.com/image/832/832/kavefm80/headphone/h/a/s/wh-ch710n-sony-original-imafscdmhsnq77yw.jpeg?q=70"
          />
        </div>


      </div>
    </div>
  );
}

export default Categories;
