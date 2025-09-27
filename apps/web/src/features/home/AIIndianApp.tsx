"use client";

import AppHeader from "@web/components/element/AppHeader";
import { ChatInput } from "@web/features/home/components/ChatInput";
import ChatMessage from "@web/features/home/components/ChatMessage";
import EngineerStatus from "@web/features/home/components/EngineerStatus";
import MaintenanceScreen from "@web/features/home/components/MaintenanceScreen";
import { useAIIndian } from "@web/features/home/hooks/useAiIndian";
import { useEffect, useRef } from "react";

// Main App Component
export default function AIIndianApp() {
  const {
    messages,

    inputValue,
    setInputValue,

    isInMaintenance,

    handleSendMessage,
    recoverFromMaintenance,
    isLoading,
  } = useAIIndian();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isInMaintenance) {
    return <MaintenanceScreen recoverFromMaintenance={recoverFromMaintenance} />;
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <AppHeader />

      <div className="flex-1 flex flex-col gap-4 p-2">
        <div className="overflow-y-auto flex-1 bg-background rounded-3xl shadow-sm overflow-hidden flex flex-col">
          {/* メッセージ表示エリア */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background rounded-t-3xl">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>

        <EngineerStatus />
      </div>
    </div>
  );
}
