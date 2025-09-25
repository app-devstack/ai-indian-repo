import { ClientResponse, hc } from "hono/client";
import type { AppType } from "@repo/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

const client = hc<AppType>(baseUrl, {
  init: {
    credentials: "include",
    mode: "cors",
    cache: "no-store",
  },
});

export const callRpc = async <T>(
  rpc: Promise<ClientResponse<T>>
): Promise<{ data: T; error: null } | { data: null; error: string }> => {
  try {
    const data = await rpc;
    if (!data.ok) {
      const res = await data.text();
      return { data: null, error: res };
    }
    const res = await data.json();
    return { data: res as T, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export { client as apiClient };
