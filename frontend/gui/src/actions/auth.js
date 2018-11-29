import axios from "axios";
import { AUTH_LOADING, AUTH_ERROR, AUTH_USER } from "./types";

export const authLoading = value => {
  return {
    type: AUTH_LOADING,
    payload: value
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const authUser = token => {
  return {
    type: AUTH_USER,
    payload: token
  };
};

export const signout = () => dispatch => {
  // remove token from local storage
  dispatch({
    type: AUTH_USER,
    payload: ""
  });
};

export const signIn = ({ username, password }, callback) => dispatch => {
  dispatch({ type: AUTH_LOADING, payload: true });
  console.log({ username, password });
  // make post requst, dispatch if there are errors
  dispatch({ type: AUTH_LOADING, payload: false });
};

export const signUp = (
  { username, password, confirmPassword },
  callback
) => dispatch => {
  dispatch({ type: AUTH_LOADING, payload: true });
  console.log({ username, password, confirmPassword });
  // make post requst, dispatch if there are errors, and dispath AUTH_USER as well
  dispatch({ type: AUTH_LOADING, payload: false });
};
