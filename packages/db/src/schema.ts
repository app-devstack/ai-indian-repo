import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { uuidV7 } from "@repo/lib";
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
  updatedAt: timestamp("updated_at"),
};

// ユーザーマスタ
export const users = sqliteTable("users", {
  ..._schemaBase,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
