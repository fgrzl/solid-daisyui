import { JSX, createMemo } from "solid-js";

/**
 * Utility function to determine if a link is internal (should use router) or external (use regular anchor).
 * 
 * @param href - The href to check
 * @returns true if the link is internal, false if external
 */
function isInternalLink(href?: string): boolean {
  if (!href) return false;
  
  // Handle special protocols that are always external
  if (href.match(/^(mailto:|tel:|sms:|ftp:|file:)/i)) {
    return false;
  }
  
  // Protocol-relative URLs or absolute URLs with different origins are external
  if (href.startsWith('//') || href.includes('://')) {
    try {
      // Only check origin in browser environment
      if (typeof window !== 'undefined') {
        const url = new URL(href, window.location.origin);
        return url.origin === window.location.origin;
      }
      // In non-browser environments (like tests), assume external for absolute URLs
      return false;
    } catch {
      // Invalid URL, treat as external
      return false;
    }
  }
  
  // Relative paths and same-origin absolute paths are internal
  // This includes: /, /path, ./path, ../path, #hash, ?query
  return href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || 
         href.startsWith('#') || href.startsWith('?');
}

/**
 * Cached router A component to avoid repeated import attempts
 */
let cachedRouterA: any = undefined;
let routerChecked = false;

/**
 * Try to get the SolidJS Router A component if available.
 * Since @solidjs/router is a peer dependency, we check if it's available at runtime.
 */
function getRouterA(): any {
  if (routerChecked) {
    return cachedRouterA;
  }
  
  try {
    // Try to import the A component from @solidjs/router
    // Using dynamic require to avoid build-time dependency resolution
    const routerModule = eval('(() => { try { return require("@solidjs/router"); } catch { return null; } })()');
    
    if (routerModule && routerModule.A) {
      cachedRouterA = routerModule.A;
      routerChecked = true;
      return cachedRouterA;
    }
    
    // Router not available or doesn't have A component
    cachedRouterA = null;
    routerChecked = true;
    return null;
  } catch {
    // Router not available, graceful fallback
    cachedRouterA = null;
    routerChecked = true;
    return null;
  }
}

/**
 * Props for the Link component.
 *
 * @property {JSX.Element} [children] - The content to display inside the link.
 * @property {string} [class] - Additional CSS classes to apply to the link.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info'} [variant] - The color variant of the link, which determines its styling using official DaisyUI classes.
 * @property {boolean} [hover] - If true, applies link-hover class for enhanced hover effects.
 * @property {boolean} [underline] - If false, applies no-underline class to remove text decoration.
 * @property {string} [href] - The URL that the link points to. When provided, renders as a navigation link.
 * @property {string} [target] - Where to display the linked URL (e.g., '_blank' for new window).
 * @property {string} [rel] - Relationship between current document and linked document.
 * @property {boolean} [disabled] - If true, disables the link and prevents interactions.
 * @property {number} [tabIndex] - Tab order for keyboard navigation. Defaults to 0.
 * @property {string} [aria-label] - Accessible label for screen readers.
 * @property {string} [aria-describedby] - ID of element that describes the link.
 * @property {string} [role] - ARIA role for the link. Defaults to "link" if href is provided, "button" otherwise.
 * @property {(event: MouseEvent | KeyboardEvent) => void} [onClick] - Click event handler that accepts both mouse and keyboard events.
 */
export interface LinkProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?: "primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error" | "info";
  hover?: boolean;
  underline?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

/**
 * Link component for creating styled navigation and button-like links.
 * Follows official DaisyUI Link component patterns for consistent styling and behavior.
 * 
 * Supports all official DaisyUI link features including color variants, hover effects,
 * accessibility features, and both navigation links (with href) and button-like links.
 * 
 * Automatically uses SolidJS Router's A component for internal navigation when the router
 * is available, and falls back to regular anchor tags for external links or when the
 * router is not installed. This provides optimal client-side navigation for SPAs while
 * maintaining compatibility for external links and non-router usage.
 * 
 * The component automatically handles security attributes for external links and
 * provides comprehensive keyboard navigation support.
 *
 * @param {LinkProps} props - The properties to configure the Link component.
 * @returns {JSX.Element} The rendered Link component.
 */
export default function Link(props: LinkProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      link: true,
    };

    // Add official DaisyUI color variant classes
    if (props.variant) {
      baseClasses[`link-${props.variant}`] = true;
    }

    // Add official DaisyUI hover class
    if (props.hover) {
      baseClasses["link-hover"] = true;
    }

    // Add no-underline class when underline is explicitly false
    if (props.underline === false) {
      baseClasses["no-underline"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle security for external links
  const computedRel = createMemo(() => {
    if (props.target === "_blank") {
      const securityRel = "noopener noreferrer";
      if (props.rel) {
        return `${props.rel} ${securityRel}`;
      }
      return securityRel;
    }
    return props.rel;
  });

  // Handle click events with proper event handling and keyboard support
  const handleClick = (event: MouseEvent) => {
    if (props.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    props.onClick?.(event);
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Call onClick handler directly with the keyboard event
      props.onClick?.(event);
    }
  };

  // Determine accessibility attributes
  const role = props.role ?? (props.href ? "link" : "button");
  const tabIndex = props.disabled ? -1 : (props.tabIndex ?? 0);

  // Common props for router component
  const routerProps = {
    href: props.href,
    role: role,
    tabindex: tabIndex,
    "aria-disabled": props.disabled ? "true" as const : undefined,
    "aria-label": props["aria-label"],
    "aria-describedby": props["aria-describedby"],
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    classList: {
      ...classes(),
      ...props.classList,
    },
  };

  // Common props for regular anchor
  const anchorProps = {
    href: props.href,
    target: props.target,
    rel: computedRel(),
    role: role,
    tabindex: tabIndex,
    "aria-disabled": props.disabled ? "true" as const : undefined,
    "aria-label": props["aria-label"],
    "aria-describedby": props["aria-describedby"],
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    classList: {
      ...classes(),
      ...props.classList,
    },
  };

  // Determine if we should use router A component or regular anchor
  const RouterA = getRouterA();
  const shouldUseRouter = RouterA && props.href && isInternalLink(props.href);

  if (shouldUseRouter) {
    // Use SolidJS Router A component for internal navigation
    return (
      <RouterA {...routerProps}>
        {props.children}
      </RouterA>
    );
  }

  // Use regular anchor tag for external links, no href, or when router is not available
  return (
    <a {...anchorProps}>
      {props.children}
    </a>
  );
}

// Named export for compatibility with star exports
export { Link };
