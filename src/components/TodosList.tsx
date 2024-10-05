import { useEffect } from "react";
import { Todo } from "../App";
import { useTodos } from "./TodosContextProvider";

export function TodosList() {
  const { todos, setTodos } = useTodos();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/subscribe");
    eventSource.onmessage = (event) => {
      const eventData: {
        todos: {
          [key: string]: Todo;
        };
      } = JSON.parse(event.data);
      const todos = Object.keys(eventData.todos).map(
        (key) => eventData.todos[key]
      );
      setTodos(todos);
    };

    fetch("http://localhost:3000/todo")
      .then((res) => res.json())
      .then(
        (data: {
          todos: {
            [key: string]: Todo;
          };
        }) => {
          const todos = Object.keys(data.todos).map((key) => data.todos[key]);
          setTodos(todos);
        }
      );

    return () => {
      eventSource.close();
    };
  }, [setTodos]);

  return (
    <div>
      <h1>Todos List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button
              onClick={() => {
                fetch(`http://localhost:3000/todo/${todo.id}`, {
                  method: "DELETE",
                });
                setTodos(todos.filter((t) => t.id !== todo.id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
