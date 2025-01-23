import { getUsers } from "./utils/api";
import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserResponseHttpData } from "./utils/types";



function App() {
  const { data, isLoading, error } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers
   })


  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>{error.message}</div>;

  const {
		mutate: createPostMutation,
		isSuccess: isCreatePostSuccess,
		isPending: isCreatePostPending,
	} = useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			console.log("onSuccess");
			queryClient.invalidateQueries({ queryKey: ["getPosts"] });
			queryClient.invalidateQueries({ queryKey: ["getUsers"] });
		},
	});


  return (
    <div>
      {/* {data?.map((todo: Todo) => (
        <div key={todo.id}>
          <h1>Id: {todo.id}</h1>
          <p>Title: {todo.title}</p>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
        </div>
      ))} */}
      <form
				onSubmit={(event) => {
					event.preventDefault();
					createPostMutation({
						title,
						body,
						userId: USER_ID,
					});
				}}
			>
				<label htmlFor="title">Title</label>
				<input
					name="title"
					id="title"
					value={title}
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<br />
				<label htmlFor="body">Body</label>
				<input
					name="body"
					id="body"
					value={body}
					onChange={(event) => {
						setBody(event.target.value);
					}}
				/>
				<button>Create Post</button>
			</form>
    </div>
  );
}

export default App;
