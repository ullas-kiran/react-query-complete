export interface UserResponseHttpData{

id:number;
name:string;
username:string;
email:string;

}

export interface CreatePostReqBody{
    title:string;
    body:string;
    userId:number;
}

export interface PostResponseData{
    id:number;
    title:string;
    body:string;
    userId:number;
}