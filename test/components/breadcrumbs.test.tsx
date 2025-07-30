import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Breadcrumbs from "@/components/breadcrumbs";

describe("Breadcrumbs Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Breadcrumbs />);
    expect(getByText("Breadcrumbs Component")).toBeInTheDocument();
  });
});
