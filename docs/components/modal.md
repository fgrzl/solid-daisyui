# Modal Component

## Overview
The Modal component is a flexible, accessible dialog implementation following DaisyUI standards. It provides a reusable way to display overlay content with proper focus management, keyboard navigation, and backdrop behavior.

The Modal component supports two APIs:
1. **Monolithic API**: A single Modal component with props (traditional approach)
2. **Compound API**: Composable components for more declarative usage (recommended for complex modals)

## Usage

### Basic Modal (Monolithic API)
```tsx
import { createSignal } from "solid-js";
import { Modal } from "solid-daisyui";

function App() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <h3>Modal Title</h3>
        <p>Modal content goes here...</p>
      </Modal>
    </>
  );
}
```

### Compound API (Recommended)
The compound API provides a more declarative and flexible way to compose modals:

```tsx
import { createSignal } from "solid-js";
import { modal } from "solid-daisyui";

function App() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <modal.overlay isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.content>
          <modal.title>Delete User</modal.title>
          <modal.description>
            This action cannot be undone. Are you sure?
          </modal.description>
          <modal.actions>
            <button data-modal-close="">Cancel</button>
            <button variant="danger">Delete</button>
          </modal.actions>
        </modal.content>
      </modal.overlay>
    </>
  );
}
```

### Alternative Compound API (Capitalized)
You can also use the capitalized version for consistency with other component libraries:

```tsx
import { createSignal } from "solid-js";
import { Modal2 } from "solid-daisyui";

function App() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal2.Overlay isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <Modal2.Content>
          <Modal2.Title>Delete User</Modal2.Title>
          <Modal2.Description>
            This action cannot be undone. Are you sure?
          </Modal2.Description>
          <Modal2.Actions>
            <button data-modal-close="">Cancel</button>
            <button variant="danger">Delete</button>
          </Modal2.Actions>
        </Modal2.Content>
      </Modal2.Overlay>
    </>
  );
}
```

### Individual Component Imports
For even more flexibility, you can import components individually:

```tsx
import { createSignal } from "solid-js";
import { 
  ModalOverlay, 
  ModalContent, 
  ModalTitle, 
  ModalDescription, 
  ModalActions 
} from "solid-daisyui";

function App() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <ModalOverlay isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalTitle>Delete User</ModalTitle>
          <ModalDescription>
            This action cannot be undone. Are you sure?
          </ModalDescription>
          <ModalActions>
            <button data-modal-close="">Cancel</button>
            <button>Delete</button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}
```

### Modal with Actions
```tsx
import { createSignal } from "solid-js";
import { Modal } from "solid-daisyui";

function App() {
  const [isOpen, setIsOpen] = createSignal(false);

  const actions = (
    <div class="modal-action">
      <button class="btn" onClick={() => setIsOpen(false)}>Cancel</button>
      <button class="btn btn-primary" onClick={() => setIsOpen(false)}>Confirm</button>
    </div>
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)} actions={actions}>
        <h3>Confirm Action</h3>
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  );
}
```

### Variants and Sizes
```tsx
// Position variants
<Modal variant="top" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <p>Top positioned modal</p>
</Modal>

<Modal variant="middle" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <p>Middle positioned modal (default)</p>
</Modal>

<Modal variant="bottom" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <p>Bottom positioned modal</p>
</Modal>

// Size variants
<Modal size="xs" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <p>Extra small modal</p>
</Modal>

<Modal size="lg" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <p>Large modal</p>
</Modal>
```

## Compound API Features

The compound API provides several advantages:

### Automatic Modal Closing
Buttons with the `data-modal-close` attribute automatically close the modal:

```tsx
<modal.overlay isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <modal.content>
    <modal.actions>
      <button data-modal-close="">Cancel</button> {/* Automatically closes modal */}
      <button onClick={handleSave}>Save</button>   {/* Custom handler */}
    </modal.actions>
  </modal.content>
</modal.overlay>
```

### Semantic HTML Elements
Title and Description components support different HTML elements:

```tsx
<modal.overlay isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <modal.content>
    {/* Custom heading level for proper hierarchy */}
    <modal.title as="h2" id="modal-title">Modal Title</modal.title>
    
    {/* Custom element type */}
    <modal.description as="div" id="modal-desc">
      Complex description content
    </modal.description>
  </modal.content>
</modal.overlay>
```

