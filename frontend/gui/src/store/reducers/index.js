import { combineReducers } from "redux";
import commentsReducer from "./";

export default combineReducers({
  comments: commentsReducer
});
