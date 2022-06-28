import React, { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import styles from "../styles/cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import useLocal from "../hooks/useLocal";
import { AiOutlineMinus } from "react-icons/ai";
import { CgCloseR } from "react-icons/cg";
import { BACKEND_API } from "../cred";
import EmptyCart from "/public/EmptyCart.png";
import { fetchCart } from "../redux/Actions/CartActions";
import axios from "axios";
import { AiFillHome } from "react-icons/ai";
import { HiArrowSmLeft } from "react-icons/hi";
import Link from "next/link";
import { useQuery } from "react-query";

import Image from "next/image";
import CartBox from "../components/cart/CartBox";
import OrderDetailsBox from "../components/cart/OrderDetailsBox";

const Cart = () => {
  const { productList } = useSelector((state) => state.cart);
  const { localValue } = useLocal();
  const [loader, setLoader] = useState(false);
  const [cartMain, setCartMain] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const cartTitle = [
    "Product Name",
    "Unit Price",
    "Quantity",
    "Total",
    "Remove",
  ];
  const handleReduce = async (id) => {
    setLoader(true);
    try {
      const res = await axios.post(`${BACKEND_API}/reduceCart`, {
        userId: user.userData?.savedUser?._id,
        productId: id,
      });

      if (res.status == 200) setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (id) => {
    setLoader(true);
    try {
      const res = await axios.post(`${BACKEND_API}/removeFromCart`, {
        userId: user.userData?.savedUser?._id,
        productId: id,
      });

      if (res.status == 200) {
        setLoader(false);
        if (cartMain.length == 1) window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCount = (items) => {
    console.log(items);
    console.log("count handle");
    if (items?.length == 0) {
      console.log("Empty");
      return;
    }
    console.log("aila re?");
    const countMap = new Map();
    const mainMap = new Map();
    items?.forEach((item) => {
      if (countMap.has(item._id)) {
        var count = countMap.get(item._id);
        countMap.set(item._id, count + 1);
      } else {
        countMap.set(item._id, 1);
      }

      mainMap.set(item._id, item);
    });
    const newArr = [];
    countMap.forEach((value, key) => {
      newArr.push({ id: key, count: value });
    });
    newArr.forEach((element, index) => {
      const entire = mainMap.get(element.id);
      newArr[index] = { ...entire, count: element.count };
    });
    console.log(newArr, "final arr");
    setCartMain(newArr);
  };
  const addToCart = async (id) => {
    setLoader(true);

    console.log(id);
    try {
      const res = await axios.post(`${BACKEND_API}/addtocart`, {
        productId: id,
        userId: user.userData.savedUser._id,
      });

      if (res.status == 200) {
        setLoader(false);
        router.push("/cart");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      console.log("called");
      // if (user.userData == null) return;
      // fetchCart(dispatch, user?.userData?.savedUser._id);
      try {
        const res = await axios.get(
          `${BACKEND_API}/user/${user?.userData?.savedUser._id}`
        );
        console.log(res.data.data.cart);

        handleCount(res.data.data.cart);
        setCartItems(res.data.data.cart);

        dispatch({
          type: "FETCH_PRODUCTS",
          payload: res.data.cart,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    //fetch cart items
    dispatch(fetchCart(user.userData?.savedUser?._id));

    console.log("called from UE");
    fetchCartItems();
  }, [loader]);
  const summaryData = [
    {
      key: "Cart Sub Total:",
      value: () => {
        var totalPrice = 0;
        console.log(cartMain);
        cartMain?.forEach((item) => {
          totalPrice += item?.count * item?.amount;
        });
        console.log(totalPrice);
        return totalPrice;
      },
    },
    {
      key: "SCST:",
      value: "166.11",
    },
    {
      key: "CGST:",
      value: "166.11",
    },
    {
      key: "Total Cart Amount:",
      value: () => {
        var totalPrice = 0;
        console.log(cartMain);
        cartMain?.forEach((item) => {
          totalPrice += item?.count * item?.amount;
        });
        console.log(totalPrice);
        return totalPrice;
      },
    },
  ];

  if (cartMain?.length == 0) {
    return (
      <div className={styles.emptyPar}>
        <div className={styles.emptyCart}>
          <Image src={EmptyCart} width={450} height={250} />
          <h3>Your shopping cart is empty!!</h3>

          <Link href="/">
            <a className={styles.homeLink}>Continue To Home</a>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.cartSection}>
        <div className={styles.TitleWrapper}>
          <h1 className={styles.cartTitle}>shopping cart</h1>
        </div>
        <div className={styles.cartWrapper}>
          <div className={styles.cartWrapperLeft}>
            {cartMain.map((item, idx) => {
              return (
                <CartBox
                  first={idx === 0 ? true : false}
                  productData={item}
                  handleReduce={handleReduce}
                  handleRemove={handleRemove}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
          <div className={styles.cartWrapperRight}>
            <OrderDetailsBox isCart={true} cartMain={cartMain} />
          </div>
        </div>
        {/* empty cart */}

        {/* dont show cart if not logged in */}

        {/* <div className={styles.shopCart}>
          <h2 className={styles.cartTitle}>Shopping Cart</h2>
          <div className={styles.cartMain}>
            <div className={styles.cartTop}>
              {cartTitle.map((item, id) => {
                return (
                  <span className={styles.cartTopTitle} key={id}>
                    {item}
                  </span>
                );
              })}
            </div>
            <div className={styles.cartBottom}>
              {cartMain.map((item, idx) => {
                return (
                  <div className={styles.bottomWrapper} key={idx}>
                    <div className={styles.productInfo}>
                      <Image
                        src={item.images[0]}
                        height="100%"
                        width="100%"
                        alt=""
                        className={styles.productImg}
                      />

                      <ul className={styles.productName}>
                        <li className={styles.name}> {item.name}</li>
                        <li className={styles.linkTo}>
                          {" "}
                          <Link href=""> View Details...</Link>
                        </li>
                      </ul>
                    </div>
                    <span className={styles.outerPar}>
                      <span className={styles.paisa}>
                        <BiRupee />
                        {item.amount}
                      </span>
                    </span>
                    <span className={styles.outerPar}>
                      {" "}
                      <ButtonGroup
                        size="sm"
                        isAttached
                        variant="outline"
                        style={{ width: "30px" }}
                      >
                        <IconButton
                          aria-label="Add to friends"
                          onClick={() => {
                            addToCart(item?._id);
                          }}
                          icon={<GrAdd style={{ fontSize: "12px" }} />}
                        />
                        <Button mr="-px">{item.count}</Button>
                        <IconButton
                          aria-label="Add to friends"
                          onClick={() => {
                            handleReduce(item._id);
                          }}
                          icon={<AiOutlineMinus style={{ fontSize: "12px" }} />}
                        />
                      </ButtonGroup>
                    </span>
                    <span className={styles.outerPar}>
                      <span className={styles.paisa}>
                        <BiRupee />
                        {item.amount * item.count}
                      </span>
                    </span>
                    <span className={styles.outerPar}>
                      <CgCloseR
                        onClick={() => handleRemove(item?._id)}
                        style={{
                          fontSize: "22px",
                          color: "#888",
                          cursor: "pointer",
                        }}
                      />{" "}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <a href="/checkout" target="_blank">
            <button
              style={{
                float: "right",
                background: "#6b1aa6",
                padding: "4px 12px",
                color: "#fff",
                marginRight: 12,
                fontSize: "12px !important",
                textTransform: "uppercase",
                marginTop: 15,
                borderRadius: 5,
              }}
            >
              proceed to pay
            </button>
          </a>
          <div className={styles.checkoutSection}>
            <div className={styles.checkoutLeft}>
              <h2 className={styles.checkoutLeftTitle}>Continue Shopping</h2>
              <div className={styles.checkoutLeftContainer}>
                <div style={{ display: "flex" }}>
                  <AiFillHome style={{ marginRight: "5px" }} />
                  <Link href="/">Home</Link>
                </div>{" "}
                <div style={{ display: "flex" }}>
                  <HiArrowSmLeft style={{ marginRight: "5px" }} />{" "}
                  <Link href="/">Previous page</Link>
                </div>{" "}
              </div>
            </div>
            <div className={styles.checkoutRight}>
              <h2 className={styles.checkoutRightTitle}>Order Summary</h2>

              {summaryData.map((data, index) => {
                return (
                  <div className={styles.checkoutSum} key={index}>
                    <div className={styles.checkoutSumContain}>
                      <span
                        className={styles.checkoutSumTitle}
                        style={{ fontWeight: index == 3 ? "bold" : "normal" }}
                      >
                        {data.key}
                      </span>
                      <span
                        className={styles.checkoutSumRes}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <BiRupee />
                        {index == 0 && data.value().toString()}
                        {index == summaryData.length - 1 &&
                          data.value().toString()}
                        {index != 0 && data.value}
                      </span>
                    </div>
                  </div>
                );
              })}
                  );
                })}
              </div>
            </div>
            <Link href="/checkout" passHref>
              <a target="_blank">
                <button
                  style={{
                    float: "right",
                    background: "#6b1aa6",
                    padding: "4px 12px",
                    color: "#fff",
                    marginRight: 12,
                    fontSize: "12px !important",
                    textTransform: "uppercase",
                    marginTop: 15,
                    borderRadius: 5,
                  }}
                >
                  proceed to pay
                </button>
              </a>
            </Link>

            <div className={styles.checkoutSection}>
              <div className={styles.checkoutLeft}>
                <h2 className={styles.checkoutLeftTitle}>Continue Shopping</h2>
                <div className={styles.checkoutLeftContainer}>
                  <div style={{ display: "flex" }}>
                    <AiFillHome style={{ marginRight: "5px" }} />
                    <Link href="/">Home</Link>
                  </div>{" "}
                  <div style={{ display: "flex" }}>
                    <HiArrowSmLeft style={{ marginRight: "5px" }} />{" "}
                    <Link href="/">Previous page</Link>
                  </div>{" "}
                </div>
              </div>
              <div className={styles.checkoutRight}>
                <h2 className={styles.checkoutRightTitle}>Order Summary</h2>

                {summaryData.map((data, index) => {
                  return (
                    <div className={styles.checkoutSum} key={index}>
                      <div className={styles.checkoutSumContain}>
                        <span
                          className={styles.checkoutSumTitle}
                          style={{ fontWeight: index == 3 ? "bold" : "normal" }}
                        >
                          {data.key}
                        </span>
                        <span
                          className={styles.checkoutSumRes}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <BiRupee />
                          {index == 0 && data.value().toString()}
                          {index == summaryData.length - 1 &&
                            data.value().toString()}
                          {index != 0 && data.value}
                        </span>
                      </div>
                    </div>
                  );
                })}

              <div className={styles.reddemSection}>
                <div className={styles.reddemCont}>
                  <div className={styles.reddemTop}>
                    <Image
                      src="https://storage.sg.content-cdn.io/in-resources/d7048855-742a-406c-a67d-5c2962e69e5e/Stylesheet/images/couponcode_bg.gif"
                      height="30%"
                      width="80px"
                      className={styles.reddemTopImgStyles}
                      alt=""
                    />
                    <div className={styles.reddemTitle}>
                      <h4>Use your voucher code</h4>
                      <h6>
                        Only one coupon code can be used per order at this time.
                      </h6>
                    </div>
                  </div>
                  <div className={styles.reddemBottom}>
                    <label htmlFor="">voucher code </label>

                    <input type="text" placeholder="Voucher code" />
                    <button className={styles.reddemBtn}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
};

export default Cart;
