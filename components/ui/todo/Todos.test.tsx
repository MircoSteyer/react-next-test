import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import { EditableProvider } from "@/lib/hooks/useEditable";
import Todos from "@/components/ui/todo/Todos";
import { Todo } from "@/lib/interfaces/todo";

describe("Todos Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should be able to add persisting todos", async () => {
    const { user, rerender } = await setup();

    let input: HTMLInputElement = screen.getByRole("textbox");
    let ol: HTMLOListElement = screen.getByRole("list");
    let listitems: HTMLLIElement[] = within(ol).queryAllByRole("listitem");

    expect(listitems.length).toEqual(0);

    await user.click(input);
    await user.keyboard("Test");
    await user.keyboard("[Enter]");

    listitems = within(ol).queryAllByRole("listitem");
    expect(listitems.length).toEqual(1);

    rerender();

    ol = screen.getByRole("list");
    listitems = within(ol).queryAllByRole("listitem");
    expect(listitems.length).toEqual(1);
  });

  it("should be able to toggle persisting todos", async () => {
    const { user, rerender } = await setup(["1 Title", "2 Title", "3 Title"]);

    let ol: HTMLOListElement = screen.getByRole("list");
    let listitems: HTMLLIElement[] = within(ol).queryAllByRole("listitem");
    let checkbox: HTMLButtonElement = within(listitems?.at(0)!).getByRole(
      "checkbox",
    );

    await user.click(checkbox);
    expect(checkbox.dataset.state).toEqual("checked");

    rerender();

    listitems = within(ol).queryAllByRole("listitem");
    checkbox = within(listitems?.at(0)!).getByRole("checkbox");

    expect(checkbox.dataset.state).toEqual("checked");
  });

  it("should be able to remove persisting todos", async () => {
    const { user, rerender } = await setup(["1 Title", "2 Title", "3 Title"]);

    let ol: HTMLOListElement = screen.getByRole("list");
    let listitems: HTMLLIElement[] = within(ol).queryAllByRole("listitem");
    let deleteButton: HTMLButtonElement = within(listitems?.at(0)!).getByRole(
      "button",
      { name: "Delete" },
    );

    expect(listitems.length).toEqual(3);

    await user.click(deleteButton);

    listitems = within(ol).queryAllByRole("listitem");

    expect(listitems.length).toEqual(2);

    rerender();

    listitems = within(ol).queryAllByRole("listitem");

    expect(listitems.length).toEqual(2);
  });
});

const setup = async (
  initialTodos?: Todo["title"][],
  defaultEditable: boolean = true,
): Promise<{
  user: UserEvent;
  debug: () => void;
  rerender: () => void;
}> => {
  const user = userEvent.setup();

  const { debug, rerender } = render(
    <EditableProvider defaultEditable={defaultEditable}>
      <Todos />
    </EditableProvider>,
  );

  if (initialTodos) {
    const input: HTMLInputElement = screen.getByRole("textbox");

    for (const title of initialTodos) {
      await user.click(input);
      await user.keyboard(title);
      await user.keyboard("[Enter]");
    }
  }

  return {
    user,
    debug,
    rerender() {
      rerender(
        <EditableProvider defaultEditable={defaultEditable}>
          <Todos />
        </EditableProvider>,
      );
    },
  };
};
