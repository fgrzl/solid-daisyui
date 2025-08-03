# Table Components

The Table components provide a comprehensive, accessible, and customizable table implementation following HTML table specifications and DaisyUI design standards. The library now offers both structured components for better developer experience and legacy support for backward compatibility.

## Structured Components (Recommended)

### Components Overview

- **Table**: Main table container with DaisyUI styling
- **TableCaption**: Table caption for accessibility and description
- **TableHead**: Table header section (`<thead>`)
- **TableBody**: Table body section (`<tbody>`)
- **TableFoot**: Table footer section (`<tfoot>`)
- **TableRow**: Table row (`<tr>`)
- **TableHeader**: Table header cell (`<th>`)
- **TableData**: Table data cell (`<td>`)

### Legacy Aliases (Backward Compatible)

Short aliases are available for convenience:
- **THead** → TableHead
- **TBody** → TableBody
- **TFoot** → TableFoot
- **Tr** → TableRow
- **Th** → TableHeader
- **Td** → TableData

## Basic Usage

### Simple Table

```tsx
import { Table, TableHead, TableBody, TableRow, TableHeader, TableData } from "solid-daisyui";

<Table>
  <TableHead>
    <TableRow>
      <TableHeader scope="col">Name</TableHeader>
      <TableHeader scope="col">Age</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableHeader scope="row">John Doe</TableHeader>
      <TableData>30</TableData>
    </TableRow>
  </TableBody>
</Table>
```

### With Caption and Footer

```tsx
<Table zebra size="md">
  <TableCaption>Employee Information</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeader scope="col">Name</TableHeader>
      <TableHeader scope="col">Department</TableHeader>
      <TableHeader scope="col">Salary</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableHeader scope="row">John Doe</TableHeader>
      <TableData>Engineering</TableData>
      <TableData>$75,000</TableData>
    </TableRow>
    <TableRow>
      <TableHeader scope="row">Jane Smith</TableHeader>
      <TableData>Marketing</TableData>
      <TableData>$65,000</TableData>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableHeader scope="row">Total</TableHeader>
      <TableData colspan={2}>$140,000</TableData>
    </TableRow>
  </TableFoot>
</Table>
```

## Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | JSX.Element | - | Table content |
| class | string | - | Additional CSS classes |
| classList | Record<string, boolean> | - | Dynamic class list |
| zebra | boolean | false | Apply zebra striping |
| pinRows | boolean | false | Pin table rows |
| pinCols | boolean | false | Pin table columns |
| size | "xs" \| "sm" \| "md" \| "lg" | - | Table size variant |
| caption | string | - | Legacy caption prop (use TableCaption instead) |
| aria-label | string | - | ARIA label for accessibility |
| aria-describedby | string | - | ARIA describedby reference |

## DaisyUI Variants

### Size Variants
```tsx
<Table size="xs">...</Table>    // Extra small
<Table size="sm">...</Table>    // Small
<Table size="md">...</Table>    // Medium
<Table size="lg">...</Table>    // Large
```

### Table Modifiers
```tsx
<Table zebra>...</Table>        // Zebra striping
<Table pinRows>...</Table>      // Pin table rows
<Table pinCols>...</Table>      // Pin table columns
```

### Row Modifiers
```tsx
<TableRow active>...</TableRow>  // Active/selected row
<TableRow hover>...</TableRow>   // Hover effect
```

## TableHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | JSX.Element | - | Header content |
| class | string | - | Additional CSS classes |
| classList | Record<string, boolean> | - | Dynamic class list |
| scope | "col" \| "row" \| "colgroup" \| "rowgroup" | - | Header scope for accessibility |
| colspan | number | - | Number of columns to span |
| rowspan | number | - | Number of rows to span |
| abbr | string | - | Abbreviated description |
| headers | string | - | Related header cell IDs |

## TableData Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | JSX.Element | - | Cell content |
| class | string | - | Additional CSS classes |
| classList | Record<string, boolean> | - | Dynamic class list |
| colspan | number | - | Number of columns to span |
| rowspan | number | - | Number of rows to span |
| headers | string | - | Related header cell IDs |

## Advanced Examples

### Complex Table with All Features

```tsx
<Table zebra pinRows pinCols size="lg">
  <TableCaption>Quarterly Sales Report</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeader scope="col">Region</TableHeader>
      <TableHeader scope="col" abbr="Q1">Quarter 1</TableHeader>
      <TableHeader scope="col" abbr="Q2">Quarter 2</TableHeader>
      <TableHeader scope="col" abbr="Total">Total</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow active>
      <TableHeader scope="row">North</TableHeader>
      <TableData>$50,000</TableData>
      <TableData>$60,000</TableData>
      <TableData>$110,000</TableData>
    </TableRow>
    <TableRow hover>
      <TableHeader scope="row">South</TableHeader>
      <TableData>$40,000</TableData>
      <TableData>$45,000</TableData>
      <TableData>$85,000</TableData>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableHeader scope="row">Total</TableHeader>
      <TableData>$90,000</TableData>
      <TableData>$105,000</TableData>
      <TableData>$195,000</TableData>
    </TableRow>
  </TableFoot>
</Table>
```

### Using Legacy Aliases

```tsx
<Table zebra>
  <THead>
    <Tr>
      <Th scope="col">Header</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>Data</Td>
    </Tr>
  </TBody>
</Table>
```

## Accessibility

The Table components follow WCAG 2.1 AA guidelines:

### Required Accessibility Features
- Use `TableCaption` or `aria-label` to describe the table's purpose
- Use `scope` attribute on `TableHeader` components:
  - `scope="col"` for column headers
  - `scope="row"` for row headers
- Use `headers` attribute to associate data cells with headers when needed
- Proper semantic HTML structure with `thead`, `tbody`, `tfoot`

### Accessibility Example

```tsx
<Table aria-label="Employee salary information">
  <TableCaption>Employee Salary Information by Department</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeader scope="col" id="name">Employee Name</TableHeader>
      <TableHeader scope="col" id="dept">Department</TableHeader>
      <TableHeader scope="col" id="salary">Annual Salary</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableHeader scope="row" headers="name">John Doe</TableHeader>
      <TableData headers="dept">Engineering</TableData>
      <TableData headers="salary">$75,000</TableData>
    </TableRow>
  </TableBody>
</Table>
```

## Migration from Legacy Usage

### Before (Legacy)
```tsx
<Table zebra caption="Employee Info">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">John</th>
      <td>30</td>
    </tr>
  </tbody>
</Table>
```

### After (Structured Components)
```tsx
<Table zebra>
  <TableCaption>Employee Info</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeader scope="col">Name</TableHeader>
      <TableHeader scope="col">Age</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableHeader scope="row">John</TableHeader>
      <TableData>30</TableData>
    </TableRow>
  </TableBody>
</Table>
```

## Best Practices

1. **Use structured components** for new development for better TypeScript support and component composition
2. **Always include a caption** or `aria-label` for accessibility
3. **Use appropriate scope attributes** on header cells
4. **Use semantic row headers** with `scope="row"` when appropriate
5. **Leverage DaisyUI variants** for consistent styling
6. **Test with screen readers** to ensure proper accessibility

## Browser Support

The Table components work in all modern browsers and are fully compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All components follow semantic HTML standards and work properly with assistive technologies.
