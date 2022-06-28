import React, { useState, useEffect } from "react";
export default function useLocal() {
  const [localValue, setLocalValue] = useState(null);

  useEffect(() => {
    setLocalValue(localStorage.getItem("userData"));
    console.log(localValue);
  }, []);

  return {
    localValue,
  };
}
