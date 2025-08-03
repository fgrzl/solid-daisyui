# Timeline Component

## Component Overview

The Timeline component displays a sequence of events or steps in chronological order, following official DaisyUI Timeline patterns. It provides a structured way to present information with support for different orientations, sizes, and accessibility features.

The Timeline consists of two main components:
- **Timeline**: The container that holds timeline items
- **TimelineItem**: Individual items within the timeline with content, icons, and metadata

## Usage Examples

### Basic Timeline
```tsx
import { Timeline, TimelineItem } from "solid-daisyui";

<Timeline>
  <TimelineItem title="Project Started" time="2023-01-01">
    Initial project setup and planning phase
  </TimelineItem>
  <TimelineItem title="Development Phase" time="2023-02-15">
    Core development and feature implementation
  </TimelineItem>
  <TimelineItem title="Testing & QA" time="2023-03-10">
    Quality assurance and bug fixes
  </TimelineItem>
</Timeline>
```

### Orientation Variants
```tsx
{/* Vertical timeline (default) */}
<Timeline orientation="vertical">
  <TimelineItem>Vertical layout</TimelineItem>
</Timeline>

{/* Horizontal timeline */}
<Timeline orientation="horizontal">
  <TimelineItem>Horizontal layout</TimelineItem>
</Timeline>
```

### Size Variants
```tsx
{/* Compact timeline */}
<Timeline size="compact">
  <TimelineItem>Compact size</TimelineItem>
</Timeline>

{/* Normal timeline */}
<Timeline size="normal">
  <TimelineItem>Normal size</TimelineItem>
</Timeline>
```

### Timeline with Snap Alignment
```tsx
<Timeline snap="icon">
  <TimelineItem>Icon-aligned timeline</TimelineItem>
</Timeline>
```

### Content Positioning
```tsx
<Timeline>
  {/* Content on the start side */}
  <TimelineItem position="start" title="Start Position" time="2023-01-01">
    Content appears on the start side of the timeline
  </TimelineItem>
  
  {/* Content on the end side */}
  <TimelineItem position="end" title="End Position" time="2023-01-02">
    Content appears on the end side of the timeline
  </TimelineItem>
</Timeline>
```

### Custom Icons
```tsx
<Timeline>
  <TimelineItem 
    icon={
      <div class="timeline-middle">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
    }
    title="Custom Icon Event"
  >
    Timeline item with custom icon
  </TimelineItem>
  
  {/* Default icon will be used when no icon specified */}
  <TimelineItem title="Default Icon Event">
    Timeline item with default icon
  </TimelineItem>
</Timeline>
```

### Rich Content Timeline
```tsx
<Timeline>
  <TimelineItem
    title="Project Milestone"
    subtitle="Development Phase"
    time="2023-03-15T10:30:00Z"
    state="completed"
  >
    <div>
      <p>Completed major development milestone with all core features.</p>
      <ul>
        <li>User authentication system</li>
        <li>Dashboard implementation</li>
        <li>API integration</li>
      </ul>
    </div>
  </TimelineItem>
  
  <TimelineItem
    title="Testing Phase"
    subtitle="Quality Assurance"
    time="2023-03-20T14:00:00Z"
    state="current"
  >
    Currently running comprehensive tests across all modules.
  </TimelineItem>
  
  <TimelineItem
    title="Release Preparation"
    subtitle="Final Steps"
    time="2023-03-25T09:00:00Z"
    state="pending"
  >
    Preparing for production release and documentation updates.
  </TimelineItem>
</Timeline>
```

### Accessible Timeline
```tsx
<Timeline 
  aria-label="Project development timeline"
  aria-describedby="timeline-description"
>
  <TimelineItem 
    aria-label="Project milestone completed on March 15th"
    title="Milestone Achieved"
    time="2023-03-15"
  >
    Major development milestone completed successfully
  </TimelineItem>
</Timeline>
```

## Props

### Timeline Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The timeline items to display |
| class | `string` | - | Additional CSS classes to apply to the timeline |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| orientation | `"vertical" \| "horizontal"` | - | **DaisyUI**: Timeline orientation (timeline-vertical, timeline-horizontal) |
| size | `"compact" \| "normal"` | - | **DaisyUI**: Size variant (timeline-compact, timeline-normal) |
| snap | `"icon"` | - | **DaisyUI**: Snap alignment (timeline-snap-icon) |
| aria-label | `string` | - | Accessible label for the timeline |
| aria-describedby | `string` | - | ID of element that describes the timeline |

### TimelineItem Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The content to display in the timeline item |
| class | `string` | - | Additional CSS classes to apply to the timeline item |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| position | `"start" \| "end"` | `"start"` | Position of content relative to the timeline |
| icon | `JSX.Element` | - | Custom icon to display in the timeline middle |
| title | `string` | - | Title text for the timeline item |
| subtitle | `string` | - | Subtitle text for the timeline item |
| time | `string` | - | Time/date information (will be used in datetime attribute) |
| state | `"completed" \| "current" \| "pending"` | - | Visual state of the timeline item |
| aria-label | `string` | - | Accessible label for the timeline item |

## Accessibility Features

- **Semantic Structure**: Uses proper `ul`/`li` HTML structure with `role="list"` and `role="listitem"`
- **ARIA Attributes**: Support for `aria-label` and `aria-describedby` on both components
- **Time Elements**: Proper `<time>` elements with `datetime` attributes for temporal information
- **Screen Reader Support**: Logical content flow and proper labeling for assistive technologies
- **Keyboard Navigation**: Full keyboard accessibility through standard focus order
- **Semantic Markup**: Meaningful heading structure with title/subtitle hierarchy

## DaisyUI Classes Used

### Timeline Classes
- `timeline` - Base timeline container class
- `timeline-vertical` - Vertical orientation layout
- `timeline-horizontal` - Horizontal orientation layout
- `timeline-compact` - Compact size variant
- `timeline-normal` - Normal size variant
- `timeline-snap-icon` - Icon snap alignment

### Timeline Item Classes
- `timeline-start` - Content positioned on the start side
- `timeline-middle` - Icon/indicator area in the center
- `timeline-end` - Content positioned on the end side

## Component Structure

The Timeline component follows DaisyUI's structure:

```html
<ul class="timeline">
  <li>
    <div class="timeline-start"><!-- Start content --></div>
    <div class="timeline-middle"><!-- Icon/indicator --></div>
    <div class="timeline-end"><!-- End content --></div>
    <hr />
  </li>
  <!-- More timeline items... -->
</ul>
```

## Notes

- **Content Positioning**: Items can display content on either the start or end side of the timeline
- **Flexible Icons**: Support for custom icons with sensible defaults provided
- **Time Handling**: Automatic `datetime` attribute generation for proper semantic time elements
- **Responsive Design**: Works well with DaisyUI responsive utilities
- **Default Behavior**: When no orientation is specified, DaisyUI default behavior is used
- **State Management**: Visual states can be implemented through CSS classes or custom styling
- **Accessibility**: Full WCAG 2.1 AA compliance with proper semantic structure and ARIA support
