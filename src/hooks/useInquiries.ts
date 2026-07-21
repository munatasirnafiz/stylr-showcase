import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { InquiryRow, ProductCategory } from "@/lib/supabase/types";
import { useAuth } from "./useAuth";

export function useInquiries() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["inquiries", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as InquiryRow[];
    },
  });
}

export interface LogInquiryInput {
  productId?: string;
  productType?: ProductCategory;
  productName: string;
  channel: "watches" | "perfumes" | "eyewear";
}

export function useLogInquiry() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogInquiryInput) => {
      if (!user) return;
      const { error } = await supabase.from("inquiries").insert({
        user_id: user.id,
        product_id: input.productId ?? null,
        product_type: input.productType ?? null,
        product_name: input.productName,
        channel: input.channel,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries", user?.id] });
    },
  });
}
