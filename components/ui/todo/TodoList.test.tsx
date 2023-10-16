import { render, screen, within } from "@testing-library/react";
import TodoList from "@/components/ui/todo/TodoList";
import { Todo } from "@/lib/interfaces/todo";

describe("TodoList Component", () => {
  it("should render an ordered list", () => {
    setup();

    const ol: HTMLOListElement = screen.getByRole("list");

    expect(ol).toBeInTheDocument();
  });

  it("should render every todo", () => {
    const todos: Todo[] = [
      { id: "1", title: "1 Title", completed: true },
      { id: "2", title: "2 Title", completed: false },
    ];

    setup(todos);

    const listItems: HTMLLIElement[] = screen.getAllByRole("listitem");

    expect(listItems.length).toEqual(todos.length);

    todos.forEach((todo, i) => {
      const label: HTMLLabelElement = within(listItems.at(i)!).getByText(
        todo.title,
      );
      expect(label).toBeInTheDocument();
    });
  });
});

const setup = (todos: Todo[] = []) => {
  const toggleCompletionMock = jest.fn();
  const removeTodoMock = jest.fn();

  render(
    <TodoList
      todos={todos}
      toggleCompletion={toggleCompletionMock}
      removeTodo={removeTodoMock}
    />,
  );
};
