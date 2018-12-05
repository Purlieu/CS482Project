import { SEARCH_QUERY_UPDATE } from "../actions/types";

const INITIAL_STATE = {
  query: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_QUERY_UPDATE:
      return { ...state, query: action.payload };
    default:
      return state;
  }
}
