import React from "react";
import styles from "./cutomize.module.scss";
import Image from "next/image";
import RingBG from "/public/RingBG.png";
const Customize = () => {
  return (
    <div className={styles.CustomizeContainer}>
      <div className={styles.customizeWrapper}>
        <div className={styles.customizeTop}>
          <div className={styles.customizeLeft}>
            <Image
              src={RingBG}
              alt=""
              width={480}
              objectFit="contain"
              height={400}
            />
          </div>
          <div className={styles.customizeRight}>
            <div>
              <h2 className={styles.customizeTitle}>
                BUILD YOUR OWN{" "}
                <span className={styles.customizeHead}>
                  JEWELLERY <br />{" "}
                </span>{" "}
                WITH OUR DESIGNERS
              </h2>
            </div>
          </div>
        </div>
        <button className={styles.enquiryBtn}>enquire now</button>
      </div>
    </div>
  );
};

export default Customize;
