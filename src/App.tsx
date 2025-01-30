import { getUsers } from "./utils/api";
import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserResponseHttpData } from "./utils/types";
import { useState } from "react";



function App() {
const [title,setTitle]=useState()	
  const { data:usersData, isLoading:isUsersLoading, error:usersError } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers
   })


  if(usersError&&!isUsersLoading){
	return <div>an error has occured while fetching users</div>
  }



  return (
	<div>
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
		):(<></>)}
	</div>
  )
}
  


export default App;
