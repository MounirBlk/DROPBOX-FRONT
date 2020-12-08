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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from "@material-ui/icons/Drafts";
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
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Dropbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HttpIcon />
            </ListItemIcon>
            <ListItemText primary="Documentation Api" />
          </ListItem>   
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