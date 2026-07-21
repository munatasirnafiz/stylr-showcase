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

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [{ title: "Create an Account — Stylr.store" }],
  }),
  component: SignupPage,
});

const signupSchema = z
  .object({
    fullName: z.string().min(1, "Please enter your name."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

function SignupPage() {
  const router = useRouter();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignupValues) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { full_name: values.fullName } },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!data.session) {
      toast.success("Check your email to confirm your account before logging in.");
      router.navigate({ to: "/login" });
      return;
    }

    await router.invalidate();
    toast.success(`Welcome, ${values.fullName}.`);
    router.navigate({ to: "/account" });
  }

  return (
    <section className="mx-auto max-w-md px-6 py-24 lg:py-32">
      <SectionLabel>Create an Account</SectionLabel>
      <h1 className="font-serif text-4xl text-ink mt-6">Join Stylr.store</h1>
      <p className="mt-4 text-muted-ink">
        Save your favourites, track your inquiries, and keep your delivery details on hand.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Password</FormLabel>
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
                <FormLabel>Confirm password</FormLabel>
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
            {form.formState.isSubmitting ? "Creating account…" : "Create Account"}
          </Button>
        </form>
      </Form>

      <p className="mt-8 text-center text-sm text-muted-ink">
        Already have an account?{" "}
        <Link to="/login" className="text-gold-deep hover:underline">
          Log in
        </Link>
      </p>
    </section>
  );
}
