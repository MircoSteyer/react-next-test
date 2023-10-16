"use client";
import TodoInput from "@/components/ui/todo/TodoInput";
import TodoList from "@/components/ui/todo/TodoList";
import { useTodos } from "@/lib/hooks/useTodos";

const Todos = () => {
  const { todos, addTodo, removeTodo, toggleCompletion } = useTodos();

  return (
    <>
      <TodoInput addTodo={addTodo}></TodoInput>
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleCompletion={toggleCompletion}
      />
    </>
  );
};

Todos.displayName = "Todos";
export default Todos;
