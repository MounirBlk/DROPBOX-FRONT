import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

const  PrivateRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => {
    
    const performValidationHere = () => {
        const verif : any = document.location.href.split("=")[1] ? document.location.href.split("=")[1] : ""
        if(localStorage.getItem("security") === null && verif  === "")
        {
            localStorage.clear();
            sessionStorage.clear();
            return false;
        }else if(verif !== "") {
            localStorage.setItem("security",document.location.href.split("=")[1])
            return true;
        }else{
            return true;
        }
    } 

    const condition = performValidationHere();
    return condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : (<Redirect  to="/"  />);
};
export  default  PrivateRoute;