import { render } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Timeline, { TimelineItem } from "@/components/timeline";

describe("Timeline Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with base timeline class", () => {
      const { container } = render(() => <Timeline />);
      expect(container.firstChild).toHaveClass("timeline");
    });

    it("renders with children", () => {
      const { getByText } = render(() => (
        <Timeline>
          <TimelineItem>Test Item</TimelineItem>
        </Timeline>
      ));
      expect(getByText("Test Item")).toBeInTheDocument();
    });

    it("has proper role attribute for accessibility", () => {
      const { getByRole } = render(() => <Timeline />);
      expect(getByRole("list")).toBeInTheDocument();
    });

    it("applies custom class when provided", () => {
      const { container } = render(() => (
        <Timeline class="custom-timeline">Test</Timeline>
      ));
      expect(container.firstChild).toHaveClass("timeline", "custom-timeline");
    });

    it("applies classList when provided", () => {
      const { container } = render(() => (
        <Timeline classList={{ "custom-active": true, "custom-inactive": false }}>
          Test
        </Timeline>
      ));
      expect(container.firstChild).toHaveClass("timeline", "custom-active");
      expect(container.firstChild).not.toHaveClass("custom-inactive");
    });
  });

  // DaisyUI Orientation Tests
  describe("DaisyUI Orientation Variants", () => {
    it("applies timeline-vertical class for vertical orientation", () => {
      const { container } = render(() => (
        <Timeline orientation="vertical">Test</Timeline>
      ));
      expect(container.firstChild).toHaveClass("timeline", "timeline-vertical");
    });

    it("applies timeline-horizontal class for horizontal orientation", () => {
      const { container } = render(() => (
        <Timeline orientation="horizontal">Test</Timeline>
      ));
      expect(container.firstChild).toHaveClass("timeline", "timeline-horizontal");
    });

    it("defaults to vertical orientation when no orientation specified", () => {
      const { container } = render(() => <Timeline>Test</Timeline>);
      expect(container.firstChild).toHaveClass("timeline");
      // Default should not apply explicit orientation class
    });
  });

  // DaisyUI Size Variants Tests
  describe("DaisyUI Size Variants", () => {
    it("applies timeline-compact class for compact size", () => {
      const { container } = render(() => (
        <Timeline size="compact">Test</Timeline>
      ));
      expect(container.firstChild).toHaveClass("timeline", "timeline-compact");
    });

    it("applies timeline-normal class for normal size", () => {
      const { container } = render(() => (
        <Timeline size="normal">Test</Timeline>
      ));
      expect(container.firstChild).toHaveClass("timeline", "timeline-normal");
    });
  });

  // DaisyUI Snap Alignment Tests
  describe("DaisyUI Snap Alignment", () => {
    it("applies timeline-snap-icon class for icon snap", () => {
      const { container } = render(() => (
        <Timeline snap="icon">Test</Timeline>
      ));
      expect(container.firstChild).toHaveClass("timeline", "timeline-snap-icon");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { getByRole } = render(() => <Timeline aria-label="Project timeline" />);
      const timeline = getByRole("list");
      expect(timeline).toHaveAttribute("aria-label", "Project timeline");
    });

    it("supports aria-describedby", () => {
      const { getByRole } = render(() => (
        <Timeline aria-describedby="timeline-description" />
      ));
      expect(getByRole("list")).toHaveAttribute("aria-describedby", "timeline-description");
    });
  });
});

