import { JSX } from "solid-js";
import { useLayoutContext } from "./layout";

/**
 * Props for the Layout.Nav component.
 *
 * @property {JSX.Element} [children] - The navigation content (NavHeader, NavItem components).
 * @property {string} [class] - Additional CSS classes to apply to the navigation.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {boolean} [collapsible] - If true, enables collapsible behavior for the navigation.
 */
export interface LayoutNavProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  collapsible?: boolean;
}

/**
 * Layout.Nav component for creating the navigation area within a Layout.
 * Automatically adapts its structure based on the parent Layout's variant.
 * 
 * Supports collapsible behavior and responsive design patterns following
 * DaisyUI navigation components (drawer, navbar).
 *
 * @param {LayoutNavProps} props - The properties to configure the Nav component.
 * @returns {JSX.Element} The rendered Nav component.
 */
export default function LayoutNav(props: LayoutNavProps): JSX.Element {
  const context = useLayoutContext();
  
  // Build classes based on layout variant
  const classes = () => {
    const baseClasses: Record<string, boolean> = {};

    // Apply variant-specific classes
    if (context.variant === "left" || context.variant === "right") {
      baseClasses["drawer-side"] = true;
    } else if (context.variant === "top" || context.variant === "bottom") {
      baseClasses["navbar"] = true;
      baseClasses["bg-base-100"] = true;
      baseClasses["shadow-lg"] = true;
    }

    // Apply collapsible state
    if (props.collapsible && context.isNavCollapsed()) {
      baseClasses["hidden"] = context.variant === "top" || context.variant === "bottom";
      baseClasses["-translate-x-full"] = context.variant === "left";
      baseClasses["translate-x-full"] = context.variant === "right";
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Render different structures based on variant
  if (context.variant === "left" || context.variant === "right") {
    return (
      <>
        <aside
          classList={{
            ...classes(),
            ...props.classList,
          }}
        >
          <label 
            for="layout-drawer-toggle" 
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {props.children}
          </ul>
        </aside>
      </>
    );
  }

  // Top/bottom navbar structure
  return (
    <nav
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      <div class="navbar-start">
        <div class="dropdown">
          {/* Mobile menu button for top/bottom variants */}
          {props.collapsible && (
            <label 
              tabindex="0" 
              class="btn btn-ghost lg:hidden"
              onClick={() => context.setNavCollapsed(!context.isNavCollapsed())}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
          )}
        </div>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          {props.children}
        </ul>
      </div>
      <div class="navbar-end">
        {/* Additional navbar end content can go here */}
      </div>
    </nav>
  );
}