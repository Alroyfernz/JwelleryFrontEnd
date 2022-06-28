import React, { useState } from "react";
import SectionHeader from "../common/SectionHeader";
import styles from "./Review.module.scss";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { BACKEND_API } from "../../../cred";
import Avatar from "react-avatar";

export default function Review({ productId }) {
  const ReviewsData = [
    { id: 5, percentage: "20%", count: 20 },
    { id: 4, percentage: "70%", count: 70 },
    { id: 3, percentage: "10%", count: 10 },
    { id: 2, percentage: "0%", count: 0 },
    { id: 1, percentage: "0%", count: 0 },
  ];

  const fetchProductReviews = (id) => {
    return axios.get(`${BACKEND_API}/productreviews/${id}`);
  };

  const { data, isLoading, isError } = useQuery(
    ["Review", productId],
    () => fetchProductReviews(productId),
    {
      enabled: !!productId,
    }
  );

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const reviews = data?.data?.data;

  return (
    <div className={styles.Review}>
      <SectionHeader name="Reviews" />
      {/* top */}
      <div className={styles.ReviewTop}>
        <div className={styles.ReviewTopLeft}>
          <div className={styles.ReviewTopLeftRatings}>
            <span className={styles.ReviewTopLeftRatingsBig}>4.0</span>
            <span className={styles.ReviewTopLeftRatingsSmall}>/5</span>
          </div>
          <span className={styles.ReviewTopLeftnumbers}>
            {reviews?.length}
            reviews
          </span>
          <div className={styles.ReviewTopLeftstars}></div>
          <span className={styles.ReviewTopLefttxt}>Average Rating</span>
        </div>
        <div className={styles.ReviewTopRight}>
          {ReviewsData.map((r) => (
            <div key={r.id} className={styles.ReviewTopRightRow}>
              <span className={styles.ReviewTopRightRowRating}>{r.id}</span>
              <Image height="20" width="20" src="/SingleProduct/progress.svg" />
              <Progress width={r.percentage} />
              <span className={styles.ReviewTopRightRowCount}>{r.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.ReviewBottom}>
        {data?.data?.data?.map((r) => (
          <Card
            key={r.user.id}
            name={r.user.fName + " " + r.user.lName}
            ratings={r.ratings}
            review={r.title}
          />
        ))}
      </div>
      <div className={styles.ReviewLoadMore}>
        <div className={styles.ReviewLoadMoreText}>Load More</div>
      </div>
    </div>
  );
}

const Progress = ({ width }) => (
  <div className={styles.Progress}>
    <div
      className={styles.ProgressBar}
      style={{
        width,
      }}
    ></div>
  </div>
);

const Card = ({ avatar, name, ratings, reviewImages, review }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggle = () => setIsReadMore(!isReadMore);
  return (
    <div className={styles.Rcard}>
      <div className={styles.RcardR}>
        <div className={styles.RcardRR}>
          <span className={styles.RcardRRname}>{name}</span>
          <span className={styles.RcardRRratings}>
            {new Array(ratings).fill("").map((f) => (
              <Image
                height="25px"
                width="25px"
                src="/SingleProduct/filled.svg"
              />
            ))}
            {new Array(5 - ratings).fill("").map((f) => (
              <Image
                height="25px"
                width="25px"
                src="/SingleProduct/empty.svg"
              />
            ))}
          </span>
        </div>
      </div>
      <div className={styles.RcardL}>
        {isReadMore ? review.slice(0, 200) : review}
        <span onClick={toggle} className={styles.RcardLButton}>
          {isReadMore ? " Read more.." : " Show less.."}
        </span>
      </div>
    </div>
  );
};
