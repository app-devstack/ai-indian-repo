import { Button } from "@repo/ui/shadcn/button";
import { Input } from "@web/components/ui/input";
import { KeyboardEvent } from "react";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

export function ChatInput({
  inputValue,
  setInputValue,
  handleSendMessage,
  isLoading,
}: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="p-6 bg-background flex space-x-4">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target?.value || "");
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask AI Indian anything..."
        className="flex-1 border border-border rounded-3xl px-5 py-3 text-sm text-foreground"
      />

      <Button
        onClick={handleSendMessage}
        disabled={inputValue.trim() === "" || isLoading}
        className="px-8 py-3 rounded-3xl text-sm font-medium"
      >
        {isLoading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}
