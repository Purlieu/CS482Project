import {
  SEARCH_QUERY_UPDATE,
  FETCH_LATEST_NEWS,
  GET_GAME_QUERY,
  UPDATE_PAST_SEARCHES,
  CLEAR_PAST_SEARCHES
} from "../actions/types";

const INITIAL_STATE = {
  query: "",
  games: [],
  news: [],
  pastSearches: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_QUERY_UPDATE:
      return { ...state, query: action.payload };
    case FETCH_LATEST_NEWS:
      return { ...state, news: action.payload };
    case GET_GAME_QUERY:
      return { ...state, games: action.payload };
    case UPDATE_PAST_SEARCHES:
      return {
        ...state,
        pastSearches: [...state.pastSearches, action.payload]
      };
    case CLEAR_PAST_SEARCHES:
      return { ...state, pastSearches: action.payload };
    default:
      return state;
  }
}
