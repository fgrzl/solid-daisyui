export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: Record<string, string | number>;
}

// Input component
export default function Input() {
  return <div>Input Component</div>;
}
