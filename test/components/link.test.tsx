import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Link from "@/components/link";

describe("Link Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with children", () => {
      const { getByText } = render(() => <Link>Test Link</Link>);
      expect(getByText("Test Link")).toBeInTheDocument();
    });

    it("renders as anchor element with base link class", () => {
      const { container } = render(() => <Link>Test Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement.tagName).toBe("A");
      expect(linkElement).toHaveClass("link");
    });

    it("has proper href attribute when provided", () => {
      const { container } = render(() => <Link href="/test">Test Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("href", "/test");
    });

    it("renders without href as button-like link", () => {
      const { container } = render(() => <Link>Button Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement.tagName).toBe("A");
      expect(linkElement).not.toHaveAttribute("href");
    });
  });

  // Router Integration Tests
  describe("Router Integration", () => {
    it("uses regular anchor for internal links when router is not available", () => {
      const { container } = render(() => <Link href="/internal">Internal Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement.tagName).toBe("A");
      expect(linkElement).toHaveAttribute("href", "/internal");
    });

    it("uses regular anchor for external links", () => {
      const { container } = render(() => <Link href="https://example.com">External Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement.tagName).toBe("A");
      expect(linkElement).toHaveAttribute("href", "https://example.com");
    });

    it("uses regular anchor for special protocol links", () => {
      const { container } = render(() => <Link href="mailto:test@example.com">Email Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement.tagName).toBe("A");
      expect(linkElement).toHaveAttribute("href", "mailto:test@example.com");
    });

    it("detects relative paths as internal", () => {
      const testCases = ["/dashboard", "./page", "../parent", "#section", "?query=1"];
      testCases.forEach(href => {
        const { container } = render(() => <Link href={href}>Test Link</Link>);
        const linkElement = container.firstChild as HTMLElement;
        expect(linkElement).toHaveAttribute("href", href);
      });
    });

    it("detects external URLs correctly", () => {
      const testCases = [
        "https://example.com",
        "http://example.com", 
        "//example.com",
        "mailto:test@example.com",
        "tel:+1234567890",
        "ftp://files.example.com"
      ];
      testCases.forEach(href => {
        const { container } = render(() => <Link href={href}>Test Link</Link>);
        const linkElement = container.firstChild as HTMLElement;
        expect(linkElement).toHaveAttribute("href", href);
      });
    });
  });

  // DaisyUI Color Variants Tests
  describe("DaisyUI Color Variants", () => {
    it("applies link-primary class for primary variant", () => {
      const { container } = render(() => (
        <Link variant="primary">Primary Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-primary");
    });

    it("applies link-secondary class for secondary variant", () => {
      const { container } = render(() => (
        <Link variant="secondary">Secondary Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-secondary");
    });

    it("applies link-accent class for accent variant", () => {
      const { container } = render(() => (
        <Link variant="accent">Accent Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-accent");
    });

    it("applies link-neutral class for neutral variant", () => {
      const { container } = render(() => (
        <Link variant="neutral">Neutral Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-neutral");
    });

    it("applies link-success class for success variant", () => {
      const { container } = render(() => (
        <Link variant="success">Success Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-success");
    });

    it("applies link-warning class for warning variant", () => {
      const { container } = render(() => (
        <Link variant="warning">Warning Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-warning");
    });

    it("applies link-error class for error variant", () => {
      const { container } = render(() => (
        <Link variant="error">Error Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-error");
    });

    it("applies link-info class for info variant", () => {
      const { container } = render(() => (
        <Link variant="info">Info Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-info");
    });

    it("works without variant specified", () => {
      const { container } = render(() => <Link>Default Link</Link>);
      expect(container.firstChild).toHaveClass("link");
      expect(container.firstChild).not.toHaveClass("link-primary", "link-secondary", "link-accent", "link-neutral");
    });
  });

  // DaisyUI Style Modifiers Tests
  describe("DaisyUI Style Modifiers", () => {
    it("applies link-hover class for hover style", () => {
      const { container } = render(() => (
        <Link hover>Hover Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-hover");
    });

    it("applies no-underline class when underline is false", () => {
      const { container } = render(() => (
        <Link underline={false}>No Underline Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "no-underline");
    });

    it("works with both hover and underline props", () => {
      const { container } = render(() => (
        <Link hover underline={false}>Styled Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "link-hover", "no-underline");
    });
  });

  // Accessibility Tests (WCAG 2.1 AA Compliance)
  describe("Accessibility", () => {
    it("has proper role for links with href", () => {
      const { container } = render(() => (
        <Link href="/test">Test Link</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("role", "link");
    });

    it("has proper role for button-like links without href", () => {
      const { container } = render(() => (
        <Link>Button Link</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("role", "button");
    });

    it("supports aria-label for accessibility", () => {
      const { container } = render(() => (
        <Link aria-label="Navigate to test page" href="/test">Test</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("aria-label", "Navigate to test page");
    });

    it("supports aria-describedby for additional context", () => {
      const { container } = render(() => (
        <Link aria-describedby="link-description">Test Link</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("aria-describedby", "link-description");
    });

    it("is focusable with tabindex", () => {
      const { container } = render(() => <Link>Focusable Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("tabindex", "0");
    });

    it("supports custom tabindex", () => {
      const { container } = render(() => <Link tabIndex={-1}>Non-focusable Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("tabindex", "-1");
    });

    it("supports disabled state with proper accessibility", () => {
      const { container } = render(() => <Link disabled>Disabled Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("aria-disabled", "true");
      expect(linkElement).toHaveAttribute("tabindex", "-1");
    });
  });

  // User Interactions Tests
  describe("User Interactions", () => {
    it("calls onClick handler when clicked", () => {
      const onClickMock = vi.fn();
      const { getByText } = render(() => (
        <Link onClick={onClickMock}>Clickable Link</Link>
      ));
      
      fireEvent.click(getByText("Clickable Link"));
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("calls onClick with proper event object", () => {
      const onClickMock = vi.fn();
      const { getByText } = render(() => (
        <Link onClick={onClickMock}>Clickable Link</Link>
      ));
      
      fireEvent.click(getByText("Clickable Link"));
      expect(onClickMock).toHaveBeenCalledWith(expect.any(Object));
    });

    it("prevents default navigation when preventDefault is called in onClick", () => {
      const onClickMock = vi.fn((event) => event.preventDefault());
      const { getByText } = render(() => (
        <Link href="/test" onClick={onClickMock}>Preventable Link</Link>
      ));
      
      fireEvent.click(getByText("Preventable Link"));
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("doesn't call onClick when disabled", () => {
      const onClickMock = vi.fn();
      const { getByText } = render(() => (
        <Link disabled onClick={onClickMock}>Disabled Link</Link>
      ));
      
      fireEvent.click(getByText("Disabled Link"));
      expect(onClickMock).not.toHaveBeenCalled();
    });

    it("supports keyboard navigation with Enter key", () => {
      const onClickMock = vi.fn();
      const { getByText } = render(() => (
        <Link onClick={onClickMock}>Keyboard Link</Link>
      ));
      
      const linkElement = getByText("Keyboard Link");
      fireEvent.keyDown(linkElement, { key: 'Enter' });
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard navigation with Space key", () => {
      const onClickMock = vi.fn();
      const { getByText } = render(() => (
        <Link onClick={onClickMock}>Keyboard Link</Link>
      ));
      
      const linkElement = getByText("Keyboard Link");
      fireEvent.keyDown(linkElement, { key: ' ' });
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("doesn't trigger keyboard events when disabled", () => {
      const onClickMock = vi.fn();
      const { getByText } = render(() => (
        <Link disabled onClick={onClickMock}>Disabled Keyboard Link</Link>
      ));
      
      const linkElement = getByText("Disabled Keyboard Link");
      fireEvent.keyDown(linkElement, { key: 'Enter' });
      fireEvent.keyDown(linkElement, { key: ' ' });
      expect(onClickMock).not.toHaveBeenCalled();
    });
  });

  // Class and Style Customization Tests
  describe("Class and Style Customization", () => {
    it("merges additional class prop", () => {
      const { container } = render(() => (
        <Link class="custom-link">Link with Custom Class</Link>
      ));
      expect(container.firstChild).toHaveClass("link", "custom-link");
    });

    it("merges classList prop", () => {
      const { container } = render(() => (
        <Link classList={{ "dynamic-class": true, "inactive-class": false }}>
          Link with Dynamic Classes
        </Link>
      ));
      expect(container.firstChild).toHaveClass("link", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("inactive-class");
    });

    it("combines class and classList props correctly", () => {
      const { container } = render(() => (
        <Link 
          class="static-class" 
          classList={{ "dynamic-class": true }}
        >
          Combined Classes Link
        </Link>
      ));
      expect(container.firstChild).toHaveClass("link", "static-class", "dynamic-class");
    });

    it("applies disabled styling when disabled", () => {
      const { container } = render(() => (
        <Link disabled>Disabled Link</Link>
      ));
      expect(container.firstChild).toHaveClass("link");
      // Disabled state is handled via aria-disabled and tabindex, not CSS classes in DaisyUI
    });
  });

  // Target and Relationship Tests
  describe("Target and Relationship", () => {
    it("supports target attribute for external links", () => {
      const { container } = render(() => (
        <Link href="https://example.com" target="_blank">External Link</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("target", "_blank");
    });

    it("adds rel='noopener noreferrer' for external links with target='_blank'", () => {
      const { container } = render(() => (
        <Link href="https://example.com" target="_blank">External Link</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("supports custom rel attribute", () => {
      const { container } = render(() => (
        <Link href="/test" rel="prev">Previous Page</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("rel", "prev");
    });

    it("merges custom rel with security rel for external links", () => {
      const { container } = render(() => (
        <Link href="https://example.com" target="_blank" rel="sponsored">External Link</Link>
      ));
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("rel", "sponsored noopener noreferrer");
    });
  });

  // Edge Cases and Error Conditions
  describe("Edge Cases and Error Conditions", () => {
    it("handles null children gracefully", () => {
      const { container } = render(() => <Link>{null}</Link>);
      expect(container.firstChild).toHaveClass("link");
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(() => <Link>{undefined}</Link>);
      expect(container.firstChild).toHaveClass("link");
    });

    it("handles empty string href", () => {
      const { container } = render(() => <Link href="">Empty Href Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("href", "");
    });

    it("handles very long href", () => {
      const longHref = "https://example.com/" + "path/".repeat(100);
      const { container } = render(() => <Link href={longHref}>Long URL Link</Link>);
      const linkElement = container.firstChild as HTMLElement;
      expect(linkElement).toHaveAttribute("href", longHref);
    });

    it("handles special characters in content", () => {
      const specialContent = "Link with <script>alert('xss')</script> & special chars: äöü";
      const { getByText } = render(() => <Link>{specialContent}</Link>);
      expect(getByText(specialContent)).toBeInTheDocument();
    });

    it("handles complex children elements", () => {
      const { getByText, getByTestId } = render(() => (
        <Link>
          <span data-testid="icon">🔗</span>
          <span>Complex Link</span>
        </Link>
      ));
      expect(getByTestId("icon")).toBeInTheDocument();
      expect(getByText("Complex Link")).toBeInTheDocument();
    });
  });

  // Integration Tests
  describe("Integration", () => {
    it("works with all props combined", () => {
      const onClickMock = vi.fn();
      const { container, getByText } = render(() => (
        <Link 
          href="/test"
          variant="primary"
          hover
          underline={false}
          target="_blank"
          aria-label="Test link"
          class="custom-class"
          classList={{ "dynamic-class": true }}
          onClick={onClickMock}
        >
          Full Featured Link
        </Link>
      ));
      
      const linkElement = container.firstChild as HTMLElement;
      
      expect(linkElement).toHaveClass(
        "link", 
        "link-primary", 
        "link-hover", 
        "no-underline",
        "custom-class", 
        "dynamic-class"
      );
      expect(linkElement).toHaveAttribute("href", "/test");
      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
      expect(linkElement).toHaveAttribute("aria-label", "Test link");
      expect(linkElement).toHaveAttribute("role", "link");
      
      fireEvent.click(getByText("Full Featured Link"));
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("works as button-like link with all features", () => {
      const onClickMock = vi.fn();
      const { container, getByText } = render(() => (
        <Link 
          variant="accent"
          hover
          aria-label="Button link"
          onClick={onClickMock}
          class="btn-like"
        >
          Button Link
        </Link>
      ));
      
      const linkElement = container.firstChild as HTMLElement;
      
      expect(linkElement).toHaveClass("link", "link-accent", "link-hover", "btn-like");
      expect(linkElement).not.toHaveAttribute("href");
      expect(linkElement).toHaveAttribute("role", "button");
      expect(linkElement).toHaveAttribute("aria-label", "Button link");
      
      fireEvent.click(getByText("Button Link"));
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