### Size and Positioning
Size and position variants work with the compound API:

```tsx
{/* Position variant on overlay */}
<modal.overlay variant="top" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  {/* Size variant on content */}
  <modal.content size="lg">
    <modal.title>Large Top Modal</modal.title>
  </modal.content>
</modal.overlay>
```

## Props

### Modal Component (Monolithic API)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | **Required.** Controls whether the modal is visible |
| `onClose` | `() => void` | - | Callback function called when the modal should be closed |
| `children` | `JSX.Element` | - | The content to display inside the modal |
| `class` | `string` | - | Additional CSS classes to apply to the modal container |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `variant` | `"bottom" \| "middle" \| "top"` | `"middle"` | The vertical position variant of the modal |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | - | The size variant of the modal box |
| `modalBoxClass` | `string` | - | Additional CSS classes to apply to the modal box |
| `actions` | `JSX.Element` | - | Action buttons to display at the bottom of the modal |
| `closeOnBackdrop` | `boolean` | `true` | Whether clicking the backdrop should close the modal |
| `closeOnEscape` | `boolean` | `true` | Whether pressing Escape should close the modal |
| `aria-label` | `string` | - | Accessible label for the modal |
| `aria-labelledby` | `string` | - | ID of the element that labels the modal |
| `aria-describedby` | `string` | - | ID of the element that describes the modal |

### ModalOverlay Component (Compound API)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | **Required.** Controls whether the modal is visible |
| `onClose` | `() => void` | - | Callback function called when the modal should be closed |
| `children` | `JSX.Element` | - | The content to display inside the modal overlay |
| `class` | `string` | - | Additional CSS classes to apply to the modal container |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `variant` | `"bottom" \| "middle" \| "top"` | `"middle"` | The vertical position variant of the modal |
| `closeOnBackdrop` | `boolean` | `true` | Whether clicking the backdrop should close the modal |
| `closeOnEscape` | `boolean` | `true` | Whether pressing Escape should close the modal |
| `aria-label` | `string` | - | Accessible label for the modal |
| `aria-labelledby` | `string` | - | ID of the element that labels the modal |
| `aria-describedby` | `string` | - | ID of the element that describes the modal |

### ModalContent Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | The content to display inside the modal content area |
| `class` | `string` | - | Additional CSS classes to apply to the modal content |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | - | The size variant of the modal content |

### ModalTitle Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | The title text or content to display |
| `class` | `string` | - | Additional CSS classes to apply to the title |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `id` | `string` | - | ID for the title element, useful for aria-labelledby references |
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"` | The HTML element to render as |

### ModalDescription Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | The description text or content to display |
| `class` | `string` | - | Additional CSS classes to apply to the description |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `id` | `string` | - | ID for the description element, useful for aria-describedby references |
| `as` | `"p" \| "div" \| "span"` | `"p"` | The HTML element to render as |

### ModalActions Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | The action buttons or content to display |
| `class` | `string` | - | Additional CSS classes to apply to the actions container |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |

## Accessibility

The Modal component implements comprehensive accessibility features:

- **ARIA Attributes**: Supports `role="dialog"`, `aria-modal="true"`, and labeling attributes
- **Keyboard Navigation**: 
  - **Escape Key**: Closes the modal (can be disabled with `closeOnEscape={false}`)
  - **Focus Management**: Modal box receives focus when opened with `tabIndex={-1}`
- **Screen Reader Support**: 
  - Proper semantic markup with dialog role
  - Support for aria-label, aria-labelledby, and aria-describedby
- **Focus Trapping**: Modal content area is focusable to contain keyboard navigation

### Accessibility Example
```tsx
<Modal 
  isOpen={isOpen()} 
  onClose={() => setIsOpen(false)}
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h3 id="modal-title">Delete Confirmation</h3>
  <p id="modal-desc">This action cannot be undone. Are you sure?</p>
</Modal>
```

## Behavior

### Backdrop Interaction
- Clicking the backdrop (dark overlay) closes the modal by default
- This can be disabled by setting `closeOnBackdrop={false}`
- Clicking the modal box itself does not close the modal

