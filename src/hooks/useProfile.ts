import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { PreferredContactMethod, ProfileRow } from "@/lib/supabase/types";
import { useAuth } from "./useAuth";

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data as ProfileRow;
    },
  });
}

export interface ProfileUpdate {
  full_name: string;
  phone: string;
  preferred_contact_method: PreferredContactMethod;
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (update: ProfileUpdate) => {
      const { error } = await supabase.from("profiles").update(update).eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}
