import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./OrderDetail.module.scss";
const OrderDetailsBox = ({ isCart, cartMain }) => {
  console.log(cartMain);
  const [totalPrice, setTotalPrice] = useState(0);
  const findTotal = () => {
    var totalPrice = 0;

    cartMain?.forEach((item) => {
      totalPrice += item?.count * item?.amount;
    });
    setTotalPrice(totalPrice);
  };
  useEffect(() => {
    findTotal();
  }, [cartMain]);
  return (
    <div className={styles.OrderDetailsBox}>
      <div className={styles.RightWrapper}>
        <div className={styles.RightTop}>order details</div>

        {isCart === true && (
          <div className={styles.PromoDiv}>
            <h5>promo code</h5>
            <div className={styles.PromoWrapper}>
              <input type="text" placeholder="Enter Promo Code" />
              <button>apply</button>
            </div>
          </div>
        )}
        <div className={styles.PriceDiv}>
          <div className={styles.PriceComp}>
            <span>Price({cartMain?.length} items) :</span>
            <span className={styles.BoldPrice}>{totalPrice}/-</span>
          </div>
          <div className={styles.PriceComp}>
            <span>Discount :</span>
            <span className={styles.BoldPrice}>33,750/-</span>
          </div>
        </div>
        <div className={styles.GrandTotal}>
          <span>Grandtotal:</span>
          <span>{totalPrice}/-</span>
        </div>

        {isCart === true && (
          <button className={styles.PlaceOrder}>
            {" "}
            <a href="/checkout" target="_blank">
              {" "}
              place order
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsBox;
