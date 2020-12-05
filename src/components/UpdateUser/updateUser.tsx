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

export class UpdateUser extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(UpdateUser) as React.ComponentType<P>    //Methode de lecture
  public state = { value: "", message: { message: "", error: false }, error: false, success: false, vertical: 'top',
  horizontal: 'center'};

  constructor(props: any, state: any) {
    super(props);
    this.state = state;
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
    const {  error, success } = this.state;
    return (
      <Container component="main" maxWidth="md">
      
      </Container>
    );
  }
}
