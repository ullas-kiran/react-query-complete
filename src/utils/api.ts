import { CreatePostReqBody } from "./types";

export const getUsers=async()=>{
    const  res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
}

export const getPosts=async()=>{
    const  res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
}
export const createPost=async(body:CreatePostReqBody)=>{
    const res=await fetch("https://jsonplaceholder.typicode.com/posts",{
        method:"post",
        body:JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    });

    return res.json();
}