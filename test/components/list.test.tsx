import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { List, ListItem } from "@/components/list";

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

describe("ListItem Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders as a list item element", () => {
      const { container } = render(() => (
        <ul>
          <ListItem>Test Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
      expect(listItem?.tagName).toBe('LI');
    });

    it("renders children properly", () => {
      const { getByText } = render(() => (
        <ul>
          <ListItem>Test Content</ListItem>
        </ul>
      ));
      
      expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("supports complex children content", () => {
      const { getByText, getByRole } = render(() => (
        <ul>
          <ListItem>
            <span>Text content</span>
            <button>Action</button>
          </ListItem>
        </ul>
      ));
      
      expect(getByText("Text content")).toBeInTheDocument();
      expect(getByRole("button")).toBeInTheDocument();
    });
  });

  // Integration with List Component
  describe("Integration with List Component", () => {
    it("works properly within List component", () => {
      const { container, getByText } = render(() => (
        <List variant="numbered">
          <ListItem>First Item</ListItem>
          <ListItem>Second Item</ListItem>
        </List>
      ));
      
      expect(container.firstChild).toHaveClass("list", "list-numbered");
      expect(getByText("First Item")).toBeInTheDocument();
      expect(getByText("Second Item")).toBeInTheDocument();
      
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(2);
    });

    it("works alongside raw li elements", () => {
      const { container, getByText } = render(() => (
        <List>
          <ListItem>ListItem Component</ListItem>
          <li>Raw li element</li>
        </List>
      ));
      
      expect(getByText("ListItem Component")).toBeInTheDocument();
      expect(getByText("Raw li element")).toBeInTheDocument();
      
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(2);
    });
  });

  // Interactive Features
  describe("Interactive Features", () => {
    it("supports onClick handler", () => {
      const handleClick = vi.fn();
      const { getByText } = render(() => (
        <ul>
          <ListItem onClick={handleClick}>Clickable Item</ListItem>
        </ul>
      ));
      
      fireEvent.click(getByText("Clickable Item"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard navigation with Enter key", () => {
      const handleClick = vi.fn();
      const { getByText } = render(() => (
        <ul>
          <ListItem onClick={handleClick} tabIndex={0}>
            Keyboard Item
          </ListItem>
        </ul>
      ));
      
      const item = getByText("Keyboard Item");
      fireEvent.keyDown(item, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard navigation with Space key", () => {
      const handleClick = vi.fn();
      const { getByText } = render(() => (
        <ul>
          <ListItem onClick={handleClick} tabIndex={0}>
            Keyboard Item
          </ListItem>
        </ul>
      ));
      
      const item = getByText("Keyboard Item");
      fireEvent.keyDown(item, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports custom onKeyDown handler", () => {
      const handleKeyDown = vi.fn();
      const { getByText } = render(() => (
        <ul>
          <ListItem onKeyDown={handleKeyDown}>
            Custom Key Item
          </ListItem>
        </ul>
      ));
      
      const item = getByText("Custom Key Item");
      fireEvent.keyDown(item, { key: 'a' });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("calls both custom onKeyDown and onClick when Enter is pressed", () => {
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      const { getByText } = render(() => (
        <ul>
          <ListItem onClick={handleClick} onKeyDown={handleKeyDown}>
            Combined Handlers
          </ListItem>
        </ul>
      ));
      
      const item = getByText("Combined Handlers");
      fireEvent.keyDown(item, { key: 'Enter' });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility Features
  describe("Accessibility", () => {
    it("supports custom aria-label", () => {
      const { container } = render(() => (
        <ul>
          <ListItem aria-label="Custom item label">Test Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveAttribute('aria-label', 'Custom item label');
    });

    it("supports custom role attribute", () => {
      const { container } = render(() => (
        <ul>
          <ListItem role="button">Button Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveAttribute('role', 'button');
    });

    it("supports tabIndex for keyboard navigation", () => {
      const { container } = render(() => (
        <ul>
          <ListItem tabIndex={0}>Focusable Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveAttribute('tabIndex', '0');
    });

    it("can be focused when interactive", () => {
      const { getByText } = render(() => (
        <ul>
          <ListItem tabIndex={0}>Focusable Item</ListItem>
        </ul>
      ));
      
      const item = getByText("Focusable Item");
      item.focus();
      expect(document.activeElement).toBe(item);
    });
  });

  // Styling and Customization
  describe("Styling and Customization", () => {
    it("supports custom class prop", () => {
      const { container } = render(() => (
        <ul>
          <ListItem class="custom-item">Styled Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveClass('custom-item');
    });

    it("supports classList prop", () => {
      const { container } = render(() => (
        <ul>
          <ListItem classList={{ "active": true, "inactive": false }}>
            Dynamic Item
          </ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveClass('active');
      expect(listItem).not.toHaveClass('inactive');
    });

    it("combines class and classList props", () => {
      const { container } = render(() => (
        <ul>
          <ListItem 
            class="static-class" 
            classList={{ "dynamic-class": true }}
          >
            Combined Classes
          </ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveClass('static-class', 'dynamic-class');
    });

    it("supports style attribute", () => {
      const { container } = render(() => (
        <ul>
          <ListItem style="color: red;">Styled Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveAttribute('style', 'color: red;');
    });

    it("supports id attribute", () => {
      const { container } = render(() => (
        <ul>
          <ListItem id="unique-item">Identified Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveAttribute('id', 'unique-item');
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(() => (
        <ul>
          <ListItem></ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toBeEmptyDOMElement();
    });

    it("handles null children gracefully", () => {
      const { container } = render(() => (
        <ul>
          <ListItem>{null}</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(() => (
        <ul>
          <ListItem>{undefined}</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });

    it("works without any props", () => {
      const { container, getByText } = render(() => (
        <ul>
          <ListItem>Basic Item</ListItem>
        </ul>
      ));
      
      expect(getByText("Basic Item")).toBeInTheDocument();
      const listItem = container.querySelector('li');
      expect(listItem?.tagName).toBe('LI');
    });
  });

  // Performance and State Management
  describe("Performance and State Management", () => {
    it("re-renders efficiently when props change", () => {
      const [active, setActive] = createSignal(false);
      
      const { container } = render(() => (
        <ul>
          <ListItem classList={{ active: active() }}>
            Dynamic Item
          </ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).not.toHaveClass('active');
      
      setActive(true);
      expect(listItem).toHaveClass('active');
    });

    it("maintains consistent DOM structure", () => {
      const { container } = render(() => (
        <ul>
          <ListItem>Consistent Item</ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem?.tagName).toBe('LI');
      expect(listItem).toBeInTheDocument();
    });
  });

  // TypeScript Interface Validation
  describe("TypeScript Interface", () => {
    it("accepts all expected props without TypeScript errors", () => {
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      
      const { container } = render(() => (
        <ul>
          <ListItem
            class="test-class"
            classList={{ active: true }}
            id="test-id"
            style="margin: 4px;"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Test item"
            role="button"
          >
            Complete Props Test
          </ListItem>
        </ul>
      ));
      
      const listItem = container.querySelector('li');
      expect(listItem).toHaveClass('test-class', 'active');
      expect(listItem).toHaveAttribute('id', 'test-id');
      expect(listItem).toHaveAttribute('aria-label', 'Test item');
      expect(listItem).toHaveAttribute('role', 'button');
    });
  });
});
