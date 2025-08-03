# Navbar Component

## Component Overview

The Navbar component provides a responsive navigation bar following DaisyUI standards. It offers a flexible container with three main sections (start, center, end) for organizing navigation elements, logos, and user actions. The component implements WCAG 2.1 AA accessibility standards and supports comprehensive customization through props and CSS classes.

## Features

- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Three Section Layout**: Start (left), Center, and End (right) sections
- **Full Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **DaisyUI Integration**: Uses official DaisyUI navbar classes and patterns
- **Event Handling**: Support for click, hover, and other mouse events
- **Custom Styling**: Flexible class and classList prop support
- **Semantic HTML**: Uses proper `<nav>` element with navigation landmarks

## Usage Examples

### Basic Navbar

```tsx
<Navbar aria-label="Main navigation">
  <Navbar.Start>
    <a href="/" aria-label="Home">
      <img src="/logo.png" alt="Company Logo" />
    </a>
  </Navbar.Start>
  <Navbar.End>
    <button class="btn btn-primary">Login</button>
  </Navbar.End>
</Navbar>
```

### Full Featured Navbar

```tsx
<Navbar 
  aria-label="Main navigation" 
  shadow 
  bgColor="base-100"
  class="border-b"
>
  <Navbar.Start>
    <div class="dropdown lg:hidden">
      <button class="btn btn-ghost" aria-label="Open menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <a href="/" class="btn btn-ghost text-xl" aria-label="Home">
      Brand
    </a>
  </Navbar.Start>
  
  <Navbar.Center class="hidden lg:flex">
    <ul class="menu menu-horizontal px-1" role="menubar">
      <li role="none">
        <a href="/about" role="menuitem">About</a>
      </li>
      <li role="none">
        <a href="/services" role="menuitem">Services</a>
      </li>
      <li role="none">
        <a href="/contact" role="menuitem">Contact</a>
      </li>
    </ul>
  </Navbar.Center>
  
  <Navbar.End>
    <div class="dropdown dropdown-end">
      <button class="btn btn-ghost btn-circle avatar" aria-label="User menu">
        <div class="w-10 rounded-full">
          <img src="/avatar.jpg" alt="User avatar" />
        </div>
      </button>
      <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </Navbar.End>
</Navbar>
```

### Mobile-Responsive Navbar

```tsx
<Navbar aria-label="Main navigation" responsive>
  <Navbar.Start>
    <div class="dropdown">
      <button 
        class="btn btn-square btn-ghost lg:hidden"
        aria-expanded="false"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <ul 
        id="mobile-menu"
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
    <a href="/" class="btn btn-ghost text-xl">Brand</a>
  </Navbar.Start>
  
  <Navbar.End>
    <div class="navbar-item hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  </Navbar.End>
</Navbar>
```

## Props

### Navbar Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | `undefined` | Content to display inside the navbar. Can include Navbar.Start, Navbar.Center, and Navbar.End sections |
| class | `string` | `undefined` | Additional CSS classes to apply to the navbar container |
| classList | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling using SolidJS classList |
| shadow | `boolean` | `false` | If true, adds shadow-lg class to create a shadow effect below the navbar |
| bgColor | `string` | `undefined` | Background color variant. Supports DaisyUI color names or Tailwind color classes |
| responsive | `boolean` | `false` | Enable responsive navbar behavior for mobile-first design |
| aria-label | `string` | `undefined` | Accessible label for the navbar. Recommended for screen reader users |
| aria-labelledby | `string` | `undefined` | ID of element that provides an accessible name for the navbar |
| aria-expanded | `string` | `undefined` | Indicates if a collapsible navbar menu is expanded (true/false) |
| aria-controls | `string` | `undefined` | ID of element controlled by the navbar, typically a mobile menu |
| onClick | `(event: MouseEvent) => void` | `undefined` | Click event handler for the navbar container |
| onMouseEnter | `(event: MouseEvent) => void` | `undefined` | Mouse enter event handler for hover interactions |
| onMouseLeave | `(event: MouseEvent) => void` | `undefined` | Mouse leave event handler for hover interactions |

### Navbar Section Props (Start, Center, End)

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | `undefined` | Content to display in the navbar section |
| class | `string` | `undefined` | Additional CSS classes to apply to the navbar section |
| classList | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling |

## Section Components

### Navbar.Start

