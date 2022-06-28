import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import SliderImage from "react-zoom-slider";
import { Select } from "@chakra-ui/react";
import styles from "./Product.module.scss";
import { BACKEND_API } from "../../../cred";

export default function Product({ product }) {
  console.log(product);
  const [kt, setKt] = useState(product?.purity);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.userData != null;
  const [addingToCart, setAddingToCart] = useState(false);
  const router = useRouter();
  const rating = 3;

  const addToCart = async (id) => {
    console.log(id, user?.userData.savedUser?._id);
    try {
      const res = await axios.post(`${BACKEND_API}/addtocart`, {
        productId: id,
        userId: user?.userData.savedUser?._id,
      });
      setAddingToCart(true);

      if (res.status == 200) {
        setAddingToCart(false);
        router.push("/cart");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddtoCart = async (id) => {
    console.log(id);
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      try {
        for (let i = 0; i < quantity; i++) {
          addToCart(id);
        }
      } catch (error) {
        console.log(error.message);
      }
      console.log("called!");
    }
  };

  return (
    <div className={styles.Product}>
      {/* slider */}
      <div className={styles.ProductLeft}>
        <div className={styles.ProductLeftShowBelow800}>
          <h1>{product?.name}</h1>
          <hr />
        </div>
        {product?.images && (
          <SliderImage
            direction="right"
            width="90%"
            data={product?.images?.map((p) => {
              return { image: p, text: "img" };
            })}
          />
        )}
      </div>
      {/* product info */}
      <div className={styles.ProductRight}>
        <div className={styles.ProductRightHide}>
          <h1>{product?.name}</h1>
          <hr />
        </div>
        <div className={styles.ProductRightTop}>
          <div className={styles.ProductRightTopLeft}>
            <div className={styles.ProductRightTopLeftTop}>
              <label className={styles.ProductRightTopLeftTopPrice}>
                Price:
              </label>
              <label className={styles.ProductRightTopLeftTopData}>
                {" "}
                {product?.amount}
              </label>
            </div>
            <div className={styles.ProductRightTopLeftDown}>
              <span className={styles.ProductRightTopLeftDownPrice}>
                {" "}
                {product?.amount}
              </span>
              <label className={styles.ProductRightTopLeftDownOff}>
                (50% OFF)
              </label>
            </div>
          </div>
          <div className={styles.ProductRightTopRight}>
            {new Array(rating).fill("").map((j) => (
              <Image
                height="25px"
                width="25px"
                src="/SingleProduct/filled.svg"
              />
            ))}
            {new Array(5 - rating).fill("").map((j) => (
              <Image
                height="25px"
                width="25px"
                src="/SingleProduct/empty.svg"
              />
            ))}
          </div>
        </div>
        <div className={styles.ProductRightDescription}>
          <p>Description:</p>
          <span>{product?.description}</span>
        </div>
        <div className={styles.ProductRightSelection}>
          <div className={styles.ProductRightSelectionLeft}>
            <Select
              className={styles.options}
              value={kt}
              onChange={(e) => {
                setKt(e.target.value);
              }}
            >
              <option value={product?.purity}> {product?.purity} kt</option>
            </Select>
          </div>
          <div className={styles.ProductRightSelectionRight}>
            <label htmlFor="qty">QTY:</label>
            <span id="qty">
              <button
                onClick={() => setQuantity(quantity - 1)}
                className={styles.Minus}
              >
                -
              </button>
              <button className={styles.Mid}>{quantity}</button>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className={styles.Plus}
              >
                +
              </button>
            </span>
          </div>
        </div>
        <div className={styles.ProductRightButton}>
          <button
            onClick={() => handleAddtoCart(product._id)}
            disabled={addingToCart}
          >
            {addingToCart ? "Adding to cart..." : "ADD TO CART"}
          </button>
          <div>
            <span className={styles.Icon}>
              <Image
                alt="share"
                height="25px"
                width="25px"
                src="/SingleProduct/share.svg"
              />
            </span>
            <span className={styles.Icon}>
              <Image
                alt="share"
                height="25px"
                width="25px"
                src="/SingleProduct/Vector.svg"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
