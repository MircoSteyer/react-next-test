import { render, screen } from "@testing-library/react";
import { EditableProvider } from "@/lib/hooks/useEditable";
import React from "react";
import { Todo } from "@/lib/interfaces/todo";
import TodoItem from "@/components/ui/todo/TodoItem";
import userEvent, { UserEvent } from "@testing-library/user-event";

describe("TodoItem Component", () => {
  it("should render a list item with the todo", () => {
    const todo = { id: "1", title: "1 Title", completed: false };
    setup(todo);

    const listItem = screen.getByRole("listitem");

    expect(listItem).toBeInTheDocument();
  });

  describe("Checkbox", () => {
    it("should render a labeled checkbox", () => {
      const todo = { id: "1", title: "1 Title", completed: false };
      setup(todo);

      const checkbox: HTMLButtonElement = screen.getByLabelText(todo.title);

      expect(checkbox).toBeInTheDocument();
      expect(checkbox.getAttribute("role")).toEqual("checkbox");
    });

    it("should request toggleCompletion on todo when checkbox is clicked", async () => {});

    it("should start with toggled checkbox if todo is completed", () => {});

    it("should be disabled if editable is false", () => {
      const todo = { id: "1", title: "1 Title", completed: true };
      setup(todo, false);

      const checkbox: HTMLButtonElement = screen.getByLabelText(todo.title);

      expect(checkbox.disabled).toEqual(true);
    });
  });

  describe("Delete", () => {
    it("should render the delete button", () => {
      const todo = { id: "1", title: "1 Title", completed: false };
      setup(todo);

      const deleteButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Delete",
      });

      expect(deleteButton).toBeInTheDocument();
    });

    it("should request todoDeletion on clicking delete", async () => {});

    it("should be disabled if editable is false", () => {});
  });
});

const setup = (
  todo: Todo,
  defaultEditable: boolean = true,
): {
  debug: () => void;
  toggleCompletionMock: jest.Mock;
  removeTodoMock: jest.Mock;
  user: UserEvent;
} => {
  const user = userEvent.setup();

  const toggleCompletionMock = jest.fn();
  const removeTodoMock = jest.fn();

  const { debug } = render(
    <EditableProvider defaultEditable={defaultEditable}>
      <TodoItem
        todo={todo}
        toggleCompletion={toggleCompletionMock}
        removeTodo={removeTodoMock}
      />
    </EditableProvider>,
  );

  return {
    debug,
    toggleCompletionMock,
    removeTodoMock,
    user,
  };
};