Left-aligned section typically used for:
- Site logos or brand names
- Primary navigation items
- Mobile menu toggles

```tsx
<Navbar.Start>
  <a href="/" aria-label="Home">
    <img src="/logo.png" alt="Logo" />
  </a>
</Navbar.Start>
```

### Navbar.Center

Center-aligned section typically used for:
- Main navigation menus
- Centered branding elements
- Search bars or primary actions

```tsx
<Navbar.Center>
  <ul class="menu menu-horizontal" role="menubar">
    <li role="none"><a href="/about" role="menuitem">About</a></li>
    <li role="none"><a href="/contact" role="menuitem">Contact</a></li>
  </ul>
</Navbar.Center>
```

### Navbar.End

Right-aligned section typically used for:
- User account menus or avatars
- Secondary actions (search, settings, etc.)
- Call-to-action buttons
- Authentication controls

```tsx
<Navbar.End>
  <button class="btn btn-primary">Get Started</button>
</Navbar.End>
```

## Accessibility

The Navbar component implements comprehensive accessibility features:

### ARIA Attributes
- `role="navigation"` - Identifies the navbar as a navigation landmark
- `aria-label` - Provides accessible name for screen readers
- `aria-labelledby` - References element that labels the navbar
- `aria-expanded` - Indicates state of collapsible menus
- `aria-controls` - Links to controlled elements like mobile menus

### Keyboard Navigation
- Supports tab navigation through interactive elements
- Compatible with screen reader navigation commands
- Follows WAI-ARIA authoring practices for navigation

### Screen Reader Support
- Uses semantic `<nav>` element for proper landmark identification
- Supports role="menubar" and role="menuitem" for menu structures
- Provides meaningful labels and descriptions

## DaisyUI Classes

The component uses the following DaisyUI classes:

- `navbar` - Base navbar container class
- `navbar-start` - Left-aligned section (50% width on larger screens)
- `navbar-center` - Center-aligned section (shrinks to fit content)
- `navbar-end` - Right-aligned section (50% width on larger screens)

Additional utility classes can be combined:
- `shadow-lg` - For navbar shadow effect
- `bg-{color}` - For background colors
- `border-b` - For bottom border
- Custom responsive classes for mobile behavior

## Best Practices

### Structure
1. **Use semantic HTML**: Always include proper ARIA attributes
2. **Logical order**: Place most important content in Start section
3. **Mobile-first**: Design for mobile and progressively enhance

### Accessibility
1. **Provide labels**: Use aria-label for screen reader users
2. **Keyboard navigation**: Ensure all interactive elements are accessible
3. **Focus management**: Handle focus properly in dropdown menus

### Performance
1. **Minimal re-renders**: Use classList for dynamic styling
2. **Lazy loading**: Load mobile menu content only when needed
3. **Optimize images**: Use appropriate image formats and sizes for logos

## Notes

- The navbar automatically applies flexbox layout with proper alignment
- Section components (Start, Center, End) are responsive by default
- Mobile responsiveness should be handled through CSS classes and conditional rendering
- The component works seamlessly with other DaisyUI components like dropdowns, menus, and buttons
- For complex navigation patterns, consider combining with SolidJS Router for client-side routing
- All section components support the full range of HTML attributes through props spreading

## Common Patterns

### E-commerce Site
```tsx
<Navbar shadow bgColor="white">
  <Navbar.Start>
    <button class="btn btn-square btn-ghost lg:hidden">☰</button>
    <a href="/" class="btn btn-ghost text-xl">Store</a>
  </Navbar.Start>
  <Navbar.Center class="hidden lg:flex">
    <input type="text" placeholder="Search products..." class="input input-bordered w-96" />
  </Navbar.Center>
  <Navbar.End>
    <button class="btn btn-ghost btn-circle">🛒</button>
    <button class="btn btn-ghost btn-circle">👤</button>
  </Navbar.End>
</Navbar>
```

### Dashboard Application
```tsx
<Navbar bgColor="base-200" class="min-h-16">
  <Navbar.Start>
    <h1 class="text-xl font-bold">Admin Dashboard</h1>
  </Navbar.Start>
  <Navbar.End>
    <div class="dropdown dropdown-end">
      <div class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full bg-primary text-primary-content">
          <span class="text-sm font-bold">JD</span>
        </div>
      </div>
    </div>
  </Navbar.End>
</Navbar>
```
