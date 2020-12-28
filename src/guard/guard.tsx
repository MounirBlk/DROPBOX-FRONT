import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import axios from 'axios'

const PrivateRoute = ({ ...props }) => {
    return !localStorage.getItem('security') ? (
      <Redirect to='/login' />
    ) : (
      <>
        <Route {...props} />
      </>
    );
  };
export  default  PrivateRoute;