export interface User{
    error: boolean;
    message: string;
}
  
export interface errorRequest{
    error: boolean;
    message: string;
}

export interface UserLogin{
    error: boolean;
    message: string;
    id_user: string;
    token: string;
}