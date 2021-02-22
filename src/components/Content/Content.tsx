import React from 'react';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import Close from '@material-ui/icons/Close'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import styles, { Styles } from './styles';
import {WithStyles, withStyles,IconButton,Tooltip as TooltipM,Toolbar,AppBar,Grid,Typography,Box,Paper,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button, DialogTitle , Dialog, DialogContent} from '@material-ui/core';
import {  DetailsView, FileManagerComponent, NavigationPane, Toolbar as ToolbarFile, Inject, BreadCrumbBar  } from '@syncfusion/ej2-react-filemanager';
import axios from 'axios';
import { getValue, select, L10n, setCulture } from '@syncfusion/ej2-base';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import * as EJ2_LOCALE from "./fr.json";
import { Autocomplete } from '@material-ui/lab';
import { UserInterface } from '../../interfaces/user';
import { DialogActions } from '@material-ui/core';
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
  //hostUrl:string;
  openFileDialog : boolean;
  contentFile: string;
  resultFile: string;
  args: any;
  fileNameOpen: string;
  isEdit: boolean;
  fileBase: any;
  mimeType: string;
  isDialogShare : boolean;
  utilisateurs: Array<UserInterface>;
  userNameShare: UserInterface | null;
  fileDataShare: any;
  argsListFilesShare: Array<ArgDataFile>;
  filterPathDirectory: string;
}
interface ArgDataFile{
  filterPath: string; 
  isFile: boolean; 
  name: string; 
  type: string; 
  parentPath: string; 
}
export class ContentProps extends React.PureComponent<P & WithStyles<Styles>, S>{
  public static Display = withStyles(styles as any)(ContentProps) as React.ComponentType<P>    //Methode de lecture
  constructor(props: P & WithStyles<Styles>) {
    super(props);
    this.state = {
      utilisateurs : [],
      userNameShare:{
        _id: '',
        username: '',
        firstname: '',
        lastname:'',
        email: ''
      },
      fileDataShare:{},
      fileBase:null,
      mimeType: '',
      openFileDialog: false,
      contentFile: '',
      resultFile: '',
      args: {},
      argsListFilesShare: [],
      fileNameOpen: '',
      //hostUrl : "https://ej2-aspcore-service.azurewebsites.net/",
      isEdit: false,
      isDialogShare: false,
      filterPathDirectory: ''
    };
  }
  beforeSend = (args: any) => {
    const token = 'Bearer ' + localStorage.getItem('security');
    args.ajaxSettings.beforeSend = (args: any) => {
        args.httpRequest.setRequestHeader("Authorization", token);
    }
  }

  fileOpen = (args: any) => {
    let ext = args.fileDetails.type;
    if(ext?.toLowerCase() !== '' && ext?.toLowerCase() !== '.png' && ext?.toLowerCase() !== '.jpg' && ext?.toLowerCase() !== '.svg' && ext?.toLowerCase() !== '.zip' && ext?.toLowerCase() !== '.rar'){
      if(ext?.toLowerCase() === '.html' || ext?.toLowerCase() === '.css' || ext?.toLowerCase() === '.js' || ext?.toLowerCase() === '.txt' ||
      ext?.toLowerCase() === '.php' || ext?.toLowerCase() === '.sql' || ext?.toLowerCase() === '.ts' || 
      ext?.toLowerCase() === '.json' || ext?.toLowerCase() === '.xml' || ext?.toLowerCase() === '.vue'){
        this.getFileRequest(args.fileDetails.filterPath + args.fileDetails.name , args, true)
      }else if(ext?.toLowerCase() === '.pdf' || ext?.toLowerCase() === '.ppt' || ext?.toLowerCase() === '.pptx' || ext?.toLowerCase() === '.pptx' || ext?.toLowerCase() === '.csv'
      || ext?.toLowerCase() === '.doc' || ext?.toLowerCase() === '.docx' || ext?.toLowerCase() === '.xls' || ext?.toLowerCase() === '.xlsx' || ext?.toLowerCase() === '.xlsm'){
        this.getFileRequest(args.fileDetails.filterPath + args.fileDetails.name , args, false)
      }else{
        console.log("L'affichage ne fonctionne pas")
      }
    }
  };

