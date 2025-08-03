import { JSX } from "solid-js";

/**
 * Props for the TableCaption component.
 *
 * @property {JSX.Element} [children] - The caption content.
 * @property {string} [class] - Additional CSS classes to apply to the caption.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TableCaptionProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * TableCaption component for table captions.
 * 
 * Represents the <caption> element in HTML table structure, used to provide
 * a title or explanation for the table. Essential for accessibility as it
 * provides context for screen readers and other assistive technologies.
 * 
 * Follows HTML table specification for proper table semantics and
 * accessibility. Should be the first child of a Table component when used.
 * The caption is automatically associated with the table for screen readers.
 * 
 * Works seamlessly with DaisyUI table styling and provides important
 * semantic information about the table's purpose and contents.
 * 
 * **Usage:**
 * ```tsx
 * <Table>
 *   <TableCaption>Employee Information</TableCaption>
 *   <TableHead>
 *     <TableRow>
 *       <TableHeader scope="col">Name</TableHeader>
 *       <TableHeader scope="col">Department</TableHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableHeader scope="row">John Doe</TableHeader>
 *       <TableData>Engineering</TableData>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 * 
 * @param {TableCaptionProps} props - The table caption component props
 * @returns {JSX.Element} JSX element representing a table caption
 */
export default function TableCaption(props: TableCaptionProps): JSX.Element {
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
    <caption
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </caption>
  );
}