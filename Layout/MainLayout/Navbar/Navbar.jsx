import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import useModal from "../../../hooks/useModal";
import img from "/public/Logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarDropdown from "./NavbarDropdown";
import { NavItems } from "./NavbarData";
import Slider from "./Slider";
import Sidebar from "../Sidebar/Sidebar";
import ShoppingCartIcon from "/public/Navbar/ShoppingCartIcon.svg";
import { AiOutlineSearch } from "react-icons/ai";
import AddToCartDrawer from "../AddToCart/AddToCartDrawer";
import useWindowSize from "../../../hooks/useWindow";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import { BACKEND_API } from "../../../cred";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const details = [
  { id: 1, route: "/signin", name: "Sign in" },
  { id: 2, route: "/newuser", name: "New User" },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isSearch, setIsSearch] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);
  // const handleNav = () => {
  //   if (window.scrollY >= 250) {
  //     setScrollNav(true);
  //   } else {
  //     setScrollNav(false);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleNav);
  // }, []);
  const { width, height } = useWindowSize();
  const {
    Modal,
    show,
    setShow,
    navbarData,
    setNavbarData,
    hoveredId,
    setHoveredId,
  } = useModal(NavbarDropdown);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onClose: onCloseCart,
  } = useDisclosure();
  // const { localValue } = useLocal();
  // const isLogged = localValue != null;
  const [query, setQuery] = useState("");

  const fetchCategory = async () => {
    return axios.get(`${BACKEND_API}/searchproducts?search=${query}`);
  };

  const { isLoading, isFetching, data } = useQuery(
    `${query}-data`,
    fetchCategory,
    {
      enabled: !!query,
    }
  );

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    router.push("/");
  };

  console.log("data", data);

  return (
    <>
      <div
        className={styles.Navbar}
        style={{
          boxShadow: scrollNav ? "0 1px 5px rgb(0 0 0 / 50%)" : "unset",
          position: scrollNav ? "sticky" : "static",

          top: scrollNav ? 0 : "-5000px",
          // top: 0,
          // opacity: scrollNav ? 1 : 0,
          minHeight: scrollNav ? "auto" : "auto",
        }}
      >
        {!scrollNav && <Slider />}
        <div className={styles.NavbarCont}>
          <div className={styles.NavbarContSidebar}>
            <GiHamburgerMenu
              className={styles.NavbarContSidebarLogoStyle}
              onClick={onOpen}
            />
          </div>

          <div className={styles.NavbarContRest}>
            {/* <div className={styles.NavbarContRestTop}>
              {!isLoggedIn && (
                <>
                  {details.map((n) => (
                    <Link href={`${n.route}`} key={n.id} passHref>
                      <div className={styles.NavbarContRestTopItems}>
                        {n.name}
                      </div>
                    </Link>
                  ))}
                </>
              )}
              {isLoggedIn && (
                <>
                  <div
                    className={styles.NavbarContRestTopItems}
                    onClick={logout}
                  >
                    logout
                  </div>
                  <Link href="/myaccount/myprofile" passHref>
                    <div className={styles.NavbarContRestTopItems}>
                      myaccount
                    </div>
                  </Link>
                </>
              )}
              <Link href="/contactus" passHref>
                <div className={styles.NavbarContRestTopItems}>Contact Us</div>
              </Link>
            </div> */}

            <div
              style={{
                width: "100%",
                display: "block",
                flexDirection: "unset",
                marginTop: "0px",
              }}
            >
              <div className={styles.TopSection}>
                <div className={styles.TopWrapper}>
                  <div className={styles.NavbarContLogo}>
                    <Link href="/" passHref>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={img}
                          height="60%"
                          width="68%"
                          objectFit="cover"
                          alt="logo"
                        />

                        <h1 className={styles.NavbarHeading}>
                          Pednekar Jwellers
                        </h1>
                      </div>
                    </Link>
                  </div>
                  <div className={styles.NavbarContRestMid}>
                    <div className={styles.LeftMid}>
                      <div
                        className={styles.SearchResModal}
                        style={{
                          opacity: isSearch && data ? 1 : 0,
                          display: isSearch ? "" : "none",
                        }}
                      >
                        {data?.data?.map((item, idx) => {
                          return (
                            <Link
                              passHref
                              key={idx}
                              href={`/category/${item.category}/${item.subCategory}/${item.lastSubCategory}`}
                            >
                              <div className={styles.SearchResBox}>
                                <img src={item.images[0]} alt="img" />
                                <div className={styles.SearchTitle}>
                                  <span className={styles.productName}>
                                    {item.name}
                                  </span>
                                  <span className={styles.productType}>
                                    in {item.category}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className={styles.InputWrapper}>
                        <input
                          type="text"
                          className={styles.SearchBar}
                          onChange={(e) => setQuery(e.target.value)}
                          onFocus={() => {
                            setIsSearch(true);
                          }}
                          onBlur={() => {
                            setTimeout(() => {
                              setIsSearch(false);
                            }, 1000);
                          }}
                        />
                        <div className={styles.iconWrapper}>
                          <AiOutlineSearch
                            style={{ color: "#fff", fontSize: 23.5 }}
                          />
                        </div>
                      </div>
                      <ul className={styles.ListItems}>
                        {!isLoggedIn &&
                          details.map((item) => {
                            return (
                              <Link href={item.route} key={item.id} passHref>
                                <li className={styles.IndiItem}>{item.name}</li>
                              </Link>
                            );
                          })}
                        {isLoggedIn && (
                          <>
                            <Link href={"/myaccount/details"} passHref>
                              <li className={styles.IndiItem}>Profile</li>
                            </Link>

                            <li className={styles.IndiItem} onClick={logout}>
                              Logout
                            </li>
                          </>
                        )}
                        <Link href={"/contact us"} passHref>
                          <li className={styles.IndiItem}>contact us</li>
                        </Link>
                      </ul>
                      <span style={{ cursor: "pointer" }}>
                        <Link href="/cart" passHref>
                          <Image
                            src={ShoppingCartIcon}
                            height="22px"
                            width="22px"
                            objectFit="cover"
                            alt="logo"
                          />
                        </Link>
                      </span>
                    </div>

                    {/* <div
                    onMouseEnter={() => setIsInputFocused(true)}
                    onMouseLeave={() => setIsInputFocused(false)}
                    className={styles.NavbarContRestMidSearchBar}
                    style={{ width: scrollNav ? "fit-content" : "18%" }}
                  >
                    <input
                      placeholder="SEARCH"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      className={styles.NavbarContRestMidSearchBarInput}
                    />
                    <FiSearch
                      style={{ color: "rgb(185, 185, 185)", fontSize: 20 }}
                    />
                    {isInputFocused &&
                      query.length > 1 &&
                      data?.data?.length > 0 && (
                        <div className={styles.NavbarContRestMidSearchBarModal}>
                          {data?.data?.map((j, i) => (
                            <Link
                              key={i}
                              passHref
                              href={`/category/${j.category}/${j.subCategory}/${j.lastSubCategory}`}
                              className={
                                styles.NavbarContRestMidSearchBarModalLink
                              }
                            >
                              <p
                                className={
                                  styles.NavbarContRestMidSearchBarModalLinkText
                                }
                              >
                                <b style={{ marginRight: "2px" }}>{j.name}</b>
                                in {j.category}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                  <div className={styles.NavbarContRestMidIconLocation}>
                    <Link href="/">
                      <a style={{ fontSize: 0 }}></a>
                    </Link>
                  </div>
                  {width > 767 ? (
                    <Link href="/cart" passHref>
                      <div className={styles.NavbarContRestMidIconCart}></div>
                    </Link>
                  ) : (
                    <div
                      className={styles.NavbarContRestMidIconCart}
                      onClick={onOpenCart}
                    ></div>
                  )} */}
                  </div>
                </div>
              </div>
              <div
                className={styles.NavbarContRestBottom}
                style={{ display: scrollNav && "none" }}
              >
                {NavItems.map((n, idx) => (
                  <Link href={n.link} key={idx} passHref>
                    <div
                      key={idx}
                      className={styles.NavbarContRestBottomItems}
                      onMouseOver={() => {
                        setHoveredId(n.id);
                        setNavbarData(n.data);
                        setShow(true);
                      }}
                      onMouseLeave={() => {
                        setShow(false);
                        setNavbarData([]);
                      }}
                    >
                      {n.name}
                      {hoveredId === n.id && show && (
                        <Modal
                          show={show}
                          data={navbarData}
                          id={hoveredId}
                          scrollNav={scrollNav}
                        />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Search}>
          <AiOutlineSearch className={styles.SearchMobIcon} />
          <input
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsSearch(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsSearch(false);
              }, 1000);
            }}
            placeholder="Search our products..."
            className={styles.SearchInput}
          />
        </div>
        <div
          className={styles.SearchResModalMob}
          style={{
            opacity: isSearch && data ? 1 : 0,
            pointerEvents: isSearch ? "auto" : "none",
          }}
        >
          {data?.data?.map((item, idx) => {
            return (
              <Link
                passHref
                key={idx}
                href={`/category/${item.category}/${item.subCategory}/${item.lastSubCategory}`}
              >
                <div className={styles.SearchResBox}>
                  <img src={item.images[0]} alt="img" />
                  <div className={styles.SearchTitle}>
                    <span className={styles.productName}>{item.name}</span>
                    <span className={styles.productType}>
                      in {item.category}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <AddToCartDrawer
        isOpen={isOpenCart}
        onOpen={onOpenCart}
        onClose={onCloseCart}
      />
    </>
  );
}
