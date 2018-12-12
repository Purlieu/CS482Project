import {
  SEARCH_QUERY_UPDATE,
  FETCH_LATEST_NEWS,
  LOADING,
  GET_GAME_QUERY,
  UPDATE_PAST_SEARCHES,
  CLEAR_PAST_SEARCHES,
  SET_CURRENT_GAME,
  MY_SAVED_GAMES
} from "./types";
import api from "../api";

export function updateSearchQuery(query, callback) {
  const debouncedDispatch = dispatch => {
    // make api call, set loading and errors if applicable
    dispatch({
      type: SEARCH_QUERY_UPDATE,
      payload: query
    });
    dispatch({
      type: UPDATE_PAST_SEARCHES,
      payload: query
    });
    dispatch(fetchGameQuery(query, callback));
  };

  debouncedDispatch.meta = {
    debounce: {
      time: 300,
      key: "SEARCH_QUERY"
    }
  };

  return debouncedDispatch;
}

export const setCurrentGame = (currentGame, callback) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  dispatch({
    type: SET_CURRENT_GAME,
    payload: currentGame
  });
  callback();
  dispatch({ type: LOADING, payload: false });
};
export const fetchGameQuery = (query, callback) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  api
    .fetchGameQuery(query)
    .then(games => {
      dispatch({ type: GET_GAME_QUERY, payload: games });
    })
    .finally(() => {
      dispatch({ type: LOADING, payload: false });
      callback();
    });
};

export const fetchTopNews = () => dispatch => {
  dispatch({ type: LOADING, payload: true });
  api
    .fetchTopNews()
    .then(articles => {
      dispatch({ type: FETCH_LATEST_NEWS, payload: articles });
    })
    .finally(() => dispatch({ type: LOADING, payload: false }));
};

export const clearRecentSearches = () => {
  return {
    type: CLEAR_PAST_SEARCHES,
    payload: []
  };
};

export const getGamesFromAPI = token => dispatch => {
  dispatch({ type: LOADING, payload: true });
  api
    .getGamesFromAPI(token)
    .then(saved_games => {
      if (saved_games.detail) {
        return;
      }
      dispatch({ type: MY_SAVED_GAMES, payload: saved_games });
    })
    .catch(err => console.log(err))
    .finally(() => {
      dispatch({ type: LOADING, payload: false });
    });
};
