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
  async fetchGameQuery(query) {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = "https://api-endpoint.igdb.com/games/?search=" + query + "&fields=name,url,id,cover,summary,release_dates.human,platforms.name&expand=platforms";
    const getData = await fetch(proxyUrl + targetUrl, {
      headers: new Headers({
        method: "get",
        "user-key": "b1b23df351d60c42fdbe7cf2e44362af",
        Accept: "application/json",
        "Content-Type": "text/plain"
      })
    })
    const json = await getData.json();
    console.log(json);
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
      .then(response => response.data.articles)
  }
};
