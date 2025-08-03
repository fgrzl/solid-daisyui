import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableFoot, 
  TableRow, 
  TableHeader, 
  TableData, 
  TableCaption,
  // Legacy aliases
  THead,
  TBody,
  TFoot,
  Tr,
  Th,
  Td
} from "@/components/table";

describe("Structured Table Components", () => {
  // Table Container Tests
  describe("Table Container", () => {
    it("renders structured table with all semantic elements", () => {
      const { getByText, container } = render(() => (
        <Table zebra size="md">
          <TableCaption>Employee Information</TableCaption>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Name</TableHeader>
              <TableHeader scope="col">Department</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableHeader scope="row">John Doe</TableHeader>
              <TableData>Engineering</TableData>
            </TableRow>
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableData>Total Employees: 1</TableData>
              <TableData>Departments: 1</TableData>
            </TableRow>
          </TableFoot>
        </Table>
      ));

      // Check table classes
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-zebra", "table-md");

      // Check semantic structure
      expect(getByText("Employee Information")).toBeInTheDocument();
      expect(container.querySelector("caption")).toBeInTheDocument();
      expect(container.querySelector("thead")).toBeInTheDocument();
      expect(container.querySelector("tbody")).toBeInTheDocument();
      expect(container.querySelector("tfoot")).toBeInTheDocument();
      
      // Check content
      expect(getByText("Name")).toBeInTheDocument();
      expect(getByText("John Doe")).toBeInTheDocument();
      expect(getByText("Engineering")).toBeInTheDocument();
    });
  });

  // TableCaption Tests
  describe("TableCaption", () => {
    it("renders caption element with content", () => {
      const { getByText } = render(() => (
        <TableCaption>Test Caption</TableCaption>
      ));

      const caption = getByText("Test Caption");
      expect(caption).toBeInTheDocument();
      expect(caption.tagName).toBe("CAPTION");
    });

    it("applies custom classes to caption", () => {
      const { container } = render(() => (
        <TableCaption class="custom-caption" classList={{ "active": true }}>
          Test Caption
        </TableCaption>
      ));

      const caption = container.querySelector("caption");
      expect(caption).toHaveClass("custom-caption", "active");
    });
  });

  // TableHead Tests
  describe("TableHead", () => {
    it("renders thead element", () => {
      const { container } = render(() => (
        <TableHead>
          <TableRow>
            <TableHeader scope="col">Header</TableHeader>
          </TableRow>
        </TableHead>
      ));

      const thead = container.querySelector("thead");
      expect(thead).toBeInTheDocument();
    });

    it("applies custom classes to thead", () => {
      const { container } = render(() => (
        <TableHead class="custom-head" classList={{ "highlighted": true }}>
          <TableRow>
            <TableHeader scope="col">Header</TableHeader>
          </TableRow>
        </TableHead>
      ));

      const thead = container.querySelector("thead");
      expect(thead).toHaveClass("custom-head", "highlighted");
    });
  });

  // TableBody Tests
  describe("TableBody", () => {
    it("renders tbody element", () => {
      const { container } = render(() => (
        <TableBody>
          <TableRow>
            <TableData>Content</TableData>
          </TableRow>
        </TableBody>
      ));

      const tbody = container.querySelector("tbody");
      expect(tbody).toBeInTheDocument();
    });

    it("applies custom classes to tbody", () => {
      const { container } = render(() => (
        <TableBody class="custom-body" classList={{ "scrollable": true }}>
          <TableRow>
            <TableData>Content</TableData>
          </TableRow>
        </TableBody>
      ));

      const tbody = container.querySelector("tbody");
      expect(tbody).toHaveClass("custom-body", "scrollable");
    });
  });

  // TableFoot Tests
  describe("TableFoot", () => {
    it("renders tfoot element", () => {
      const { container } = render(() => (
        <TableFoot>
          <TableRow>
            <TableData>Footer Content</TableData>
          </TableRow>
        </TableFoot>
      ));

      const tfoot = container.querySelector("tfoot");
      expect(tfoot).toBeInTheDocument();
    });

    it("applies custom classes to tfoot", () => {
      const { container } = render(() => (
        <TableFoot class="custom-foot" classList={{ "summary": true }}>
          <TableRow>
            <TableData>Footer</TableData>
          </TableRow>
        </TableFoot>
      ));

      const tfoot = container.querySelector("tfoot");
      expect(tfoot).toHaveClass("custom-foot", "summary");
    });
  });

  // TableRow Tests
  describe("TableRow", () => {
    it("renders tr element", () => {
      const { container } = render(() => (
        <TableRow>
          <TableData>Cell</TableData>
        </TableRow>
      ));

      const tr = container.querySelector("tr");
      expect(tr).toBeInTheDocument();
    });

    it("applies DaisyUI row modifiers", () => {
      const { container } = render(() => (
        <TableRow active hover class="custom-row">
          <TableData>Cell</TableData>
        </TableRow>
      ));

      const tr = container.querySelector("tr");
      expect(tr).toHaveClass("active", "hover", "custom-row");
    });

    it("applies classList when provided", () => {
      const { container } = render(() => (
        <TableRow classList={{ "selected": true, "disabled": false }}>
          <TableData>Cell</TableData>
        </TableRow>
      ));

      const tr = container.querySelector("tr");
      expect(tr).toHaveClass("selected");
      expect(tr).not.toHaveClass("disabled");
    });
  });

  // TableHeader Tests
  describe("TableHeader", () => {
    it("renders th element with scope attribute", () => {
      const { getByText } = render(() => (
        <TableHeader scope="col">Column Header</TableHeader>
      ));

      const th = getByText("Column Header");
      expect(th).toBeInTheDocument();
      expect(th.tagName).toBe("TH");
      expect(th).toHaveAttribute("scope", "col");
    });

    it("supports all HTML table header attributes", () => {
      const { container } = render(() => (
        <TableHeader 
          scope="row" 
          colspan={2} 
          rowspan={3} 
          abbr="Abbreviated" 
          headers="header1 header2"
          class="custom-header"
        >
          Header
        </TableHeader>
      ));

      const th = container.querySelector("th");
      expect(th).toHaveAttribute("scope", "row");
      expect(th).toHaveAttribute("colspan", "2");
      expect(th).toHaveAttribute("rowspan", "3");
      expect(th).toHaveAttribute("abbr", "Abbreviated");
      expect(th).toHaveAttribute("headers", "header1 header2");
      expect(th).toHaveClass("custom-header");
    });

    it("applies classList when provided", () => {
      const { container } = render(() => (
        <TableHeader classList={{ "sortable": true, "sorted": false }}>
          Header
        </TableHeader>
      ));

      const th = container.querySelector("th");
      expect(th).toHaveClass("sortable");
      expect(th).not.toHaveClass("sorted");
    });
  });

  // TableData Tests
  describe("TableData", () => {
    it("renders td element", () => {
      const { getByText } = render(() => (
        <TableData>Cell Data</TableData>
      ));

      const td = getByText("Cell Data");
      expect(td).toBeInTheDocument();
      expect(td.tagName).toBe("TD");
    });

    it("supports HTML table data attributes", () => {
      const { container } = render(() => (
        <TableData 
          colspan={2} 
          rowspan={3} 
          headers="header1 header2"
          class="custom-data"
        >
          Data
        </TableData>
      ));

      const td = container.querySelector("td");
      expect(td).toHaveAttribute("colspan", "2");
      expect(td).toHaveAttribute("rowspan", "3");
      expect(td).toHaveAttribute("headers", "header1 header2");
      expect(td).toHaveClass("custom-data");
    });

    it("applies classList when provided", () => {
      const { container } = render(() => (
        <TableData classList={{ "numeric": true, "highlighted": false }}>
          Data
        </TableData>
      ));

      const td = container.querySelector("td");
      expect(td).toHaveClass("numeric");
      expect(td).not.toHaveClass("highlighted");
    });
  });

  // Legacy Aliases Tests
  describe("Legacy Aliases", () => {
    it("THead component works as alias for TableHead", () => {
      const { container } = render(() => (
        <THead>
          <Tr>
            <Th scope="col">Header</Th>
          </Tr>
        </THead>
      ));

      const thead = container.querySelector("thead");
      expect(thead).toBeInTheDocument();
    });

    it("TBody component works as alias for TableBody", () => {
      const { container } = render(() => (
        <TBody>
          <Tr>
            <Td>Data</Td>
          </Tr>
        </TBody>
      ));

      const tbody = container.querySelector("tbody");
      expect(tbody).toBeInTheDocument();
    });

    it("TFoot component works as alias for TableFoot", () => {
      const { container } = render(() => (
        <TFoot>
          <Tr>
            <Td>Footer</Td>
          </Tr>
        </TFoot>
      ));

      const tfoot = container.querySelector("tfoot");
      expect(tfoot).toBeInTheDocument();
    });

    it("Tr component works as alias for TableRow", () => {
      const { container } = render(() => (
        <Tr active>
          <Td>Cell</Td>
        </Tr>
      ));

      const tr = container.querySelector("tr");
      expect(tr).toBeInTheDocument();
      expect(tr).toHaveClass("active");
    });

    it("Th component works as alias for TableHeader", () => {
      const { getByText } = render(() => (
        <Th scope="col">Header</Th>
      ));

      const th = getByText("Header");
      expect(th.tagName).toBe("TH");
      expect(th).toHaveAttribute("scope", "col");
    });

    it("Td component works as alias for TableData", () => {
      const { getByText } = render(() => (
        <Td>Data</Td>
      ));

      const td = getByText("Data");
      expect(td.tagName).toBe("TD");
    });
  });

  // Integration Tests
  describe("Integration Tests", () => {
    it("builds complex accessible table with all components", () => {
      const { getByText, container } = render(() => (
        <Table zebra size="lg" pinRows>
          <TableCaption>Quarterly Sales Report</TableCaption>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Region</TableHeader>
              <TableHeader scope="col" abbr="Q1">Quarter 1</TableHeader>
              <TableHeader scope="col" abbr="Q2">Quarter 2</TableHeader>
              <TableHeader scope="col" abbr="Total">Total Sales</TableHeader>
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
      ));

      // Check table structure and classes
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-zebra", "table-lg", "table-pin-rows");

      // Check accessibility features
      const caption = getByText("Quarterly Sales Report");
      expect(caption.tagName).toBe("CAPTION");

      // Check semantic structure
      const colHeaders = container.querySelectorAll("th[scope='col']");
      const rowHeaders = container.querySelectorAll("th[scope='row']");
      expect(colHeaders).toHaveLength(4);
      expect(rowHeaders).toHaveLength(3);

      // Check content
      expect(getByText("Region")).toBeInTheDocument();
      expect(getByText("North")).toBeInTheDocument();
      expect(getByText("$195,000")).toBeInTheDocument();

      // Check row modifiers
      const activeRow = container.querySelector("tr.active");
      const hoverRow = container.querySelector("tr.hover");
      expect(activeRow).toBeInTheDocument();
      expect(hoverRow).toBeInTheDocument();
    });

    it("works with mixed legacy and new components", () => {
      const { container } = render(() => (
        <Table zebra>
          <TableCaption>Mixed Components Table</TableCaption>
          <THead>
            <Tr>
              <Th scope="col">Legacy Header</Th>
              <TableHeader scope="col">New Header</TableHeader>
            </Tr>
          </THead>
          <TBody>
            <TableRow>
              <Td>Legacy Data</Td>
              <TableData>New Data</TableData>
            </TableRow>
          </TBody>
        </Table>
      ));

      // Should render both legacy and new components correctly
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-zebra");
      
      const headers = container.querySelectorAll("th");
      const data = container.querySelectorAll("td");
      expect(headers).toHaveLength(2);
      expect(data).toHaveLength(2);
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    it("handles empty components gracefully", () => {
      const { container } = render(() => (
        <Table>
          <TableHead></TableHead>
          <TableBody></TableBody>
          <TableFoot></TableFoot>
        </Table>
      ));

      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
      expect(container.querySelector("thead")).toBeInTheDocument();
      expect(container.querySelector("tbody")).toBeInTheDocument();
      expect(container.querySelector("tfoot")).toBeInTheDocument();
    });

    it("handles null/undefined children", () => {
      const { container } = render(() => (
        <Table>
          <TableHead>{null}</TableHead>
          <TableBody>{undefined}</TableBody>
          <TableRow>{false}</TableRow>
        </Table>
      ));

      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
    });
  });
});