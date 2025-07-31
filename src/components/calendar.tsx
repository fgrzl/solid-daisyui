import { JSX, createSignal, createEffect, createMemo, For, Show } from "solid-js";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isValid,
  addDays,
  isBefore,
  isAfter,
  isWithinInterval,
} from "date-fns";

/**
 * Range selection result for calendar range mode.
 *
 * @property {Date} start - The start date of the selected range.
 * @property {Date} end - The end date of the selected range.
 */
export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Props for the Calendar component.
 *
 * @property {"sm" | "md" | "lg"} [size] - The size variant of the calendar using DaisyUI classes.
 * @property {"bordered" | "compact"} [variant] - The style variant of the calendar using DaisyUI classes.
 * @property {string} [class] - Additional CSS classes to apply to the calendar container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {Date} [currentDate] - The currently displayed month/year. Defaults to current date.
 * @property {Date} [selectedDate] - The currently selected date for single selection mode.
 * @property {Date[]} [selectedDates] - Array of selected dates for multiple selection mode.
 * @property {DateRange} [selectedRange] - The selected date range for range selection mode.
 * @property {boolean} [multiple] - Enable multiple date selection mode.
 * @property {boolean} [range] - Enable date range selection mode.
 * @property {Date[]} [disabledDates] - Array of dates that should be disabled.
 * @property {Date} [minDate] - Minimum selectable date.
 * @property {Date} [maxDate] - Maximum selectable date.
 * @property {0 | 1 | 2 | 3 | 4 | 5 | 6} [weekStartsOn] - Day of week to start on (0=Sunday, 1=Monday, etc).
 * @property {string} [dateFormat] - Date format string using date-fns format patterns (e.g., "MM/dd/yyyy", "MMMM do, yyyy").
 * @property {(date: Date) => void} [onDateSelect] - Callback fired when a date is selected.
 * @property {(dates: Date[]) => void} [onMultipleSelect] - Callback fired when multiple dates are selected.
 * @property {(range: DateRange) => void} [onRangeSelect] - Callback fired when a date range is selected.
 * @property {(date: Date) => void} [onMonthChange] - Callback fired when the displayed month changes.
 */
export interface CalendarProps {
  size?: "sm" | "md" | "lg";
  variant?: "bordered" | "compact";
  class?: string;
  classList?: Record<string, boolean>;
  currentDate?: Date;
  selectedDate?: Date;
  selectedDates?: Date[];
  selectedRange?: DateRange;
  multiple?: boolean;
  range?: boolean;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  dateFormat?: string;
  onDateSelect?: (date: Date) => void;
  onMultipleSelect?: (dates: Date[]) => void;
  onRangeSelect?: (range: DateRange) => void;
  onMonthChange?: (date: Date) => void;
}

/**
 * Calendar component for date selection with full DaisyUI styling support.
 * Follows DaisyUI Calendar patterns with comprehensive accessibility features.
 * 
 * Uses date-fns for robust date handling, timezone safety, and internationalization support.
 * Implements reactive SolidJS patterns for optimal performance and proper state management.
 * 
 * Supports single date selection, multiple date selection, and date range selection modes.
 * Includes keyboard navigation, screen reader support, and full WCAG 2.1 AA compliance.
 * 
 * @example
 * ```tsx
 * // Basic calendar
 * <Calendar />
 * 
 * // Calendar with date selection
 * <Calendar 
 *   selectedDate={new Date()} 
 *   onDateSelect={(date) => console.log(date)} 
 * />
 * 
 * // Calendar with range selection
 * <Calendar 
 *   range 
 *   onRangeSelect={(range) => console.log(range.start, range.end)} 
 * />
 * 
 * // Calendar with DaisyUI variants and custom date format
 * <Calendar 
 *   size="lg" 
 *   variant="bordered" 
 *   dateFormat="MMMM do, yyyy"
 * />
 * ```
 * 
 * @param {CalendarProps} props - The properties to configure the Calendar component.
 * @returns {JSX.Element} The rendered Calendar component.
 */
