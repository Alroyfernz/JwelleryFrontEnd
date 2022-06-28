import axios from "axios";
import { BACKEND_API } from "../../cred";

//use this thunk implementation to store cart products into redux store without implementation in useEffect
export const fetchCart = (userId) => async (dispatch) => {
  try {
    console.log("fired");
    const data = await axios.get(`${BACKEND_API}/user/${userId}`);
    console.log(data.data);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.data.data.cart,
    });
  } catch (error) {
    console.log(error.message);
  }
};
