// Layout components
import LayoutComponent from "./layout";
import LayoutNav from "./layout-nav";
import LayoutNavHeader from "./layout-nav-header";
import LayoutNavItem from "./layout-nav-item";
import LayoutToggleButton from "./layout-toggle-button";
import LayoutContent from "./layout-content";
import LayoutHeader from "./layout-header";
import LayoutBody from "./layout-body";

// Export types
export type { LayoutProps, LayoutVariant } from "./layout";
export type { LayoutNavProps } from "./layout-nav";
export type { LayoutNavHeaderProps } from "./layout-nav-header";
export type { LayoutNavItemProps } from "./layout-nav-item";
export type { LayoutToggleButtonProps } from "./layout-toggle-button";
export type { LayoutContentProps } from "./layout-content";
export type { LayoutHeaderProps } from "./layout-header";
export type { LayoutBodyProps } from "./layout-body";
export { useLayoutContext } from "./layout";

// Create compound component with attached sub-components
const Layout = LayoutComponent as typeof LayoutComponent & {
  Nav: typeof LayoutNav;
  NavHeader: typeof LayoutNavHeader;
  NavItem: typeof LayoutNavItem;
  ToggleButton: typeof LayoutToggleButton;
  Content: typeof LayoutContent;
  Header: typeof LayoutHeader;
  Body: typeof LayoutBody;
};

// Attach sub-components to main Layout component
Layout.Nav = LayoutNav;
Layout.NavHeader = LayoutNavHeader;
Layout.NavItem = LayoutNavItem;
Layout.ToggleButton = LayoutToggleButton;
Layout.Content = LayoutContent;
Layout.Header = LayoutHeader;
Layout.Body = LayoutBody;

// Export the compound component as default
export default Layout;

// Export individual components for those who prefer direct imports
export {
  LayoutComponent as Layout,
  LayoutNav,
  LayoutNavHeader,
  LayoutNavItem,
  LayoutToggleButton,
  LayoutContent,
  LayoutHeader,
  LayoutBody,
};