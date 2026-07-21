import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SectionLabel } from "@/components/ui-bits";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{ title: "Set a New Password — Stylr.store" }],
  }),
  component: ResetPasswordPage,
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordPage() {
  const router = useRouter();
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetPasswordValues) {
    const { error } = await supabase.auth.updateUser({ password: values.password });

    if (error) {
      toast.error(error.message);
      return;
    }

    await router.invalidate();
    toast.success("Password updated. You're logged in.");
    router.history.push("/account");
  }

  return (
    <section className="mx-auto max-w-md px-6 py-24 lg:py-32">
      <SectionLabel>Reset Password</SectionLabel>
      <h1 className="font-serif text-4xl text-ink mt-6">Set a new password</h1>
      <p className="mt-4 text-muted-ink">Choose a new password for your account.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-charcoal text-ivory hover:bg-ink rounded-none h-12 text-xs uppercase tracking-[0.22em]"
          >
            {form.formState.isSubmitting ? "Saving…" : "Save New Password"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
