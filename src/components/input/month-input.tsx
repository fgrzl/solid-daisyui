import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the MonthInput component.
 * Extends all InputProps except type which is fixed to "month".
 */
export interface MonthInputProps extends Omit<InputProps, "type"> {}

/**
 * MonthInput component for capturing month input.
 * 
 * A specialized Input component with type="month" pre-configured.
 * Provides native month picker on supported browsers with proper
 * month validation. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {MonthInputProps} props - The properties to configure the MonthInput component.
 * @returns {JSX.Element} The rendered MonthInput component.
 */
export default function MonthInput(props: MonthInputProps): JSX.Element {
  return <Input {...props} type="month" />;
}