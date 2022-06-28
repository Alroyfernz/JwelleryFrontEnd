import React, { useState } from "react";
import styles from "../styles/ProductCard.module.scss";
import { AiFillHeart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";

const ProductCard = ({ item, large }) => {
  console.log(item);
  const [isShowMore, setIsShopMore] = useState(false);
  const [like, setLike] = useState(false);
  return (
    <div
      className={[
        styles.cardContainer,
        large ? styles.largeCard : styles.smallCard,
      ].join(" ")}
    >
      <span
        className={styles.like}
        onMouseOver={() => {
          setLike(true);
        }}
        onMouseLeave={() => {
          setLike(false);
        }}
      >
        {like ? (
          <AiFillHeart className={styles.hoverHeartIcon} />
        ) : (
          <AiOutlineHeart className={styles.heartIcon} />
        )}
      </span>
      <div className={styles.cardTop}>
        <Image
          onMouseOver={() => {
            setIsShopMore(true);
          }}
          onMouseLeave={() => {
            setIsShopMore(false);
          }}
          src={item.img ?? item.images[1]}
          alt="prodxt"
          layout="fill"
          className={styles.productImage}
        />
      </div>
      <div className={styles.cardBottom} style={{ position: "relative" }}>
        <span
          className="subText"
          style={{
            top: "-10px",
            left: "0",
            display: isShowMore ? "block" : "none",
            zIndex: "44",
            textAlign: "center",
            transition: "all 0.3s",
            color: "#fff",
            position: "absolute",
            backgroundColor: "#460404",
            width: "100%",
            height: "fit-content",
            padding: "6px 12px",
          }}
        >
          SHOP NOW
        </span>
        <h4 className={styles.productName}>{item?.name} </h4>
        <div className={styles.price}>
          <span className={styles.original}>
            <BiRupee />
            {item?.original ?? item.amount - 2000}
          </span>
          <span className={styles.discounted}>
            <BiRupee />
            {item?.discounted ?? item.amount}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
