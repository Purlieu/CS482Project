import { SEARCH_QUERY_UPDATE, FETCH_LATEST_NEWS, GET_GAME_QUERY } from "../actions/types";

const INITIAL_STATE = {
  query: "",
  games: [],
  news: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_QUERY_UPDATE:
      return { ...state, query: action.payload };
    case FETCH_LATEST_NEWS:
      return { ...state, news: action.payload };
    case GET_GAME_QUERY:
      return { ...state, games: action.payload }
    default:
      return state;
  }
}
