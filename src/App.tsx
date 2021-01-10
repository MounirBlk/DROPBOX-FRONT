/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Login } from './components/Login/Login';
import { Route, Link, Switch,BrowserRouter } from 'react-router-dom'
import { DashboardProps } from './components/Dashboard/Dashboard';
import { ResetPassword } from './components/ResetPassword/ResetPassword';
import { Profile } from './components/Profile/Profile';
import { Register } from './components/Register/Register';
import './App.css';
import { Cgu } from './components/Cgu/Cgu'
import { Nf404 } from './components/Nf404/Nf404'
import PrivateRoute from './guard/guard'
import {Prenium} from './components/Prenium/Prenium'
import {Merci} from './components/Merci/Merci'
//import {Api} from './components/API/Api'
import {Google} from './components/Google/Google'

export class App extends React.PureComponent {
  render(){
    return (
      <BrowserRouter>
          <Switch>
            <Route exact={true} path={'/'} component={()=>(
              <Login.Display />
            )} />
            <Route exact={true} path={'/login'} component={()=>(
              <Login.Display />
            )} />
            <PrivateRoute exact={true} path={'/google/connexion'} component={()=>(
              <Google.Display />
            )} />
            <PrivateRoute exact={true} path={'/dashboard'} component={()=>(
              <DashboardProps.Display />
            )} />
            <Route exact={true} path={'/resetPassword'} component={()=>(
              <ResetPassword.Display />
            )} />
            <Route exact={true} path={'/register'} component={()=>(
              <Register.Display />
            )} />
            <Route exact={true} path={'/rgpd'} component={()=>(
              <Cgu.Display />
            )} />
            <PrivateRoute  exact={true} path={'/profile'}  component={()=>(
              <Profile.Display />
            )}  />
            <PrivateRoute  exact={true} path={'/prenium'}  component={()=>(
              <Prenium.Display />
            )}  />
             <PrivateRoute  exact={true} path={'/merci'}  component={()=>(
              <Merci.Display />
            )}  />
            <Route exact={true} path={'*'} render={()=>(
              <Nf404.Display />
            )} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
