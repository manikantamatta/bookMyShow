export interface loginResponse{
    message:string;
    user:{
        id:string;
        username:string;
    }  
}
export interface loginData{
    username:string;
    password:string;
}