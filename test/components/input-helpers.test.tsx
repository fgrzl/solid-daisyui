import { render } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { 
  TextInput, 
  PasswordInput, 
  EmailInput, 
  NumberInput, 
  SearchInput,
  TelInput,
  UrlInput,
  DateInput,
  DateTimeLocalInput,
  MonthInput,
  TimeInput,
  WeekInput
} from "@/components/input";

describe("Input Helper Components", () => {
  describe("TextInput", () => {
    it("renders with type='text'", () => {
      const { container } = render(() => <TextInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveClass("input");
    });

    it("forwards all props correctly", () => {
      const { container } = render(() => 
        <TextInput placeholder="Enter text" size="lg" variant="primary" />
      );
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("placeholder", "Enter text");
      expect(input).toHaveClass("input-lg");
      expect(input).toHaveClass("input-primary");
    });
  });

  describe("PasswordInput", () => {
    it("renders with type='password'", () => {
      const { container } = render(() => <PasswordInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "password");
      expect(input).toHaveClass("input");
    });
  });

  describe("EmailInput", () => {
    it("renders with type='email'", () => {
      const { container } = render(() => <EmailInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveClass("input");
    });
  });

  describe("NumberInput", () => {
    it("renders with type='number'", () => {
      const { container } = render(() => <NumberInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "number");
      expect(input).toHaveClass("input");
    });
  });

  describe("SearchInput", () => {
    it("renders with type='search'", () => {
      const { container } = render(() => <SearchInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "search");
      expect(input).toHaveClass("input");
    });
  });

  describe("TelInput", () => {
    it("renders with type='tel'", () => {
      const { container } = render(() => <TelInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "tel");
      expect(input).toHaveClass("input");
    });
  });

  describe("UrlInput", () => {
    it("renders with type='url'", () => {
      const { container } = render(() => <UrlInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "url");
      expect(input).toHaveClass("input");
    });
  });

  describe("DateInput", () => {
    it("renders with type='date'", () => {
      const { container } = render(() => <DateInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "date");
      expect(input).toHaveClass("input");
    });
  });

  describe("DateTimeLocalInput", () => {
    it("renders with type='datetime-local'", () => {
      const { container } = render(() => <DateTimeLocalInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "datetime-local");
      expect(input).toHaveClass("input");
    });
  });

  describe("MonthInput", () => {
    it("renders with type='month'", () => {
      const { container } = render(() => <MonthInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "month");
      expect(input).toHaveClass("input");
    });
  });

  describe("TimeInput", () => {
    it("renders with type='time'", () => {
      const { container } = render(() => <TimeInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "time");
      expect(input).toHaveClass("input");
    });
  });

  describe("WeekInput", () => {
    it("renders with type='week'", () => {
      const { container } = render(() => <WeekInput />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "week");
      expect(input).toHaveClass("input");
    });
  });

  describe("All Helper Components", () => {
    it("maintains all DaisyUI functionality", () => {
      const components = [
        { Component: TextInput, type: "text" },
        { Component: PasswordInput, type: "password" },
        { Component: EmailInput, type: "email" },
        { Component: NumberInput, type: "number" }
      ];

      components.forEach(({ Component, type }) => {
        const { container } = render(() => 
          <Component 
            size="lg" 
            variant="primary" 
            bordered 
            placeholder={`Test ${type}`} 
          />
        );
        const input = container.querySelector("input");
        
        expect(input).toHaveAttribute("type", type);
        expect(input).toHaveClass("input");
        expect(input).toHaveClass("input-lg");
        expect(input).toHaveClass("input-primary");
        expect(input).toHaveClass("input-bordered");
        expect(input).toHaveAttribute("placeholder", `Test ${type}`);
      });
    });
  });
});