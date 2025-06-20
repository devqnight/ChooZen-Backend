import { Hono } from 'jsr:@hono/hono';
import { SupabaseEnv } from 'honoInit';
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const app = new Hono<SupabaseEnv>().basePath("/watchable");

app.get('/genres', (c) => {
  try {
    const { data, error } = await c.var.supabase.from('genres').select('*')

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(String(err?.message ?? err), { status: 500 })
  }

});

app.post('/', async (c) => {
  try {
    const { watchable } = await c.req.json();
    const { error } = await c.var.supabase
      .from('watchable')
      .insert(watchable);

    if (error) {
      throw error
    }

    return new Response(`Hello ${name}!`)
  } catch (error) {
    return new Response(String(err?.message ?? err), { status: 500 })
  }
});

Deno.serve(app.fetch);
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/watchable' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
