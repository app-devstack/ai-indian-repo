// import { users } from "./router";
import { createGeminiClient, uuidV7 } from "@repo/lib";
import { Context, Hono } from "hono";
import { JwtVariables } from "hono/jwt";
import { options } from "@repo/db/index";
import { drizzle } from "drizzle-orm/d1";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";

type Bindings = {
  // DB: D1Database;
  DB: any;
  GEMINI_API_KEY: string;
};

/**
 * Hono インスタンスの生成
 */
export const createApp = () => new Hono<{ Variables: JwtVariables; Bindings: Bindings }>();

// エラーハンドラー設定
export const errorHandler = (err: Error | HTTPException, c: Context) => {
  console.log("=== Caught Error ===");
  if (err instanceof HTTPException) {
    return c.text(err.message, err.status);
  }
  console.error(err);
  return c.text("Something went wrong", 500);
};

export class AppError extends HTTPException {
  constructor(status: ContentfulStatusCode, message: string, cause?: string) {
    super(status, { message, cause });
  }
}

// 定義済みエラー
export const CommonErrors = {
  NotFound: (resource: string) => new AppError(404, `${resource} not found`),
  Unauthorized: () => new AppError(401, "Unauthorized access"),
  BadRequest: (message: string) => new AppError(400, message),
  InternalError: () => new AppError(500, "Internal server error"),
} as const;

const app = createApp();

const router = app
  .onError((err, c) => {
    if (err instanceof AppError) return c.text(err.message, err.status);
    return c.text("Something went wrong", 500);
  })
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/chat", async (c) => {
    try {
      const client = createGeminiClient({ apiKey: c.env.GEMINI_API_KEY });

      const body = await c.req.json();

      const aiResponse = await client.generateResponse(body.message);
      console.log("AI Response:", aiResponse);

      interface ChatResponse {
        id: string;
        message: string;
        timestamp: string;
        // conversationId: string;
      }

      const response: ChatResponse = {
        id: uuidV7(),
        message: aiResponse,
        timestamp: new Date().toISOString(),
        // conversationId: conversationId,
      };

      return c.json(response);
    } catch (error) {
      console.error("Chat API error:", error);
      throw CommonErrors.InternalError();
    }
  })
  .get("/users", async (c) => {
    try {
      const db = drizzle(c.env.DB, options);

      const data = await db.query.users.findMany();
      return c.json({ data: data });
    } catch (error) {
      console.error("DB error:", error);
      throw CommonErrors.InternalError();
    }
  })
  .post("/users", (c) => {
    return c.json({ message: "user created successfully!" });
  });
// .route("/users", users);

export default router;

export type AppType = typeof router;
