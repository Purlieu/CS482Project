import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import User from "./components/User";
import MyGames from "./components/MyGames";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import SingOut from "./components/auth/SignOut";
import Landing from "./components/Landing";
import SearchPage from "./components/searchPage/container";
import SignOut from "./components/auth/SignOut";

export default () => {
  return (
    <div>
      <Route path='/' exact component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/edituser' component={User} />
      <Route path='/mygames' component={MyGames} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/signout' component={SignOut} />
      <Route path='/search' component={SearchPage} />
    </div>
  );
};
