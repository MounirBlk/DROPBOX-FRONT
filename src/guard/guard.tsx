import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

const  PrivateRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => {
    
    const performValidationHere = () => {
        if(localStorage.getItem("security") !== sessionStorage.getItem("security2") || localStorage.getItem("security") === null || sessionStorage.getItem("security2") === null)
        {
            localStorage.clear();
            sessionStorage.clear();
            return false;
        }else{
            return true;
        }
    } 

    const condition = performValidationHere();
    return condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : (<Redirect  to="/"  />);
};
export  default  PrivateRoute;