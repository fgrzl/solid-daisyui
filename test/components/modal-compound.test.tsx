import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { createSignal } from "solid-js";
import { 
  modal, 
  Modal2,
  ModalOverlay, 
  ModalContent, 
  ModalTitle, 
  ModalDescription, 
  ModalActions 
} from "@/components/modal";

describe("Compound Modal Components", () => {
  // Test lowercase modal object API
  describe("modal object API", () => {
    it("renders modal with overlay, content, title, description, and actions", () => {
      const [isOpen] = createSignal(true);
      const { getByText, getByRole } = render(() => (
        <modal.overlay isOpen={isOpen()} onClose={() => {}}>
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
      const [isOpen, setIsOpen] = createSignal(true);
      const onClose = vi.fn();
      
      const { getByText } = render(() => (
        <modal.overlay isOpen={isOpen()} onClose={onClose}>
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
        <Modal2.Overlay isOpen={isOpen()} onClose={() => {}}>
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
        <ModalOverlay isOpen={isOpen()} onClose={() => {}}>
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
      <ModalOverlay isOpen={isOpen()} variant="top">
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
      <ModalOverlay isOpen={isOpen()} onClose={onClose}>
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
      <ModalOverlay isOpen={isOpen()} onClose={onClose}>
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
      <ModalOverlay isOpen={isOpen()} onClose={onClose} closeOnBackdrop={false}>
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
      <ModalOverlay isOpen={isOpen()} onClose={onClose} closeOnEscape={false}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("supports ARIA attributes", () => {
    const [isOpen] = createSignal(true);
    const { getByRole } = render(() => (
      <ModalOverlay 
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
      <ModalOverlay isOpen={isOpen()}>
        <ModalContent>Content</ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('.modal-box')).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const [isOpen] = createSignal(true);
    const { container } = render(() => (
      <ModalOverlay isOpen={isOpen()}>
        <ModalContent size="lg">Content</ModalContent>
      </ModalOverlay>
    ));
    
    expect(container.querySelector('.modal-box')).toHaveClass('max-w-5xl');
  });

  it("prevents click event bubbling", () => {
    const [isOpen] = createSignal(true);
    const onClose = vi.fn();
    
    const { container } = render(() => (
      <ModalOverlay isOpen={isOpen()} onClose={onClose}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()}>
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
      <ModalOverlay isOpen={isOpen()} onClose={onClose}>
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
      <ModalOverlay isOpen={isOpen()} onClose={onClose}>
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
      <ModalOverlay isOpen={isOpen()}>
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
        <ModalOverlay 
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
        
        <ModalOverlay isOpen={modal1Open()} onClose={() => setModal1Open(false)}>
          <ModalContent>
            <ModalTitle>Modal 1</ModalTitle>
            <ModalActions>
              <button data-modal-close="">Close Modal 1</button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
        
        <ModalOverlay isOpen={modal2Open()} onClose={() => setModal2Open(false)}>
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