import React from "react";
import styles from "./shopby.module.scss";
const ShopBy = () => {
  return (
    <div className={styles.shopbyContainer}>
      <h1>SHOP BY PRICE</h1>
      <div className={styles.shopbyContent}>
        <div className={styles.shopbyWrapper}>
          <div className={styles.shopbyCat}>
            <h6>under 10k</h6>
          </div>
          <div className={styles.shopbyCat}>
            <h6>under 15k</h6>
          </div>
          <div className={styles.shopbyCat}>
            <h6>under 20k</h6>
          </div>
          <div className={styles.shopbyCat}>
            <h6>under 50k</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBy;
