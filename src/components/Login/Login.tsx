/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { WithStyles, withStyles,Grid,Typography,Box,Paper,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button, Avatar} from '@material-ui/core';
import styles, { Styles } from './styles';

//props
interface P {}

//state
interface S {}

export class Login extends React.PureComponent<P & WithStyles<Styles>>{
    Copyright = () => {
      return (
          <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © DropBox '}{new Date().getFullYear()}
          </Typography>
      );
    }
    public static Display = withStyles(styles as any)(Login) as React.ComponentType<P>    //Methode de lecture
    render(){
        const { classes } = this.props;
        return(
          <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.bg}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Connexion
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Connexion
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Inscription"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={10}>
                  { this.Copyright }
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
        );
    }
}