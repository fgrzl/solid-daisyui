import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Loading from "@/components/loading";

describe("Loading Component", () => {
  it("renders with default props", () => {
    const { container } = render(() => <Loading />);
    const element = container.firstChild as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("SPAN");
    expect(element).toHaveClass("loading");
    expect(element).toHaveClass("loading-spinner");
    expect(element).toHaveClass("loading-md");
  });

  it("has proper accessibility attributes", () => {
    const { container } = render(() => <Loading />);
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveAttribute("role", "status");
    expect(element).toHaveAttribute("aria-label", "Loading");
  });

  it("applies different sizes correctly", () => {
    const sizes = ["xs", "sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { container } = render(() => <Loading size={size} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(`loading-${size}`);
    });
  });

  it("applies different types correctly", () => {
    const types = [
      "spinner",
      "dots",
      "ring",
      "ball",
      "bars",
      "infinity",
    ] as const;

    types.forEach((type) => {
      const { container } = render(() => <Loading type={type} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(`loading-${type}`);
    });
  });

  it("applies custom color classes", () => {
    const { container } = render(() => <Loading color="text-primary" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("text-primary");
  });

  it("applies additional custom classes", () => {
    const { container } = render(() => <Loading class="custom-loading" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("custom-loading");
  });

  it("merges classList prop correctly", () => {
    const { container } = render(() => (
      <Loading
        classList={{ "conditional-class": true, "false-class": false }}
      />
    ));
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("conditional-class");
    expect(element).not.toHaveClass("false-class");
  });

  it("combines multiple props correctly", () => {
    const { container } = render(() => (
      <Loading
        size="lg"
        type="dots"
        color="text-accent"
        class="extra-class"
        classList={{ "dynamic-class": true }}
      />
    ));
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass("loading");
    expect(element).toHaveClass("loading-lg");
    expect(element).toHaveClass("loading-dots");
    expect(element).toHaveClass("text-accent");
    expect(element).toHaveClass("extra-class");
    expect(element).toHaveClass("dynamic-class");
  });

  it("handles empty color prop gracefully", () => {
    const { container } = render(() => <Loading color="" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("loading");
    expect(element).toHaveClass("loading-spinner");
    expect(element).toHaveClass("loading-md");
  });

  it("uses defaults when no props are provided", () => {
    const { container } = render(() => <Loading />);
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass("loading-spinner");
    expect(element).toHaveClass("loading-md");
  });
});
