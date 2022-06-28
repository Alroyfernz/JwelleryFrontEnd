import React, { useState } from "react";
import SectionHeader from "../common/SectionHeader";
import styles from "./Delivery.module.scss";

export default function Delivery() {
  const [pin, setPin] = useState("");
  return (
    <section className={styles.Delivery}>
      <SectionHeader name="Delivery" />
      <div className={styles.DeliveryBottom}>
        <div className={styles.DeliveryBottomLeft}>
          <span>Ships in 40 working days</span>
          <span>
            Free delivery Across India ,Inernational deliveries would be charged
            extra.
          </span>
          <span>Payment Methods:</span>
          <span>COD</span>
          <span>Online Pament</span>
          <span>Bank Transfer</span>
        </div>
        <div className={styles.DeliveryBottomRight}>
          <span className={styles.DeliveryBottomRightHead}>
            Check For Availability
          </span>
          <div>
            <label htmlFor="pin">PINCODE</label>
            <input
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
