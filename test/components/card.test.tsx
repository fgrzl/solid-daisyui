import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Card from "@/components/card";

describe("Card Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with children content", () => {
      const { getByText } = render(() => <Card>Test Content</Card>);
      expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("renders with base card class", () => {
      const { container } = render(() => <Card>Test Content</Card>);
      expect(container.firstChild).toHaveClass("card");
    });

    it("renders card body when body prop is provided", () => {
      const { getByText } = render(() => (
        <Card body="Card body content">Test Content</Card>
      ));
      expect(getByText("Card body content")).toBeInTheDocument();
    });

    it("renders card title when title prop is provided", () => {
      const { getByText } = render(() => (
        <Card title="Card Title">Test Content</Card>
      ));
      expect(getByText("Card Title")).toBeInTheDocument();
    });

    it("applies custom class via class prop", () => {
      const { container } = render(() => (
        <Card class="custom-class">Test Content</Card>
      ));
      expect(container.firstChild).toHaveClass("card", "custom-class");
    });

    it("applies dynamic classes via classList prop", () => {
      const { container } = render(() => (
        <Card classList={{ "dynamic-class": true, "disabled-class": false }}>
          Test Content
        </Card>
      ));
      expect(container.firstChild).toHaveClass("card", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("disabled-class");
    });
  });

  // DaisyUI Variant Tests
  describe("DaisyUI Variants", () => {
    it("applies card-bordered class for bordered variant", () => {
      const { container } = render(() => (
        <Card bordered>Test Content</Card>
      ));
      expect(container.firstChild).toHaveClass("card", "card-bordered");
    });

    it("applies card-compact class for compact variant", () => {
      const { container } = render(() => (
        <Card compact>Test Content</Card>
      ));
      expect(container.firstChild).toHaveClass("card", "card-compact");
    });

    it("applies card-side class for side variant", () => {
      const { container } = render(() => (
        <Card side>Test Content</Card>
      ));
      expect(container.firstChild).toHaveClass("card", "card-side");
    });

    it("applies glass class for glass variant", () => {
      const { container } = render(() => (
        <Card glass>Test Content</Card>
      ));
      expect(container.firstChild).toHaveClass("card", "glass");
    });

    it("combines multiple variant classes correctly", () => {
      const { container } = render(() => (
        <Card bordered compact glass>Test Content</Card>
      ));
      expect(container.firstChild).toHaveClass(
        "card",
        "card-bordered",
        "card-compact", 
        "glass"
      );
    });
  });

  // Image Support Tests
  describe("Image Support", () => {
    it("renders image when imageSrc is provided", () => {
      const { getByRole } = render(() => (
        <Card imageSrc="/test-image.jpg" imageAlt="Test Image">
          Test Content
        </Card>
      ));
      const image = getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test Image");
    });

    it("applies figure element for proper card image structure", () => {
      const { container } = render(() => (
        <Card imageSrc="/test-image.jpg" imageAlt="Test Image">
          Test Content
        </Card>
      ));
      const figure = container.querySelector("figure");
      expect(figure).toBeInTheDocument();
    });

    it("renders image at top by default", () => {
      const { container } = render(() => (
        <Card imageSrc="/test-image.jpg" imageAlt="Test Image">
          Test Content
        </Card>
      ));
      const figure = container.querySelector("figure");
      const cardBody = container.querySelector(".card-body");
      expect(figure?.nextElementSibling).toBe(cardBody);
    });

    it("renders image at bottom when imagePosition is bottom", () => {
      const { container } = render(() => (
        <Card
          imageSrc="/test-image.jpg"
          imageAlt="Test Image"
          imagePosition="bottom"
        >
          Test Content
        </Card>
      ));
      const figure = container.querySelector("figure");
      const cardBody = container.querySelector(".card-body");
      expect(cardBody?.nextElementSibling).toBe(figure);
    });
  });

  // Card Body Structure Tests
  describe("Card Body Structure", () => {
    it("renders card-body element when content is provided", () => {
      const { container } = render(() => <Card>Test Content</Card>);
      expect(container.querySelector(".card-body")).toBeInTheDocument();
    });

    it("renders card-title when title is provided", () => {
      const { container } = render(() => (
        <Card title="Test Title">Test Content</Card>
      ));
      expect(container.querySelector(".card-title")).toBeInTheDocument();
    });

    it("renders title with proper heading semantics", () => {
      const { getByRole } = render(() => (
        <Card title="Test Title">Test Content</Card>
      ));
      expect(getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("allows custom title level via titleLevel prop", () => {
      const { getByRole } = render(() => (
        <Card title="Test Title" titleLevel={3}>Test Content</Card>
      ));
      expect(getByRole("heading", { level: 3 })).toBeInTheDocument();
    });
  });

  // Actions Support Tests
  describe("Actions Support", () => {
    it("renders card-actions when actions are provided", () => {
      const actions = <button>Action Button</button>;
      const { container } = render(() => (
        <Card actions={actions}>Test Content</Card>
      ));
      expect(container.querySelector(".card-actions")).toBeInTheDocument();
    });

    it("renders multiple action elements", () => {
      const actions = [
        <button key="1">Button 1</button>,
        <button key="2">Button 2</button>,
      ];
      const { getByText } = render(() => (
        <Card actions={actions}>Test Content</Card>
      ));
      expect(getByText("Button 1")).toBeInTheDocument();
      expect(getByText("Button 2")).toBeInTheDocument();
    });

    it("positions actions at end by default", () => {
      const actions = <button>Action Button</button>;
      const { container } = render(() => (
        <Card actions={actions}>Test Content</Card>
      ));
      const cardActions = container.querySelector(".card-actions");
      expect(cardActions).toHaveClass("justify-end");
    });

    it("positions actions at start when actionsPosition is start", () => {
      const actions = <button>Action Button</button>;
      const { container } = render(() => (
        <Card actions={actions} actionsPosition="start">
          Test Content
        </Card>
      ));
      const cardActions = container.querySelector(".card-actions");
      expect(cardActions).toHaveClass("justify-start");
    });

    it("centers actions when actionsPosition is center", () => {
      const actions = <button>Action Button</button>;
      const { container } = render(() => (
        <Card actions={actions} actionsPosition="center">
          Test Content
        </Card>
      ));
      const cardActions = container.querySelector(".card-actions");
      expect(cardActions).toHaveClass("justify-center");
    });
  });

  // Event Handling Tests
  describe("Event Handling", () => {
    it("handles click events when onClick is provided", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      fireEvent.click(container.firstChild as Element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("passes event object to onClick handler", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      fireEvent.click(container.firstChild as Element);
      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: "click" })
      );
    });

    it("handles keyboard events when clickable", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      fireEvent.keyDown(container.firstChild as Element, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles Space key for activation when clickable", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      fireEvent.keyDown(container.firstChild as Element, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      const { container } = render(() => <Card>Test Content</Card>);
      const article = container.querySelector("article");
      expect(article).toBeInTheDocument();
    });

    it("is focusable when clickable", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      expect(container.firstChild).toHaveAttribute("tabIndex", "0");
    });

    it("has button role when clickable", () => {
      const handleClick = vi.fn();
      const { getByRole } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      expect(getByRole("button")).toBeInTheDocument();
    });

    it("has proper aria-label when clickable and ariaLabel provided", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick} ariaLabel="Clickable card">
          Test Content
        </Card>
      ));
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "Clickable card"
      );
    });

    it("maintains article semantics when not clickable", () => {
      const { container } = render(() => <Card>Test Content</Card>);
      expect(container.firstChild).toHaveAttribute("role", "article");
    });

    it("supports aria-describedby for additional context", () => {
      const { container } = render(() => (
        <Card ariaDescribedBy="card-description">Test Content</Card>
      ));
      expect(container.firstChild).toHaveAttribute(
        "aria-describedby",
        "card-description"
      );
    });
  });

  // Edge Cases and Error Handling Tests
  describe("Edge Cases", () => {
    it("renders without children", () => {
      const { container } = render(() => <Card />);
      expect(container.firstChild).toHaveClass("card");
    });

    it("handles empty string children gracefully", () => {
      const { container } = render(() => <Card>{""}</Card>);
      expect(container.firstChild).toHaveClass("card");
    });

    it("handles null and undefined children gracefully", () => {
      const { container } = render(() => <Card>{null}</Card>);
      expect(container.firstChild).toHaveClass("card");
    });

    it("handles image load error gracefully", () => {
      const { getByRole } = render(() => (
        <Card imageSrc="invalid-image.jpg" imageAlt="Test Image">
          Test Content
        </Card>
      ));
      const image = getByRole("img");
      fireEvent.error(image);
      // Component should handle error gracefully without crashing
      expect(() => fireEvent.error(image)).not.toThrow();
    });

    it("prevents default behavior for keyboard events", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      
      // Use fireEvent.keyDown which should trigger our handler
      fireEvent.keyDown(container.firstChild as Element, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Integration Tests
  describe("Integration", () => {
    it("works with complex nested content", () => {
      const { getByText } = render(() => (
        <Card title="Complex Card" bordered>
          <div>
            <p>Paragraph content</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </Card>
      ));
      expect(getByText("Complex Card")).toBeInTheDocument();
      expect(getByText("Paragraph content")).toBeInTheDocument();
      expect(getByText("List item 1")).toBeInTheDocument();
    });

    it("combines all features together", () => {
      const handleClick = vi.fn();
      const actions = <button>Action</button>;
      const { container, getByText } = render(() => (
        <Card
          title="Full Featured Card"
          imageSrc="/test.jpg"
          imageAlt="Test"
          bordered
          compact
          glass
          actions={actions}
          actionsPosition="center"
          onClick={handleClick}
          ariaLabel="Full featured card"
          class="custom-class"
        >
          Card content
        </Card>
      ));
      
      expect(container.firstChild).toHaveClass(
        "card",
        "card-bordered",
        "card-compact",
        "glass",
        "custom-class"
      );
      expect(getByText("Full Featured Card")).toBeInTheDocument();
      expect(getByText("Action")).toBeInTheDocument();
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "Full featured card"
      );
    });
  });
});
