import axios from "axios";

const URI = "http://127.0.0.1:8000";

export default {
  signIn({ email, password }) {
    return axios
      .post(`${URI}/rest-auth/login/`, {
        email: email,
        password: password
      })
      .then(response => console.log(response));
  },

  signUp({ email, password1, password2 }) {
    return axios
      .post(`${URI}/rest-auth/registration/`, {
        email,
        password1,
        password2
      })
      .then(response => console.log(response));
  }
};
