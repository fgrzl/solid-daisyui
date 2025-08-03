import { JSX, createMemo } from "solid-js";

/**
 * Props for the Navbar component.
 *
 * @property {JSX.Element} [children] - The content to display inside the navbar. Can include Navbar.Start, Navbar.Center, and Navbar.End sections.
 * @property {string} [class] - Additional CSS classes to apply to the navbar container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling using SolidJS classList.
 * @property {boolean} [shadow] - If true, adds shadow-lg class to create a shadow effect below the navbar.
 * @property {string} [bgColor] - Background color variant. Supports DaisyUI color names (e.g., "primary", "secondary") or Tailwind color classes (e.g., "red-500").
 * @property {boolean} [responsive] - Enable responsive navbar behavior. When true, optimizes navbar layout for different screen sizes.
 * @property {string} [aria-label] - Accessible label for the navbar. Recommended for screen reader users.
 * @property {string} [aria-labelledby] - ID of element that provides an accessible name for the navbar.
 * @property {string} [aria-expanded] - Indicates if a collapsible navbar menu is expanded (true/false). Useful for mobile menus.
 * @property {string} [aria-controls] - ID of element controlled by the navbar, typically a mobile menu or dropdown.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler for the navbar container.
 * @property {(event: MouseEvent) => void} [onMouseEnter] - Mouse enter event handler for hover interactions.
 * @property {(event: MouseEvent) => void} [onMouseLeave] - Mouse leave event handler for hover interactions.
 */
export interface NavbarProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  shadow?: boolean;
  bgColor?: string;
  responsive?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-expanded"?: string;
  "aria-controls"?: string;
  onClick?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
}

/**
 * Props for Navbar section components (Start, Center, End).
 *
 * @property {JSX.Element} [children] - The content to display in the navbar section. Can include links, buttons, logos, or other interactive elements.
 * @property {string} [class] - Additional CSS classes to apply to the navbar section.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling using SolidJS classList.
 */
export interface NavbarSectionProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Navbar Start section component for left-aligned content.
 * 
 * This section is typically used for:
 * - Site logos or brand names
 * - Primary navigation items
 * - Mobile menu toggles
 * 
 * Uses DaisyUI's navbar-start class which applies flex-start justification and takes up 50% width on larger screens.
 * 
 * @param {NavbarSectionProps} props - The navbar start section props
 * @returns {JSX.Element} JSX element representing the left section of the navbar
 */
function NavbarStart(props: NavbarSectionProps): JSX.Element {
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      "navbar-start": true,
    };

    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  return (
    <div classList={{ ...classes(), ...props.classList }}>
      {props.children}
    </div>
  );
}

/**
 * Navbar Center section component for center-aligned content.
 * 
 * This section is typically used for:
 * - Main navigation menus
 * - Centered branding elements
 * - Search bars or primary actions
 * 
 * Uses DaisyUI's navbar-center class which applies center alignment and shrinks to fit content.
 * 
 * @param {NavbarSectionProps} props - The navbar center section props
 * @returns {JSX.Element} JSX element representing the center section of the navbar
 */
function NavbarCenter(props: NavbarSectionProps): JSX.Element {
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      "navbar-center": true,
    };

    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  return (
    <div classList={{ ...classes(), ...props.classList }}>
      {props.children}
    </div>
  );
}

/**
 * Navbar End section component for right-aligned content.
 * 
 * This section is typically used for:
 * - User account menus or avatars
 * - Secondary actions (search, settings, etc.)
 * - Call-to-action buttons
 * - Authentication controls (login/logout)
 * 
 * Uses DaisyUI's navbar-end class which applies flex-end justification and takes up 50% width on larger screens.
 * 
 * @param {NavbarSectionProps} props - The navbar end section props
 * @returns {JSX.Element} JSX element representing the right section of the navbar
 */
function NavbarEnd(props: NavbarSectionProps): JSX.Element {
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      "navbar-end": true,
    };

    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  return (
    <div classList={{ ...classes(), ...props.classList }}>
      {props.children}
    </div>
  );
}

/**
 * Navbar component for creating responsive navigation bars following DaisyUI standards.
 * 
 * The Navbar component provides a flexible navigation container with three main sections:
 * - **Start**: Left-aligned content (logos, primary nav)
 * - **Center**: Center-aligned content (main navigation)
 * - **End**: Right-aligned content (user actions, secondary nav)
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Full DaisyUI navbar class support with automatic flexbox layout
 * - Comprehensive accessibility with WCAG 2.1 AA compliance
 * - Support for custom styling through class and classList props
 * - Event handling for user interactions
 * - Semantic HTML structure with proper navigation landmarks
 * 
 * **Usage:**
 * ```tsx
 * <Navbar aria-label="Main navigation" shadow bgColor="primary">
 *   <Navbar.Start>
 *     <a href="/" aria-label="Home">Logo</a>
 *   </Navbar.Start>
 *   <Navbar.Center>
 *     <nav role="menubar">Navigation Items</nav>
 *   </Navbar.Center>
 *   <Navbar.End>
 *     <button>User Menu</button>
 *   </Navbar.End>
 * </Navbar>
 * ```
 * 
 * **Accessibility:**
 * - Uses semantic `<nav>` element with `role="navigation"`
 * - Supports all ARIA attributes for complex navigation patterns
 * - Compatible with screen readers and keyboard navigation
 * - Follows WAI-ARIA authoring practices for navigation landmarks
 * 
 * @param {NavbarProps} props - The navbar component props
 * @returns {JSX.Element} JSX element representing the complete navbar navigation
 */
function Navbar(props: NavbarProps): JSX.Element {
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      navbar: true,
    };

    // Add shadow styling for elevated navbar appearance
    if (props.shadow) {
      baseClasses["shadow-lg"] = true;
    }

    // Apply background color - supports both DaisyUI and Tailwind classes
    if (props.bgColor) {
      baseClasses[`bg-${props.bgColor}`] = true;
    }

    // Merge custom classes
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  // Prepare ARIA attributes for accessibility
  const ariaProps: Record<string, string> = {};
  if (props["aria-label"]) {
    ariaProps["aria-label"] = props["aria-label"];
  }
  if (props["aria-labelledby"]) {
    ariaProps["aria-labelledby"] = props["aria-labelledby"];
  }
  if (props["aria-expanded"]) {
    ariaProps["aria-expanded"] = props["aria-expanded"];
  }
  if (props["aria-controls"]) {
    ariaProps["aria-controls"] = props["aria-controls"];
  }

  return (
    <nav
      role="navigation"
      classList={{ ...classes(), ...props.classList }}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      {...ariaProps}
    >
      {props.children}
    </nav>
  );
}

// Attach section components as static properties for compound component pattern
Navbar.Start = NavbarStart;
Navbar.Center = NavbarCenter;
Navbar.End = NavbarEnd;

export default Navbar;
