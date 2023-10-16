import { renderHook } from "@testing-library/react";
import { UseTodos, useTodos } from "@/lib/hooks/useTodos";
import { Todo } from "@/lib/interfaces/todo";
import { act } from "react-dom/test-utils";

describe("useTodos Hook", () => {
  it("should return currently stored todos", () => {
    const storedTodos: Todo[] = [
      { id: "1", title: "1 Title", completed: false },
    ];
    const hook = setup(storedTodos);

    expect(hook.todos).not.toBe(storedTodos);
    expect(hook.todos).toEqual(storedTodos);
  });

  it("should be able to add todos", () => {
    const hook = setup([]);

    expect(hook.todos.length).toEqual(0);

    act(() => {
      hook.addTodo("MyTitle");
    });

    expect(hook.todos.length).toEqual(1);
    expect(hook.todos.at(0)).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: "MyTitle",
        completed: false,
      }),
    );
  });

  it("should be able to remove todos", () => {
    const storedTodos: Todo[] = [
      { id: "1", title: "1 Title", completed: false },
    ];
    const hook = setup(storedTodos);

    expect(hook.todos.length).toEqual(1);

    act(() => {
      hook.removeTodo("1");
    });

    expect(hook.todos.length).toEqual(0);
  });

  it("should be able to update completion", () => {
    const storedTodos: Todo[] = [
      { id: "1", title: "1 Title", completed: true },
    ];
    const hook = setup(storedTodos);

    expect(hook.todos.at(0)?.completed).toEqual(true);

    act(() => {
      hook.toggleCompletion("1");
    });

    expect(hook.todos.at(0)?.completed).toEqual(false);
  });
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
