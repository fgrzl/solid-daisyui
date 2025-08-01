import { JSX } from "solid-js";
import Input, { InputProps } from "./input";

/**
 * Props for the SearchInput component.
 * Extends all InputProps except type which is fixed to "search".
 */
export interface SearchInputProps extends Omit<InputProps, "type"> {}

/**
 * SearchInput component for capturing search queries.
 * 
 * A specialized Input component with type="search" pre-configured.
 * Provides search-specific styling and behavior, including clear button
 * on supported browsers. Supports all Input component features including
 * DaisyUI styling, validation states, and accessibility features.
 * 
 * @param {SearchInputProps} props - The properties to configure the SearchInput component.
 * @returns {JSX.Element} The rendered SearchInput component.
 */
export default function SearchInput(props: SearchInputProps): JSX.Element {
  return <Input {...props} type="search" />;
}