import { LOADING, ERROR, AUTH_USER } from "./types";
import api from "../api";

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
  api.signIn({ username, password });
  dispatch({ type: LOADING, payload: false });

  // callback();
};

export const signUp = (
  { username, email, password1, password2 },
  callback
) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  api.signUp({ username, email, password1, password2 });
  // make post requst, dispatch if there are errors, and dispath AUTH_USER as well
  dispatch({ type: LOADING, payload: false });

  // callback();
};
