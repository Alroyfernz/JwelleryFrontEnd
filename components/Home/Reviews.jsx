import React from "react";
import Slider from "react-slick";
import styles from "./Review.module.scss";

import { ReviewData } from "../../data/Review/ReviewData";
import { GrNext, GrPrevious } from "react-icons/gr";
import StarF from "/public/StarF.svg";
import StarNF from "/public/StarNF.svg";
import Image from "next/image";

const Reviews = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    // dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <GrNext />,
    prevArrow: <GrPrevious />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.ReviewContainer}>
      <div className={styles.ReviewWrapper}>
        <h1 className={styles.ReviewTitle}>REVIEW'S</h1>
        <div className={styles.SliderWrapper}>
          <Slider
            {...settings}
            style={{ width: "78%", backgroundColor: "#fff" }}
          >
            {ReviewData.map((item, i) => (
              <ReviewBox text={item.message} maxRating={item.rating} key={i} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const ReviewBox = ({ text, maxRating }) => {
  return (
    <div className={styles.BoxContainer}>
      <div className={styles.BoxWrapper}>
        <div className={styles.TopSection}>
          <div className={styles.UserImg}></div>
          <div className={styles.RatingBar}>
            {[...new Array(5)].map((arr, index) => {
              return index < 3 ? (
                <Image src={StarF} width={16} height={16} />
              ) : (
                <Image src={StarNF} width={16} height={16} />
              );
            })}
          </div>
        </div>
        <div className={styles.BottomSection}>
          <h4 className={styles.ReviewText}>{text}</h4>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
