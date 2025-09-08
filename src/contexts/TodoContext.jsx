import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
});

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch {}
  }, [todos]);

  const addTodo = (text) => {
    const trimmed = String(text || "").trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const editTodo = (id, newText) => {
    const trimmed = String(newText || "").trim();
    if (!trimmed) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const value = useMemo(
    () => ({ todos, addTodo, toggleTodo, editTodo, deleteTodo }),
    [todos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => useContext(TodoContext);


