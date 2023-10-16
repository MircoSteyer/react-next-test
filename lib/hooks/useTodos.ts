"use client";
import { Todo } from "@/lib/interfaces/todo";
import { useEffect, useState } from "react";

export interface UseTodos {
  todos: Todo[];
  addTodo: (title: Todo["title"]) => void;
  removeTodo: (id: Todo["id"]) => void;
  toggleCompletion: (id: Todo["id"]) => void;
}

export const useTodos = (storage: Storage = localStorage): UseTodos => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosString = storage.getItem("todos");
    if (todosString !== null) {
      return JSON.parse(todosString);
    }
    return [];
  });

  useEffect(() => {
    storage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: Todo["title"]) => {
    const todo: Todo = {
      id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      title,
      completed: false,
    };

    setTodos((todos) => [...todos, todo]);
  };

  const removeTodo = (id: Todo["id"]) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id: Todo["id"]) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return { todos, addTodo, removeTodo, toggleCompletion };
};
