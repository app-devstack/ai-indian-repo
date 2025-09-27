import CustomMarked from "@web/components/element/customMarked";
import { cn } from "@web/lib/utils";
import { ChatMessageStateType } from "@web/types/chat";

export default function ChatMessage({ message }: { message: ChatMessageStateType }) {
  const Comp = message.role === "user" ? UserChatMessage : ModelChatMessage;
  return <Comp content={message.content} />;
}

/**
 * ユーザーのメッセージ
 */
function UserChatMessage({ content }: { content: string }) {
  return (
    <div className={cn("flex justify-end")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-6 py-3 rounded-3xl",
          "bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <div className="flex flex-col gap-2 text-sm leading-relaxed">
          <CustomMarked>{content}</CustomMarked>
        </div>
      </div>
    </div>
  );
}

/**
 * AIの返答はマークダウンで表示
 */
function ModelChatMessage({ content }: { content: string }) {
  return (
    <div className="text-foreground">
      <CustomMarked>{content}</CustomMarked>
    </div>
  );
}
