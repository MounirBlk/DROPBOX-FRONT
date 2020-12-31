import React from 'react';
import {ToolbarComponent} from "./ToolbarComponent/ToolbarComponent";
import {DrawerComponent} from "./DrawerComponent/DrawerComponent";
import styles, { Styles } from './styles';
import { WithStyles, withStyles } from '@material-ui/core';
import { token } from '../../middleware/Verif/Verif';


interface P {

}

//state
interface S {
    left: boolean
}

export class Menu extends React.PureComponent<P & WithStyles<Styles>, S>{

    public static Display = withStyles(styles as any)(Menu) as React.ComponentType<P> 

    public state: Readonly<S> = {
        left: false
    };

    toggleDrawer = () => {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //   return;
        // }

        this.setState({ left: false });
    };

    openDrawer = () => {
        this.setState({
        left: true
        });
    };

    render() {
        return (
        <div>
            <ToolbarComponent.Display openDrawerHandler={this.openDrawer} />
            {token(localStorage.getItem("security") ? localStorage.getItem("security") : "")}
            <DrawerComponent.Display left={this.state.left} toggleDrawerHandler={this.toggleDrawer} />
        </div>
        );
    }
}