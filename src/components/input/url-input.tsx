import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the UrlInput component.
 * Extends all InputProps except type which is fixed to "url".
 */
export interface UrlInputProps extends Omit<InputProps, "type"> {}

/**
 * UrlInput component for capturing URL input.
 * 
 * A specialized Input component with type="url" pre-configured.
 * Provides built-in URL validation and appropriate mobile keyboard
 * on supported devices. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {UrlInputProps} props - The properties to configure the UrlInput component.
 * @returns {JSX.Element} The rendered UrlInput component.
 */
export default function UrlInput(props: UrlInputProps): JSX.Element {
  return <Input {...props} type="url" />;
}