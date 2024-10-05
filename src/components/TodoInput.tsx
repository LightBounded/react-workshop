import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTodos } from "./TodosContextProvider";

export function TodoInput() {
  const [todoTitle, setTodoTitle] = useState("");
  const { todos, setTodos } = useTodos();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const id = uuidv4();

        fetch("http://localhost:3000/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, title: todoTitle }),
        });

        setTodos([...todos, { id, title: todoTitle }]);
        setTodoTitle("");
      }}
    >
      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
    </form>
  );
}
