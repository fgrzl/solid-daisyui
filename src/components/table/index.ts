// Table components
export { default as Table, type TableProps } from "./table";
export { default as TableHead, type TableHeadProps } from "./table-head";
export { default as TableBody, type TableBodyProps } from "./table-body";
export { default as TableFoot, type TableFootProps } from "./table-foot";
export { default as TableRow, type TableRowProps } from "./table-row";
export { default as TableHeader, type TableHeaderProps } from "./table-header";
export { default as TableData, type TableDataProps } from "./table-data";
export { default as TableCaption, type TableCaptionProps } from "./table-caption";

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