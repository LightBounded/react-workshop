import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Todo } from "../App";

export interface TodosContext {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodosContext = createContext<TodosContext>({
  todos: [],
  setTodos: () => {},
});

export function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTodos() {
  return useContext(TodosContext);
}
