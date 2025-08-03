import { createContext } from "solid-js";

/**
 * Shared context for Modal components to share state and handlers.
 * This context is used by both the legacy overlay API and the new backdrop API.
 */
export interface ModalContextValue {
  isOpen: boolean;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  onClose: undefined,
  closeOnBackdrop: undefined,
  closeOnEscape: undefined,
});