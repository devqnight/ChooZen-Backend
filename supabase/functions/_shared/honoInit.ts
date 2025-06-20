type Env = { Bindings: Bindings; Variables: Variables };

export type SupabaseEnv = {
  Variables: {
    supabase: SupabaseClient;
  };
};