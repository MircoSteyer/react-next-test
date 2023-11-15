import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import { EditableProvider } from "@/lib/hooks/useEditable";
import Todos from "@/components/ui/todo/Todos";
import { Todo } from "@/lib/interfaces/todo";

describe("Todos Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should be able to add persisting todos", async () => {});

  it("should be able to toggle persisting todos", async () => {});

  it("should be able to remove persisting todos", async () => {});
});

const setup = async () => {};
