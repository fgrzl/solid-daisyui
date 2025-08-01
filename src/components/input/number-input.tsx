import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the NumberInput component.
 * Extends all InputProps except type which is fixed to "number".
 */
export interface NumberInputProps extends Omit<InputProps, "type"> {}

/**
 * NumberInput component for capturing numeric input.
 * 
 * A specialized Input component with type="number" pre-configured.
 * Provides built-in numeric validation and spinner controls on supported
 * browsers. Supports all Input component features including DaisyUI styling,
 * validation states, and accessibility features.
 * 
 * @param {NumberInputProps} props - The properties to configure the NumberInput component.
 * @returns {JSX.Element} The rendered NumberInput component.
 */
export default function NumberInput(props: NumberInputProps): JSX.Element {
  return <Input {...props} type="number" />;
}