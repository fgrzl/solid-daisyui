# ChatBubble Component

The ChatBubble component provides a comprehensive, accessible chat bubble element with all DaisyUI styling options for messaging interfaces.

## Basic Usage

```tsx
import { ChatBubble } from "solid-daisyui";

function MyComponent() {
  return <ChatBubble>Hello! How are you doing today?</ChatBubble>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element \| string` | - | The message content to display |
| `side` | `"start" \| "end"` | `"start"` | Chat bubble alignment (start = left, end = right) |
| `color` | `"primary" \| "secondary" \| "accent" \| "info" \| "success" \| "warning" \| "error"` | - | Chat bubble color variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Chat bubble size |
| `avatar` | `string` | - | URL for the avatar image |
| `avatarAlt` | `string` | `"User avatar"` | Alt text for the avatar image |
| `avatarElement` | `JSX.Element` | - | Custom avatar element (overrides avatar URL) |
| `time` | `string \| JSX.Element` | - | Time stamp to display |
| `header` | `string \| JSX.Element` | - | Header content above the message |
| `footer` | `string \| JSX.Element` | - | Footer content below the message |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic CSS classes |

## Examples

### Basic Chat Messages

```tsx
// Left-aligned message (default)
<ChatBubble>Hi there!</ChatBubble>

// Right-aligned message  
<ChatBubble side="end">Hello back!</ChatBubble>
```

### Chat with Avatars

```tsx
// Using avatar URL
<ChatBubble 
  avatar="https://example.com/user1.jpg"
  avatarAlt="John Doe"
>
  Hey, how's it going?
</ChatBubble>

// Using custom avatar element
<ChatBubble 
  avatarElement={
    <div class="avatar placeholder">
      <div class="bg-neutral text-neutral-content rounded-full w-10">
        <span class="text-xl">JD</span>
      </div>
    </div>
  }
>
  Custom avatar message
</ChatBubble>
```

### Chat with Headers and Time

```tsx
<ChatBubble 
  header="John Doe"
  time="12:45"
  avatar="https://example.com/user1.jpg"
>
  This message has a header with timestamp
</ChatBubble>

// JSX time element
<ChatBubble 
  header="Jane Smith"
  time={<time class="text-xs opacity-50">2 minutes ago</time>}
>
  Message with relative time
</ChatBubble>
```

### Chat with Footer

```tsx
<ChatBubble 
  side="end"
  footer="Delivered"
>
  This message has a footer
</ChatBubble>

// JSX footer with status icons
<ChatBubble 
  side="end"
  footer={
    <div class="flex items-center gap-1">
      <span>✓✓</span>
      <span>Read</span>
    </div>
  }
>
  Message with read status
</ChatBubble>
```

### Colored Chat Bubbles

```tsx
<ChatBubble color="primary">Primary colored message</ChatBubble>
<ChatBubble color="secondary">Secondary colored message</ChatBubble>
<ChatBubble color="accent">Accent colored message</ChatBubble>
<ChatBubble color="info">Info colored message</ChatBubble>
<ChatBubble color="success">Success colored message</ChatBubble>
<ChatBubble color="warning">Warning colored message</ChatBubble>
<ChatBubble color="error">Error colored message</ChatBubble>
```

### Different Sizes

```tsx
<ChatBubble size="xs">Extra small message</ChatBubble>
<ChatBubble size="sm">Small message</ChatBubble>
<ChatBubble size="md">Medium message (default)</ChatBubble>
<ChatBubble size="lg">Large message</ChatBubble>
```

### Complete Chat Example

```tsx
function ChatExample() {
  return (
    <div class="flex flex-col gap-4">
      {/* Incoming message */}
      <ChatBubble 
        avatar="https://example.com/user1.jpg"
        avatarAlt="John Doe"
        header="John Doe"
        time="12:45 PM"
        color="primary"
      >
        Hey! Are we still meeting for lunch today?
      </ChatBubble>

      {/* Outgoing message */}
      <ChatBubble 
        side="end"
        color="accent"
        footer="Delivered"
      >
        Absolutely! See you at 1 PM at the usual place.
      </ChatBubble>

      {/* System message */}
      <ChatBubble 
        color="info"
        size="sm"
        class="mx-auto"
      >
        John Doe is typing...
      </ChatBubble>
    </div>
  );
}
```

### Rich Content Messages

```tsx
<ChatBubble 
  header="Support Agent"
  avatar="https://example.com/support.jpg"
  color="primary"
>
  <div>
    <p>Thank you for contacting us! Here's what I found:</p>
    <ul class="list-disc list-inside mt-2">
      <li>Your order #12345 was shipped</li>
      <li>Tracking number: ABC123456</li>
      <li>Expected delivery: Tomorrow</li>
    </ul>
    <div class="mt-3">
      <button class="btn btn-sm btn-outline">Track Package</button>
    </div>
  </div>
</ChatBubble>
```

## Accessibility

The ChatBubble component includes accessibility considerations:

- Semantic HTML structure for chat messages
- Proper alt text support for avatar images
- Time elements use semantic `<time>` tags when appropriate
- Compatible with screen readers for chat interfaces
