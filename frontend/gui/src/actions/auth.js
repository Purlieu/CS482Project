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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  dispatch({
    type: AUTH_USER,
    payload: null
  });
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime * 1000);
  };
};

export const signIn = ({ username, password }, callback) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  api
    .signIn({ username, password })
    .then(data => {
      let token = data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch({ type: AUTH_USER, payload: token });
      dispatch(checkAuthTimeout(3600));
    })
    .catch(() => {
      dispatch({
        type: AUTH_ERROR,
        payload: "Unable to log in with provided credentials"
      });
    })
    .finally(() => {
      dispatch({ type: LOADING, payload: false });
      callback();
    });
};

export const signUp = (
  { username, email, password1, password2 },
  callback
) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  api
    .signUp({ username, email, password1, password2 })
    .then(data => {
      let token = data.key;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch({ type: AUTH_USER, payload: token });
      dispatch(checkAuthTimeout(3600));
    })
    .catch(err => {
      dispatch({ type: AUTH_ERROR, payload: err.response.data });
    })
    .finally(() => {
      dispatch({ type: LOADING, payload: false });
      callback();
    });
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(signOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(signOut());
      } else {
        dispatch({ type: AUTH_USER, payload: token });
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
