/* eslint-disable import/no-anonymous-default-export */
import { WithStyles, withStyles, InputAdornment, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar} from '@material-ui/core';
import MuiAlert, {Alert, AlertTitle } from '@material-ui/lab';
import * as React from 'react'; 
import styles, { Styles } from './styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Email } from '../../interfaces/password';
import axios from 'axios';

interface P {}

interface S {
  value: string;
  message: Email;
  error: boolean,
  success: boolean,
  vertical: string,
  horizontal: string
}

export class ResetPassword extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(ResetPassword) as React.ComponentType<P>    //Methode de lecture
  public state = { value: "", message: { message: "", error: false }, error: false, success: false, vertical: 'top',
  horizontal: 'center'};

  constructor(props: any, state: any) {
    super(props);
    this.state = state;
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.email = this.email.bind(this);
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

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({success: false, error: false});
  };

  
  email(event: any){
      event.preventDefault();
      let obj = {
        email: this.state.value
      }
      axios.post('http://localhost:4000/password', obj)
        .then((response) => {
          this.setState({ message: { message: "un email vous à été transmis",error: false }, success: true });
        })
        .catch((error) => {
          this.setState({ message: { message: "aucun compte n'a été trouver",error: true },  error: true})
        });
    };

    render() {
      const { classes } = this.props;
      const {  error, success } = this.state;
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />

          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Mot de passe oublié
          </Typography>
            <form className={classes.form} onSubmit={this.email} noValidate>
              <Grid container spacing={9} alignItems="center" >
                <Grid item xs={12} sm={12}>
                  <Snackbar open={error} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal:"center"}}>
                    <Alert onClose={this.handleClose} severity="error">
                      <AlertTitle>
                        Erreur lors de l'envoi
                      </AlertTitle>
                      Votre email n'est pas bon ou il n'existe pas !
                    </Alert>
                  </Snackbar>
                  <Snackbar open={success} autoHideDuration={6000} onClose={this.handleClose}  anchorOrigin={{ vertical: "top", horizontal:"center"}}>
                    <Alert onClose={this.handleClose} severity="success">
                      <AlertTitle>
                        un email vous à été envoyé
                      </AlertTitle>
                    </Alert>
                  </Snackbar>
                  <TextField
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    type="email"
                    value={this.state.value}
                    onChange={this.handleChange}
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Obtenir un mot de passe temporaire
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
          <Box>
            {this.Copyright}
          </Box>
        </Container>
      );
    }
  }
