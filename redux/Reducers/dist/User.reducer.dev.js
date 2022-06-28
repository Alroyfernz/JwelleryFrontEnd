"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReducer = void 0;
var usrD;
var isLoggedIn;

if (typeof window !== "undefined") {
  if (localStorage.getItem("user_data") != null) {
    usrD = JSON.parse(localStorage.getItem("user_data"));
    isLoggedIn = usrD ? true : false;
  } else {
    usrD = null;
    isLoggedIn = false;
  }
}

var initialState = {
  userData: usrD,
  isLoggedIn: isLoggedIn
};

var userReducer = function userReducer() {
  var prevState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "USER_LOGIN":
      {
        console.log("dispatched", action.payload);
        return {
          userData: action.payload,
          isLoggedIn: true
        };
      }

    case "USER_REGISTER":
      {
        break;
      }

    case "USER_LOGOUT":
      {
        localStorage.removeItem("user_data");
        return {
          userData: null,
          isLoggedIn: false
        };
        break;
      }

    default:
      {
        return prevState;
      }
  }
};

exports.userReducer = userReducer;