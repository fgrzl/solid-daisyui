import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Table from "@/components/table";

describe("Table Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders a table element with correct base class", () => {
      const { container } = render(() => <Table />);
      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass("table");
    });

    it("renders with children content", () => {
      const { getByText } = render(() => (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>30</td>
            </tr>
          </tbody>
        </Table>
      ));
      
      expect(getByText("Name")).toBeInTheDocument();
      expect(getByText("Age")).toBeInTheDocument();
      expect(getByText("John")).toBeInTheDocument();
      expect(getByText("30")).toBeInTheDocument();
    });

    it("applies custom class when provided", () => {
      const { container } = render(() => <Table class="custom-table" />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "custom-table");
    });

    it("applies classList when provided", () => {
      const { container } = render(() => (
        <Table classList={{ "dynamic-class": true, "inactive-class": false }} />
      ));
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "dynamic-class");
      expect(table).not.toHaveClass("inactive-class");
    });
  });

  // DaisyUI Variants Tests
  describe("DaisyUI Variants", () => {
    it("applies table-zebra class for zebra variant", () => {
      const { container } = render(() => <Table zebra />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-zebra");
    });

    it("applies table-pin-rows class for pinRows variant", () => {
      const { container } = render(() => <Table pinRows />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-pin-rows");
    });

    it("applies table-pin-cols class for pinCols variant", () => {
      const { container } = render(() => <Table pinCols />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-pin-cols");
    });

    it("applies multiple variants simultaneously", () => {
      const { container } = render(() => <Table zebra pinRows pinCols />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-zebra", "table-pin-rows", "table-pin-cols");
    });
  });

  // Size Variants Tests
  describe("Size Variants", () => {
    it("applies table-xs class for xs size", () => {
      const { container } = render(() => <Table size="xs" />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-xs");
    });

    it("applies table-sm class for sm size", () => {
      const { container } = render(() => <Table size="sm" />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-sm");
    });

    it("applies table-md class for md size", () => {
      const { container } = render(() => <Table size="md" />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-md");
    });

    it("applies table-lg class for lg size", () => {
      const { container } = render(() => <Table size="lg" />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-lg");
    });

    it("does not apply size class when size is not provided", () => {
      const { container } = render(() => <Table />);
      const table = container.querySelector("table");
      expect(table).toHaveClass("table");
      expect(table).not.toHaveClass("table-xs", "table-sm", "table-md", "table-lg");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("renders with proper table semantics", () => {
      const { container } = render(() => <Table />);
      const table = container.querySelector("table");
      expect(table?.tagName).toBe("TABLE");
    });

    it("supports caption for accessibility", () => {
      const { getByText } = render(() => (
        <Table caption="Employee Information">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
        </Table>
      ));
      
      const caption = getByText("Employee Information");
      expect(caption).toBeInTheDocument();
      expect(caption.tagName).toBe("CAPTION");
    });

    it("supports aria-label for accessibility", () => {
      const { container } = render(() => <Table aria-label="Data table" />);
      const table = container.querySelector("table");
      expect(table).toHaveAttribute("aria-label", "Data table");
    });

    it("supports aria-describedby for accessibility", () => {
      const { container } = render(() => <Table aria-describedby="table-description" />);
      const table = container.querySelector("table");
      expect(table).toHaveAttribute("aria-describedby", "table-description");
    });

    it("maintains proper table structure with headers", () => {
      const { container } = render(() => (
        <Table>
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
      ));
      
      const headers = container.querySelectorAll("th[scope='col']");
      const rowHeader = container.querySelector("th[scope='row']");
      expect(headers).toHaveLength(2);
      expect(rowHeader).toBeInTheDocument();
    });
  });

  // Combined Features Tests
  describe("Combined Features", () => {
    it("applies all variants and custom classes together", () => {
      const { container } = render(() => (
        <Table 
          zebra 
          pinRows 
          pinCols 
          size="lg" 
          class="custom-table"
          classList={{ "dynamic-class": true }}
        />
      ));
      
      const table = container.querySelector("table");
      expect(table).toHaveClass(
        "table", 
        "table-zebra", 
        "table-pin-rows", 
        "table-pin-cols", 
        "table-lg",
        "custom-table",
        "dynamic-class"
      );
    });

    it("renders complex table structure with all features", () => {
      const { getByText, container } = render(() => (
        <Table 
          zebra 
          size="md" 
          caption="Complex Employee Data"
          aria-label="Employee information table"
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">John Doe</th>
              <td>Engineering</td>
              <td>$75,000</td>
            </tr>
            <tr>
              <th scope="row">Jane Smith</th>
              <td>Marketing</td>
              <td>$65,000</td>
            </tr>
          </tbody>
        </Table>
      ));
      
      // Check table classes
      const table = container.querySelector("table");
      expect(table).toHaveClass("table", "table-zebra", "table-md");
      expect(table).toHaveAttribute("aria-label", "Employee information table");
      
      // Check caption
      expect(getByText("Complex Employee Data")).toBeInTheDocument();
      
      // Check content
      expect(getByText("John Doe")).toBeInTheDocument();
      expect(getByText("Engineering")).toBeInTheDocument();
      expect(getByText("$75,000")).toBeInTheDocument();
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("handles empty table gracefully", () => {
      const { container } = render(() => <Table />);
      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass("table");
    });

    it("handles undefined/null children gracefully", () => {
      const { container } = render(() => <Table>{null}</Table>);
      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
    });

    it("handles boolean false children gracefully", () => {
      const { container } = render(() => <Table>{false}</Table>);
      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
    });
  });
});
