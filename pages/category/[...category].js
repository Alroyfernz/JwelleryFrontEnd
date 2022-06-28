import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../../components/ProductCard";
import styles from "../../styles/category.module.scss";
import { BiRupee } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { BACKEND_API } from "../../cred";

const Category = () => {
  const router = useRouter();
  const colorRef = useRef(null);
  console.log(colorRef);
  const href = router.asPath.split("?")[0];
  const queryMain = router.asPath.split("?")[1];
  console.log(queryMain);
  const { category } = router.query;
  console.log(category);
  const [maxPrice, setMax] = useState(0);
  const categoryName = category && category[0];
  const subName = category && category[1];
  const lastName = category && category[2];
  const [range, setRange] = useState([0, 100000000]);
  if (typeof lastName == undefined) console.log("last not mentioned!");

  const handleChange = (color, isGold) => {
    let query = isGold ? { gold: color } : { color };
    router.push(
      {
        pathname: href,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const MetalColors = [
    {
      id: 1,
      name: "YELLOW",
      handleChange: () => handleChange("yellow", false),
    },
    {
      id: 2,
      name: "WHITE",
      handleChange: () => handleChange("white", false),
    },
    {
      id: 3,
      name: "ROSE",
      handleChange: () => handleChange("rose", false),
    },
  ];

  const GoldPurity = [
    { id: 1, name: "14 KT", handleChange: () => handleChange("14", true) },
    { id: 2, name: "18 KT", handleChange: () => handleChange("18", true) },
    { id: 3, name: "20 KT", handleChange: () => handleChange("20", true) },
    { id: 4, name: "22 KT", handleChange: () => handleChange("22", true) },
  ];

  const fetchCategory = async () => {
    //search for only main category
    if (category?.length == 1) {
      console.log("search for only main");
      return axios.get(
        `${BACKEND_API}/getproducts?category=${categoryName}&${queryMain}`
      );
    } else if (category?.length == 2) {
      //search for main and under category

      //just check here for &
      subName = subName.split("&");
      if (subName.length == 2) {
        return axios.get(
          `${BACKEND_API}/getproducts?category=${categoryName}&sub=${subName[0]}/${subName[1]}&${queryMain}`
        );
      } else {
        return axios.get(
          `${BACKEND_API}/getproducts?category=${categoryName}&sub=${subName}&${queryMain}`
        );
      }
    } else if (category?.length == 3) {
      //search for main,under and sub category

      return axios.get(
        `${BACKEND_API}/getproducts?category=${categoryName}&sub=${subName}&last=${lastName}&from=${
          range[0] ?? 1
        }&to=${range[1] ?? 10000000}&${queryMain}`
      );
    }
    ``;
  };

  const { isLoading, isFetching, data } = useQuery(
    `${categoryName}-${subName}-${lastName}-${range[0]}-${range[1]}-${queryMain}-data`,
    fetchCategory,
    { enabled: !![categoryName, subName, lastName] }
  );
  console.log(isLoading, isFetching);
  useEffect(() => {
    const price = data?.data[data?.data?.length - 1].amount;
    console.log(price);
    if (price == null) {
      setRange([0, 100000]);
      setMax(100000);
      return;
    }
    setRange([0, price]);
    setMax(price);
  }, []);

  const Common = () => (
    <Accordion
      className={styles.filterAccordion}
      defaultIndex={[0]}
      allowMultiple
    >
      <AccordionItem className={styles.boxMain}>
        <h2 className={styles.checkboxHeader}>
          <AccordionButton>
            PRICE
            <GrAdd />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <RangeSlider
            defaultValue={range}
            onChangeEnd={(e) => {
              console.log(e);
              setRange(e);
            }}
            min={0}
            max={maxPrice}
            valueLabelDisplay="on"
          >
            <RangeSliderTrack
              bg="white"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.41)",
              }}
            >
              <RangeSliderFilledTrack bg="#800000" />
            </RangeSliderTrack>
            <RangeSliderThumb
              index={0}
              style={{
                border: "2px solid #800000",
              }}
            />
            <RangeSliderThumb
              index={1}
              style={{
                border: "2px solid #800000",
              }}
            />
          </RangeSlider>
          <div className={styles.priceCont}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <BiRupee />
              {range[0]}
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <BiRupee />
              {range[1]}
            </span>
          </div>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem className={styles.boxMain}>
        <h2 className={styles.checkboxHeader}>
          <AccordionButton>
            PRODUCT TYPE
            <GrAdd />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack spacing={1} direction="column">
            <Checkbox className={styles.checkbox} borderColor="#460404">
              DIAMOND BANGLES
            </Checkbox>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem className={styles.boxMain}>
        <h2 className={styles.checkboxHeader}>
          <AccordionButton>
            METAL COLOUR
            <GrAdd />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack spacing={1} direction="column">
            {MetalColors.map((m) => (
              <Checkbox
                key={m.id}
                className={styles.checkbox}
                onChange={m.handleChange}
                borderColor="#460404"
              >
                {m.name}
              </Checkbox>
            ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem className={styles.boxMain}>
        <h2 className={styles.checkboxHeader}>
          <AccordionButton>
            GOLD PURITY
            <GrAdd />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack spacing={1} direction="column">
            {GoldPurity.map((g) => (
              <Checkbox
                key={g.id}
                className={styles.checkbox}
                onChange={g.handleChange}
                borderColor="#460404"
              >
                {g.name}
              </Checkbox>
            ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem className={styles.boxMainLast}>
        <h2 className={styles.checkboxHeader}>
          <AccordionButton>
            DIAMOND SHOP FOR
            <GrAdd />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack spacing={1} direction="column">
            <Checkbox className={styles.checkbox} borderColor="#460404">
              Women
            </Checkbox>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );

  if (isLoading) {
    return (
      <div
        style={{
          width: "90vw",
          height: "94vh",
          display: "flex",
          zIndex: 999,
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",

          flexDirection: "column",
          top: 0,
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <h1 style={{ marginTop: 10 }}>Loading....</h1>;
      </div>
    );
  }
  return (
    <div className={styles.categoryContainer}>
      <img
        src="https://storage.sg.content-cdn.io/in-resources/d7048855-742a-406c-a67d-5c2962e69e5e/Images/userimages/Category_images/Diaomond_jewellery/Diamond_Bracelets.jpg"
        alt="img"
        className={styles.productImage}
      />
      <div className={styles.productSection}>
        <div className={styles.productWrapper}>
          <div className={styles.filterSection}>
            <h1 className={styles.filterTitle}>Filter by</h1>
            <Common />
          </div>
          <Accordion allowMultiple className={styles.mobileFilter}>
            <AccordionItem>
              {/* <h2> */}
              <AccordionButton
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2>FILTER BY</h2>
                <GrAdd />
              </AccordionButton>
              {/* </h2> */}
              <AccordionPanel pb={4}>
                <div className={styles.filterSection}>
                  <Common />
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <div className={styles.allProducts}>
            <div className={styles.productsWrapper}>
              <span className={styles.backNavi}>
                {/* <Link href="/">Home</Link>/<Link href="/cats">Category</Link> */}
                category/
                {category?.map((cat, idx) => {
                  return (
                    <Link key={idx} href="/">
                      <a>
                        {cat}{" "}
                        <span
                          style={{
                            opacity: idx == category.length - 1 ? 0 : 1,
                          }}
                        >
                          /
                        </span>
                      </a>
                    </Link>
                  );
                })}
              </span>
              <div className={styles.heading}>
                <div>
                  <h1 className={styles.productHeading}>
                    {/* {typeof category !== null && category[0] & category[1]} */}
                  </h1>
                  <span>({data?.data.length} Designs)</span>
                </div>
                <div className={styles.sort}>
                  <span>SORT BY</span>
                  <Select
                    className={styles.sortselect}
                    placeholder="Popularity"
                    onChange={(i) => {
                      var searchValue = i.target.value;
                      console.log(searchValue);
                      router.push(
                        {
                          pathname: href,
                          query: { sort: `price_${searchValue}` },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                  >
                    <option value="asc">Price:Low to High</option>
                    <option value="desc">Price:High to Low</option>
                    <option value="option3">Relevance</option>
                    <option value="option3">Discount</option>
                  </Select>
                </div>
              </div>
              <div className={styles.products}>
                {data?.data?.map((prod, idx) => (
                  <Link key={idx} href={`/singleproduct/${prod._id}`} passHref>
                    <a target="_blank" className={styles.singleProductWrapper}>
                      <ProductCard item={prod} key={idx} large />
                    </a>
                  </Link>
                ))}

                {data?.data?.length == 0 && <div>no items currently here!</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
