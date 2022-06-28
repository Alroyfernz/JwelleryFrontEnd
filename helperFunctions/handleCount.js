export const handleCount = (items) => {
  console.log(items);
  console.log("count handle");
  if (items?.length == 0) {
    console.log("Empty");
    return;
  }
  console.log("aila re?");
  const countMap = new Map();
  const mainMap = new Map();
  items?.forEach((item) => {
    if (countMap.has(item._id)) {
      var count = countMap.get(item._id);
      countMap.set(item._id, count + 1);
    } else {
      countMap.set(item._id, 1);
    }

    mainMap.set(item._id, item);
  });
  const newArr = [];
  countMap.forEach((value, key) => {
    newArr.push({ id: key, count: value });
  });
  newArr.forEach((element, index) => {
    const entire = mainMap.get(element.id);
    newArr[index] = { ...entire, count: element.count };
  });
  console.log(newArr, "final arr");
  return newArr;
};
