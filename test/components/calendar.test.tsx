import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Calendar from "@/components/calendar";

describe("Calendar Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders calendar with default props", () => {
      const { container } = render(() => <Calendar />);
      expect(container.firstChild).toHaveClass("calendar");
    });

    it("renders calendar grid with days of week headers", () => {
      const { getByText } = render(() => <Calendar />);
      expect(getByText("Sun")).toBeInTheDocument();
      expect(getByText("Mon")).toBeInTheDocument();
      expect(getByText("Tue")).toBeInTheDocument();
      expect(getByText("Wed")).toBeInTheDocument();
      expect(getByText("Thu")).toBeInTheDocument();
      expect(getByText("Fri")).toBeInTheDocument();
      expect(getByText("Sat")).toBeInTheDocument();
    });

    it("renders current month by default", () => {
      const { container } = render(() => <Calendar />);
      const monthYear = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      expect(container).toHaveTextContent(monthYear);
    });

    it("applies custom class names", () => {
      const { container } = render(() => <Calendar class="custom-calendar" />);
      expect(container.firstChild).toHaveClass("calendar", "custom-calendar");
    });

    it("applies dynamic classList", () => {
      const { container } = render(() => (
        <Calendar classList={{ "calendar-compact": true, hidden: false }} />
      ));
      expect(container.firstChild).toHaveClass("calendar", "calendar-compact");
      expect(container.firstChild).not.toHaveClass("hidden");
    });
  });

  // DaisyUI Variants Tests
  describe("DaisyUI Variants", () => {
    it("applies calendar-sm class for small size", () => {
      const { container } = render(() => <Calendar size="sm" />);
      expect(container.firstChild).toHaveClass("calendar", "calendar-sm");
    });

    it("applies calendar-lg class for large size", () => {
      const { container } = render(() => <Calendar size="lg" />);
      expect(container.firstChild).toHaveClass("calendar", "calendar-lg");
    });

    it("applies calendar-bordered class for bordered variant", () => {
      const { container } = render(() => <Calendar variant="bordered" />);
      expect(container.firstChild).toHaveClass("calendar", "calendar-bordered");
    });

    it("applies calendar-compact class for compact variant", () => {
      const { container } = render(() => <Calendar variant="compact" />);
      expect(container.firstChild).toHaveClass("calendar", "calendar-compact");
    });
  });

  // Date Selection Tests
  describe("Date Selection", () => {
    it("calls onDateSelect when a date is clicked", () => {
      const onDateSelect = vi.fn();
      const { getByText } = render(() => (
        <Calendar onDateSelect={onDateSelect} />
      ));

      const dateButton = getByText("15");
      fireEvent.click(dateButton);

      expect(onDateSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it("highlights selected date", () => {
      const selectedDate = new Date(2024, 6, 15); // July 15, 2024
      const { getByText } = render(() => (
        <Calendar selectedDate={selectedDate} currentDate={selectedDate} />
      ));

      const dateButton = getByText("15");
      expect(dateButton).toHaveClass("calendar-day-selected");
    });

    it("supports multiple date selection mode", () => {
      const onDateSelect = vi.fn();
      const { getByText } = render(() => (
        <Calendar multiple onDateSelect={onDateSelect} />
      ));

      const date1 = getByText("15");
      const date2 = getByText("20");

      fireEvent.click(date1);
      fireEvent.click(date2);

      expect(onDateSelect).toHaveBeenCalledTimes(2);
    });

    it("supports date range selection mode", () => {
      const onRangeSelect = vi.fn();
      const { getByText } = render(() => (
        <Calendar range onRangeSelect={onRangeSelect} />
      ));

      const startDate = getByText("15");
      const endDate = getByText("20");

      fireEvent.click(startDate);
      fireEvent.click(endDate);

      expect(onRangeSelect).toHaveBeenCalledWith({
        start: expect.any(Date),
        end: expect.any(Date),
      });
    });
  });

  // Navigation Tests
  describe("Month Navigation", () => {
    it("renders navigation controls", () => {
      const { getByLabelText } = render(() => <Calendar />);
      expect(getByLabelText("Previous month")).toBeInTheDocument();
      expect(getByLabelText("Next month")).toBeInTheDocument();
    });

    it("navigates to previous month when previous button is clicked", () => {
      // Use a fixed date to make test predictable
      const testDate = new Date(2024, 6, 15); // July 15, 2024
      const { getByLabelText, getByText } = render(() => (
        <Calendar currentDate={testDate} />
      ));
      const prevButton = getByLabelText("Previous month");

      fireEvent.click(prevButton);

      // Should show June 2024 when going back from July 2024
      expect(getByText("June 2024")).toBeInTheDocument();
    });

    it("navigates to next month when next button is clicked", () => {
      const { getByLabelText, container } = render(() => <Calendar />);
      const nextButton = getByLabelText("Next month");

      fireEvent.click(nextButton);

      // Should show next month
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const expectedText = nextMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      expect(container).toHaveTextContent(expectedText);
    });

    it("calls onMonthChange when navigating", () => {
      const onMonthChange = vi.fn();
      const { getByLabelText } = render(() => (
        <Calendar onMonthChange={onMonthChange} />
      ));

      const nextButton = getByLabelText("Next month");
      fireEvent.click(nextButton);

      expect(onMonthChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper ARIA attributes for calendar", () => {
      const { container } = render(() => <Calendar />);
      const calendar = container.firstChild as HTMLElement;

      expect(calendar).toHaveAttribute("role", "grid");
      expect(calendar).toHaveAttribute("aria-label");
    });

    it("has proper ARIA attributes for date buttons", () => {
      const { getByText } = render(() => <Calendar />);
      const dateButton = getByText("15");

      expect(dateButton).toHaveAttribute("role", "gridcell");
      expect(dateButton).toHaveAttribute("aria-label");
    });

    it("supports keyboard navigation with arrow keys", async () => {
      // Use a specific date to make the test predictable
      const testDate = new Date(2024, 6, 15); // July 15, 2024
      const { getByText } = render(() => <Calendar currentDate={testDate} />);
      const dateButton = getByText("15");

      dateButton.focus();
      fireEvent.keyDown(dateButton, { key: "ArrowRight" });

      // Wait for focus to update
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should focus next day
      expect(document.activeElement).toHaveTextContent("16");
    });

    it("supports keyboard navigation with Enter/Space for selection", () => {
      const onDateSelect = vi.fn();
      const { getByText } = render(() => (
        <Calendar onDateSelect={onDateSelect} />
      ));

      const dateButton = getByText("15");
      fireEvent.keyDown(dateButton, { key: "Enter" });

      expect(onDateSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it("provides screen reader announcements for date selection", () => {
      const { getByLabelText } = render(() => <Calendar />);
      expect(getByLabelText(/selected date/i)).toBeInTheDocument();
    });
  });

  // Custom Props Tests
  describe("Custom Props", () => {
    it("accepts and displays custom currentDate", () => {
      const customDate = new Date(2024, 5, 15); // June 15, 2024
      const { container } = render(() => <Calendar currentDate={customDate} />);

      expect(container).toHaveTextContent("June 2024");
    });

    it("accepts custom weekStartsOn prop", () => {
      const { container } = render(() => (
        <Calendar weekStartsOn={1} currentDate={new Date(2024, 0, 1)} />
      ));

      // Should start with Monday when weekStartsOn=1
      const weekDayHeaders = container.querySelectorAll(
        '[role="columnheader"]',
      );
      expect(weekDayHeaders[0]).toHaveTextContent("Mon");
    });

    it("accepts custom dateFormat prop", () => {
      const { getByText } = render(() => <Calendar dateFormat="MM/dd/yyyy" />);

      const dateButton = getByText("15");
      expect(dateButton).toHaveAttribute(
        "aria-label",
        expect.stringMatching(/\d{2}\/\d{2}\/\d{4}/),
      );
    });

    it("handles disabled dates", () => {
      const testDate = new Date(2024, 0, 15); // January 15, 2024
      const { getByText } = render(() => (
        <Calendar
          disabledDates={[testDate]}
          currentDate={new Date(2024, 0, 1)}
        />
      ));

      const disabledButton = getByText("15");
      expect(disabledButton).toHaveAttribute("disabled");
      expect(disabledButton).toHaveClass("calendar-day-disabled");
    });

    it("handles min and max date restrictions", () => {
      const minDate = new Date(2024, 0, 10);
      const maxDate = new Date(2024, 0, 20);
      const currentDate = new Date(2024, 0, 15); // January 15, 2024
      const { getByTestId } = render(() => (
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
          currentDate={currentDate}
        />
      ));

      const beforeMin = getByTestId("calendar-day-5");
      const afterMax = getByTestId("calendar-day-25");

      expect(beforeMin).toHaveAttribute("disabled");
      expect(afterMax).toHaveAttribute("disabled");
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("handles month changes correctly across year boundaries", () => {
      const { getByLabelText, container } = render(() => (
        <Calendar currentDate={new Date(2024, 0, 1)} />
      ));

      const prevButton = getByLabelText("Previous month");
      fireEvent.click(prevButton);

      expect(container).toHaveTextContent("December 2023");
    });

    it("handles leap year February correctly", () => {
      const { container } = render(() => (
        <Calendar currentDate={new Date(2024, 1, 1)} />
      ));

      // 2024 is a leap year, so February should have 29 days
      expect(container).toHaveTextContent("29");
    });

    it("gracefully handles invalid date props", () => {
      const { container } = render(() => (
        <Calendar currentDate={new Date("invalid")} />
      ));

      // Should fallback to current date
      const currentMonth = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      expect(container).toHaveTextContent(currentMonth);
    });

    it("handles empty disabled dates array", () => {
      const { getByText } = render(() => <Calendar disabledDates={[]} />);

      const dateButton = getByText("15");
      expect(dateButton).not.toHaveAttribute("disabled");
    });
  });
});
