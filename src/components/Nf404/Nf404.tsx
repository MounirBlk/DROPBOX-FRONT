import * as React from 'react';
import styles, { Styles } from './styles';
import { WithStyles, withStyles, Button,Card,CardActions,CardContent,Typography } from '@material-ui/core';

interface P {
}

interface S {
}

export class Nf404 extends React.PureComponent<P & WithStyles<Styles>, S>{
        public static Display = withStyles(styles as any)(Nf404) as React.ComponentType<P>
        render(){
                const { classes } = this.props;
            return (<div>
                        <Typography className={classes.title} variant="h1" component="h1" color="primary" gutterBottom>
                            <h1>4 0 4 Not Found</h1>
                            <Button 
                            fullWidth
                            variant="contained"
                            className={classes.submit} color="primary" href="/register">Accueil</Button>
                        </Typography>
                        
                </div>)
        }

}