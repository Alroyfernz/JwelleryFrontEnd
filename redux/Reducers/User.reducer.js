let usrD;
let isLoggedIn;
if (typeof window !== "undefined") {
  if (localStorage.getItem("user_data") != null) {
    usrD = JSON.parse(localStorage.getItem("user_data"));
    isLoggedIn = usrD ? true : false;
  } else {
    usrD = null;
    isLoggedIn = false;
  }
}

const initialState = {
  ...usrD,
};

export const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      console.log("dispatched", action.payload);
      return {
        userData: action.payload,
        isLoggedIn: true,
      };
    }
    case "USER_REGISTER": {
      break;
    }
    case "USER_LOGOUT": {
      localStorage.removeItem("user_data");
      return {
        userData: null,
        isLoggedIn: false,
      };
    }

    case "USER_REFRESH": {
      console.log(action.payload);
      return action.payload;
    }
    default: {
      return prevState;
    }
  }
};
