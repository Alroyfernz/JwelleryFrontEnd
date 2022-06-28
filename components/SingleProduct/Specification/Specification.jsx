import React from "react";
import SectionHeader from "../common/SectionHeader";
import styles from "./Specification.module.scss";

export default function Specification() {
  return (
    <div className={styles.Specification}>
      <SectionHeader name="Product Specification" />
      <div className={styles.SpecificationBottom}>
        <div className={styles.SpecificationBottomCard}>
          <label>Product:</label>
          <label>Earings</label>
        </div>
        <div className={styles.SpecificationBottomCard}>
          <label>Jwellery Type:</label>
          <label>Diamond</label>
        </div>
        <div className={styles.SpecificationBottomCard}>
          <label>Jwellery Type:</label>
          <label>Diamond</label>
        </div>
      </div>
    </div>
  );
}
