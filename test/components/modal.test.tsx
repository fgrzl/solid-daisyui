import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Modal from "@/components/modal";

describe("Modal Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Modal />);
    expect(getByText("Modal Component")).toBeInTheDocument();
  });
});
