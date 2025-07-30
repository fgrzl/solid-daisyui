# Loading Component

The Loading component provides various animated loading indicators with DaisyUI styling for displaying loading states in your application.

## Basic Usage

```tsx
import { Loading } from "solid-daisyui";

function MyComponent() {
  return (
    <div>
      <Loading />
    </div>
  );
}
```

## Props

| Prop        | Type                                                              | Default     | Description                           |
| ----------- | ----------------------------------------------------------------- | ----------- | ------------------------------------- |
| `type`      | `"spinner" \| "dots" \| "ring" \| "ball" \| "bars" \| "infinity"` | `"spinner"` | Type of loading animation             |
| `size`      | `"xs" \| "sm" \| "md" \| "lg"`                                    | `"md"`      | Size of the loading indicator         |
| `color`     | `string`                                                          | -           | Color class for the loading indicator |
| `class`     | `string`                                                          | -           | Additional CSS classes                |
| `classList` | `Record<string, boolean>`                                         | -           | Dynamic CSS classes                   |

## Examples

### Basic Loading Indicator

```tsx
import { Loading } from "solid-daisyui";

function BasicLoading() {
  return <Loading />;
}
```

### Loading Types

```tsx
<Loading type="spinner" />
<Loading type="dots" />
<Loading type="ring" />
<Loading type="ball" />
<Loading type="bars" />
<Loading type="infinity" />
```

### Loading Sizes

```tsx
<Loading size="xs" />
<Loading size="sm" />
<Loading size="md" />
<Loading size="lg" />
```

### Loading with Colors

```tsx
<Loading color="text-primary" />
<Loading color="text-secondary" />
<Loading color="text-accent" />
<Loading color="text-success" />
<Loading color="text-warning" />
<Loading color="text-info" />
<Loading color="text-error" />
```

### Custom Styling

```tsx
<Loading class="my-4" />
<Loading classList={{ "opacity-50": isDisabled() }} />
```

### Loading States in Practice

```tsx
import { createSignal } from "solid-js";
import { Loading } from "solid-daisyui";

function DataFetcher() {
  const [loading, setLoading] = createSignal(true);
  const [data, setData] = createSignal(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data");
      const result = await response.json();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} class="btn btn-primary">
        Fetch Data
      </button>

      <div class="mt-4">
        {loading() ? (
          <div class="flex items-center gap-2">
            <Loading type="spinner" size="sm" />
            <span>Loading data...</span>
          </div>
        ) : (
          <div>
            {data() ? <pre>{JSON.stringify(data(), null, 2)}</pre> : "No data"}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Card with Loading State

```tsx
import { createSignal, onMount } from "solid-js";
import { Loading } from "solid-daisyui";

function UserCard() {
  const [user, setUser] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUser({ name: "John Doe", email: "john@example.com" });
    setLoading(false);
  });

  return (
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">User Profile</h2>

        {loading() ? (
          <div class="flex justify-center py-8">
            <Loading type="dots" size="lg" />
          </div>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {user()?.name}
            </p>
            <p>
              <strong>Email:</strong> {user()?.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Button with Loading State

```tsx
import { createSignal } from "solid-js";
import { Loading } from "solid-daisyui";

function SubmitButton() {
  const [submitting, setSubmitting] = createSignal(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button
      class="btn btn-primary"
      onClick={handleSubmit}
      disabled={submitting()}
    >
      {submitting() ? (
        <>
          <Loading type="spinner" size="xs" />
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
}
```

### Full Page Loading

```tsx
import { Loading } from "solid-daisyui";

function FullPageLoading() {
  return (
    <div class="fixed inset-0 bg-base-100 bg-opacity-80 flex items-center justify-center z-50">
      <div class="text-center">
        <Loading type="infinity" size="lg" color="text-primary" />
        <p class="mt-4 text-lg">Loading application...</p>
      </div>
    </div>
  );
}
```

## Accessibility

The Loading component includes comprehensive accessibility support:

- Proper semantic `span` element with `role="status"`
- ARIA label (`aria-label="Loading"`) for screen readers
- Non-interactive element that doesn't interfere with keyboard navigation
- Screen reader compatible loading announcements

## TypeScript Support

The Loading component is fully typed with TypeScript, providing comprehensive type safety for all props.

```tsx
interface LoadingProps {
  class?: string;
  classList?: Record<string, boolean>;
  size?: "xs" | "sm" | "md" | "lg";
  type?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
  color?: string;
}
```

## Notes

- The Loading component uses DaisyUI's loading utility classes for consistent styling
- All loading types are animated using CSS animations for smooth performance
- The component is designed to be lightweight and performant
- Color classes should use DaisyUI's text color utilities (e.g., `text-primary`, `text-success`)
- The component renders as a `<span>` element, making it suitable for inline use
- For accessibility, avoid using multiple loading indicators on the same page simultaneously
