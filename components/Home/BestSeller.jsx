import React from "react";
import Link from "next/link";
import styles from "./BestSeller.module.scss";
import ProductCard from "../ProductCard";
import { bestSeller } from "../../data/BestSeller/bestSeller";
import axios from "axios";
import { BACKEND_API } from "../../cred";
import { useQuery } from "react-query";

const BestSeller = () => {
  const fetchCategory = async () => {
    return axios.get(`${BACKEND_API}/getallproducts?limit=4`);
  };

  const { isLoading, isFetching, data } = useQuery(
    `best-seller-products`,
    fetchCategory
  );
  console.log(data);
  return (
    <section className={styles.sellerSection}>
      <h1 style={styles.heading}>BESTSELLERS</h1>
      <div className={styles.productContainer}>
        <div className={styles.productWrapper}>
          {data?.data?.map((item, index) => {
            return (
              <Link href={`/singleproduct/${item._id}`} key={index}>
                <a target="_blank">
                  <ProductCard item={item} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
