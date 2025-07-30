export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  style?: Record<string, string | number>;
}

// Modal component
export default function Modal() {
  return <div>Modal Component</div>;
}
