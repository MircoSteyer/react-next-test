describe("useEditable Hook", () => {
  it("should return the current editable state of the app", () => {
    const context = setup();

    expect(context.editable).toEqual(false);
  });

  it("should return a setter to override the editable state", () => {});
});

const setup = () => {};
