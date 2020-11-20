import React from 'react';
import clsx from 'clsx';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink  from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpOutlineTwoToneIcon from '@material-ui/icons/HelpOutlineTwoTone';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Omit } from '@material-ui/types';
import styles, { Styles } from './styles';

interface Style{
  style:{
    width:number
  }
}

//props
interface P {
  PaperProps: Style
  variant?: string
  open?:boolean
  onClose?:(event: any) => void
}

//state
interface S {}

export class NavigatorProps extends React.PureComponent<P & Omit<DrawerProps, 'classes'> & WithStyles<Styles>>{

  public static Display = withStyles(styles as any)(NavigatorProps) as React.ComponentType<P>    //Methode de lecture
  
  render(){
    const { classes, ...other } = this.props;
    console.log('navigatorProps: ',this.props)
    return(
      <Drawer variant="permanent" {...other}>{/*retirer variant pour cacher le composant */}
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Dropbox
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Accueil
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
    );
  }
}

const categories = [
  {
    id: 'Menu',
    children: [
      { id: 'Dropbox', icon: <MoveToInboxIcon />, active: true },
      { id: 'Utilisateur', icon: <AccountCircleIcon /> },
      { id: 'Paramètres', icon: <SettingsOutlinedIcon /> },
      { id: 'Support', icon: <HelpOutlineTwoToneIcon /> },
    ],
  },
  /*{
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
      { id: 'Database', icon:  <SettingsEthernetIcon />},
      { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      { id: 'Hosting', icon: <PublicIcon /> },
    ],
  },*/
];


