import { Button, StylesProvider } from "@material-ui/core";
import logo from "../logo.png";
import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  LocalMallOutlined,
  PersonOutlineSharp,
  Search,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";
import "./Navbar.css";

import { Avatar, IconButton, makeStyles, Popover } from "@material-ui/core";
import { useGlobalContext } from "../context";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  popover: {
    width: "200px",
  },
  item: {
    "&:hover": {
      backgroundColor: "gainsboro",
      borderRadius: "10px",
    },
  },
}));

function Navbar() {
  const history = useHistory();
  const { setClickedDocId } = useGlobalContext();

  const [{ user }] = useStateValue();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [productSnapshot, setProductSnapshot] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    } else if (user === null) {
      history.push("/login");
    }
  };

  const goToHome = () => {
    if (window.location.pathname !== "/") {
      history.push("/");
    }
  };

  const search = () => {};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    getProducts();
  };

  const getProducts = (e) => {
    db.collection("Product")
      .orderBy("productName")
      .startAt(searchText)
      .onSnapshot((querySnashot) => {
        setProductSnapshot(querySnashot.docs);
      });
  };

  const goToProductPage = (docId) => {
    localStorage.setItem("clickedDocId", docId);
    setClickedDocId(docId);
    docId && history.push(`/product_page/${docId}`);
    setAnchorEl(null);
    setSearchText('');
  };

  return (
    <nav className="navbar">
      <img onClick={goToHome} className="navbar__logo" src={logo} />
      <p onClick={gotToSellerPage} className="navbar__btnBecomeSeller">
        Become a seller
      </p>
      <div onClick={search} className="nav__search">
        <Search fontSize="small" className="nav__searchIcon" />
        <input
          placeholder="Search"
          value={searchText}
          onChange={handleOnChange}
          onClick={handleClick}
        />
        <Popover
          id={id}
          open={open}
          disableAutoFocus={true}
          disableEnforceFocus={true}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div
            style={{
              padding: "10px",
              width: "100%",
            }}
          >
            {productSnapshot.length > 0 &&
              productSnapshot.map((value) => {
                return (
                  <div
                    key={value.id}
                    onClick={() => goToProductPage(value.id)}
                    className={classes.item}
                    style={{
                      padding: "10px",
                      width: "300px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      src={value.data()?.imageOne}
                      className={classes.small}
                    ></Avatar>
                    <div style={{ marginLeft: "10px", position: "relative" }}>
                      {value.data().productName}
                    </div>
                  </div>
                );
              })}
          </div>
        </Popover>
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
