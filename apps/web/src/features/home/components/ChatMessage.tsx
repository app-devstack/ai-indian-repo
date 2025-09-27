import { cn } from "@web/lib/utils";
import { ChatMessageStateType } from "@web/types/chat";

export default function ChatMessage({ message }: { message: ChatMessageStateType }) {
  const isUser = message.role === "user";

  if (isUser) {
    return <UserChatMessage content={message.content} />;
  }

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-6 py-3 rounded-3xl",
          isUser
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-muted text-primary border border-border/50"
        )}
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-relaxed">{message.content}</p>
          {/* <p className="text-xs opacity-60">{formatDate(message.timestamp, "MM/dd HH:mm")}</p> */}
        </div>
      </div>
    </div>
  );
}

function UserChatMessage({ content }: { content: string }) {
  return (
    <div className={cn("flex justify-end")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-6 py-3 rounded-3xl",
          "bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-relaxed">{content}</p>
          {/* <p className="text-xs opacity-60">{formatDate(message.timestamp, "MM/dd HH:mm")}</p> */}
        </div>
      </div>
    </div>
  );
}
