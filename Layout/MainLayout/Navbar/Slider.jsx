import React, { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.scss";

const headerData = [
  "enjoy free delivery",
  "freeShipping above 4999/-",
  "Exclusive discounts",
];

export default function Slider() {
  const [curr, setCurr] = useState(0);
  const length = headerData.length;
  const time = useRef(null);
  useEffect(() => {
    const nextSlide = () => {
      setCurr(curr === length - 1 ? 0 : curr + 1);
    };
    time.current = setTimeout(nextSlide, 3000);
    return function () {
      if (time.current) {
        clearTimeout(time.current);
      }
    };
  }, [curr, length]);
  return (
    <div className={styles.Slider}>
      <div
        className={styles.WrapperSlider}
        style={{
          width: "300vw",
          display: "flex",
          transform: `translateX(-${curr * 100}vw)`,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {headerData.map((slide, idx) => {
          return (
            <div key={idx} className={styles.SliderCont}>
              <h1 className={styles.SliderContH1}>{slide}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
