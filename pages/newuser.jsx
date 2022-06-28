import React, { useState } from "react";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import styles from "./../styles/newuser.module.scss";
import { getNames } from "country-list";
import { BACKEND_API } from "../cred";
import { useToast, Button } from "@chakra-ui/react";
import axios from "axios";
import { useMutation } from "react-query";
import useForm from "../hooks/useForm";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Newuser() {
  const router = useRouter();
  const countries = ["india"];
  const toast = useToast();
  const { formData, handleInputChange } = useForm({
    fName: "",
    lName: "",
    email: "",
    password: "",
    mobileNo: 0,
    country: "",
    gender: "",
  });

  const { fName, lName, email, password, mobileNo, country } = formData;

  const regUser = (user) => {
    return axios.post(`${BACKEND_API}/register`, user);
  };

  const { isLoading, mutate } = useMutation(regUser, {
    onSuccess: () => {
      toast({
        title: "Account created.",
        description: "We've created your account for you.Directing to login",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    },
  });

  const handleRegister = () => {
    mutate(formData);
  };

  return (
    <AuthLayout>
      <div className={styles.NewUser}>
        <h1 className={styles.NewUserHead}>REGISTER NOW</h1>
        <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput}>
            <input
              className={styles.NewUserBoxInputStyle}
              name="fName"
              placeholder="Enter First Name"
              value={fName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput}>
            <input
              value={lName}
              name="lName"
              placeholder="Enter Last Name"
              className={styles.NewUserBoxInputStyle}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput}>
            <input
              value={email}
              name="email"
              className={styles.NewUserBoxInputStyle}
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput}>
            <input
              value={mobileNo != 0 ? mobileNo : ""}
              name="mobileNo"
              placeholder="Enter Phone Number"
              className={styles.NewUserBoxInputStyle}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput}>
            <select
              value={country}
              name="country"
              className={styles.NewUserBoxInputSelect}
              onChange={handleInputChange}
            >
              {countries.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput}>
            <input
              placeholder="Enter Password"
              value={password}
              type="password"
              name="password"
              className={styles.NewUserBoxInputStyle}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput}>
            <input className={styles.NewUserBoxInputStyle} />
          </div>
        </div> */}
        <div className={styles.NewUserBox}>
          <div className={styles.NewUserBoxInput} style={{ width: "50%" }}>
            <div className={styles.Wrapper}>
              <label className={styles.NewUserBoxInputRadio}>male</label>
              <input
                name="gender"
                type="radio"
                value="male"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.Wrapper}>
              <label className={styles.NewUserBoxInputRadio}>female</label>
              <input
                name="gender"
                type="radio"
                value="female"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/* <div className={styles.NewUserBox}>
                    captcha
                </div> */}
        <div className={styles.NewUserBox}>
          <label className={styles.NewUserBoxLabelLast}>
            <input type="checkbox" value="true" /> I would like to receive
            offers, promotions and order related information via Email/SMS/Phone
            Call.
          </label>
        </div>
        <div className={styles.NewUserBox}>
          <Button
            className={styles.NewUserBoxButton}
            colorScheme="#6a19a4"
            style={{ width: "50%" }}
            onClick={handleRegister}
          >
            SUBMIT
          </Button>
        </div>
        <h4 className={styles.LastHead}>
          {" "}
          <Link href="signin">Have an account? Sign In</Link>{" "}
        </h4>
      </div>
    </AuthLayout>
  );
}
