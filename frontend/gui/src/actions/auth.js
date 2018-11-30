import { LOADING, AUTH_USER, AUTH_ERROR } from "./types";
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
  api
    .signIn({ username, password })
    .then(token => {
      dispatch({ type: AUTH_USER, payload: token });
    })
    .catch(err => {
      console.log(err.response.data);

      dispatch({
        type: AUTH_ERROR,
        payload: "Unable to log in with provided credentials"
      });
    })
    .finally(() => {
      dispatch({ type: LOADING, payload: false });
      // callback();
    });

  // callback();
};

export const signUp = (
  { username, email, password1, password2 },
  callback
) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  api
    .signUp({ username, email, password1, password2 })
    .then(token => {
      dispatch({ type: AUTH_USER, payload: token });
    })
    .catch(err => {
      console.log(err.response.data);

      dispatch({ type: AUTH_ERROR, payload: err.response.data });
    })
    .finally(() => {
      dispatch({ type: LOADING, payload: false });
      // callback();
    });
};
