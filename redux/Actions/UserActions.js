import axios from "axios";
import { BACKEND_API } from "../../cred";
import { useSelector } from "react-redux";

export const RefreshUser = (userId, user) => async (dispatch) => {
  try {
    const res = await axios.get(`${BACKEND_API}/user/${userId}`);
    console.log(res.data.data);
    const { isLoggedIn, ...rest } = user;
    console.log(rest);
    const { token, ...moreRest } = rest.userData;
    console.log(token, moreRest);
    const freshData = { ...moreRest.savedUser, ...res.data.data };
    console.log(freshData);
    localStorage.setItem(
      "user_data",
      JSON.stringify({
        isLoggedIn,
        userData: {
          token: token,
          savedUser: freshData,
        },
      })
    );
    dispatch({
      type: "USER_REFRESH",
      payload: {
        isLoggedIn,
        userData: {
          token: token,
          savedUser: freshData,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
