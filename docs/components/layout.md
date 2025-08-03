# Layout Component

## Overview
The Layout component provides a comprehensive responsive navigation layout system built with DaisyUI styling and SolidJS reactivity. It supports multiple layout variants (top, left, right, bottom navigation) and includes a complete set of sub-components for building complex application layouts.

## Features
- **Responsive Design**: Automatically adapts to different screen sizes
- **Multiple Variants**: Support for top, left, right, and bottom navigation layouts
- **Collapsible Navigation**: Toggle navigation visibility with smooth transitions
- **Router Integration**: Uses the smart Link component for router-aware navigation
- **Accessibility**: Full WCAG 2.1 AA compliance with proper ARIA attributes
- **Compound Components**: Clean API with Layout.Nav, Layout.NavItem, etc.
- **DaisyUI Integration**: Uses official DaisyUI classes for consistent styling

## Usage

### Basic Layout Structure
```tsx
import Layout from "solid-daisyui";

function App() {
  return (
    <Layout variant="left">
      <Layout.Nav collapsible>
        <Layout.NavHeader>
          <h1>My App</h1>
          <Layout.ToggleButton />
        </Layout.NavHeader>

        <Layout.NavItem icon={<HomeIcon />} href="/">Home</Layout.NavItem>
        <Layout.NavItem icon={<SettingsIcon />} href="/settings">Settings</Layout.NavItem>
        <Layout.NavItem icon={<LogoutIcon />} onClick={() => logout()}>Logout</Layout.NavItem>
      </Layout.Nav>

      <Layout.Content>
        <Layout.Header>
          <h2>Page Title</h2>
        </Layout.Header>

        <Layout.Body>
          <p>Your page content goes here</p>
        </Layout.Body>
      </Layout.Content>
    </Layout>
  );
}
```

### Layout Variants

#### Left Navigation (Default)
```tsx
<Layout variant="left">
  {/* Navigation appears on the left side */}
</Layout>
```

#### Top Navigation
```tsx
<Layout variant="top">
  {/* Navigation appears as a top navbar */}
</Layout>
```

#### Right Navigation
```tsx
<Layout variant="right">
  {/* Navigation appears on the right side */}
</Layout>
```

#### Bottom Navigation
```tsx
<Layout variant="bottom">
  {/* Navigation appears as a bottom navbar */}
</Layout>
```

## Component API

### Layout
Main container component that provides context for all sub-components.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Layout content (Nav and Content components) |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |
| `variant` | `"top" \| "left" \| "right" \| "bottom"` | `"left"` | Navigation position |
| `responsive` | `boolean` | `false` | Enable responsive behavior |

### Layout.Nav
Navigation container that adapts based on layout variant.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Navigation content |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |
| `collapsible` | `boolean` | `false` | Enable collapsible behavior |

### Layout.NavHeader
Header area within navigation for branding and controls.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Header content |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |

### Layout.NavItem
Individual navigation items with router integration.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Item content |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |
| `icon` | `JSX.Element` | - | Optional icon |
| `href` | `string` | - | Link URL (uses smart routing) |
| `active` | `boolean` | `false` | Active state styling |
| `onClick` | `() => void` | - | Click handler for actions |

### Layout.ToggleButton
Button for controlling collapsible navigation.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |
| `aria-label` | `string` | `"Toggle navigation"` | Accessible label |

### Layout.Content
Main content area container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Content (Header and Body) |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |

### Layout.Header
Header area within content for page titles and actions.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Header content |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |

### Layout.Body
Main body area for page content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Body content |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list |

## Advanced Examples

### With Icons and Active States
```tsx
<Layout variant="left">
  <Layout.Nav collapsible>
    <Layout.NavItem 
      icon={<HomeIcon />} 
      href="/" 
      active={location.pathname === "/"}
    >
      Home
    </Layout.NavItem>
    <Layout.NavItem 
      icon={<SettingsIcon />} 
      href="/settings"
      active={location.pathname === "/settings"}
    >
      Settings
    </Layout.NavItem>
  </Layout.Nav>
  
  <Layout.Content>
    <Layout.Body>
      <Routes>
        <Route path="/" component={HomePage} />
        <Route path="/settings" component={SettingsPage} />
      </Routes>
    </Layout.Body>
  </Layout.Content>
</Layout>
```

### Responsive Layout
```tsx
<Layout variant="left" responsive>
  <Layout.Nav collapsible>
    <Layout.NavHeader>
      <img src="/logo.png" alt="Logo" />
      <Layout.ToggleButton />
    </Layout.NavHeader>
    
    {/* Navigation automatically collapses on mobile */}
    <Layout.NavItem href="/">Home</Layout.NavItem>
    <Layout.NavItem href="/about">About</Layout.NavItem>
  </Layout.Nav>
  
  <Layout.Content>
    <Layout.Header>
      <h1>Welcome</h1>
      <button class="btn btn-primary">Action</button>
    </Layout.Header>
    
    <Layout.Body>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Your content grid */}
      </div>
    </Layout.Body>
  </Layout.Content>
</Layout>
```

### Action Items (Non-Navigation)
```tsx
<Layout.Nav>
  <Layout.NavItem href="/">Home</Layout.NavItem>
  <Layout.NavItem href="/profile">Profile</Layout.NavItem>
  
  {/* Action item without href */}
  <Layout.NavItem 
    icon={<LogoutIcon />}
    onClick={() => {
      logout();
      navigate("/login");
    }}
  >
    Logout
  </Layout.NavItem>
</Layout.Nav>
```

## Accessibility

The Layout component follows WCAG 2.1 AA standards:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Logical tab order and focus indicators
- **High Contrast**: Compatible with high contrast modes
- **Reduced Motion**: Respects `prefers-reduced-motion` settings

### Keyboard Shortcuts
- `Tab` / `Shift+Tab`: Navigate between interactive elements
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close expanded navigation (when applicable)

## Styling and Customization

The Layout component uses DaisyUI classes and can be customized through:

1. **DaisyUI Themes**: All layout components respond to theme changes
2. **Custom Classes**: Use the `class` and `classList` props
3. **CSS Variables**: Override DaisyUI custom properties
4. **Tailwind Utilities**: Add utility classes for specific adjustments

```tsx
<Layout class="custom-layout" classList={{ "dark-mode": isDark }}>
  <Layout.Nav class="bg-primary">
    <Layout.NavItem class="hover:bg-primary-focus">
      Custom Styled Item
    </Layout.NavItem>
  </Layout.Nav>
</Layout>
```

## Performance Considerations

- **Lazy Loading**: Consider lazy loading content in Layout.Body
- **Memoization**: Use SolidJS's createMemo for expensive computations
- **State Management**: Layout uses efficient SolidJS signals for state
- **Bundle Size**: Tree-shakeable - only import what you use

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: Compatible with screen readers and assistive technologies

## Migration from Other Libraries

If migrating from other layout libraries, the Layout component provides:
- Similar API to React-based layout libraries
- DaisyUI compatibility for existing designs
- Progressive enhancement for accessibility features