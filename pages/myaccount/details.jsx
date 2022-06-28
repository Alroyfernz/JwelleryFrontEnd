import Image from "next/image";
import React, { useState } from "react";
import MyaccLayout from "../../Layout/MyaccLayout";
import styles from "../../styles/myaccount/Details.module.scss";
import Avatar from "react-avatar";
import { Select } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { BACKEND_API } from "../../cred";
import SpinnerLoader from "../../components/Spinner";
import { useSelector } from "react-redux";

export default function Details() {
  const user = useSelector((state) => state.user.userData);
  const id = user?.savedUser?._id;

  const [edit, setEdit] = useState(false);
  const { data, isLoading, isError } = useQuery(`user`, () =>
    axios.get(`${BACKEND_API}/user/${id}`)
  );

  if (isLoading) {
    return <SpinnerLoader />;
  }

  const { fName, lName, email, mobileNo, country, gender } = data?.data?.data;

  return (
    <MyaccLayout>
      <main className={styles.Details}>
        <header>
          <h2>Personal details</h2>
          {!edit && (
            <button onClick={() => setEdit(true)}>
              <Image
                alt="edit"
                height="12px"
                width="12px"
                src="/myaccount/edit.svg"
              />
              edit
            </button>
          )}
        </header>
        <figure>
          <Avatar name={fName} round size="80px" className={styles.avatar} />
        </figure>
        <div className={styles.DetailsName}>
          <div>
            <label>Name : </label>
            {edit ? (
              <input type="select" placeholder="Enter your name" />
            ) : (
              <span>{fName + lName}</span>
            )}
          </div>
          {/* <div>
            <label>Anniversary date : </label>
            {edit ? <input type="date" /> : <span>JOHN</span>}
          </div> */}
        </div>
        <div>
          <label>Age : </label>
          {edit ? (
            <input type="select" placeholder="Enter your age" />
          ) : (
            <span>JOHN</span>
          )}
        </div>
        <div>
          <label>Gender : </label>
          {edit ? (
            <span>
              <Select
                placeholder="Select your gender"
                className={styles.Select}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </span>
          ) : (
            <span>{gender}</span>
          )}
        </div>
        <div className={styles.DetailsName}>
          <span>
            <label>Mobile No : </label>
            {edit ? (
              <input
                type="number"
                max="10"
                placeholder="Enter your phone number"
              />
            ) : (
              <span>{mobileNo}</span>
            )}
          </span>
          {/* <span>
            <label>AlternateMobile No : </label>
            {edit ? (
              <input
                max="10"
                type="number"
                placeholder="Enter your alternate phone number"
              />
            ) : (
              <span>69 April</span>
            )}
          </span> */}
        </div>
        <div>
          <label>Email id : </label>
          {edit ? (
            <input type="email" placeholder="Enter your email" />
          ) : (
            <span>{email}</span>
          )}
        </div>
        {edit && (
          <button
            className={styles.DetailsSave}
            onClick={() => {
              setEdit(false);
            }}
          >
            Save
          </button>
        )}
      </main>
    </MyaccLayout>
  );
}
