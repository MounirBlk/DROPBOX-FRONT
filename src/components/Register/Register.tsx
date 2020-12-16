import * as React from 'react';
import { WithStyles, Snackbar, Select, FormControl, InputLabel, withStyles, InputAdornment, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import MuiAlert, { Alert, AlertTitle } from '@material-ui/lab';
import styles, { Styles } from './styles';
import { User } from '../../interfaces/user';
import { stringVerif, email, password } from '../../middleware/Verif/Verif';
import axios from 'axios';

interface P {
}

interface S {
  civilite: string;
  firstName: string;
  lastName: string;
  email: string
  phone: number;
  date_naissance: string;
  username: string;
  password: string;
  password2: string;
  message: User,
  error: boolean
  vertical: string,
  horizontal: string,
  success: boolean,
  RGPD: boolean
}

export class Register extends React.PureComponent<P & WithStyles<Styles>, S>{

  public static Display = withStyles(styles as any)(Register) as React.ComponentType<P>
  //Methode de lecture
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
    RGPD : false,
  };

  register = (event: any) => {
    event.preventDefault();
    if (this.state.RGPD === false)
      this.setState({ message: { message: "Condition général d'utilisation non accepter", error: true }, error: true })
    else if (stringVerif(this.state.firstName) === false)
      this.setState({ message: { message: "Le prenom n'est pas correcte", error: true }, error: true })
    else if (stringVerif(this.state.lastName) === false)
      this.setState({ message: { message: "Nom de famille n'est pas correcte", error: true }, error: true })
    else if (stringVerif(this.state.username) === false)
      this.setState({ message: { message: "Votre surnom n'est pas correcte", error: true }, error: true })
    else if (email(this.state.email) === false)
      this.setState({ message: { message: "Votre email n'est pas correcte", error: true }, error: true })
    else if (password(this.state.password) === false)
      this.setState({ message: { message: "Mot de passe n'est pas correcte", error: true }, error: true })
    else if (this.state.password !== this.state.password2)
      this.setState({ message: { message: "vos mot de passe ne sont pas identique", error: true }, error: true })
    else {
      let obj = {
        civilite: this.state.civilite,
        email: this.state.email,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        phone: this.state.phone,
        date_naissance: this.state.date_naissance,
        username: this.state.username,
        password: this.state.password
      }

      axios.post('http://localhost:4000/register', obj)
        .then((response) => {
          if(response.data.error != false) {
            return this.setState({ message: { message: response.data.message, error: true }, error: true })
          }else{
            this.setState({ message: { message: "un email vous à été transmis", error: false }, success: true });
            setTimeout(() => {
              document.location.href = "/login"
            }, 3500);}
        })
        .catch((error) => {
          this.setState({ message: { message: "erreur serveur", error: true }, error: true })
        });
    }
  };

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ success: false, error: false });
  }

  handleChangefirstName = (event: any) => {
    this.setState({ firstName: event.target.value });
  }

  handleChangelastName = (event: any) => {
    this.setState({ lastName: event.target.value });
  }

  handleChangeUsername = (event: any) => {
    this.setState({ username: event.target.value });
  }

  handleChangeDate = (event: any) => {
    this.setState({ date_naissance: event.target.value });
  }

  handleChangecivilite = (event: any) => {
    this.setState({ civilite: event.target.value });
  }

  handleChangephone = (event: any) => {
    this.setState({ phone: event.target.value });
  }

  handleChangepassword = (event: any) => {
    this.setState({ password: event.target.value });
  }

  handleChangeRGPD = (event: any) => {
    this.setState({ RGPD: event.target.value });
  }

  handleChangepassword2 = (event: any) => {
    this.setState({ password2: event.target.value });
  }

  handleChangeemail = (event: any) => {
    this.setState({ email: event.target.value });
  }

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

  ErrorMessage(string: string) {
    return string;
  }

  render() {
    const { classes } = this.props;
    const { error, success } = this.state;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Snackbar open={error} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={this.handleClose} severity="error">
              <AlertTitle>
                Erreur lors de l'envoi
            </AlertTitle>
              {this.state.message.message}
            </Alert>
          </Snackbar>
          <Snackbar open={success} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={this.handleClose} severity="success">
              <AlertTitle>
                un email vous à été envoyé
            </AlertTitle>
            </Alert>
          </Snackbar>
          <Typography component="h1" variant="h5">
            Inscription
        </Typography>
          <form className={classes.form} onSubmit={this.register} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Prenom"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleChangefirstName}
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
                  label="Nom de famille"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleChangelastName}
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
                  required
                  fullWidth
                  id="Username"
                  label="Surnom"
                  name="Username"
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
                  required
                  fullWidth
                  id="Date"
                  name="Date"
                  type="date"
                  value={this.state.date_naissance}
                  onChange={this.handleChangeDate}
                  autoComplete="Date"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">civilite</InputLabel>
                  <Select
                    native
                    value={this.state.civilite}
                    onChange={this.handleChangecivilite}
                    label="Civilite"
                    inputProps={{
                      name: 'civilite',
                    }}
                  >
                    <option value={"Homme"}>Homme</option>
                    <option value={"Femme"}>Femme</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phone"
                  label="Téléphone"
                  type="phone"
                  id="phone"
                  value={this.state.phone}
                  onChange={this.handleChangephone}
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
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChangeemail}
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChangepassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Repeat Password"
                  type="password"
                  id="password"
                  value={this.state.password2}
                  onChange={this.handleChangepassword2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="true" color="primary"  onChange={this.handleChangeRGPD}/>}
                  label="J'accepte les conditions d'utilisation et j'autorise Dropbox à utiliser les données a des fins d'amerioration."
                />
                <Link href="/RGPD" variant="body2">
                  voir les CGUs
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Créer mon compte
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Déjà client ? Page de connexion
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          {this.Copyright}
        </Box>
      </Container>
    );
  }
}