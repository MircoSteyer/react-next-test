import { renderHook } from "@testing-library/react";
import {
  EditableContext,
  EditableProvider,
  useEditable,
} from "@/lib/hooks/useEditable";
import { ReactNode } from "react";
import { act } from "react-dom/test-utils";

describe("useEditable Hook", () => {
  it("should return the current editable state of the app", () => {
    const context = setup();

    expect(context.editable).toEqual(false);
  });

  it("should return a setter to override the editable state", () => {
    const context = setup();
    act(() => {
      context.setEditable(true);
    });

    expect(context.editable).toEqual(true);
  });
});

// setup is a bit rough here:
// 1. getters/setters
// 2. destructuring forbidden
const setup = (initial: boolean = false): EditableContext => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <EditableProvider defaultEditable={initial}>{children}</EditableProvider>
  );
  const { result } = renderHook(() => useEditable(), { wrapper });

  return {
    get editable() {
      return result.current.editable;
    },
    setEditable: result.current.setEditable,
  };
};
