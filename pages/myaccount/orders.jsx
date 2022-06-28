import React from "react";
import MyaccLayout from "../../Layout/MyaccLayout";
import styles from "../../styles/myaccount/Orders.module.scss";
import { Select } from "@chakra-ui/react";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import SpinnerLoader from "../../components/Spinner";
import { useSelector } from "react-redux";
import { BACKEND_API } from "../../cred";

export default function Orders() {
  const user = useSelector((state) => state.user.userData);
  const id = user?.savedUser?._id;

  const { data, isLoading, isError } = useQuery("orders", () =>
    axios.get(`${BACKEND_API}/user/orders/${id}`)
  );

  if (isLoading) {
    return <SpinnerLoader />;
  }

  const orders = data.data.data;

  return (
    <MyaccLayout>
      <main className={styles.Orders}>
        <header>
          <h2>My Orders</h2>
          <div className={styles.OrdersCont}>
            <div className={styles.OrdersContInput}>
              <Image
                alt="search"
                height="20px"
                width="20px"
                className={styles.OrdersContInputImg}
                src="/myaccount/search.svg"
              />
              <input placeholder="Search all orders" />
              <button>Search</button>
            </div>
            {/* <div className={styles.OrdersContSelect}>
              <Select placeholder="Filter" className={styles.Select}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div> */}
          </div>
        </header>
        <section>
          {orders.map((o) => {
            const n = o.items;
            return n.map((h) => <Card data={h} key={o._id} />);
          })}
        </section>
      </main>
    </MyaccLayout>
  );
}

const Card = ({ data }) => {
  console.log("order details", data);
  // const { amount, name } = data;
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <Image
          height="100px"
          width="100px"
          alt="product"
          src={data.images[0]}
        />
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardInfoName}>{data.name}</span>
        <span className={styles.cardInfoDel}>
          <span className={styles.cardInfoDelTxt}>Delivered on</span>
          <span className={styles.cardInfoDelDate}>20th May 2022</span>
        </span>
        <span className={styles.cardInfoId}>{data._id}</span>
        <span className={styles.cardInfoRating}>4.5</span>
      </div>
      <span className={styles.cardPrice}>{data.amount}</span>
      <div className={styles.cardDel}>
        <span className={styles.cardDelTxt}>Delivered on</span>
        <span className={styles.cardDelDate}>20th May 2022</span>
      </div>
    </div>
  );
};
