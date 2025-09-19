export type { AppType } from "./";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // DB: D1Database
      // NEXT_PUBLIC_APP_URL: string;
      API_SECRET: string;
      API_PASSWORD_HASH_COUNT: string;
    }
  }
}
