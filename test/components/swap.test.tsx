import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import Swap from "@/components/swap";

describe("Swap Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).toHaveClass("swap");
      expect(swapElement.querySelector(".swap-on")).toBeInTheDocument();
      expect(swapElement.querySelector(".swap-off")).toBeInTheDocument();
    });

    it("renders with active state initially false", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).not.toHaveClass("swap-active");
      
      const checkbox = swapElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox).not.toBeChecked();
    });

    it("renders with controlled active state", () => {
      const { container } = render(() => 
        <Swap active={true} on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).toHaveClass("swap-active");
      
      const checkbox = swapElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox).toBeChecked();
    });

    it("renders content in correct swap-on and swap-off containers", () => {
      const { getByText } = render(() => 
        <Swap on={<span>On Content</span>} off={<span>Off Content</span>} />
      );
      
      const onContent = getByText("On Content");
      const offContent = getByText("Off Content");
      
      expect(onContent.parentElement).toHaveClass("swap-on");
      expect(offContent.parentElement).toHaveClass("swap-off");
    });
  });

  describe("DaisyUI Variants", () => {
    it("applies swap-rotate variant", () => {
      const { container } = render(() => 
        <Swap 
          variant="rotate" 
          on={<span>On State</span>} 
          off={<span>Off State</span>} 
        />
      );
      
      expect(container.firstChild).toHaveClass("swap", "swap-rotate");
    });

    it("applies swap-flip variant", () => {
      const { container } = render(() => 
        <Swap 
          variant="flip" 
          on={<span>On State</span>} 
          off={<span>Off State</span>} 
        />
      );
      
      expect(container.firstChild).toHaveClass("swap", "swap-flip");
    });

    it("applies no animation variant by default", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).toHaveClass("swap");
      expect(swapElement).not.toHaveClass("swap-rotate");
      expect(swapElement).not.toHaveClass("swap-flip");
    });
  });

  describe("State Management", () => {
    it("handles uncontrolled state changes via click", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      const checkbox = swapElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
      
      expect(swapElement).not.toHaveClass("swap-active");
      expect(checkbox).not.toBeChecked();
      
      fireEvent.click(swapElement);
      
      expect(swapElement).toHaveClass("swap-active");
      expect(checkbox).toBeChecked();
    });

    it("calls onToggle callback when toggled", () => {
      const onToggle = vi.fn();
      const { container } = render(() => 
        <Swap 
          on={<span>On State</span>} 
          off={<span>Off State</span>}
          onToggle={onToggle}
        />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      fireEvent.click(swapElement);
      
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("calls onToggle with correct value when toggling multiple times", () => {
      const onToggle = vi.fn();
      const { container } = render(() => 
        <Swap 
          on={<span>On State</span>} 
          off={<span>Off State</span>}
          onToggle={onToggle}
        />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      
      fireEvent.click(swapElement);
      expect(onToggle).toHaveBeenCalledWith(true);
      
      fireEvent.click(swapElement);
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it("supports controlled state updates", () => {
      const [active, setActive] = createSignal(false);
      
      const { container } = render(() => 
        <Swap 
          active={active()}
          on={<span>On State</span>} 
          off={<span>Off State</span>}
          onToggle={setActive}
        />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).not.toHaveClass("swap-active");
      
      // Update the signal and check that the UI updates reactively
      setActive(true);
      
      // Give SolidJS time to update the DOM
      setTimeout(() => {
        expect(swapElement).toHaveClass("swap-active");
      }, 0);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA role", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).toHaveAttribute("role", "switch");
    });

    it("has proper ARIA checked state", () => {
      const { container } = render(() => 
        <Swap active={true} on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).toHaveAttribute("aria-checked", "true");
    });

    it("supports custom aria-label", () => {
      const { container } = render(() => 
        <Swap 
          aria-label="Toggle dark mode"
          on={<span>Dark</span>} 
          off={<span>Light</span>} 
        />
      );
      
      expect(container.firstChild).toHaveAttribute("aria-label", "Toggle dark mode");
    });

    it("has default aria-label when none provided", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      expect(container.firstChild).toHaveAttribute("aria-label", "Toggle switch");
    });

    it("is keyboard accessible with Enter key", () => {
      const onToggle = vi.fn();
      const { container } = render(() => 
        <Swap 
          on={<span>On State</span>} 
          off={<span>Off State</span>}
          onToggle={onToggle}
        />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      fireEvent.keyDown(swapElement, { key: "Enter" });
      
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("is keyboard accessible with Space key", () => {
      const onToggle = vi.fn();
      const { container } = render(() => 
        <Swap 
          on={<span>On State</span>} 
          off={<span>Off State</span>}
          onToggle={onToggle}
        />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      fireEvent.keyDown(swapElement, { key: " " });
      
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("is focusable", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      expect(swapElement).toHaveAttribute("tabindex", "0");
    });
  });

  describe("Custom Styling", () => {
    it("applies custom class", () => {
      const { container } = render(() => 
        <Swap 
          class="custom-class"
          on={<span>On State</span>} 
          off={<span>Off State</span>} 
        />
      );
      
      expect(container.firstChild).toHaveClass("swap", "custom-class");
    });

    it("applies custom classList", () => {
      const { container } = render(() => 
        <Swap 
          classList={{ "custom-active": true, "custom-inactive": false }}
          on={<span>On State</span>} 
          off={<span>Off State</span>} 
        />
      );
      
      expect(container.firstChild).toHaveClass("swap", "custom-active");
      expect(container.firstChild).not.toHaveClass("custom-inactive");
    });

    it("combines custom class and classList", () => {
      const { container } = render(() => 
        <Swap 
          class="base-class"
          classList={{ "dynamic-class": true }}
          on={<span>On State</span>} 
          off={<span>Off State</span>} 
        />
      );
      
      expect(container.firstChild).toHaveClass("swap", "base-class", "dynamic-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles missing on prop gracefully", () => {
      const { container } = render(() => 
        <Swap off={<span>Off State</span>} />
      );
      
      expect(container.firstChild).toHaveClass("swap");
      expect(container.querySelector(".swap-on")).toBeInTheDocument();
      expect(container.querySelector(".swap-off")).toBeInTheDocument();
    });

    it("handles missing off prop gracefully", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} />
      );
      
      expect(container.firstChild).toHaveClass("swap");
      expect(container.querySelector(".swap-on")).toBeInTheDocument();
      expect(container.querySelector(".swap-off")).toBeInTheDocument();
    });

    it("handles both missing on and off props", () => {
      const { container } = render(() => <Swap />);
      
      expect(container.firstChild).toHaveClass("swap");
      expect(container.querySelector(".swap-on")).toBeInTheDocument();
      expect(container.querySelector(".swap-off")).toBeInTheDocument();
    });

    it("prevents default behavior for keyboard events", () => {
      const { container } = render(() => 
        <Swap on={<span>On State</span>} off={<span>Off State</span>} />
      );
      
      const swapElement = container.firstChild as HTMLElement;
      
      // Create a real keyboard event that can have preventDefault called
      const enterEvent = new KeyboardEvent("keydown", { 
        key: "Enter",
        bubbles: true,
        cancelable: true 
      });
      const spaceEvent = new KeyboardEvent("keydown", { 
        key: " ",
        bubbles: true,
        cancelable: true 
      });
      
      const enterPreventDefault = vi.spyOn(enterEvent, "preventDefault");
      const spacePreventDefault = vi.spyOn(spaceEvent, "preventDefault");
      
      swapElement.dispatchEvent(enterEvent);
      swapElement.dispatchEvent(spaceEvent);
      
      expect(enterPreventDefault).toHaveBeenCalled();
      expect(spacePreventDefault).toHaveBeenCalled();
    });
  });

  describe("TypeScript Interface", () => {
    it("accepts all expected props", () => {
      // This test ensures the interface is properly defined
      const onToggle = vi.fn();
      
      const { container } = render(() => 
        <Swap 
          active={false}
          variant="rotate"
          on={<span>On</span>}
          off={<span>Off</span>}
          onToggle={onToggle}
          class="test-class"
          classList={{ active: true }}
          aria-label="Test swap"
        />
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
