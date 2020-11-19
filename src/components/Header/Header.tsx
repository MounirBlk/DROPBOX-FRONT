import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import styles, { Styles } from './styles';

//props
interface P {}

//state
interface S {}

export class HeaderProps extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(HeaderProps) as React.ComponentType<P>    //Methode de lecture
  
  render(){
    console.log('headerProps:',this.props)

    const { classes/*, onDrawerToggle*/ } = this.props;
    return(
        <React.Fragment>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  DROPBOX
                </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.button} variant="outlined" color="inherit" size="small">
                  Paramètres
                </Button>
              </Grid>
              <Grid item>
                <Tooltip title="Help">
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs value={0} textColor="inherit">
            <Tab textColor="inherit" label="Accueil" />
            <Tab textColor="inherit" label="Dropbox" />
            <Tab textColor="inherit" label="Utilisateur" />
            <Tab textColor="inherit" label="Paramètres" />
          </Tabs>
        </AppBar>
      </React.Fragment>
    );
  }
}