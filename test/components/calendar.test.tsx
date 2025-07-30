import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Calendar from "@/components/calendar";

describe("Calendar Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Calendar />);
    expect(getByText("Calendar Component")).toBeInTheDocument();
  });
});
