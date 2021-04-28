import { Button, IconButton } from "@material-ui/core";
import { Add, Done, Minimize, Remove, Star } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import CartItem from "../Components/CartItem";
import { useGlobalContext } from "../context";
import { addToOrders, db, removeFromCart } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Cart.css";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
    outline: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
  },
  tick: {
    borderRadius: "100px",
    height: "50px",
    width: "50px",
    backgroundColor: "green",
    color: "white",
    display: "grid",
    placeItems: "center",
  },
  heading: {
    marginLeft: "10px",
  },
}));

function Cart() {
  const [cartData, setCartData] = useState([]);

  const [{ user }] = useStateValue();

  const { totalPrice, setTotalPrice } = useGlobalContext();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCartData = () => {
    user &&
      db
        .collection("Product")
        .where("cart", "array-contains", user.uid)
        .onSnapshot((value) => {
          setCartData(value.docs);
        });
  };

  const clearCart = async () => {
    if (user) {
      for (let i = 0; i < cartData.length; i++) {
        await removeFromCart(user.uid, cartData[i].id);
      }
    }
  };

  const addToMyOrders = async () =>{
     if(user) {
       for(let i=0; i<cartData.length; i++) {
         await addToOrders(user.uid, cartData[i].id);
       }
     }
  }

  const openModal = () => {

    addToMyOrders();
    handleOpen();
    clearCart();
  };

  const getTotal = (cartData) => {
    return cartData?.reduce(
      (amount, item) => item.data().productPrice + amount,
      0
    );
  };

  useEffect(() => {
    getCartData();
  }, [user]);

  return (
    <div className="cart">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.tick}>
              <Done></Done>
            </div>
            <div className={classes.heading}>Your order has been placed</div>
          </div>
        </Fade>
      </Modal>

      <div className="cartItems">
        <h3>{`My Cart (${cartData.length})`}</h3>
        {user &&
          cartData &&
          cartData.map((value) => {
            return (
              <CartItem
                key={value.id}
                docId={value.id}
                productData={value.data()}
              />
            );
          })}
      </div>

      <div className="cartTotal">
        <h3>Price Details</h3>

        <div className="cartTotal__details">
          <div className="cartTotal__detailItem">
            <p>Price</p>
            <p>{`Rs.${getTotal(cartData)}`}</p>
          </div>
          <div className="cartTotal__detailItem">
            <p>Delivery Charges</p>
            <p>FREE</p>
          </div>
          <div className="cartTotal__totalAmount">
            <p>Total Amount</p>
            <p>{`Rs.${getTotal(cartData)}`}</p>
          </div>
          <Button disabled  = {cartData.length === 0} onClick={openModal} fullWidth>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
