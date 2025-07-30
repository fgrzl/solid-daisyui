export interface MockupWindowProps {
  children: string;
}

// Mockup Window component
export default function MockupWindow(props: MockupWindowProps) {
  return <div>{props.children}</div>;
}
