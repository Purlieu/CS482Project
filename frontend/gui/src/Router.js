import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home";
import User from "./components/User";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import SignOut from "./components/auth/SignOut";
import Landing from "./components/Landing";
import SearchPage from "./components/searchPage/container";
import QueryDetails from "./components/QueryDetails/QueryDetails"
export default () => {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/home' component={Home} />
        <Route path='/edituser' component={User} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signout' component={SignOut} />
        <Route path='/search' component={SearchPage} />
        <Route path='/detail' component={QueryDetails} />
        <Redirect from='*' to='/' />
      </Switch>
    </div>
  );
};
