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
import {Api} from './components/API/Api'

export class App extends React.PureComponent {
  verif = () => {
    setInterval(() =>{
      if(localStorage.getItem("security") !== sessionStorage.getItem("security2") || localStorage.getItem("security") === undefined || sessionStorage.getItem("security2") === undefined)
      {
          document.location.href = "/";
          localStorage.clear();
          sessionStorage.clear();
          return false;
      }else{
          return true;
      }
    },5000)
  }
  render(){
    return (
      <BrowserRouter>
          <Switch>
            <Route exact={true} path={'/'} render={()=>(
              <Login.Display />
            )} />
            <Route exact={true} path={'/login'} render={()=>(
              <Login.Display />
            )} />
            <PrivateRoute exact={true} path={'/dashboard'} component={()=>(
              <DashboardProps.Display />
            )} />
            <Route exact={true} path={'/resetPassword'} render={()=>(
              <ResetPassword.Display />
            )} />
            <Route exact={true} path={'/register'} render={()=>(
              <Register.Display />
            )} />
            <Route exact={true} path={'/rgpd'} render={()=>(
              <Cgu.Display />
            )} />
            <PrivateRoute  exact={true} path={'/user'}  component={()=>(
              <Profile.Display />
            )}  />
            <PrivateRoute  exact={true} path={'/prenium'}  component={()=>(
              <Prenium.Display />
            )}  />
             <PrivateRoute  exact={true} path={'/merci'}  component={()=>(
              <Merci.Display />
            )}  />
              <PrivateRoute  exact={true} path={'/api'}  component={()=>(
              <Api.Display />
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
