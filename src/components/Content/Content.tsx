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
import styles, { Styles } from './styles';
import { Tabs,Tab,WithStyles, withStyles,IconButton,Tooltip as TooltipM,Toolbar,AppBar,Grid,Typography,Box,Paper,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button, Avatar} from '@material-ui/core';
import {  DetailsView, FileManagerComponent, NavigationPane, Toolbar as ToolbarFile, Inject, BreadCrumbBar, FileLoadEventArgs  } from '@syncfusion/ej2-react-filemanager';
import axios from 'axios';
import { getValue, select } from '@syncfusion/ej2-base';
import { render } from '@testing-library/react';
import { Tooltip , TooltipEventArgs } from '@syncfusion/ej2-popups';

//props
interface P {
}

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
      selected: [],
    };
  }

  fileLoad = (args: any) => {
    const target = args.element;
    if (args.module === 'DetailsView') {
        const element = select('[title]', args.element);
        const title = getValue('name', args.fileDetails) +'\n' + getValue('dateModified', args.fileDetails);
        element.setAttribute('title', title);
        console.log('1 ',element)
        console.log('2 ',title)
    }
    else if (args.module === 'LargeIconsView') {
        const title = getValue('name', args.fileDetails) +'\n' + getValue('dateModified', args.fileDetails);
        target.setAttribute('title', title);
        console.log('3 ',title)
    }
    //console.log(target)
  };
  fileOpen=(args: any) => {
    console.log(args)
  };
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
                <TooltipM title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </TooltipM>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography component={'span'} variant={'body2'} color="textSecondary" align="center">
            <div className="control-section">
              <div className="filemanager-container">
                <FileManagerComponent id="file" view="LargeIcons" ajaxSettings={{
                  getImageUrl:  "http://localhost:4000/GetImage",//hostUrl + "api/FileManager/GetImage"
                  url: "http://localhost:4000/Manager",// 'http://localhost:4000/manager' ou hostUrl +"api/FileManager/FileOperations"
                  downloadUrl:"http://localhost:4000/Download",//hostUrl + 'api/FileManager/Download'
                  uploadUrl:  "http://localhost:4000/Upload" ,// 'http://localhost:4000/upload'  ou hostUrl + 'api/FileManager/Upload'
                }} 
                /*path='/download' */
                /*showFileExtension= {false}*/
                /*enablePersistence={true}*/
                uploadSettings={{ maxFileSize: 233332 /*30000000*/, minFileSize: 120, autoUpload: true }}
                fileOpen = {this.fileOpen.bind(this)}
                fileLoad = {this.fileLoad.bind(this)}
                created = {this.onCreated.bind(this)}
                success = {this.onSuccess.bind(this)} 
                failure = {this.onFailure.bind(this)}>
                <Inject services={[NavigationPane, DetailsView, ToolbarFile, BreadCrumbBar]}/>
                </FileManagerComponent>
              </div>
            </div>
          </Typography>
        </div>
      </Paper>
    );
  }
}

