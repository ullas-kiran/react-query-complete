import { createPost, getPosts, getUsers } from "./utils/api";
import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostResponseData, UserResponseHttpData } from "./utils/types";
import { useEffect, useState } from "react";



function App() {
	const USER_ID=4589;
	const [title,setTitle]=useState('');
	const [body,setBody]=useState('');
	const { data:usersData, isLoading:isUsersLoading, error:usersError } = useQuery<UserResponseHttpData[]>({
		queryKey: ["getUsers"],
		queryFn: getUsers
	});

	const { data:postsData, isLoading:isPostLoading, error:postsError,refetch:refetchGetPost } = useQuery<PostResponseData[]>({
		queryKey: ["getPosts"],
		queryFn: getPosts
	});


  const {mutate:CreatePostMutation,isSuccess:isCreatePostSuccess}=useMutation({
	mutationFn:createPost
  })



  if(usersError&&!isUsersLoading){
	return <div>an error has occured while fetching users</div>
  }

  useEffect(()=>{

	if(isCreatePostSuccess){
		refetchGetPost();
	}

  },[isCreatePostSuccess,refetchGetPost])



  return (
	<div>
		<form onSubmit={(event)=>{
			event.preventDefault();
			CreatePostMutation({
				title,
				body,
				userId:USER_ID
			});
		}}>
			<label htmlFor="title">Title</label>
			<input type="text" name="title" value={title} onChange={(event)=>{
				setTitle(event.target.value)
			}}/>
			<br />
			<label htmlFor="body">Body</label>
			<input type="text" name="body" value={body} onChange={(event)=>{
				setBody(event.target.value);
			}} />
			<button>Create Post</button>
		</form>

		<div>
			{!isPostLoading&&postsData&&postsData?.map((post)=>{
				return(
                     <div key={post.id}>
                        <h1>{post.title}</h1>
						<p>{post.body}</p>
					 </div>
				)
			})}
		</div>
			{!isUsersLoading&&usersData?(
			<div>
				{usersData?.map((user)=>(
					<div key={user.id}>
						<b>{user.name}</b>
						<b>{user.username}</b>
						<b>{user.email}</b>
					</div>
				))}
			</div>
		):(<>Loading....</>)}
	</div>
  )
}
  


export default App;
