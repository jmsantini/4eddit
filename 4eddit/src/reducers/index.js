import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import login from "./login";
import posts from "./posts";
import users from "./user";
import createpost from "./createpost"

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    login,
    posts,
    users,
    createpost,
    // Outros reducers aqui
  });
