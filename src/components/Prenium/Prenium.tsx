import { WithStyles, withStyles, InputAdornment, Button,FormControl,InputLabel,Select, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar} from '@material-ui/core';
import MuiAlert, {Alert, AlertTitle } from '@material-ui/lab';
import StarIcon from '@material-ui/icons/Star';
import * as React from 'react'; 
import styles, { Styles } from './styles';
import EmailIcon from '@material-ui/icons/Email';
import { User } from '../../interfaces/user';
import PanToolIcon from '@material-ui/icons/PanTool';
import axios from 'axios'
import {Menu} from "../Menu/Menu";

import PaymentIcon from '@material-ui/icons/Payment';
import img from "./../../téléchargement.png";
import img2 from "./../../téléchargement (1).png";

interface P {}

interface S {
  message: User,
  email: string,
  cvc: Number,
  month: number,
  year: number,
  card: number,
  error: boolean,
  success: boolean,
  modal: boolean,
  deleteUser: boolean,
}

export class Prenium extends React.Component<P & WithStyles<Styles>, S> {
  public static Display = withStyles(styles as any)(Prenium) as React.ComponentType<P>    //Methode de lecture

  public state: Readonly<S> = {
    message:
    {
      message: "",
      error: false
    },
    email: "",
    cvc: 0,
    month: 0,
    year: 0,
    card: 0,
    error:false,
    success:false,
    modal: false,
    deleteUser:false
  };

  Delete = (event: any) => {
    event.preventDefault();
    var config : any = {
      method: 'DELETE',
      url: 'http://localhost:4000/stripe/payment',
      headers: { 
        'Authorization': 'Bearer '+localStorage.getItem('security'), 
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    axios(config)
    .then((response : any) => {
      if(response.status === 200)
      {
        this.setState({ message: { message: "Votre abonnement va être supprimer ! ", error: false }, success: true });
        if(response.status != 200){
          this.setState({ message: { message: "Vous n'avez pas d'abonnement", error: true }, error: true });
        }
      }
    })
    .catch((error : any) => {
      this.setState({ message: { message: "Vous n'avez pas d'abonnement", error: true }, error: true });
    });
  }

  Paiment = (event: any) => {
    console.log('paiement')
    event.preventDefault();

    var obj = {
      cvc : this.state.cvc,
      exp_month : this.state.month,
      exp_year: this.state.year,
      cardNumber:this.state.card,
      stripeEmail: this.state.email,
    }

    var qs = require('qs');
    let data = qs.stringify(obj)

    var config : any = {
      method: 'POST',
      url: 'http://localhost:4000/stripe/payment',
      headers: { 
        'Authorization': 'Bearer '+localStorage.getItem('security'), 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data
    };

    axios(config)
    .then((response) => {
      document.location.href = "/merci"
    })
      .catch((error) => {
        this.setState({ message: { message: "Les valeurs entrée ne permet pas de mettre en place le paiement", error: true }, error: true });
      });
  }
  
  handleChangeMonth = (event: any) => {
    this.setState({ month: event.target.value });
  }

  handleChangeYear = (event: any) => {
    this.setState({ year: event.target.value });
  }

  handleChangeCvc = (event: any) => {
    this.setState({ cvc: event.target.value });
  }

  handleChangeCarteBleu = (event: any) => {
    this.setState({ card: event.target.value });
  }

  handleChangeEmail = (event: any) => {
    this.setState({ email: event.target.value });
  }   

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ success: false, error: false });
  }

  Envoi = () => {
    console.log('ok')
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
      const { error, success  } = this.state;
      return (

        <div>
        <nav>
          <Menu.Display />
        </nav>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Snackbar open={error} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={this.handleClose} severity="error">
              <AlertTitle>
                Erreur lors de la modification
            </AlertTitle>
              {this.state.message.message}
            </Alert>
          </Snackbar>
          <Snackbar open={success} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={this.handleClose} severity="error">
              <AlertTitle>
                Success
            </AlertTitle>
              {this.state.message.message}
            </Alert>
          </Snackbar>
              <div className={classes.div}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                      <img className={classes.stripe}  src={img} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <img className={classes.visa}  src={img2} />
                    </Grid>
                </Grid>
                <Typography variant="h2" component="h5" className={classes.title} color="primary" gutterBottom>
                  Merci de rentrer les coordonnées suivante pour obtenir votre abonnement prenium
                  <hr/>
                </Typography>
                  <Snackbar open={error} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert onClose={this.handleClose} severity="error">
                      <AlertTitle>
                        Erreur lors de la modification
                    </AlertTitle>
                      {this.state.message.message}
                    </Alert>
                  </Snackbar>
                  <Snackbar open={success} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert onClose={this.handleClose} severity="success">
                      <AlertTitle>
                        Modification successful
                    </AlertTitle>
                    </Alert>
                </Snackbar>
                <form onSubmit={this.Paiment} noValidate>
                <Grid container spacing={1}>
                <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="month"
                      label="month"
                      name="month"
                      type="number"
                      value={this.state.month}
                      onChange={this.handleChangeMonth}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PaymentIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="year"
                      label="year"
                      name="year"
                      type="number"
                      value={this.state.year}
                      onChange={this.handleChangeYear}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PaymentIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="cvc"
                      label="cvc"
                      name="cvc"
                      value={this.state.cvc}
                      onChange={this.handleChangeCvc}
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PaymentIcon />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="carte bleu"
                      label="carte bleu"
                      name="cartebleu"
                      type="number"
                      value={this.state.card}
                      onChange={this.handleChangeCarteBleu}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PaymentIcon />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
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
                  <Grid item xs={12}>
                    <a href="../../middleware/pdf/CGV.pdf" download="CGV.pdf">Nos Conditions générales de ventes</a>
                  </Grid>
                </Grid>
              <Grid container spacing={1}> 
                  <Grid item xs={12} md={4}>
                      <Button type="submit" fullWidth color="primary" className={classes.btnEditer} ><StarIcon/> 4,99 € (moins chère qu'un kebab) </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button type="button" onClick={this.Delete} fullWidth color="primary" className={classes.btnEditer} ><PanToolIcon/> résillier </Button>
                    </Grid>
                </Grid> 
                </form>
                <br/><br/>
                <Box mt={10}>
            {this.Copyright}
          </Box>
          </div>
        </Container>
      </div>
      );
    }
  }