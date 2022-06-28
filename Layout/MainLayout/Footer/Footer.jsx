import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import {
  AiFillGoogleCircle,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

import one from "/public/fOOTER/certified_one.png";
import useWindowSize from "../../../hooks/useWindow";

const Data = [
  {
    id: 1,
    name: "KNOW US",
    data: [
      { id: 1, name: "About Us" },
      { id: 2, name: "Who we are" },
      { id: 3, name: "Quality and Value" },
      { id: 4, name: "PNG Advantage" },
      { id: 5, name: "PNG Store locator" },
      { id: 6, name: "Careers" },
      { id: 7, name: "Blog" },
    ],
  },
  {
    id: 2,
    name: "CUSTOMERS DELIGHT",
    data: [
      { id: 1, name: "FAQs" },
      { id: 2, name: "Payment Options" },
      { id: 3, name: "Order Tracking" },
      { id: 4, name: "Contact Us" },
      { id: 5, name: "Site Map" },
    ],
  },
  {
    id: 3,
    name: "POLICIES",
    data: [
      { id: 1, name: "Exchange Policy" },
      { id: 2, name: "Buyback/Return Policy" },
      { id: 3, name: "Gold Scheme Policy" },
      { id: 4, name: "Shipping Policy" },
      { id: 5, name: "Cancellation Policy" },
      { id: 6, name: "Disclaimer Policy" },
      { id: 7, name: "Privacy Policy" },
      { id: 8, name: "Terms of Use" },
      { id: 9, name: "Vigil Policy" },
      { id: 10, name: "CSR Policy" },
    ],
  },
  {
    id: 4,
    name: "POLICIES",
    data: [
      { id: 1, name: "Exchange Policy" },
      { id: 2, name: "Buyback/Return Policy" },
      { id: 3, name: "Gold Scheme Policy" },
      { id: 4, name: "Shipping Policy" },
      { id: 5, name: "Cancellation Policy" },
      { id: 6, name: "Disclaimer Policy" },
      { id: 7, name: "Privacy Policy" },
      { id: 8, name: "Terms of Use" },
      { id: 9, name: "Vigil Policy" },
      { id: 10, name: "CSR Policy" },
    ],
  },
];

const Follow = [
  {
    id: 4,
    name: "FOLLOW US",
    data: [
      { id: 2, icon: AiFillFacebook },
      { id: 3, icon: AiFillTwitterCircle },
      { id: 4, icon: AiFillInstagram },
      { id: 5, icon: AiFillYoutube },
      // { id: 2, icon: <AiFillFacebook className={styles.icon} /> },
      // { id: 3, icon: <AiFillTwitterCircle className={styles.icon} /> },
      // { id: 4, icon: <AiFillInstagram className={styles.icon} /> },
      // { id: 5, icon: <AiFillYoutube className={styles.icon} /> },
    ],
  },
];

const Certified = [
  {
    id: 5,
    name: "WE ARE CERTIFIED BY",
    img: one,
  },
];

const FilterLinks = [
  { id: 1, name: "RingsDaily", route: "" },
  { id: 2, name: "WearBands", route: "" },
  { id: 3, name: "Engagement", route: "" },
  { id: 4, name: "Hearts", route: "" },
  { id: 5, name: "Floral", route: "" },
  { id: 6, name: "Occasional", route: "" },
  { id: 7, name: "Wear", route: "" },
  { id: 8, name: "Earrings", route: "" },
  { id: 9, name: "StudsDrops & Danglers", route: "" },
  { id: 10, name: "Hoops & Huggies", route: "" },
  { id: 11, name: "JhumkasEar", route: "" },
  { id: 12, name: "Cuffs & Jackets", route: "" },
  { id: 13, name: "Chand", route: "" },
  { id: 14, name: "Bali", route: "" },
  { id: 15, name: "Zodiac", route: "" },
  { id: 16, name: "Mangalsutras", route: "" },
  { id: 17, name: "Tanmaniya Mangalsutra", route: "" },
  { id: 18, name: "Fusion Mangalsutra", route: "" },
  { id: 19, name: "Mangalsutra Chain", route: "" },
  { id: 20, name: "Watimani Mangalsutra", route: "" },
  { id: 21, name: "South Exclusive", route: "" },
  { id: 22, name: "Pendants & SetsPendant", route: "" },
  { id: 23, name: "SetsInitialsGeometric", route: "" },
  { id: 24, name: "Religious", route: "" },
  { id: 25, name: "Kids", route: "" },
  { id: 26, name: "Bracelets & Bangles", route: "" },
  { id: 27, name: "Stiff", route: "" },
  { id: 28, name: "Bracelet", route: "" },
  { id: 29, name: "Bangles", route: "" },
  { id: 30, name: "Mangalsutra", route: "" },
  { id: 31, name: "BraceletsColored", route: "" },
  { id: 32, name: "StonesGold", route: "" },
  { id: 33, name: "JewelleryDiamond", route: "" },
  { id: 34, name: "JewellerySilver and Gift", route: "" },
];

export default function Footer() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  console.log(isMobile);
  return (
    <div className={styles.Footer}>
      <div className={styles.FooterTop}>
        {Data.map((d) => (
          <div key={d.id} className={styles.FooterTopBox}>
            <h1 className={styles.FooterTopBoxH}>{d.name}</h1>
            {d.data.map((m) => (
              <p key={m.id} className={styles.FooterTopBoxP}>
                {m.name}
              </p>
            ))}
          </div>
        ))}
        {
          <div className={styles.FooterTopBox}>
            {Follow.map((f) => (
              <div key={f.id}>
                <h1 className={styles.FooterTopBoxH}>{f.name}</h1>
                <div className={styles.FooterTopBoxRow}>
                  {f.data.map((d) => {
                    if (d.icon) {
                      const Ico = d.icon;
                      // return Ico;
                      return (
                        <div key={d.id}>
                          <Ico className={styles.icon} />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
            {Certified.map((c) => (
              <div key={c.id}>
                <h1
                  className={styles.FooterTopBoxH}
                  style={{
                    marginTop: "25px",
                    width: isMobile ? "100%" : "100%",
                  }}
                >
                  {c.name}
                </h1>
                <Image height="60px" width="220px" src={c.img} alt="img" />
              </div>
            ))}
          </div>
        }
      </div>
      {/* <div className={styles.FooterMid}>
            <div className={styles.FooterMidLeft}>
                {FilterLinks.map(f => (
                    <p key={f.id} className={styles.FooterMidLeftName}>{f.name}</p>
                ))}
            </div>
            <div className={styles.FooterMidRight}>bruh</div>
        </div> */}
      <div className={styles.FooterBottom}>
        &copy; Copyright {new Date().getFullYear()} - PEDNEKAR JWELLERS. All
        rights reserved
      </div>
    </div>
  );
}
