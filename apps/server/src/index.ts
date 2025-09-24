// import { users } from "./router";
import { createGeminiClient, uuidV7 } from "@repo/lib";
import { Hono } from "hono";
import { JwtVariables } from "hono/jwt";
import { options } from "@repo/db/index";
import { drizzle } from "drizzle-orm/d1";

type Bindings = {
  // DB: D1Database;
  DB: any;
  GEMINI_API_KEY: string;
};

/**
 * Hono インスタンスの生成
 */
export const createApp = () => new Hono<{ Variables: JwtVariables; Bindings: Bindings }>();

const app = createApp();

const router = app
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
      const errorResponse = {
        error: "Internal server error",
      };

      return c.json(errorResponse, 500);
    }
  })
  .get("/users", async (c) => {
    try {
      const db = drizzle(c.env.DB, options);

      const data = await db.query.users.findMany();
      return c.json({ data: data });
    } catch (error) {
      return c.json({ error }, 500);
    }
  })
  .post("/users", (c) => {
    return c.json({ message: "user created successfully!" });
  });
// .route("/users", users);

export default router;

export type AppType = typeof router;
