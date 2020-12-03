import { WithStyles, withStyles, ThemeProvider, InputAdornment,Card,CardContent,CardActions, Button,FormControl,InputLabel,Select, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar} from '@material-ui/core';
import MuiAlert, {Alert, AlertTitle } from '@material-ui/lab';
import * as React from 'react'; 
import styles, { Styles } from './styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Email } from '../../interfaces/password';
import Hidden from '@material-ui/core/Hidden';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PhoneIcon from '@material-ui/icons/Phone';
import { User } from '../../interfaces/user';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { NavigatorProps } from '../Navigator/Navigator';
import theme from './themes';
import UpdateIcon from '@material-ui/icons/Update';

import axios from 'axios'


interface P {}

interface S {
  message: User,
  vertical: string,
  horizontal: string,
  error: boolean, 
  success: boolean,
  civilite: string, 
  email: string, 
  firstName: string, 
  lastName: string, 
  phone: number, 
  date_naissance: string, 
  username: string, 
  password: string, 
  password2: string,
  isActive: boolean,
  display: string,
  mobileOpen: boolean;
}

export class Profile extends React.PureComponent<P & WithStyles<Styles>, S> {
  public static Display = withStyles(styles as any)(Profile) as React.ComponentType<P>    //Methode de lecture

  public state: Readonly<S> = {
    message:
    {
      message: "",
      error: false
    },
    vertical: 'top',
    horizontal: 'center', 
    error: false, 
    success: false, 
    civilite: "Homme", 
    email: '', 
    firstName: '', 
    lastName: '', 
    phone: 0, 
    date_naissance: '', 
    username: '', 
    password: '', 
    password2: '',
    isActive: true,
    display: 'none',
    mobileOpen: false
  };

  componentDidMount() {
    var config : any = {
      method: 'GET',
      url: 'http://localhost:4000/user/5fb98f0a40bf0212148f21da',
      timeout: 1000,
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjk4ZjBhNDBiZjAyMTIxNDhmMjFkYSIsImV4cCI6MTYwNjkyOTc4OCwiaWF0IjoxNjA2ODQzMzg4fQ.BumFVVras6eRfk7YyFyGqh9Br3kwYk_F1rFygCxnEmw', 
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    axios(config)
    .then((response : any) => {
      console.log(response.data)
      if(response.status === 200)
      {
        this.setState({ 
        civilite: response.data.user.civilite, 
        email: response.data.user.email, 
        firstName: response.data.user.firstname, 
        lastName: response.data.user.lastname, 
        phone: response.data.user.portable, 
        date_naissance: response.data.user.date_naissance, 
        username: response.data.user.username,   });
      }
    })
    .catch((error : any) => {
      console.log(error);
    });
  }

    Envoi = () => {
      var config : any = {
        method: 'PUT',
        url: 'http://localhost:4000/user/5fb98f0a40bf0212148f21da',
        timeout: 1000,
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjk4ZjBhNDBiZjAyMTIxNDhmMjFkYSIsImV4cCI6MTYwNjkyOTc4OCwiaWF0IjoxNjA2ODQzMzg4fQ.BumFVVras6eRfk7YyFyGqh9Br3kwYk_F1rFygCxnEmw', 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          
        }
      };
      
      axios(config)
      .then((response : any) => {
        console.log(response.data)
      })
      .catch((error : any) => {
        console.log(error);
      });
 }


  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ success: false, error: false });
  }

  handleChangeFirstName = (event: any) => {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName = (event: any) => {
    this.setState({ lastName: event.target.value });
  }

  handleChangeUsername = (event: any) => {
    this.setState({ username: event.target.value });
  }

  handleChangeDate = (event: any) => {
    this.setState({ date_naissance: event.target.value });
  }

  handleChangeCivilite = (event: any) => {
    this.setState({ civilite: event.target.value });
  }

  handleChangePhone = (event: any) => {
    this.setState({ phone: event.target.value });
  }

  handleChangePassword = (event: any) => {
    this.setState({ password: event.target.value });
  }

  handleChangePassword2 = (event: any) => {
    this.setState({ password2: event.target.value });
  }

  handleChangeEmail = (event: any) => {
    this.setState({ email: event.target.value });
  }

  handleChangeInput = (event: any) => {
    this.setState({ display: this.state.display === 'none' ? 'block' : 'none', isActive: this.state.isActive === false ? true : false, });
  }

  handleDrawerToggle = (event: React.ChangeEvent<{}>) => {
    this.setState({mobileOpen: !this.state.mobileOpen})
  };

  Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Dropbox
    </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );

  }

  render() {
      const { classes } = this.props;
      const {mobileOpen , email} = this.state;
      return (
        <Container component="main" maxWidth="md">
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <nav className={classes.drawer}>
              <Hidden smUp implementation="js">
                <NavigatorProps.Display
                  PaperProps={{ style: { width: 200 } }}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={this.handleDrawerToggle}
                />
              </Hidden>
              <Hidden xsDown implementation="css">
                <NavigatorProps.Display PaperProps={{ style: { width: 200 } }} />
              </Hidden>
            </nav>
              <Button color="primary" href="/dashboard"><ArrowBackIcon/>  Retour </Button>
              <br/><br/><br/>
              <Typography variant="h2" component="h5" className={classes.title} color="primary" gutterBottom>
                Votre Profil
                <hr/>
                <p>Modifier ou supprimer votre compte !</p>
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    disabled={this.state.isActive}
                    id="firstName"
                    label="Prenom"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChangeFirstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    disabled={this.state.isActive}
                    label="Nom de famille"
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={() => this.handleChangeLastName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="Username"
                    label="Surnom"
                    name="Username"
                    disabled={this.state.isActive}
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChangeUsername}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="Username"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="Date"
                    name="Date"
                    type="date"
                    disabled={this.state.isActive}
                    value={this.state.date_naissance}
                    onChange={this.handleChangeDate}
                    autoComplete="Date"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      native
                      disabled={this.state.isActive}
                      value={this.state.civilite}
                      onChange={this.handleChangeCivilite}
                    >
                      <option value={"Homme"}>Homme</option>
                      <option value={"Femme"}>Femme</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="phone"
                    disabled={this.state.isActive}
                    label="Téléphone"
                    type="phone"
                    id="phone"
                    value={this.state.phone}
                    onChange={this.handleChangePhone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    disabled={this.state.isActive}
                    label="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    disabled={this.state.isActive}
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled={this.state.isActive}
                    name="password"
                    label="Password"
                    type="password"
                    id="password2"
                    value={this.state.password2}
                    onChange={this.handleChangePassword2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            <Grid container spacing={1}> 
                <Grid item xs={12} md={4} >
                  <Button fullWidth className={classes.btnDelete}><DeleteForeverIcon/> Supprimer mon profile </Button>
                </Grid>
                <Grid item  xs={12} md={4}>
                  <Button fullWidth className={classes.btnEditer} onClick={this.handleChangeInput}><EditAttributesIcon/> Editer mon profile </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box  component="span" display={this.state.display}>
                    <Button fullWidth className={classes.btnEditer} ><UpdateIcon/> Modifier mon profile </Button>
                  </Box>
                </Grid>
              </Grid> 
              <Box mt={5}>
          {this.Copyright}
        </Box>
        </ThemeProvider>
        </Container>
      );
    }
  }