import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import Tabs from "@/components/tabs";

describe("Tabs Component", () => {
  // Test data
  const basicTabs = [
    { label: "Tab 1", content: <div>Content 1</div> },
    { label: "Tab 2", content: <div>Content 2</div> },
  ];

  const tabsWithDisabled = [
    { label: "Tab 1", content: <div>Content 1</div> },
    { label: "Tab 2", content: <div>Content 2</div>, disabled: true },
    { label: "Tab 3", content: <div>Content 3</div> },
  ];

  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with required props", () => {
      const { container } = render(() => <Tabs tabs={basicTabs} />);
      expect(container.firstChild?.firstChild).toHaveClass("tabs");
    });

    it("renders tab navigation items", () => {
      const { getByRole, getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tablist = getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      
      const tabs = getAllByRole("tab");
      expect(tabs).toHaveLength(2);
      expect(tabs[0]).toHaveTextContent("Tab 1");
      expect(tabs[1]).toHaveTextContent("Tab 2");
    });

    it("renders with base classes and proper ARIA roles", () => {
      const { getByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tablist = getByRole("tablist");
      expect(tablist).toHaveClass("tabs");
    });

    it("shows first tab as active by default", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
      expect(tabs[0]).toHaveClass("tab-active");
      expect(tabs[1]).toHaveAttribute("aria-selected", "false");
      expect(tabs[1]).not.toHaveClass("tab-active");
    });
  });

  // DaisyUI Variant Tests
  describe("DaisyUI Variants", () => {
    it("applies tab-bordered variant class", () => {
      const { getByRole } = render(() => <Tabs tabs={basicTabs} variant="bordered" />);
      const tablist = getByRole("tablist");
      expect(tablist).toHaveClass("tabs", "tabs-bordered");
    });

    it("applies tab-lifted variant class", () => {
      const { getByRole } = render(() => <Tabs tabs={basicTabs} variant="lifted" />);
      const tablist = getByRole("tablist");
      expect(tablist).toHaveClass("tabs", "tabs-lifted");
    });

    it("applies tab-boxed variant class", () => {
      const { getByRole } = render(() => <Tabs tabs={basicTabs} variant="boxed" />);
      const tablist = getByRole("tablist");
      expect(tablist).toHaveClass("tabs", "tabs-boxed");
    });
  });

  // DaisyUI Size Tests
  describe("DaisyUI Sizes", () => {
    it("applies tab-xs size class", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} size="xs" />);
      const tab = getAllByRole("tab")[0];
      expect(tab).toHaveClass("tab", "tab-xs");
    });

    it("applies tab-sm size class", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} size="sm" />);
      const tab = getAllByRole("tab")[0];
      expect(tab).toHaveClass("tab", "tab-sm");
    });

    it("applies tab-md size class", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} size="md" />);
      const tab = getAllByRole("tab")[0];
      expect(tab).toHaveClass("tab", "tab-md");
    });

    it("applies tab-lg size class", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} size="lg" />);
      const tab = getAllByRole("tab")[0];
      expect(tab).toHaveClass("tab", "tab-lg");
    });
  });

  // User Interactions Tests
  describe("User Interactions", () => {
    it("switches active tab on click", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      
      // Initially first tab is active
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
      expect(tabs[1]).toHaveAttribute("aria-selected", "false");
      
      // Click second tab
      fireEvent.click(tabs[1]);
      
      // Second tab should now be active
      expect(tabs[0]).toHaveAttribute("aria-selected", "false");
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });

    it("calls onTabChange callback when tab changes", () => {
      const onTabChange = vi.fn();
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} onTabChange={onTabChange} />);
      
      const tabs = getAllByRole("tab");
      fireEvent.click(tabs[1]);
      
      expect(onTabChange).toHaveBeenCalledWith(1);
    });

    it("supports controlled mode with activeTab prop", () => {
      const [activeTab, setActiveTab] = createSignal(1);
      const { getAllByRole } = render(() => 
        <Tabs tabs={basicTabs} activeTab={activeTab()} onTabChange={setActiveTab} />
      );
      
      const tabs = getAllByRole("tab");
      
      // Second tab should be active due to activeTab prop
      expect(tabs[0]).toHaveAttribute("aria-selected", "false");
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });
  });

  // Keyboard Navigation Tests
  describe("Keyboard Navigation", () => {
    it("navigates to next tab with ArrowRight", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      tabs[0].focus();
      
      fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
      expect(tabs[1]).toHaveFocus();
    });

    it("navigates to previous tab with ArrowLeft", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      tabs[1].focus();
      
      fireEvent.keyDown(tabs[1], { key: "ArrowLeft" });
      expect(tabs[0]).toHaveFocus();
    });

    it("navigates to first tab with Home key", () => {
      const threeTabs = [
        { label: "Tab 1", content: <div>Content 1</div> },
        { label: "Tab 2", content: <div>Content 2</div> },
        { label: "Tab 3", content: <div>Content 3</div> },
      ];
      const { getAllByRole } = render(() => <Tabs tabs={threeTabs} />);
      
      const tabs = getAllByRole("tab");
      tabs[2].focus();
      
      fireEvent.keyDown(tabs[2], { key: "Home" });
      expect(tabs[0]).toHaveFocus();
    });

    it("navigates to last tab with End key", () => {
      const threeTabs = [
        { label: "Tab 1", content: <div>Content 1</div> },
        { label: "Tab 2", content: <div>Content 2</div> },
        { label: "Tab 3", content: <div>Content 3</div> },
      ];
      const { getAllByRole } = render(() => <Tabs tabs={threeTabs} />);
      
      const tabs = getAllByRole("tab");
      tabs[0].focus();
      
      fireEvent.keyDown(tabs[0], { key: "End" });
      expect(tabs[2]).toHaveFocus();
    });

    it("activates tab with Enter key", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      tabs[1].focus();
      
      fireEvent.keyDown(tabs[1], { key: "Enter" });
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });

    it("activates tab with Space key", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      tabs[1].focus();
      
      fireEvent.keyDown(tabs[1], { key: " " });
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });

    it("wraps keyboard navigation at boundaries", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      
      // Navigate right from last tab should wrap to first
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: "ArrowRight" });
      expect(tabs[0]).toHaveFocus();
      
      // Navigate left from first tab should wrap to last
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: "ArrowLeft" });
      expect(tabs[1]).toHaveFocus();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { getByRole, getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tablist = getByRole("tablist");
      const tabs = getAllByRole("tab");
      
      expect(tablist).toHaveAttribute("role", "tablist");
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute("role", "tab");
        expect(tab).toHaveAttribute("tabindex", index === 0 ? "0" : "-1");
        expect(tab).toHaveAttribute("aria-selected", index === 0 ? "true" : "false");
      });
    });

    it("has proper tab IDs and controls relationships", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} />);
      
      const tabs = getAllByRole("tab");
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute("id");
        expect(tab).toHaveAttribute("aria-controls");
        const id = tab.getAttribute("id");
        const controls = tab.getAttribute("aria-controls");
        expect(id).toMatch(/^tab-[\w-]+-\d+$/);
        expect(controls).toMatch(/^tabpanel-[\w-]+-\d+$/);
      });
    });

    it("supports disabled tabs", () => {
      const { getAllByRole } = render(() => <Tabs tabs={tabsWithDisabled} />);
      
      const tabs = getAllByRole("tab");
      expect(tabs[1]).toHaveAttribute("aria-disabled", "true");
      expect(tabs[1]).toHaveClass("tab-disabled");
      expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    });

    it("skips disabled tabs in keyboard navigation", () => {
      const { getAllByRole } = render(() => <Tabs tabs={tabsWithDisabled} />);
      
      const tabs = getAllByRole("tab");
      tabs[0].focus();
      
      // Should skip disabled tab when navigating right
      fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
      expect(tabs[2]).toHaveFocus();
    });
  });

  // Custom Classes Tests
  describe("Custom Classes", () => {
    it("applies custom class prop", () => {
      const { getByRole } = render(() => <Tabs tabs={basicTabs} class="custom-class" />);
      const tablist = getByRole("tablist");
      expect(tablist).toHaveClass("tabs", "custom-class");
    });

    it("applies custom classList prop", () => {
      const { getByRole } = render(() => 
        <Tabs tabs={basicTabs} classList={{ "custom-dynamic": true, "other-class": false }} />
      );
      const tablist = getByRole("tablist");
      expect(tablist).toHaveClass("tabs", "custom-dynamic");
      expect(tablist).not.toHaveClass("other-class");
    });
  });

  // Tab Content Panel Tests
  describe("Tab Content Panels", () => {
    it("renders tab content panels with proper ARIA attributes", () => {
      const { container } = render(() => <Tabs tabs={basicTabs} showContent />);
      
      const tabpanels = container.querySelectorAll('[role="tabpanel"]');
      expect(tabpanels).toHaveLength(2);
      
      tabpanels.forEach((panel, index) => {
        expect(panel).toHaveAttribute("role", "tabpanel");
        expect(panel).toHaveAttribute("id");
        expect(panel).toHaveAttribute("aria-labelledby");
        const id = panel.getAttribute("id");
        const labelledby = panel.getAttribute("aria-labelledby");
        expect(id).toMatch(/^tabpanel-[\w-]+-\d+$/);
        expect(labelledby).toMatch(/^tab-[\w-]+-\d+$/);
      });
    });

    it("shows only active tab content", () => {
      const { getByText, getAllByRole } = render(() => <Tabs tabs={basicTabs} showContent />);
      
      // Initially first tab content is visible
      expect(getByText("Content 1")).toBeVisible();
      expect(getByText("Content 2")).not.toBeVisible();
      
      // Click second tab
      const tabs = getAllByRole("tab");
      fireEvent.click(tabs[1]);
      
      // Second tab content should now be visible
      expect(getByText("Content 1")).not.toBeVisible();
      expect(getByText("Content 2")).toBeVisible();
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("handles no tabs gracefully", () => {
      const { container } = render(() => <Tabs tabs={[]} />);
      expect(container.firstChild?.firstChild).toHaveClass("tabs");
    });

    it("handles single tab", () => {
      const singleTab = [{ label: "Tab 1", content: <div>Content 1</div> }];
      const { getAllByRole } = render(() => <Tabs tabs={singleTab} />);
      
      const tabs = getAllByRole("tab");
      expect(tabs).toHaveLength(1);
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    });

    it("doesn't activate disabled tabs on click", () => {
      const { getAllByRole } = render(() => <Tabs tabs={tabsWithDisabled} />);
      
      const tabs = getAllByRole("tab");
      fireEvent.click(tabs[1]);
      
      // First tab should still be active
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
      expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    });

    it("maintains default active tab when no activeTab prop provided", () => {
      const { getAllByRole } = render(() => <Tabs tabs={basicTabs} defaultActiveTab={1} />);
      
      const tabs = getAllByRole("tab");
      expect(tabs[0]).toHaveAttribute("aria-selected", "false");
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });
  });
});
