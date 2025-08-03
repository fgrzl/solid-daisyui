// Table components
import TableComponent from "./table";
import TableHeadComponent from "./table-head";
import TableBodyComponent from "./table-body";
import TableFootComponent from "./table-foot";
import TableRowComponent from "./table-row";
import TableHeaderComponent from "./table-header";
import TableDataComponent from "./table-data";
import TableCaptionComponent from "./table-caption";

// Create compound component with attached sub-components
const Table = TableComponent as typeof TableComponent & {
  Head: typeof TableHeadComponent;
  Body: typeof TableBodyComponent;
  Foot: typeof TableFootComponent;
  Row: typeof TableRowComponent;
  Header: typeof TableHeaderComponent;
  Data: typeof TableDataComponent;
  Caption: typeof TableCaptionComponent;
};

// Attach sub-components to main Table component
Table.Head = TableHeadComponent;
Table.Body = TableBodyComponent;
Table.Foot = TableFootComponent;
Table.Row = TableRowComponent;
Table.Header = TableHeaderComponent;
Table.Data = TableDataComponent;
Table.Caption = TableCaptionComponent;

// Export the compound component as default
export default Table;

// Export types
export type { TableProps } from "./table";
export type { TableHeadProps } from "./table-head";
export type { TableBodyProps } from "./table-body";
export type { TableFootProps } from "./table-foot";
export type { TableRowProps } from "./table-row";
export type { TableHeaderProps } from "./table-header";
export type { TableDataProps } from "./table-data";
export type { TableCaptionProps } from "./table-caption";

// Export individual components for those who prefer direct imports
export {
  TableComponent as Table,
  TableHeadComponent as TableHead,
  TableBodyComponent as TableBody,
  TableFootComponent as TableFoot,
  TableRowComponent as TableRow,
  TableHeaderComponent as TableHeader,
  TableDataComponent as TableData,
  TableCaptionComponent as TableCaption,
};

// Legacy aliases for backward compatibility
export { default as THead } from "./table-head";
export { default as TBody } from "./table-body";
export { default as TFoot } from "./table-foot";
export { default as Tr } from "./table-row";
export { default as Th } from "./table-header";
export { default as Td } from "./table-data";

// Export types for aliases as well
export type { TableHeadProps as THeadProps } from "./table-head";
export type { TableBodyProps as TBodyProps } from "./table-body";
export type { TableFootProps as TFootProps } from "./table-foot";
export type { TableRowProps as TrProps } from "./table-row";
export type { TableHeaderProps as ThProps } from "./table-header";
export type { TableDataProps as TdProps } from "./table-data";