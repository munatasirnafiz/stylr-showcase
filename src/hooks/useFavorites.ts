import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import type { FavoriteRow, ProductCategory } from "@/lib/supabase/types";
import { useAuth } from "./useAuth";

export function useFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as FavoriteRow[];
    },
  });
}

export function useFavoriteIds() {
  const { data } = useFavorites();
  return new Set((data ?? []).map((f) => f.product_id));
}

export function useToggleFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      productType,
      isFavorited,
    }: {
      productId: string;
      productType: ProductCategory;
      isFavorited: boolean;
    }) => {
      if (!user) {
        toast.error("Log in to save favorites.", {
          action: { label: "Log in", onClick: () => (window.location.href = "/login") },
        });
        throw new Error("not-authenticated");
      }

      if (isFavorited) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, product_id: productId, product_type: productType });
        if (error) throw error;
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast.success(variables.isFavorited ? "Removed from favorites." : "Saved to favorites.");
    },
    onError: (error) => {
      if ((error as Error).message !== "not-authenticated") {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
}
