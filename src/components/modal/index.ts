// Export the original Modal component for backward compatibility
export { default as Modal } from "./modal";
export type { ModalProps } from "./modal";

// Export compound Modal components (new API)
export { default as ModalBackdrop } from "./modal-backdrop";
export { default as ModalBox } from "./modal-box";
export { default as ModalTitle } from "./modal-title";
export { default as ModalDescription } from "./modal-description";
export { default as ModalActions } from "./modal-actions";
export { default as ModalCancel } from "./modal-cancel";
export { default as ModalConfirm } from "./modal-confirm";

// Export compound component types (new API)
export type { ModalBackdropProps } from "./modal-backdrop";
export type { ModalBoxProps } from "./modal-box";
export type { ModalTitleProps } from "./modal-title";
export type { ModalDescriptionProps } from "./modal-description";
export type { ModalActionsProps } from "./modal-actions";
export type { ModalCancelProps } from "./modal-cancel";
export type { ModalConfirmProps } from "./modal-confirm";

// Export legacy compound components for backward compatibility
export { default as ModalOverlay } from "./modal-overlay";
export { default as ModalContent } from "./modal-content";
export type { ModalOverlayProps } from "./modal-overlay";
export type { ModalContentProps } from "./modal-content";

// Create compound Modal object for the desired API
import ModalBackdropComponent from "./modal-backdrop";
import ModalBoxComponent from "./modal-box";
import ModalTitleComponent from "./modal-title";
import ModalDescriptionComponent from "./modal-description";
import ModalActionsComponent from "./modal-actions";
import ModalCancelComponent from "./modal-cancel";
import ModalConfirmComponent from "./modal-confirm";

// Legacy imports for backward compatibility
import ModalOverlayComponent from "./modal-overlay";
import ModalContentComponent from "./modal-content";

// Compound Modal object that allows modal.backdrop, modal.box, etc.
export const modal = {
  backdrop: ModalBackdropComponent,
  box: ModalBoxComponent,
  title: ModalTitleComponent,
  description: ModalDescriptionComponent,
  actions: ModalActionsComponent,
  cancel: ModalCancelComponent,
  confirm: ModalConfirmComponent,
  // Legacy API for backward compatibility
  overlay: ModalOverlayComponent,
  content: ModalContentComponent,
};

// Also export with capitalized names for consistency
export const Modal2 = {
  Backdrop: ModalBackdropComponent,
  Box: ModalBoxComponent,
  Title: ModalTitleComponent,
  Description: ModalDescriptionComponent,
  Actions: ModalActionsComponent,
  Cancel: ModalCancelComponent,
  Confirm: ModalConfirmComponent,
  // Legacy API for backward compatibility
  Overlay: ModalOverlayComponent,
  Content: ModalContentComponent,
};