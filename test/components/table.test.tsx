import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Table from "@/components/table";

describe("Table Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Table />);
    expect(getByText("Table Component")).toBeInTheDocument();
  });
});
