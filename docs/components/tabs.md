# Tabs Component

## Component Overview

The Tabs component provides a comprehensive tabbed interface for organizing content into multiple panels. Built with SolidJS and styled using DaisyUI, it offers advanced features including keyboard navigation, accessibility support, lazy loading, and multiple visual variants.

This is a **composite component system** consisting of three main components:
- `Tabs` - The main container component
- `Tab` - Individual tab buttons  
- `TabContent` - Content panels (optional, can be used independently)

## Features

- ✅ **Full DaisyUI Integration** - All official variants and modifiers
- ✅ **WCAG 2.1 AA Accessibility** - Complete keyboard navigation and ARIA support
- ✅ **Advanced State Management** - Both controlled and uncontrolled modes
- ✅ **Keyboard Navigation** - Arrow keys, Home, End with proper focus management
- ✅ **Lazy Loading** - Optimize performance with lazy-rendered content
- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **Flexible Architecture** - Composable components for different use cases

## Basic Usage

### Simple Tabs

```tsx
import { Tabs, Tab } from "solid-daisyui";

function BasicExample() {
  return (
    <Tabs>
      <Tab>Home</Tab>
      <Tab>Services</Tab>
      <Tab>About</Tab>
      <Tab>Contact</Tab>
    </Tabs>
  );
}
```

### Tabs with Content Panels

```tsx
import { Tabs, Tab, TabContent } from "solid-daisyui";
import { createSignal } from "solid-js";

function TabsWithContent() {
  const [activeTab, setActiveTab] = createSignal(0);

  return (
    <div>
      <Tabs activeTab={activeTab()} onChange={setActiveTab}>
        <Tab>Dashboard</Tab>
        <Tab>Profile</Tab>
        <Tab>Settings</Tab>
      </Tabs>
      
      <div class="mt-4">
        <TabContent isActive={activeTab() === 0}>
          <div>Dashboard content here...</div>
        </TabContent>
        <TabContent isActive={activeTab() === 1}>
          <div>Profile content here...</div>
        </TabContent>
        <TabContent isActive={activeTab() === 2}>
          <div>Settings content here...</div>
        </TabContent>
      </div>
    </div>
  );
}
```

## DaisyUI Variants

### Bordered Tabs

```tsx
<Tabs variant="bordered">
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
  <Tab>Tab 3</Tab>
</Tabs>
```

### Lifted Tabs

```tsx
<Tabs variant="lifted">
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
  <Tab>Tab 3</Tab>
</Tabs>
```

### Boxed Tabs

```tsx
<Tabs variant="boxed">
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
  <Tab>Tab 3</Tab>
</Tabs>
```

### Size Variants

```tsx
{/* Extra Small */}
<Tabs size="xs">
  <Tab>Small Tab</Tab>
  <Tab>Another Tab</Tab>
</Tabs>

{/* Small */}
<Tabs size="sm">
  <Tab>Small Tab</Tab>
  <Tab>Another Tab</Tab>
</Tabs>

{/* Large */}
<Tabs size="lg">
  <Tab>Large Tab</Tab>
  <Tab>Another Tab</Tab>
</Tabs>
```

## Advanced Examples

### Controlled Mode with State Management

```tsx
import { createSignal } from "solid-js";

function ControlledTabs() {
  const [currentTab, setCurrentTab] = createSignal(1); // Start with second tab

  return (
    <Tabs 
      activeTab={currentTab()} 
      onChange={(index) => setCurrentTab(index)}
      variant="bordered"
    >
      <Tab>Overview</Tab>
      <Tab>Details</Tab>
      <Tab>History</Tab>
    </Tabs>
  );
}
```

### Tabs with Icons

```tsx
function TabsWithIcons() {
  return (
    <Tabs>
      <Tab icon={<HomeIcon />}>Home</Tab>
      <Tab icon={<UserIcon />}>Profile</Tab>
      <Tab icon={<SettingsIcon />}>Settings</Tab>
    </Tabs>
  );
}
```

### Disabled Tabs

```tsx
function DisabledTabExample() {
  return (
    <Tabs>
      <Tab>Available</Tab>
      <Tab disabled>Coming Soon</Tab>
      <Tab>Available</Tab>
    </Tabs>
  );
}
```

### Lazy Loading Content

```tsx
function LazyTabContent() {
  const [activeTab, setActiveTab] = createSignal(0);

  return (
    <div>
      <Tabs activeTab={activeTab()} onChange={setActiveTab}>
        <Tab>Instant</Tab>
        <Tab>Lazy Load</Tab>
        <Tab>Heavy Content</Tab>
      </Tabs>
      
      <div class="mt-4">
        {/* Always rendered */}
        <TabContent isActive={activeTab() === 0}>
          <div>Instant content - always in DOM</div>
        </TabContent>
        
        {/* Only rendered when active */}
        <TabContent isActive={activeTab() === 1} lazy>
          <ExpensiveComponent />
        </TabContent>
        
        {/* Only rendered when active */}
        <TabContent isActive={activeTab() === 2} lazy>
          <AnotherHeavyComponent />
        </TabContent>
      </div>
    </div>
  );
}
```

## Props

### Tabs Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Tab components to display |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `variant` | `"bordered" \| "lifted" \| "boxed"` | - | DaisyUI style variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | - | Size of the tabs |
| `activeTab` | `number` | - | Currently active tab index (controlled mode) |
| `defaultActiveTab` | `number` | `0` | Initially active tab index (uncontrolled mode) |
| `onChange` | `(index: number) => void` | - | Callback when active tab changes |
| `ariaLabel` | `string` | `"Tabs"` | Custom aria-label for the tabs container |

