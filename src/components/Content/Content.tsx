import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { WithStyles, withStyles,IconButton,Tooltip,Toolbar,AppBar,Grid,Typography,Box,Paper,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button, Avatar} from '@material-ui/core';

import styles, { Styles } from './styles';

//props
interface P {}

//state
interface S {}

export class ContentProps extends React.PureComponent<P & WithStyles<Styles>>{

  public static Display = withStyles(styles as any)(ContentProps) as React.ComponentType<P>    //Methode de lecture
  
  render(){
    const { classes } = this.props;
    return(
      <Paper className={classes.paper}>
        <AppBar className={classes.searchBar} position="static" color="primary" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                Dropbox
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" className={classes.addUser}>
                  Ajouter
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
            No users for this project yet
          </Typography>
        </div>
      </Paper>
    );
  }
}

