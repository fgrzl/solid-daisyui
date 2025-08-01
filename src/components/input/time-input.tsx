import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the TimeInput component.
 * Extends all InputProps except type which is fixed to "time".
 */
export interface TimeInputProps extends Omit<InputProps, "type"> {}

/**
 * TimeInput component for capturing time input.
 * 
 * A specialized Input component with type="time" pre-configured.
 * Provides native time picker on supported browsers with proper
 * time validation. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {TimeInputProps} props - The properties to configure the TimeInput component.
 * @returns {JSX.Element} The rendered TimeInput component.
 */
export default function TimeInput(props: TimeInputProps): JSX.Element {
  return <Input {...props} type="time" />;
}