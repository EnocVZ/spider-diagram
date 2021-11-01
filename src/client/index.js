import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from './views/home';
render(
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
  </Router>
    ,
    document.getElementById('root')
);