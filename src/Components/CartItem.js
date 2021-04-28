import { Button, IconButton } from "@material-ui/core";
import { Add, Remove, Star } from "@material-ui/icons";
import React from "react";
import { removeFromCart } from "../firebase";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router";
import { useGlobalContext } from "../context";


function CartItem({ docId, productData }) {
  const [{ user }] = useStateValue();
    const { setClickedDocId } = useGlobalContext();
    const history = useHistory();

  const remove = async () => {
    await removeFromCart(user.uid, docId);
  };

   const goToProductPage = () => {
     localStorage.setItem("clickedDocId", docId);
     setClickedDocId(docId);
     docId && history.push(`/product_page/${docId}`);
   };



  return (
    productData && (
      <div className="cartItem__product">
        <img src={productData.imageOne} />
        <div className="cartItem__productDetials">
          <p onClick = {goToProductPage} className = 'productName'>{productData.productName}</p>
          <p className="list__itemRating">
            4.4
            <Star className="list__icon" />
          </p>
          <h4>{productData.productPrice}</h4>
          <div className="cartItem__bottom">
            {/* <div className="cartItem__quantity">
              <IconButton>
                <Remove fontSize="small"></Remove>
              </IconButton>
              <p>1</p>
              <IconButton>
                <Add fontSize="small"></Add>
              </IconButton>
            </div> */}

            <Button onClick={remove}>Remove</Button>
          </div>
        </div>
      </div>
    )
  );
}

export default CartItem;
