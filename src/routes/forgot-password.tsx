import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Reset Password — Stylr.store" }],
  }),
  component: ForgotPasswordPage,
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <section className="mx-auto max-w-md px-6 py-24 lg:py-32">
      <SectionLabel>Reset Password</SectionLabel>
      <h1 className="font-serif text-4xl text-ink mt-6">Forgot your password?</h1>
      <p className="mt-4 text-muted-ink">
        Enter your email and we'll send you a link to reset your password.
      </p>

      {sent ? (
        <p className="mt-10 text-ink">
          If an account exists for that email, a reset link is on its way. Check your inbox.
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
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
              {form.formState.isSubmitting ? "Sending…" : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      )}

      <p className="mt-8 text-center text-sm text-muted-ink">
        <Link to="/login" className="text-gold-deep hover:underline">
          Back to log in
        </Link>
      </p>
    </section>
  );
}
