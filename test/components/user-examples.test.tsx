import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import { createSignal } from "solid-js";
import { modal } from "../../src/components/modal";

describe("User Requested Examples Validation", () => {
  it("should work with the exact overlay/content API example from user", () => {
    const onClose = vi.fn();

    const { container, getByText } = render(() => (
      <modal.overlay onClose={onClose}>
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
      <modal.backdrop isOpen={isOpen()} onClose={() => setIsOpen(false)}>
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
      <modal.backdrop isOpen={isOpen()} onClose={() => setIsOpen(false)}>
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