import React from "react";
import styles from "./promise.module.scss";
import Image from "next/image";
import LIFETIME from "/public/LIFETIME.svg";
import SECURE from "/public/SECURE.svg";
import FREESHIP from "/public/FREESHIP.svg";
import GUARANTEE from "/public/GUARANTEE.svg";
import HALLMARK from "/public/HALLMARK.svg";
import COD from "/public/COD.svg";

const Promise = () => {
  const promiseData = [
    { title: "BIS HALLMARKED", img: LIFETIME },
    { title: "CASH ON DELIVERY", img: SECURE },
    { title: "FREE SHIPPING", img: FREESHIP },
    { title: "LIFETIME BUYBACK", img: GUARANTEE },
    { title: "SECURE PAYMENT", img: HALLMARK },
    { title: "PURITY GUARANTEE", img: COD },
  ];
  return (
    <div className={styles.promiseSection}>
      <h1 className={styles.promiseTitle}>THE PEDNEKAR JEWELLERS PROMISE</h1>
      <div className={styles.promiseContainer}>
        <div className={styles.promiseWrapper}>
          {promiseData.map((item, idx) => {
            return (
              <div className={styles.promiseParent}>
                <div className={styles.promiseComp} key={idx}>
                  <Image
                    src={item.img}
                    alt=""
                    width={90}
                    height={85}
                    objectFit="cover"
                  />
                </div>
                <h3 className={styles.promiseHeading}>{item.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Promise;
