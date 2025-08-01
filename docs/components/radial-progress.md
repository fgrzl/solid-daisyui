# Radial Progress Component

The RadialProgress component displays a circular progress indicator with DaisyUI styling and full accessibility support.

## Basic Usage

```tsx
import { RadialProgress } from "solid-daisyui";

function MyComponent() {
  return <RadialProgress value={70}>70%</RadialProgress>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value (0-100) |
| `children` | `JSX.Element` | - | Content to display inside the progress circle |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the radial progress |
| `color` | `"primary" \| "secondary" \| "accent" \| "info" \| "success" \| "warning" \| "error"` | - | Color variant |
| `thickness` | `string` | - | Custom thickness of the progress ring |
| `customSize` | `string` | - | Custom size (CSS value, overrides size prop) |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic CSS classes |
| `aria-label` | `string` | - | ARIA label for accessibility |
| `id` | `string` | - | HTML id attribute |

## Examples

### Basic Progress with Text

```tsx
<RadialProgress value={75}>75%</RadialProgress>
```

### Different Sizes

```tsx
<RadialProgress value={25} size="xs">25%</RadialProgress>
<RadialProgress value={50} size="sm">50%</RadialProgress>
<RadialProgress value={75} size="md">75%</RadialProgress>
<RadialProgress value={90} size="lg">90%</RadialProgress>
<RadialProgress value={100} size="xl">100%</RadialProgress>
```

### Color Variants

```tsx
<RadialProgress value={60} color="primary">60%</RadialProgress>
<RadialProgress value={70} color="secondary">70%</RadialProgress>
<RadialProgress value={80} color="accent">80%</RadialProgress>
<RadialProgress value={50} color="info">50%</RadialProgress>
<RadialProgress value={90} color="success">90%</RadialProgress>
<RadialProgress value={30} color="warning">30%</RadialProgress>
<RadialProgress value={20} color="error">20%</RadialProgress>
```

### Custom Styling

```tsx
// Custom thickness
<RadialProgress value={65} thickness="4px">65%</RadialProgress>

// Custom size
<RadialProgress value={85} customSize="8rem">85%</RadialProgress>

// Without text
<RadialProgress value={40} />

// With custom content
<RadialProgress value={95}>
  <span class="text-sm font-bold">DONE</span>
</RadialProgress>
```

### Interactive Example

```tsx
function InteractiveProgress() {
  const [progress, setProgress] = createSignal(0);
  
  const increment = () => {
    setProgress(prev => Math.min(100, prev + 10));
  };
  
  const reset = () => {
    setProgress(0);
  };

  return (
    <div class="flex flex-col items-center gap-4">
      <RadialProgress 
        value={progress()} 
        color="primary" 
        size="lg"
      >
        {progress()}%
      </RadialProgress>
      
      <div class="flex gap-2">
        <button class="btn btn-primary" onClick={increment}>
          +10%
        </button>
        <button class="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
```

## Accessibility

The RadialProgress component includes comprehensive accessibility support:

- Proper ARIA attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- Automatic accessibility labels with progress percentage
- Support for custom `aria-label` for specific use cases
- Value clamping to ensure valid progress values (0-100)
- Screen reader compatible progress announcements
