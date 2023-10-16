import { Todo } from "@/lib/interfaces/todo";
import TodoItem from "@/components/ui/todo/TodoItem";

export interface TodoListProps {
  todos: Todo[];
  toggleCompletion: (id: Todo["id"]) => void;
  removeTodo: (id: Todo["id"]) => void;
}
const TodoList = ({ todos, toggleCompletion, removeTodo }: TodoListProps) => {
  return (
    <ol>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompletion={toggleCompletion}
          removeTodo={removeTodo}
        />
      ))}
    </ol>
  );
};

TodoList.displayName = "TodoList";
export default TodoList;
