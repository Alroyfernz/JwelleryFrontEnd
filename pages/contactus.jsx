import Image from "next/image";
import React from "react";
import styles from "./../styles/contactus.module.scss";
import img from "/public/Logo.svg";
import { AddressFieldInput } from "./checkout";
export default function contactus() {
  return (
    <div className={styles.Contactus}>
      <div className={styles.ContactusWrapper}>
        <div className={styles.ContactusLeft}>
          <AddressPart />
        </div>
        <div className={styles.ContactusRight}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

const ContactForm = () => {
  return (
    <div className={styles.FormContainer}>
      <form action="" className={styles.FormBody}>
        <span className={styles.FormTitle}>Get in touch with us</span>
        <div className={styles.formEle}>
          <AddressFieldInput fieldType="text" fieldName="First Name" />
          <AddressFieldInput fieldType="text" fieldName="Last Name" />
        </div>
        <div className={styles.formEle}>
          <AddressFieldInput fieldType="email" fieldName="Email Address" />
          <AddressFieldInput fieldType="number" fieldName="Phone Number" />
        </div>
        <div className={styles.formEle}>
          <AddressFieldInput fieldType="text" fieldName="Enter Your Message" />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

const AddressPart = () => {
  return (
    <div className={styles.AddressContainer}>
      <div className={styles.AddressTop}>
        {" "}
        <Image src={img} width={50} height={50} /> <h2>PEDNEKAR JEWELLERS</h2>
      </div>
      <span className={styles.AddrTitle}>Address:</span>
      <p className={styles.AddrData}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus venenatis, lectus magn.
      </p>
      <span className={styles.AddrTitle}>Contact no.</span>
      <p className={styles.AddrData}>+91 9765432106 | +91 9765432106</p>
    </div>
  );
};
