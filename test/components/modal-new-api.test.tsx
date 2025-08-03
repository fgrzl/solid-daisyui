import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { createSignal } from "solid-js";
import { modal } from "@/components/modal";

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