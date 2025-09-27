import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { uuidV7 } from "@repo/lib";
import { relations } from "drizzle-orm";
// import { relations } from "drizzle-orm";

const timestamp = (name: string) =>
  integer(name, { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date());

// 共通のベーススキーマ
const _schemaBase = {
  id: text()
    .$defaultFn(() => uuidV7())
    .primaryKey()
    .notNull(),

  createdAt: timestamp("created_at"),
  // updatedAt: timestamp("updated_at"),
};

// =======================================================
// Tables
// =======================================================

// ユーザーテーブル
export const users = sqliteTable("users", {
  ..._schemaBase,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
});

/**
 * チャットメッセージを保持するテーブル
 * Geminiの履歴構造に合わせて 'user' または 'model' のロールを持つ
 */
export const chatMessages = sqliteTable("chat_messages", {
  ..._schemaBase,
  content: text("content").notNull(),
  role: text("role", { enum: ["user", "model"] }).notNull(),
  userId: text("user_id").notNull(),
});

// =======================================================
// Relations
// =======================================================

// リレーション定義
export const usersRelations = relations(users, ({ many }) => ({
  chatMessages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
}));
