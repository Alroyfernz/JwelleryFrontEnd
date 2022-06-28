import { useRouter } from "next/router";
import React from "react";
import styles from "./MyaccLayout.module.scss";
import Image from "next/image";
import { Select } from "@chakra-ui/react";

export default function MyaccLayout({ children }) {
  const router = useRouter();
  const path = router.pathname;
  const data = [
    {
      id: 1,
      icon: "/myaccount/account-l.svg",
      darkicon: "/myaccount/account-d.svg",
      name: "Personal Details",
      route: "/myaccount/details",
    },
    {
      id: 2,
      icon: "/myaccount/location-l.svg",
      darkicon: "/myaccount/location-d.svg",
      name: "Address",
      route: "/myaccount/address",
    },
    {
      id: 3,
      icon: "/myaccount/order-l.svg",
      darkicon: "/myaccount/order-d.svg",
      name: "My Orders",
      route: "/myaccount/orders",
    },
    {
      id: 4,
      icon: "/myaccount/heart-l.svg",
      darkicon: "/myaccount/heart-d.svg",
      name: "Wishlist",
      route: "/myaccount/wishlist",
    },
  ];

  return (
    <main className={styles.Myacc}>
      <header className={styles.MyaccHeader}>
        {data.map((d) => (
          <div
            className={styles.MyaccHeaderNav}
            style={{ background: path === d.route && "#FED19E" }}
            key={d.id}
            onClick={() => router.push(`${d.route}`)}
          >
            <Image
              height="18px"
              alt="icon"
              width="18px"
              src={path === d.route ? d.darkicon : d.icon}
            />
            <span>{d.name}</span>
          </div>
        ))}
      </header>
      {/* <div>
        <Select
          size="lg"
          bg="white"
          borderColor="tomato"
          color="gray"
          value={`/${path}`}
          onSelect={(val) => {
            console.log("val", val);
            router.push(val);
          }}
        >
          {data.map((d) => (
            <option value={d.route} key={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </div> */}
      <section className={styles.MyaccBottom}>{children}</section>
    </main>
  );
}
