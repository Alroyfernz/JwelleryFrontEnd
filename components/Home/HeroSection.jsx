import React from "react";
import styles from "./Hero.module.scss";
import { heroData } from "../../data/HeroSection/heroSection";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="home" className={styles.heroContainer}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        className="carousel-root"
        showThumbs={false}
      >
        {heroData.map((slide, id) => (
          <div className={styles.ImageWrapper} key={id}>
            <Image
              objectFit="cover"
              priority={true}
              src={slide}
              alt="img"
              className={styles.heroImage}
              layout="fill"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;
