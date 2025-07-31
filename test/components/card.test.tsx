import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Card from "@/components/card";

describe("Card Component", () => {
  describe("Basic Rendering", () => {
    it("renders with children content and base card class", () => {
      const { getByText, container } = render(() => <Card>Test Content</Card>);
      expect(getByText("Test Content")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("card");
    });

    it("renders with title and body content", () => {
      const { getByText } = render(() => (
        <Card title="Card Title" body="Card body content">Test Content</Card>
      ));
      expect(getByText("Card Title")).toBeInTheDocument();
      expect(getByText("Card body content")).toBeInTheDocument();
    });

    it("applies custom classes", () => {
      const { container } = render(() => (
        <Card 
          class="custom-class" 
          classList={{ "dynamic-class": true, "disabled-class": false }}
        >
          Test Content
        </Card>
      ));
      expect(container.firstChild).toHaveClass("card", "custom-class", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("disabled-class");
    });
  });

  describe("DaisyUI Variants", () => {
    it("applies variant classes correctly", () => {
      const { container } = render(() => (
        <Card bordered compact side glass>Test Content</Card>
      ));
      expect(container.firstChild).toHaveClass(
        "card", "card-bordered", "card-compact", "card-side", "glass"
      );
    });
  });

  describe("Image Support", () => {
    it("renders image with proper structure", () => {
      const { getByRole, container } = render(() => (
        <Card imageSrc="/test-image.jpg" imageAlt="Test Image">Test Content</Card>
      ));
      const image = getByRole("img");
      expect(image).toHaveAttribute("src", "/test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test Image");
      expect(container.querySelector("figure")).toBeInTheDocument();
    });

    it("positions image correctly", () => {
      const { container } = render(() => (
        <Card imageSrc="/test.jpg" imagePosition="bottom">Test Content</Card>
      ));
      const figure = container.querySelector("figure");
      const cardBody = container.querySelector(".card-body");
      expect(cardBody?.nextElementSibling).toBe(figure);
    });
  });

  describe("Card Structure", () => {
    it("renders card-body and card-title elements", () => {
      const { container, getByRole } = render(() => (
        <Card title="Test Title" titleLevel={3}>Test Content</Card>
      ));
      expect(container.querySelector(".card-body")).toBeInTheDocument();
      expect(container.querySelector(".card-title")).toBeInTheDocument();
      expect(getByRole("heading", { level: 3 })).toBeInTheDocument();
    });
  });

  describe("Actions Support", () => {
    it("renders actions with positioning", () => {
      const actions = [<button>Button 1</button>, <button>Button 2</button>];
      const { getByText, container } = render(() => (
        <Card actions={actions} actionsPosition="center">Test Content</Card>
      ));
      expect(getByText("Button 1")).toBeInTheDocument();
      expect(getByText("Button 2")).toBeInTheDocument();
      expect(container.querySelector(".card-actions")).toHaveClass("justify-center");
    });

    it("handles single action element", () => {
      const action = <button>Single Button</button>;
      const { getByText, container } = render(() => (
        <Card actions={action}>Test Content</Card>
      ));
      expect(getByText("Single Button")).toBeInTheDocument();
      expect(container.querySelector(".card-actions")).toHaveClass("justify-end");
    });
  });

  describe("Event Handling & Accessibility", () => {
    it("handles click and keyboard events", () => {
      const handleClick = vi.fn();
      const { container, getByRole } = render(() => (
        <Card onClick={handleClick} ariaLabel="Clickable card">Test Content</Card>
      ));
      
      // Test click
      fireEvent.click(container.firstChild as Element);
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test keyboard
      fireEvent.keyDown(container.firstChild as Element, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(2);
      
      // Test accessibility
      expect(getByRole("button")).toBeInTheDocument();
      expect(container.firstChild).toHaveAttribute("aria-label", "Clickable card");
      expect(container.firstChild).toHaveAttribute("tabIndex", "0");
    });

    it("maintains article semantics when not clickable", () => {
      const { container } = render(() => (
        <Card ariaDescribedBy="description">Test Content</Card>
      ));
      expect(container.firstChild).toHaveAttribute("role", "article");
      expect(container.firstChild).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content gracefully", () => {
      const { container } = render(() => <Card />);
      expect(container.firstChild).toHaveClass("card");
    });

    it("prevents default behavior for keyboard events", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Card onClick={handleClick}>Test Content</Card>
      ));
      fireEvent.keyDown(container.firstChild as Element, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Integration", () => {
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
        "card", "card-bordered", "card-compact", "glass", "custom-class"
      );
      expect(getByText("Full Featured Card")).toBeInTheDocument();
      expect(getByText("Action")).toBeInTheDocument();
      expect(container.firstChild).toHaveAttribute("aria-label", "Full featured card");
    });
  });
});
