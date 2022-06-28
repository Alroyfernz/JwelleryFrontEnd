import React from "react";
import { Spinner } from "@chakra-ui/react";
const SpinnerLoader = ({ width }) => {
  return (
    <div
      style={{
        width: `${width}vw`,
        height: "94vh",
        display: "flex",
        zIndex: 0,
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
      <h1 style={{ marginTop: 10 }}>Loading....</h1>
    </div>
  );
};

export default SpinnerLoader;
