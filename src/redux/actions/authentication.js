import { SET_CURRENT_USER } from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      history.replace("/");
    } catch (err) {
      console.error(err);
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      history.replace("/");
    } catch (err) {
      console.error(err);
    }
  };
};

export const logout = () => setCurrentUser();

export const checkForExpiredToken = () => {
  // Check for token expiration
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;
    // Decode token and get user info
    user = jwt_decode(token);
    // Check token expiration
    if (user.exp >= currentTimeInSeconds) {
      // Set user
      return setCurrentUser(token);
    }
  }
  return logout();
};
