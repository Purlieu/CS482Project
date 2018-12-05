import { SEARCH_QUERY_UPDATE, GET_GAME_QUERY } from "./types";

export function updateSearchQuery(query, callback) {
  const debouncedDispatch = dispatch => {
    // make api call, set loading and errors if applicable
    dispatch({
      type: SEARCH_QUERY_UPDATE,
      payload: query
    });
    callback();
  };

  debouncedDispatch.meta = {
    debounce: {
      time: 250,
      key: "SEARCH_QUERY"
    }
  };

  return debouncedDispatch;
}


export function updateGameLIst(games, callback) {
  const debouncedDispatch = dispatch => {
    // make api call, set loading and errors if applicable
    dispatch({
      type: GET_GAME_QUERY,
      payload: games
    });
    callback();
  };
  debouncedDispatch.meta = {
    debounce: {
      time: 250,
      key: "GAME_QUERY"
    }
  };

  return debouncedDispatch;
}