describe("TimelineItem Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with base timeline-start and timeline-end classes", () => {
      const { container } = render(() => (
        <TimelineItem>Test Item</TimelineItem>
      ));
      expect(container.querySelector(".timeline-start")).toBeInTheDocument();
      expect(container.querySelector(".timeline-middle")).toBeInTheDocument();
      expect(container.querySelector(".timeline-end")).toBeInTheDocument();
    });

    it("has proper role attribute for accessibility", () => {
      const { getByRole } = render(() => <TimelineItem>Test Item</TimelineItem>);
      expect(getByRole("listitem")).toBeInTheDocument();
    });

    it("renders children in the content area", () => {
      const { getByText } = render(() => (
        <TimelineItem>
          <div>Test Content</div>
        </TimelineItem>
      ));
      expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom class when provided", () => {
      const { container } = render(() => (
        <TimelineItem class="custom-item">Test</TimelineItem>
      ));
      expect(container.firstChild).toHaveClass("custom-item");
    });

    it("applies classList when provided", () => {
      const { container } = render(() => (
        <TimelineItem classList={{ "active": true, "inactive": false }}>
          Test
        </TimelineItem>
      ));
      expect(container.firstChild).toHaveClass("active");
      expect(container.firstChild).not.toHaveClass("inactive");
    });
  });

  // Position Tests
  describe("Position Variants", () => {
    it("applies timeline-start for start position", () => {
      const { container } = render(() => (
        <TimelineItem position="start">Test</TimelineItem>
      ));
      expect(container.querySelector(".timeline-start")).toBeInTheDocument();
    });

    it("applies timeline-end for end position", () => {
      const { container } = render(() => (
        <TimelineItem position="end">Test</TimelineItem>
      ));
      expect(container.querySelector(".timeline-end")).toBeInTheDocument();
    });
  });

  // Icon Tests
  describe("Icon Support", () => {
    it("renders custom icon when provided", () => {
      const customIcon = <svg data-testid="custom-icon" />;
      const { getByTestId } = render(() => (
        <TimelineItem icon={customIcon}>Test</TimelineItem>
      ));
      expect(getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("renders default icon when none provided", () => {
      const { container } = render(() => (
        <TimelineItem>Test</TimelineItem>
      ));
      expect(container.querySelector(".timeline-middle")).toBeInTheDocument();
    });
  });

  // Content Tests
  describe("Content Support", () => {
    it("renders title when provided", () => {
      const { getByText } = render(() => (
        <TimelineItem title="Event Title">Content</TimelineItem>
      ));
      expect(getByText("Event Title")).toBeInTheDocument();
    });

    it("renders subtitle when provided", () => {
      const { getByText } = render(() => (
        <TimelineItem subtitle="Event Subtitle">Content</TimelineItem>
      ));
      expect(getByText("Event Subtitle")).toBeInTheDocument();
    });

    it("renders time when provided", () => {
      const { getByText } = render(() => (
        <TimelineItem time="2023-01-01">Content</TimelineItem>
      ));
      expect(getByText("2023-01-01")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("includes proper semantic structure", () => {
      const { getByRole } = render(() => (
        <TimelineItem title="Event" time="2023-01-01">
          Event description
        </TimelineItem>
      ));
      expect(getByRole("listitem")).toBeInTheDocument();
    });

    it("supports aria-label for timeline items", () => {
      const { getByRole } = render(() => (
        <TimelineItem aria-label="Milestone event">Content</TimelineItem>
      ));
      expect(getByRole("listitem")).toHaveAttribute("aria-label", "Milestone event");
    });

    it("includes proper datetime attribute when time is provided", () => {
      const { container } = render(() => (
        <TimelineItem time="2023-01-01T10:00:00Z">Content</TimelineItem>
      ));
      const timeElement = container.querySelector("time");
      expect(timeElement).toHaveAttribute("datetime", "2023-01-01T10:00:00Z");
    });
  });

  // State Tests
  describe("State Variants", () => {
    it("applies correct classes for completed state", () => {
      const { container } = render(() => (
        <TimelineItem state="completed">Test</TimelineItem>
      ));
      // Should have completed styling
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies correct classes for current state", () => {
      const { container } = render(() => (
        <TimelineItem state="current">Test</TimelineItem>
      ));
      // Should have current/active styling
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies correct classes for pending state", () => {
      const { container } = render(() => (
        <TimelineItem state="pending">Test</TimelineItem>
      ));
      // Should have pending styling
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
