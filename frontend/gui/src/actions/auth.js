import axios from "axios";
import { SET_LOADING, AUTH_ERROR, AUTH_USER } from "./types";

export const setLoading = value => {
  return {
    type: SET_LOADING,
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
  dispatch({ type: SET_LOADING, payload: true });
  console.log({ username, password });
  // make post requst, dispatch if there are errors
  dispatch({ type: SET_LOADING, payload: false });
};

export const signUp = (
  { username, password, confirmPassword },
  callback
) => dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
  console.log({ username, password, confirmPassword });
  // make post requst, dispatch if there are errors, and dispath AUTH_USER as well
  dispatch({ type: SET_LOADING, payload: false });
};
