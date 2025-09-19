import { createGeminiClient, uuidV7 } from "@repo/lib";
import { Hono } from "hono";
import { JwtVariables } from "hono/jwt";

/**
 * Hono インスタンスの生成
 */
export const createApp = () => new Hono<{ Variables: JwtVariables }>();

const app = createApp();

const router = app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/chat", async (c) => {
    try {
      const client = createGeminiClient();

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
  });

export default router;

export type AppType = typeof router;
