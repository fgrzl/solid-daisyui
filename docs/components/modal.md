# Modal Component

## Overview
The Modal component is a flexible, accessible dialog implementation following DaisyUI standards. It provides a reusable way to display overlay content with proper focus management, keyboard navigation, and backdrop behavior.

## Usage

### Basic Modal
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

## Props

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

### Confirmation Dialog
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
    <Modal 
      isOpen={isOpen()} 
      onClose={() => setIsOpen(false)}
      size="lg"
      aria-labelledby="form-title"
    >
      <h3 id="form-title" class="font-bold text-lg mb-4">Create New Item</h3>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="label">Name</label>
          <input type="text" class="input input-bordered w-full" required />
        </div>
        <div>
          <label class="label">Description</label>
          <textarea class="textarea textarea-bordered w-full"></textarea>
        </div>
        <div class="modal-action">
          <button type="button" class="btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
```

## Notes

- Modal components should be placed near the root of your application to avoid z-index issues
- The modal automatically handles backdrop clicks and escape key presses
- Use SolidJS createSignal for reactive state management
- The component follows WCAG 2.1 AA accessibility guidelines
- Compatible with all DaisyUI themes and customizations
