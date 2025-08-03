import { 
  Table, 
  TableHead, 
  TableBody, 
  TableFoot, 
  TableRow, 
  TableHeader, 
  TableData, 
  TableCaption 
} from "@/components/table";

/**
 * Demo of the new structured Table components
 */
export function StructuredTableDemo() {
  return (
    <div class="space-y-8">
      <h1 class="text-3xl font-bold">Structured Table Components Demo</h1>
      
      <section>
        <h2 class="text-2xl font-semibold mb-4">Basic Structured Table</h2>
        <Table zebra size="md">
          <TableCaption>Employee Information</TableCaption>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Name</TableHeader>
              <TableHeader scope="col">Department</TableHeader>
              <TableHeader scope="col">Salary</TableHeader>
              <TableHeader scope="col">Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow active>
              <TableHeader scope="row">John Doe</TableHeader>
              <TableData>Engineering</TableData>
              <TableData>$75,000</TableData>
              <TableData>Active</TableData>
            </TableRow>
            <TableRow hover>
              <TableHeader scope="row">Jane Smith</TableHeader>
              <TableData>Marketing</TableData>
              <TableData>$65,000</TableData>
              <TableData>Active</TableData>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">Bob Johnson</TableHeader>
              <TableData>Sales</TableData>
              <TableData>$70,000</TableData>
              <TableData>Inactive</TableData>
            </TableRow>
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeader scope="row">Total</TableHeader>
              <TableData colspan={2}>3 Employees</TableData>
              <TableData>$210,000</TableData>
            </TableRow>
          </TableFoot>
        </Table>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Complex Table with All Features</h2>
        <Table pinRows pinCols size="lg" class="w-full">
          <TableCaption>Quarterly Sales Report by Region</TableCaption>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Region</TableHeader>
              <TableHeader scope="col" abbr="Q1">Q1 2024</TableHeader>
              <TableHeader scope="col" abbr="Q2">Q2 2024</TableHeader>
              <TableHeader scope="col" abbr="Q3">Q3 2024</TableHeader>
              <TableHeader scope="col" abbr="Total">Total</TableHeader>
              <TableHeader scope="col">Growth</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableHeader scope="row">North America</TableHeader>
              <TableData>$120,000</TableData>
              <TableData>$135,000</TableData>
              <TableData>$150,000</TableData>
              <TableData>$405,000</TableData>
              <TableData class="text-green-600">+25%</TableData>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">Europe</TableHeader>
              <TableData>$85,000</TableData>
              <TableData>$92,000</TableData>
              <TableData>$88,000</TableData>
              <TableData>$265,000</TableData>
              <TableData class="text-green-600">+3.5%</TableData>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">Asia Pacific</TableHeader>
              <TableData>$95,000</TableData>
              <TableData>$110,000</TableData>
              <TableData>$125,000</TableData>
              <TableData>$330,000</TableData>
              <TableData class="text-green-600">+31.6%</TableData>
            </TableRow>
          </TableBody>
          <TableFoot>
            <TableRow class="font-bold">
              <TableHeader scope="row">Grand Total</TableHeader>
              <TableData>$300,000</TableData>
              <TableData>$337,000</TableData>
              <TableData>$363,000</TableData>
              <TableData>$1,000,000</TableData>
              <TableData class="text-green-600">+21%</TableData>
            </TableRow>
          </TableFoot>
        </Table>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Small Zebra Table</h2>
        <Table zebra size="sm">
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Product</TableHeader>
              <TableHeader scope="col">Price</TableHeader>
              <TableHeader scope="col">Stock</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableHeader scope="row">Laptop</TableHeader>
              <TableData>$999</TableData>
              <TableData>15</TableData>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">Mouse</TableHeader>
              <TableData>$25</TableData>
              <TableData>50</TableData>
            </TableRow>
            <TableRow>
              <TableHeader scope="row">Keyboard</TableHeader>
              <TableData>$75</TableData>
              <TableData>30</TableData>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
}