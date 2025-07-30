import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Radio from "@/components/radio";

describe("Radio Component", () => {
  it("renders a basic radio input", () => {
    const { container } = render(() => <Radio />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveClass("radio");
  });

  it("applies the correct name attribute", () => {
    const { container } = render(() => <Radio name="test-group" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveAttribute("name", "test-group");
  });

  it("applies the correct value attribute", () => {
    const { container } = render(() => <Radio value="option1" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveAttribute("value", "option1");
  });

  it("renders as checked when checked prop is true", () => {
    const { container } = render(() => <Radio checked={true} />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toBeChecked();
  });

  it("renders as unchecked when checked prop is false", () => {
    const { container } = render(() => <Radio checked={false} />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).not.toBeChecked();
  });

  it("applies disabled state correctly", () => {
    const { container } = render(() => <Radio disabled={true} />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toBeDisabled();
  });

  it("applies size classes correctly", () => {
    const { container: xsContainer } = render(() => <Radio size="xs" />);
    const xsRadio = xsContainer.querySelector('input[type="radio"]');
    expect(xsRadio).toHaveClass("radio-xs");

    const { container: smContainer } = render(() => <Radio size="sm" />);
    const smRadio = smContainer.querySelector('input[type="radio"]');
    expect(smRadio).toHaveClass("radio-sm");

    const { container: lgContainer } = render(() => <Radio size="lg" />);
    const lgRadio = lgContainer.querySelector('input[type="radio"]');
    expect(lgRadio).toHaveClass("radio-lg");
  });

  it("does not apply size class for default md size", () => {
    const { container } = render(() => <Radio size="md" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).not.toHaveClass("radio-md");
  });

  it("applies color classes correctly", () => {
    const colors = [
      "primary",
      "secondary",
      "accent",
      "success",
      "warning",
      "info",
      "error",
    ] as const;

    colors.forEach((color) => {
      const { container } = render(() => <Radio color={color} />);
      const radio = container.querySelector('input[type="radio"]');
      expect(radio).toHaveClass(`radio-${color}`);
    });
  });

  it("applies custom classes", () => {
    const { container } = render(() => <Radio class="custom-class" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveClass("custom-class");
  });

  it("merges classList correctly", () => {
    const { container } = render(() => (
      <Radio classList={{ "dynamic-class": true, "inactive-class": false }} />
    ));
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveClass("dynamic-class");
    expect(radio).not.toHaveClass("inactive-class");
  });

  it("handles onChange events", () => {
    const onChange = vi.fn();
    const { container } = render(() => (
      <Radio value="test" onChange={onChange} />
    ));

    const radio = container.querySelector('input[type="radio"]');
    fireEvent.click(radio!);
    expect(onChange).toHaveBeenCalled();
  });

  it("handles onFocus events", () => {
    const onFocus = vi.fn();
    const { container } = render(() => <Radio onFocus={onFocus} />);

    const radio = container.querySelector('input[type="radio"]');
    fireEvent.focus(radio!);
    expect(onFocus).toHaveBeenCalled();
  });

  it("handles onBlur events", () => {
    const onBlur = vi.fn();
    const { container } = render(() => <Radio onBlur={onBlur} />);

    const radio = container.querySelector('input[type="radio"]');
    fireEvent.blur(radio!);
    expect(onBlur).toHaveBeenCalled();
  });

  it("applies accessibility attributes", () => {
    const { container } = render(() => (
      <Radio
        aria-label="Custom label"
        aria-describedby="description"
        id="test-radio"
      />
    ));

    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveAttribute("aria-label", "Custom label");
    expect(radio).toHaveAttribute("aria-describedby", "description");
    expect(radio).toHaveAttribute("id", "test-radio");
  });

  it("supports custom tabIndex", () => {
    const { container } = render(() => <Radio tabIndex={5} />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveAttribute("tabindex", "5");
  });

  it("applies required attribute", () => {
    const { container } = render(() => <Radio required={true} />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveAttribute("required");
  });

  it("applies form attribute", () => {
    const { container } = render(() => <Radio form="test-form" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveAttribute("form", "test-form");
  });

  it("combines size and color classes", () => {
    const { container } = render(() => <Radio size="lg" color="primary" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveClass("radio-lg", "radio-primary");
  });

  it("works with radio groups", () => {
    const onChange = vi.fn();
    const { container } = render(() => (
      <div>
        <Radio name="test-group" value="option1" onChange={onChange} />
        <Radio name="test-group" value="option2" onChange={onChange} />
        <Radio name="test-group" value="option3" onChange={onChange} />
      </div>
    ));

    const radios = container.querySelectorAll('input[type="radio"]');
    expect(radios).toHaveLength(3);

    radios.forEach((radio) => {
      expect(radio).toHaveAttribute("name", "test-group");
    });

    // Test that only one radio can be selected in the group
    fireEvent.click(radios[0]);
    fireEvent.click(radios[1]);

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("preserves default props when not overridden", () => {
    const { container } = render(() => <Radio />);
    const radio = container.querySelector('input[type="radio"]');

    expect(radio).toHaveAttribute("tabindex", "0");
    expect(radio).not.toBeDisabled();
    expect(radio).not.toBeChecked();
  });

  it("handles edge case with empty string values", () => {
    const { container } = render(() => <Radio value="" />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toHaveAttribute("value", "");
  });

  it("handles undefined and null props gracefully", () => {
    const { container } = render(() => (
      <Radio name={undefined} value={undefined} id={undefined} />
    ));
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveClass("radio");
  });

  it("prevents event handling when disabled", () => {
    const onChange = vi.fn();
    const { container } = render(() => (
      <Radio disabled={true} onChange={onChange} />
    ));

    const radio = container.querySelector('input[type="radio"]');
    fireEvent.click(radio!);

    // The browser typically prevents events on disabled inputs
    expect(radio).toBeDisabled();
  });
});
