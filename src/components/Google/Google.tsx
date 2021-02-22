import React from 'react';
import axios from 'axios';
import history from '../../history';
import { render } from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import {Snackbar} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import {config } from "./../../config";


interface P {

}
export class Google extends React.PureComponent<P>{
    public static Display = (Google) as React.ComponentType<P>    //Methode de lecture

   
    render() {
       return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <div>
            <button
              onClick={() => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleAuthProvider);
              }}
            >
              Sign In with Google
            </button>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                localStorage.setItem("user", JSON.stringify({user}))
              }}
            </FirebaseAuthConsumer>
            <div>
              <IfFirebaseAuthed>
                {() => {
                  axios({
                      method: 'post',
                      url: 'https://digital-dropbox.herokuapp.com/google/auth/co',
                      data : {users:localStorage.getItem("user")}
                    })
                    .then((response) => {
                      localStorage.setItem("security", response.data.token)
                      document.location.href = "/dashboard"
                    })
                    .catch((error) => {
                      document.location.href = "/register"
                    });    
                }}
              </IfFirebaseAuthed>
            </div>
          </div>
        </FirebaseAuthProvider>
      );  
    }
}