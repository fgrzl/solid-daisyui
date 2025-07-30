# Solid DaisyUI

A comprehensive SolidJS component library for DaisyUI components.

## Installation

```bash
npm install solid-daisyui
# or
yarn add solid-daisyui
# or
pnpm add solid-daisyui
```

## Usage

```tsx
import { Button, Card, Modal } from "solid-daisyui";

function App() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Click me!
      </Button>

      <Card>
        <h2>Card Title</h2>
        <p>Card content goes here.</p>
      </Card>
    </div>
  );
}
```

## Components

This library provides SolidJS components for all DaisyUI components:

### Actions

- **Button**
- **Dropdown**
- **Modal**
- **Swap**

### Data Display

- **Avatar**
- **Badge**
- **Card**
- **Carousel**
- **Collapse**
- **Countdown**
- **Kbd**
- **Stat**
- **Table**

### Data Input

- **Checkbox**
- **File Input**
- **Input**
- **Radio**
- **Range**
- **Rating**
- **Select**
- **Textarea**
- **Toggle**

### Layout

- **Artboard**
- **Divider**
- **Drawer**
- **Footer**
- **Hero**
- **Indicator**
- **Join**
- **Mask**
- **Stack**

### Navigation

- **Breadcrumbs**
- **Bottom Navigation**
- **Link**
- **Menu**
- **Navbar**
- **Pagination**
- **Steps**
- **Tab**

### Feedback

- **Alert**
- **Loading**
- **Progress**
- **Radial Progress**
- **Skeleton**
- **Toast**
- **Tooltip**

### Chat

- **Chat Bubble** - Chat bubble component for messaging interfaces

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook
```

## TypeScript Support

This library is written in TypeScript and provides full type definitions for all components.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
