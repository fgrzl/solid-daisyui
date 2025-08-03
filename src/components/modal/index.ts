// Export the original Modal component for backward compatibility
export { default as Modal } from "./modal";
export type { ModalProps } from "./modal";

// Export compound Modal components
export { default as ModalOverlay } from "./modal-overlay";
export { default as ModalContent } from "./modal-content";
export { default as ModalTitle } from "./modal-title";
export { default as ModalDescription } from "./modal-description";
export { default as ModalActions } from "./modal-actions";

// Export compound component types
export type { ModalOverlayProps } from "./modal-overlay";
export type { ModalContentProps } from "./modal-content";
export type { ModalTitleProps } from "./modal-title";
export type { ModalDescriptionProps } from "./modal-description";
export type { ModalActionsProps } from "./modal-actions";

// Create compound Modal object for the desired API
import ModalOverlayComponent from "./modal-overlay";
import ModalContentComponent from "./modal-content";
import ModalTitleComponent from "./modal-title";
import ModalDescriptionComponent from "./modal-description";
import ModalActionsComponent from "./modal-actions";

// Compound Modal object that allows modal.overlay, modal.content, etc.
export const modal = {
  overlay: ModalOverlayComponent,
  content: ModalContentComponent,
  title: ModalTitleComponent,
  description: ModalDescriptionComponent,
  actions: ModalActionsComponent,
};

// Also export with capitalized names for consistency
export const Modal2 = {
  Overlay: ModalOverlayComponent,
  Content: ModalContentComponent,
  Title: ModalTitleComponent,
  Description: ModalDescriptionComponent,
  Actions: ModalActionsComponent,
};