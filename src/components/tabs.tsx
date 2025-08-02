import { JSX, createSignal, For } from "solid-js";

/**
 * Props for individual tab items.
 *
 * @property {string} label - The label text displayed in the tab.
 * @property {JSX.Element} [content] - The content to display in the tab panel.
 * @property {boolean} [disabled] - Whether the tab is disabled.
 * @property {string} [class] - Additional CSS classes to apply to the tab.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TabItem {
  label: string;
  content?: JSX.Element;
  disabled?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Props for the Tabs component.
 *
 * @property {TabItem[]} [tabs] - Array of tab items to display.
 * @property {JSX.Element} [children] - Tab components to display (compound component pattern).
 * @property {"bordered" | "lifted" | "boxed"} [variant] - The DaisyUI variant style for the tabs.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the tabs using DaisyUI size classes.
 * @property {number} [activeTab] - The index of the currently active tab (controlled mode).
 * @property {number} [defaultActiveTab] - The initial active tab index (uncontrolled mode).
 * @property {(index: number) => void} [onTabChange] - Callback fired when the active tab changes.
 * @property {boolean} [showContent] - Whether to render tab content panels.
 * @property {string} [class] - Additional CSS classes to apply to the tabs container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TabsProps {
  tabs?: TabItem[];
  children?: JSX.Element;
  variant?: "bordered" | "lifted" | "boxed";
  size?: "xs" | "sm" | "md" | "lg";
  activeTab?: number;
  defaultActiveTab?: number;
  onTabChange?: (index: number) => void;
  showContent?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Props for the Tab component when used as children.
 *
 * @property {string} label - The label text displayed in the tab.
 * @property {JSX.Element} children - The content to display in the tab panel.
 * @property {boolean} [disabled] - Whether the tab is disabled.
 * @property {string} [class] - Additional CSS classes to apply to the tab.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TabProps {
  label: string;
  children: JSX.Element;
  disabled?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Tab component for individual tab items within a Tabs container.
 * Should be used as children of the Tabs component.
 * 
 * This is mainly for the compound component pattern but the tab rendering
 * is handled by the parent Tabs component.
 *
 * @param {TabProps} props - The properties to configure the Tab component.
 * @returns {JSX.Element} The rendered Tab component.
 */
function Tab(props: TabProps): JSX.Element {
  // This component is used for the compound pattern but doesn't render directly
  // The actual rendering is handled by the Tabs component
  return <div data-tab-label={props.label} data-tab-disabled={props.disabled} style={{ display: "none" }}>
    {props.children}
  </div>;
}

/**
 * Tabs component for creating tabbed interfaces with keyboard navigation and accessibility support.
 * Follows DaisyUI Tab component patterns with support for variants, sizes, and proper ARIA attributes.
 * 
 * Supports both controlled and uncontrolled modes:
 * - Controlled: Use `activeTab` and `onTabChange` props
 * - Uncontrolled: Use `defaultActiveTab` prop or rely on default (first tab)
 * 
 * Features:
 * - Full keyboard navigation (Arrow keys, Home, End, Enter, Space)
 * - WCAG 2.1 AA accessibility compliance
 * - DaisyUI variant styles (bordered, lifted, boxed)
 * - Size variants (xs, sm, md, lg)
 * - Optional tab content panels
 * - Disabled tab support
 * - Two API modes: tabs prop (array of objects) or children (compound components)
 *
 * @param {TabsProps} props - The properties to configure the Tabs component.
 * @returns {JSX.Element} The rendered Tabs component.
 */
