import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Store from "@material-ui/icons/Store";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem'
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { Tabs,Tab,WithStyles, withStyles,IconButton,Tooltip,Toolbar,AppBar,Grid,Typography,Box,Paper,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button, Avatar} from '@material-ui/core';
import styles, { Styles } from './styles';

//props
interface P {}

//state
interface S {
  //mobileOpen:boolean;
  expanded: Array<string>;
  selected: Array<string>;
}

export class ContentProps extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(ContentProps) as React.ComponentType<P>    //Methode de lecture
  constructor(props: P & WithStyles<Styles>) {
    super(props);
    this.state = {
      //mobileOpen: false,
      expanded: [],
      selected: []
    };
  }
  /*state: S = {
    expanded:[],
    selected:[]
  }*/
  /*const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);*/

  handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    this.setState({expanded: nodeIds})
  };

  handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    this.setState({selected: nodeIds})
  };
  test = () => {
    console.log('1: ',this.state.expanded)
    console.log('2: ',this.state.selected)
    console.log('----------')
  }

  render(){
    const { classes } = this.props;
    const { selected,expanded } = this.state;

    return(
      <Paper className={classes.paper}>
        <AppBar className={classes.searchBar} position="static" color="primary" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AllInboxIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                Dropbox
              </Grid>
              <Grid item>
                <Button onClick={this.test} color="inherit" component="span">
                  Test
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="inherit" component="span">
                  <AccountTreeOutlinedIcon /> Ajouter un dossier
                </Button>
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button variant="outlined" color="inherit" component="span" className={classes.addFile}>
                    <CloudUploadOutlinedIcon /> Upload
                  </Button>
                </label>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
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
          elevation={3}
        >
          <Tabs value={0} textColor="inherit">
            <Tab textColor="inherit" label="Afficher" />
            <Tab textColor="inherit" label="Supprimer" />
            <Tab textColor="inherit" label="Modifier" />
          </Tabs>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography component={'span'} variant={'body2'} color="textSecondary" align="center">
            <TreeView
              className={classes.roottreeview}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={expanded}
              selected={selected}
              onNodeToggle={this.handleToggle}
              onNodeSelect={this.handleSelect}
            >
              <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Mike.tsx" />
                <TreeItem nodeId="3" label="Allan.xml" />
                <TreeItem nodeId="4" label="Mounir.vue" />
              </TreeItem>
              <TreeItem nodeId="5" label="Documents">
                <TreeItem nodeId="10" label="index.html" />
                <TreeItem nodeId="6" label="Material-UI">
                  <TreeItem nodeId="7" label="src">
                    <TreeItem nodeId="8" label="index.js" />
                    <TreeItem nodeId="9" label="tree-view.js" />
                  </TreeItem>
                </TreeItem>
              </TreeItem>
            </TreeView>
          </Typography>
        </div>
      </Paper>
    );
  }
}

