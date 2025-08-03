import { JSX } from "solid-js";

/**
 * Props for the Tab component when used as children.
 */
export interface TabProps {
  label: string;
  children?: JSX.Element;
  href?: string;
  target?: string;
  disabled?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

/**
 * Tab component for individual tab items within a Tabs container.
 * 
 * This component renders as a data container that stores the tab information
 * for the parent Tabs component to extract and render properly.
 *
 * @param {TabProps} props - The properties to configure the Tab component.
 * @returns {JSX.Element} The rendered Tab component (data container).
 */
export default function Tab(props: TabProps): JSX.Element {
  // Store the content and data as attributes for the parent to access
  return (
    <div 
      style={{ display: "none" }}
      data-tab-label={props.label}
      data-tab-disabled={props.disabled}
      data-tab-href={props.href}
      data-tab-target={props.target}
      data-tab-class={props.class}
      data-tab-onClick={props.onClick ? "true" : undefined}
      ref={(el) => {
        // Store the onClick handler directly on the element for later retrieval
        if (el && props.onClick) {
          (el as any)._tabOnClick = props.onClick;
        }
      }}
    >
      {props.children}
    </div>
  );
}