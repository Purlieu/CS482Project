import axios from "axios";
import config from "../config";

const URI = "http://127.0.0.1:8000";

export default {
  signIn({ username, password }) {
    return axios
      .post(`${URI}/rest-auth/login/`, {
        username,
        password
      })
      .then(response => response.data);
  },

  signUp({ username, email, password1, password2 }) {
    return axios
      .post(`${URI}/rest-auth/registration/`, {
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
