import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Footer from "@/components/footer";

describe("Footer Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Footer />);
    expect(getByText("Footer Component")).toBeInTheDocument();
  });
});
