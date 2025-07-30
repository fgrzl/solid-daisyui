import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Accordion from "@/components/accordion";

describe("Accordion Component", () => {
  it("renders with title and children", () => {
    const { getByText } = render(() => (
      <Accordion title="Test Title" name="test-group">
        <div>Test Content</div>
      </Accordion>
    ));
    
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("uses radio input with correct name attribute", () => {
    const { container } = render(() => (
      <Accordion title="Test" name="test-group">
        <div>Content</div>
      </Accordion>
    ));
    
    const radioInput = container.querySelector('input[type="radio"]');
    expect(radioInput).toBeInTheDocument();
    expect(radioInput).toHaveAttribute("name", "test-group");
  });

  it("can be opened by default", () => {
    const { container } = render(() => (
      <Accordion title="Test" name="test-group" open>
        <div>Content</div>
      </Accordion>
    ));
    
    const radioInput = container.querySelector('input[type="radio"]');
    expect(radioInput).toBeChecked();
  });

  it("shows content when open", () => {
    const { getByText } = render(() => (
      <Accordion title="Test" name="test-group" open>
        <div>Test Content</div>
      </Accordion>
    ));
    
    const content = getByText("Test Content");
    expect(content).toBeVisible();
  });

  it("hides content when closed", () => {
    const { getByText } = render(() => (
      <Accordion title="Test" name="test-group">
        <div>Test Content</div>
      </Accordion>
    ));
    
    const content = getByText("Test Content");
    expect(content).not.toBeVisible();
  });

  it("toggles content when clicked", () => {
    const { getByRole, getByText } = render(() => (
      <Accordion title="Test Title" name="test-group">
        <div>Test Content</div>
      </Accordion>
    ));
    
    const button = getByRole("button");
    const content = getByText("Test Content");
    
    // Initially closed
    expect(content).not.toBeVisible();
    
    // Click to open
    fireEvent.click(button);
    expect(content).toBeVisible();
  });

  it("has proper accessibility attributes", () => {
    const { getByRole, container } = render(() => (
      <Accordion title="Test Title" name="test-group">
        <div>Test Content</div>
      </Accordion>
    ));
    
    const button = getByRole("button");
    const radio = container.querySelector('input[type="radio"]') as HTMLInputElement;
    const contentPanel = container.querySelector('.collapse-content') as HTMLElement;
    
    // Check button attributes
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls");
    expect(button).toHaveAttribute("tabindex", "0");
    expect(button).toHaveAttribute("role", "button");
    
    // Check radio input is hidden from screen readers
    expect(radio).toHaveAttribute("aria-hidden", "true");
    
    // Check content panel attributes
    expect(contentPanel).toHaveAttribute("role", "region");
    expect(contentPanel).toHaveAttribute("aria-labelledby");
    expect(contentPanel).toHaveAttribute("aria-hidden", "true");
    
    // Test state changes
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(contentPanel).toHaveAttribute("aria-hidden", "false");
  });

  it("supports custom CSS classes", () => {
    const { container } = render(() => (
      <Accordion title="Test" name="test-group" class="custom-class">
        <div>Content</div>
      </Accordion>
    ));
    
    const accordion = container.firstChild;
    expect(accordion).toHaveClass("custom-class");
  });

  it("supports keyboard navigation", () => {
    const { getByRole } = render(() => (
      <Accordion title="Test Title" name="test-group">
        <div>Test Content</div>
      </Accordion>
    ));
    
    const button = getByRole("button");
    
    // Test Enter key
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.keyDown(button, { key: "Enter" });
    expect(button).toHaveAttribute("aria-expanded", "true");
    
    // Test Space key
    fireEvent.keyDown(button, { key: " " });
    expect(button).toHaveAttribute("aria-expanded", "true");
    
    // Test other keys don't trigger (like Arrow keys)
    fireEvent.keyDown(button, { key: "ArrowDown" });
    expect(button).toHaveAttribute("aria-expanded", "true"); // Should remain unchanged
  });

  it("supports arrow icon variant", () => {
    const { container } = render(() => (
      <Accordion title="Test" name="test-group" variant="arrow">
        <div>Content</div>
      </Accordion>
    ));
    
    const accordion = container.firstChild;
    expect(accordion).toHaveClass("collapse-arrow");
  });

  it("supports plus/minus icon variant", () => {
    const { container } = render(() => (
      <Accordion title="Test" name="test-group" variant="plus">
        <div>Content</div>
      </Accordion>
    ));
    
    const accordion = container.firstChild;
    expect(accordion).toHaveClass("collapse-plus");
  });

  it("only one accordion in a group can be open at a time", () => {
    const { getAllByRole, getByText } = render(() => (
      <div>
        <Accordion title="First" name="test-group" open>
          <div>First Content</div>
        </Accordion>
        <Accordion title="Second" name="test-group">
          <div>Second Content</div>
        </Accordion>
      </div>
    ));
    
    const buttons = getAllByRole("button");
    const firstContent = getByText("First Content");
    const secondContent = getByText("Second Content");
    
    // Initially first is open, second is closed
    expect(firstContent).toBeVisible();
    expect(secondContent).not.toBeVisible();
    
    // Click second accordion
    fireEvent.click(buttons[1]);
    
    // Now second should be open, first should be closed
    expect(firstContent).not.toBeVisible();
    expect(secondContent).toBeVisible();
  });
});
