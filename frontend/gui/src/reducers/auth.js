import { AUTH_USER, AUTH_ERROR, AUTH_LOADING } from "../actions/types";

const INITIAL_STATE = {
  user: "",
  errorMessage: "",
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_USER:
      return { ...state, user: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
