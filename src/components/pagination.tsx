export interface PaginationProps {
  children: string;
}

// Pagination component
export default function Pagination(props: PaginationProps) {
  return <div>{props.children}</div>;
}
