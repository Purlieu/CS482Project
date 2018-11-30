import { LOADING, ERROR } from "../actions/types";

const INITIAL_STATE = {
  errorMessage: "",
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
