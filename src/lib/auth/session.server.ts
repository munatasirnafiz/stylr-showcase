import { createServerFn } from "@tanstack/react-start";
import { getServerSupabase } from "@/lib/supabase/server";

export const getUserFn = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getServerSupabase();
  const { data } = await supabase.auth.getUser();
  return { user: data.user };
});
