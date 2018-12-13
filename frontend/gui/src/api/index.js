import axios from "axios";
import config from "../config";

const ROOT_URL_DEV = "http://localhost:8000";

// heroku link
const ROOT_URL_PROD = "";

const ROOT_URL = window.location.href.includes("localhost")
  ? ROOT_URL_DEV
  : ROOT_URL_PROD;

const user_key = "c53621f4b8c7f6784b02ebce8be1fd00";

export default {
  signIn({ username, password }) {
    return axios
      .post(`${ROOT_URL}/rest-auth/login/`, {
        username,
        password
      })
      .then(response => response.data);
  },

  getUser(token) {
    const sendToken = "Token " + token;
    return axios
      .get(`${ROOT_URL}/rest-auth/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: sendToken
        }
      })
      .then(response => response.data);
  },

  updateUser(token, username) {
    const sendToken = "Token " + token;
    return axios
      .put(`${ROOT_URL}/rest-auth/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: sendToken,
          username: username
        }
      })
      .then(response => response.data);
  },

  postToAPI(notes, rating, gameid, title, release_date, image, token) {
    const sendToken = "Token " + token;

    return fetch(`${ROOT_URL}/api/create/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: sendToken
      },
      body: JSON.stringify({
        notes: notes,
        gameid: gameid,
        rating: rating,
        title: title,
        release_date: release_date,
        image: image
      })
    })
      .then(response => response.data)
      .catch(err => console.log(err));
  },
  getGamesFromAPI(token) {
    const sendToken = "Token " + token;
    return fetch(`${ROOT_URL}/api/`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: sendToken
      }
    }).then(response => response.json());
  },
  signUp({ username, email, password1, password2 }) {
    return axios
      .post(`${ROOT_URL}/rest-auth/registration/`, {
        username,
        email,
        password1,
        password2
      })
      .then(response => response.data);
  },
  async fetchGameQuery(query) {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl =
        "https://api-endpoint.igdb.com/games/?search=" +
        query +
        "&fields=name,url,id,cover,release_dates.human,platforms.name&expand=platforms," +
        "developers.name&expand=developers";
    const getData = await fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        method: "get",
        "user-key": user_key,
        Accept: "application/json",
        "Content-Type": "text/plain"
      })
    });
    const json = await getData.json();
    return json;
  },

  async fetchMoreGameInfo(id) {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://api-endpoint.igdb.com/games/${id}?fields=*`;
    const getData = await fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        method: "get",
        "user-key": user_key,
        Accept: "application/json",
        "Content-Type": "text/plain"
      })
    });
    const json = await getData.json();
    return json;
  },

  async fetchPlatformsForGame(id) {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://api-endpoint.igdb.com/platforms/${id}?fields=*`;
    const getData = await fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        method: "get",
        "user-key": user_key,
        Accept: "application/json",
        "Content-Type": "text/plain"
      })
    });
    const json = await getData.json();
    return json;
  },

  async fetchGameEnginesForGame(id) {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://api-endpoint.igdb.com/game_engines/${id}?fields=*`;
    const getData = await fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        method: "get",
        "user-key": user_key,
        Accept: "application/json",
        "Content-Type": "text/plain"
      })
    });
    const json = await getData.json();
    return json;
  },

  async fetchThemeForGame(id) {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://api-endpoint.igdb.com/themes/${id}?fields=*`;
    const getData = await fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        method: "get",
        "user-key": user_key,
        Accept: "application/json",
        "Content-Type": "text/plain"
      })
    });
    const json = await getData.json();
    return json;
  },

  async fetchReleaseDayForGame(id) {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://api-endpoint.igdb.com/release_dates/${id}?fields=*`;
    const getData = await fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        method: "get",
        "user-key": user_key,
        Accept: "application/json",
        "Content-Type": "text/plain"
      })
    });
    const json = await getData.json();
    return json;
  },

  fetchTopNews() {
    return axios
      .get("https://newsapi.org/v2/top-headlines", {
        params: {
          sources: "ign",
          apiKey: config.apiKey
        }
      })
      .then(response => response.data.articles);
  }
};
