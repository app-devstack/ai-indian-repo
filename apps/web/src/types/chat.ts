import { ChatMessageType } from "@repo/db/types";

export interface ChatRequest {
  message: string;
  userId?: string;
  conversationId?: string;
}

export interface ChatResponse {
  id: string;
  message: string;
}

export type ChatMessageStateType = Omit<ChatMessageType, "userId">;
