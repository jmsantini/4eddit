import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import CreateUser from "../CreateUser";
import PostList from "../PostList";
import PostCreate from "../PostCreate";
import Home from "../Home"
import PostDetails from "../PostDetails";



export const routes = {
  home: "/",
  login: "/login",
  createUser: "/createUser",
  postlist: "/postlist",
  postdetails: "/postdetails"
  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.home} component={Home} /> 
        <Route exact path={routes.login} component={LoginPage} />
        <Route exact path={routes.createUser} component={CreateUser} />
        <Route exact path={routes.postlist} component={PostList} />
        <Route exact path={routes.postdetails} component={PostDetails} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
