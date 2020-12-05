/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Login } from './components/Login/Login';
import { Route, Link, Switch,BrowserRouter } from 'react-router-dom'
import { DashboardProps } from './components/Dashboard/Dashboard';
import { ResetPassword } from './components/ResetPassword/ResetPassword';
import { UpdateUser } from './components/UpdateUser/updateUser';
import { Profile } from './components/Profile/Profile';
import { UserAdd } from './components/UserAdd/UserAdd';
import { Register } from './components/Register/Register';
import './App.css';
import { Cgu } from './components/Cgu/Cgu'
import { Nf404 } from './components/Nf404/Nf404'

export class App extends React.PureComponent {
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
            <Route exact={true} path={'/dashboard'} render={()=>(
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
            <Route path={'/user/update'} render={()=>(
              <UpdateUser.Display />
            )} />
            <Route exact={true} path={'/user'} render={()=>(
              <Profile.Display />
            )} />
            <Route exact={true} path={'/user/add'} render={()=>(
              <UserAdd.Display />
            )} />
             <Route exact={true} path={'*'} render={()=>(
              <Nf404.Display />
            )} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
