import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

const  PrivateRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => {
    
    const performValidationHere = (fn : any) => {
        return fn
    }

    const condition = performValidationHere(() => {
        setInterval(() => {
            if(localStorage.getItem("security") !== localStorage.getItem("security2"))
            {
                document.location.href = "/";
                localStorage.clear();
                return true;
            }
        }, 3000);
    
        setInterval(() =>{
            if(localStorage.getItem("security") == undefined && localStorage.getItem("security2") == undefined){
                document.location.href = "/";
                localStorage.clear();
                return true;
            }
        }, 0)
    });

    return  condition === true ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/"  />);
};
export  default  PrivateRoute;