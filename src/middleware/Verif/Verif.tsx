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
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return (password as string).match(regexPassword) == null || password === undefined ? true : false;
}

