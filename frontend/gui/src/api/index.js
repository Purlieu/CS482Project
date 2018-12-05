import axios from "axios";
import config from "../config";

const ROOT_URL_DEV = "http://localhost:8000";

// heroku link
const ROOT_URL_PROD = "";

const ROOT_URL = window.location.href.includes("localhost")
  ? ROOT_URL_DEV
  : ROOT_URL_PROD;

export default {
  signIn({ username, password }) {
    return axios
      .post(`${ROOT_URL}/rest-auth/login/`, {
        username,
        password
      })
      .then(response => response.data);
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

  fetchGameQuery(query) {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = "https://api-endpoint.igdb.com/games/?search=" + query + "&fields=*";
    return fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        "Content-Type": "text/plain",
        method: "get",
        "user-key": "37ed96dfc4f4f33f0f7bc053d6c46a8a",
        Accept: "application/json"
      })
    })
      .then(response => response.json())
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
