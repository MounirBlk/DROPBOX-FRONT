import React from 'react';
import { WithStyles,Select,FormControl,InputLabel, MenuItem,  withStyles, InputAdornment, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import styles, { Styles } from './styles';

interface P {}
interface S {
  civilite: string;
  firstName: string;
  lastName: string;
  phone: number;
  date_naissance: string;
  username: string;
  password: string;
}

export class Register extends React.PureComponent<P & WithStyles<Styles>, S>{

  public static Display = withStyles(styles as any)(Register) as React.ComponentType<P>    //Methode de lecture
  public state = { civilite: "Homme",firstName:'', lastName:'', phone: 0, date_naissance: '', username: '', password: ''}

  constructor(props: any, state: any) {
    super(props);
    this.state = state;
  }

  handleChangefirstName(event: any) {
    this.setState({ firstName: event.target.value });
  }

  handleChangelastName(event: any) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeUsername(event: any) {
    this.setState({ username: event.target.value });
  }

  handleChangeDate(event: any) {
    this.setState({ date_naissance: event.target.value });
  }

  handleChangecivilite(event: any) {
    this.setState({ civilite: event.target.value });
  }

  handleChangephone(event: any) {
    this.setState({ phone: event.target.value });
  }

  handleChangepassword(event: any) {
    this.setState({ password: event.target.value });
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

  render() {
    const { classes } = this.props;
    const { civilite } = this.state;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  type="text"
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
                  label="Last Name"
                  name="lastName"
                  type="text"
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
                  label="Username"
                  name="Username"
                  type="text"
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
                  autoComplete="Date"
                />
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Age</InputLabel>
                  <Select
                    labelId="civilite"
                    id="civilite"
                    value={civilite}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Homme"}>Homme</MenuItem>
                    <MenuItem value={"Femme"}>Femme</MenuItem>
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
                  label="Email Address"
                  name="email"
                  type="email"
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
                  label="Password"
                  type="password"
                  id="password"
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
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="J'accepte les conditions d'utilisation et j'autorise Dropbox à utiliser les données a des fins d'amerioration."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
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