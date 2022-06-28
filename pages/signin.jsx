import React, { useState } from "react";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import styles from "./../styles/signin.module.scss";
import Link from "next/link";
import { useToast, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_API } from "../cred";
import useLocal from "../hooks/useLocal";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import axios from "axios";
export default function Signin() {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const toast = useToast();
  const userSignin = async () => {
    try {
      const data = await axios.post(`${BACKEND_API}/signin`, userData);
      console.log(data.data);
      if (data.status == 200) {
        toast({
          title: "Login Successful",
          description: "Directing you to home page",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      localStorage.setItem("user_data", JSON.stringify(data.data));
      dispatch({ type: "USER_LOGIN", payload: data.data });
      Router.push("/");
    } catch (error) {
      window.alert(`Login error caused by ${error.message}`);
    }
  };

  // const { isLoading, mutate, data } = useMutation(signinUsr, {
  //   onSuccess: () => {
  //     localStorage.setItem("user_data", JSON.stringify(data));
  //     dispatch({ type: "USER_LOGIN", payload: data });
  //     Router.push("/");
  //   },
  // });

  // const handleSignin = () => mutate(userData);

  return (
    <AuthLayout>
      <div className={styles.Signin}>
        <h1 className={styles.Head}>Sign in</h1>
        <h4 className={styles.SubHead}>PLEASE ENTER YOUR LOGIN AND PASSWORD</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.SigninBox}>
            <input
              placeholder="Enter Email-id"
              className={styles.SigninBoxInput}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </div>
          <div className={styles.SigninBox}>
            <input
              type="password"
              placeholder="Enter Password"
              className={styles.SigninBoxInput}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </div>
          <div className={styles.SigninLinkBox}>
            <label className={styles.SigninBoxLink}>
              <Link href="/forgotpaword">
                <>Forgot Password ?</>
              </Link>
            </label>
          </div>
          <div className={styles.SigninBox}>
            <Button
              className={styles.SigninBoxButton}
              type="button"
              onClick={userSignin}
              colorScheme="#6a19a4"
            >
              LOGIN
            </Button>
          </div>
        </form>
        <h4 className={styles.LastHead}>
          <Link href="newuser">Don’t have an account? Sign up</Link>
        </h4>
      </div>
    </AuthLayout>
  );
}
