import { createSignal, JSX, onMount } from "solid-js";

/**
 * Props for the Accordion component.
 *
 * @property {string} title - The title text displayed in the accordion header.
 * @property {JSX.Element} children - The content to display inside the accordion when expanded.
 * @property {string} name - Required for radio grouping - accordions with the same name form a group where only one can be open.
 * @property {boolean} [open] - Whether the accordion should be open by default.
 * @property {string} [class] - Additional CSS classes to apply to the accordion container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [id] - Custom ID for the accordion. If not provided, a random ID will be generated.
 * @property {"arrow" | "plus"} [variant] - The visual indicator variant - "arrow" (default) or "plus" icon.
 */
export interface AccordionProps {
  title: string;
  children: JSX.Element;
  name: string; // Required for radio grouping
  open?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
  id?: string;
  variant?: "arrow" | "plus";
}

/**
 * Accordion component for creating collapsible content sections with radio group behavior.
 *
 * Follows DaisyUI Collapse component patterns with radio input controls for mutual exclusion.
 * Accordions with the same `name` prop form a group where only one can be open at a time.
 * Supports keyboard navigation and proper accessibility attributes.
 *
 * @param {AccordionProps} props - The accordion component props
 * @returns {JSX.Element} JSX element representing the accordion
 */
export default function Accordion(props: AccordionProps) {
  const [isOpen, setIsOpen] = createSignal(props.open ?? false);
  const contentId =
    props.id ?? `accordion-content-${Math.random().toString(36).slice(2)}`;
  const buttonId = `${contentId}-button`;
  const radioId = `${contentId}-radio`;

  // Determine variant class
  const variantClass =
    props.variant === "plus" ? "collapse-plus" : "collapse-arrow";

  // Listen for changes to other radios in the same group
  onMount(() => {
    const handleRadioChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.type === "radio" && target.name === props.name) {
        // If another radio in the same group is selected, close this one
        setIsOpen(target.id === radioId);
      }
    };

    document.addEventListener("input", handleRadioChange);

    return () => {
      document.removeEventListener("input", handleRadioChange);
    };
  });

  return (
    <div
      class={`collapse ${variantClass}`.trim()}
      classList={{
        ...(props.class ? { [props.class]: true } : {}),
        ...props.classList,
      }}
    >
      <input
        id={radioId}
        type="radio"
        name={props.name}
        checked={isOpen()}
        onInput={(e) => setIsOpen(e.currentTarget.checked)}
        class="peer"
        aria-hidden="true"
      />
      <label
        for={radioId}
        id={buttonId}
        class="collapse-title text-xl font-medium cursor-pointer"
        role="button"
        tabindex="0"
        aria-expanded={isOpen()}
        aria-controls={contentId}
        aria-describedby={props.id ? `${props.id}-desc` : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const radio = document.getElementById(radioId) as HTMLInputElement;
            if (radio) {
              radio.checked = true;
              radio.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }
        }}
      >
        {props.title}
      </label>
      <div
        id={contentId}
        class="collapse-content"
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen()}
        style={{ display: isOpen() ? "block" : "none" }}
      >
        {props.children}
      </div>
    </div>
  );
}
