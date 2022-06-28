import React from "react";
import styles from "./checkout.module.scss";

const items = ["sign in", "delivery", "review order", "payment option"];
const CheckoutNav = ({ toggleOne, isFirst, isSecond, isThird, isForth }) => {
  return (
    <div className={styles.NavContainer}>
      <div className={styles.NavContainerWrapper}>
        {items.map((item, idx) => {
          return (
            <div
              key={item}
              className={
                (idx == 0 && isFirst) ||
                (idx == 1 && isSecond) ||
                (idx == 2 && isThird) ||
                (idx == 3 && isForth)
                  ? `${styles.NavItemSelected} ${styles.NavItem}`
                  : styles.NavItem
              }
              onClick={() => {
                switch (idx) {
                  case 0:
                    toggleOne("first");
                    break;
                  case 1:
                    toggleOne("second");
                    break;
                  case 2:
                    toggleOne("third");
                    break;
                  default:
                    toggleOne("forth");
                    break;
                }
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutNav;
