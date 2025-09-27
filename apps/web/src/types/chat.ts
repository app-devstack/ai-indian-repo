import { ChatMessageType } from "@repo/db/types";

export interface ChatRequest {
  message: string;
  userId?: string;
  conversationId?: string;
}

export type ChatResponse = ChatMessageType;

export type ChatMessageStateType = Omit<ChatMessageType, "userId">;
