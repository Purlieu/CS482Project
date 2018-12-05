import axios from "axios";
import { LOADING, ERROR, AUTH_USER } from "./types";

export const authUser = token => {
  return {
    type: AUTH_USER,
    payload: token
  };
};

export const signOut = () => dispatch => {
  // remove token from local storage
  dispatch({
    type: AUTH_USER,
    payload: ""
  });
};

export const signIn = ({ username, password }, callback) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  console.log({ username, password });
  // make post requst, dispatch if there are errors
  dispatch({ type: LOADING, payload: false });

  // callback();
};

export const signUp = (
  { username, password, confirmPassword },
  callback
) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  console.log({ username, password, confirmPassword });
  // make post requst, dispatch if there are errors, and dispath AUTH_USER as well
  dispatch({ type: LOADING, payload: false });

  // callback();
};
