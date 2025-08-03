# Tabs Component

## Component Overview

The Tabs component provides a way to organize content into multiple sections that can be navigated via clickable tab headers. It follows DaisyUI patterns and includes full accessibility support with keyboard navigation.

**NEW**: Tabs now support navigation with `href` for routing using the existing Link component.

## Usage Examples

### Basic Tabs with Array Props
```tsx
import { Tabs } from 'solid-daisyui';

const tabs = [
  { label: "Tab 1", content: <div>Content for tab 1</div> },
  { label: "Tab 2", content: <div>Content for tab 2</div> },
  { label: "Tab 3", content: <div>Content for tab 3</div> },
];

<Tabs tabs={tabs} showContent />
```

### Navigation Tabs with href (NEW)
```tsx
const navigationTabs = [
  { label: "Home", content: <div>Home content</div> },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact", target: "_blank" },
];

<Tabs tabs={navigationTabs} variant="bordered" />
```

**Note**: Tabs with `href` will render as Link components for proper routing and will not affect the active tab state (since they navigate away).

### Tabs with Variants
```tsx
<Tabs tabs={tabs} variant="bordered" />
<Tabs tabs={tabs} variant="lifted" />
<Tabs tabs={tabs} variant="boxed" />
```

### Tabs with Sizes
```tsx
<Tabs tabs={tabs} size="xs" />
<Tabs tabs={tabs} size="sm" />
<Tabs tabs={tabs} size="md" />
<Tabs tabs={tabs} size="lg" />
```

### Controlled Tabs
```tsx
const [activeTab, setActiveTab] = createSignal(0);

<Tabs 
  tabs={tabs} 
  activeTab={activeTab()} 
  onTabChange={setActiveTab} 
  showContent 
/>
```

### Tabs with Disabled Tab
```tsx
const tabs = [
  { label: "Tab 1", content: <div>Content 1</div> },
  { label: "Tab 2", content: <div>Content 2</div>, disabled: true },
  { label: "Tab 3", content: <div>Content 3</div> },
];
```

### Compound Component Pattern (Experimental)
```tsx
import { Tabs, Tab } from 'solid-daisyui';

<Tabs variant="lifted">
  <Tab label="Home">Home content</Tab>
  <Tab label="About" href="/about" />
  <Tab label="Contact" href="/contact" target="_blank" />
</Tabs>
```

## Props

### TabsProps

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| tabs | `TabItem[]` | `[]` | Array of tab objects to display |
| children | `JSX.Element` | - | Tab components for compound pattern |
| variant | `"bordered" \| "lifted" \| "boxed"` | - | DaisyUI variant style for the tabs |
| size | `"xs" \| "sm" \| "md" \| "lg"` | - | Size of the tabs using DaisyUI classes |
| activeTab | `number` | - | Index of currently active tab (controlled mode) |
| defaultActiveTab | `number` | `0` | Initial active tab index (uncontrolled mode) |
| onTabChange | `(index: number) => void` | - | Callback fired when active tab changes |
| showContent | `boolean` | `false` | Whether to render tab content panels |
| class | `string` | - | Additional CSS classes for tabs container |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |

### TabItem Interface

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| label | `string` | - | Label text displayed in the tab |
| content | `JSX.Element` | - | Content to display in the tab panel |
| href | `string` | - | **NEW**: URL for navigation tabs (uses Link component) |
| target | `string` | - | **NEW**: Where to display the linked URL |
| disabled | `boolean` | `false` | Whether the tab is disabled |
| class | `string` | - | Additional CSS classes for the tab |
| classList | `Record<string, boolean>` | - | Dynamic class list for the tab |
| onClick | `(event: MouseEvent \| KeyboardEvent) => void` | - | **NEW**: Click event handler |

### TabProps (for compound pattern)

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| label | `string` | - | Label text displayed in the tab |
| children | `JSX.Element` | - | Content to display in the tab panel |
| href | `string` | - | **NEW**: URL for navigation tabs (uses Link component) |
| target | `string` | - | **NEW**: Where to display the linked URL |
| disabled | `boolean` | `false` | Whether the tab is disabled |
| class | `string` | - | Additional CSS classes for the tab |
| classList | `Record<string, boolean>` | - | Dynamic class list for the tab |
| onClick | `(event: MouseEvent \| KeyboardEvent) => void` | - | **NEW**: Click event handler |

## Navigation Tabs

Tabs with an `href` property will:
- Render as Link components (anchor tags) instead of buttons
- Use the existing Link component for proper routing
- Support SolidJS Router for internal navigation
- Not affect the active tab state (they navigate away)
- Support `target` attribute for opening in new windows
- Maintain all accessibility features

```tsx
const mixedTabs = [
  { label: "Dashboard", content: <DashboardView /> },
  { label: "Settings", href: "/settings" },
  { label: "Help", href: "https://help.example.com", target: "_blank" },
];
```

## Accessibility Features

- **ARIA Compliance**: Implements `role="tablist"`, `role="tab"`, and `role="tabpanel"` with proper relationships
- **Keyboard Navigation**: 
  - Arrow keys to navigate between tabs
  - Home/End to jump to first/last tab
  - Enter/Space to activate focused tab
  - Automatic skipping of disabled tabs
- **Screen Reader Support**: Proper labeling and state announcements
- **Focus Management**: Correct tabindex handling for keyboard users

## Keyboard Shortcuts

| Key | Action |
| --- | ------ |
| `→` / `←` | Navigate to next/previous tab (wraps around) |
| `Home` | Jump to first tab |
| `End` | Jump to last tab |
| `Enter` / `Space` | Activate focused tab |
| `Tab` | Move focus to next focusable element |

## Notes

- The component supports both controlled and uncontrolled modes
- Disabled tabs are skipped during keyboard navigation
- Tab content panels are optional (use `showContent` prop)
- All DaisyUI tab variants and sizes are supported
- The component is fully accessible and follows WCAG 2.1 AA guidelines
- **NEW**: Navigation tabs integrate with the existing Link component for proper routing
- **NEW**: Both array-based API and compound component pattern are supported
