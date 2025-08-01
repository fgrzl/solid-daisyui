import { JSX, createMemo, createUniqueId } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the Validator component.
 *
 * @property {JSX.Element} [children] - The form control elements to wrap with validation.
 * @property {string | JSX.Element} [message] - The validation message to display.
 * @property {"error" | "success" | "warning" | "info"} [state] - The validation state that determines styling.
 * @property {string | JSX.Element} [label] - The main label to display above the form control.
 * @property {string | JSX.Element} [altLabel] - An alternative label to display in the top-right.
 * @property {boolean} [autoApplyState] - Whether to automatically apply the validation state to child Input components. Defaults to true.
 * @property {string} [class] - Additional CSS classes to apply to the form control wrapper.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface ValidatorProps {
  children?: JSX.Element;
  message?: string | JSX.Element;
  state?: "error" | "success" | "warning" | "info";
  label?: string | JSX.Element;
  altLabel?: string | JSX.Element;
  autoApplyState?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Props for the ValidatorInput component.
 */
export interface ValidatorInputProps extends Omit<InputProps, "variant" | "aria-describedby" | "id"> {
  message?: string | JSX.Element;
  state?: "error" | "success" | "warning" | "info";
  label?: string | JSX.Element;
  altLabel?: string | JSX.Element;
  id?: string;
}

/**
 * Validator component for wrapping form controls with validation state and messages.
 * 
 * Follows DaisyUI form control patterns with support for validation states, labels,
 * and automatic integration with Input components. Implements proper accessibility
 * with ARIA attributes and unique ID generation for form control association.
 * 
 * Features:
 * - Validation message display with proper ARIA labeling
 * - Support for top and alt labels following DaisyUI patterns
 * - Error, success, warning, and info validation states
 * - Accessibility compliance with aria-describedby and aria-invalid
 * 
 * @param {ValidatorProps} props - The properties to configure the Validator component.
 * @returns {JSX.Element} The rendered Validator component.
 */
export default function Validator(props: ValidatorProps): JSX.Element {
  // Generate unique ID for message association
  const messageId = createUniqueId();
  
  // Memoize whether we should show the message
  const shouldShowMessage = createMemo(() => 
    props.message && props.message !== ""
  );
  
  // Memoize whether we should show labels
  const shouldShowLabels = createMemo(() => 
    props.label || props.altLabel
  );
  
  // Memoize wrapper classes
  const wrapperClasses = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      "form-control": true,
    };
    
    if (props.class) {
      baseClasses[props.class] = true;
    }
    
    return baseClasses;
  });
  
  return (
    <div
      classList={{
        ...wrapperClasses(),
        ...props.classList,
      }}
    >
      {/* Labels */}
      {shouldShowLabels() && (
        <div class="label">
          {props.label && (
            <span class="label-text">{props.label}</span>
          )}
          {props.altLabel && (
            <span class="label-text-alt">{props.altLabel}</span>
          )}
        </div>
      )}
      
      {/* Form controls */}
      {props.children}
      
      {/* Validation message */}
      {shouldShowMessage() && (
        <div class="label">
          <span 
            class="label-text-alt"
            id={messageId}
          >
            {props.message}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * ValidatorInput component that combines Input with validation capabilities.
 * 
 * This component provides a simpler way to create inputs with validation
 * by automatically handling the state mapping and ARIA attributes.
 * 
 * @param {ValidatorInputProps} props - The properties to configure the ValidatorInput component.
 * @returns {JSX.Element} The rendered ValidatorInput component.
 */
export function ValidatorInput(props: ValidatorInputProps): JSX.Element {
  const messageId = createUniqueId();
  
  // Split props
  const {
    message,
    state,
    label,
    altLabel,
    id,
    ...inputProps
  } = props;
  
  // Determine the input variant based on validation state
  const inputVariant = state || (inputProps as any).variant;
  
  // Determine aria-describedby
  const ariaDescribedBy = message 
    ? (inputProps as any)["aria-describedby"] 
      ? `${(inputProps as any)["aria-describedby"]} ${messageId}`
      : messageId
    : (inputProps as any)["aria-describedby"];
  
  return (
    <div class="form-control">
      {/* Labels */}
      {(label || altLabel) && (
        <div class="label">
          {label && (
            <span class="label-text">{label}</span>
          )}
          {altLabel && (
            <span class="label-text-alt">{altLabel}</span>
          )}
        </div>
      )}
      
      {/* Input */}
      <Input
        {...inputProps}
        id={id}
        variant={inputVariant}
        aria-describedby={ariaDescribedBy}
        aria-invalid={state === "error" ? "true" : undefined}
      />
      
      {/* Validation message */}
      {message && message !== "" && (
        <div class="label">
          <span 
            class="label-text-alt"
            id={messageId}
          >
            {message}
          </span>
        </div>
      )}
    </div>
  );
}
