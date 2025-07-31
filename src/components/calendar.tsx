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

// Constants for magic numbers
const DAYS_IN_WEEK = 7;
const DEFAULT_DATE_FORMAT = "EEEE, MMMM do, yyyy";
const DAY_NUMBER_FORMAT = "d";

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
  // ===== UTILITY FUNCTIONS =====
  
  /** Validates and returns a safe date, defaulting to current date if invalid */
  const getValidDate = (date?: Date): Date => {
    return date && isValid(date) ? date : new Date();
  };

  /** Formats date for accessibility with error handling */
  const formatDateForAccessibility = (date: Date): string => {
    if (!props.dateFormat) {
      return format(date, DEFAULT_DATE_FORMAT);
    }
    
    try {
      return format(date, props.dateFormat);
    } catch {
      return format(date, DEFAULT_DATE_FORMAT);
    }
  };

  /** Checks if a date is disabled based on constraints */
  const isDateDisabled = (date: Date): boolean => {
    try {
      if (props.disabledDates?.some(disabled => isSameDay(disabled, date))) {
        return true;
      }
      
      if (props.minDate && isBefore(date, props.minDate)) {
        return true;
      }
      
      if (props.maxDate && isAfter(date, props.maxDate)) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.warn("Error checking if date is disabled:", error);
      return false;
    }
  };

  /** Checks if a date is selected in any mode */
  const isDateSelected = (date: Date): boolean => {
    try {
      if (props.selectedDate && isSameDay(date, props.selectedDate)) {
        return true;
      }
      
      if (props.multiple && selectedDates().some(selected => isSameDay(selected, date))) {
        return true;
      }
      
      if (props.range && props.selectedRange) {
        const { start, end } = props.selectedRange;
        return isWithinInterval(date, { start, end });
      }
      
      return false;
    } catch (error) {
      console.warn("Error checking if date is selected:", error);
      return false;
    }
  };

  /** Checks if date is in the currently displayed month */
  const isInCurrentMonth = (date: Date): boolean => {
    return isSameMonth(date, displayDate());
  };

  // ===== STATE MANAGEMENT =====

  const [displayDate, setDisplayDate] = createSignal(getValidDate(props.currentDate));
  const [selectedDates, setSelectedDates] = createSignal<Date[]>(props.selectedDates || []);
  const [rangeStartDate, setRangeStartDate] = createSignal<Date | null>(null);
  const [focusedDateTimestamp, setFocusedDateTimestamp] = createSignal<number | null>(null);
  
  // Store element references for proper focus management
  let dateElementRefs: Record<number, HTMLButtonElement> = {};

  // ===== REACTIVE EFFECTS =====
  
  // Update display date when currentDate prop changes
  createEffect(() => {
    const current = props.currentDate;
    if (current && isValid(current)) {
      setDisplayDate(current);
    }
  });

  // Sync selected dates with props
  createEffect(() => {
    if (props.selectedDates) {
      setSelectedDates(props.selectedDates);
    }
  });

  // Handle reactive focus management
  createEffect(() => {
    const focusedTimestamp = focusedDateTimestamp();
    if (focusedTimestamp && dateElementRefs[focusedTimestamp]) {
      try {
        dateElementRefs[focusedTimestamp].focus();
      } catch (error) {
        // Gracefully handle focus errors if element is not available
        console.warn("Failed to focus calendar date:", error);
      }
    }
  });

  // Cleanup element references when calendar days change
  createEffect(() => {
    const days = calendarDays();
    const validTimestamps = new Set(days.map(date => date.getTime()));
    
    // Remove references for dates no longer in view
    Object.keys(dateElementRefs).forEach(timestampStr => {
      const timestamp = parseInt(timestampStr, 10);
      if (!validTimestamps.has(timestamp)) {
        delete dateElementRefs[timestamp];
      }
    });
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

  // ===== EVENT HANDLERS =====

  /** Handles date selection based on current mode */
  const handleDateSelect = (date: Date): void => {
    if (isDateDisabled(date)) return;
    
    try {
      if (props.range) {
        handleRangeSelection(date);
      } else if (props.multiple) {
        handleMultipleSelection(date);
      } else {
        props.onDateSelect?.(date);
      }
    } catch (error) {
      console.warn("Error handling date selection:", error);
    }
  };

  /** Handles range selection logic */
  const handleRangeSelection = (date: Date): void => {
    const start = rangeStartDate();
    
    if (!start) {
      setRangeStartDate(date);
    } else {
      const range = start <= date 
        ? { start, end: date }
        : { start: date, end: start };
      
      props.onRangeSelect?.(range);
      setRangeStartDate(null);
    }
  };

  /** Handles multiple selection logic */
  const handleMultipleSelection = (date: Date): void => {
    const current = selectedDates();
    const exists = current.some(selected => isSameDay(selected, date));
    
    const newSelection = exists
      ? current.filter(selected => !isSameDay(selected, date))
      : [...current, date];
    
    setSelectedDates(newSelection);
    props.onMultipleSelect?.(newSelection);
    props.onDateSelect?.(date);
  };

  // ===== NAVIGATION HANDLERS =====

  /** Navigate to previous month */
  const navigatePrevMonth = (): void => {
    const newDate = subMonths(displayDate(), 1);
    setDisplayDate(newDate);
    props.onMonthChange?.(newDate);
  };

  /** Navigate to next month */
  const navigateNextMonth = (): void => {
    const newDate = addMonths(displayDate(), 1);
    setDisplayDate(newDate);
    props.onMonthChange?.(newDate);
  };

  // ===== KEYBOARD NAVIGATION =====

  /** Navigate to a relative date and update focused element reactively */
  const navigateToDate = (currentDate: Date, dayOffset: number): void => {
    const newDate = addDays(currentDate, dayOffset);
    
    // If we're going to a different month, update display
    if (!isSameMonth(newDate, currentDate)) {
      setDisplayDate(startOfMonth(newDate));
    }
    
    // Set the timestamp for reactive focus management
    setFocusedDateTimestamp(newDate.getTime());
  };

  /** Handle keyboard navigation */
  const handleKeyDown = (event: KeyboardEvent, date: Date): void => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleDateSelect(date);
        break;
        
      case "ArrowRight":
        event.preventDefault();
        navigateToDate(date, 1);
        break;
        
      case "ArrowLeft":
        event.preventDefault();
        navigateToDate(date, -1);
        break;
        
      case "ArrowDown":
        event.preventDefault();
        navigateToDate(date, DAYS_IN_WEEK);
        break;
        
      case "ArrowUp":
        event.preventDefault();
        navigateToDate(date, -DAYS_IN_WEEK);
        break;
    }
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
            const timestamp = date.getTime();
            const isFocused = focusedDateTimestamp() === timestamp;
            
            return (
              <button
                type="button"
                role="gridcell"
                ref={(el) => {
                  if (el) {
                    dateElementRefs[timestamp] = el;
                  }
                }}
                tabIndex={isFocused ? 0 : -1}
                data-date={timestamp}
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
                {format(date, DAY_NUMBER_FORMAT)}
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
