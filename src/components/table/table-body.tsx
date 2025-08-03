import { JSX } from "solid-js";

/**
 * Props for the TableBody component.
 *
 * @property {JSX.Element} [children] - The table body content, typically TableRow components with TableData cells.
 * @property {string} [class] - Additional CSS classes to apply to the table body.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TableBodyProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * TableBody component for table body sections.
 * 
 * Represents the <tbody> element in HTML table structure, used to group
 * the body content in a table. Should contain TableRow components with
 * TableData or TableHeader cells for proper semantic structure.
 * 
 * Follows HTML table specification for proper table semantics and
 * accessibility. Works seamlessly with DaisyUI table styling including
 * zebra striping and other table modifiers.
 * 
 * **Usage:**
 * ```tsx
 * <Table zebra>
 *   <TableBody>
 *     <TableRow>
 *       <TableHeader scope="row">John Doe</TableHeader>
 *       <TableData>30</TableData>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 * 
 * @param {TableBodyProps} props - The table body component props
 * @returns {JSX.Element} JSX element representing a table body
 */
export default function TableBody(props: TableBodyProps): JSX.Element {
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
    <tbody
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </tbody>
  );
}