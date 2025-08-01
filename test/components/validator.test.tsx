import { describe, it, expect, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import { Validator, ValidatorInput } from "@/components/input";
import { Input } from "@/components/input";

describe("Validator Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders without validation message", () => {
      const { container } = render(() => (
        <Validator>
          <Input placeholder="Test input" />
        </Validator>
      ));
      
      const wrapper = container.querySelector(".form-control");
      expect(wrapper).toBeInTheDocument();
      
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders with validation message", () => {
      const { getByText } = render(() => (
        <Validator message="This field is required">
          <Input placeholder="Test input" />
        </Validator>
      ));
      
      expect(getByText("This field is required")).toBeInTheDocument();
    });

    it("applies custom class to wrapper", () => {
      const { container } = render(() => (
        <Validator class="custom-validator">
          <Input />
        </Validator>
      ));
      
      const wrapper = container.querySelector(".form-control");
      expect(wrapper).toHaveClass("form-control", "custom-validator");
    });

    it("applies classList prop", () => {
      const { container } = render(() => (
        <Validator classList={{ "test-class": true, "false-class": false }}>
          <Input />
        </Validator>
      ));
      
      const wrapper = container.querySelector(".form-control");
      expect(wrapper).toHaveClass("form-control", "test-class");
      expect(wrapper).not.toHaveClass("false-class");
    });
  });

  // Message Display Tests
  describe("Message Display", () => {
    it("shows validation message when provided", () => {
      const { getByText } = render(() => (
        <Validator message="Validation message">
          <Input />
        </Validator>
      ));
      
      expect(getByText("Validation message")).toBeInTheDocument();
    });

    it("does not show message container when message is not provided", () => {
      const { container } = render(() => (
        <Validator>
          <Input />
        </Validator>
      ));
      
      const messageLabel = container.querySelector(".label .label-text-alt");
      expect(messageLabel).not.toBeInTheDocument();
    });

    it("hides message when message prop is empty string", () => {
      const { container } = render(() => (
        <Validator message="">
          <Input />
        </Validator>
      ));
      
      const messageLabel = container.querySelector(".label .label-text-alt");
      expect(messageLabel).not.toBeInTheDocument();
    });

    it("supports JSX content in message", () => {
      const { getByText } = render(() => (
        <Validator message={<span>JSX <strong>message</strong></span>}>
          <Input />
        </Validator>
      ));
      
      expect(getByText("JSX")).toBeInTheDocument();
      expect(getByText("message")).toBeInTheDocument();
    });
  });

  // Label Support Tests
  describe("Label Support", () => {
    it("renders top label when provided", () => {
      const { getByText } = render(() => (
        <Validator label="Field Label">
          <Input />
        </Validator>
      ));
      
      expect(getByText("Field Label")).toBeInTheDocument();
    });

    it("renders alt label when provided", () => {
      const { getByText } = render(() => (
        <Validator altLabel="Alt Label">
          <Input />
        </Validator>
      ));
      
      expect(getByText("Alt Label")).toBeInTheDocument();
    });

    it("renders both labels when both are provided", () => {
      const { getByText } = render(() => (
        <Validator label="Main Label" altLabel="Alt Label">
          <Input />
        </Validator>
      ));
      
      expect(getByText("Main Label")).toBeInTheDocument();
      expect(getByText("Alt Label")).toBeInTheDocument();
    });

    it("supports JSX content in labels", () => {
      const { getAllByText } = render(() => (
        <Validator 
          label={<span>Main <strong>Label</strong></span>}
          altLabel={<span>Alt <em>Label</em></span>}
        >
          <Input />
        </Validator>
      ));
      
      expect(getAllByText("Label")).toHaveLength(2);
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("handles no children gracefully", () => {
      const { container, getByText } = render(() => (
        <Validator message="No children">
        </Validator>
      ));
      
      expect(getByText("No children")).toBeInTheDocument();
      const wrapper = container.querySelector(".form-control");
      expect(wrapper).toBeInTheDocument();
    });
  });
});

