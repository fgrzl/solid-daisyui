import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import ChatBubble from "@/components/chat-bubble";

describe("ChatBubble Component", () => {
  it("renders with basic message content", () => {
    const { getByText } = render(() => (
      <ChatBubble>Hello, World!</ChatBubble>
    ));
    expect(getByText("Hello, World!")).toBeInTheDocument();
  });

  it("applies default side class (start)", () => {
    const { container } = render(() => (
      <ChatBubble>Test message</ChatBubble>
    ));
    expect(container.querySelector(".chat")).toHaveClass("chat-start");
  });

  it("applies end side class when specified", () => {
    const { container } = render(() => (
      <ChatBubble side="end">Test message</ChatBubble>
    ));
    expect(container.querySelector(".chat")).toHaveClass("chat-end");
  });

  it("applies start side class when explicitly specified", () => {
    const { container } = render(() => (
      <ChatBubble side="start">Test message</ChatBubble>
    ));
    expect(container.querySelector(".chat")).toHaveClass("chat-start");
  });

  it("applies color variant classes", () => {
    const { container } = render(() => (
      <ChatBubble color="primary">Test message</ChatBubble>
    ));
    expect(container.querySelector(".chat-bubble")).toHaveClass("chat-bubble-primary");
  });

  it("applies all color variants correctly", () => {
    const colors = ["primary", "secondary", "accent", "info", "success", "warning", "error"] as const;
    
    colors.forEach(color => {
      const { container } = render(() => (
        <ChatBubble color={color}>Test message</ChatBubble>
      ));
      expect(container.querySelector(".chat-bubble")).toHaveClass(`chat-bubble-${color}`);
    });
  });

  it("applies size classes (non-default sizes)", () => {
    const { container: containerXs } = render(() => (
      <ChatBubble size="xs">Test message</ChatBubble>
    ));
    expect(containerXs.querySelector(".chat-bubble")).toHaveClass("chat-bubble-xs");

    const { container: containerSm } = render(() => (
      <ChatBubble size="sm">Test message</ChatBubble>
    ));
    expect(containerSm.querySelector(".chat-bubble")).toHaveClass("chat-bubble-sm");

    const { container: containerLg } = render(() => (
      <ChatBubble size="lg">Test message</ChatBubble>
    ));
    expect(containerLg.querySelector(".chat-bubble")).toHaveClass("chat-bubble-lg");
  });

  it("does not apply size class for default md size", () => {
    const { container } = render(() => (
      <ChatBubble size="md">Test message</ChatBubble>
    ));
    expect(container.querySelector(".chat-bubble")).not.toHaveClass("chat-bubble-md");
  });

  it("renders avatar from URL", () => {
    const { container } = render(() => (
      <ChatBubble avatar="https://example.com/avatar.jpg" avatarAlt="User Avatar">
        Test message
      </ChatBubble>
    ));
    
    const avatar = container.querySelector("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(avatar).toHaveAttribute("alt", "User Avatar");
  });

  it("uses default alt text when avatarAlt not provided", () => {
    const { container } = render(() => (
      <ChatBubble avatar="https://example.com/avatar.jpg">
        Test message
      </ChatBubble>
    ));
    
    const avatar = container.querySelector("img");
    expect(avatar).toHaveAttribute("alt", "User avatar");
  });

  it("renders custom avatar element", () => {
    const CustomAvatar = () => <div data-testid="custom-avatar">Custom Avatar</div>;
    
    const { getByTestId } = render(() => (
      <ChatBubble avatarElement={<CustomAvatar />}>
        Test message
      </ChatBubble>
    ));
    
    expect(getByTestId("custom-avatar")).toBeInTheDocument();
  });

  it("prioritizes avatarElement over avatar URL", () => {
    const CustomAvatar = () => <div data-testid="custom-avatar">Custom Avatar</div>;
    
    const { getByTestId, container } = render(() => (
      <ChatBubble 
        avatar="https://example.com/avatar.jpg"
        avatarElement={<CustomAvatar />}
      >
        Test message
      </ChatBubble>
    ));
    
    expect(getByTestId("custom-avatar")).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("renders header content", () => {
    const { getByText } = render(() => (
      <ChatBubble header="John Doe">
        Test message
      </ChatBubble>
    ));
    
    expect(getByText("John Doe")).toBeInTheDocument();
  });

  it("renders JSX header content", () => {
    const { getByTestId } = render(() => (
      <ChatBubble header={<span data-testid="header">Custom Header</span>}>
        Test message
      </ChatBubble>
    ));
    
    expect(getByTestId("header")).toBeInTheDocument();
  });

  it("renders time in header", () => {
    const { getByText } = render(() => (
      <ChatBubble header="John Doe" time="12:45">
        Test message
      </ChatBubble>
    ));
    
    expect(getByText("12:45")).toBeInTheDocument();
  });

  it("renders JSX time content", () => {
    const { getByTestId } = render(() => (
      <ChatBubble 
        header="John Doe" 
        time={<span data-testid="time">2 minutes ago</span>}
      >
        Test message
      </ChatBubble>
    ));
    
    expect(getByTestId("time")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    const { getByText } = render(() => (
      <ChatBubble footer="Delivered">
        Test message
      </ChatBubble>
    ));
    
    expect(getByText("Delivered")).toBeInTheDocument();
  });

  it("renders JSX footer content", () => {
    const { getByTestId } = render(() => (
      <ChatBubble footer={<span data-testid="footer">Custom Footer</span>}>
        Test message
      </ChatBubble>
    ));
    
    expect(getByTestId("footer")).toBeInTheDocument();
  });

  it("applies custom class", () => {
    const { container } = render(() => (
      <ChatBubble class="custom-class">
        Test message
      </ChatBubble>
    ));
    
    expect(container.querySelector(".chat")).toHaveClass("custom-class");
  });

  it("merges user-provided classList", () => {
    const { container } = render(() => (
      <ChatBubble classList={{ "dynamic-class": true, "inactive-class": false }}>
        Test message
      </ChatBubble>
    ));
    
    expect(container.querySelector(".chat")).toHaveClass("dynamic-class");
    expect(container.querySelector(".chat")).not.toHaveClass("inactive-class");
  });

  it("renders JSX children", () => {
    const { getByTestId } = render(() => (
      <ChatBubble>
        <div data-testid="jsx-content">
          <strong>Bold text</strong> and normal text
        </div>
      </ChatBubble>
    ));
    
    expect(getByTestId("jsx-content")).toBeInTheDocument();
  });

  it("renders complete chat bubble with all features", () => {
    const { getByText, container } = render(() => (
      <ChatBubble
        side="end"
        color="primary"
        size="lg"
        avatar="https://example.com/avatar.jpg"
        avatarAlt="Test User"
        header="Test User"
        time="12:45 PM"
        footer="Read"
        class="custom-chat"
        classList={{ "highlight": true }}
      >
        This is a complete chat message with all features!
      </ChatBubble>
    ));
    
    // Check message content
    expect(getByText("This is a complete chat message with all features!")).toBeInTheDocument();
    
    // Check classes
    expect(container.querySelector(".chat")).toHaveClass("chat-end", "custom-chat", "highlight");
    expect(container.querySelector(".chat-bubble")).toHaveClass("chat-bubble-primary", "chat-bubble-lg");
    
    // Check avatar
    const avatar = container.querySelector("img");
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(avatar).toHaveAttribute("alt", "Test User");
    
    // Check header and time
    expect(getByText("Test User")).toBeInTheDocument();
    expect(getByText("12:45 PM")).toBeInTheDocument();
    
    // Check footer
    expect(getByText("Read")).toBeInTheDocument();
  });

  it("handles empty/minimal configuration", () => {
    const { getByText, container } = render(() => (
      <ChatBubble>Minimal message</ChatBubble>
    ));
    
    expect(getByText("Minimal message")).toBeInTheDocument();
    expect(container.querySelector(".chat")).toHaveClass("chat", "chat-start");
    expect(container.querySelector(".chat-bubble")).toHaveClass("chat-bubble");
    expect(container.querySelector(".chat-image")).not.toBeInTheDocument();
    expect(container.querySelector(".chat-header")).not.toBeInTheDocument();
    expect(container.querySelector(".chat-footer")).not.toBeInTheDocument();
  });
});
