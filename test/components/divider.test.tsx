import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Divider from "@/components/divider";

describe("Divider Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with base divider class", () => {
      const { container } = render(() => <Divider />);
      expect(container.firstChild).toHaveClass("divider");
    });

    it("renders as a div element by default", () => {
      const { container } = render(() => <Divider />);
      expect(container.firstChild?.nodeName).toBe("DIV");
    });

    it("has proper role attribute for accessibility", () => {
      const { container } = render(() => <Divider />);
      expect(container.firstChild).toHaveAttribute("role", "separator");
    });

    it("renders without content by default", () => {
      const { container } = render(() => <Divider />);
      const divider = container.firstChild as HTMLElement;
      expect(divider.textContent?.trim()).toBe("");
    });
  });

  // Text Content Tests
  describe("Text Content", () => {
    it("renders with text content", () => {
      const { getByText } = render(() => <Divider>OR</Divider>);
      expect(getByText("OR")).toBeInTheDocument();
    });

    it("renders with complex JSX children", () => {
      const { getByTestId } = render(() => (
        <Divider>
          <span data-testid="icon">⭐</span>
        </Divider>
      ));
      expect(getByTestId("icon")).toBeInTheDocument();
    });

    it("handles empty string content", () => {
      const { container } = render(() => <Divider>{""}</Divider>);
      expect(container.firstChild).toHaveClass("divider");
    });
  });

  // DaisyUI Orientation Variants Tests
  describe("DaisyUI Orientation Variants", () => {
    it("applies divider-horizontal class for horizontal orientation", () => {
      const { container } = render(() => (
        <Divider orientation="horizontal">Horizontal Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-horizontal");
    });

    it("applies divider-vertical class for vertical orientation", () => {
      const { container } = render(() => (
        <Divider orientation="vertical">Vertical Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-vertical");
    });

    it("uses horizontal as default when no orientation specified", () => {
      const { container } = render(() => <Divider>Default Divider</Divider>);
      expect(container.firstChild).toHaveClass("divider");
      // Should not have explicit orientation class when default
      expect(container.firstChild).not.toHaveClass("divider-horizontal", "divider-vertical");
    });

    it("supports neutral position styling", () => {
      const { container } = render(() => (
        <Divider position="neutral">Neutral Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-neutral");
    });

    it("supports primary position styling", () => {
      const { container } = render(() => (
        <Divider position="primary">Primary Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-primary");
    });

    it("supports secondary position styling", () => {
      const { container } = render(() => (
        <Divider position="secondary">Secondary Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-secondary");
    });

    it("supports accent position styling", () => {
      const { container } = render(() => (
        <Divider position="accent">Accent Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-accent");
    });
  });

  // Accessibility Tests (WCAG 2.1 AA Compliance)
  describe("Accessibility", () => {
    it("has correct role attribute as separator", () => {
      const { container } = render(() => <Divider />);
      expect(container.firstChild).toHaveAttribute("role", "separator");
    });

    it("supports aria-label for screen readers", () => {
      const { container } = render(() => (
        <Divider aria-label="Section separator">Content</Divider>
      ));
      expect(container.firstChild).toHaveAttribute("aria-label", "Section separator");
    });

    it("supports aria-orientation for vertical dividers", () => {
      const { container } = render(() => (
        <Divider orientation="vertical" aria-orientation="vertical">
          Vertical
        </Divider>
      ));
      expect(container.firstChild).toHaveAttribute("aria-orientation", "vertical");
    });

    it("supports aria-orientation for horizontal dividers", () => {
      const { container } = render(() => (
        <Divider orientation="horizontal" aria-orientation="horizontal">
          Horizontal
        </Divider>
      ));
      expect(container.firstChild).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("has proper semantic structure with text content", () => {
      const { container } = render(() => <Divider>Section Break</Divider>);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveAttribute("role", "separator");
      expect(divider.textContent).toContain("Section Break");
    });
  });

  // Class and Style Customization Tests
  describe("Class and Style Customization", () => {
    it("merges additional class prop", () => {
      const { container } = render(() => (
        <Divider class="custom-divider">Custom Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "custom-divider");
    });

    it("merges classList prop", () => {
      const { container } = render(() => (
        <Divider classList={{ "dynamic-class": true, "inactive-class": false }}>
          Dynamic Classes Divider
        </Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("inactive-class");
    });

    it("combines class and classList props correctly", () => {
      const { container } = render(() => (
        <Divider 
          class="static-class" 
          classList={{ "dynamic-class": true }}
        >
          Combined Classes Divider
        </Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "static-class", "dynamic-class");
    });

    it("combines orientation and custom classes", () => {
      const { container } = render(() => (
        <Divider 
          orientation="vertical"
          class="custom-vertical"
          classList={{ "active": true }}
        >
          Styled Vertical Divider
        </Divider>
      ));
      expect(container.firstChild).toHaveClass(
        "divider", 
        "divider-vertical", 
        "custom-vertical", 
        "active"
      );
    });
  });

  // Edge Cases and Error Conditions  
  describe("Edge Cases and Error Conditions", () => {
    it("handles null children gracefully", () => {
      const { container } = render(() => <Divider>{null}</Divider>);
      expect(container.firstChild).toHaveClass("divider");
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(() => <Divider>{undefined}</Divider>);
      expect(container.firstChild).toHaveClass("divider");
    });

    it("handles numeric content", () => {
      const { getByText } = render(() => <Divider>{42}</Divider>);
      expect(getByText("42")).toBeInTheDocument();
    });

    it("handles boolean content gracefully", () => {
      const { container } = render(() => <Divider>{true}</Divider>);
      expect(container.firstChild).toHaveClass("divider");
    });

    it("handles very long text content", () => {
      const longText = "Very long divider text ".repeat(20).trim();
      const { getByText } = render(() => <Divider>{longText}</Divider>);
      expect(getByText(longText)).toBeInTheDocument();
    });

    it("handles special characters in content", () => {
      const specialContent = "Divider with <script>alert('xss')</script> & special chars: äöü";
      const { getByText } = render(() => <Divider>{specialContent}</Divider>);
      expect(getByText(specialContent)).toBeInTheDocument();
    });

    it("handles invalid orientation gracefully", () => {
      const { container } = render(() => (
        // @ts-expect-error Testing invalid value
        <Divider orientation="invalid">Invalid Orientation</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider");
      expect(container.firstChild).not.toHaveClass("divider-invalid");
    });

    it("handles invalid position gracefully", () => {
      const { container } = render(() => (
        // @ts-expect-error Testing invalid value
        <Divider position="invalid">Invalid Position</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider");
      expect(container.firstChild).not.toHaveClass("divider-invalid");
    });
  });

  // DaisyUI Color Variants Tests
  describe("DaisyUI Color Variants", () => {
    it("supports info color", () => {
      const { container } = render(() => (
        <Divider color="info">Info Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-info");
    });

    it("supports success color", () => {
      const { container } = render(() => (
        <Divider color="success">Success Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-success");
    });

    it("supports warning color", () => {
      const { container } = render(() => (
        <Divider color="warning">Warning Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-warning");
    });

    it("supports error color", () => {
      const { container } = render(() => (
        <Divider color="error">Error Divider</Divider>
      ));
      expect(container.firstChild).toHaveClass("divider", "divider-error");
    });
  });

  // Responsive Behavior Tests
  describe("Responsive Behavior", () => {
    it("maintains structure with responsive classes", () => {
      const { container } = render(() => (
        <Divider class="md:divider-vertical lg:divider-horizontal">
          Responsive Divider
        </Divider>
      ));
      expect(container.firstChild).toHaveClass(
        "divider", 
        "md:divider-vertical", 
        "lg:divider-horizontal"
      );
    });

    it("works with responsive orientation switching", () => {
      const { container } = render(() => (
        <Divider 
          orientation="horizontal"
          classList={{ "md:divider-vertical": true }}
        >
          Responsive Orientation
        </Divider>
      ));
      expect(container.firstChild).toHaveClass(
        "divider", 
        "divider-horizontal", 
        "md:divider-vertical"
      );
    });
  });
});
