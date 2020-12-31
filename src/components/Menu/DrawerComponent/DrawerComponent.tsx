import React from 'react';
import styles, { Styles } from './styles';
import { WithStyles, withStyles } from '@material-ui/core';
import Drawer from "@material-ui/core/Drawer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom'
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import HttpIcon from '@material-ui/icons/Http';



interface P {
  toggleDrawerHandler: any,
  left:any,
}

export class DrawerComponent extends React.PureComponent<P & WithStyles<Styles>>{

public static Display = withStyles(styles as any)(DrawerComponent) as React.ComponentType<P> 

  render() {
    const { classes } = this.props;

    const sideList = (side:any) => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.props.toggleDrawerHandler}
        onKeyDown={this.props.toggleDrawerHandler}
      >
        <List>
          <Link to="/dashboard">
            <ListItem button={true}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dropbox"/>
            </ListItem>
          </Link>
        
          <Link to="/profile">
            <ListItem button={true}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile"/>
            </ListItem>
          </Link>
           <Link to="/">
          <ListItem button={true}>
            <ListItemIcon>
              <HttpIcon />
            </ListItemIcon>
            <ListItemText primary="Documentation Api" />
          </ListItem> 
          </Link>
          <Link to="/prenium">
          <ListItem button={true}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Prenium" />
          </ListItem>     
          </Link>
        </List>
        <Divider />
      </div>
    );

    return (
      <Drawer open={this.props.left} onClose={this.props.toggleDrawerHandler}>
        {sideList("left")}
      </Drawer>
    );
  }
}