import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Select from "@/components/select";

describe("Select Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with basic props", () => {
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ];
      const { getByRole } = render(() => <Select options={options} />);
      expect(getByRole("combobox")).toBeInTheDocument();
    });

    it("renders with base select class", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => <Select options={options} />);
      expect(getByRole("combobox")).toHaveClass("select");
    });

    it("renders options correctly", () => {
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ];
      const { getByRole, getAllByRole } = render(() => <Select options={options} />);
      
      const select = getByRole("combobox");
      expect(select).toBeInTheDocument();
      
      const optionElements = getAllByRole("option");
      expect(optionElements).toHaveLength(3);
      expect(optionElements[0]).toHaveValue("1");
      expect(optionElements[0]).toHaveTextContent("Option 1");
    });

    it("applies custom class prop", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} class="custom-class" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "custom-class");
    });

    it("applies classList prop", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const classList = { "dynamic-class": true, "inactive-class": false };
      const { getByRole } = render(() => (
        <Select options={options} classList={classList} />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "dynamic-class");
      expect(getByRole("combobox")).not.toHaveClass("inactive-class");
    });
  });

  // DaisyUI Size Variants Tests
  describe("DaisyUI Size Variants", () => {
    it("applies select-xs class for xs size", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} size="xs" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-xs");
    });

    it("applies select-sm class for sm size", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} size="sm" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-sm");
    });

    it("applies select-md class for md size", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} size="md" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-md");
    });

    it("applies select-lg class for lg size", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} size="lg" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-lg");
    });
  });

  // DaisyUI Color Variants Tests
  describe("DaisyUI Color Variants", () => {
    it("applies select-primary class for primary variant", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} variant="primary" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-primary");
    });

    it("applies select-secondary class for secondary variant", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} variant="secondary" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-secondary");
    });

    it("applies select-accent class for accent variant", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} variant="accent" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-accent");
    });

    it("applies select-info class for info variant", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} variant="info" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-info");
    });

    it("applies select-success class for success variant", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} variant="success" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-success");
    });

    it("applies select-warning class for warning variant", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} variant="warning" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-warning");
    });

    it("applies select-error class for error variant", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} variant="error" />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-error");
    });
  });

  // DaisyUI Style Variants Tests
  describe("DaisyUI Style Variants", () => {
    it("applies select-bordered class for bordered style", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} bordered />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-bordered");
    });

    it("applies select-ghost class for ghost style", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} ghost />
      ));
      expect(getByRole("combobox")).toHaveClass("select", "select-ghost");
    });
  });

  // State and Interaction Tests
  describe("State and Interactions", () => {
    it("handles disabled state", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} disabled />
      ));
      expect(getByRole("combobox")).toBeDisabled();
    });

    it("handles selection change", () => {
      const onChange = vi.fn();
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ];
      const { getByRole } = render(() => (
        <Select options={options} onChange={onChange} />
      ));
      
      const select = getByRole("combobox");
      fireEvent.change(select, { target: { value: "2" } });
      
      expect(onChange).toHaveBeenCalledWith("2");
    });

    it("supports controlled value", () => {
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ];
      const { getByRole } = render(() => (
        <Select options={options} value="2" />
      ));
      
      expect(getByRole("combobox")).toHaveValue("2");
    });

    it("supports default value", () => {
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ];
      const { getByRole } = render(() => (
        <Select options={options} defaultValue="1" />
      ));
      
      expect(getByRole("combobox")).toHaveValue("1");
    });

    it("supports placeholder", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByText } = render(() => (
        <Select options={options} placeholder="Choose an option" />
      ));
      
      expect(getByText("Choose an option")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper combobox role", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => <Select options={options} />);
      expect(getByRole("combobox")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} aria-label="Select an option" />
      ));
      expect(getByRole("combobox")).toHaveAttribute("aria-label", "Select an option");
    });

    it("supports aria-describedby", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} aria-describedby="help-text" />
      ));
      expect(getByRole("combobox")).toHaveAttribute("aria-describedby", "help-text");
    });

    it("supports keyboard navigation", () => {
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ];
      const { getByRole } = render(() => <Select options={options} />);
      
      const select = getByRole("combobox");
      expect(select).toHaveAttribute("tabIndex", "0");
    });

    it("supports name attribute for forms", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} name="test-select" />
      ));
      expect(getByRole("combobox")).toHaveAttribute("name", "test-select");
    });
  });

  // Option Objects and Advanced Features
  describe("Advanced Features", () => {
    it("supports option objects with disabled options", () => {
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2", disabled: true },
        { value: "3", label: "Option 3" },
      ];
      const { getAllByRole } = render(() => <Select options={options} />);
      
      const optionElements = getAllByRole("option");
      expect(optionElements[1]).toBeDisabled();
    });

    it("supports option groups", () => {
      const options = [
        { label: "Group 1", options: [
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]},
        { label: "Group 2", options: [
          { value: "3", label: "Option 3" },
          { value: "4", label: "Option 4" },
        ]},
      ];
      const { getAllByRole } = render(() => <Select options={options} />);
      
      const groups = getAllByRole("group");
      expect(groups).toHaveLength(2);
    });

    it("handles empty options gracefully", () => {
      const { getByRole } = render(() => <Select options={[]} />);
      expect(getByRole("combobox")).toBeInTheDocument();
    });

    it("supports required attribute", () => {
      const options = [{ value: "1", label: "Option 1" }];
      const { getByRole } = render(() => (
        <Select options={options} required />
      ));
      expect(getByRole("combobox")).toBeRequired();
    });
  });

  // Error Handling and Edge Cases
  describe("Error Handling", () => {
    it("handles undefined options gracefully", () => {
      const { getByRole } = render(() => <Select options={undefined as any} />);
      expect(getByRole("combobox")).toBeInTheDocument();
    });

    it("handles invalid option values", () => {
      const options = [
        { value: null as any, label: "Invalid Option" },
        { value: "valid", label: "Valid Option" },
      ];
      const { getByRole } = render(() => <Select options={options} />);
      expect(getByRole("combobox")).toBeInTheDocument();
    });

    it("provides default behavior when onChange is not provided", () => {
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ];
      const { getByRole } = render(() => <Select options={options} />);
      
      const select = getByRole("combobox");
      expect(() => {
        fireEvent.change(select, { target: { value: "2" } });
      }).not.toThrow();
    });
  });
});
