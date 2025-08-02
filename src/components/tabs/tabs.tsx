import { JSX, createSignal, createContext, useContext, createEffect, createMemo, children, For } from "solid-js";
import { createStore } from "solid-js/store";

// Context for tabs state management
export interface TabsContextValue {
  activeTab: () => number;
  setActiveTab: (index: number) => void;
  registerTab: (id: string) => number;
  unregisterTab: (id: string) => void;
  variant?: "bordered" | "lifted" | "boxed";
  size?: "xs" | "sm" | "md" | "lg";
}

const TabsContext = createContext<TabsContextValue>();

/**
 * Props for the Tabs component.
 *
 * @property {JSX.Element} [children] - Tab and TabContent components to display.
 * @property {string} [class] - Additional CSS classes to apply to the tabs container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"bordered" | "lifted" | "boxed"} [variant] - The style variant for tabs.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the tabs.
 * @property {number} [activeTab] - The currently active tab index (0-based) for controlled mode.
 * @property {number} [defaultActiveTab] - The initially active tab index (0-based) for uncontrolled mode.
 * @property {(index: number) => void} [onChange] - Callback fired when the active tab changes.
 * @property {string} [ariaLabel] - Custom aria-label for the tabs container.
 */
export interface TabsProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?: "bordered" | "lifted" | "boxed";
  size?: "xs" | "sm" | "md" | "lg";
  activeTab?: number;
  defaultActiveTab?: number;
  onChange?: (index: number) => void;
  ariaLabel?: string;
}

/**
 * Props for the Tab component.
 *
 * @property {JSX.Element} [children] - The content to display in the tab.
 * @property {string} [class] - Additional CSS classes to apply to the tab.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {boolean} [disabled] - Whether the tab is disabled.
 * @property {JSX.Element} [icon] - An optional icon to display in the tab.
 * @property {() => void} [onClick] - Callback fired when the tab is clicked.
 */
export interface TabProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  disabled?: boolean;
  icon?: JSX.Element;
  onClick?: () => void;
}

/**
 * Props for the TabContent component.
 *
 * @property {JSX.Element} [children] - The content to display in the tab panel.
 * @property {string} [class] - Additional CSS classes to apply to the tab panel.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {boolean} [isActive] - Whether this content panel is currently active.
 * @property {string} [id] - ID for the tab panel element.
 * @property {string} [labelledBy] - ID of the tab that controls this panel.
 * @property {boolean} [lazy] - Whether to render content only when active.
 */
export interface TabContentProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  isActive?: boolean;
  id?: string;
  labelledBy?: string;
  lazy?: boolean;
}

/**
 * Tabs component for displaying a set of layered sections of content.
 * Follows official DaisyUI Tabs component patterns with support for
 * variants, sizes, and full accessibility compliance.
 *
 * Supports both controlled and uncontrolled modes, keyboard navigation,
 * and WCAG 2.1 AA accessibility standards.
 *
 * **Usage Pattern:**
 * ```tsx
 * <Tabs>
 *   <Tab>Tab 1</Tab>
 *   <Tab>Tab 2</Tab>
 *   <Tab disabled>Tab 3</Tab>
 * </Tabs>
 * ```
 *
 * @param {TabsProps} props - The properties to configure the Tabs component.
 * @returns {JSX.Element} The rendered Tabs component.
 */
