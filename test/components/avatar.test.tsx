import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Avatar from "@/components/avatar";

describe("Avatar Component", () => {
  it("renders with image src", () => {
    const { getByRole } = render(() => (
      <Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />
    ));
    
    const img = getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(img).toHaveAttribute("alt", "User Avatar");
  });

  it("renders placeholder with initials", () => {
    const { getByText } = render(() => (
      <Avatar placeholder="AB" />
    ));
    
    expect(getByText("AB")).toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const { container: xs } = render(() => <Avatar size="xs" placeholder="A" />);
    const { container: sm } = render(() => <Avatar size="sm" placeholder="A" />);
    const { container: md } = render(() => <Avatar size="md" placeholder="A" />);
    const { container: lg } = render(() => <Avatar size="lg" placeholder="A" />);
    
    expect(xs.firstChild).toHaveClass("avatar");
    expect(xs.querySelector(".avatar > div")).toHaveClass("w-6");
    expect(sm.querySelector(".avatar > div")).toHaveClass("w-8");
    expect(md.querySelector(".avatar > div")).toHaveClass("w-12");
    expect(lg.querySelector(".avatar > div")).toHaveClass("w-16");
  });

  it("supports rounded avatar", () => {
    const { container } = render(() => (
      <Avatar src="test.jpg" alt="Test" rounded />
    ));
    
    expect(container.querySelector(".avatar > div")).toHaveClass("rounded-full");
  });

  it("supports ring styling", () => {
    const { container } = render(() => (
      <Avatar src="test.jpg" alt="Test" ring />
    ));
    
    expect(container.querySelector(".avatar > div")).toHaveClass("ring", "ring-primary", "ring-offset-base-100", "ring-offset-2");
  });

  it("supports presence indicators", () => {
    const { container: online } = render(() => (
      <Avatar src="test.jpg" alt="Test" status="online" />
    ));
    
    const { container: offline } = render(() => (
      <Avatar src="test.jpg" alt="Test" status="offline" />
    ));
    
    expect(online.querySelector(".online")).toBeInTheDocument();
    expect(offline.querySelector(".offline")).toBeInTheDocument();
  });

  it("supports masks", () => {
    const { container } = render(() => (
      <Avatar src="test.jpg" alt="Test" mask="squircle" />
    ));
    
    expect(container.querySelector(".avatar > div")).toHaveClass("mask", "mask-squircle");
  });

  it("supports custom classes", () => {
    const { container } = render(() => (
      <Avatar src="test.jpg" alt="Test" class="custom-class" />
    ));
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    const { getByRole } = render(() => (
      <Avatar src="test.jpg" alt="User Avatar" />
    ));
    
    const img = getByRole("img");
    expect(img).toHaveAttribute("alt", "User Avatar");
  });

  it("renders fallback when image fails to load", () => {
    // Test fallback with no src to simulate immediate fallback
    const { getByText } = render(() => (
      <Avatar fallback="FB" />
    ));
    
    expect(getByText("FB")).toBeInTheDocument();
  });
});
