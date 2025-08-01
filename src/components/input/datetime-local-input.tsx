import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the DateTimeLocalInput component.
 * Extends all InputProps except type which is fixed to "datetime-local".
 */
export interface DateTimeLocalInputProps extends Omit<InputProps, "type"> {}

/**
 * DateTimeLocalInput component for capturing local date and time input.
 * 
 * A specialized Input component with type="datetime-local" pre-configured.
 * Provides native date and time picker on supported browsers with proper
 * datetime validation. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {DateTimeLocalInputProps} props - The properties to configure the DateTimeLocalInput component.
 * @returns {JSX.Element} The rendered DateTimeLocalInput component.
 */
export default function DateTimeLocalInput(props: DateTimeLocalInputProps): JSX.Element {
  return <Input {...props} type="datetime-local" />;
}