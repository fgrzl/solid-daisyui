import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Toast from "@/components/toast";

describe("Toast Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Toast />);
    expect(getByText("Toast Component")).toBeInTheDocument();
  });
});
