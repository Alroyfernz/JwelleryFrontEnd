import React, { useState, useEffect } from "react";
import styles from "./Newarrival.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Slider from "react-slick";
import Pendant from "/public/Pendant.svg";
import Braclet from "/public/Braclet.svg";
import Ring from "/public/Ring.svg";
import Earning from "/public/Earning.svg";
import { Carousel } from "react-responsive-carousel";
import { GrNext, GrPrevious } from "react-icons/gr";

const NewArrivals = () => {
  const arrivalData = [
    {
      name: "pendant",
      uri: Pendant,
    },
    {
      name: "Earnings",
      uri: Earning,
    },
    {
      name: "Rings",
      uri: Ring,
    },
    {
      name: "PLATINUM  BRACELET",
      uri: Braclet,
    },
  ];
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "25px",
    // dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
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
  const [index, setIndex] = useState(0);
  // console.log(index);
  useEffect(() => {}, []);
  const handleSlide = (direction) => {
    // console.log("call");
    if (direction == "left") {
      setIndex(index == 0 ? 2 : index - 1);
    }
    if (direction == "right") {
      setIndex(index == 2 ? 0 : index + 1);
    }
  };

  return (
    <section className={styles.arrivalSection}>
      <h1 className={styles.arrivalTitle}> New arrivals</h1>
      {/* <BsChevronLeft
        className={styles.leftNav}
        onClick={() => {
          // console.log("bruh");
          handleSlide("left");
        }}
      />
      <BsChevronRight
        className={styles.rightNav}
        onClick={() => {
          handleSlide("right");
        }}
      /> */}
      <div className={styles.arrivalContainer}>
        <div className={styles.arrivalWrapper}>
          <Slider {...settings} style={{ width: "85%" }}>
            {arrivalData.map((data, idx) => {
              return (
                <div className={styles.arrivalComp} key={idx}>
                  <Image src={data?.uri} width="200px" height="160px" />
                  <h5>{data?.name}</h5>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
