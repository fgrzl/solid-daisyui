import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Button from "@/components/button";

describe("Button Component", () => {
  it("renders a basic button", () => {
    const { getByRole } = render(() => <Button>Click me</Button>);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders button with children", () => {
    const { getByText } = render(() => <Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { getByRole } = render(() => (
      <Button variant="primary">Primary</Button>
    ));
    expect(getByRole("button")).toHaveClass("btn-primary");
  });

  it("applies size classes correctly", () => {
    const { getByRole } = render(() => <Button size="lg">Large</Button>);
    expect(getByRole("button")).toHaveClass("btn-lg");
  });

  it("does not apply size class for default md size", () => {
    const { getByRole } = render(() => <Button size="md">Medium</Button>);
    expect(getByRole("button")).not.toHaveClass("btn-md");
  });

  it("applies shape classes correctly", () => {
    const { getByRole } = render(() => <Button shape="circle">O</Button>);
    expect(getByRole("button")).toHaveClass("btn-circle");
  });

  it("applies outline modifier", () => {
    const { getByRole } = render(() => <Button outline>Outline</Button>);
    expect(getByRole("button")).toHaveClass("btn-outline");
  });

  it("applies wide modifier", () => {
    const { getByRole } = render(() => <Button wide>Wide</Button>);
    expect(getByRole("button")).toHaveClass("btn-wide");
  });

  it("applies block modifier", () => {
    const { getByRole } = render(() => <Button block>Block</Button>);
    expect(getByRole("button")).toHaveClass("btn-block");
  });

  it("applies active state", () => {
    const { getByRole } = render(() => <Button active>Active</Button>);
    expect(getByRole("button")).toHaveClass("btn-active");
  });

  it("applies disabled state", () => {
    const { getByRole } = render(() => <Button disabled>Disabled</Button>);
    const button = getByRole("button");
    expect(button).toHaveClass("btn-disabled");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
  });

  it("applies loading state", () => {
    const { getByRole } = render(() => <Button loading>Loading</Button>);
    const button = getByRole("button");
    expect(button).toHaveClass("loading");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("renders loading spinner when loading", () => {
    const { container } = render(() => <Button loading>Loading</Button>);
    const spinner = container.querySelector(".loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders start icon", () => {
    const { container } = render(() => (
      <Button startIcon={<span data-testid="start-icon">→</span>}>
        With Icon
      </Button>
    ));
    const startIcon = container.querySelector(".btn-icon-start");
    expect(startIcon).toBeInTheDocument();
  });

  it("renders end icon", () => {
    const { container } = render(() => (
      <Button endIcon={<span data-testid="end-icon">←</span>}>With Icon</Button>
    ));
    const endIcon = container.querySelector(".btn-icon-end");
    expect(endIcon).toBeInTheDocument();
  });

  it("hides icons when loading", () => {
    const { container } = render(() => (
      <Button
        loading
        startIcon={<span data-testid="start-icon">→</span>}
        endIcon={<span data-testid="end-icon">←</span>}
      >
        Loading
      </Button>
    ));
    expect(container.querySelector(".btn-icon-start")).not.toBeInTheDocument();
    expect(container.querySelector(".btn-icon-end")).not.toBeInTheDocument();
  });

  it("applies custom classes", () => {
    const { getByRole } = render(() => (
      <Button class="custom-class">Custom</Button>
    ));
    expect(getByRole("button")).toHaveClass("custom-class");
  });

  it("merges classList correctly", () => {
    const { getByRole } = render(() => (
      <Button classList={{ "dynamic-class": true, "inactive-class": false }}>
        Dynamic Classes
      </Button>
    ));
    const button = getByRole("button");
    expect(button).toHaveClass("dynamic-class");
    expect(button).not.toHaveClass("inactive-class");
  });

  it("handles click events", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    const { getByRole } = render(() => (
      <Button onClick={handleClick}>Clickable</Button>
    ));

    const button = getByRole("button");
    fireEvent.click(button);
    expect(clicked).toBe(true);
  });

  it("handles focus events", () => {
    let focused = false;
    const handleFocus = () => {
      focused = true;
    };

    const { getByRole } = render(() => (
      <Button onFocus={handleFocus}>Focusable</Button>
    ));

    const button = getByRole("button");
    fireEvent.focus(button);
    expect(focused).toBe(true);
  });

  it("handles blur events", () => {
    let blurred = false;
    const handleBlur = () => {
      blurred = true;
    };

    const { getByRole } = render(() => (
      <Button onBlur={handleBlur}>Blurable</Button>
    ));

    const button = getByRole("button");
    fireEvent.blur(button);
    expect(blurred).toBe(true);
  });

  it("applies accessibility attributes", () => {
    const { getByRole } = render(() => (
      <Button
        aria-label="Custom label"
        aria-describedby="description"
        id="test-button"
      >
        Accessible
      </Button>
    ));

    const button = getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Custom label");
    expect(button).toHaveAttribute("aria-describedby", "description");
    expect(button).toHaveAttribute("id", "test-button");
  });

  it("supports submit and reset types", () => {
    const { getByRole: getSubmitButton } = render(() => (
      <Button type="submit">Submit</Button>
    ));
    expect(getSubmitButton("button")).toHaveAttribute("type", "submit");

    const { getByRole: getResetButton } = render(() => (
      <Button type="reset">Reset</Button>
    ));
    expect(getResetButton("button")).toHaveAttribute("type", "reset");
  });

  it("supports custom tabIndex", () => {
    const { getByRole } = render(() => (
      <Button tabIndex={5}>Custom Tab</Button>
    ));
    expect(getByRole("button")).toHaveAttribute("tabindex", "5");
  });
});
