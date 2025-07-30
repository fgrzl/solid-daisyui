export interface MockupBrowserProps {
  children: string;
}

export default function MockupBrowser(props: MockupBrowserProps) {
  return <div>{props.children}</div>;
}
