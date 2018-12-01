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
