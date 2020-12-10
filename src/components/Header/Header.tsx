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
import AllInboxIcon from '@material-ui/icons/AllInbox';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import styles, { Styles } from './styles';
import { useHistory } from "react-router-dom";

//props
interface P {
  onDrawerToggle?:(event: any) => void
}

//state
interface S {}

export class HeaderProps extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(HeaderProps) as React.ComponentType<P>    //Methode de lecture
  render(){
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
        </AppBar>
      </React.Fragment>
    );
  }
}