describe("ValidatorInput Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders input with validation wrapper", () => {
      const { container } = render(() => (
        <ValidatorInput placeholder="Test input" />
      ));
      
      const wrapper = container.querySelector(".form-control");
      expect(wrapper).toBeInTheDocument();
      
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Test input");
    });

    it("renders with validation message", () => {
      const { getByText } = render(() => (
        <ValidatorInput message="This field is required" placeholder="Test input" />
      ));
      
      expect(getByText("This field is required")).toBeInTheDocument();
    });
  });

  // Validation State Tests
  describe("Validation States", () => {
    it("applies error state to input when state is error", () => {
      const { container } = render(() => (
        <ValidatorInput state="error" placeholder="Test input" />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveClass("input-error");
    });

    it("applies success state to input when state is success", () => {
      const { container } = render(() => (
        <ValidatorInput state="success" placeholder="Test input" />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveClass("input-success");
    });

    it("applies warning state to input when state is warning", () => {
      const { container } = render(() => (
        <ValidatorInput state="warning" placeholder="Test input" />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveClass("input-warning");
    });

    it("applies info state to input when state is info", () => {
      const { container } = render(() => (
        <ValidatorInput state="info" placeholder="Test input" />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveClass("input-info");
    });
  });

  // Label Integration Tests
  describe("Label Integration", () => {
    it("renders with labels", () => {
      const { getByText } = render(() => (
        <ValidatorInput 
          label="Field Label" 
          altLabel="Alt Label"
          placeholder="Test input" 
        />
      ));
      
      expect(getByText("Field Label")).toBeInTheDocument();
      expect(getByText("Alt Label")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("connects input to validation message with aria-describedby", () => {
      const { container } = render(() => (
        <ValidatorInput message="Error message" id="test-input" />
      ));
      
      const input = container.querySelector("#test-input");
      const messageId = input?.getAttribute("aria-describedby");
      expect(messageId).toBeTruthy();
      
      const messageElement = container.querySelector(`#${messageId}`);
      expect(messageElement).toBeInTheDocument();
      expect(messageElement).toHaveTextContent("Error message");
    });

    it("sets aria-invalid on input when state is error", () => {
      const { container } = render(() => (
        <ValidatorInput state="error" />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when state is not error", () => {
      const { container } = render(() => (
        <ValidatorInput state="success" />
      ));
      
      const input = container.querySelector("input");
      expect(input).not.toHaveAttribute("aria-invalid");
    });

    it("preserves existing aria-describedby when present", () => {
      const { container } = render(() => (
        <ValidatorInput 
          message="Validation message" 
          aria-describedby="existing-id" 
        />
      ));
      
      const input = container.querySelector("input");
      const describedBy = input?.getAttribute("aria-describedby");
      expect(describedBy).toContain("existing-id");
    });

    it("generates unique IDs for multiple validator inputs", () => {
      const { container } = render(() => (
        <div>
          <ValidatorInput message="First message" id="input1" />
          <ValidatorInput message="Second message" id="input2" />
        </div>
      ));
      
      const input1 = container.querySelector("#input1");
      const input2 = container.querySelector("#input2");
      
      const describedBy1 = input1?.getAttribute("aria-describedby");
      const describedBy2 = input2?.getAttribute("aria-describedby");
      
      expect(describedBy1).toBeTruthy();
      expect(describedBy2).toBeTruthy();
      expect(describedBy1).not.toBe(describedBy2);
    });
  });

  // Input Props Forwarding Tests
  describe("Input Props Forwarding", () => {
    it("forwards all input props correctly", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <ValidatorInput 
          type="email"
          size="lg"
          placeholder="Email address"
          onChange={onChange}
          bordered
        />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("placeholder", "Email address");
      expect(input).toHaveClass("input-lg", "input-bordered");
    });

    it("handles controlled input correctly", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <ValidatorInput 
          value="test value"
          onChange={onChange}
        />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveValue("test value");
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("works without any optional props", () => {
      const { container } = render(() => (
        <ValidatorInput />
      ));
      
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass("input");
    });

    it("applies state as variant to input", () => {
      const { container } = render(() => (
        <ValidatorInput state="error" />
      ));
      
      const input = container.querySelector("input");
      expect(input).toHaveClass("input-error");
    });
  });
});
