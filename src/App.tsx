/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Login } from './components/Login/Login';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { DashboardProps } from './components/Dashboard/Dashboard';
import { HeaderProps } from './components/Header/Header';

export class App extends React.PureComponent {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login.Display} />
          <Route exact path="/login" component={Login.Display} />
          <Route exact path="/dashboard" component={DashboardProps.Display} />
        </Switch>
      </Router>
    );
  }
}

export default App;
