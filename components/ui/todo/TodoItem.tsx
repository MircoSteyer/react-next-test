import { Todo } from "@/lib/interfaces/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEditable } from "@/lib/hooks/useEditable";

export interface TodoItemProps {
  todo: Todo;
  toggleCompletion: (id: Todo["id"]) => void;
  removeTodo: (id: Todo["id"]) => void;
}
export const TodoItem = ({
  todo,
  toggleCompletion,
  removeTodo,
}: TodoItemProps) => {
  const { editable } = useEditable();

  return (
    <li key={todo.id}>
      <Checkbox
        disabled={!editable}
        className={"mx-1"}
        id={todo.id}
        checked={todo.completed}
        onCheckedChange={() => toggleCompletion(todo.id)}
      />
      <Label className={"mx-1"} htmlFor={todo.id}>
        {todo.title}
      </Label>

      <Button
        disabled={!editable}
        onClick={() => removeTodo(todo.id)}
        className={"h-8"}
      >
        Delete
      </Button>
    </li>
  );
};

TodoItem.displayName = "TodoItem";
export default TodoItem;
