import * as schema from "./schema";
import { DrizzleConfig } from "drizzle-orm";

export * from "./schema";

// import { drizzle } from "drizzle-orm/d1";

export const options = {
  casing: "snake_case" as const,
  schema: { ...schema },
  logger: false,
} satisfies DrizzleConfig<typeof schema>;

// const db = drizzle(
//   {}, // {} as Env["DB"]
//   options
// );

// export default db;
