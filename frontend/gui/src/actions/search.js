import { SEARCH_QUERY_UPDATE } from "./types";

export const updateSearchQuery = query => dispatch => {
  // make api call, set loading and errors if applicable

  dispatch({
    type: SEARCH_QUERY_UPDATE,
    payload: query
  });
};
