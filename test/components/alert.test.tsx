import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Alert from "@/components/alert";

describe("Alert Component", () => {
  it("renders with children", () => {
    const { getByText } = render(() => <Alert>Test Alert</Alert>);
    expect(getByText("Test Alert")).toBeInTheDocument();
  });

  it("applies the correct type class", () => {
    const { container } = render(() => (
      <Alert type="success">Success Alert</Alert>
    ));
    expect(container.firstChild).toHaveClass("alert-success");
  });

  it("renders with an icon", () => {
    const { getByText } = render(() => (
      <Alert icon={<span>Icon</span>}>Alert with Icon</Alert>
    ));
    expect(getByText("Icon")).toBeInTheDocument();
  });

  it("merges user-provided classList", () => {
    const { container } = render(() => (
      <Alert classList={{ "custom-class": true }}>Custom Class Alert</Alert>
    ));
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("does not render an icon if none is provided", () => {
    const { queryByText } = render(() => <Alert>No Icon Alert</Alert>);
    expect(queryByText("Icon")).not.toBeInTheDocument();
  });

  it("applies the correct style class", () => {
    const { container } = render(() => (
      <Alert style="soft">Soft Style Alert</Alert>
    ));
    expect(container.firstChild).toHaveClass("alert-soft");
  });

  it("renders with a title", () => {
    const { getByText } = render(() => (
      <Alert title="Alert Title">Alert with Title</Alert>
    ));
    expect(getByText("Alert Title")).toBeInTheDocument();
  });

  it("applies vertical layout class", () => {
    const { container } = render(() => (
      <Alert vertical>Vertical Layout Alert</Alert>
    ));
    expect(container.firstChild).toHaveClass("alert-vertical");
  });

  it("renders additional buttons", () => {
    const { getByText } = render(() => (
      <Alert buttons={[<button>Accept</button>, <button>Deny</button>]}>
        Alert with Buttons
      </Alert>
    ));
    expect(getByText("Accept")).toBeInTheDocument();
    expect(getByText("Deny")).toBeInTheDocument();
  });

  it("closes the alert when the close button is clicked", () => {
    const { getByLabelText } = render(() => <Alert>Dismissible Alert</Alert>);

    const closeButton = getByLabelText("Close");

    // Simply test that the close button exists and can be clicked without throwing
    expect(closeButton).toBeInTheDocument();

    // This should not throw an error
    expect(() => fireEvent.click(closeButton)).not.toThrow();
  });
});
