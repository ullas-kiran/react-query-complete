import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) => (res.json()))
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

const {mutate,isPending,isError,isSuccess} =useMutation({mutationFn:(newPost)=> fetch("https://jsonplaceholder.typicode.com/todos",{
  method:"POST",
  body:JSON.stringify(newPost)
}).then((res) => (res.json()))})

  return (
    <div>
      {isPending&&<p>Data is being added...</p>}
      {data?.map((todo: Todo) => (
        <div key={todo.id}>
          <h1>Id: {todo.id}</h1>
          <p>Title: {todo.title}</p>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
