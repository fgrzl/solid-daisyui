export interface MockupPhoneProps {
  children: string;
}

export default function MockupPhone(props: MockupPhoneProps) {
  return <div>{props.children}</div>;
}
