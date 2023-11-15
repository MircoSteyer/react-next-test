import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header Component", () => {
  it("should render the <header> html tag", () => {
    render(<Header />);

    const headerElement: HTMLElement = screen.getByRole("???");

    expect(headerElement).toBeInTheDocument();
  });
});
it("renders the Header component", () => {
  render(<Header />);

  const editableSwitch = screen.getByRole("???");

  expect(editableSwitch).toBeInTheDocument();
});
