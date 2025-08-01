# Link Component

## Component Overview

The Link component creates styled navigation and button-like links following official DaisyUI Link patterns. It provides full support for all official DaisyUI link features including color variants, hover effects, accessibility features, and both navigation links (with href) and button-like links.

**Smart Router Integration**: The component automatically detects internal vs external links and uses the optimal navigation method:
- **Internal links** (same domain/relative paths) integrate with SolidJS Router when available for optimal SPA navigation
- **External links** use regular anchor tags with proper security attributes

The component automatically handles security attributes for external links and provides comprehensive keyboard navigation support, ensuring WCAG 2.1 AA compliance.

## Usage Examples

### Basic Links
```tsx
import { Link } from "solid-daisyui";

{/* Basic navigation link */}
<Link href="/about">About Us</Link>

{/* Button-like link without href */}
<Link onClick={() => console.log("Clicked")}>Click Me</Link>
```

### DaisyUI Color Variants
```tsx
<Link variant="primary" href="/primary">Primary Link</Link>
<Link variant="secondary" href="/secondary">Secondary Link</Link>
<Link variant="accent" href="/accent">Accent Link</Link>
<Link variant="neutral" href="/neutral">Neutral Link</Link>
<Link variant="success" href="/success">Success Link</Link>
<Link variant="warning" href="/warning">Warning Link</Link>
<Link variant="error" href="/error">Error Link</Link>
<Link variant="info" href="/info">Info Link</Link>
```

### Style Modifiers
```tsx
{/* Enhanced hover effects */}
<Link hover href="/hover">Hover Link</Link>

{/* Remove underline */}
<Link underline={false} href="/no-underline">No Underline Link</Link>

{/* Combined styling */}
<Link variant="primary" hover underline={false} href="/styled">
  Styled Link
</Link>
```

### Router Integration
```tsx
{/* Internal links automatically use SolidJS Router when available */}
<Link href="/dashboard">Dashboard</Link>              {/* Uses router A component */}
<Link href="/users/123">User Profile</Link>           {/* Uses router A component */}
<Link href="../settings">Settings</Link>              {/* Uses router A component */}
<Link href="#section">Jump to Section</Link>          {/* Uses router A component */}

{/* External links always use regular anchor tags */}
<Link href="https://example.com">External Site</Link> {/* Uses regular anchor */}
<Link href="mailto:user@example.com">Email</Link>     {/* Uses regular anchor */}
<Link href="tel:+1234567890">Call Us</Link>           {/* Uses regular anchor */}

{/* Same domain links use router when available */}
<Link href="https://yourdomain.com/page">Same Domain</Link> {/* Uses router A component */}
```
```tsx
{/* External link with automatic security attributes */}
<Link href="https://example.com" target="_blank">
  External Link
</Link>

{/* Custom rel attribute merged with security */}
<Link href="https://sponsor.com" target="_blank" rel="sponsored">
  Sponsored Link
</Link>
```

### External Links
```tsx
{/* Accessible link with aria-label */}
<Link href="/help" aria-label="Get help and support">
  Help
</Link>

{/* Link with description */}
<Link href="/docs" aria-describedby="docs-description">
  Documentation
</Link>

{/* Disabled link */}
<Link disabled aria-label="Feature coming soon">
  Coming Soon
</Link>
```

### Accessibility Features
```tsx
{/* Static custom classes */}
<Link class="custom-link-style" href="/custom">
  Custom Styled Link
</Link>

{/* Dynamic classes */}
<Link 
  classList={{ 
    "active": isActive(), 
    "loading": isLoading() 
  }}
  href="/dynamic"
>
  Dynamic Link
</Link>

{/* Combined classes */}
<Link 
  variant="accent"
  class="btn btn-outline"
  classList={{ "btn-loading": loading() }}
  href="/button-like"
>
  Button-like Link
</Link>
```

### Custom Classes and Styling
```tsx
{/* Click handler with href */}
<Link 
  href="/analytics" 
  onClick={(e) => {
    trackClick("analytics-link");
    // Navigation continues normally
  }}
>
  Analytics Page
</Link>

{/* Prevent navigation conditionally */}
<Link 
  href="/protected" 
  onClick={(e) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      showLoginModal();
    }
  }}
>
  Protected Page
</Link>

{/* Button-like link with only click handler */}
<Link onClick={() => toggleModal()}>
  Open Modal
</Link>
```

