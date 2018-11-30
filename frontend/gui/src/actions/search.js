import { SEARCH_QUERY_UPDATE, LOADING } from "./types";

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

export const news = () => dispatch => {
  dispatch({ type: LOADING, payload: true });
};
