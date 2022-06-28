import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import { BACKEND_API } from "../../cred";
import styles from "../../styles/SingleProduct.module.scss";
import Product from "../../components/SingleProduct/Product/Product";
import Delivery from "../../components/SingleProduct/Delivery/Delivery";
import Review from "../../components/SingleProduct/Review/Review";
import Specification from "../../components/SingleProduct/Specification/Specification";

export default function Singleproduct() {
  const router = useRouter();
  const { id } = router.query;

  const fetchSingleProduct = (id) => {
    return axios.get(`${BACKEND_API}/products/${id}`);
  };

  const { data, isLoading, isError, isFetching } = useQuery(
    ["product", id],
    () => fetchSingleProduct(id),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const product = data?.data;
  return (
    <div className={styles.SingleProduct}>
      <Product product={product} />
      {/* <Specification data={product} /> */}
      <Delivery />
      <Review productId={id} />
    </div>
  );
}
