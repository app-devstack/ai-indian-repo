import { uuidV7 } from "@repo/lib";
import { getIndianErrorResponse } from "@web/features/home/utils";
import { useChatMutation } from "@web/hooks/mutations/useChat";
import { useEngineerStatusStore } from "@web/store/useEngineerStatusStore";
import { ChatMessageStateType } from "@web/types/chat";
import { useState } from "react";

export const useAIIndian = () => {
  const [messages, setMessages] = useState<ChatMessageStateType[]>([
    {
      id: uuidV7(),
      content:
        "インド人じゃないよ。そんなわけないじゃないか。私は高度なAIアシスタントです。何かお手伝いできることはありますか？",
      role: "model",
      createdAt: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isInMaintenance, setIsInMaintenance] = useState(false);

  const { fatigue, setFatigue, setIndianState, updateFatigue } = useEngineerStatusStore();

  // Chat API mutation
  const chatMutation = useChatMutation({
    onSuccess: (response) => {
      if (!response) {
        setMessages((prev) => [...prev, getIndianErrorResponse()]);
        setIndianState("typing");
        console.error("Chat API returned no response");
        return;
      }

      const apiMessage = {
        id: uuidV7(),
        content: response.message,
        role: "model",
        createdAt: new Date(response.timestamp),
      } satisfies ChatMessageStateType;
      setMessages((prev) => [...prev, apiMessage]);
      setIndianState("typing");
    },
    onError: (error) => {
      // APIエラー時はフォールバック応答を表示
      setMessages((prev) => [...prev, getIndianErrorResponse()]);
      setIndianState("typing");
      console.error("Chat API error:", error);
    },
  });

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isInMaintenance) return;

    const userMessage = {
      id: uuidV7(),
      content: inputValue,
      role: "user",
      createdAt: new Date(),
    } satisfies ChatMessageStateType;

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    // 疲労度を増加
    const fatigueIncrement = 10 + Math.random() * 15;
    updateFatigue(fatigueIncrement);
    const newFatigue = fatigue + fatigueIncrement;

    // インド人の状態を更新
    setIndianState("thinking");

    // 疲労度が100になったらメンテナンス
    if (newFatigue >= 100) {
      setTimeout(() => {
        setIsInMaintenance(true);
        setIndianState("sleeping");
      }, 1000);
      return;
    }

    // Chat API を呼び出し
    chatMutation.mutate({
      message: currentInput,
      conversationId: "indian-chat",
    });
  };

  // メンテナンス復旧
  const recoverFromMaintenance = () => {
    setIsInMaintenance(false);
    setFatigue(0);
    setIndianState("typing");
    const recoveryMessage = {
      id: uuidV7(),
      content:
        "システムが復旧しました！実際のところ、いくつかのサービスを再起動する必要がありました。今度こそすべて正常に動作しています！",
      role: "model",
      createdAt: new Date(),
    } satisfies ChatMessageStateType;
    setMessages((prev) => [...prev, recoveryMessage]);
  };

  return {
    messages,

    inputValue,
    setInputValue,

    isInMaintenance,

    handleSendMessage,
    recoverFromMaintenance,
    isLoading: chatMutation.isPending,
  };
};
