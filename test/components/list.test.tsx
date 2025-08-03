import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import List from "@/components/list";

describe("List Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with basic list structure", () => {
      const { container } = render(() => (
        <List>
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      ));
      
      const listElement = container.querySelector('ul');
      expect(listElement).toBeInTheDocument();
      expect(listElement).toHaveClass("list");
    });

    it("renders children properly", () => {
      const { getByText } = render(() => (
        <List>
          <li>First Item</li>
          <li>Second Item</li>
        </List>
      ));
      
      expect(getByText("First Item")).toBeInTheDocument();
      expect(getByText("Second Item")).toBeInTheDocument();
    });

    it("uses proper semantic HTML structure", () => {
      const { container } = render(() => (
        <List>
          <li>Test Item</li>
        </List>
      ));
      
      const listElement = container.querySelector('ul');
      expect(listElement).toBeInTheDocument();
      expect(listElement?.tagName).toBe('UL');
    });

    it("has proper role attribute for accessibility", () => {
      const { getByRole } = render(() => (
        <List>
          <li>Test Item</li>
        </List>
      ));
      
      expect(getByRole("list")).toBeInTheDocument();
    });
  });

  // DaisyUI Variants Tests
  describe("DaisyUI Variants", () => {
    it("applies list-numbered class for numbered variant", () => {
      const { container } = render(() => (
        <List variant="numbered">
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-numbered");
    });

    it("applies list-disc class for disc variant", () => {
      const { container } = render(() => (
        <List variant="disc">
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-disc");
    });

    it("applies list-none class for none variant", () => {
      const { container } = render(() => (
        <List variant="none">
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-none");
    });

    it("works without variant specified (no additional classes)", () => {
      const { container } = render(() => (
        <List>
          <li>Item 1</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list");
      expect(container.firstChild).not.toHaveClass("list-numbered", "list-disc", "list-none");
    });
  });

  // Size Variants Tests
  describe("Size Variants", () => {
    it("applies list-xs class for extra small size", () => {
      const { container } = render(() => (
        <List size="xs">
          <li>Small Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-xs");
    });

    it("applies list-sm class for small size", () => {
      const { container } = render(() => (
        <List size="sm">
          <li>Small Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-sm");
    });

    it("applies list-lg class for large size", () => {
      const { container } = render(() => (
        <List size="lg">
          <li>Large Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-lg");
    });

    it("applies list-xl class for extra large size", () => {
      const { container } = render(() => (
        <List size="xl">
          <li>Extra Large Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-xl");
    });
  });

  // Interactive Features Tests
  describe("Interactive Features", () => {
    it("applies hover classes when hover is enabled", () => {
      const { container } = render(() => (
        <List hover>
          <li>Hoverable Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "hover:list-disc");
    });

    it("supports clickable list items", () => {
      const handleClick = vi.fn();
      const { getByText } = render(() => (
        <List>
          <li onClick={handleClick}>Clickable Item</li>
        </List>
      ));
      
      fireEvent.click(getByText("Clickable Item"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility Tests (WCAG 2.1 AA Compliance)
  describe("Accessibility", () => {
    it("supports custom aria-label", () => {
      const { getByRole } = render(() => (
        <List aria-label="Custom list label">
          <li>Item 1</li>
        </List>
      ));
      
      expect(getByRole("list")).toHaveAttribute("aria-label", "Custom list label");
    });

    it("supports aria-labelledby attribute", () => {
      const { getByRole } = render(() => (
        <List aria-labelledby="list-title">
          <li>Item 1</li>
        </List>
      ));
      
      expect(getByRole("list")).toHaveAttribute("aria-labelledby", "list-title");
    });

    it("supports keyboard navigation on interactive items", () => {
      const handleClick = vi.fn();
      const { getByText } = render(() => (
        <List>
          <li tabIndex={0} onClick={handleClick} onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}>
            Interactive Item
          </li>
        </List>
      ));
      
      const item = getByText("Interactive Item");
      item.focus();
      expect(document.activeElement).toBe(item);
      
      fireEvent.keyDown(item, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("maintains proper list item semantics", () => {
      const { container } = render(() => (
        <List>
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      ));
      
      const listItems = container.querySelectorAll('li');
      listItems.forEach(item => {
        expect(item.tagName).toBe('LI');
      });
    });
  });

  // Class and Style Customization Tests
  describe("Class and Style Customization", () => {
    it("merges additional class prop", () => {
      const { container } = render(() => (
        <List class="custom-list">
          <li>Custom Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "custom-list");
    });

    it("merges classList prop", () => {
      const { container } = render(() => (
        <List classList={{ "dynamic-class": true, "inactive-class": false }}>
          <li>Dynamic Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("inactive-class");
    });

    it("combines class and classList props correctly", () => {
      const { container } = render(() => (
        <List 
          class="static-class" 
          classList={{ "dynamic-class": true }}
        >
          <li>Combined Classes Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "static-class", "dynamic-class");
    });

    it("supports style attribute", () => {
      const { container } = render(() => (
        <List style="padding: 16px;">
          <li>Styled Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveAttribute("style", "padding: 16px;");
    });
  });

  // Edge Cases and Error Conditions
  describe("Edge Cases and Error Conditions", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(() => <List></List>);
      
      expect(container.firstChild).toHaveClass("list");
      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it("handles null children gracefully", () => {
      const { container } = render(() => <List>{null}</List>);
      
      expect(container.firstChild).toHaveClass("list");
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(() => <List>{undefined}</List>);
      
      expect(container.firstChild).toHaveClass("list");
    });

    it("handles mixed content types", () => {
      const { getByText, container } = render(() => (
        <List>
          <li>Text Item</li>
          <li><span>Nested Element</span></li>
          <li>
            <a href="#">Link Item</a>
          </li>
        </List>
      ));
      
      expect(getByText("Text Item")).toBeInTheDocument();
      expect(getByText("Nested Element")).toBeInTheDocument();
      expect(getByText("Link Item")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("list");
    });

    it("handles large number of items", () => {
      const items = Array.from({ length: 100 }, (_, i) => (
        <li>Item {i + 1}</li>
      ));
      
      const { container, getByText } = render(() => (
        <List>{items}</List>
      ));
      
      expect(container.firstChild).toHaveClass("list");
      expect(getByText("Item 1")).toBeInTheDocument();
      expect(getByText("Item 100")).toBeInTheDocument();
    });
  });

  // Performance and State Management
  describe("Performance and State Management", () => {
    it("re-renders efficiently when props change", () => {
      const [variant, setVariant] = createSignal<"numbered" | "disc" | undefined>("numbered");
      
      const { container } = render(() => (
        <List variant={variant()}>
          <li>Test Item</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list-numbered");
      
      // Update variant and verify reactivity
      setVariant("disc");
      
      expect(container.firstChild).toHaveClass("list-disc");
      expect(container.firstChild).not.toHaveClass("list-numbered");
    });

    it("maintains consistent DOM structure", () => {
      const { container } = render(() => (
        <List>
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      ));
      
      const listElement = container.firstChild as HTMLElement;
      expect(listElement).toHaveClass("list");
      expect(listElement?.tagName).toBe('UL');
      
      // Verify list items are properly structured
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(2);
    });
  });

  // TypeScript Interface Validation
  describe("TypeScript Interface", () => {
    it("accepts all expected props without TypeScript errors", () => {
      // This test validates that the interface accepts all documented props
      const { container } = render(() => (
        <List
          variant="numbered"
          size="lg"
          hover={true}
          class="custom-class"
          classList={{ active: true }}
          style="margin: 8px;"
          aria-label="Test list"
          aria-labelledby="list-header"
        >
          <li>Complete Props Test</li>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-numbered", "list-lg");
    });
  });
});