### Keyboard Interaction
- **Escape Key**: Closes the modal (default behavior)
- Can be disabled with `closeOnEscape={false}`

### State Management
- The component is controlled - you manage the open/closed state
- Use SolidJS signals for reactive state management
- The modal renders only when `isOpen` is `true`

## Styling

The Modal component uses standard DaisyUI classes:

- `.modal`: Container class with backdrop
- `.modal-open`: Applied when modal is open
- `.modal-box`: Content container
- `.modal-action`: Optional actions container

### Custom Styling
```tsx
// Custom modal container class
<Modal class="custom-modal" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <p>Custom styled modal</p>
</Modal>

// Custom modal box class
<Modal modalBoxClass="custom-box" isOpen={isOpen()} onClose={() => setIsOpen(false)}>
  <p>Custom box styling</p>
</Modal>

// Dynamic classes with classList
<Modal 
  classList={{ "error-modal": hasError(), "success-modal": !hasError() }}
  isOpen={isOpen()} 
  onClose={() => setIsOpen(false)}
>
  <p>Conditionally styled modal</p>
</Modal>
```

## DaisyUI Integration

This component follows the official [DaisyUI Modal documentation](https://daisyui.com/components/modal/) and supports:

- All position variants (top, middle, bottom)
- Responsive sizing options
- Standard DaisyUI styling and classes
- Compatible with DaisyUI themes and customization

## Examples

### Confirmation Dialog (Monolithic API)
```tsx
function ConfirmationDialog() {
  const [isOpen, setIsOpen] = createSignal(false);
  
  const handleConfirm = () => {
    // Perform action
    setIsOpen(false);
  };

  const actions = (
    <div class="modal-action">
      <button class="btn" onClick={() => setIsOpen(false)}>Cancel</button>
      <button class="btn btn-error" onClick={handleConfirm}>Delete</button>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen()} 
      onClose={() => setIsOpen(false)}
      actions={actions}
      aria-labelledby="confirm-title"
    >
      <h3 id="confirm-title" class="font-bold text-lg">Confirm Deletion</h3>
      <p class="py-4">This will permanently delete the item. Continue?</p>
    </Modal>
  );
}
```

### Confirmation Dialog (Compound API)
```tsx
function ConfirmationDialog() {
  const [isOpen, setIsOpen] = createSignal(false);
  
  const handleConfirm = () => {
    // Perform action
    setIsOpen(false);
  };

  return (
    <modal.overlay 
      isOpen={isOpen()} 
      onClose={() => setIsOpen(false)}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
    >
      <modal.content>
        <modal.title id="confirm-title">Confirm Deletion</modal.title>
        <modal.description id="confirm-desc">
          This will permanently delete the item. Continue?
        </modal.description>
        <modal.actions>
          <button class="btn" data-modal-close="">Cancel</button>
          <button class="btn btn-error" onClick={handleConfirm}>Delete</button>
        </modal.actions>
      </modal.content>
    </modal.overlay>
  );
}
```

### Form Modal
```tsx
function FormModal() {
  const [isOpen, setIsOpen] = createSignal(false);
  
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Handle form submission
    setIsOpen(false);
  };

  return (
    <modal.overlay 
      isOpen={isOpen()} 
      onClose={() => setIsOpen(false)}
      aria-labelledby="form-title"
    >
      <modal.content size="lg">
        <modal.title id="form-title">Create New Item</modal.title>
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="label">Name</label>
            <input type="text" class="input input-bordered w-full" required />
          </div>
          <div>
            <label class="label">Description</label>
            <textarea class="textarea textarea-bordered w-full"></textarea>
          </div>
          <modal.actions>
            <button type="button" class="btn" data-modal-close="">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </modal.actions>
        </form>
      </modal.content>
    </modal.overlay>
  );
}
```

## Notes

- Modal components should be placed near the root of your application to avoid z-index issues
- The modal automatically handles backdrop clicks and escape key presses
- Use SolidJS createSignal for reactive state management
- The component follows WCAG 2.1 AA accessibility guidelines
- Compatible with all DaisyUI themes and customizations
