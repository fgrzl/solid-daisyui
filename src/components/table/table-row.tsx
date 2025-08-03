import { JSX } from "solid-js";

/**
 * Props for the TableRow component.
 *
 * @property {JSX.Element} [children] - The table row content, typically TableHeader and/or TableData cells.
 * @property {string} [class] - Additional CSS classes to apply to the table row.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {boolean} [active] - Whether the row should be highlighted as active/selected.
 * @property {boolean} [hover] - Whether the row should show hover effects.
 */
export interface TableRowProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  active?: boolean;
  hover?: boolean;
}

/**
 * TableRow component for table rows.
 * 
 * Represents the <tr> element in HTML table structure, used to group
 * cells in a table row. Should contain TableHeader and/or TableData
 * components for proper semantic structure.
 * 
 * Follows HTML table specification for proper table semantics and
 * accessibility. Supports DaisyUI table row modifiers like active
 * and hover states for enhanced user interaction.
 * 
 * **Usage:**
 * ```tsx
 * <TableBody>
 *   <TableRow active>
 *     <TableHeader scope="row">John Doe</TableHeader>
 *     <TableData>30</TableData>
 *     <TableData>Engineer</TableData>
 *   </TableRow>
 *   <TableRow hover>
 *     <TableHeader scope="row">Jane Smith</TableHeader>
 *     <TableData>25</TableData>
 *     <TableData>Designer</TableData>
 *   </TableRow>
 * </TableBody>
 * ```
 * 
 * @param {TableRowProps} props - The table row component props
 * @returns {JSX.Element} JSX element representing a table row
 */
export default function TableRow(props: TableRowProps): JSX.Element {
  // Build classes for any custom styling and modifiers
  const classes = () => {
    const baseClasses: Record<string, boolean> = {};

    // Add DaisyUI row modifiers
    if (props.active) {
      baseClasses["active"] = true;
    }

    if (props.hover) {
      baseClasses["hover"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <tr
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </tr>
  );
}