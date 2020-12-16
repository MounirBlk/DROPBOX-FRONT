import * as React from 'react';
import styles, { Styles } from './styles';
import { WithStyles, withStyles, Button,Card,CardActions,CardContent,Typography } from '@material-ui/core';

interface P {
}

interface S {
}

export class Merci extends React.PureComponent<P & WithStyles<Styles>, S>{

    public static Display = withStyles(styles as any)(Merci) as React.ComponentType<P>

    render() {
        const { classes } = this.props;
        setTimeout(() => {
        document.location.href = "/dashboard"
    }, 3000)
        return (
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} variant="h1" component="h1" color="primary" gutterBottom>
                            Merci pour votre achat !!! 
                        </Typography>
                        <Typography className={classes.text} variant="h3" component="h3" color="primary" gutterBottom>
                            vous allez être rediriger
                        </Typography>
                    </CardContent>
                </Card>
        ) 
    }

}