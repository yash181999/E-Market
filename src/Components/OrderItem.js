import { Star } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import { useGlobalContext } from "../context";
import { useStateValue } from "../StateProvider";

function OrderItem({ docId, productData }) {
  const history = useHistory();
  const [{ user }] = useStateValue();
  const { setClickedDocId } = useGlobalContext();

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
          <p onClick={goToProductPage} className="productName">
            {productData.productName}
          </p>
          <p className="list__itemRating">
            4.4
            <Star className="list__icon" />
          </p>
          <h4>{productData.productPrice}</h4>
        </div>
      </div>
    )
  );
}

export default OrderItem;