  onCreated = (args: any) => {
    console.log("Bienvenue sur le Dropbox manager !");
  };
  onSuccess = (args: any) => {
    console.log("L'action a bien fonctionné !",args);
    if(args.action === 'read'){
      let listFiles: { filterPath: string; isFile: boolean; name: string; type: string; parentPath: string; }[] = [];
      args.result.files.forEach((item: any) => {
        listFiles.push({filterPath: item.filterPath,isFile: item.isFile,name: item.name,type: item.type,parentPath: args.result.cwd.name})
      })
      this.setState({ argsListFilesShare : listFiles });
      if(args.result.files.length === 0){
        this.setState({ filterPathDirectory : '/'});
      }else{
        this.setState({ filterPathDirectory : args.result.files[0].filterPath === null || args.result.files[0].filterPath === undefined ? '/' : args.result.files[0].filterPath });
      }
    }
  };
  onFailure = (args: any) => {
    console.log("Veuillez rafraîchir la page !",args);
  };

  getFileRequest = (fichier: string, args: any, isEdit: boolean) => {
    const config = {
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('security')
      },
    };
    axios
      .post('https://digital-dropbox.herokuapp.com/GetFile', { filePath: fichier, isEdit: isEdit, fileName: args.fileDetails.name }, config)
      .then((response) => {
          if(isEdit){
            this.setState({ contentFile: response.data });
            this.setState({ args: args });
          }else if(!isEdit){
            this.setState({ fileBase: response.data.filebase });    
            this.setState({ mimeType: response.data.mimeType });                
          }else{
            console.log('Error');
          }
          this.setState({ fileNameOpen: args.fileDetails.name });
          this.setState({ isEdit: isEdit });          
      })
      .catch((error) => {
        console.log(error)
        setTimeout(() => {
          document.location.reload(true);
        }, 5000);   
      })
      .finally(() => this.setState({ openFileDialog: true }));
  }

  saveFile = () => {
    let payload = {
      filePath: this.state.args.fileDetails.filterPath + this.state.args.fileDetails.name,
      resultFile : this.state.resultFile,
    }

    const config = {
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('security')
      },
    };

    axios
      .post('https://digital-dropbox.herokuapp.com/SaveFile', payload, config)
      .then((response) => {
          this.setState({ openFileDialog: false });
          setTimeout(() => {
            document.location.reload(true);
          }, 5000);
      })
      .catch((error) => {
        console.log(error)   
        setTimeout(() => {
          document.location.reload(true);
        }, 5000);
      });
  }
  _addDirectory = (params: any) => {
    if (params) {
      params.mozdirectory = true;
      params.directory = true;
      params.webkitdirectory = true;
    }
  }

  shareFileOpen = (event: any) => {
    event.preventDefault();
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('security')
      },
    };
    const payload = {}
    axios
      .post('https://digital-dropbox.herokuapp.com/users', payload, config)
      .then((response) => {
        this.setState({ utilisateurs : response.data.users });
        this.setState({ isDialogShare: true })
      })
      .catch((error) => {
        console.log(error)   
        setTimeout(() => {
          document.location.reload(true);
        }, 5000);
      });    
  }
  shareFileFolder = (event: any) => {
    event.preventDefault();
    if((this.state.userNameShare !== null && this.state.userNameShare !== undefined) && (this.state.fileDataShare !== null && this.state.fileDataShare !== undefined)){
      let payload = {
        sharedTo : this.state.userNameShare,
        sharedFrom : this.state.fileDataShare
      }
      
      const config = {
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('security')
        },
      };
  
      axios
        .post('https://digital-dropbox.herokuapp.com/Share', payload, config)
        .then((response) => {
          if(!response.data.error){
            this.setState({ isDialogShare: false })
            setTimeout(() => {
              document.location.reload(true);
            }, 5000);
          }
        })
        .catch((error) => {
          console.log(error)   
          setTimeout(() => {
            document.location.reload(true);
          }, 5000);
        });
    }
  }
  addFolder = (event: any) => {
    event.preventDefault();
    if(event.target.files.length > 0){
      let fileDataTab: Array<any> = []
      for(let i = 0; i < event.target.files.length; i++){
        fileDataTab.push({webkitRelativePath: event.target.files[i].webkitRelativePath, name: event.target.files[i].name})
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryu2bwWC2UJRwib11V',
          'Authorization': 'Bearer '+localStorage.getItem('security')         
        },
      };
      const formData = new FormData()
      for (const file of event.target.files) {
        formData.append('uploadFiles', file)
        formData.append('fileDataTab', file.webkitRelativePath)
      }
      formData.append('path', this.state.filterPathDirectory === '' ? '/' : this.state.filterPathDirectory)
      formData.append('action', 'save')
      formData.append('typeUpload', 'folder')

      axios.post('https://digital-dropbox.herokuapp.com/Upload', formData , config)
        .then((response) => {
          setTimeout(() => {
            document.location.reload(true);
          }, 5000);
        })
        .catch((error) => {
          console.log(error)
          setTimeout(() => {
            document.location.reload(true);
          }, 5000);
        });
    }else{
      return console.log('Aucun dossier a été ajouté')
    }
  }

  render(){
    const { classes } = this.props;
    const { openFileDialog,args,contentFile,fileNameOpen,resultFile,isEdit,fileBase,mimeType,isDialogShare,utilisateurs,userNameShare,argsListFilesShare, filterPathDirectory} = this.state;
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
              <Button variant="outlined" color="inherit" onClick={event => this.shareFileOpen(event)}>
                <AccountTreeOutlinedIcon />Système de Partage
              </Button>
              </Grid>
              <Grid item>
                <input
                  accept="*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  name='uploadFiles'
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
                  getImageUrl:  "https://digital-dropbox.herokuapp.com/GetImage",// hostUrl + "api/FileManager/GetImage"
                  url: "https://digital-dropbox.herokuapp.com/Manager",// hostUrl +"api/FileManager/FileOperations"
                  downloadUrl:"https://digital-dropbox.herokuapp.com/Download",// hostUrl + 'api/FileManager/Download'
                  uploadUrl:  "https://digital-dropbox.herokuapp.com/Upload" ,// hostUrl + 'api/FileManager/Upload'
                }} 
                beforeSend={this.beforeSend.bind(this)}
                /*path='/download' */
                /*showFileExtension= {false}*/
                /*enablePersistence={true}*/
                /*uploadSettings={{ maxFileSize: 233332, minFileSize: 120, autoUpload: true }}*/ //maxsize: 30000000
                fileOpen = {this.fileOpen.bind(this)}
                created = {this.onCreated.bind(this)}
                success = {this.onSuccess.bind(this)} 
                failure = {this.onFailure.bind(this)}>
                <Inject services={[NavigationPane, DetailsView, ToolbarFile, BreadCrumbBar]}/>
                </FileManagerComponent>
              </div>
            </div>
          </Typography>
        </div>
        <Dialog fullScreen open={openFileDialog} onClose={() => this.setState({ openFileDialog: false })}>
        <AppBar className={classes.appBarFile}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => this.setState({ openFileDialog: false })} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.titleFile}>
              { fileNameOpen }
            </Typography>
            {isEdit ? (            
            <Button autoFocus color="inherit" onClick={this.saveFile}>
              Sauvegarder
            </Button>) : (
            <Button autoFocus color="inherit" onClick={() => this.setState({ openFileDialog: false })}>
              Fermer
            </Button>
            )}
          </Toolbar>
        </AppBar>
        {isEdit ? (
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
              editor.on("gutterClick", (cm: any, n:any) => {
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
              editor.setOption('mode', detect.contents(fileNameOpen, value).toLowerCase() === 'html' || detect.contents(fileNameOpen, value).toLowerCase() === 'vue' ? 'htmlmixed' : detect.contents(fileNameOpen, value).toLowerCase() === 'json' ? 'jsx' : detect.contents(fileNameOpen, value).toLowerCase() === 'sqlpl' ? 'sql' : fileNameOpen.split('.')[1] === 'ts' ? 'javascript' : detect.contents(fileNameOpen, value).toLowerCase());
            }}
            onChange={(editor, data, value) => {
              this.setState({ resultFile: value });
            }}
          />   
        ) : (
          <iframe src={"data:"+mimeType+";base64,"+fileBase} height="100%" width="100%"></iframe> // mimeType = application/pdf
        )}
        </Dialog>
        <Dialog onClose={() => this.setState({ isDialogShare: false })} aria-labelledby="form-dialog-title" open={isDialogShare}>
          <DialogTitle id="form-dialog-title">Partager un fichier/dossier</DialogTitle>
          <DialogContent>
            <Autocomplete
              onChange={(event, value) => this.setState({ userNameShare: value })}
              options={utilisateurs}
              getOptionLabel={(option) => option.lastname}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Partager avec M/Mme" variant="outlined" />}
            />
            <br />
            <Autocomplete
              onChange={(event, value) => this.setState({ fileDataShare: value })}
              options={argsListFilesShare}
              getOptionLabel={(option) => !option.isFile ? `Dossier:   ${option.name}` : `Fichier :   ${option.name}`}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Sélectionner le fichier/dossier" variant="outlined" />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ isDialogShare: false })} color="primary">
              Cancel
            </Button>
            <Button onClick={event => this.shareFileFolder(event)} color="primary">
              Partager
            </Button>
          </DialogActions>
        </Dialog>
        </Paper>
    );
  }
}

