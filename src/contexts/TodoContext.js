import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  theme: "light",
  addTodo: (todo) => {},
  updatedTodo: (id) => {},
  deleteTodo: (id) => {},
  toggleTheme: () => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};