import { JSX } from "solid-js";

/**
 * Props for the TableFoot component.
 *
 * @property {JSX.Element} [children] - The table foot content, typically TableRow components with TableHeader or TableData cells.
 * @property {string} [class] - Additional CSS classes to apply to the table foot.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TableFootProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * TableFoot component for table footer sections.
 * 
 * Represents the <tfoot> element in HTML table structure, used to group
 * footer content in a table. Should contain TableRow components with
 * TableHeader or TableData cells for proper semantic structure.
 * 
 * Follows HTML table specification for proper table semantics and
 * accessibility. Useful for summary rows, totals, or other footer content.
 * Works seamlessly with DaisyUI table styling.
 * 
 * **Usage:**
 * ```tsx
 * <Table>
 *   <TableFoot>
 *     <TableRow>
 *       <TableHeader scope="row">Total</TableHeader>
 *       <TableData>$150,000</TableData>
 *     </TableRow>
 *   </TableFoot>
 * </Table>
 * ```
 * 
 * @param {TableFootProps} props - The table foot component props
 * @returns {JSX.Element} JSX element representing a table foot
 */
export default function TableFoot(props: TableFootProps): JSX.Element {
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
    <tfoot
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </tfoot>
  );
}