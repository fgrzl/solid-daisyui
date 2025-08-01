import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import Breadcrumb from "@/components/breadcrumbs/breadcrumb";

describe("Breadcrumbs Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with breadcrumbs navigation", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      expect(getByRole("navigation")).toBeInTheDocument();
    });

    it("renders with base breadcrumbs class", () => {
      const items = [{ label: "Home", href: "/" }];
      const { container } = render(() => <Breadcrumbs items={items} />);

      const container_div = container.querySelector('div[role="navigation"]');
      expect(container_div).toHaveClass("breadcrumbs");
    });

    it("renders breadcrumb items as list", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
      ];

      const { container } = render(() => <Breadcrumbs items={items} />);
      const list = container.querySelector("ul");
      expect(list).toBeInTheDocument();
    });

    it("renders correct number of breadcrumb items", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current" },
      ];

      const { getAllByRole } = render(() => <Breadcrumbs items={items} />);
      const listItems = getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });
  });

  // New Composable API Tests
  describe("Composable API with Breadcrumb", () => {
    it("renders with Breadcrumb children", () => {
      const { getByRole, getByText } = render(() => (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/products">Products</Breadcrumb>
          <Breadcrumb current>Current Page</Breadcrumb>
        </Breadcrumbs>
      ));

      expect(getByRole("navigation")).toBeInTheDocument();
      expect(getByText("Home")).toBeInTheDocument();
      expect(getByText("Products")).toBeInTheDocument();
      expect(getByText("Current Page")).toBeInTheDocument();
    });

    it("renders proper list structure with Breadcrumb", () => {
      const { getAllByRole } = render(() => (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/products">Products</Breadcrumb>
          <Breadcrumb current>Current Page</Breadcrumb>
        </Breadcrumbs>
      ));

      const listItems = getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });

    it("supports mixed Breadcrumb types", () => {
      const handleClick = vi.fn();
      const { getByRole } = render(() => (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb onClick={handleClick}>Products</Breadcrumb>
          <Breadcrumb current>Current Page</Breadcrumb>
        </Breadcrumbs>
      ));

      expect(getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(getByRole("button", { name: "Products" })).toBeInTheDocument();
    });

    it("does not render separators with Breadcrumb children", () => {
      const { container } = render(() => (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/products">Products</Breadcrumb>
        </Breadcrumbs>
      ));

      // Should not have separators when using children
      const separators = container.querySelectorAll('span[aria-hidden="true"]');
      expect(separators).toHaveLength(0);
    });
  });

  // DaisyUI Classes Tests
  describe("DaisyUI Classes", () => {
    it("applies breadcrumbs class to container element", () => {
      const items = [{ label: "Home" }];
      const { container } = render(() => <Breadcrumbs items={items} />);

      const container_div = container.querySelector('div[role="navigation"]');
      expect(container_div).toHaveClass("breadcrumbs");
    });

    it("applies custom class when provided", () => {
      const items = [{ label: "Home" }];
      const { container } = render(() => (
        <Breadcrumbs items={items} class="custom-breadcrumbs" />
      ));

      const container_div = container.querySelector('div[role="navigation"]');
      expect(container_div).toHaveClass("breadcrumbs", "custom-breadcrumbs");
    });

    it("applies classList when provided", () => {
      const items = [{ label: "Home" }];
      const { container } = render(() => (
        <Breadcrumbs
          items={items}
          classList={{ active: true, inactive: false }}
        />
      ));

      const container_div = container.querySelector('div[role="navigation"]');
      expect(container_div).toHaveClass("breadcrumbs", "active");
      expect(container_div).not.toHaveClass("inactive");
    });
  });

  // Legacy Breadcrumb Items Tests (for backward compatibility)
  describe("Legacy Breadcrumb Items (items prop)", () => {
    it("renders link items with href", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
      ];

      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      const homeLink = getByRole("link", { name: "Home" });
      const productsLink = getByRole("link", { name: "Products" });

      expect(homeLink).toHaveAttribute("href", "/");
      expect(productsLink).toHaveAttribute("href", "/products");
    });

    it("renders non-link items without href", () => {
      const items = [{ label: "Home", href: "/" }, { label: "Current Page" }];

      const { getByText, queryByRole, getByRole } = render(() => (
        <Breadcrumbs items={items} />
      ));

      expect(getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(getByText("Current Page")).toBeInTheDocument();
      expect(
        queryByRole("link", { name: "Current Page" }),
      ).not.toBeInTheDocument();
    });

    it("calls onClick handler when item is clicked", () => {
      const handleClick = vi.fn();
      const items = [{ label: "Home", onClick: handleClick }];

      const { getByRole } = render(() => <Breadcrumbs items={items} />);
      const button = getByRole("button", { name: "Home" });

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders item with custom element", () => {
      const CustomElement = () => (
        <span data-testid="custom">Custom Element</span>
      );
      const items = [{ element: <CustomElement /> }];

      const { getByTestId } = render(() => <Breadcrumbs items={items} />);
      expect(getByTestId("custom")).toBeInTheDocument();
    });
  });

  // Legacy Separators Tests (items prop only)
  describe("Legacy Separators (items prop only)", () => {
    it("renders default separators between items", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current" },
      ];

      const { container } = render(() => <Breadcrumbs items={items} />);

      // Should have 2 separators for 3 items
      const separators = container.querySelectorAll("li:not(:last-child)");
      expect(separators).toHaveLength(2);
    });

    it("renders custom separator when provided", () => {
      const items = [{ label: "Home", href: "/" }, { label: "Products" }];

      const { getByText } = render(() => (
        <Breadcrumbs items={items} separator="|" />
      ));

      expect(getByText("|")).toBeInTheDocument();
    });

    it("renders custom separator element", () => {
      const items = [{ label: "Home", href: "/" }, { label: "Products" }];

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
        { label: "Current Page", current: true },
      ];

      const { getByText } = render(() => <Breadcrumbs items={items} />);
      const currentItem = getByText("Current Page");

      expect(currentItem).toHaveAttribute("aria-current", "page");
    });

    it("supports keyboard navigation for clickable items", () => {
      const handleClick = vi.fn();
      const items = [{ label: "Home", onClick: handleClick }];

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
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb>Current</Breadcrumb>
        </Breadcrumbs>
      ));

      expect(getByText("Home")).toBeInTheDocument();
      expect(getByText("Current")).toBeInTheDocument();
    });

    it("prioritizes items prop over children for backward compatibility", () => {
      const items = [{ label: "Items Home" }];

      const { getByText, queryByText } = render(() => (
        <Breadcrumbs items={items}>
          <Breadcrumb>Children Home</Breadcrumb>
        </Breadcrumbs>
      ));

      expect(getByText("Items Home")).toBeInTheDocument();
      expect(queryByText("Children Home")).not.toBeInTheDocument();
    });

    it("renders custom JSX children when no items", () => {
      const { getByText } = render(() => (
        <Breadcrumbs>
          <li>
            <a href="/">Custom Home</a>
          </li>
          <li>Custom Current</li>
        </Breadcrumbs>
      ));

      expect(getByText("Custom Home")).toBeInTheDocument();
      expect(getByText("Custom Current")).toBeInTheDocument();
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("renders empty list when no items or children", () => {
      const { container } = render(() => <Breadcrumbs />);
      const list = container.querySelector("ul");
      expect(list).toBeEmptyDOMElement();
    });

    it("handles single item without separator", () => {
      const items = [{ label: "Single Item" }];
      const { getByText, container } = render(() => (
        <Breadcrumbs items={items} />
      ));

      expect(getByText("Single Item")).toBeInTheDocument();

      // Should not have any separators
      const listItems = container.querySelectorAll("li");
      expect(listItems).toHaveLength(1);
    });

    it("handles items with missing labels gracefully", () => {
      const items = [
        { label: "Home", href: "/" },
        { href: "/no-label" }, // Missing label
        { label: "End" },
      ];

      const { container } = render(() => <Breadcrumbs items={items} />);
      const listItems = container.querySelectorAll("li");
      expect(listItems).toHaveLength(3);
    });

    it("handles empty items array", () => {
      const { container } = render(() => <Breadcrumbs items={[]} />);
      const list = container.querySelector("ul");
      expect(list).toBeEmptyDOMElement();
    });

    it("renders with mixed Breadcrumb and custom elements", () => {
      const { getByText, getByTestId } = render(() => (
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <li>
            <span data-testid="custom">Custom Element</span>
          </li>
          <Breadcrumb current>Current</Breadcrumb>
        </Breadcrumbs>
      ));

      expect(getByText("Home")).toBeInTheDocument();
      expect(getByTestId("custom")).toBeInTheDocument();
      expect(getByText("Current")).toBeInTheDocument();
    });
  });

  // Props Validation Tests
  describe("Props Validation", () => {
    it("accepts all valid props without errors", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Current", current: true },
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
