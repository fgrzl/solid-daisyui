import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the DateInput component.
 * Extends all InputProps except type which is fixed to "date".
 */
export interface DateInputProps extends Omit<InputProps, "type"> {}

/**
 * DateInput component for capturing date input.
 * 
 * A specialized Input component with type="date" pre-configured.
 * Provides native date picker on supported browsers with proper
 * date validation. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {DateInputProps} props - The properties to configure the DateInput component.
 * @returns {JSX.Element} The rendered DateInput component.
 */
export default function DateInput(props: DateInputProps): JSX.Element {
  return <Input {...props} type="date" />;
}