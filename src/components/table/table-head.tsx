import { JSX } from "solid-js";

/**
 * Props for the TableHead component.
 *
 * @property {JSX.Element} [children] - The table head content, typically TableRow components with TableHeader cells.
 * @property {string} [class] - Additional CSS classes to apply to the table head.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TableHeadProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * TableHead component for table header sections.
 * 
 * Represents the <thead> element in HTML table structure, used to group
 * header content in a table. Should contain TableRow components with
 * TableHeader cells for proper semantic structure.
 * 
 * Follows HTML table specification for proper table semantics and
 * accessibility. Works seamlessly with DaisyUI table styling.
 * 
 * **Usage:**
 * ```tsx
 * <Table>
 *   <TableHead>
 *     <TableRow>
 *       <TableHeader scope="col">Name</TableHeader>
 *       <TableHeader scope="col">Age</TableHeader>
 *     </TableRow>
 *   </TableHead>
 * </Table>
 * ```
 * 
 * @param {TableHeadProps} props - The table head component props
 * @returns {JSX.Element} JSX element representing a table head
 */
export default function TableHead(props: TableHeadProps): JSX.Element {
  // Build classes for any custom styling
  const classes = () => {
    const baseClasses: Record<string, boolean> = {};

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <thead
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </thead>
  );
}