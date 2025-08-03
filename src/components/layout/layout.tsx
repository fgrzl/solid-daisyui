import { JSX, createSignal, createContext, useContext } from "solid-js";

/**
 * Layout variant determines the navigation position and overall layout structure.
 * Follows DaisyUI layout patterns for responsive navigation.
 */
export type LayoutVariant = "top" | "left" | "right" | "bottom";

/**
 * Layout context for managing shared state between components
 */
interface LayoutContextValue {
  variant: LayoutVariant;
  isNavCollapsed: () => boolean;
  setNavCollapsed: (collapsed: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue>();

/**
 * Hook to access layout context
 */
export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("Layout sub-components must be used within a Layout component");
  }
  return context;
}

/**
 * Props for the Layout component.
 *
 * @property {JSX.Element} [children] - The layout content (Nav and Content components).
 * @property {string} [class] - Additional CSS classes to apply to the layout.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {LayoutVariant} [variant] - The navigation position: "top", "left", "right", or "bottom". Defaults to "left".
 * @property {boolean} [responsive] - If true, automatically collapses navigation on mobile devices.
 */
export interface LayoutProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?: LayoutVariant;
  responsive?: boolean;
}

/**
 * Layout component for creating responsive navigation layouts with DaisyUI styling.
 * Provides a container for navigation and content areas with support for multiple
 * layout variants and responsive behavior.
 * 
 * Supports compound component pattern with Layout.Nav, Layout.NavItem, Layout.Content,
 * etc. for flexible composition while maintaining consistent state management.
 *
 * @param {LayoutProps} props - The properties to configure the Layout component.
 * @returns {JSX.Element} The rendered Layout component.
 */
export default function Layout(props: LayoutProps): JSX.Element {
  const [isNavCollapsed, setNavCollapsed] = createSignal(false);
  
  const variant = () => props.variant ?? "left";
  
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      // Use appropriate DaisyUI classes based on variant
      drawer: variant() === "left" || variant() === "right",
      "navbar-container": variant() === "top" || variant() === "bottom",
      "min-h-screen": true,
    };

    // Add variant-specific classes
    if (variant() === "left") {
      baseClasses["drawer-mobile"] = true;
    } else if (variant() === "right") {
      baseClasses["drawer-end"] = true;
    }

    // Add responsive classes
    if (props.responsive) {
      baseClasses["drawer-mobile"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  const contextValue: LayoutContextValue = {
    variant: variant(),
    isNavCollapsed,
    setNavCollapsed,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <div
        classList={{
          ...classes(),
          ...props.classList,
        }}
      >
        {/* Drawer input for proper DaisyUI drawer functionality */}
        {(variant() === "left" || variant() === "right") && (
          <input 
            id="layout-drawer-toggle" 
            type="checkbox" 
            class="drawer-toggle" 
            checked={!isNavCollapsed()}
            onChange={(e) => setNavCollapsed(!e.target.checked)}
          />
        )}
        {props.children}
      </div>
    </LayoutContext.Provider>
  );
}