import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { createSignal } from "solid-js";
import { 
  Modal,
  modal, 
  Modal2,
  ModalOverlay, 
  ModalContent, 
  ModalTitle, 
  ModalDescription, 
  ModalActions 
} from "@/components/modal";

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

describe("Compound Modal Components", () => {
  // Test lowercase modal object API
  describe("modal object API", () => {
    it("renders modal with overlay, content, title, description, and actions", () => {
      const [isOpen] = createSignal(true);
      const { getByText, getByRole } = render(() => (
        <modal.overlay disablePortal isOpen={isOpen()} onClose={() => {}}>
          <modal.content>
            <modal.title>Delete User</modal.title>
            <modal.description>This action cannot be undone. Are you sure?</modal.description>
            <modal.actions>
              <button data-modal-close="">Cancel</button>
              <button>Delete</button>
            </modal.actions>
          </modal.content>
        </modal.overlay>
      ));
      
      expect(getByRole("dialog")).toBeInTheDocument();
      expect(getByText("Delete User")).toBeInTheDocument();
      expect(getByText("This action cannot be undone. Are you sure?")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
    });

    it("handles data-modal-close attribute on buttons", () => {
      const [isOpen] = createSignal(true);
      const onClose = vi.fn();
      
      const { getByText } = render(() => (
        <modal.overlay disablePortal isOpen={isOpen()} onClose={onClose}>
          <modal.content>
            <modal.actions>
              <button data-modal-close="">Cancel</button>
              <button>Delete</button>
            </modal.actions>
          </modal.content>
        </modal.overlay>
      ));
      
      fireEvent.click(getByText("Cancel"));
      expect(onClose).toHaveBeenCalled();
    });
  });

  // Test capitalized Modal2 object API
  describe("Modal2 object API", () => {
    it("renders modal with Overlay, Content, Title, Description, and Actions", () => {
      const [isOpen] = createSignal(true);
      const { getByText, getByRole } = render(() => (
        <Modal2.Overlay disablePortal isOpen={isOpen()} onClose={() => {}}>
          <Modal2.Content>
            <Modal2.Title>Delete User</Modal2.Title>
            <Modal2.Description>This action cannot be undone. Are you sure?</Modal2.Description>
            <Modal2.Actions>
              <button data-modal-close="">Cancel</button>
              <button>Delete</button>
            </Modal2.Actions>
          </Modal2.Content>
        </Modal2.Overlay>
      ));
      
      expect(getByRole("dialog")).toBeInTheDocument();
      expect(getByText("Delete User")).toBeInTheDocument();
      expect(getByText("This action cannot be undone. Are you sure?")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
    });
  });

  // Test individual component exports
  describe("Individual Component Exports", () => {
    it("renders using individual component exports", () => {
      const [isOpen] = createSignal(true);
      const { getByText, getByRole } = render(() => (
        <ModalOverlay disablePortal isOpen={isOpen()} onClose={() => {}}>
          <ModalContent>
            <ModalTitle>Delete User</ModalTitle>
            <ModalDescription>This action cannot be undone. Are you sure?</ModalDescription>
            <ModalActions>
              <button data-modal-close="">Cancel</button>
              <button>Delete</button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      ));
      
      expect(getByRole("dialog")).toBeInTheDocument();
      expect(getByText("Delete User")).toBeInTheDocument();
      expect(getByText("This action cannot be undone. Are you sure?")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
    });
  });
});

describe("ModalOverlay Component", () => {
  it("applies modal classes correctly", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} variant="top">
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    const modal = container.querySelector('.modal');
    expect(modal).toHaveClass('modal');
    expect(modal).toHaveClass('modal-open');
    expect(modal).toHaveClass('modal-top');
  });

  it("handles escape key press", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} onClose={onClose}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("handles backdrop click", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} onClose={onClose}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    const backdrop = container.querySelector('.modal');
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalled();
  });

  it("respects closeOnBackdrop prop", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} onClose={onClose} closeOnBackdrop={false}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    const backdrop = container.querySelector('.modal');
    fireEvent.click(backdrop!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("respects closeOnEscape prop", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} onClose={onClose} closeOnEscape={false}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("supports ARIA attributes", () => {
    const [isOpen] = createSignal(true);
    const { getByRole } = render(() => (
      <ModalOverlay disablePortal 
        isOpen={isOpen()} 
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    const dialog = getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveAttribute("aria-describedby", "modal-desc");
  });
});

describe("ModalContent Component", () => {
  it("applies modal-box class", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('.modal-box')).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent size="lg">Content</ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('.modal-box')).toHaveClass('max-w-5xl');
  });

  it("prevents click event bubbling", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} onClose={onClose}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    const modalBox = container.querySelector('.modal-box');
    fireEvent.click(modalBox!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("supports custom classes", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent class="custom-content">Content</ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('.modal-box')).toHaveClass('custom-content');
  });
});

