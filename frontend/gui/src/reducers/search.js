import {
  SEARCH_QUERY_UPDATE,
  FETCH_LATEST_NEWS,
  GET_GAME_QUERY,
  UPDATE_PAST_SEARCHES,
  CLEAR_PAST_SEARCHES,
  SET_CURRENT_GAME,
  MY_SAVED_GAMES
} from "../actions/types";

const INITIAL_STATE = {
  query: "",
  games: [],
  news: [],
  pastSearches: [],
  currentGame: undefined,
  saved_games: []
};

export default function (state = INITIAL_STATE, action) {
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
    case SET_CURRENT_GAME:
      return { ...state, currentGame: action.payload }
    case MY_SAVED_GAMES:
      return { ...state, saved_games: action.payload };
    default:
      return state;
  }
}
