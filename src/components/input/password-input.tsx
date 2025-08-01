import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the PasswordInput component.
 * Extends all InputProps except type which is fixed to "password".
 */
export interface PasswordInputProps extends Omit<InputProps, "type"> {}

/**
 * PasswordInput component for capturing password input.
 * 
 * A specialized Input component with type="password" pre-configured.
 * Automatically masks input characters for secure password entry.
 * Supports all Input component features including DaisyUI styling,
 * validation states, and accessibility features.
 * 
 * @param {PasswordInputProps} props - The properties to configure the PasswordInput component.
 * @returns {JSX.Element} The rendered PasswordInput component.
 */
export default function PasswordInput(props: PasswordInputProps): JSX.Element {
  return <Input {...props} type="password" />;
}