import axios from 'axios'

export const stringVerif = (string: string) =>
{
    if (string == '') {
        return false;
    }else{
        return true;
    }
}

export const email = (email:string) => {
    if(email == null || email == undefined)
        return false
    let regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ((email as string).match(regexEmail) == null)
        return false;
    else
        return true;
}

export const password = (password:string) => 
{
    if(password == null || password == undefined)
        return false
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (password as string).match(regexPassword) == null || password === undefined ? false : true;
}

export const token = (token : any) => {
    var config : any = {
        method: 'GET',
        url: 'https://digitaldropbox.twilightparadox.com/token',
        headers: { 
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        };

        axios(config)
        .then((response : any) => {
            return false
        })
        .catch((error : any) => {
            localStorage.clear();
            document.location.href = "/login"
        });
}
