import React from "react";
import styles from "./AuthLayout.module.scss";
import Image from "next/image";
import img from "/public/Logo.svg";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.AuthLayout}>
      <div className={styles.AuthWrapper}>
        <div className={styles.LeftWrapper}>
          <div className={styles.AuthLayoutLeft}>
            <Image
              alt="img"
              src={img}
              height="260px"
              width="260px"
              objectFit="cover"
              className={styles.AuthLayoutLeftImg}
            />
            <h1>Pednekar Jwellers</h1>
          </div>
        </div>
        <div className={styles.AuthLayoutRight}>{children}</div>
      </div>
    </div>
  );
}
