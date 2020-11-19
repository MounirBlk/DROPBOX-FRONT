/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Login } from './components/Login/Login';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { PaperbaseProps } from './components/Paperbase/Paperbase';
import { ContentProps } from './components/Content/Content';
import { HeaderProps } from './components/Header/Header';

export class App extends React.PureComponent {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login.Display} />
          <Route exact path="/paper" component={PaperbaseProps.Display} />
        </Switch>
      </Router>
    );
  }
}

export default App;
