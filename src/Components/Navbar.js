import { Button } from "@material-ui/core";
import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  LocalMallOutlined,
  PersonOutlineSharp,
  Search,
} from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";
import "./Navbar.css";

function Navbar() {
  const history = useHistory();
  const [{ user }] = useStateValue();
  const gotToSellerPage = () => {
    if (window.location.pathname !== "/seller_account" && user) {
      history.push("/seller_account");
    } else if (window.location.pathname !== "/seller_account" && !user) {
      history.replace("/login");
    }
  };

  const goToWishlist = () => {
    if (window.location.pathname !== "/wishlist") {
      history.push("/wishlist");
    }
  };

  const goToCart = () => {
    if (window.location.pathname !== "/cart") {
      history.push("/cart");
    }
  };

  const goToProfile = () => {
    if (window.location.pathname !== "/profile" && user !== null) {
      history.push("/profile");
    }
    else if (user === null) {
      history.push("/login");
    }
  };

  return (
    <nav className="navbar">
      <img
        className="navbar__logo"
        src="https://aartisto.com/wp-content/uploads/2020/11/myntra-1200x675.png"
      />
      <p onClick={gotToSellerPage} className="navbar__btnBecomeSeller">
        Become a seller
      </p>
      <div className="nav__search">
        <Search fontSize="small" className="nav__searchIcon" />
        <input placeholder="Search" />
      </div>

      <div className="nav__right">
        <div onClick={goToProfile} className="nav__rightItem">
          <PersonOutlineSharp />
          <p>Profile</p>
        </div>
        <div onClick={goToWishlist} className="nav__rightItem">
          <FavoriteBorder />
          <p>Wishlist</p>
        </div>
        <div onClick={goToCart} className="nav__rightItem">
          <LocalMallOutlined />
          <p>Cart</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
