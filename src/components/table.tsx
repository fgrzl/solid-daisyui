import { JSX } from "solid-js";

/**
 * Props for the Table component.
 *
 * @property {JSX.Element} [children] - The table content including thead, tbody, tfoot elements.
 * @property {string} [class] - Additional CSS classes to apply to the table.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {boolean} [zebra] - Applies table-zebra class for striped rows styling.
 * @property {boolean} [pinRows] - Applies table-pin-rows class to pin table rows.
 * @property {boolean} [pinCols] - Applies table-pin-cols class to pin table columns.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size variant of the table.
 * @property {string} [caption] - Optional caption text for table accessibility.
 * @property {string} [aria-label] - ARIA label for table accessibility.
 * @property {string} [aria-describedby] - ARIA describedby for table accessibility.
 */
export interface TableProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  zebra?: boolean;
  pinRows?: boolean;
  pinCols?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  caption?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

/**
 * Table component for displaying structured data with DaisyUI styling.
 * Follows official DaisyUI Table component patterns for consistent styling and behavior.
 * 
 * Supports all official DaisyUI table features including zebra striping, pinned rows/columns,
 * size variants, and accessibility features with proper table semantics.
 * 
 * Implements WCAG 2.1 AA accessibility standards with proper table structure,
 * captions, and ARIA attributes for screen reader compatibility.
 *
 * @param {TableProps} props - The properties to configure the Table component.
 * @returns {JSX.Element} The rendered Table component.
 */
export default function Table(props: TableProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      table: true,
    };

    // Add DaisyUI variant classes
    if (props.zebra) {
      baseClasses["table-zebra"] = true;
    }

    if (props.pinRows) {
      baseClasses["table-pin-rows"] = true;
    }

    if (props.pinCols) {
      baseClasses["table-pin-cols"] = true;
    }

    // Add size classes
    if (props.size) {
      baseClasses[`table-${props.size}`] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <table
      classList={{
        ...classes(),
        ...props.classList,
      }}
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
    >
      {/* Caption for accessibility */}
      {props.caption && <caption>{props.caption}</caption>}
      
      {/* Table content */}
      {props.children}
    </table>
  );
}
