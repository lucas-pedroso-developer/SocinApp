
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from '../views/login'
import Home from '../views/home'
import RegisterUsers from '../views/registerUser'

export default function Routes() {
  return (
    <div>        
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register-users/:id" component={RegisterUsers} />
        </Switch>        
    </div>
  );
}