export default function Calendar(props: CalendarProps): JSX.Element {
  // ===== STATE MANAGEMENT =====
  
  // Initialize current date, handle invalid dates gracefully
  const getValidDate = (date?: Date) => {
    if (!date || !isValid(date)) {
      return new Date();
    }
    return date;
  };

  const [displayDate, setDisplayDate] = createSignal(getValidDate(props.currentDate));
  const [selectedDates, setSelectedDates] = createSignal<Date[]>(props.selectedDates || []);
  const [rangeStart, setRangeStart] = createSignal<Date | null>(null);
  const [focusedDate, setFocusedDate] = createSignal<Date | null>(null);

  // Update display date when currentDate prop changes
  createEffect(() => {
    if (props.currentDate && isValid(props.currentDate)) {
      setDisplayDate(props.currentDate);
    }
  });

  // Sync selected dates with props
  createEffect(() => {
    if (props.selectedDates) {
      setSelectedDates(props.selectedDates);
    }
  });

  // Handle focus management reactively
  createEffect(() => {
    const focused = focusedDate();
    if (focused) {
      // Find the button for this date and focus it
      const dateButton = document.querySelector(
        `[data-date="${focused.getTime()}"]`
      ) as HTMLButtonElement;
      if (dateButton) {
        dateButton.focus();
      }
    }
  });

  // ===== COMPUTED VALUES =====

  // Week day names based on weekStartsOn
  const weekDays = createMemo(() => {
    const baseWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const startDay = props.weekStartsOn || 0;
    return [...baseWeekDays.slice(startDay), ...baseWeekDays.slice(0, startDay)];
  });

  // Get month display string
  const monthYearString = createMemo(() => {
    return format(displayDate(), "MMMM yyyy");
  });

  // Generate calendar days for current month
  const calendarDays = createMemo(() => {
    const monthStart = startOfMonth(displayDate());
    const monthEnd = endOfMonth(displayDate());
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: props.weekStartsOn || 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: props.weekStartsOn || 0 });
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  });

  // Build dynamic classes
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      calendar: true,
    };

    // Add size classes
    if (props.size) {
      baseClasses[`calendar-${props.size}`] = true;
    }

    // Add variant classes  
    if (props.variant) {
      baseClasses[`calendar-${props.variant}`] = true;
    }

    // Add custom class
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  // ===== DATE UTILITY FUNCTIONS =====

  // Check if a date is disabled
  const isDateDisabled = (date: Date): boolean => {
    // Check disabled dates array
    if (props.disabledDates?.some(disabled => isSameDay(disabled, date))) {
      return true;
    }
    
    // Check min/max constraints
    if (props.minDate && isBefore(date, props.minDate)) {
      return true;
    }
    
    if (props.maxDate && isAfter(date, props.maxDate)) {
      return true;
    }
    
    return false;
  };

  // Check if a date is selected
  const isDateSelected = (date: Date): boolean => {
    // Check single selected date
    if (props.selectedDate) {
      return isSameDay(date, props.selectedDate);
    }
    
    // Check multiple selected dates
    if (props.multiple && selectedDates().some(selected => isSameDay(selected, date))) {
      return true;
    }
    
    // Check range selection
    if (props.range && props.selectedRange) {
      const { start, end } = props.selectedRange;
      return isWithinInterval(date, { start, end });
    }
    
    return false;
  };

  // Check if date is in current month
  const isInCurrentMonth = (date: Date): boolean => {
    return isSameMonth(date, displayDate());
  };

  // Format date for accessibility
  const formatDateForAccessibility = (date: Date): string => {
    if (props.dateFormat) {
      // Use date-fns format with the provided pattern
      try {
        return format(date, props.dateFormat);
      } catch {
        // Fallback to default if custom format is invalid
        return format(date, "EEEE, MMMM do, yyyy");
      }
    }
    
    return format(date, "EEEE, MMMM do, yyyy");
  };

  // ===== EVENT HANDLERS =====

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    if (props.range) {
      handleRangeSelection(date);
    } else if (props.multiple) {
      handleMultipleSelection(date);
    } else {
      // Single selection
      props.onDateSelect?.(date);
    }
  };

  // Handle range selection logic
  const handleRangeSelection = (date: Date) => {
    const start = rangeStart();
    
    if (!start) {
      setRangeStart(date);
    } else {
      const range = start <= date 
        ? { start, end: date }
        : { start: date, end: start };
      
      props.onRangeSelect?.(range);
      setRangeStart(null);
    }
  };

  // Handle multiple selection logic
  const handleMultipleSelection = (date: Date) => {
    const current = selectedDates();
    const exists = current.some(selected => isSameDay(selected, date));
    
    let newSelection: Date[];
    if (exists) {
      newSelection = current.filter(selected => !isSameDay(selected, date));
    } else {
      newSelection = [...current, date];
    }
    
    setSelectedDates(newSelection);
    props.onMultipleSelect?.(newSelection);
    props.onDateSelect?.(date);
  };

  // ===== NAVIGATION HANDLERS =====

  // Navigate to previous month
  const navigatePrevMonth = () => {
    const newDate = subMonths(displayDate(), 1);
    setDisplayDate(newDate);
    props.onMonthChange?.(newDate);
  };

  // Navigate to next month
  const navigateNextMonth = () => {
    const newDate = addMonths(displayDate(), 1);
    setDisplayDate(newDate);
    props.onMonthChange?.(newDate);
  };

  // ===== KEYBOARD NAVIGATION =====

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent, date: Date) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleDateSelect(date);
        break;
        
      case "ArrowRight":
        event.preventDefault();
        navigateDate(date, 1);
        break;
        
      case "ArrowLeft":
        event.preventDefault();
        navigateDate(date, -1);
        break;
        
      case "ArrowDown":
        event.preventDefault();
        navigateDate(date, 7);
        break;
        
      case "ArrowUp":
        event.preventDefault();
        navigateDate(date, -7);
        break;
    }
  };

  // Navigate to a relative date and update focused date reactively
  const navigateDate = (currentDate: Date, dayOffset: number) => {
    const newDate = addDays(currentDate, dayOffset);
    
    // If we're going to a different month, update display
    if (!isSameMonth(newDate, currentDate)) {
      setDisplayDate(startOfMonth(newDate));
    }
    
    // Update focused date signal for reactive focus management
    setFocusedDate(newDate);
  };

  // ===== RENDER =====

  return (
    <div
      role="grid"
      aria-label={`Calendar for ${monthYearString()}`}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {/* Calendar Header with Navigation */}
      <div class="calendar-header">
        <button
          type="button"
          aria-label="Previous month"
          onClick={navigatePrevMonth}
          class="btn btn-circle btn-ghost btn-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 class="calendar-title">{monthYearString()}</h2>
        
        <button
          type="button"
          aria-label="Next month"
          onClick={navigateNextMonth}
          class="btn btn-circle btn-ghost btn-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week Header */}
      <div class="calendar-weekdays" role="row">
        <For each={weekDays()}>
          {(day) => (
            <div role="columnheader" class="calendar-weekday">
              {day}
            </div>
          )}
        </For>
      </div>

      {/* Calendar Grid */}
      <div class="calendar-days">
        <For each={calendarDays()}>
          {(date) => {
            const isDisabled = isDateDisabled(date);
            const isSelected = isDateSelected(date);
            const inCurrentMonth = isInCurrentMonth(date);
            const isFocused = focusedDate() && isSameDay(date, focusedDate()!);
            
            return (
              <button
                type="button"
                role="gridcell"
                tabIndex={isFocused ? 0 : -1}
                data-date={date.getTime()}
                disabled={isDisabled}
                aria-label={formatDateForAccessibility(date)}
                aria-selected={isSelected}
                classList={{
                  "calendar-day": true,
                  "calendar-day-selected": isSelected,
                  "calendar-day-disabled": isDisabled,
                  "calendar-day-other-month": !inCurrentMonth,
                }}
                onClick={() => handleDateSelect(date)}
                onKeyDown={(e) => handleKeyDown(e, date)}
              >
                {format(date, "d")}
              </button>
            );
          }}
        </For>
      </div>

      {/* Screen Reader Announcements */}
      <div 
        class="sr-only" 
        aria-live="polite" 
        aria-label="Selected date announcements"
      >
        <Show when={props.selectedDate}>
          Selected date: {format(props.selectedDate!, "MMMM do, yyyy")}
        </Show>
      </div>
    </div>
  );
}
