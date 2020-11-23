/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Login } from './components/Login/Login';
import { HashRouter as Router, Route, Link, Switch,BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { DashboardProps } from './components/Dashboard/Dashboard';
import { ResetPassword } from './components/ResetPassword/ResetPassword';
import { Register } from './components/Register/Register';
import './App.css';

export class App extends React.PureComponent {
  render(){
    return (
      <BrowserRouter>
        <Router>
          <Switch>
            <Route exact={true} path={'/'} render={()=>(
              <Login.Display />
            )} />
            <Route exact={true} path={'/login'} render={()=>(
              <Login.Display />
            )} />
            <Route exact={true} path={'/dashboard'} render={()=>(
              <DashboardProps.Display />
            )} />
            <Route exact={true} path={'/resetPassword'} render={()=>(
              <ResetPassword.Display />
            )} />
            <Route exact={true} path={'/register'} render={()=>(
              <Register.Display />
            )} />
          </Switch>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
