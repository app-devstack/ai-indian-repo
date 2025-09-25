import { ChatRequest, ChatResponse } from "@web/types/chat";
import { apiClient, callRpc } from "./api";

export const postChatMessage = async (data: ChatRequest): Promise<ChatResponse | null> => {
  const response = await callRpc(apiClient.chat.$post({ json: data }));

  if (response.error) {
    console.error("Error:", response.error);
    // return;
  }

  return response.data as ChatResponse | null;
};
