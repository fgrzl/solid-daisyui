import { render, screen, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Badge from "@/components/badge";

describe("Badge Component", () => {
  // Basic rendering tests
  it("renders with text content", () => {
    render(() => <Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders without content", () => {
    const { container } = render(() => <Badge />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("badge");
  });

  // Variant tests - DaisyUI color variants
  it("applies primary variant", () => {
    const { container } = render(() => (
      <Badge variant="primary">Primary</Badge>
    ));
    expect(container.firstChild).toHaveClass("badge-primary");
  });

  it("applies secondary variant", () => {
    const { container } = render(() => (
      <Badge variant="secondary">Secondary</Badge>
    ));
    expect(container.firstChild).toHaveClass("badge-secondary");
  });

  it("applies accent variant", () => {
    const { container } = render(() => <Badge variant="accent">Accent</Badge>);
    expect(container.firstChild).toHaveClass("badge-accent");
  });

  it("applies info variant", () => {
    const { container } = render(() => <Badge variant="info">Info</Badge>);
    expect(container.firstChild).toHaveClass("badge-info");
  });

  it("applies success variant", () => {
    const { container } = render(() => (
      <Badge variant="success">Success</Badge>
    ));
    expect(container.firstChild).toHaveClass("badge-success");
  });

  it("applies warning variant", () => {
    const { container } = render(() => (
      <Badge variant="warning">Warning</Badge>
    ));
    expect(container.firstChild).toHaveClass("badge-warning");
  });

  it("applies error variant", () => {
    const { container } = render(() => <Badge variant="error">Error</Badge>);
    expect(container.firstChild).toHaveClass("badge-error");
  });

  it("applies ghost variant", () => {
    const { container } = render(() => <Badge variant="ghost">Ghost</Badge>);
    expect(container.firstChild).toHaveClass("badge-ghost");
  });

  it("applies neutral variant", () => {
    const { container } = render(() => (
      <Badge variant="neutral">Neutral</Badge>
    ));
    expect(container.firstChild).toHaveClass("badge-neutral");
  });

  // Size tests
  it("applies xs size", () => {
    const { container } = render(() => <Badge size="xs">XS</Badge>);
    expect(container.firstChild).toHaveClass("badge-xs");
  });

  it("applies sm size", () => {
    const { container } = render(() => <Badge size="sm">SM</Badge>);
    expect(container.firstChild).toHaveClass("badge-sm");
  });

  it("applies md size (default)", () => {
    const { container } = render(() => <Badge size="md">MD</Badge>);
    expect(container.firstChild).toHaveClass("badge-md");
  });

  it("applies lg size", () => {
    const { container } = render(() => <Badge size="lg">LG</Badge>);
    expect(container.firstChild).toHaveClass("badge-lg");
  });

  // Style variant tests
  it("applies outline style", () => {
    const { container } = render(() => <Badge outline>Outline</Badge>);
    expect(container.firstChild).toHaveClass("badge-outline");
  });

  it("combines variant with outline", () => {
    const { container } = render(() => (
      <Badge variant="primary" outline>
        Primary Outline
      </Badge>
    ));
    expect(container.firstChild).toHaveClass("badge-primary", "badge-outline");
  });

  // Custom classes tests
  it("applies custom class prop", () => {
    const { container } = render(() => (
      <Badge class="custom-class">Custom</Badge>
    ));
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies classList prop", () => {
    const { container } = render(() => (
      <Badge classList={{ "dynamic-class": true, "inactive-class": false }}>
        Dynamic
      </Badge>
    ));
    expect(container.firstChild).toHaveClass("dynamic-class");
    expect(container.firstChild).not.toHaveClass("inactive-class");
  });

  it("combines all class sources", () => {
    const { container } = render(() => (
      <Badge
        variant="primary"
        size="lg"
        outline
        class="custom-class"
        classList={{ "dynamic-class": true }}
      >
        All Classes
      </Badge>
    ));
    expect(container.firstChild).toHaveClass(
      "badge",
      "badge-primary",
      "badge-lg",
      "badge-outline",
      "custom-class",
      "dynamic-class",
    );
  });

  // Accessibility tests
  it("has proper accessibility attributes for status badge", () => {
    const { container } = render(() => <Badge variant="success">Online</Badge>);
    expect(container.firstChild).toHaveAttribute("role", "status");
  });

  it("supports aria-label for accessibility", () => {
    const { container } = render(() => (
      <Badge aria-label="3 new messages">3</Badge>
    ));
    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "3 new messages",
    );
  });

  it("supports aria-describedby", () => {
    const { container } = render(() => (
      <Badge aria-describedby="description">Badge</Badge>
    ));
    expect(container.firstChild).toHaveAttribute(
      "aria-describedby",
      "description",
    );
  });

  // Event handling tests
  it("handles click events", () => {
    const onClick = vi.fn();
    const { container } = render(() => (
      <Badge onClick={onClick}>Clickable</Badge>
    ));

    fireEvent.click(container.firstChild!);
    expect(onClick).toHaveBeenCalled();
  });

  it("prevents event bubbling when specified", () => {
    const parentClick = vi.fn();
    const badgeClick = vi.fn((e) => e.stopPropagation());

    const { container } = render(() => (
      <div onClick={parentClick}>
        <Badge onClick={badgeClick}>Stop Propagation</Badge>
      </div>
    ));

    fireEvent.click(container.querySelector(".badge")!);
    expect(badgeClick).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });

  // Edge cases
  it("handles empty string content", () => {
    const { container } = render(() => <Badge>{""}</Badge>);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("badge");
  });

  it("handles undefined variant gracefully", () => {
    const { container } = render(() => (
      <Badge variant={undefined as any}>No Variant</Badge>
    ));
    expect(container.firstChild).toHaveClass("badge");
    expect(container.firstChild).not.toHaveClass("badge-undefined");
  });

  it("handles undefined size gracefully", () => {
    const { container } = render(() => (
      <Badge size={undefined as any}>No Size</Badge>
    ));
    expect(container.firstChild).toHaveClass("badge");
    expect(container.firstChild).not.toHaveClass("badge-undefined");
  });

  // Complex content tests
  it("renders with JSX content", () => {
    const { container } = render(() => (
      <Badge variant="primary">
        <span>Complex</span> <strong>Content</strong>
      </Badge>
    ));
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("strong")).toBeInTheDocument();
  });

  it("renders with numeric content", () => {
    render(() => <Badge>{99}</Badge>);
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  // Combination tests
  it("supports all props together", () => {
    const onClick = vi.fn();
    const { container } = render(() => (
      <Badge
        variant="warning"
        size="lg"
        outline
        class="custom"
        classList={{ active: true }}
        aria-label="Warning badge"
        onClick={onClick}
      >
        Complex Badge
      </Badge>
    ));

    const badge = container.firstChild;
    expect(badge).toHaveClass(
      "badge",
      "badge-warning",
      "badge-lg",
      "badge-outline",
      "custom",
      "active",
    );
    expect(badge).toHaveAttribute("aria-label", "Warning badge");
    expect(badge).toHaveAttribute("role", "status");

    fireEvent.click(badge!);
    expect(onClick).toHaveBeenCalled();
  });
});
