import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
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

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [{ title: "Log In — Stylr.store" }],
  }),
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
  const { redirect } = Route.useSearch();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      toast.error(error.message);
      return;
    }

    await router.invalidate();
    router.history.push(redirect ?? "/account");
  }

  return (
    <section className="mx-auto max-w-md px-6 py-24 lg:py-32">
      <SectionLabel>Welcome Back</SectionLabel>
      <h1 className="font-serif text-4xl text-ink mt-6">Log In</h1>
      <p className="mt-4 text-muted-ink">
        Access your favourites, inquiries, and delivery details.
      </p>

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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link to="/forgot-password" className="text-xs text-gold-deep hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
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
            {form.formState.isSubmitting ? "Logging in…" : "Log In"}
          </Button>
        </form>
      </Form>

      <p className="mt-8 text-center text-sm text-muted-ink">
        Don't have an account?{" "}
        <Link to="/signup" className="text-gold-deep hover:underline">
          Create one
        </Link>
      </p>
    </section>
  );
}
