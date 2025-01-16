import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type PostData = {
  userId: number;
  id: number;
  title: string;
};

function App() {
  // Fetch data using useQuery
  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) => res.json())
  });

  // Error and Loading states
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>{error.message}</div>;

  // Mutation for creating a new todo item
  // const { mutate, isPending, isError, isSuccess } = useMutation({
  //   mutationFn: (newPost: PostData) =>
  //     fetch("https://jsonplaceholder.typicode.com/todos", {
  //       method: "POST",
  //       body: JSON.stringify(newPost),
  //     }).then((res) => res.json()),
  // });

  return (
    <div>

      {/* Uncomment this button to trigger the mutation */}
      
     

      {/* Render fetched todos */}
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
