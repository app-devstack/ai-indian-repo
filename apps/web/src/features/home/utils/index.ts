import { uuidV7 } from "@repo/lib";
import { ChatMessageStateType } from "@web/types/chat";

/**
 * エラー時のフォールバック応答
 */
export function getIndianErrorResponse(): ChatMessageStateType {
  const responses = [
    "Actually, this is very interesting question. Let me explain you properly...",
    "Basically, what you are asking is quite simple. You see, the thing is...",
    "Very good question! Actually I was working on similar issue yesterday only.",
    "Yes yes, I understand your problem. This is very common issue, actually.",
    "Actually, let me tell you one thing - this is exactly what I was discussing with my colleague.",
    "Basically, you need to understand the core concept first. Let me explain...",
    "Actually, this reminds me of one project I was working on. Very similar case.",
    "Yes, this is possible definitely. But you need to be careful about few things...",
    "Actually, in my experience, best approach is to start from basics. Let me tell you...",
    "Basically, what you want to achieve is quite straightforward. Actually...",
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  return {
    id: uuidV7(),
    content: randomResponse + " I will help you definitely!",
    role: "model",
    createdAt: new Date(),
  };
}
