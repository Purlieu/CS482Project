import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  state: (state = {}) => state,
  form: formReducer
});
