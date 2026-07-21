import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import type { DeliveryAddressRow } from "@/lib/supabase/types";
import { useAuth } from "./useAuth";

export function useDeliveryAddresses() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["delivery-addresses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("delivery_addresses")
        .select("*")
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DeliveryAddressRow[];
    },
  });
}

export type DeliveryAddressInput = Omit<
  DeliveryAddressRow,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export function useSaveDeliveryAddress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: DeliveryAddressInput & { id?: string }) => {
      if (id) {
        const { error } = await supabase.from("delivery_addresses").update(input).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("delivery_addresses")
          .insert({ ...input, user_id: user!.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-addresses", user?.id] });
      toast.success("Delivery address saved.");
    },
    onError: () => toast.error("Couldn't save that address. Please try again."),
  });
}

export function useDeleteDeliveryAddress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("delivery_addresses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-addresses", user?.id] });
      toast.success("Address removed.");
    },
    onError: () => toast.error("Couldn't remove that address. Please try again."),
  });
}
