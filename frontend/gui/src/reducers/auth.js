import { AUTH_USER, AUTH_ERROR } from "../actions/types";

const INITIAL_STATE = {
  user: null,
  authError: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.payload };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    default:
      return state;
  }
}