### Tab Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Content to display in the tab |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `icon` | `JSX.Element` | - | Optional icon to display in the tab |
| `onClick` | `() => void` | - | Callback when tab is clicked |

### TabContent Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Content to display in the panel |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `isActive` | `boolean` | `false` | Whether this content panel is active |
| `id` | `string` | - | ID for the tab panel element |
| `labelledBy` | `string` | - | ID of the tab that controls this panel |
| `lazy` | `boolean` | `false` | Whether to render content only when active |

## Accessibility

The Tabs component provides comprehensive accessibility support following WCAG 2.1 AA standards:

### ARIA Attributes
- `role="tablist"` on the tabs container
- `role="tab"` on each tab button
- `role="tabpanel"` on content panels
- `aria-selected` indicates the active tab
- `aria-disabled` for disabled tabs
- `aria-labelledby` connects panels to their tabs

### Keyboard Navigation
- **Arrow Keys**: Navigate between tabs
- **Home**: Jump to first tab
- **End**: Jump to last tab
- **Enter/Space**: Activate focused tab
- **Tab**: Standard focus navigation

### Screen Reader Support
- Proper announcements for tab changes
- Content panels properly associated with tabs
- Disabled state clearly announced

## Performance Optimization

### Lazy Loading
Use the `lazy` prop on `TabContent` components to defer rendering until the content becomes active:

```tsx
<TabContent isActive={isActive} lazy>
  <HeavyComponent />
</TabContent>
```

### Memoization
For expensive tab content, consider using SolidJS's `createMemo`:

```tsx
const expensiveContent = createMemo(() => {
  return processLargeDataSet(data());
});
```

## Styling and Customization

### CSS Classes Applied

**Tabs Container:**
- `tabs` - Base DaisyUI tabs class
- `tabs-bordered` - When variant="bordered"
- `tabs-lifted` - When variant="lifted"  
- `tabs-boxed` - When variant="boxed"
- `tabs-xs`, `tabs-sm`, `tabs-lg` - Size modifiers

**Individual Tabs:**
- `tab` - Base tab class
- `tab-active` - Active tab state
- `tab-disabled` - Disabled tab state

### Custom Styling

```tsx
<Tabs 
  class="my-custom-tabs" 
  classList={{ "special-state": someCondition() }}
>
  <Tab class="custom-tab">Custom Tab</Tab>
</Tabs>
```

## Common Use Cases

### Navigation Tabs
```tsx
function NavigationTabs() {
  return (
    <Tabs variant="bordered">
      <Tab>Dashboard</Tab>
      <Tab>Projects</Tab>
      <Tab>Team</Tab>
      <Tab>Settings</Tab>
    </Tabs>
  );
}
```

### Settings Panels
```tsx
function SettingsTabs() {
  const [activeTab, setActiveTab] = createSignal(0);

  return (
    <div>
      <Tabs activeTab={activeTab()} onChange={setActiveTab} variant="boxed">
        <Tab>General</Tab>
        <Tab>Security</Tab>
        <Tab>Notifications</Tab>
        <Tab>Billing</Tab>
      </Tabs>
      
      <div class="card bg-base-100 shadow-xl mt-4">
        <div class="card-body">
          <TabContent isActive={activeTab() === 0}>
            <GeneralSettings />
          </TabContent>
          <TabContent isActive={activeTab() === 1} lazy>
            <SecuritySettings />
          </TabContent>
          <TabContent isActive={activeTab() === 2} lazy>
            <NotificationSettings />
          </TabContent>
          <TabContent isActive={activeTab() === 3} lazy>
            <BillingSettings />
          </TabContent>
        </div>
      </div>
    </div>
  );
}
```

### Product Information Tabs
```tsx
function ProductTabs() {
  return (
    <div>
      <Tabs variant="lifted" size="lg">
        <Tab>Description</Tab>
        <Tab>Specifications</Tab>
        <Tab>Reviews</Tab>
        <Tab>Q&A</Tab>
      </Tabs>
      
      {/* Content panels... */}
    </div>
  );
}
```

## Best Practices

1. **Use Lazy Loading**: For heavy content that's not immediately visible
2. **Controlled vs Uncontrolled**: Use controlled mode when you need to programmatically change tabs
3. **Accessibility**: Always ensure proper tab order and keyboard navigation
4. **Content Organization**: Keep related content grouped logically
5. **Performance**: Avoid rendering all content panels simultaneously for large datasets
6. **Visual Hierarchy**: Use appropriate size and variant based on context

## Integration with Other Components

The Tabs component works well with other solid-daisyui components:

```tsx
function IntegratedExample() {
  return (
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">User Dashboard</h2>
        
        <Tabs variant="bordered">
          <Tab icon={<Badge />}>Overview</Tab>
          <Tab icon={<Button />}>Actions</Tab>
          <Tab icon={<Alert />}>Alerts</Tab>
        </Tabs>
        
        <div class="divider"></div>
        
        {/* Content areas... */}
      </div>
    </div>
  );
}
```

## Notes

- The Tabs component automatically manages tab registration and indexing
- Tab components must be direct children of the Tabs component
- TabContent can be used independently for flexible layouts
- The component is fully SSR-compatible
- All DaisyUI theme variables are respected
- Context-based communication ensures proper state synchronization between parent and child components
