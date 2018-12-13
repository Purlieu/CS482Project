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

  let data = {};
  api
    .fetchMoreGameInfo(currentGame.id)
    .then(moreGameInfo => {
      // fetch platforms - array of ids, game_engines, themes, genres

      data = {
        ...data,
        total_rating: moreGameInfo[0].total_rating,
        time_to_beat: moreGameInfo[0].time_to_beat,
        platforms: moreGameInfo[0].platforms,
        game_engines: moreGameInfo[0].game_engines,
        themes: moreGameInfo[0].themes,
        storyline: moreGameInfo[0].storyline,
        summary: moreGameInfo[0].summary
      };

      if (data.platforms) {
        let promises = data.platforms.map(platformId =>
          api.fetchPlatformsForGame(platformId)
        );
        return Promise.all(promises);
      } else {
        return Promise.resolve(false);
      }
    })
    .then(responses => {
      if (responses) {
        let platforms = [];
        responses.map(response => platforms.push({ type: response[0].name }));
        data = {
          ...data,
          platforms
        };
      }

      if (data.game_engines) {
        let promises = data.game_engines.map(gameEngineId =>
          api.fetchGameEnginesForGame(gameEngineId)
        );

        return Promise.all(promises);
      } else {
        return Promise.resolve(false);
      }
    })
    .then(responses => {
      if (responses) {
        let game_engines = [];

        responses.map(response =>
          game_engines.push({ type: response[0].name })
        );
        data = {
          ...data,
          game_engines
        };
      }

      if (data.themes) {
        let promises = data.themes.map(themeId =>
          api.fetchThemeForGame(themeId)
        );

        return Promise.all(promises);
      } else {
        return Promise.resolve(false);
      }
    })
    .then(responses => {
      if (responses) {
        let themes = [];

        responses.map(response => themes.push({ type: response[0].name }));
        data = {
          ...data,
          themes
        };
      }

      return api.fetchReleaseDayForGame(currentGame.id);
    })
    .then(relaseDate => {
      // if (relaseDate && relaseDate.length > 0) {
      //   data = { ...data, release_dates: relaseDate };
      // }

      if (data.time_to_beat) {
        // change time_to_beat from seconds to hours
        let time_to_beat = [];

        for (const key of Object.keys(data.time_to_beat)) {
          let newObj = {};
          newObj.type = `${key} : ${Math.round(
            Number(data.time_to_beat[key]) / 3600
          )} hours`;
          time_to_beat.push(newObj);
        }

        data = { ...data, time_to_beat };
      }

      // attach this data object to the current game object
      for (const key of Object.keys(data)) {
        currentGame[key] = data[key];
      }

      dispatch({
        type: SET_CURRENT_GAME,
        payload: currentGame
      });
      callback();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => dispatch({ type: LOADING, payload: false }));
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
