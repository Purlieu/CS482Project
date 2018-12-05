import { AUTH_USER } from "../actions/types";

const INITIAL_STATE = {
  user: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
