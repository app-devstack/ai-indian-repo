import * as schema from "./schema";

// =======================================================
// Types
// =======================================================

export type UserType = typeof schema.users.$inferSelect;
export type InsertUserType = typeof schema.users.$inferInsert;

export type ChatMessageType = typeof schema.chatMessages.$inferSelect;
export type InsertChatMessageType = typeof schema.chatMessages.$inferInsert;
