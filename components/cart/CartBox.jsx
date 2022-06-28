import Image from "next/image";
import React from "react";
import styles from "../../styles/cardBox.module.scss";
import Braclet from "/public/Braclet.svg";
import StarOutlined from "/public/StarOutlined.svg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

const CartBox = ({
  first,
  productData,
  handleRemove,
  handleReduce,
  addToCart,
}) => {
  console.log(productData);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  if (isMobile) {
    return (
      <div className={styles.cardContainerMob}>
        <div className={styles.cardContainerMobWrapper}>
          <div className={styles.cardContainerMobLeft}>
            <Image
              src={productData.images[1]}
              height="60%"
              width="100%"
              objectFit="cover"
            />
          </div>
          <div className={styles.cardContainerMobRight}>
            <h1 className={styles.RightName}>{productData?.name}</h1>
            <span className={styles.prodId}>{productData._id}</span>

            <div className={styles.RatingDiv}>
              <span>4.5</span>
              <Image src={StarOutlined} width="15" height="15"></Image>
            </div>
            <div className={styles.PriceDiv}>
              <span className={styles.original}> {productData.amount}/-</span>
              <span className={styles.discounted}>{productData.amount}/-</span>
              <span className={styles.percentOff}>50%</span>
            </div>
            <span className={styles.offerAppd}>1 offer applied</span>
            <div className={styles.bottomDiv}>
              <div className={styles.QtnDiv}>
                Qty
                <select name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <button className={styles.RemoveBtn}>
                <RiDeleteBin5Line
                  style={{
                    color: "rgba(175, 147, 147, 1)",
                    display: "inline-block",
                    marginRight: 5,
                  }}
                />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainerLeft}>
        <Image
          src={productData.images[1]}
          height="110%"
          width="110%"
          objectFit="contain"
        />
        <div className={styles.itemTitle}>
          <h4 className={styles.itemName}>{productData?.name}</h4>
          <span className={styles.itemID}>{productData?._id}</span>
        </div>
      </div>
      <div className={styles.cardContainerMid}>
        <RiDeleteBin5Line
          onClick={() => {
            handleRemove(productData._id);
          }}
          style={{ color: "rgba(70, 4, 4, 1)", marginRight: 5 }}
        />
        <div className={styles.countDiv}>
          <div
            className={styles.operator}
            onClick={() => {
              handleReduce(productData._id);
            }}
          >
            -
          </div>
          <div className={styles.count}>{productData.count}</div>
          <div
            className={styles.operator}
            onClick={() => {
              addToCart(productData._id);
            }}
          >
            +
          </div>
        </div>
      </div>
      <div className={styles.cardContainerRight}>
        <span className={styles.oldPrice}>{productData.amount}/-</span>
        <div className={styles.priceWrapper}>
          <span className={styles.newPrice}>{productData.amount}/-</span>
          <span className={styles.discount}>50% off</span>
        </div>
      </div>
    </div>
  );
};

export default CartBox;
