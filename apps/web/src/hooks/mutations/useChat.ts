import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { postChatMessage } from "@web/_client/fetcher";
import { ChatRequest, ChatResponse } from "@web/types/chat";

type UseChatMutationOptions = Pick<
  UseMutationOptions<ChatResponse | null, Error, ChatRequest>,
  "onSuccess" | "onError" | "onSettled"
>;

/**
 * [POST] Chat API mutation hook
 */
export const useChatMutation = (
  options?: UseChatMutationOptions
): UseMutationResult<ChatResponse | null, Error, ChatRequest> => {
  return useMutation({
    mutationFn: postChatMessage,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};
