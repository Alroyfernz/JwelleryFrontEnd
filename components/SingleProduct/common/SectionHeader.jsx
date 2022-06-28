import React from "react";
import styles from "./SectionHeader.module.scss";

export default function SectionHeader({ name }) {
  return (
    <div className={styles.SectionHeader}>
      <h1 className={styles.SectionHeaderH}>{name}</h1>
      <hr className={styles.SectionHeaderHr} />
    </div>
  );
}
