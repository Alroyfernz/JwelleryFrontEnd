import React, { useState, useEffect } from "react";
import { fetchCart } from "../redux/Actions/CartActions";
import { useDispatch } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { getNames } from "country-list";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import axios from "axios";
import { BACKEND_API } from "../cred";
import { GrLocation } from "react-icons/gr";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useToast,
} from "@chakra-ui/react";
import styles from "../styles/checkout.module.scss";
import CheckoutNav from "../components/CheckoutNav/CheckoutNav";
import OrderDetailsBox from "../components/cart/OrderDetailsBox";
import CartBox from "../components/cart/CartBox";
import { handleCount } from "../helperFunctions/handleCount";
import { useQuery } from "react-query";

function loadScript(src) {
  if (process.browser) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
}
var __DEV__;
if (process.browser) {
  __DEV__ = document.domain === "localhost";
}

const AddressForm = ({ setEnterAddress, formik }) => {
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  console.log(formik);
  const toast = useToast();
  const updateAddress = async (formik) => {
    try {
      const {
        fullName,
        address,
        mobileNo,
        altNo,
        city,
        state,
        country,
        zipCode,
        locality,
      } = formik.values;

      if (
        !fullName ||
        !address ||
        !mobileNo ||
        !altNo ||
        !city ||
        !state ||
        !country ||
        !zipCode
      ) {
        alert("Please enter all items");
        return;
      }
      const json = {
        name: fullName,
        address: address,
        locality: locality,
        pin: zipCode,
        city: city,
        state: state,
        country: country,
        contactNo: mobileNo,
        alContactNo: altNo,
        user: userData.savedUser?._id,
      };
      console.log(json);

      const data = await axios.post(`${BACKEND_API}/address`, json);
      if (data.status == 200) {
        toast({
          title: "Address Added.",
          description: "You've added a new shipping address",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setEnterAddress(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.AddressContainer}>
      <div className={styles.AddressForm}>
        <div className={styles.formComponents}>
          <AddressFieldInput
            fieldName="Name"
            fieldType="text"
            value={formik.values.fullName}
            name="fullName"
            onChange={formik.handleChange}
          />
          <button className={styles.useLocation}>
            <div className={styles.useLocationWrapper}>
              <GrLocation className={styles.LocaIcon} />
              <span>Use Current Location</span>{" "}
            </div>
          </button>
        </div>

        <div className={styles.formComponents}>
          <AddressFieldInput
            fieldName="address"
            name="address"
            fieldType="text"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.formComponents}>
          <AddressFieldInput
            name="locality"
            fieldName="locality"
            fieldType="text"
            value={formik.values.locality}
            onChange={formik.handleChange}
          />
          <AddressFieldInput
            name="zipCode"
            fieldName="zipcode"
            fieldType="number"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.formComponents}>
          <AddressFieldInput
            name="city"
            fieldName="City"
            fieldType="text"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
          <AddressFieldInput
            name="state"
            fieldName="State"
            fieldType="text"
            value={formik.values.state}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.formComponents}>
          <AddressFieldInput
            name="country"
            fieldName="country"
            fieldType="text"
            value={formik.values.country}
            onChange={formik.handleChange}
          />
          <AddressFieldInput
            name="mobileNo"
            fieldName="contact no."
            fieldType="number"
            value={formik.values.mobileNo}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.formComponents}>
          <AddressFieldInput
            name="altNo"
            fieldName="alternate contact no."
            fieldType="number"
            value={formik.values.altNo}
            onChange={formik.handleChange}
          />
        </div>

        <button
          onClick={() => {
            setEnterAddress(false);
            updateAddress(formik);
          }}
          className={styles.AddressFormBtn}
        >
          SAVE AND PROCEED
        </button>
      </div>
    </div>
  );
};
export const AddressFieldInput = ({
  fieldName,
  fieldType,
  value,
  onChange,
  name,
}) => {
  if (fieldName === "address" || fieldName === "Enter Your Message") {
    return (
      <div className={styles.InputContainer} style={{ width: "100%" }}>
        <label htmlFor={`${fieldName}`} className={styles.InputContainerLabel}>
          {fieldName}
        </label>
        <textarea
          type={`${fieldType}`}
          id={`${fieldName}`}
          className={styles.InputContainerInput}
          value={value}
          name={name}
          onChange={onChange}
          rows="3"
        />
      </div>
    );
  }
  return (
    <div className={styles.InputContainer}>
      <label htmlFor={`${fieldName}`} className={styles.InputContainerLabel}>
        {fieldName}
      </label>
      <input
        type={`${fieldType}`}
        id={`${fieldName}`}
        className={styles.InputContainerInput}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const AddressViewParent = ({
  setEnterAddress,
  addressData,
  setSelectedIdx,
  selectedIdx,
}) => {
  return (
    <div className={styles.AddressViewParent}>
      {addressData?.map((address, idx) => {
        return (
          <div
            className={
              selectedIdx == idx
                ? `${styles.AddressBox} ${styles.selectedAddr} `
                : styles.AddressBox
            }
            key={address._id}
            style={{ marginTop: idx != 0 && 15 }}
            onClick={() => {
              setSelectedIdx(idx);
            }}
          >
            <div className={styles.AddressBoxWrapper}>
              <div className={styles.AddressTop}>
                <h1 className={styles.OwnerName}>{address?.name}</h1>
                <span
                  className={
                    selectedIdx == idx ? styles.selectBX : styles.notSel
                  }
                ></span>
              </div>
              <div className={styles.NumDiv}>
                <span className={styles.NumMain}>{address?.contactNo}</span>
                <span className={styles.NumAlt}>/ {address?.alContactNo}</span>
              </div>
              <div className={styles.mainAddr}>
                <p>{address?.address}</p>
              </div>
              <span className={styles.ZipText}>{address?.pin}</span>
            </div>
          </div>
        );
      })}

      <p
        className={styles.addNewText}
        onClick={() => {
          setEnterAddress(true);
        }}
      >
        + add New Address
      </p>
    </div>
  );
};
const Checkout = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const [enterAddress, setEnterAddress] = useState(true);
  const Router = useRouter();
  const user = useSelector((state) => state.user);
  console.log(user);
  const toast = useToast();
  const userId = user?.userData?.savedUser?._id;
  const [allAddr, setAllAddr] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  useEffect(() => {
    const fetchFuction = async () => {
      const data = await axios.get(`${BACKEND_API}/useraddresses/${userId}`);
      console.log(data);
      const addresses = data.data.addresses;
      setAllAddr(addresses);
      if (addresses.length > 0 && allAddr.length == 0) {
        setEnterAddress(false);
      }
    };
    fetchFuction();
  }, [enterAddress]);

  const { productList } = useSelector((state) => state.cart);
  const [itemsMain, setItemsMain] = useState([]);

  useEffect(() => {
    const finalProd = handleCount(productList);
    setItemsMain(finalProd);
    console.log(productList);
  }, [productList]);

  const dispatch = useDispatch();
  // console.log(user);
  const [isFirst, setIsFirst] = useState(false);
  console.log(itemsMain);
  const [timer, setTimer] = useState(3000);
  const [isSecond, setIsSecond] = useState(true);
  const [isThird, setIsThird] = useState(false);
  const [isForth, setIsForth] = useState(false);
  const countries = getNames();
  const toggleOne = (value) => {
    switch (value) {
      case "first": {
        setIsFirst(true);
        setIsSecond(false);
        setIsThird(false);
        setIsForth(false);

        break;
      }
      case "second": {
        setIsFirst(false);
        setIsSecond(true);
        setIsThird(false);
        setIsForth(false);

        break;
      }
      case "third": {
        setIsFirst(false);
        setIsSecond(false);
        setIsThird(true);
        setIsForth(false);

        break;
      }
      default: {
        setIsFirst(false);
        setIsSecond(false);
        setIsThird(false);
        setIsForth(true);
      }
    }
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      Router.push("/");
      return;
    }

    dispatch(fetchCart(user.userData.savedUser._id));
  }, []);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      zipCode: "",
      country: "",
      state: "",
      city: "",
      locality: "",
      mobileNo: "",
      altNo: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      var userData = {};

      const addressComp = allAddr[selectedIdx];
      var subAddr = {
        Country: "India",
        State: addressComp.state,
        City: addressComp.city,
        SubAddr: addressComp.address,
        Locality: addressComp.locality,
        ZipCode: Number(addressComp.pin),
      };
      const name = addressComp.name.split(" ");
      userData.firstName = name[0];
      userData.lastName = name[1];
      userData.email = user.userData.savedUser.email;
      userData.items = productList;
      userData.userId = user.userData.savedUser._id;
      userData.mobileNumber = Number(addressComp.contactNo);
      userData.Address = subAddr;

      console.log(userData);
      checkoutHandler(userData);
    },
  });
  async function displayRazorpay(userData) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch(`${BACKEND_API}/razorpay`, {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_Bk56QU31voSuoQ" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Purchase",
      description: "Thank you!",
      image: "http://localhost:1337/logo.svg",
      handler: async function (response) {
        console.log(userData);
        try {
          const res = await axios.post(`${BACKEND_API}/newOrder`, userData);
          console.log(res.data);

          if (res.status === 200) {
            toast({
              title: "Payment Successful.",
              description: `Redirecting you to home page ...`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setTimeout(() => {
              Router.push("/");
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: "your name!",
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const checkoutHandler = async (userData) => {
    console.log(userData);
    //validate user token for 15mins using JWT
    try {
      displayRazorpay(userData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.checkoutSection}>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isMobile ? (
          <div className={styles.checkoutSectionWrapper}>
            <h1 className={styles.CheckoutTitle}>Checkout details</h1>
            <CheckoutNav
              toggleOne={toggleOne}
              isFirst={isFirst}
              isSecond={isSecond}
              isThird={isThird}
              isForth={isForth}
            />
            <div className={styles.checkoutSectionWrapperMain}>
              <div className={styles.checkoutSectionWrapperMainLeft}>
                {isSecond &&
                  (enterAddress ? (
                    <AddressForm
                      setEnterAddress={setEnterAddress}
                      formik={formik}
                    />
                  ) : (
                    <AddressViewParent
                      setEnterAddress={setEnterAddress}
                      addressData={allAddr}
                      setSelectedIdx={setSelectedIdx}
                      selectedIdx={selectedIdx}
                    />
                  ))}

                {isFirst && (
                  <div>
                    {user.isLoggedIn ? (
                      <div>Signed in as {user?.userData?.savedUser?.email}</div>
                    ) : (
                      <div>please sign in</div>
                    )}
                  </div>
                )}
                {isThird && (
                  <div>
                    {" "}
                    {itemsMain.map((item) => {
                      return <CartBox key={item._id} productData={item} />;
                    })}
                  </div>
                )}

                {isForth && (
                  <div className={styles.paymentPage}>
                    <h2 className={styles.paymentSubTitle}>
                      In order to process your order, we need to gather your
                      payment details. Please select a mode of payment below.
                      You will be securely redirected to our partner site to
                      process this order.
                    </h2>

                    <div className={styles.paymentBox}>
                      <p>CREDIT CARD / DEBIT CARD / NET BANKING / WALLET</p>
                      <img
                        src="https://codeskventure.in/wp-content/uploads/Razorpay-Payment-Options.png"
                        alt=""
                      />
                      <button type="submit">Pay with razprpay</button>
                    </div>
                  </div>
                )}
              </div>
              {!isFirst && (
                <div className={styles.checkoutSectionWrapperMainRight}>
                  <OrderDetailsBox isCart={false} cartMain={itemsMain} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Accordion allowToggle className={styles.chakraAccordion}>
              <AccordionItem className={styles.accordionItem}>
                <h2
                  style={{
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(211, 139, 58, 1)",
                  }}
                >
                  <AccordionButton>
                    <Box flex="1" textAlign="left" className={styles.box}>
                      <span
                        style={{
                          color: isFirst
                            ? "rgba(158, 85, 4, 1)"
                            : "rgba(70, 4, 4, 0.3)",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {" "}
                        signed in{" "}
                        <span style={{ fontWeight: "700", fontSize: 13 }}>
                          as {user?.userData?.savedUser?.email}
                        </span>
                      </span>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {isFirst && (
                  <div
                    pb={4}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "17px 28px",
                    }}
                    className={styles.firstComp}
                  >
                    singed in as {user?.userData?.savedUser?.email}
                  </div>
                )}
              </AccordionItem>
              <AccordionItem className={styles.accordionItem}>
                <h2
                  style={{
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(211, 139, 58, 1)",
                  }}
                  onClick={() => {
                    if (isSecond) toggleOne("third");
                    else toggleOne("second");
                  }}
                >
                  <AccordionButton>
                    <Box flex="1" textAlign="left" className={styles.box}>
                      <span
                        style={{
                          color: isSecond
                            ? "rgba(158, 85, 4, 1)"
                            : "rgba(70, 4, 4, 0.3)",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {" "}
                        Delivery Information
                      </span>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {isSecond && (
                  <div style={{ padding: 16 }}>
                    {enterAddress ? (
                      <AddressForm
                        setEnterAddress={setEnterAddress}
                        formik={formik}
                      />
                    ) : (
                      <AddressViewParent setEnterAddress={setEnterAddress} />
                    )}
                  </div>
                )}
              </AccordionItem>
              <AccordionItem className={styles.accordionItem}>
                <h2
                  style={{
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(211, 139, 58, 1)",
                  }}
                  onClick={() => {
                    if (isThird) toggleOne("forth");
                    else toggleOne("third");
                  }}
                >
                  <AccordionButton>
                    <Box flex="1" textAlign="left" className={styles.box}>
                      <span
                        style={{
                          color: isThird
                            ? "rgba(158, 85, 4, 1)"
                            : "rgba(70, 4, 4, 0.3)",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {" "}
                        review order
                      </span>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {isThird && (
                  <>
                    {itemsMain.map((item) => {
                      return <CartBox key={item._id} productData={item} />;
                    })}

                    <div style={{ marginTop: 16 }}>
                      <OrderDetailsBox isCart={false} cartMain={itemsMain} />
                    </div>
                  </>
                )}
              </AccordionItem>
              <AccordionItem className={styles.accordionItem}>
                <h2
                  style={{
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(211, 139, 58, 1)",
                  }}
                  onClick={() => {
                    toggleOne("forth");
                  }}
                >
                  <AccordionButton>
                    <Box flex="1" textAlign="left" className={styles.box}>
                      <span
                        style={{
                          color: isForth
                            ? "rgba(158, 85, 4, 1)"
                            : "rgba(70, 4, 4, 0.3)",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {" "}
                        payment option
                      </span>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {isForth && (
                  <>
                    <div className={styles.paymentPageMobile}>
                      <div className={styles.paymentBox}>
                        <p>CREDIT CARD / DEBIT CARD / NET BANKING / WALLET</p>
                        <img
                          src="https://codeskventure.in/wp-content/uploads/Razorpay-Payment-Options.png"
                          alt=""
                        />
                        <button type="submit">Pay with razprpay</button>
                      </div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                      <OrderDetailsBox isCart={false} />
                    </div>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </form>
    </div>
  );
};

export default Checkout;