### Interactive Behaviors
```tsx
{/* Link with complex children */}
<Link href="/profile" class="flex items-center gap-2">
  <UserIcon />
  <span>View Profile</span>
</Link>

{/* Link wrapping multiple elements */}
<Link href="/product" class="block p-4 border rounded">
  <h3>Product Name</h3>
  <p>Product description and details...</p>
</Link>
```

### Complex Content

## Props
| Name | Type | Default | Description |
| children | `JSX.Element` | - | The content to display inside the link |
| class | `string` | - | Additional CSS classes to apply to the link |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| variant | `"primary" \| "secondary" \| "accent" \| "neutral" \| "success" \| "warning" \| "error" \| "info"` | - | Color variant using official DaisyUI classes |
| hover | `boolean` | `false` | If true, applies link-hover class for enhanced hover effects |
| underline | `boolean` | `true` | If false, applies no-underline class to remove text decoration |
| href | `string` | - | The URL that the link points to. When provided, renders as navigation link |
| target | `string` | - | Where to display the linked URL (e.g., '_blank' for new window) |
| rel | `string` | - | Relationship between current document and linked document |
| disabled | `boolean` | `false` | If true, disables the link and prevents interactions |
| tabIndex | `number` | `0` | Tab order for keyboard navigation |
| aria-label | `string` | - | Accessible label for screen readers |
| aria-describedby | `string` | - | ID of element that describes the link |
| onClick | `(event: MouseEvent) => void` | - | Click event handler |

## Accessibility Features

- **ARIA Attributes**: Proper `role` attributes (link/button) and `aria-disabled` for disabled state
- **Keyboard Navigation**: Full support for Enter and Space key activation
- **Focus Management**: Proper tab order with customizable `tabIndex`
- **Screen Reader Support**: Comprehensive ARIA labeling and descriptions
- **Security**: Automatic `rel="noopener noreferrer"` for external links with `target="_blank"`
- **Disabled State**: Proper accessibility handling with `aria-disabled` and `tabindex="-1"`

## DaisyUI Classes Used

### Base Classes
- `link` - Base link class with DaisyUI styling

### Color Variants
- `link-primary` - Primary color variant
- `link-secondary` - Secondary color variant
- `link-accent` - Accent color variant
- `link-neutral` - Neutral color variant
- `link-success` - Success color variant
- `link-warning` - Warning color variant
- `link-error` - Error color variant
- `link-info` - Info color variant

### Style Modifiers
- `link-hover` - Enhanced hover effects
- `no-underline` - Removes text decoration

## Router Integration

The Link component includes smart router integration that optimizes navigation based on link type:

### Automatic Detection
- **Internal Links**: Relative paths (`/`, `./`, `../`), hash links (`#`), query links (`?`), and same-origin absolute URLs
- **External Links**: Different domains, special protocols (`mailto:`, `tel:`, `ftp:`), and protocol-relative URLs

### Router Usage
When `@solidjs/router` is available as a peer dependency:
- Internal links automatically use the router's `A` component for optimal SPA navigation
- External links use regular anchor tags with proper security attributes
- All DaisyUI styling and accessibility features work consistently across both

### Compatibility
- **With Router**: Optimal client-side navigation for internal links
- **Without Router**: Graceful fallback to regular anchor tags for all links
- **Mixed Usage**: External links always use anchor tags regardless of router availability

## Notes

- The component follows DaisyUI's official Link component patterns and styling
- Supports both navigation links (with `href`) and button-like links (without `href`)
- **Smart Router Integration**: Automatically uses SolidJS Router for internal links when available
- Automatically handles security attributes for external links with `target="_blank"`
- Provides comprehensive keyboard navigation support for accessibility
- All DaisyUI color variants and style modifiers are fully supported
- The component is designed to work seamlessly with or without SolidJS router
- State management is handled internally with SolidJS reactivity
- Custom click handlers work alongside navigation for analytics and conditional behavior
- Disabled state properly prevents all interactions while maintaining accessibility
