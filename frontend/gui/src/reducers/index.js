import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import auth from "./auth";
import shared from "./shared";
import search from "./search";

export default combineReducers({
  auth,
  shared,
  search,
  form: formReducer
});
