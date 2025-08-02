import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Input from "@/components/input";

describe("Input Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(() => <Input />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass("input", "input-bordered");
    });

    it("renders with value prop", () => {
      const { container } = render(() => <Input value="test value" />);
      const input = container.querySelector("input");
      expect(input).toHaveValue("test value");
    });

    it("renders with placeholder", () => {
      const { container } = render(() => <Input placeholder="Enter text..." />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("placeholder", "Enter text...");
    });

    it("applies custom class", () => {
      const { container } = render(() => <Input class="custom-class" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "custom-class");
    });

    it("applies classList prop", () => {
      const { container } = render(() => (
        <Input classList={{ "test-class": true, "false-class": false }} />
      ));
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "test-class");
      expect(input).not.toHaveClass("false-class");
    });
  });

  // Input Types Tests
  describe("Input Types", () => {
    it("supports text input type", () => {
      const { container } = render(() => <Input type="text" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "text");
    });

    it("supports password input type", () => {
      const { container } = render(() => <Input type="password" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "password");
    });

    it("supports email input type", () => {
      const { container } = render(() => <Input type="email" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "email");
    });

    it("supports number input type", () => {
      const { container } = render(() => <Input type="number" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "number");
    });

    it("defaults to text type when not specified", () => {
      const { container } = render(() => <Input />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "text");
    });
  });

  // DaisyUI Size Variants Tests
  describe("DaisyUI Size Variants", () => {
    it("applies input-xs class for xs size", () => {
      const { container } = render(() => <Input size="xs" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-xs");
    });

    it("applies input-sm class for sm size", () => {
      const { container } = render(() => <Input size="sm" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-sm");
    });

    it("applies input-md class for md size", () => {
      const { container } = render(() => <Input size="md" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-md");
    });

    it("applies input-lg class for lg size", () => {
      const { container } = render(() => <Input size="lg" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-lg");
    });

    it("does not apply size class when size is not specified", () => {
      const { container } = render(() => <Input />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-bordered");
      expect(input).not.toHaveClass("input-xs", "input-sm", "input-md", "input-lg");
    });
  });

  // DaisyUI Color Variants Tests
  describe("DaisyUI Color Variants", () => {
    it("applies input-primary class for primary variant", () => {
      const { container } = render(() => <Input variant="primary" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-primary");
    });

    it("applies input-secondary class for secondary variant", () => {
      const { container } = render(() => <Input variant="secondary" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-secondary");
    });

    it("applies input-accent class for accent variant", () => {
      const { container } = render(() => <Input variant="accent" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-accent");
    });

    it("applies input-info class for info variant", () => {
      const { container } = render(() => <Input variant="info" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-info");
    });

    it("applies input-success class for success variant", () => {
      const { container } = render(() => <Input variant="success" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-success");
    });

    it("applies input-warning class for warning variant", () => {
      const { container } = render(() => <Input variant="warning" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-warning");
    });

    it("applies input-error class for error variant", () => {
      const { container } = render(() => <Input variant="error" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-error");
    });

    it("does not apply variant class when variant is not specified", () => {
      const { container } = render(() => <Input />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-bordered");
      expect(input).not.toHaveClass(
        "input-primary",
        "input-secondary", 
        "input-accent",
        "input-info",
        "input-success",
        "input-warning",
        "input-error"
      );
    });
  });

  // DaisyUI State Modifiers Tests
  describe("DaisyUI State Modifiers", () => {
    it("applies input-bordered class when bordered is true", () => {
      const { container } = render(() => <Input bordered />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-bordered");
    });

    it("does not apply input-bordered class when bordered is false", () => {
      const { container } = render(() => <Input bordered={false} />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input");
      expect(input).not.toHaveClass("input-bordered");
    });

    it("can explicitly enable bordered styling", () => {
      const { container } = render(() => <Input bordered={true} />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-bordered");
    });

    it("applies input-ghost class when ghost is true", () => {
      const { container } = render(() => <Input ghost />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input", "input-ghost");
    });

    it("does not apply input-ghost class when ghost is false", () => {
      const { container } = render(() => <Input ghost={false} />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("input");
      expect(input).not.toHaveClass("input-ghost");
    });
  });

  // User Interactions Tests
  describe("User Interactions", () => {
    it("calls onChange when value changes", () => {
      const onChange = vi.fn();
      const { container } = render(() => <Input onChange={onChange} />);
      const input = container.querySelector("input");
      
      fireEvent.input(input!, { target: { value: "new value" } });
      expect(onChange).toHaveBeenCalledWith("new value", expect.any(Event));
    });

    it("calls onFocus when input gains focus", () => {
      const onFocus = vi.fn();
      const { container } = render(() => <Input onFocus={onFocus} />);
      const input = container.querySelector("input");
      
      fireEvent.focus(input!);
      expect(onFocus).toHaveBeenCalledWith(expect.any(Event));
    });

    it("calls onBlur when input loses focus", () => {
      const onBlur = vi.fn();
      const { container } = render(() => <Input onBlur={onBlur} />);
      const input = container.querySelector("input");
      
      fireEvent.blur(input!);
      expect(onBlur).toHaveBeenCalledWith(expect.any(Event));
    });

    it("calls onKeyDown when key is pressed", () => {
      const onKeyDown = vi.fn();
      const { container } = render(() => <Input onKeyDown={onKeyDown} />);
      const input = container.querySelector("input");
      
      fireEvent.keyDown(input!, { key: "Enter" });
      expect(onKeyDown).toHaveBeenCalledWith(expect.any(KeyboardEvent));
    });

    it("calls onKeyUp when key is released", () => {
      const onKeyUp = vi.fn();
      const { container } = render(() => <Input onKeyUp={onKeyUp} />);
      const input = container.querySelector("input");
      
      fireEvent.keyUp(input!, { key: "Enter" });
      expect(onKeyUp).toHaveBeenCalledWith(expect.any(KeyboardEvent));
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("supports aria-label attribute", () => {
      const { container } = render(() => <Input aria-label="Username input" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-label", "Username input");
    });

    it("supports aria-describedby attribute", () => {
      const { container } = render(() => <Input aria-describedby="helper-text" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-describedby", "helper-text");
    });

    it("sets aria-invalid to true when error variant is used", () => {
      const { container } = render(() => <Input variant="error" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when variant is not error", () => {
      const { container } = render(() => <Input variant="success" />);
      const input = container.querySelector("input");
      expect(input).not.toHaveAttribute("aria-invalid");
    });

    it("sets disabled attribute when disabled prop is true", () => {
      const { container } = render(() => <Input disabled />);
      const input = container.querySelector("input");
      expect(input).toBeDisabled();
    });

    it("sets required attribute when required prop is true", () => {
      const { container } = render(() => <Input required />);
      const input = container.querySelector("input");
      expect(input).toBeRequired();
    });
  });

  // Controlled vs Uncontrolled Tests
  describe("Controlled vs Uncontrolled", () => {
    it("works as controlled component with value prop", () => {
      const onChange = vi.fn();
      const { container } = render(() => <Input value="controlled" onChange={onChange} />);
      const input = container.querySelector("input");
      
      expect(input).toHaveValue("controlled");
      
      fireEvent.input(input!, { target: { value: "new value" } });
      expect(onChange).toHaveBeenCalledWith("new value", expect.any(Event));
    });

    it("works as uncontrolled component with defaultValue", () => {
      const { container } = render(() => <Input defaultValue="default" />);
      const input = container.querySelector("input");
      
      expect(input).toHaveValue("default");
    });

    it("allows typing in uncontrolled mode", () => {
      const { container } = render(() => <Input defaultValue="" />);
      const input = container.querySelector("input");
      
      fireEvent.input(input!, { target: { value: "typed value" } });
      expect(input).toHaveValue("typed value");
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("handles null/undefined value gracefully", () => {
      const { container } = render(() => <Input value={undefined} />);
      const input = container.querySelector("input");
      expect(input).toHaveValue("");
    });

    it("combines multiple size and variant classes", () => {
      const { container } = render(() => (
        <Input size="lg" variant="primary" bordered ghost />
      ));
      const input = container.querySelector("input");
      expect(input).toHaveClass(
        "input",
        "input-lg",
        "input-primary", 
        "input-bordered",
        "input-ghost"
      );
    });

    it("forwards ref to input element", () => {
      let inputRef: HTMLInputElement | undefined;
      const { container } = render(() => (
        <Input ref={(el) => (inputRef = el)} />
      ));
      
      const input = container.querySelector("input");
      expect(inputRef).toBe(input);
    });

    it("supports HTML input attributes", () => {
      const { container } = render(() => (
        <Input 
          name="username"
          id="username-input"
          autocomplete="username"
          maxlength={50}
          minlength={3}
        />
      ));
      const input = container.querySelector("input");
      
      expect(input).toHaveAttribute("name", "username");
      expect(input).toHaveAttribute("id", "username-input");
      expect(input).toHaveAttribute("autocomplete", "username");
      expect(input).toHaveAttribute("maxlength", "50");
      expect(input).toHaveAttribute("minlength", "3");
    });
  });

  // Validation Integration Tests
  describe("Validation Integration", () => {
    it("renders input without wrapper when no validation props are provided", () => {
      const { container } = render(() => <Input placeholder="Simple input" />);
      const formControl = container.querySelector(".form-control");
      const input = container.querySelector("input");
      
      expect(formControl).toBeNull();
      expect(input).toBeInTheDocument();
    });

    it("wraps input in form-control when hint is provided", () => {
      const { container } = render(() => <Input hint="This is a hint" />);
      const formControl = container.querySelector(".form-control");
      const input = container.querySelector("input");
      const hintElement = container.querySelector(".label-text-alt");
      
      expect(formControl).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(hintElement).toBeInTheDocument();
      expect(hintElement).toHaveTextContent("This is a hint");
    });

    it("wraps input in form-control when label is provided", () => {
      const { container } = render(() => <Input label="Username" />);
      const formControl = container.querySelector(".form-control");
      const labelElement = container.querySelector(".label-text");
      
      expect(formControl).toBeInTheDocument();
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent("Username");
    });

    it("wraps input in form-control when altLabel is provided", () => {
      const { container } = render(() => <Input altLabel="Required" />);
      const formControl = container.querySelector(".form-control");
      const altLabelElement = container.querySelector(".label-text-alt");
      
      expect(formControl).toBeInTheDocument();
      expect(altLabelElement).toBeInTheDocument();
      expect(altLabelElement).toHaveTextContent("Required");
    });

    it("applies state styling to input variant", () => {
      const { container } = render(() => <Input state="error" />);
      const input = container.querySelector("input");
      
      expect(input).toHaveClass("input-error");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("prioritizes state over variant prop", () => {
      const { container } = render(() => <Input variant="primary" state="error" />);
      const input = container.querySelector("input");
      
      expect(input).toHaveClass("input-error");
      expect(input).not.toHaveClass("input-primary");
    });

    it("sets proper aria-describedby when hint is provided", () => {
      const { container } = render(() => <Input hint="Error message" />);
      const input = container.querySelector("input");
      const hintElement = container.querySelector(".label-text-alt");
      
      expect(input).toHaveAttribute("aria-describedby");
      expect(hintElement).toHaveAttribute("id");
      
      const ariaDescribedBy = input?.getAttribute("aria-describedby");
      const hintId = hintElement?.getAttribute("id");
      expect(ariaDescribedBy).toBe(hintId);
    });

    it("combines existing aria-describedby with hint ID", () => {
      const { container } = render(() => 
        <Input aria-describedby="existing-id" hint="Error message" />
      );
      const input = container.querySelector("input");
      const hintElement = container.querySelector(".label-text-alt");
      
      const ariaDescribedBy = input?.getAttribute("aria-describedby");
      const hintId = hintElement?.getAttribute("id");
      expect(ariaDescribedBy).toBe(`existing-id ${hintId}`);
    });

    it("supports JSX content in hint", () => {
      const { container } = render(() => 
        <Input hint={<span>Error with <strong>emphasis</strong></span>} />
      );
      const hintElement = container.querySelector(".label-text-alt");
      const strongElement = container.querySelector("strong");
      
      expect(hintElement).toBeInTheDocument();
      expect(strongElement).toBeInTheDocument();
      expect(strongElement).toHaveTextContent("emphasis");
    });

    it("supports JSX content in labels", () => {
      const { container } = render(() => 
        <Input 
          label={<span>Username <strong>*</strong></span>}
          altLabel={<em>Required</em>}
        />
      );
      const labelStrong = container.querySelector(".label-text strong");
      const altLabelEm = container.querySelector(".label-text-alt em");
      
      expect(labelStrong).toBeInTheDocument();
      expect(labelStrong).toHaveTextContent("*");
      expect(altLabelEm).toBeInTheDocument();
      expect(altLabelEm).toHaveTextContent("Required");
    });

    it("renders complete validation layout with all props", () => {
      const { container } = render(() => 
        <Input 
          label="Email Address"
          altLabel="Required"
          hint="Please enter a valid email address"
          state="error"
          type="email"
          placeholder="user@example.com"
        />
      );
      
      const formControl = container.querySelector(".form-control");
      const topLabel = container.querySelector(".label:first-child");
      const bottomLabel = container.querySelector(".label:last-child");
      const labelText = container.querySelector(".label-text");
      const topAltText = container.querySelector(".label:first-child .label-text-alt");
      const bottomAltText = container.querySelector(".label:last-child .label-text-alt");
      const input = container.querySelector("input");
      
      expect(formControl).toBeInTheDocument();
      expect(topLabel).toBeInTheDocument();
      expect(bottomLabel).toBeInTheDocument();
      expect(labelText).toHaveTextContent("Email Address");
      expect(topAltText).toHaveTextContent("Required");
      expect(bottomAltText).toHaveTextContent("Please enter a valid email address");
      expect(input).toHaveClass("input-error");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });
});