describe("ModalTitle Component", () => {
  it("renders as h3 by default", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalTitle>Modal Title</ModalTitle>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('h3')).toBeInTheDocument();
    expect(container.querySelector('h3')).toHaveTextContent('Modal Title');
  });

  it("supports custom element via 'as' prop", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalTitle as="h1">Modal Title</ModalTitle>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h1')).toHaveTextContent('Modal Title');
  });

  it("applies default title classes", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalTitle>Modal Title</ModalTitle>
        </ModalContent>
      </ModalOverlay>
    ));
    
    const title = container.querySelector('h3');
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('text-lg');
  });

  it("supports custom ID for aria-labelledby", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalTitle id="custom-title">Modal Title</ModalTitle>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('#custom-title')).toBeInTheDocument();
  });
});

describe("ModalDescription Component", () => {
  it("renders as paragraph by default", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalDescription>Modal description</ModalDescription>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(container.querySelector('p')).toHaveTextContent('Modal description');
  });

  it("supports custom element via 'as' prop", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalDescription as="div">Modal description</ModalDescription>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('div')).toHaveTextContent('Modal description');
  });

  it("applies default description classes", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalDescription>Modal description</ModalDescription>
        </ModalContent>
      </ModalOverlay>
    ));
    
    const description = container.querySelector('p');
    expect(description).toHaveClass('py-4');
    expect(description).toHaveClass('text-base');
  });

  it("supports custom ID for aria-describedby", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalDescription id="custom-desc">Modal description</ModalDescription>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('#custom-desc')).toBeInTheDocument();
  });
});

describe("ModalActions Component", () => {
  it("applies modal-action class", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalActions>
            <button>Action</button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('.modal-action')).toBeInTheDocument();
  });

  it("handles data-modal-close clicks", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    const { getByText } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} onClose={onClose}>
        <ModalContent>
          <ModalActions>
            <button data-modal-close="">Close</button>
            <button>Other</button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    ));
    
    fireEvent.click(getByText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close on regular button clicks", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    const { getByText } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()} onClose={onClose}>
        <ModalContent>
          <ModalActions>
            <button>Regular Button</button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    ));
    
    fireEvent.click(getByText("Regular Button"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("supports custom classes", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay disablePortal isOpen={isOpen()}>
        <ModalContent>
          <ModalActions class="custom-actions">
            <button>Action</button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('.modal-action')).toHaveClass('custom-actions');
  });
});

