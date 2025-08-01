import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the WeekInput component.
 * Extends all InputProps except type which is fixed to "week".
 */
export interface WeekInputProps extends Omit<InputProps, "type"> {}

/**
 * WeekInput component for capturing week input.
 * 
 * A specialized Input component with type="week" pre-configured.
 * Provides native week picker on supported browsers with proper
 * week validation. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {WeekInputProps} props - The properties to configure the WeekInput component.
 * @returns {JSX.Element} The rendered WeekInput component.
 */
export default function WeekInput(props: WeekInputProps): JSX.Element {
  return <Input {...props} type="week" />;
}