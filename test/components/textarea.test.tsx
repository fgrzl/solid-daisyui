import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Textarea from "@/components/textarea";

describe("Textarea Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      const { getByRole } = render(() => <Textarea />);
      expect(getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with base textarea class", () => {
      const { getByRole } = render(() => <Textarea />);
      expect(getByRole("textbox")).toHaveClass("textarea");
    });

    it("renders with bordered style by default", () => {
      const { getByRole } = render(() => <Textarea />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-bordered");
    });

    it("renders with placeholder text", () => {
      const { getByPlaceholderText } = render(() => <Textarea placeholder="Enter your message" />);
      expect(getByPlaceholderText("Enter your message")).toBeInTheDocument();
    });

    it("renders with initial value", () => {
      const { getByDisplayValue } = render(() => <Textarea value="Initial content" />);
      expect(getByDisplayValue("Initial content")).toBeInTheDocument();
    });
  });

  // DaisyUI Size Variants Tests
  describe("DaisyUI Size Variants", () => {
    it("applies textarea-xs class for xs size", () => {
      const { getByRole } = render(() => <Textarea size="xs" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-xs");
    });

    it("applies textarea-sm class for sm size", () => {
      const { getByRole } = render(() => <Textarea size="sm" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-sm");
    });

    it("applies textarea-md class for md size", () => {
      const { getByRole } = render(() => <Textarea size="md" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-md");
    });

    it("applies textarea-lg class for lg size", () => {
      const { getByRole } = render(() => <Textarea size="lg" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-lg");
    });

    it("works without size specified", () => {
      const { getByRole } = render(() => <Textarea />);
      expect(getByRole("textbox")).toHaveClass("textarea");
      expect(getByRole("textbox")).not.toHaveClass("textarea-xs", "textarea-sm", "textarea-md", "textarea-lg");
    });
  });

  // DaisyUI Color Variants Tests
  describe("DaisyUI Color Variants", () => {
    it("applies textarea-primary class for primary variant", () => {
      const { getByRole } = render(() => <Textarea variant="primary" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-primary");
    });

    it("applies textarea-secondary class for secondary variant", () => {
      const { getByRole } = render(() => <Textarea variant="secondary" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-secondary");
    });

    it("applies textarea-accent class for accent variant", () => {
      const { getByRole } = render(() => <Textarea variant="accent" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-accent");
    });

    it("applies textarea-info class for info variant", () => {
      const { getByRole } = render(() => <Textarea variant="info" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-info");
    });

    it("applies textarea-success class for success variant", () => {
      const { getByRole } = render(() => <Textarea variant="success" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-success");
    });

    it("applies textarea-warning class for warning variant", () => {
      const { getByRole } = render(() => <Textarea variant="warning" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-warning");
    });

    it("applies textarea-error class for error variant", () => {
      const { getByRole } = render(() => <Textarea variant="error" />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-error");
    });
  });

  // DaisyUI Style Modifiers Tests
  describe("DaisyUI Style Modifiers", () => {
    it("applies textarea-ghost class for ghost style", () => {
      const { getByRole } = render(() => <Textarea ghost />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-ghost");
    });

    it("applies textarea-bordered class when bordered is true", () => {
      const { getByRole } = render(() => <Textarea bordered={true} />);
      expect(getByRole("textbox")).toHaveClass("textarea", "textarea-bordered");
    });

    it("removes textarea-bordered class when bordered is false", () => {
      const { getByRole } = render(() => <Textarea bordered={false} />);
      expect(getByRole("textbox")).toHaveClass("textarea");
      expect(getByRole("textbox")).not.toHaveClass("textarea-bordered");
    });
  });

  // HTML Attributes Tests
  describe("HTML Attributes", () => {
    it("supports disabled attribute", () => {
      const { getByRole } = render(() => <Textarea disabled />);
      expect(getByRole("textbox")).toBeDisabled();
    });

    it("supports required attribute", () => {
      const { getByRole } = render(() => <Textarea required />);
      expect(getByRole("textbox")).toBeRequired();
    });

    it("supports readonly attribute", () => {
      const { getByRole } = render(() => <Textarea readonly />);
      expect(getByRole("textbox")).toHaveAttribute("readonly");
    });

    it("supports rows attribute", () => {
      const { getByRole } = render(() => <Textarea rows={5} />);
      expect(getByRole("textbox")).toHaveAttribute("rows", "5");
    });

    it("supports cols attribute", () => {
      const { getByRole } = render(() => <Textarea cols={30} />);
      expect(getByRole("textbox")).toHaveAttribute("cols", "30");
    });

    it("supports maxlength attribute", () => {
      const { getByRole } = render(() => <Textarea maxlength={100} />);
      expect(getByRole("textbox")).toHaveAttribute("maxlength", "100");
    });

    it("supports minlength attribute", () => {
      const { getByRole } = render(() => <Textarea minlength={10} />);
      expect(getByRole("textbox")).toHaveAttribute("minlength", "10");
    });

    it("supports name attribute", () => {
      const { getByRole } = render(() => <Textarea name="message" />);
      expect(getByRole("textbox")).toHaveAttribute("name", "message");
    });

    it("supports id attribute", () => {
      const { getByRole } = render(() => <Textarea id="message-textarea" />);
      expect(getByRole("textbox")).toHaveAttribute("id", "message-textarea");
    });
  });

  // Event Handling Tests
  describe("Event Handling", () => {
    it("calls onChange when text is entered", () => {
      const onChangeMock = vi.fn();
      const { getByRole } = render(() => <Textarea onChange={onChangeMock} />);
      
      const textarea = getByRole("textbox");
      fireEvent.input(textarea, { target: { value: "new text" } });
      
      expect(onChangeMock).toHaveBeenCalledWith("new text", expect.any(Event));
    });

    it("calls onFocus when focused", () => {
      const onFocusMock = vi.fn();
      const { getByRole } = render(() => <Textarea onFocus={onFocusMock} />);
      
      const textarea = getByRole("textbox");
      fireEvent.focus(textarea);
      
      expect(onFocusMock).toHaveBeenCalledWith(expect.any(Event));
    });

    it("calls onBlur when blurred", () => {
      const onBlurMock = vi.fn();
      const { getByRole } = render(() => <Textarea onBlur={onBlurMock} />);
      
      const textarea = getByRole("textbox");
      fireEvent.blur(textarea);
      
      expect(onBlurMock).toHaveBeenCalledWith(expect.any(Event));
    });

    it("calls onKeyDown when key is pressed", () => {
      const onKeyDownMock = vi.fn();
      const { getByRole } = render(() => <Textarea onKeyDown={onKeyDownMock} />);
      
      const textarea = getByRole("textbox");
      fireEvent.keyDown(textarea, { key: "Enter" });
      
      expect(onKeyDownMock).toHaveBeenCalledWith(expect.any(KeyboardEvent));
    });

    it("calls onKeyUp when key is released", () => {
      const onKeyUpMock = vi.fn();
      const { getByRole } = render(() => <Textarea onKeyUp={onKeyUpMock} />);
      
      const textarea = getByRole("textbox");
      fireEvent.keyUp(textarea, { key: "Enter" });
      
      expect(onKeyUpMock).toHaveBeenCalledWith(expect.any(KeyboardEvent));
    });
  });

  // Controlled vs Uncontrolled Mode Tests
  describe("Controlled vs Uncontrolled Mode", () => {
    it("supports controlled mode with value and onChange", () => {
      const onChangeMock = vi.fn();
      const { getByDisplayValue } = render(() => 
        <Textarea value="controlled text" onChange={onChangeMock} />
      );
      
      expect(getByDisplayValue("controlled text")).toBeInTheDocument();
    });

    it("supports uncontrolled mode with defaultValue", () => {
      const { getByDisplayValue } = render(() => 
        <Textarea defaultValue="default text" />
      );
      
      expect(getByDisplayValue("default text")).toBeInTheDocument();
    });

    it("updates value in controlled mode", () => {
      let currentValue = "initial";
      const onChangeMock = vi.fn((value) => { currentValue = value; });
      
      const { getByRole } = render(() => 
        <Textarea value={currentValue} onChange={onChangeMock} />
      );
      
      const textarea = getByRole("textbox");
      fireEvent.input(textarea, { target: { value: "updated" } });
      
      expect(onChangeMock).toHaveBeenCalledWith("updated", expect.any(Event));
    });
  });

  // Form Integration Tests
  describe("Form Integration", () => {
    it("renders with form-control wrapper when label is provided", () => {
      const { container } = render(() => 
        <Textarea label="Message" />
      );
      
      expect(container.querySelector(".form-control")).toBeInTheDocument();
      expect(container.querySelector(".label-text")).toHaveTextContent("Message");
    });

    it("renders with alt label in top-right", () => {
      const { container } = render(() => 
        <Textarea label="Message" altLabel="Optional" />
      );
      
      expect(container.querySelector(".label-text-alt")).toHaveTextContent("Optional");
    });

    it("renders hint message below textarea", () => {
      const { container } = render(() => 
        <Textarea hint="Enter your message here" />
      );
      
      expect(container.querySelector(".label-text-alt")).toHaveTextContent("Enter your message here");
    });

    it("associates hint with textarea via aria-describedby", () => {
      const { getByRole, container } = render(() => 
        <Textarea hint="Hint message" />
      );
      
      const textarea = getByRole("textbox");
      const hintElement = container.querySelector(".label-text-alt");
      const hintId = hintElement?.id;
      
      expect(hintId).toBeTruthy();
      expect(textarea).toHaveAttribute("aria-describedby", hintId);
    });

    it("sets aria-invalid when state is error", () => {
      const { getByRole } = render(() => 
        <Textarea state="error" />
      );
      
      expect(getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("uses state for variant styling when both provided", () => {
      const { getByRole } = render(() => 
        <Textarea variant="primary" state="error" />
      );
      
      expect(getByRole("textbox")).toHaveClass("textarea-error");
      expect(getByRole("textbox")).not.toHaveClass("textarea-primary");
    });
  });

  // Accessibility Tests (WCAG 2.1 AA Compliance)
  describe("Accessibility", () => {
    it("has correct role attribute", () => {
      const { getByRole } = render(() => <Textarea />);
      expect(getByRole("textbox")).toBeInTheDocument();
    });

    it("supports aria-label attribute", () => {
      const { getByRole } = render(() => <Textarea aria-label="Message input" />);
      expect(getByRole("textbox")).toHaveAttribute("aria-label", "Message input");
    });

    it("supports aria-describedby attribute", () => {
      const { getByRole } = render(() => <Textarea aria-describedby="help-text" />);
      expect(getByRole("textbox")).toHaveAttribute("aria-describedby", "help-text");
    });

    it("combines existing aria-describedby with hint id", () => {
      const { getByRole, container } = render(() => 
        <Textarea aria-describedby="existing-id" hint="Hint text" />
      );
      
      const textarea = getByRole("textbox");
      const hintElement = container.querySelector(".label-text-alt");
      const describedBy = textarea.getAttribute("aria-describedby");
      
      expect(describedBy).toContain("existing-id");
      expect(describedBy).toContain(hintElement?.id);
    });

    it("is keyboard accessible", () => {
      const { getByRole } = render(() => <Textarea />);
      const textarea = getByRole("textbox");
      
      textarea.focus();
      expect(document.activeElement).toBe(textarea);
    });
  });

  // Class and Style Customization Tests
  describe("Class and Style Customization", () => {
    it("merges additional class prop", () => {
      const { getByRole } = render(() => 
        <Textarea class="custom-textarea" />
      );
      
      expect(getByRole("textbox")).toHaveClass("textarea", "custom-textarea");
    });

    it("merges classList prop", () => {
      const { getByRole } = render(() => 
        <Textarea classList={{ "dynamic-class": true, "inactive-class": false }} />
      );
      
      expect(getByRole("textbox")).toHaveClass("textarea", "dynamic-class");
      expect(getByRole("textbox")).not.toHaveClass("inactive-class");
    });

    it("combines class and classList props correctly", () => {
      const { getByRole } = render(() => 
        <Textarea 
          class="static-class" 
          classList={{ "dynamic-class": true }}
        />
      );
      
      expect(getByRole("textbox")).toHaveClass("textarea", "static-class", "dynamic-class");
    });
  });

  // Ref Handling Tests
  describe("Ref Handling", () => {
    it("supports ref as function", () => {
      let refElement: HTMLTextAreaElement | undefined;
      const refCallback = (el: HTMLTextAreaElement) => { refElement = el; };
      
      render(() => <Textarea ref={refCallback} />);
      
      expect(refElement).toBeInstanceOf(HTMLTextAreaElement);
      expect(refElement).toHaveClass("textarea");
    });

    it("provides access to textarea element through ref", () => {
      let refElement: HTMLTextAreaElement | undefined;
      const refCallback = (el: HTMLTextAreaElement) => { refElement = el; };
      
      render(() => <Textarea ref={refCallback} value="test value" />);
      
      expect(refElement?.value).toBe("test value");
    });
  });

  // Edge Cases and Error Conditions
  describe("Edge Cases and Error Conditions", () => {
    it("handles null value gracefully", () => {
      const { getByRole } = render(() => <Textarea value={null as any} />);
      expect(getByRole("textbox")).toHaveValue("");
    });

    it("handles undefined value gracefully", () => {
      const { getByRole } = render(() => <Textarea value={undefined as any} />);
      expect(getByRole("textbox")).toHaveValue("");
    });

    it("handles very long content", () => {
      const longContent = "Lorem ipsum ".repeat(100).trim();
      const { getByDisplayValue } = render(() => <Textarea value={longContent} />);
      
      expect(getByDisplayValue(longContent)).toBeInTheDocument();
    });

    it("handles special characters in content", () => {
      const specialContent = "Content with <script>alert('xss')</script> & special chars: äöü";
      const { getByDisplayValue } = render(() => <Textarea value={specialContent} />);
      
      expect(getByDisplayValue(specialContent)).toBeInTheDocument();
    });

    it("handles empty string value", () => {
      const { getByRole } = render(() => <Textarea value="" />);
      expect(getByRole("textbox")).toHaveValue("");
    });

    it("handles missing onChange in controlled mode", () => {
      const { getByRole } = render(() => <Textarea value="controlled" />);
      const textarea = getByRole("textbox");
      
      // Should not throw when typing
      expect(() => fireEvent.input(textarea, { target: { value: "new text" } })).not.toThrow();
    });
  });

  // Performance Tests
  describe("Performance", () => {
    it("doesn't recreate classes unnecessarily", () => {
      const { getByRole } = render(() => 
        <Textarea size="md" variant="primary" />
      );
      
      const initialClasses = getByRole("textbox").className;
      
      // Check that the same props produce consistent class strings
      const { getByRole: getByRole2 } = render(() => 
        <Textarea size="md" variant="primary" />
      );
      
      expect(getByRole2("textbox").className).toBe(initialClasses);
    });

    it("handles rapid onChange events", () => {
      const onChangeMock = vi.fn();
      const { getByRole } = render(() => <Textarea onChange={onChangeMock} />);
      
      const textarea = getByRole("textbox");
      
      // Simulate rapid typing
      for (let i = 0; i < 10; i++) {
        fireEvent.input(textarea, { target: { value: `text${i}` } });
      }
      
      expect(onChangeMock).toHaveBeenCalledTimes(10);
    });
  });
});