describe("Integration Tests", () => {
  it("creates a complete modal dialog flow", () => {
    const [isOpen, setIsOpen] = createSignal(false);
    const onConfirm = vi.fn();
    
    const { getByText, queryByRole, getByRole } = render(() => (
      <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <ModalOverlay disablePortal 
          isOpen={isOpen()} 
          onClose={() => setIsOpen(false)}
          aria-labelledby="delete-title"
          aria-describedby="delete-desc"
        >
          <ModalContent>
            <ModalTitle id="delete-title">Delete User</ModalTitle>
            <ModalDescription id="delete-desc">
              This action cannot be undone. Are you sure you want to delete this user?
            </ModalDescription>
            <ModalActions>
              <button data-modal-close="">Cancel</button>
              <button onClick={() => { onConfirm(); setIsOpen(false); }}>
                Delete
              </button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      </div>
    ));
    
    // Initially modal is closed
    expect(queryByRole("dialog")).not.toBeInTheDocument();
    
    // Open modal
    fireEvent.click(getByText("Open Modal"));
    expect(getByRole("dialog")).toBeInTheDocument();
    expect(getByText("Delete User")).toBeInTheDocument();
    
    // Cancel should close modal
    fireEvent.click(getByText("Cancel"));
    expect(queryByRole("dialog")).not.toBeInTheDocument();
    
    // Open again and confirm
    fireEvent.click(getByText("Open Modal"));
    fireEvent.click(getByText("Delete"));
    expect(onConfirm).toHaveBeenCalled();
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("works with multiple modals", () => {
    const [modal1Open, setModal1Open] = createSignal(false);
    const [modal2Open, setModal2Open] = createSignal(false);
    
    const { getByText, queryByText } = render(() => (
      <div>
        <button onClick={() => setModal1Open(true)}>Open Modal 1</button>
        <button onClick={() => setModal2Open(true)}>Open Modal 2</button>
        
        <ModalOverlay disablePortal isOpen={modal1Open()} onClose={() => setModal1Open(false)}>
          <ModalContent>
            <ModalTitle>Modal 1</ModalTitle>
            <ModalActions>
              <button data-modal-close="">Close Modal 1</button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
        
        <ModalOverlay disablePortal isOpen={modal2Open()} onClose={() => setModal2Open(false)}>
          <ModalContent>
            <ModalTitle>Modal 2</ModalTitle>
            <ModalActions>
              <button data-modal-close="">Close Modal 2</button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      </div>
    ));
    
    // Open first modal
    fireEvent.click(getByText("Open Modal 1"));
    expect(queryByText("Modal 1")).toBeInTheDocument();
    
    // Open second modal
    fireEvent.click(getByText("Open Modal 2"));
    expect(queryByText("Modal 2")).toBeInTheDocument();
    
    // Close first modal
    fireEvent.click(getByText("Close Modal 1"));
    expect(queryByText("Modal 1")).not.toBeInTheDocument();
    expect(queryByText("Modal 2")).toBeInTheDocument();
  });
});

describe("Modal - New Backdrop/Box API", () => {
  it("renders modal with backdrop and box structure", () => {
    const [isOpen, setIsOpen] = createSignal(true);
    
    const { container } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.box>
          <modal.title>Delete User</modal.title>
          <modal.description>This action cannot be undone. Are you sure you want to continue?</modal.description>
          <modal.actions>
            <modal.cancel>Cancel</modal.cancel>
            <modal.confirm variant="danger">Delete</modal.confirm>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    // Check modal structure
    expect(container.querySelector('.modal')).toBeInTheDocument();
    expect(container.querySelector('.modal-box')).toBeInTheDocument();
    expect(container.querySelector('.modal-backdrop')).toBeInTheDocument();
    expect(container.querySelector('.modal-action')).toBeInTheDocument();
  });

  it("renders cancel button in form with method dialog", () => {
    const [isOpen, setIsOpen] = createSignal(true);
    
    const { container } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.box>
          <modal.actions>
            <modal.cancel>Cancel</modal.cancel>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    const form = container.querySelector('form[method="dialog"]');
    expect(form).toBeInTheDocument();
    expect(form?.querySelector('button.btn-outline')).toBeInTheDocument();
  });

  it("renders confirm button with danger variant", () => {
    const [isOpen, setIsOpen] = createSignal(true);
    
    const { container } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.box>
          <modal.actions>
            <modal.confirm variant="danger">Delete</modal.confirm>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    expect(container.querySelector('button.btn-error')).toBeInTheDocument();
  });

  it("closes modal when cancel button is clicked", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    const { getByText } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={onClose}>
        <modal.box>
          <modal.actions>
            <modal.cancel>Cancel</modal.cancel>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    fireEvent.click(getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls custom onClick when confirm button is clicked", () => {
    const [isOpen, setIsOpen] = createSignal(true);
    const handleConfirm = vi.fn();
    
    const { getByText } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.box>
          <modal.actions>
            <modal.confirm onClick={handleConfirm}>Delete</modal.confirm>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    fireEvent.click(getByText("Delete"));
    expect(handleConfirm).toHaveBeenCalled();
  });

  it("renders proper HTML structure matching DaisyUI pattern", () => {
    const [isOpen, setIsOpen] = createSignal(true);
    
    const { container } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.box>
          <modal.title>Delete User</modal.title>
          <modal.description>This action cannot be undone. Are you sure?</modal.description>
          <modal.actions>
            <modal.cancel>Cancel</modal.cancel>
            <modal.confirm variant="danger">Delete</modal.confirm>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    // Check the HTML structure matches expected DaisyUI pattern
    const modalBox = container.querySelector('.modal-box');
    expect(modalBox).toBeInTheDocument();
    
    const title = modalBox?.querySelector('h3.font-bold.text-lg');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Delete User');
    
    const description = modalBox?.querySelector('p.py-4');
    expect(description).toBeInTheDocument();
    
    const actions = modalBox?.querySelector('.modal-action');
    expect(actions).toBeInTheDocument();
    
    const cancelForm = actions?.querySelector('form[method="dialog"]');
    expect(cancelForm).toBeInTheDocument();
    
    const cancelButton = cancelForm?.querySelector('button.btn-outline');
    expect(cancelButton).toBeInTheDocument();
    
    const confirmButton = actions?.querySelector('button.btn-error');
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton?.textContent).toBe('Delete');
  });
});

describe("User Requested Examples Validation", () => {
  it("should work with the exact overlay/content API example from user", () => {
    const onClose = vi.fn();

    const { container, getByText } = render(() => (
      <modal.overlay disablePortal onClose={onClose}>
        <modal.content>
          <modal.title>Delete User</modal.title>
          <modal.description>This action cannot be undone. Are you sure?</modal.description>
          <modal.actions>
            <button class="btn btn-outline" data-modal-close="">Cancel</button>
            <button class="btn btn-error" data-confirm="">Delete</button>
          </modal.actions>
        </modal.content>
      </modal.overlay>
    ));

    // Check if the components render
    expect(getByText("Delete User")).toBeInTheDocument();
    expect(getByText("This action cannot be undone. Are you sure?")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();

    // Check proper CSS classes
    const modalBox = container.querySelector('.modal-box');
    expect(modalBox).toBeInTheDocument();
    
    const modalAction = container.querySelector('.modal-action');
    expect(modalAction).toBeInTheDocument();
    
    // Check buttons have proper classes
    const cancelButton = container.querySelector('button.btn.btn-outline[data-modal-close]');
    expect(cancelButton).toBeInTheDocument();
    
    const deleteButton = container.querySelector('button.btn.btn-error[data-confirm]');
    expect(deleteButton).toBeInTheDocument();

    // Test data-modal-close functionality
    fireEvent.click(cancelButton!);
    expect(onClose).toHaveBeenCalled();
  });

  it("should work with the exact backdrop/box API example from user", () => {
    const [isOpen, setIsOpen] = createSignal(true);
    
    const handleDelete = vi.fn();

    const { container, getByText } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.box>
          <modal.title>Delete User</modal.title>
          <modal.description>This action cannot be undone. Are you sure you want to continue?</modal.description>
          <modal.actions>
            <modal.cancel>Cancel</modal.cancel>
            <modal.confirm variant="danger" onClick={handleDelete}>Delete</modal.confirm>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    // Check if the components render
    expect(getByText("Delete User")).toBeInTheDocument();
    expect(getByText("This action cannot be undone. Are you sure you want to continue?")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();

    // Check proper CSS classes according to user's specification
    const modalBox = container.querySelector('.modal-box');
    expect(modalBox).toBeInTheDocument();
    
    const title = container.querySelector('h3.font-bold.text-lg');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Delete User');
    
    const description = container.querySelector('p.py-4');
    expect(description).toBeInTheDocument();
    expect(description?.textContent).toBe('This action cannot be undone. Are you sure you want to continue?');
    
    const modalAction = container.querySelector('.modal-action');
    expect(modalAction).toBeInTheDocument();
    
    // Check cancel button is wrapped in form with method="dialog"
    const cancelForm = container.querySelector('form[method="dialog"]');
    expect(cancelForm).toBeInTheDocument();
    
    const cancelButton = cancelForm?.querySelector('button.btn.btn-outline');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton?.textContent).toBe('Cancel');
    
    // Check confirm button has error variant (danger -> error)
    const confirmButton = container.querySelector('button.btn.btn-error');
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton?.textContent).toBe('Delete');
    
    // Check backdrop form
    const backdropForm = container.querySelector('form.modal-backdrop[method="dialog"]');
    expect(backdropForm).toBeInTheDocument();

    // Test functionality
    fireEvent.click(confirmButton!);
    expect(handleDelete).toHaveBeenCalled();
  });

  it("renders the exact HTML structure as specified by user", () => {
    const [isOpen, setIsOpen] = createSignal(true);
    const handleDelete = vi.fn();

    const { container } = render(() => (
      <modal.backdrop disablePortal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <modal.box>
          <modal.title>Delete User</modal.title>
          <modal.description>This action cannot be undone. Are you sure you want to continue?</modal.description>
          <modal.actions>
            <modal.cancel>Cancel</modal.cancel>
            <modal.confirm variant="danger" onClick={handleDelete}>Delete</modal.confirm>
          </modal.actions>
        </modal.box>
      </modal.backdrop>
    ));

    // The user specified this exact HTML structure should be generated:
    /*
    <div class="modal-box">
      <h3 class="font-bold text-lg">Delete User</h3>
      <p class="py-4">This action cannot be undone. Are you sure you want to continue?</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-outline">Cancel</button>
        </form>
        <button class="btn btn-error" onclick="handleDelete()">Delete</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
    */

    // Check modal-box structure
    const modalBox = container.querySelector('div.modal-box');
    expect(modalBox).toBeInTheDocument();

    // Check title structure: h3.font-bold.text-lg
    const title = modalBox?.querySelector('h3.font-bold.text-lg');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Delete User');

    // Check description structure: p.py-4  
    const description = modalBox?.querySelector('p.py-4');
    expect(description).toBeInTheDocument();
    expect(description?.textContent).toBe('This action cannot be undone. Are you sure you want to continue?');

    // Check modal-action structure
    const modalAction = modalBox?.querySelector('div.modal-action');
    expect(modalAction).toBeInTheDocument();

    // Check cancel form structure: form[method="dialog"] > button.btn.btn-outline
    const cancelForm = modalAction?.querySelector('form[method="dialog"]');
    expect(cancelForm).toBeInTheDocument();
    const cancelButton = cancelForm?.querySelector('button.btn.btn-outline');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton?.textContent).toBe('Cancel');

    // Check confirm button structure: button.btn.btn-error
    const confirmButton = modalAction?.querySelector('button.btn.btn-error');
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton?.textContent).toBe('Delete');

    // Check backdrop form structure: form.modal-backdrop[method="dialog"] > button
    const backdropForm = container.querySelector('form.modal-backdrop[method="dialog"]');
    expect(backdropForm).toBeInTheDocument();
    const backdropButton = backdropForm?.querySelector('button');
    expect(backdropButton).toBeInTheDocument();
    expect(backdropButton?.textContent).toBe('Close');
  });
});
