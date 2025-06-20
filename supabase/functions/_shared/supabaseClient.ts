import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js";
import { MiddlewareHandler } from "https://deno.land/x/hono/types.ts";
import { Database } from "<generated from supabase cli>";

export function supabaseAuth(): MiddlewareHandler<SupabaseEnv> {
  return async (c, next) => {
    const authHeader = c.req.header("authorization");

    if (!authHeader) {
      return new Response("Unauthorized", { status: 403 });
    }

    const client = createClient<Database>(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("ANON_KEY") || "",
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } },
    );

    c.set("supabase", client);
    await next();
  };
}