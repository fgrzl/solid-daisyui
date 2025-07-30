export interface ThemeControllerProps {
  children: string;
}

// Theme Controller component
export default function ThemeController(props: ThemeControllerProps) {
  return <div>{props.children}</div>;
}
