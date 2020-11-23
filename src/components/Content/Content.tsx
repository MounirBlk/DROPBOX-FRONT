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
import {  DetailsView, FileManagerComponent, NavigationPane, Toolbar as ToolbarFile, Inject, BreadCrumbBar  } from '@syncfusion/ej2-react-filemanager';
import axios from 'axios';

//props
interface P {}

//state
interface S {
  //mobileOpen:boolean;
  expanded: Array<string>;
  selected: Array<string>;
  hostUrl:string;
}

export class ContentProps extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(ContentProps) as React.ComponentType<P>    //Methode de lecture
  constructor(props: P & WithStyles<Styles>) {
    super(props);
    this.state = {
      //mobileOpen: false,
      hostUrl : "https://ej2-aspcore-service.azurewebsites.net/",
      //hostUrl : "http://localhost:4000/",
      expanded: [],
      selected: []
    };
  }
  /*state: S = {
    expanded:[],
    selected:[]
  }*/

  /*const [expanded, setExpanded] = React.useState<string[]>([]);*/

  /*handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    this.setState({expanded: nodeIds})
  };*/

  onCreated = (args: any) => {
    console.log("File Manager has been created successfully: ",args);
  };
  onSuccess = (args: any) => {
    console.log("Ajax request successful: ",args);
  };
  onFailure = (args: any) => {
    console.log("Ajax request has failed: ",args);
  };
  test = () => {
    console.log('1: ',this.state.expanded)
    console.log('2: ',this.state.selected)
    console.log('----------')
  }
  /*upload = (e: any): void => {
    console.log('Upload...')
    let files = e.target.files;
    console.log(files);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    let payload= {
      isFile:true,
      file: files[0]
    }
    axios.post('http://localhost:4000/upload', payload,config)
      .then((response) => {
        console.log('Uploaded-')
      })
      .catch((error) => {
        console.log(error)
      });
  }*/

  render(){
    const { classes } = this.props;
    const { selected,expanded,hostUrl } = this.state;

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
                  accept="*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  /*webkitdirectory
                  directory*/
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
            <div className="control-section">
              <FileManagerComponent id="file" view="LargeIcons" ajaxSettings={{
                getImageUrl: hostUrl + "api/FileManager/GetImage",
                url: hostUrl +"api/FileManager/FileOperations",// 'http://localhost:4000/manager' ou hostUrl +"api/FileManager/FileOperations"
                downloadUrl: hostUrl + 'api/FileManager/Download',
                uploadUrl: hostUrl + 'api/FileManager/Upload' ,// 'http://localhost:4000/upload'  ou hostUrl + 'api/FileManager/Upload'
              }} /*path='/download'*/
              created={this.onCreated.bind(this)}
              success={this.onSuccess.bind(this)} 
              failure={this.onFailure.bind(this)}>
              <Inject services={[NavigationPane, DetailsView, ToolbarFile, BreadCrumbBar]}/>
              </FileManagerComponent>
            </div>
          </Typography>
        </div>
      </Paper>
    );
  }
}

