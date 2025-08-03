import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Layout from "@/components/layout";

// Mock icons for testing
const HomeIcon = () => (
  <svg data-testid="home-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12L5 10L12 3L19 10L21 12M5 12V20C5 20.6 5.4 21 6 21H18C18.6 21 19 20.6 19 20V12"/>
  </svg>
);

const SettingsIcon = () => (
  <svg data-testid="settings-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5Z"/>
  </svg>
);

describe("Layout Component", () => {
  // Phase 1: Foundation Tests
  describe("Basic Rendering and Foundation", () => {
    it("renders with children", () => {
      const { getByText } = render(() => (
        <Layout>
          <div>Test Layout Content</div>
        </Layout>
      ));
      expect(getByText("Test Layout Content")).toBeInTheDocument();
    });

    it("renders with default variant (left)", () => {
      const { container } = render(() => (
        <Layout>
          <div>Content</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("drawer", "drawer-mobile", "min-h-screen");
    });

    it("applies correct classes for left variant", () => {
      const { container } = render(() => (
        <Layout variant="left">
          <div>Left Layout</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("drawer", "drawer-mobile", "min-h-screen");
    });

    it("applies correct classes for right variant", () => {
      const { container } = render(() => (
        <Layout variant="right">
          <div>Right Layout</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("drawer", "drawer-end", "min-h-screen");
    });

    it("applies correct classes for top variant", () => {
      const { container } = render(() => (
        <Layout variant="top">
          <div>Top Layout</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("navbar-container", "min-h-screen");
    });

    it("applies correct classes for bottom variant", () => {
      const { container } = render(() => (
        <Layout variant="bottom">
          <div>Bottom Layout</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("navbar-container", "min-h-screen");
    });

    it("applies responsive classes when responsive prop is true", () => {
      const { container } = render(() => (
        <Layout responsive>
          <div>Responsive Layout</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("drawer-mobile");
    });

    it("merges additional class prop", () => {
      const { container } = render(() => (
        <Layout class="custom-layout">
          <div>Custom Layout</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("drawer", "custom-layout");
    });

    it("merges classList prop", () => {
      const { container } = render(() => (
        <Layout classList={{ "dynamic-class": true, "inactive-class": false }}>
          <div>Dynamic Layout</div>
        </Layout>
      ));
      expect(container.firstChild).toHaveClass("drawer", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("inactive-class");
    });
  });

  // Phase 2: Sub-Components Basic Tests
  describe("Sub-Components Basic Rendering", () => {
    it("renders Layout.Nav component", () => {
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <div>Navigation Content</div>
          </Layout.Nav>
        </Layout>
      ));
      expect(getByText("Navigation Content")).toBeInTheDocument();
    });

    it("renders Layout.NavHeader component", () => {
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavHeader>
              <div>Brand Logo</div>
            </Layout.NavHeader>
          </Layout.Nav>
        </Layout>
      ));
      expect(getByText("Brand Logo")).toBeInTheDocument();
    });

    it("renders Layout.NavItem component with text", () => {
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavItem href="/">Home</Layout.NavItem>
          </Layout.Nav>
        </Layout>
      ));
      expect(getByText("Home")).toBeInTheDocument();
    });

    it("renders Layout.NavItem component with icon", () => {
      const { getByTestId } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavItem href="/" icon={<HomeIcon />}>Home</Layout.NavItem>
          </Layout.Nav>
        </Layout>
      ));
      expect(getByTestId("home-icon")).toBeInTheDocument();
    });

    it("renders Layout.ToggleButton component", () => {
      const { getByLabelText } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavHeader>
              <Layout.ToggleButton />
            </Layout.NavHeader>
          </Layout.Nav>
        </Layout>
      ));
      expect(getByLabelText("Toggle navigation")).toBeInTheDocument();
    });

    it("renders Layout.Content component", () => {
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Content>
            <div>Main Content</div>
          </Layout.Content>
        </Layout>
      ));
      expect(getByText("Main Content")).toBeInTheDocument();
    });

    it("renders Layout.Header component", () => {
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Content>
            <Layout.Header>
              <div>Page Header</div>
            </Layout.Header>
          </Layout.Content>
        </Layout>
      ));
      expect(getByText("Page Header")).toBeInTheDocument();
    });

    it("renders Layout.Body component", () => {
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Content>
            <Layout.Body>
              <div>Page Body</div>
            </Layout.Body>
          </Layout.Content>
        </Layout>
      ));
      expect(getByText("Page Body")).toBeInTheDocument();
    });
  });

  // Phase 3: Integration and Composition Tests
  describe("Component Composition and Integration", () => {
    it("renders complete layout structure as specified in requirements", () => {
      const { getByText, getByTestId, getByLabelText } = render(() => (
        <Layout variant="left">
          <Layout.Nav collapsible>
            <Layout.NavHeader>
              <div>Logo</div>
              <Layout.ToggleButton />
            </Layout.NavHeader>

            <Layout.NavItem icon={<HomeIcon />} href="/">Home</Layout.NavItem>
            <Layout.NavItem icon={<SettingsIcon />} href="/settings">Settings</Layout.NavItem>
            <Layout.NavItem icon={<span data-testid="logout-icon">⚠</span>} onClick={() => console.log("logout")}>Logout</Layout.NavItem>
          </Layout.Nav>

          <Layout.Content>
            <Layout.Header>
              <div>Page Header</div>
            </Layout.Header>

            <Layout.Body>
              <div>Page Content</div>
            </Layout.Body>
          </Layout.Content>
        </Layout>
      ));

      // Check all components are rendered
      expect(getByText("Logo")).toBeInTheDocument();
      expect(getByLabelText("Toggle navigation")).toBeInTheDocument();
      expect(getByText("Home")).toBeInTheDocument();
      expect(getByText("Settings")).toBeInTheDocument();
      expect(getByText("Logout")).toBeInTheDocument();
      expect(getByTestId("home-icon")).toBeInTheDocument();
      expect(getByTestId("settings-icon")).toBeInTheDocument();
      expect(getByTestId("logout-icon")).toBeInTheDocument();
      expect(getByText("Page Header")).toBeInTheDocument();
      expect(getByText("Page Content")).toBeInTheDocument();
    });

    it("maintains context throughout component tree", () => {
      const { getByLabelText } = render(() => (
        <Layout variant="right">
          <Layout.Nav collapsible>
            <Layout.NavHeader>
              <Layout.ToggleButton />
            </Layout.NavHeader>
          </Layout.Nav>
        </Layout>
      ));

      const toggleButton = getByLabelText("Toggle navigation");
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });

    it("handles collapsible navigation state", () => {
      const { getByLabelText } = render(() => (
        <Layout variant="left">
          <Layout.Nav collapsible>
            <Layout.NavHeader>
              <Layout.ToggleButton />
            </Layout.NavHeader>
          </Layout.Nav>
        </Layout>
      ));

      const toggleButton = getByLabelText("Toggle navigation");
      
      // Initial state - expanded
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      
      // Click to collapse
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
      
      // Click to expand
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  // Phase 4: Advanced Features and Accessibility Tests
  describe("Advanced Features and Accessibility", () => {
    it("supports keyboard navigation on toggle button", () => {
      const { getByLabelText } = render(() => (
        <Layout variant="left">
          <Layout.Nav collapsible>
            <Layout.NavHeader>
              <Layout.ToggleButton />
            </Layout.NavHeader>
          </Layout.Nav>
        </Layout>
      ));

      const toggleButton = getByLabelText("Toggle navigation");
      
      // Should be focusable
      toggleButton.focus();
      expect(document.activeElement).toBe(toggleButton);
      
      // Should respond to Enter key
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      fireEvent.keyDown(toggleButton, { key: 'Enter' });
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
      
      // Should respond to Space key
      fireEvent.keyDown(toggleButton, { key: ' ' });
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });

    it("provides proper ARIA attributes for navigation", () => {
      const { getByLabelText } = render(() => (
        <Layout variant="left">
          <Layout.Nav collapsible>
            <Layout.ToggleButton />
          </Layout.Nav>
        </Layout>
      ));

      const toggleButton = getByLabelText("Toggle navigation");
      expect(toggleButton).toHaveAttribute("aria-controls", "navigation");
      expect(toggleButton).toHaveAttribute("aria-expanded");
    });

    it("handles custom aria-label on toggle button", () => {
      const { getByLabelText } = render(() => (
        <Layout variant="left">
          <Layout.Nav collapsible>
            <Layout.ToggleButton aria-label="Open menu" />
          </Layout.Nav>
        </Layout>
      ));

      expect(getByLabelText("Open menu")).toBeInTheDocument();
    });

    it("calls onClick handler for nav items without href", () => {
      const onClickMock = vi.fn();
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavItem onClick={onClickMock}>Logout</Layout.NavItem>
          </Layout.Nav>
        </Layout>
      ));

      const logoutItem = getByText("Logout");
      fireEvent.click(logoutItem);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("applies active styling to nav items", () => {
      const { container } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavItem href="/" active>Home</Layout.NavItem>
          </Layout.Nav>
        </Layout>
      ));

      const navItem = container.querySelector('a');
      expect(navItem).toHaveClass("bg-primary", "text-primary-content");
    });

    it("adapts nav structure for top variant", () => {
      const { container } = render(() => (
        <Layout variant="top">
          <Layout.Nav>
            <Layout.NavItem href="/">Home</Layout.NavItem>
          </Layout.Nav>
        </Layout>
      ));

      expect(container.querySelector('.navbar')).toBeInTheDocument();
    });

    it("maintains semantic HTML structure", () => {
      const { container, getByRole } = render(() => (
        <Layout variant="left">
          <Layout.Content>
            <Layout.Header>Header</Layout.Header>
            <Layout.Body>Body</Layout.Body>
          </Layout.Content>
        </Layout>
      ));

      expect(getByRole("main")).toBeInTheDocument();
      expect(container.querySelector('header')).toBeInTheDocument();
    });
  });

  // Edge Cases and Error Conditions
  describe("Edge Cases and Error Handling", () => {
    it("handles null children gracefully", () => {
      const { container } = render(() => <Layout>{null}</Layout>);
      expect(container.firstChild).toHaveClass("drawer");
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(() => <Layout>{undefined}</Layout>);
      expect(container.firstChild).toHaveClass("drawer");
    });

    it("throws error when sub-components used outside Layout context", () => {
      expect(() => {
        render(() => <Layout.Nav>Isolated Nav</Layout.Nav>);
      }).toThrow("Layout sub-components must be used within a Layout component");
    });

    it("handles nav items without icons", () => {
      const { getByText } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavItem href="/">Home</Layout.NavItem>
          </Layout.Nav>
        </Layout>
      ));
      expect(getByText("Home")).toBeInTheDocument();
    });

    it("handles empty nav header", () => {
      const { container } = render(() => (
        <Layout variant="left">
          <Layout.Nav>
            <Layout.NavHeader />
          </Layout.Nav>
        </Layout>
      ));
      expect(container.querySelector('.flex.items-center')).toBeInTheDocument();
    });
  });

  // Performance and State Management
  describe("Performance and State Management", () => {
    it("manages collapsible state correctly across multiple toggle buttons", () => {
      const { getAllByLabelText } = render(() => (
        <Layout variant="left">
          <Layout.Nav collapsible>
            <Layout.NavHeader>
              <Layout.ToggleButton />
              <Layout.ToggleButton aria-label="Secondary toggle" />
            </Layout.NavHeader>
          </Layout.Nav>
        </Layout>
      ));

      const toggleButtons = getAllByLabelText(/toggle/i);
      expect(toggleButtons).toHaveLength(2);
      
      // Both should reflect the same state
      toggleButtons.forEach(button => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
      
      // Clicking one should update both
      fireEvent.click(toggleButtons[0]);
      toggleButtons.forEach(button => {
        expect(button).toHaveAttribute("aria-expanded", "false");
      });
    });
  });
});