

import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {WithStyles, Snackbar,InputAdornment, withStyles,Grid,Typography,Box,Paper,TextField,CssBaseline,Button, Avatar} from '@material-ui/core';
import styles, { Styles } from './styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { UserLogin, errorRequest } from '../../interfaces/user';
import { email, password } from '../../middleware/Verif/Verif';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link, Redirect } from 'react-router-dom'
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import axios from 'axios';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ForumIcon from '@material-ui/icons/Forum';
import GitHubIcon from '@material-ui/icons/GitHub';
import history from '../../history';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import {config } from "./../../config";
import firebase from "firebase/app";



//props
interface P {}

//state
interface S {
  message: UserLogin,
  email: string,
  password: string
  errorUser: errorRequest
  error: boolean,
  success: boolean,
  setProgress:number,
  progress: number
}

export class Login extends React.PureComponent<P & WithStyles<Styles>,S>{

  public state: Readonly<S> = {
    message:
    {
      error: false,
      message: "",
      id_user: "",
      token: "",
    },
    errorUser:{
      error: false,
      message: "",
    },
    email: "",
    password: "",
    error: false,
    success: false, 
    setProgress:0,
    progress: 0
  };

    Copyright = () => {

      return (
          <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © DropBox '}{new Date().getFullYear()}
          </Typography>
      );
    }

    login = (event: any) => {
      console.log('Connexion')
      event.preventDefault();
    if (email(this.state.email) === false)
      this.setState({ errorUser: { message: "Votre email n'est pas correcte", error: true }, error: true })
    else if (password(this.state.password) === false)
      this.setState({ errorUser: { message: "Mot de passe n'est pas correcte", error: true }, error: true })
    else {
      let obj = {
        email: this.state.email,
        password: this.state.password
      }

      axios.post('https://digitaldropbox.twilightparadox.com/login', obj)
        .then((response) => {
          if(response.data.error !== false) {
            return this.setState({ errorUser: { message: response.data.message, error: true }, error: true })
          }else{
            this.setState({ message: { message: response.data.message, error: false, id_user: response.data.id_user, token: response.data.token}, success: true });
            localStorage.setItem("security", response.data.token)
            document.location.href = "/dashboard"
          }
        })
        .catch((error) => {
          this.setState({ errorUser: { message: "Email/Password invalide !", error: true }, error: true })
        });
      }
    }

    handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ success: false, error: false });
    }

    handleChangeemail = (event: any) => {
      this.setState({ email: event.target.value });
    }
  
    handleChangepassword = (event: any) => {
      this.setState({ password: event.target.value });
    }

    public static Display = withStyles(styles as any)(Login) as React.ComponentType<P>    //Methode de lecture
    render(){
        const { classes } = this.props;
        const { error, success } = this.state;
        return(
          <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.bg}>
            <div className={classes.paper}>
              <Snackbar open={error} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert onClose={this.handleClose} severity="error">
                <AlertTitle>
                  Erreur ! 
              </AlertTitle>
                {this.state.errorUser.message}
              </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert onClose={this.handleClose} severity="success">
                <AlertTitle>
                 Super vous êtes connecter !
              </AlertTitle>
              </Alert>
            </Snackbar>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Connexion
              </Typography>
              <form className={classes.form} onSubmit={this.login} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChangeemail}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  variant="outlined"
                  value={this.state.password}
                  onChange={this.handleChangepassword}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                <LockOpenOutlinedIcon /> Connexion
                </Button>
                </form>
                <Grid container spacing={3}>
                {/*<Grid item xs={12} sm={8} md={12}>
                <FirebaseAuthProvider {...config} firebase={firebase}>
                  <div>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit2}
                    onClick={() => {
                      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                      firebase.auth().signInWithPopup(googleAuthProvider);
                    }}
                  >
                  <EmailIcon />Via  Google
                  </Button>
                    <FirebaseAuthConsumer>
                      {({ isSignedIn, user, providerId }) => {

                        localStorage.setItem("user", JSON.stringify({user}))
                        localStorage.setItem("sign", JSON.stringify({isSignedIn}))
                      }}
                    </FirebaseAuthConsumer>
                    <div>
                      <IfFirebaseAuthed>
                        {() => {
                          axios({
                              method: 'post',
                              url: 'https://digitaldropbox.twilightparadox.com/google/auth/co',
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
                </Grid >*/}
                </Grid>
                <Grid container>
                  <Grid item xs>
                    <Link to="/resetPassword">
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register">
                      {"Inscription"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={10}>
                  { this.Copyright }
                </Box>
            </div>
          </Grid>
        </Grid>
        );
    }
}