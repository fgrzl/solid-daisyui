import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import RadialProgress from "@/components/radial-progress";

describe("RadialProgress Component", () => {
  it("renders with basic value", () => {
    const { container } = render(() => (
      <RadialProgress value={50}>50%</RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute("role", "progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "50");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders children content", () => {
    const { getByText } = render(() => (
      <RadialProgress value={75}>75%</RadialProgress>
    ));
    expect(getByText("75%")).toBeInTheDocument();
  });

  it("applies correct CSS custom property for value", () => {
    const { container } = render(() => (
      <RadialProgress value={30}>30%</RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveStyle({ "--value": "30" });
  });

  it("clamps value between 0 and 100", () => {
    const { container: containerNegative } = render(() => (
      <RadialProgress value={-10}>Invalid</RadialProgress>
    ));
    const progressNegative =
      containerNegative.querySelector(".radial-progress");
    expect(progressNegative).toHaveAttribute("aria-valuenow", "0");
    expect(progressNegative).toHaveStyle({ "--value": "0" });

    const { container: containerOver } = render(() => (
      <RadialProgress value={150}>Invalid</RadialProgress>
    ));
    const progressOver = containerOver.querySelector(".radial-progress");
    expect(progressOver).toHaveAttribute("aria-valuenow", "100");
    expect(progressOver).toHaveStyle({ "--value": "100" });
  });

  it("applies default size class", () => {
    const { container } = render(() => (
      <RadialProgress value={50}>50%</RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveClass("text-base");
  });

  it("applies size classes correctly", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    const sizeClassMap = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    sizes.forEach((size) => {
      const { container } = render(() => (
        <RadialProgress value={50} size={size}>
          50%
        </RadialProgress>
      ));

      const progress = container.querySelector(".radial-progress");
      expect(progress).toHaveClass(sizeClassMap[size]);
    });
  });

  it("applies color classes correctly", () => {
    const colors = [
      "primary",
      "secondary",
      "accent",
      "info",
      "success",
      "warning",
      "error",
    ] as const;

    colors.forEach((color) => {
      const { container } = render(() => (
        <RadialProgress value={50} color={color}>
          50%
        </RadialProgress>
      ));

      const progress = container.querySelector(".radial-progress");
      expect(progress).toHaveClass(`text-${color}`);
    });
  });

  it("does not apply color class when no color prop is provided", () => {
    const { container } = render(() => (
      <RadialProgress value={50}>50%</RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    const colorClasses = [
      "text-primary",
      "text-secondary",
      "text-accent",
      "text-info",
      "text-success",
      "text-warning",
      "text-error",
    ];

    colorClasses.forEach((colorClass) => {
      expect(progress).not.toHaveClass(colorClass);
    });
  });

  it("applies custom thickness", () => {
    const { container } = render(() => (
      <RadialProgress value={50} thickness="4px">
        50%
      </RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveStyle({ "--thickness": "4px" });
  });

  it("applies custom size", () => {
    const { container } = render(() => (
      <RadialProgress value={50} customSize="8rem">
        50%
      </RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveStyle({ "--size": "8rem" });
  });

  it("applies additional CSS classes", () => {
    const { container } = render(() => (
      <RadialProgress value={50} class="custom-class">
        50%
      </RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveClass("custom-class");
  });

  it("merges classList correctly", () => {
    const { container } = render(() => (
      <RadialProgress
        value={50}
        classList={{ "dynamic-class": true, "inactive-class": false }}
      >
        50%
      </RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveClass("dynamic-class");
    expect(progress).not.toHaveClass("inactive-class");
  });

  it("applies custom aria-label", () => {
    const { container } = render(() => (
      <RadialProgress value={80} aria-label="Custom progress label">
        80%
      </RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveAttribute("aria-label", "Custom progress label");
  });

  it("applies default aria-label when none provided", () => {
    const { container } = render(() => (
      <RadialProgress value={65}>65%</RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveAttribute("aria-label", "65% complete");
  });

  it("applies id attribute", () => {
    const { container } = render(() => (
      <RadialProgress value={90} id="test-progress">
        90%
      </RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveAttribute("id", "test-progress");
  });

  it("renders without children", () => {
    const { container } = render(() => <RadialProgress value={45} />);

    const progress = container.querySelector(".radial-progress");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute("aria-valuenow", "45");
    expect(progress?.textContent).toBe("");
  });

  it("handles zero value correctly", () => {
    const { container } = render(() => (
      <RadialProgress value={0}>0%</RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveAttribute("aria-valuenow", "0");
    expect(progress).toHaveStyle({ "--value": "0" });
  });

  it("handles 100% value correctly", () => {
    const { container } = render(() => (
      <RadialProgress value={100}>100%</RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveAttribute("aria-valuenow", "100");
    expect(progress).toHaveStyle({ "--value": "100" });
  });

  it("combines all props correctly", () => {
    const { container } = render(() => (
      <RadialProgress
        value={85}
        size="lg"
        color="success"
        thickness="3px"
        customSize="10rem"
        class="custom-class"
        classList={{ "extra-class": true }}
        aria-label="Test progress"
        id="test-id"
      >
        85%
      </RadialProgress>
    ));

    const progress = container.querySelector(".radial-progress");
    expect(progress).toHaveClass("radial-progress");
    expect(progress).toHaveClass("text-lg");
    expect(progress).toHaveClass("text-success");
    expect(progress).toHaveClass("custom-class");
    expect(progress).toHaveClass("extra-class");
    expect(progress).toHaveAttribute("aria-valuenow", "85");
    expect(progress).toHaveAttribute("aria-label", "Test progress");
    expect(progress).toHaveAttribute("id", "test-id");
    expect(progress).toHaveStyle({
      "--value": "85",
      "--thickness": "3px",
      "--size": "10rem",
    });
  });
});
