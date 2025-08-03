import { JSX } from "solid-js";

/**
 * Props for the TableData component.
 *
 * @property {JSX.Element} [children] - The data cell content.
 * @property {string} [class] - Additional CSS classes to apply to the data cell.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {number} [colspan] - Number of columns this data cell should span.
 * @property {number} [rowspan] - Number of rows this data cell should span.
 * @property {string} [headers] - Space-separated list of IDs of header cells related to this cell.
 */
export interface TableDataProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  colspan?: number;
  rowspan?: number;
  headers?: string;
}

/**
 * TableData component for table data cells.
 * 
 * Represents the <td> element in HTML table structure, used for regular
 * data cells within table rows. Should be used within TableRow components
 * in TableBody or TableFoot sections.
 * 
 * Follows HTML table specification for proper table semantics and
 * accessibility. Supports spanning multiple columns or rows when needed
 * for complex table layouts.
 * 
 * Works seamlessly with DaisyUI table styling and supports all standard
 * HTML table cell attributes for maximum flexibility and accessibility.
 * 
 * **Usage:**
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableHeader scope="row">John Doe</TableHeader>
 *     <TableData>30</TableData>
 *     <TableData>Engineer</TableData>
 *     <TableData colspan={2}>john@example.com</TableData>
 *   </TableRow>
 *   <TableRow>
 *     <TableHeader scope="row">Jane Smith</TableHeader>
 *     <TableData>25</TableData>
 *     <TableData rowspan={2}>Designer</TableData>
 *     <TableData>jane@example.com</TableData>
 *     <TableData>555-5678</TableData>
 *   </TableRow>
 * </TableBody>
 * ```
 * 
 * @param {TableDataProps} props - The table data component props
 * @returns {JSX.Element} JSX element representing a table data cell
 */
export default function TableData(props: TableDataProps): JSX.Element {
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
    <td
      colspan={props.colspan}
      rowspan={props.rowspan}
      headers={props.headers}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </td>
  );
}