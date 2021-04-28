import React, { useEffect, useState } from "react";
import CartItem from "../Components/CartItem";
import OrderItem from "../Components/OrderItem";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";

function Orders() {
  const [cartData, setCartData] = useState([]);

  const [{ user }] = useStateValue();

  const getOrderData = () => {
    user &&
      db
        .collection("Product")
        .where("orders", "array-contains", user.uid)
        .onSnapshot((value) => {
          setCartData(value.docs);
        });
  };

  useEffect(() => {
    getOrderData();
  }, [user]);

  return (
    <div className="cart">
      <div className="cartItems">
        <h3>{`My Orders (${cartData.length})`}</h3>
        {user &&
          cartData &&
          cartData.map((value) => {
            return (
                <OrderItem
                  key={value.id}
                  docId={value.id}
                  productData={value.data()}
                />
            
            );
          })}
      </div>
    </div>
  );
}

export default Orders;
