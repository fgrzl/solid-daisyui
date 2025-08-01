import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the TextInput component.
 * Extends all InputProps except type which is fixed to "text".
 */
export interface TextInputProps extends Omit<InputProps, "type"> {}

/**
 * TextInput component for capturing text input.
 * 
 * A specialized Input component with type="text" pre-configured.
 * Supports all Input component features including DaisyUI styling,
 * validation states, and accessibility features.
 * 
 * @param {TextInputProps} props - The properties to configure the TextInput component.
 * @returns {JSX.Element} The rendered TextInput component.
 */
export default function TextInput(props: TextInputProps): JSX.Element {
  return <Input {...props} type="text" />;
}