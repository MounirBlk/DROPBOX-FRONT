import * as React from 'react';
import styles, { Styles } from './styles';
import { WithStyles, withStyles, Button,Card,CardActions,CardContent,Typography } from '@material-ui/core';
import { Menu } from '../Menu/Menu';
import axios from 'axios';

interface P {
}

interface S {
    prenium: boolean
}

export class Api extends React.PureComponent<P & WithStyles<Styles>, S>{

    public static Display = withStyles(styles as any)(Api) as React.ComponentType<P>

    public state: Readonly<S> = {prenium: false}
    componentDidMount() { 
        var config : any = {
          method: 'GET',
          url: 'http://localhost:4000/user/',
          headers: { 
            'Authorization': 'Bearer '+localStorage.getItem('security'), 
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        };
    
        axios(config)
        .then((response : any) => {
          console.log(response.data)
          if(response.status === 200)
          {
            this.setState({ 
                prenium: response.data.user.prenium
            });

            if(this.state.prenium === false){
                document.location.href = "/dashboard"
            }
          }
        })
        .catch((error : any) => {
            document.location.href = "/dashboard"
        });
      }
    render() {

    const { classes } = this.props;

    this.componentDidMount();

    return (
        <div className={classes.root}>
            <nav>
                <Menu.Display />
            </nav>            
            <iframe className={classes.root} width="100%" height="100%" src="http://localhost:4000/"></iframe>
        </div>
    )
}}