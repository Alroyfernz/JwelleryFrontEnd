import React from "react";
import MyaccLayout from "../../Layout/MyaccLayout";
import styles from "../../styles/myaccount/Wishlist.module.scss";
import { Select } from "@chakra-ui/react";
import Image from "next/image";
import { useQuery } from "react-query";
import SpinnerLoader from "../../components/Spinner";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_API } from "../../cred";

export default function Wishlist() {
  const user = useSelector((state) => state.user.userData);
  const id = user?.savedUser?._id;

  const { data, isLoading, isError } = useQuery("wishlist", () =>
    axios.get(`${BACKEND_API}/wishlist/${id}`)
  );
  console.log("id", id);
  if (isLoading) {
    return <SpinnerLoader />;
  }

  const { wishlist } = data?.data;

  return (
    <MyaccLayout>
      <main className={styles.Wish}>
        {/* top  */}
        <div className={styles.WishTop}>
          <h2>Wishlist</h2>
          {/* <div className={styles.Select}>
            <Select placeholder="Select option" className={styles.SelectStyle}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div> */}
        </div>
        {/* bottom  */}
        <div className={styles.WishBottom}>
          {wishlist.map((w) => (
            <Card data={w} key={w.id} />
          ))}
        </div>
      </main>
    </MyaccLayout>
  );
}

const Card = ({ data }) => {
  const { _id: id, name, images, amount } = data;
  return (
    <div className={styles.Card}>
      <div className={styles.CardInfo}>
        <Image
          alt="product"
          height="100px"
          width="150px"
          className={styles.CardInfoImg}
          src={images[1] ?? images[0]}
        />
        <div className={styles.CardInfoStyle}>
          <span className={styles.CardInfoStyleName}>{name}</span>
          <span className={styles.CardInfoStyleId}>{id}</span>
          <span className={styles.CardInfoStylePrice}>{amount}</span>
          <span className={styles.CardInfoStyleRating}>4.5</span>
        </div>
      </div>
      <Image
        height="20px"
        width="20px"
        alt="delete"
        src="/myaccount/delete.svg"
      />
      <span className={styles.CardPrice}>{amount}</span>
    </div>
  );
};