export default function Tabs(props: TabsProps): JSX.Element {
  const [internalActiveTab, setInternalActiveTab] = createSignal(props.defaultActiveTab ?? 0);
  const [tabsId] = createSignal(`tabs-${Math.random().toString(36).slice(2)}`);
  let tabsRef: HTMLDivElement | undefined;

  // Extract tab data from either props.tabs or children
  const getTabsData = (): TabItem[] => {
    if (props.tabs) {
      return props.tabs;
    }

    // Extract from children (compound component pattern)
    if (props.children) {
      const childrenArray = Array.isArray(props.children) ? props.children : [props.children];
      const validTabs: TabItem[] = [];
      
      childrenArray.forEach((child: any) => {
        if (child && typeof child === 'object' && child.type === Tab) {
          validTabs.push({
            label: child.props.label,
            content: child.props.children,
            disabled: child.props.disabled,
            class: child.props.class,
            classList: child.props.classList,
          });
        }
      });
      
      return validTabs;
    }

    return [];
  };

  const tabsData = getTabsData();

  // Determine active tab (controlled vs uncontrolled)
  const activeTab = () => {
    if (props.activeTab !== undefined) return props.activeTab;
    const currentActive = internalActiveTab();
    // Ensure active tab is within bounds and not disabled
    if (currentActive >= 0 && currentActive < tabsData.length && !tabsData[currentActive]?.disabled) {
      return currentActive;
    }
    // Find first non-disabled tab
    const firstEnabledTab = tabsData.findIndex(tab => !tab.disabled);
    return Math.max(0, firstEnabledTab);
  };

  const setActiveTab = (index: number) => {
    if (index < 0 || index >= tabsData.length || tabsData[index]?.disabled) {
      return;
    }

    setInternalActiveTab(index);
    props.onTabChange?.(index);
  };

  // Generate unique IDs for accessibility
  const generateTabId = (index: number) => `tab-${tabsId()}-${index}`;
  const generatePanelId = (index: number) => `tabpanel-${tabsId()}-${index}`;

  // Build container classes following DaisyUI patterns
  const containerClasses = () => {
    const baseClasses: Record<string, boolean> = {
      tabs: true,
    };

    // Add variant classes
    if (props.variant) {
      baseClasses[`tabs-${props.variant}`] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Build tab classes following DaisyUI patterns
  const getTabClasses = (index: number, tabData: TabItem) => {
    const baseClasses: Record<string, boolean> = {
      tab: true,
      "tab-active": activeTab() === index,
      "tab-disabled": !!tabData.disabled,
    };

    // Add size classes
    if (props.size) {
      baseClasses[`tab-${props.size}`] = true;
    }

    // Add custom class if provided
    if (tabData.class) {
      baseClasses[tabData.class] = true;
    }

    return baseClasses;
  };

  // Handle tab click
  const handleTabClick = (index: number) => {
    if (!tabsData[index]?.disabled) {
      setActiveTab(index);
    }
  };

  // Handle tab key events
  const handleTabKeyDown = (event: KeyboardEvent, index: number) => {
    if (tabsData[index]?.disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveTab(index);
    }
  };

  // Handle keyboard navigation on the tablist
  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.getAttribute("role") !== "tab") return;

    const enabledTabs = tabsData.map((tab, index) => ({ index, disabled: tab.disabled }))
                              .filter(tab => !tab.disabled);
    
    if (enabledTabs.length === 0) return;

    const currentTabIndex = parseInt(target.getAttribute("data-tab-index") || "0");
    const currentEnabledIndex = enabledTabs.findIndex(tab => tab.index === currentTabIndex);
    let newEnabledIndex = currentEnabledIndex;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        newEnabledIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        break;
      case "ArrowLeft":
        event.preventDefault();
        newEnabledIndex = currentEnabledIndex === 0 ? enabledTabs.length - 1 : currentEnabledIndex - 1;
        break;
      case "Home":
        event.preventDefault();
        newEnabledIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newEnabledIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    const newTabIndex = enabledTabs[newEnabledIndex].index;
    const newTabElement = tabsRef?.querySelector(`[data-tab-index="${newTabIndex}"]`) as HTMLElement;
    newTabElement?.focus();
  };

  return (
    <div>
      <div
        ref={tabsRef}
        role="tablist"
        classList={{
          ...containerClasses(),
          ...props.classList,
        }}
        onKeyDown={handleKeyDown}
      >
        <For each={tabsData}>
          {(tabData, index) => (
            <button
              id={generateTabId(index())}
              role="tab"
              aria-selected={activeTab() === index()}
              aria-controls={generatePanelId(index())}
              aria-disabled={tabData.disabled}
              tabindex={activeTab() === index() && !tabData.disabled ? 0 : -1}
              data-tab-index={index()}
              classList={{
                ...getTabClasses(index(), tabData),
                ...tabData.classList,
              }}
              onClick={() => handleTabClick(index())}
              onKeyDown={(e) => handleTabKeyDown(e, index())}
            >
              {tabData.label}
            </button>
          )}
        </For>
      </div>
      
      {props.showContent && tabsData.length > 0 && (
        <div class="tab-content">
          <For each={tabsData}>
            {(tabData, index) => (
              <div
                id={generatePanelId(index())}
                role="tabpanel"
                aria-labelledby={generateTabId(index())}
                aria-hidden={activeTab() !== index()}
                style={{ 
                  visibility: activeTab() === index() ? "visible" : "hidden",
                  height: activeTab() === index() ? "auto" : "0",
                  overflow: "hidden"
                }}
              >
                {tabData.content}
              </div>
            )}
          </For>
        </div>
      )}
    </div>
  );
}

// Export Tab as a property of Tabs for compound component pattern
Tabs.Tab = Tab;
