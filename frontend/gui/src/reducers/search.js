import { SEARCH_QUERY_UPDATE, FETCH_LATEST_NEWS } from "../actions/types";

const INITIAL_STATE = {
  query: "",
  news: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_QUERY_UPDATE:
      return { ...state, query: action.payload };
    case FETCH_LATEST_NEWS:
      return { ...state, news: action.payload };
    default:
      return state;
  }
}
