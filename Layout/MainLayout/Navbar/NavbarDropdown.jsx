import React from "react";
import Image from "next/image";
import styles from "./NavbarDropdown.module.scss";
import img from "/public/bangleMain.png";
import Link from "next/link";

const Jwellery = ({ data }) =>
  data?.map((d) => (
    <div key={d.id} className={styles.Jwellery}>
      <Link href={d.link}>
        <h1 className={styles.JwelleryH}>{d.name}</h1>
      </Link>
      {d.data.map((k, idx) => (
        <Link href={k.link}>
          <p key={idx} className={styles.JwelleryP}>
            {k.name}
          </p>
        </Link>
      ))}
    </div>
  ));

const GoldDiamondGifts = ({ data }) =>
  data?.map((d, idx) => (
    <Link key={idx} href={d.link}>
      <div className={styles.GoldDiamondGifts}>
        <div style={{ width: "100%", height: "100%" }}>
          {/* <Image
            alt="image"
            src="https://storage.sg.content-cdn.io/cdn-cgi/image/%7Bwidth%7D,%7Bheight%7D,quality=75,format=auto,fit=cover,g=top/in-resources/d7048855-742a-406c-a67d-5c2962e69e5e/Images/ProductImages/Source/1000976606_1.jpg"
            priority={true}
            width="200px"
            height="200px"
            objectFit="cover"
          /> */}
        </div>

        <div className={styles.GoldDiamondGiftsP} style={{ textTransform: "" }}>
          {d.name}
        </div>
      </div>
    </Link>
  ));

const Coins = ({ data }) =>
  data?.map((d, idx) => (
    <div key={idx} className={styles.Coins}>
      <div>
        {/* <Image alt="image" src={img} priority={true} fill={true} /> */}
      </div>
      <div className={styles.CoinsP}>{d.name}</div>
      <div>
        {d?.data?.map((m, idx) => (
          <Link href={m.link}>
            <p key={idx} className={styles.CoinsSub}>
              {m.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  ));

const ShipNow = ({ data }) => data?.map((d) => <p key={d.id}>{d.name}</p>);

const Page = ({ id, data }) => {
  if (id === 1) {
    return <Jwellery data={data} />;
  } else if (id === 4) {
    return <Coins data={data} />;
  } else if (id === 6) {
    return <ShipNow data={data} />;
  } else {
    return <GoldDiamondGifts data={data} />;
  }
};

export default function NavbarDropdown({ id, data, scrollNav, show }) {
  console.log(show);
  return (
    <div
      className={styles.Dropdown}
      onMouseOver={(e) => e.stopPropagation()}
      style={{
        top: scrollNav ? "93px" : "178px",
        opacity: 1,
        transform: !show ? "translateY(-10px)" : "translateY(0px)",
      }}
    >
      <div className={styles.DropdownCont}>
        <Page id={id} data={data} />
      </div>
    </div>
  );
}
