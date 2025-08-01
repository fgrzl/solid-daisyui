import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the EmailInput component.
 * Extends all InputProps except type which is fixed to "email".
 */
export interface EmailInputProps extends Omit<InputProps, "type"> {}

/**
 * EmailInput component for capturing email input.
 * 
 * A specialized Input component with type="email" pre-configured.
 * Provides built-in email validation and appropriate mobile keyboard
 * on supported devices. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {EmailInputProps} props - The properties to configure the EmailInput component.
 * @returns {JSX.Element} The rendered EmailInput component.
 */
export default function EmailInput(props: EmailInputProps): JSX.Element {
  return <Input {...props} type="email" />;
}