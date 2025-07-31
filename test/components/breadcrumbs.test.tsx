import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Breadcrumbs from "@/components/breadcrumbs";

describe("Breadcrumbs Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with breadcrumbs navigation", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" }
      ];
      
      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      expect(getByRole("navigation")).toBeInTheDocument();
    });

    it("renders with base breadcrumbs class", () => {
      const items = [{ label: "Home", href: "/" }];
      const { container } = render(() => <Breadcrumbs items={items} />);
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass("breadcrumbs");
    });

    it("renders breadcrumb items as list", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" }
      ];
      
      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      expect(getByRole("list")).toBeInTheDocument();
    });

    it("renders correct number of breadcrumb items", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current" }
      ];
      
      const { getAllByRole } = render(() => <Breadcrumbs items={items} />);
      const listItems = getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });
  });

  // DaisyUI Classes Tests
  describe("DaisyUI Classes", () => {
    it("applies breadcrumbs class to navigation element", () => {
      const items = [{ label: "Home" }];
      const { container } = render(() => <Breadcrumbs items={items} />);
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass("breadcrumbs");
    });

    it("applies custom class when provided", () => {
      const items = [{ label: "Home" }];
      const { container } = render(() => (
        <Breadcrumbs items={items} class="custom-breadcrumbs" />
      ));
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass("breadcrumbs", "custom-breadcrumbs");
    });

    it("applies classList when provided", () => {
      const items = [{ label: "Home" }];
      const { container } = render(() => (
        <Breadcrumbs 
          items={items} 
          classList={{ "active": true, "inactive": false }} 
        />
      ));
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass("breadcrumbs", "active");
      expect(nav).not.toHaveClass("inactive");
    });
  });

  // Breadcrumb Items Tests
  describe("Breadcrumb Items", () => {
    it("renders link items with href", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" }
      ];
      
      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      const homeLink = getByRole("link", { name: "Home" });
      const productsLink = getByRole("link", { name: "Products" });
      
      expect(homeLink).toHaveAttribute("href", "/");
      expect(productsLink).toHaveAttribute("href", "/products");
    });

    it("renders non-link items without href", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Current Page" }
      ];
      
      const { getByText, queryByRole, getByRole } = render(() => <Breadcrumbs items={items} />);
      
      expect(getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(getByText("Current Page")).toBeInTheDocument();
      expect(queryByRole("link", { name: "Current Page" })).not.toBeInTheDocument();
    });

    it("calls onClick handler when item is clicked", () => {
      const handleClick = vi.fn();
      const items = [
        { label: "Home", onClick: handleClick }
      ];
      
      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      const button = getByRole("button", { name: "Home" });
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders item with custom element", () => {
      const CustomElement = () => <span data-testid="custom">Custom Element</span>;
      const items = [
        { element: <CustomElement /> }
      ];
      
      const { getByTestId } = render(() => <Breadcrumbs items={items} />);
      expect(getByTestId("custom")).toBeInTheDocument();
    });
  });

  // Separators Tests
  describe("Separators", () => {
    it("renders default separators between items", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current" }
      ];
      
      const { container } = render(() => <Breadcrumbs items={items} />);
      
      // Should have 2 separators for 3 items
      const separators = container.querySelectorAll('li:not(:last-child)');
      expect(separators).toHaveLength(2);
    });

    it("renders custom separator when provided", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products" }
      ];
      
      const { getByText } = render(() => (
        <Breadcrumbs items={items} separator="|" />
      ));
      
      expect(getByText("|")).toBeInTheDocument();
    });

    it("renders custom separator element", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products" }
      ];
      
      const CustomSeparator = () => <span data-testid="custom-sep">→</span>;
      
      const { getByTestId } = render(() => (
        <Breadcrumbs items={items} separator={<CustomSeparator />} />
      ));
      
      expect(getByTestId("custom-sep")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper navigation role", () => {
      const items = [{ label: "Home" }];
      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      expect(getByRole("navigation")).toBeInTheDocument();
    });

    it("has aria-label for navigation", () => {
      const items = [{ label: "Home" }];
      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      
      const nav = getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
    });

    it("applies custom aria-label when provided", () => {
      const items = [{ label: "Home" }];
      const { getByRole } = render(() => (
        <Breadcrumbs items={items} ariaLabel="Custom Navigation" />
      ));
      
      const nav = getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Custom Navigation");
    });

    it("marks current page with aria-current", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Current Page", current: true }
      ];
      
      const { getByText } = render(() => <Breadcrumbs items={items} />);
      const currentItem = getByText("Current Page");
      
      expect(currentItem).toHaveAttribute("aria-current", "page");
    });

    it("supports keyboard navigation for clickable items", () => {
      const handleClick = vi.fn();
      const items = [
        { label: "Home", onClick: handleClick }
      ];
      
      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      const button = getByRole("button");
      
      // Test Enter key
      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test Space key
      fireEvent.keyDown(button, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  // Children Support Tests
  describe("Children Support", () => {
    it("renders children when no items provided", () => {
      const { getByText } = render(() => (
        <Breadcrumbs>
          <li><a href="/">Home</a></li>
          <li>Current</li>
        </Breadcrumbs>
      ));
      
      expect(getByText("Home")).toBeInTheDocument();
      expect(getByText("Current")).toBeInTheDocument();
    });

    it("prioritizes items prop over children", () => {
      const items = [{ label: "Items Home" }];
      
      const { getByText, queryByText } = render(() => (
        <Breadcrumbs items={items}>
          <li>Children Home</li>
        </Breadcrumbs>
      ));
      
      expect(getByText("Items Home")).toBeInTheDocument();
      expect(queryByText("Children Home")).not.toBeInTheDocument();
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("renders empty list when no items or children", () => {
      const { getByRole } = render(() => <Breadcrumbs />);
      const list = getByRole("list");
      expect(list).toBeEmptyDOMElement();
    });

    it("handles single item without separator", () => {
      const items = [{ label: "Single Item" }];
      const { getByText, container } = render(() => <Breadcrumbs items={items} />);
      
      expect(getByText("Single Item")).toBeInTheDocument();
      
      // Should not have any separators
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(1);
    });

    it("handles items with missing labels gracefully", () => {
      const items = [
        { label: "Home", href: "/" },
        { href: "/no-label" }, // Missing label
        { label: "End" }
      ];
      
      const { container } = render(() => <Breadcrumbs items={items} />);
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(3);
    });

    it("handles empty items array", () => {
      const { getByRole } = render(() => <Breadcrumbs items={[]} />);
      const list = getByRole("list");
      expect(list).toBeEmptyDOMElement();
    });
  });

  // Props Validation Tests
  describe("Props Validation", () => {
    it("accepts all valid props without errors", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Current", current: true }
      ];
      
      expect(() => {
        render(() => (
          <Breadcrumbs
            items={items}
            separator=" > "
            class="custom-class"
            classList={{ active: true }}
            ariaLabel="Custom Navigation"
          />
        ));
      }).not.toThrow();
    });
  });
});
