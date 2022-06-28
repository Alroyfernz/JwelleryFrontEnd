import React from "react";
import styles from "./contact.module.scss";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Contact = () => {
  return (
    <div className={styles.contactSection}>
      <h1 className={styles.contactTtile}>contact us</h1>

      <div className={styles.contactContainer}>
        <div className={styles.contactWrapper}>
          <div className={styles.contactComp}>
            <FiMail className={styles.icon} />
            <h4>example@gmail.com</h4>
          </div>
          <div className={styles.contactComp}>
            <FaWhatsapp className={styles.icon} />
            <h4>+91 99999999</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
