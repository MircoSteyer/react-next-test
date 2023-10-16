import { render, screen } from "@testing-library/react";
import { EditableProvider } from "@/lib/hooks/useEditable";
import EditableSwitch from "@/components/ui/EditableSwitch";
import * as React from "react";
import userEvent, { UserEvent } from "@testing-library/user-event";

describe("Editable Switch", () => {
  it("should render the button switch and its corresponding label", () => {
    const { labels } = setup(true);

    const labelForSwitchButton: HTMLLabelElement = screen.getByText(
      labels.editableTrue,
    );
    const switchButton: HTMLButtonElement = screen.getByLabelText(
      labels.editableTrue,
    );

    expect(switchButton).toBeInTheDocument();
    expect(labelForSwitchButton).toBeInTheDocument();
    expect(switchButton.id).toEqual(labelForSwitchButton.htmlFor);
  });

  it("should read the correct editable state", async () => {
    const { user, labels } = setup(true);

    const switchButton: HTMLButtonElement = screen.getByLabelText(
      labels.editableTrue,
    );

    expect(switchButton.dataset.state).toEqual("checked");

    await user.click(switchButton);

    expect(switchButton.dataset.state).toEqual("unchecked");
  });

  it("should update the label depending on editable state", async () => {
    const { user, labels } = setup(true);

    const labelElement: HTMLLabelElement = screen.getByText(
      labels.editableTrue,
    );
    const switchButton: HTMLButtonElement = screen.getByLabelText(
      labels.editableTrue,
    );

    await user.click(switchButton);

    expect(labelElement.textContent).toEqual(labels.editableFalse);
  });
});

const setup = (
  defaultEditable: boolean = true,
): {
  user: UserEvent;
  debug: () => void;
  labels: { editableTrue: string; editableFalse: string };
} => {
  const user = userEvent.setup();
  const { debug } = render(
    <EditableProvider defaultEditable={defaultEditable}>
      <EditableSwitch />
    </EditableProvider>,
  );

  return {
    user,
    debug,
    labels: { editableTrue: "Edits allowed", editableFalse: "Edits blocked" },
  };
};
