import { hc } from "hono/client";
import type { AppType } from "@repo/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

const client = hc<AppType>(baseUrl, {
  init: {
    credentials: "include",
    mode: "cors",
    cache: "no-store",
  },
});

export { client as apiClient };
