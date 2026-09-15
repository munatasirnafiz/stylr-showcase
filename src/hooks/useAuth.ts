import { useEffect } from "react";
import { useRouter, useRouteContext } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export function useAuth(): { user: User | null } {
  const router = useRouter();
  const { user } = useRouteContext({ from: "__root__" }) as { user: User | null };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
        router.invalidate();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [router]);

  return { user };
}