export default function Tabs(props: TabsProps): JSX.Element {
  // State management using SolidJS store for complex coordination
  const [tabsState, setTabsState] = createStore({
    registeredTabs: [] as string[],
    activeTabIndex: props.defaultActiveTab ?? 0,
  });

  // Create reactive signals for active tab management
  const [controlledActiveTab, setControlledActiveTab] = createSignal(props.activeTab);
  
  // Determine if in controlled mode
  const isControlled = () => props.activeTab !== undefined;
  
  // Get current active tab index
  const activeTabIndex = () => {
    return isControlled() ? (controlledActiveTab() ?? 0) : tabsState.activeTabIndex;
  };

  // Set active tab
  const setActiveTab = (index: number) => {
    if (!isControlled()) {
      setTabsState("activeTabIndex", index);
    }
    props.onChange?.(index);
  };

  // Tab registration for proper coordination
  const registerTab = (id: string): number => {
    const existingIndex = tabsState.registeredTabs.indexOf(id);
    if (existingIndex !== -1) {
      return existingIndex;
    }
    
    const newIndex = tabsState.registeredTabs.length;
    setTabsState("registeredTabs", [...tabsState.registeredTabs, id]);
    return newIndex;
  };

  const unregisterTab = (id: string) => {
    setTabsState("registeredTabs", tabsState.registeredTabs.filter(tabId => tabId !== id));
  };

  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      tabs: true,
    };

    // Add variant classes
    if (props.variant) {
      baseClasses[`tabs-${props.variant}`] = true;
    }

    // Add size classes
    if (props.size) {
      baseClasses[`tabs-${props.size}`] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
    const tabCount = tabsState.registeredTabs.length;
    let newIndex = currentIndex;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabCount - 1;
        break;
      case "ArrowRight":
        event.preventDefault();
        newIndex = currentIndex < tabCount - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = tabCount - 1;
        break;
      default:
        return; // Don't handle other keys
    }

    setActiveTab(newIndex);
  };

  // Update controlled active tab when prop changes
  createEffect(() => {
    if (props.activeTab !== undefined) {
      setControlledActiveTab(props.activeTab);
    }
  });

  // Context value for child components
  const contextValue: TabsContextValue = {
    activeTab: activeTabIndex,
    setActiveTab,
    registerTab,
    unregisterTab,
    variant: props.variant,
    size: props.size,
  };

  // Resolve children for proper tab indexing
  const resolvedChildren = children(() => props.children);

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        role="tablist"
        aria-label={props.ariaLabel ?? "Tabs"}
        classList={{
          ...classes(),
          ...props.classList,
        }}
        onKeyDown={(e) => handleKeyDown(e, activeTabIndex())}
      >
        {resolvedChildren()}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * Tab component for individual tab buttons.
 * Must be used as a child of the Tabs component.
 *
 * @param {TabProps} props - The properties to configure the Tab component.
 * @returns {JSX.Element} The rendered Tab component.
 */
export function Tab(props: TabProps): JSX.Element {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab must be used within a Tabs component");
  }

  // Generate stable tab ID and register this tab
  const tabId = createMemo(() => Math.random().toString(36).substr(2, 9));
  const [tabIndex, setTabIndex] = createSignal<number>(-1);

  // Register tab on mount and get index
  createEffect(() => {
    const index = context.registerTab(tabId());
    setTabIndex(index);
  });

  const isActive = () => context.activeTab() === tabIndex();
  const isDisabled = () => !!props.disabled;

  // Build tab classes
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      tab: true,
      "tab-active": isActive(),
      "tab-disabled": isDisabled(),
    };

    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle tab click
  const handleClick = () => {
    if (!isDisabled() && tabIndex() >= 0) {
      context.setActiveTab(tabIndex());
      props.onClick?.();
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !isDisabled()) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive()}
      aria-disabled={isDisabled()}
      tabIndex={isActive() ? 0 : -1}
      classList={{
        ...classes(),
        ...props.classList,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {props.icon && <span class="tab-icon">{props.icon}</span>}
      {props.children}
    </button>
  );
}

/**
 * TabContent component for tab panel content.
 * Can be used independently or within the Tabs context.
 *
 * @param {TabContentProps} props - The properties to configure the TabContent component.
 * @returns {JSX.Element | null} The rendered TabContent component or null if not active.
 */
export function TabContent(props: TabContentProps): JSX.Element | null {
  const context = useContext(TabsContext);
  
  // Determine if this content is active
  const isActive = () => {
    if (props.isActive !== undefined) {
      return props.isActive;
    }
    // If no explicit isActive prop and no context, don't render
    return false;
  };

  // Handle lazy loading
  if (props.lazy && !isActive()) {
    return null;
  }

  // Don't render content if not active (unless lazy is false and we want to keep in DOM)
  if (!isActive() && props.lazy !== false) {
    return null;
  }

  // Build content classes
  const classes = () => {
    const baseClasses: Record<string, boolean> = {};

    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <div
      role="tabpanel"
      id={props.id}
      aria-labelledby={props.labelledBy}
      classList={{
        ...classes(),
        ...props.classList,
      }}
      style={{
        display: isActive() ? "block" : "none",
      }}
    >
      {props.children}
    </div>
  );
}
