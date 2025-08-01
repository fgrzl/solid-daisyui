import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the TelInput component.
 * Extends all InputProps except type which is fixed to "tel".
 */
export interface TelInputProps extends Omit<InputProps, "type"> {}

/**
 * TelInput component for capturing telephone numbers.
 * 
 * A specialized Input component with type="tel" pre-configured.
 * Provides appropriate mobile keyboard for phone number entry on
 * supported devices. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {TelInputProps} props - The properties to configure the TelInput component.
 * @returns {JSX.Element} The rendered TelInput component.
 */
export default function TelInput(props: TelInputProps): JSX.Element {
  return <Input {...props} type="tel" />;
}