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
import Close from '@material-ui/icons/Close'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import styles, { Styles } from './styles';
import { Tabs,Tab,WithStyles, withStyles,IconButton,Tooltip as TooltipM,Toolbar,AppBar,Grid,Typography,Box,Paper,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button, Avatar, Dialog} from '@material-ui/core';
import {  DetailsView, FileManagerComponent, NavigationPane, Toolbar as ToolbarFile, Inject, BreadCrumbBar, FileLoadEventArgs  } from '@syncfusion/ej2-react-filemanager';
import axios from 'axios';
import { getValue, select, L10n, setCulture } from '@syncfusion/ej2-base';
import { render } from '@testing-library/react';
import { Tooltip , TooltipEventArgs } from '@syncfusion/ej2-popups';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import * as EJ2_LOCALE from "./fr.json";
import { AnyARecord } from 'dns';
L10n.load({ fr: EJ2_LOCALE.fr });
setCulture("fr");
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/dracula.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/sql/sql.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/jsx/jsx.js');
require('codemirror/mode/php/php.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/javascript/javascript.js');
const detect = require('language-detect');


//props
interface P {
}

//state
interface S {
  //mobileOpen:boolean;
  expanded: Array<string>;
  selected: Array<string>;
  //hostUrl:string;
  openFile : boolean;
  contentFile: string;
  resultFile: string;
  args: any;
  fileNameOpen: string;
}

export class ContentProps extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(ContentProps) as React.ComponentType<P>    //Methode de lecture
  constructor(props: P & WithStyles<Styles>) {
    super(props);
    this.state = {
      openFile: false,
      contentFile: '',
      resultFile: '',
      args: {},
      fileNameOpen: '',
      //hostUrl : "https://ej2-aspcore-service.azurewebsites.net/",
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
    }
    else if (args.module === 'LargeIconsView') {
        const title = getValue('name', args.fileDetails) +'\n' + getValue('dateModified', args.fileDetails);
        target.setAttribute('title', title);
    }
  };

  fileOpen = (args: any) => {
    let ext = args.fileDetails.type;
    if(ext?.toLowerCase() !== '' && ext?.toLowerCase() !== '.png' && ext?.toLowerCase() !== '.jpg' && ext?.toLowerCase() !== '.svg' && ext?.toLowerCase() !== '.zip' && ext?.toLowerCase() !== '.rar'){
      this.getFileRequest(args.fileDetails.filterPath + args.fileDetails.name , args)
    }
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

  handleClickClose = () => {
    this.setState({ openFile: false });
  }

  getFileRequest = (fichier: string, args: any) => {
    console.log(fichier)
    axios
      .post('http://localhost:4000/GetFile', { filePath: fichier })
      .then((response) => {
          this.setState({ contentFile: response.data });
          this.setState({ args: args });
          this.setState({ fileNameOpen: args.fileDetails.name });
          this.setState({ openFile: true });
      })
      .catch((error) => {
        console.log(error)   
      });
  }

  saveFile = () => {
    let payload = {
      filePath: this.state.args.fileDetails.filterPath + this.state.args.fileDetails.name,
      resultFile : this.state.resultFile,
    }
    axios
      .post('http://localhost:4000/SaveFile', payload)
      .then((response) => {
          console.log(response.data)
          this.setState({ openFile: false });
      })
      .catch((error) => {
        console.log(error)   
      });
  }
  _addDirectory = (params: any) => {
    if (params) {
      params.mozdirectory = true;
      params.directory = true;
      params.webkitdirectory = true;
    }
  }

  addFolder = (event: any) => {
    if(event.target.files.length > 0){
      for(let i = 0; i < event.target.files.length; i++){
        console.log(event.target.files[i].webkitRelativePath.split('/').slice(0,-1))
        console.log(event.target.files[i].name)
      }
    }else{
      return console.log('Aucun dossier a été ajouté')
    }
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
    const { selected,expanded,openFile,args,contentFile,fileNameOpen,resultFile} = this.state;
    //console.log(window.innerHeight)
    return(
      <Paper className={classes.paper}>
        <AppBar className={classes.searchBar} position="static" color="primary" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AllInboxIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                Dropbox Manager
              </Grid>
              <Grid item>
              <Button autoFocus color="inherit">
                <AccountTreeOutlinedIcon />Partager
              </Button>
              </Grid>
              <Grid item>
                <input
                  accept="*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  ref={node => this._addDirectory(node)}
                  type="file"
                  onChange={this.addFolder}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="outlined" color="inherit" component="span" className={classes.addFile}>
                    <CloudUploadOutlinedIcon /> Upload dossier
                  </Button>
                </label>
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
                /*uploadSettings={{ maxFileSize: 233332, minFileSize: 120, autoUpload: true }}*/ //maxsize: 30000000
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
        <Dialog fullScreen open={openFile} onClose={this.handleClickClose} /*TransitionComponent={Transition}*/>
        <AppBar className={classes.appBarFile}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClickClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.titleFile}>
              { fileNameOpen }
            </Typography>
            <Button autoFocus color="inherit" onClick={this.saveFile}>
              Sauvegarder
            </Button>
          </Toolbar>
        </AppBar>
        <CodeMirror
          value={contentFile}
          options={{
            mode: 'scheme',
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lint: false,
            lineNumbers: true,
            gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "breakpoints"],
            viewportMargin: Infinity,
          }}
          onGutterClick={(editor, lineNumber, gutter, event) => {
            //point d'arret
            editor.on("gutterClick", function(cm: any, n:any) {
                let info = cm.lineInfo(n);
                cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
            });

            //point d'arret
            function makeMarker() {
                var marker = document.createElement("div");
                marker.style.color = "#822";
                marker.innerHTML = "●";
                return marker;
            }
          }}
          editorDidMount={(editor,value) => {
            editor.setOption('mode', detect.contents(fileNameOpen, value).toLowerCase() === 'html'? 'htmlmixed' : detect.contents(fileNameOpen, value).toLowerCase() === 'json' ? 'jsx' : detect.contents(fileNameOpen, value).toLowerCase())
          }}
        />   
        </Dialog>
      </Paper>
    );
  }
}

