const initialState = {
  productList: [{ id: "123", name: "gold bangle", price: 25000, quantity: 1 }],
};

export const cartReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS": {
      return {
        productList: action.payload,
      };
    }
    case "ADD_PRODUCT": {
      // console.log("adding re");
      const prodxt = {
        id: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: action.payload.quantity,
      };
      return {
        productList: [
          ...prevState.productList,
          {
            id: action.payload._id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
          },
        ],
      };
    }

    case "DELETE_PRODUCT": {
      return {
        productList: prevState.productList.filter((item) => {
          item.id != action.payload._id;
        }),
      };
      break;
    }
    case "INCREASE_QTN": {
      var idx = 0;
      while (idx++ < prevState.productList.length) {
        if (prevState.productList[idx].id == action.payload._id) {
          break;
        }
      }

      prevState.productList[idx].quantity++;

      return {
        productList: prevState.productList,
      };
      break;
    }
    case "DECREASE_QTN": {
      var idx = 0;
      while (idx++ < prevState.productList.length) {
        if (prevState.productList[idx].id == action.payload._id) {
          break;
        }
      }
      if (prevState.productList[idx].quantity > 0) {
        prevState.productList[idx].quantity--;
      } else {
        prevState.productList.filter((item) => item.id != action.payload._id);
      }

      return {
        productList: prevState.productList,
      };
    }
    default:
      return prevState;
  }
};
