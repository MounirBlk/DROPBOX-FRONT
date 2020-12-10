import React from "react";
import styles, { Styles } from './styles';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

interface P {
  openDrawerHandler: any
}

interface S {
  anchorEl: any,
  MobileMoreAnchorEl: any
}

export class ToolbarComponent extends React.PureComponent<P & WithStyles<Styles>>{

  public static Display = withStyles(styles as any)(ToolbarComponent) as React.ComponentType<P> 

    public state:Readonly<S>= {
      anchorEl: false,
        MobileMoreAnchorEl: false
    };
    
      handleProfileMenuOpen = (event:any) => {
        this.setState({
          anchorEl: event.currentTarget
        });
      };
    
      handleMobileMenuClose = () => {
        this.setState({
          MobileMoreAnchorEl: null
        });
      };
    
      handleMenuClose = () => {
        this.setState({
          anchorEl: null,
          MobileMoreAnchorEl: null
        });
      };
    
      handleMobileMenuOpen = (event:any) => {
        console.log( event.currentTarget);
        this.setState({
          MobileMoreAnchorEl: event.currentTarget
        });
      };
    
      render() {
        const { classes } = this.props;
        const isMenuOpen = this.state.anchorEl;
        const isMobileMenuOpen = this.state.MobileMoreAnchorEl;
    
        const menuId = "primary-search-account-menu";
        const renderMenu = (
          <Menu
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={this.handleMenuClose}

          >
            <MenuItem onClick={this.handleMenuClose}><IconButton
                aria-label="Deconnexion"
                aria-controls="Deconnexion"
                aria-haspopup="true"
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton>
              <p>Deconnexion</p></MenuItem>
          </Menu>
        );
    
        const mobileMenuId = "primary-search-account-menu-mobile";
        const renderMobileMenu = (
          <Menu
            anchorEl={this.state.MobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            color="primary"
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
          >
            <MenuItem onClick={this.handleProfileMenuOpen}>
              <IconButton
                aria-label="Deconnexion"
                aria-controls="Deconnexion"
                aria-haspopup="true"
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton>
              <p>Deconnexion</p>
            </MenuItem>
          </Menu>
        );
    
        return (
          <div className={classes.grow}  color="primary">
            <AppBar position="static" color="primary">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.props.openDrawerHandler}
                >
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  Dropbox
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </div>
        );
      }

}