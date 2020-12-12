import React, { useState } from 'react';
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { NavigatorProps } from '../Navigator/Navigator';
import { ContentProps } from '../Content/Content';
import { HeaderProps } from '../Header/Header';
import styles, { Styles } from './styles';
import theme from './themes'
import {Menu} from "../Menu/Menu";

//props{}
interface P {}

//state
interface S {
  mobileOpen: boolean;
}


export class DashboardProps extends React.PureComponent<P & WithStyles<Styles>, S>{
    Copyright = () => {
      return (
          <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © DropBox '}{new Date().getFullYear()}
          </Typography>
      );
    }

    public static Display = withStyles(styles as any)(DashboardProps) as React.ComponentType<P>    //Methode de lecture
      constructor(props: P & WithStyles<Styles>) {
        super(props);
        this.state = {
          mobileOpen: false
        };
      }

      handleDrawerToggle = (event: React.ChangeEvent<{}>) => {
        this.setState({mobileOpen: !this.state.mobileOpen})
      };

    render(){
      const { classes } = this.props;
      const { mobileOpen } = this.state;
      
      return(
        <div>
          <Menu.Display/>
        <div className={classes.root}>
          <CssBaseline />
          <div className={classes.app}>
            <HeaderProps.Display onDrawerToggle={this.handleDrawerToggle}  />
            <main className={classes.main}>
              { <ContentProps.Display /> }
            </main>
            <footer className={classes.footer}>
              { this.Copyright() }
            </footer>
          </div>
        </div>
    </div>
      )
    }
}