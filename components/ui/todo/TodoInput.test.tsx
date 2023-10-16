import { render, screen } from "@testing-library/react";
import { EditableProvider } from "@/lib/hooks/useEditable";
import TodoInput from "@/components/ui/todo/TodoInput";
import userEvent, { UserEvent } from "@testing-library/user-event";

describe("TodoInput Component", () => {
  describe("Input", () => {
    it("should contain an input field", () => {
      setup();

      const input: HTMLInputElement = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();
    });

    it("should have a placeholder to add todos", () => {
      setup();

      const input: HTMLInputElement = screen.getByRole("textbox");

      expect(input.placeholder).toEqual("Add a todo here");
    });

    it("should be disabled if editable is false", () => {
      setup(false);

      const input: HTMLInputElement = screen.getByRole("textbox");

      expect(input.disabled).toEqual(true);
    });

    it("should submit the content on enter press", async () => {
      const { user, addTodoMock } = setup();

      const input: HTMLInputElement = screen.getByRole("textbox");

      await user.click(input);
      await user.keyboard("Test");
      await user.keyboard("[Enter]");

      expect(addTodoMock).toHaveBeenCalledTimes(1);
      expect(addTodoMock.mock.lastCall?.at(0)).toEqual("Test");
    });

    it("should empty the input on submission", async () => {
      const { user } = setup();

      const input: HTMLInputElement = screen.getByRole("textbox");

      await user.click(input);
      await user.keyboard("Test");

      expect(input.value).toEqual("Test");

      await user.keyboard("[Enter]");

      expect(input.value).toEqual("");
    });
  });

  describe("Submit Button", () => {
    it("should contain a submit button", () => {
      setup();

      const button: HTMLButtonElement = screen.getByRole("button", {
        name: "Submit",
      });

      expect(button).toBeInTheDocument();
    });

    it("should be disabled if editable is false", () => {
      setup(false);

      const button: HTMLButtonElement = screen.getByRole("button", {
        name: "Submit",
      });

      expect(button.disabled).toEqual(true);
    });

    it("should submit the input content on click", async () => {
      const { user, addTodoMock } = setup();

      const input: HTMLInputElement = screen.getByRole("textbox");
      const button: HTMLButtonElement = screen.getByRole("button", {
        name: "Submit",
      });

      await user.click(input);
      await user.keyboard("Test");
      await user.click(button);

      expect(addTodoMock).toHaveBeenCalledTimes(1);
    });

    it("should empty input field on submission", async () => {
      const { user } = setup();

      const input: HTMLInputElement = screen.getByRole("textbox");
      const button: HTMLButtonElement = screen.getByRole("button", {
        name: "Submit",
      });

      await user.click(input);
      await user.keyboard("Test");

      expect(input.value).toEqual("Test");

      await user.click(button);

      expect(input.value).toEqual("");
    });
  });
});

const setup = (
  defaultEditable: boolean = true,
): { user: UserEvent; debug: () => void; addTodoMock: jest.Mock } => {
  const user = userEvent.setup();

  const addTodoMock = jest.fn();

  const { debug } = render(
    <EditableProvider defaultEditable={defaultEditable}>
      <TodoInput addTodo={addTodoMock} />
    </EditableProvider>,
  );

  return {
    user,
    debug,
    addTodoMock,
  };
};
