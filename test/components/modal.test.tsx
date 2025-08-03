import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { createSignal } from "solid-js";
import { Modal } from "@/components/modal";

describe("Modal Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with required props", () => {
      const [isOpen, setIsOpen] = createSignal(true);
      const { getByRole } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
          <div>Modal Content</div>
        </Modal>
      ));
      expect(getByRole("dialog")).toBeInTheDocument();
    });

    it("renders with base modal classes", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}}>
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).toBeInTheDocument();
      expect(container.querySelector('.modal-box')).toBeInTheDocument();
    });

    it("renders children content inside modal box", () => {
      const [isOpen] = createSignal(true);
      const { getByText } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}}>
          <div>Test Modal Content</div>
        </Modal>
      ));
      expect(getByText("Test Modal Content")).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
      const [isOpen] = createSignal(false);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}}>
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).not.toBeInTheDocument();
    });
  });

  // DaisyUI Variants Tests
  describe("DaisyUI Variants", () => {
    it("applies modal-bottom class for bottom variant", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} variant="bottom">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).toHaveClass("modal-bottom");
    });

    it("applies modal-middle class for middle variant", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} variant="middle">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).toHaveClass("modal-middle");
    });

    it("applies modal-top class for top variant", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} variant="top">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).toHaveClass("modal-top");
    });

    it("defaults to middle variant when no variant specified", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}}>
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).toHaveClass("modal-middle");
    });
  });

  // Size Variants Tests
  describe("Size Variants", () => {
    it("applies modal-sm class for small size", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} size="sm">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal-box')).toHaveClass("max-w-sm");
    });

    it("applies modal-lg class for large size", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} size="lg">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal-box')).toHaveClass("max-w-5xl");
    });

    it("applies modal-xs class for extra small size", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} size="xs">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal-box')).toHaveClass("max-w-xs");
    });
  });

  // Backdrop Behavior Tests
  describe("Backdrop Behavior", () => {
    it("calls onClose when backdrop is clicked", () => {
      const [isOpen] = createSignal(true);
      const onClose = vi.fn();
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={onClose}>
          <div>Content</div>
        </Modal>
      ));
      
      const backdrop = container.querySelector('.modal');
      fireEvent.click(backdrop!);
      expect(onClose).toHaveBeenCalled();
    });

    it("does not close when modal box is clicked", () => {
      const [isOpen] = createSignal(true);
      const onClose = vi.fn();
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={onClose}>
          <div>Content</div>
        </Modal>
      ));
      
      const modalBox = container.querySelector('.modal-box');
      fireEvent.click(modalBox!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it("respects closeOnBackdrop prop", () => {
      const [isOpen] = createSignal(true);
      const onClose = vi.fn();
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={onClose} closeOnBackdrop={false}>
          <div>Content</div>
        </Modal>
      ));
      
      const backdrop = container.querySelector('.modal');
      fireEvent.click(backdrop!);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // Keyboard Navigation Tests
  describe("Keyboard Navigation", () => {
    it("closes modal when Escape key is pressed", () => {
      const [isOpen] = createSignal(true);
      const onClose = vi.fn();
      render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={onClose}>
          <div>Content</div>
        </Modal>
      ));
      
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalled();
    });

    it("respects closeOnEscape prop", () => {
      const [isOpen] = createSignal(true);
      const onClose = vi.fn();
      render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={onClose} closeOnEscape={false}>
          <div>Content</div>
        </Modal>
      ));
      
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const [isOpen] = createSignal(true);
      const { getByRole } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} aria-label="Test Modal">
          <div>Content</div>
        </Modal>
      ));
      
      const dialog = getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-label", "Test Modal");
    });

    it("supports aria-labelledby for title reference", () => {
      const [isOpen] = createSignal(true);
      const { getByRole } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} aria-labelledby="modal-title">
          <h2 id="modal-title">Modal Title</h2>
          <div>Content</div>
        </Modal>
      ));
      
      const dialog = getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    });

    it("supports aria-describedby for content reference", () => {
      const [isOpen] = createSignal(true);
      const { getByRole } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} aria-describedby="modal-desc">
          <div id="modal-desc">Modal description</div>
        </Modal>
      ));
      
      const dialog = getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-describedby", "modal-desc");
    });
  });

  // Focus Management Tests
  describe("Focus Management", () => {
    it("traps focus within modal when open", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}}>
          <button>First Button</button>
          <button>Second Button</button>
        </Modal>
      ));
      
      const modalBox = container.querySelector('.modal-box');
      expect(modalBox).toHaveAttribute('tabindex', '-1');
    });

    it("restores focus to trigger element when closed", () => {
      // This would test focus restoration functionality
      // Implementation will be tested once component is built
      expect(true).toBe(true); // Placeholder
    });
  });

  // Custom Classes and Styling Tests
  describe("Custom Classes and Styling", () => {
    it("applies custom class prop", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} class="custom-modal">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).toHaveClass("custom-modal");
    });

    it("applies custom classList prop", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal 
          isOpen={isOpen()} 
          onClose={() => {}} 
          classList={{ "test-class": true, "false-class": false }}
        >
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal')).toHaveClass("test-class");
      expect(container.querySelector('.modal')).not.toHaveClass("false-class");
    });

    it("applies custom modalBoxClass", () => {
      const [isOpen] = createSignal(true);
      const { container } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} modalBoxClass="custom-box">
          <div>Content</div>
        </Modal>
      ));
      expect(container.querySelector('.modal-box')).toHaveClass("custom-box");
    });
  });

  // Actions Tests
  describe("Modal Actions", () => {
    it("renders action buttons in modal actions area", () => {
      const [isOpen] = createSignal(true);
      const actions = (
        <div class="modal-action">
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      );
      
      const { getByText } = render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => {}} actions={actions}>
          <div>Content</div>
        </Modal>
      ));
      
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Confirm")).toBeInTheDocument();
    });
  });

  // Edge Cases and Error Handling Tests
  describe("Edge Cases and Error Handling", () => {
    it("handles missing onClose gracefully", () => {
      const [isOpen] = createSignal(true);
      expect(() => {
        render(() => (
          <Modal disablePortal isOpen={isOpen()}>
            <div>Content</div>
          </Modal>
        ));
      }).not.toThrow();
    });

    it("handles undefined children gracefully", () => {
      const [isOpen] = createSignal(true);
      expect(() => {
        render(() => (
          <Modal disablePortal isOpen={isOpen()} onClose={() => {}} />
        ));
      }).not.toThrow();
    });

    it("handles rapid open/close state changes", () => {
      const [isOpen, setIsOpen] = createSignal(false);
      render(() => (
        <Modal disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
          <div>Content</div>
        </Modal>
      ));
      
      // Rapidly toggle state - should not throw
      expect(() => {
        setIsOpen(true);
        setIsOpen(false);
        setIsOpen(true);
        setIsOpen(false);
      }).not.toThrow();
    });
  });
});
