export interface MockupCodeProps {
  children: string;
}

export default function MockupCode(props: MockupCodeProps) {
  return <div>{props.children}</div>;
}
