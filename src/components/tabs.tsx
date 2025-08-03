import { JSX, createSignal, For, children as solidChildren } from "solid-js";
import Link from "./link";

// Global registry for storing Tab onClick handlers
const tabClickHandlers = new Map<string, (event: MouseEvent | KeyboardEvent) => void>();

/**
 * Props for the Tabs component.
 *
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
 * @property {JSX.Element} [children] - The content to display in the tab panel.
 * @property {string} [href] - URL for navigation tabs. When provided, uses Link component for routing.
 * @property {string} [target] - Where to display the linked URL (e.g., '_blank' for new window).
 * @property {boolean} [disabled] - Whether the tab is disabled.
 * @property {string} [class] - Additional CSS classes to apply to the tab.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {(event: MouseEvent | KeyboardEvent) => void} [onClick] - Click event handler for non-navigation tabs.
 */
export interface TabProps {
  label: string;
  children?: JSX.Element;
  href?: string;
  target?: string;
  disabled?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

/**
 * Tab component for individual tab items within a Tabs container.
 * Used as children of the Tabs component in compound pattern.
 * 
 * This component renders as a hidden container that stores the tab data
 * for the parent Tabs component to extract and render properly.
 *
 * @param {TabProps} props - The properties to configure the Tab component.
 * @returns {JSX.Element} The rendered Tab component (hidden data container).
 */
function Tab(props: TabProps): JSX.Element {
  // Generate a unique ID for this tab to store the click handler
  const tabId = `tab-${Math.random().toString(36).slice(2)}`;
  
  // Store the onClick handler in the global registry if provided
  if (props.onClick) {
    tabClickHandlers.set(tabId, props.onClick);
  }
  
  // Store the content as a hidden container that the parent can access
  return (
    <div 
      style={{ display: "none" }}
      data-tab-label={props.label}
      data-tab-disabled={props.disabled}
      data-tab-href={props.href}
      data-tab-target={props.target}
      data-tab-class={props.class}
      data-tab-id={tabId}
      data-tab-onclick={props.onClick ? 'true' : undefined}
    >
      {props.children}
    </div>
  );
}

/**
 * Tabs component for creating tabbed interfaces with keyboard navigation and accessibility support.
 * Follows DaisyUI Tab component patterns with support for variants, sizes, and proper ARIA attributes.
 * 
 * Only supports compound component pattern: <Tabs><Tab /></Tabs>
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
 * - Navigation tabs with href support using Link component
 *
 * @param {TabsProps} props - The properties to configure the Tabs component.
 * @returns {JSX.Element} The rendered Tabs component.
 */
export default function Tabs(props: TabsProps): JSX.Element {
  const [internalActiveTab, setInternalActiveTab] = createSignal(props.defaultActiveTab ?? 0);
  const [tabsId] = createSignal(`tabs-${Math.random().toString(36).slice(2)}`);
  let tabsRef: HTMLDivElement | undefined;

  // Extract tab data from children
  const getTabsData = () => {
    if (!props.children) return [];

    // For SolidJS, we need to resolve the children first
    const resolved = solidChildren(() => props.children);
    const childElements = resolved();
    
    if (!childElements) return [];

    // Handle both single child and array of children
    const childArray = Array.isArray(childElements) ? childElements : [childElements];
    
    return childArray.map((child: any, index) => {
      // Check if it's an HTMLDivElement (our Tab components render as hidden divs)
      if (child && child instanceof HTMLDivElement) {
        // Extract data from data attributes
        const label = child.getAttribute('data-tab-label') || `Tab ${index + 1}`;
        const href = child.getAttribute('data-tab-href');
        const target = child.getAttribute('data-tab-target');
        const disabled = child.getAttribute('data-tab-disabled') === 'true';
        const customClass = child.getAttribute('data-tab-class');
        const tabId = child.getAttribute('data-tab-id');
        const clickHandler = tabId ? tabClickHandlers.get(tabId) : undefined;
        
        return {
          label,
          content: child.innerHTML ? (() => {
            return <div ref={(el: HTMLDivElement) => {
              if (el) el.innerHTML = child.innerHTML;
            }} />;
          })() : null,
          href,
          target,
          disabled,
          class: customClass,
          classList: {},
          onClick: clickHandler,
        };
      }
      
      return {
        label: `Tab ${index + 1}`,
        content: null,
        href: undefined,
        target: undefined,
        disabled: false,
        class: undefined,
        classList: {},
        onClick: undefined,
      };
    }).filter(Boolean);
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
  const getTabClasses = (index: number, tabData: any) => {
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
    const tabData = tabsData[index];
    if (!tabData?.disabled) {
      // For navigation tabs with href, don't set active state
      // (they navigate away or to different sections)
      if (!tabData.href) {
        setActiveTab(index);
      }
      // Call custom onClick handler if provided
      tabData.onClick?.(undefined as any); // Event will be provided by the actual element
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
          {(tabData, index) => {
            // If tab has href, render as Link, otherwise as button
            if (tabData.href) {
              return (
                <Link
                  id={generateTabId(index())}
                  role="tab"
                  aria-selected={false} // Navigation tabs don't participate in tab state
                  aria-controls={generatePanelId(index())}
                  aria-disabled={tabData.disabled}
                  tabindex={-1} // Navigation tabs aren't part of keyboard navigation sequence
                  data-tab-index={index()}
                  href={tabData.href}
                  target={tabData.target || undefined}
                  disabled={tabData.disabled}
                  classList={{
                    ...getTabClasses(index(), tabData),
                    ...tabData.classList,
                  }}
                  onClick={() => handleTabClick(index())}
                  onKeyDown={(e: KeyboardEvent) => handleTabKeyDown(e, index())}
                >
                  {tabData.label}
                </Link>
              );
            }

            // Regular button for non-href tabs
            return (
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
            );
          }}
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

// Also export Tab as a standalone component
export { Tab };
