import { ChatRequest, ChatResponse, ChatError } from "@web/types/chat";
import { apiClient } from "./api";

export const postChatMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  const response = await apiClient.chat.$post({
    json: data,
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({
      error: "Unknown error occurred",
      code: response.status,
    }))) as ChatError;
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as ChatResponse;
};
