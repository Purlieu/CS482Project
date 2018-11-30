import axios from "axios";

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
  }
};
