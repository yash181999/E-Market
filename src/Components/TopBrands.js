import React from 'react'
import { useHistory } from 'react-router';
import './TopBrands.css'



function TopBrands() {

   const history = useHistory();

  

    return (
      <div className="topBrands">
        <h1>Top Brands</h1>
        <div className="topBrands__containt">
          <div onClick={() => {}} className="topBrands__item">
            <img
              className="topBrands__itemImage"
              src="https://pngimg.com/uploads/samsung_logo/samsung_logo_PNG14.png"
            />
          </div>
          <div className="topBrands__item">
            <img
              className="topBrands__itemImage"
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png"
            />
          </div>
          <div className="topBrands__item">
            <img
              className="topBrands__itemImage"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/600px-Dell_Logo.svg.png"
            />
          </div>
          <div className="topBrands__item">
            <img
              className="topBrands__itemImage"
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/HP_logo_630x630.png"
            />
          </div>
          <div className="topBrands__item">
            <img
              className="topBrands__itemImage"
              src="https://1000logos.net/wp-content/uploads/2017/06/logo_Sony.png"
            />
          </div>
        </div>
      </div>
    );
}

export default TopBrands
