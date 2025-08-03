import { JSX } from "solid-js";

/**
 * Props for the TableHeader component.
 *
 * @property {JSX.Element} [children] - The header cell content.
 * @property {string} [class] - Additional CSS classes to apply to the header cell.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"col" | "row" | "colgroup" | "rowgroup"} [scope] - Defines the scope of the header cell for accessibility.
 * @property {number} [colspan] - Number of columns this header cell should span.
 * @property {number} [rowspan] - Number of rows this header cell should span.
 * @property {string} [abbr] - Abbreviated description of the header cell content.
 * @property {string} [headers] - Space-separated list of IDs of header cells related to this cell.
 */
export interface TableHeaderProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  scope?: "col" | "row" | "colgroup" | "rowgroup";
  colspan?: number;
  rowspan?: number;
  abbr?: string;
  headers?: string;
}

/**
 * TableHeader component for table header cells.
 * 
 * Represents the <th> element in HTML table structure, used for header
 * cells that describe columns or rows. Essential for proper table
 * semantics and accessibility, especially with screen readers.
 * 
 * Follows HTML table specification for proper table semantics and
 * accessibility. Should be used in TableHead for column headers and
 * in TableBody/TableFoot for row headers when appropriate.
 * 
 * The `scope` attribute is crucial for accessibility, indicating whether
 * this header applies to a column, row, or group of columns/rows.
 * 
 * **Usage:**
 * ```tsx
 * <TableHead>
 *   <TableRow>
 *     <TableHeader scope="col">Name</TableHeader>
 *     <TableHeader scope="col" abbr="Age">Age (years)</TableHeader>
 *     <TableHeader scope="col" colspan={2}>Contact Info</TableHeader>
 *   </TableRow>
 * </TableHead>
 * 
 * <TableBody>
 *   <TableRow>
 *     <TableHeader scope="row">John Doe</TableHeader>
 *     <TableData>30</TableData>
 *     <TableData>john@example.com</TableData>
 *     <TableData>555-1234</TableData>
 *   </TableRow>
 * </TableBody>
 * ```
 * 
 * @param {TableHeaderProps} props - The table header component props
 * @returns {JSX.Element} JSX element representing a table header cell
 */
export default function TableHeader(props: TableHeaderProps): JSX.Element {
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
    <th
      scope={props.scope}
      colspan={props.colspan}
      rowspan={props.rowspan}
      abbr={props.abbr}
      headers={props.headers}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </th>
  );
}