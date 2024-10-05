import "./App.css";
import { TodosList } from "./components/TodosList";
import { TodoInput } from "./components/TodoInput";
import { TodosContextProvider } from "./components/TodosContextProvider";

export interface Todo {
  id: string;
  title: string;
}

function App() {
  return (
    <TodosContextProvider>
      <TodoInput />
      <TodosList />
    </TodosContextProvider>
  );
}

export default App;
