# Calendar Component

## Component Overview

The Calendar component provides a comprehensive date selection interface following DaisyUI design standards and SolidJS reactive patterns. It supports single date selection, multiple date selection, and date range selection with full keyboard navigation and accessibility features.

## Features

- ✅ **Single, Multiple, and Range Selection** - Flexible date selection modes
- ✅ **DaisyUI Integration** - Supports all DaisyUI variants and modifiers
- ✅ **Keyboard Navigation** - Full arrow key navigation with Enter/Space selection
- ✅ **Accessibility** - WCAG 2.1 AA compliant with proper ARIA attributes
- ✅ **Month Navigation** - Previous/next month controls with callbacks
- ✅ **Date Constraints** - Min/max dates and disabled date support
- ✅ **Customizable** - Week start day, date formats, and styling options

## Usage Examples

### Basic Calendar

```tsx
import { Calendar } from "solid-daisyui";

function BasicExample() {
  return <Calendar />;
}
```

### Date Selection

```tsx
import { Calendar } from "solid-daisyui";
import { createSignal } from "solid-js";

function DateSelectionExample() {
  const [selectedDate, setSelectedDate] = createSignal<Date>();

  return (
    <Calendar 
      selectedDate={selectedDate()}
      onDateSelect={setSelectedDate}
    />
  );
}
```

### Range Selection

```tsx
import { Calendar, DateRange } from "solid-daisyui";
import { createSignal } from "solid-js";

function RangeSelectionExample() {
  const [dateRange, setDateRange] = createSignal<DateRange>();

  return (
    <Calendar 
      range
      selectedRange={dateRange()}
      onRangeSelect={setDateRange}
    />
  );
}
```

### Multiple Date Selection

```tsx
import { Calendar } from "solid-daisyui";
import { createSignal } from "solid-js";

function MultipleSelectionExample() {
  const [selectedDates, setSelectedDates] = createSignal<Date[]>([]);

  return (
    <Calendar 
      multiple
      selectedDates={selectedDates()}
      onMultipleSelect={setSelectedDates}
    />
  );
}
```

### DaisyUI Variants

```tsx
import { Calendar } from "solid-daisyui";

function VariantsExample() {
  return (
    <div class="space-y-4">
      {/* Size variants */}
      <Calendar size="sm" />
      <Calendar size="lg" />
      
      {/* Style variants */}
      <Calendar variant="bordered" />
      <Calendar variant="compact" />
    </div>
  );
}
```

### Date Constraints

```tsx
import { Calendar } from "solid-daisyui";

function ConstraintsExample() {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const disabledDates = [
    new Date(2024, 0, 1), // New Year's Day
    new Date(2024, 6, 4), // Independence Day
  ];

  return (
    <Calendar 
      minDate={today}
      maxDate={nextMonth}
      disabledDates={disabledDates}
    />
  );
}
```

### Custom Week Start

```tsx
import { Calendar } from "solid-daisyui";

function WeekStartExample() {
  return (
    <div class="space-y-4">
      {/* Start week on Sunday (default) */}
      <Calendar weekStartsOn={0} />
      
      {/* Start week on Monday */}
      <Calendar weekStartsOn={1} />
    </div>
  );
}
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant using DaisyUI classes |
| `variant` | `"bordered" \| "compact"` | - | Style variant using DaisyUI classes |
| `class` | `string` | - | Additional CSS classes |
| `classList` | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| `currentDate` | `Date` | `new Date()` | Currently displayed month/year |
| `selectedDate` | `Date` | - | Currently selected date (single selection) |
| `selectedDates` | `Date[]` | - | Array of selected dates (multiple selection) |
| `selectedRange` | `DateRange` | - | Selected date range (range selection) |
| `multiple` | `boolean` | `false` | Enable multiple date selection |
| `range` | `boolean` | `false` | Enable date range selection |
| `disabledDates` | `Date[]` | - | Array of dates to disable |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | Day to start week (0=Sunday, 1=Monday, etc.) |
| `dateFormat` | `string` | - | Custom date format for accessibility labels |
| `onDateSelect` | `(date: Date) => void` | - | Callback when a date is selected |
| `onMultipleSelect` | `(dates: Date[]) => void` | - | Callback when multiple dates are selected |
| `onRangeSelect` | `(range: DateRange) => void` | - | Callback when a date range is selected |
| `onMonthChange` | `(date: Date) => void` | - | Callback when displayed month changes |

## Types

### DateRange

```tsx
interface DateRange {
  start: Date;
  end: Date;
}
```

## Accessibility Features

- **Keyboard Navigation**: Full arrow key support for date navigation
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Focus Management**: Logical tab order and focus indicators
- **Semantic HTML**: Proper grid structure with roles and headers
- **Live Regions**: Date selection announcements for screen readers

### Keyboard Shortcuts

| Key | Action |
| --- | ------ |
| `Arrow Keys` | Navigate between dates |
| `Enter` / `Space` | Select focused date |
| `Tab` | Navigate to next/previous month buttons |

## DaisyUI Classes

The component uses these DaisyUI classes:

- **Base**: `calendar`
- **Sizes**: `calendar-sm`, `calendar-lg`
- **Variants**: `calendar-bordered`, `calendar-compact`
- **States**: `calendar-day`, `calendar-day-selected`, `calendar-day-disabled`

## Notes

- The component automatically handles month boundaries and leap years
- Date comparisons are done safely to handle timezone differences
- Invalid dates are gracefully handled with fallbacks to current date
- The component is fully controlled - state management is external
- Range selection requires two clicks: start date, then end date
- Multiple selection allows toggling dates on/off with repeated clicks

## Browser Compatibility

- Modern browsers with ES2020 support
- Screen readers: NVDA, JAWS, VoiceOver tested
- Keyboard navigation works across all supported browsers
