import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { createSignal } from "solid-js";
import { Tabs, Tab, TabContent } from "@/components/tabs";

describe("Tabs Component", () => {
  // Phase 1: Foundation - Basic Structure Tests (RED)
  describe("Basic Rendering", () => {
    it("renders with base tabs class", () => {
      const { container } = render(() => (
        <Tabs>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      ));
      expect(container.firstChild).toHaveClass("tabs");
    });

    it("renders with proper role for accessibility", () => {
      const { getByRole } = render(() => (
        <Tabs>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </Tabs>
      ));
      expect(getByRole("tablist")).toBeInTheDocument();
    });

    it("renders children tabs correctly", () => {
      const { getByText } = render(() => (
        <Tabs>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </Tabs>
      ));
      expect(getByText("First Tab")).toBeInTheDocument();
      expect(getByText("Second Tab")).toBeInTheDocument();
    });

    it("sets first tab as active by default", () => {
      const { container } = render(() => (
        <Tabs>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </Tabs>
      ));
      const firstTab = container.querySelector('.tab');
      expect(firstTab).toHaveClass("tab-active");
    });
  });

  // DaisyUI Variants Tests (RED)
  describe("DaisyUI Variants", () => {
    it("applies tab-bordered class for bordered variant", () => {
      const { container } = render(() => (
        <Tabs variant="bordered">
          <Tab>Tab 1</Tab>
        </Tabs>
      ));
      expect(container.firstChild).toHaveClass("tabs", "tabs-bordered");
    });

    it("applies tab-lifted class for lifted variant", () => {
      const { container } = render(() => (
        <Tabs variant="lifted">
          <Tab>Tab 1</Tab>
        </Tabs>
      ));
      expect(container.firstChild).toHaveClass("tabs", "tabs-lifted");
    });

    it("applies tab-boxed class for boxed variant", () => {
      const { container } = render(() => (
        <Tabs variant="boxed">
          <Tab>Tab 1</Tab>
        </Tabs>
      ));
      expect(container.firstChild).toHaveClass("tabs", "tabs-boxed");
    });

    it("applies size modifiers correctly", () => {
      const { container } = render(() => (
        <Tabs size="lg">
          <Tab>Tab 1</Tab>
        </Tabs>
      ));
      expect(container.firstChild).toHaveClass("tabs", "tabs-lg");
    });
  });

  // Basic Interaction Tests (RED)
  describe("Basic Interactions", () => {
    it("calls onChange when tab is clicked", () => {
      const onChange = vi.fn();
      const { getByText } = render(() => (
        <Tabs onChange={onChange}>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </Tabs>
      ));
      
      fireEvent.click(getByText("Second Tab"));
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("updates active tab when clicked", () => {
      const { getByText, container } = render(() => (
        <Tabs>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </Tabs>
      ));
      
      fireEvent.click(getByText("Second Tab"));
      const tabs = container.querySelectorAll('.tab');
      expect(tabs[0]).not.toHaveClass("tab-active");
      expect(tabs[1]).toHaveClass("tab-active");
    });

    it("supports controlled mode with activeTab prop", () => {
      const { container } = render(() => (
        <Tabs activeTab={1}>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </Tabs>
      ));
      
      const tabs = container.querySelectorAll('.tab');
      expect(tabs[0]).not.toHaveClass("tab-active");
      expect(tabs[1]).toHaveClass("tab-active");
    });
  });

  // Accessibility Tests (RED)
  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { getByRole, getAllByRole } = render(() => (
        <Tabs>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </Tabs>
      ));
      
      const tablist = getByRole("tablist");
      const tabs = getAllByRole("tab");
      
      expect(tablist).toBeInTheDocument();
      expect(tabs).toHaveLength(2);
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
      expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    });

    it("supports keyboard navigation with arrow keys", () => {
      const { getAllByRole } = render(() => (
        <Tabs>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </Tabs>
      ));
      
      const tabs = getAllByRole("tab");
      tabs[0].focus();
      
      fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });

    it("supports Home and End key navigation", () => {
      const { getAllByRole } = render(() => (
        <Tabs>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
          <Tab>Third Tab</Tab>
        </Tabs>
      ));
      
      const tabs = getAllByRole("tab");
      tabs[1].focus();
      
      fireEvent.keyDown(tabs[1], { key: "Home" });
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
      
      fireEvent.keyDown(tabs[0], { key: "End" });
      expect(tabs[2]).toHaveAttribute("aria-selected", "true");
    });
  });
});

// Phase 2: Sub-Components Tests (RED)
describe("Tab Component", () => {
  it("renders with base tab class", () => {
    const { container } = render(() => (
      <Tabs>
        <Tab>Test Tab</Tab>
      </Tabs>
    ));
    const tab = container.querySelector('.tab');
    expect(tab).toHaveClass("tab");
  });

  it("has proper role attribute", () => {
    const { getByRole } = render(() => (
      <Tabs>
        <Tab>Test Tab</Tab>
      </Tabs>
    ));
    expect(getByRole("tab")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    const { getByRole } = render(() => (
      <Tabs>
        <Tab disabled>Disabled Tab</Tab>
      </Tabs>
    ));
    const tab = getByRole("tab");
    expect(tab).toHaveClass("tab-disabled");
    expect(tab).toHaveAttribute("aria-disabled", "true");
  });

  it("supports custom icons", () => {
    const icon = <span data-testid="custom-icon">🏠</span>;
    const { getByTestId } = render(() => (
      <Tabs>
        <Tab icon={icon}>Home</Tab>
      </Tabs>
    ));
    expect(getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("throws error when used outside Tabs context", () => {
    // Capture console.error to avoid test noise
    const originalError = console.error;
    console.error = vi.fn();
    
    expect(() => {
      render(() => <Tab>Standalone Tab</Tab>);
    }).toThrow("Tab must be used within a Tabs component");
    
    console.error = originalError;
  });
});

describe("TabContent Component", () => {
  it("renders content when active", () => {
    const { getByText } = render(() => (
      <TabContent isActive={true}>
        <div>Content 1</div>
      </TabContent>
    ));
    expect(getByText("Content 1")).toBeInTheDocument();
  });

  it("hides content when not active", () => {
    const { queryByText } = render(() => (
      <TabContent isActive={false}>
        <div>Content 1</div>
      </TabContent>
    ));
    expect(queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("has proper ARIA attributes", () => {
    const { getByRole } = render(() => (
      <TabContent isActive={true} id="panel-1" labelledBy="tab-1">
        <div>Content</div>
      </TabContent>
    ));
    
    const tabpanel = getByRole("tabpanel");
    expect(tabpanel).toHaveAttribute("id", "panel-1");
    expect(tabpanel).toHaveAttribute("aria-labelledby", "tab-1");
  });

  it("supports lazy loading - doesn't render when not active and lazy", () => {
    const { queryByText, container } = render(() => (
      <TabContent isActive={false} lazy>
        <div>Lazy Content</div>
      </TabContent>
    ));
    
    // Should not render when not active and lazy
    expect(queryByText("Lazy Content")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it("supports lazy loading - renders when becomes active", () => {
    let isActive = false;
    const [getIsActive, setIsActive] = createSignal(isActive);
    
    const { queryByText } = render(() => (
      <TabContent isActive={getIsActive()} lazy>
        <div>Lazy Content</div>
      </TabContent>
    ));
    
    // Initially not rendered
    expect(queryByText("Lazy Content")).not.toBeInTheDocument();
    
    // Update to active - should render
    setIsActive(true);
    expect(queryByText("Lazy Content")).toBeInTheDocument();
  });
});
