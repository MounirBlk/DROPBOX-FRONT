/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Login } from './components/Login/Login';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history";

export class App extends React.PureComponent {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login.Display} />
        </Switch>
      </Router>
    );
  }
}

export default App;
