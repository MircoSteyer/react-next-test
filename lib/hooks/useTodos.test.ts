import { renderHook } from "@testing-library/react";
import { UseTodos, useTodos } from "@/lib/hooks/useTodos";
import { Todo } from "@/lib/interfaces/todo";

describe("useTodos Hook", () => {
  it("should return currently stored todos", () => {
    const storedTodos: Todo[] = [
      { id: "1", title: "1 Title", completed: false },
    ];
    const hook = setup(storedTodos);

    expect(hook.todos).not.toBe(storedTodos);
    expect(hook.todos).toEqual(storedTodos);
  });

  it("should be able to add todos", () => {});

  it("should be able to remove todos", () => {});

  it("should be able to update completion", () => {});
});

const setup = (storedItems: Todo[]): UseTodos => {
  const storage: Storage = {
    ...localStorage,
    getItem() {
      return JSON.stringify(storedItems);
    },
    setItem() {},
  };

  const { result } = renderHook(() => useTodos(storage));

  return {
    get todos() {
      return result.current.todos;
    },
    addTodo: result.current.addTodo,
    removeTodo: result.current.removeTodo,
    toggleCompletion: result.current.toggleCompletion,
  };
};
