import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabase/client";

export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: [{ title: "My Profile — Stylr.store" }],
  }),
  component: ProfilePage,
});

const profileSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  phone: z.string().optional(),
  preferredContactMethod: z.enum(["whatsapp", "call", "sms"]),
});

type ProfileValues = z.infer<typeof profileSchema>;

function ProfilePage() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "", phone: "", preferredContactMethod: "whatsapp" },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.full_name ?? "",
        phone: profile.phone ?? "",
        preferredContactMethod: profile.preferred_contact_method,
      });
    }
  }, [profile, form]);

  async function onSubmit(values: ProfileValues) {
    await updateProfile.mutateAsync({
      full_name: values.fullName,
      phone: values.phone ?? "",
      preferred_contact_method: values.preferredContactMethod,
    });
    toast.success("Profile updated.");
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    const path = `${user.id}/avatar.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast.error("Couldn't upload that image. Make sure the 'avatars' storage bucket exists.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", user.id);
    setUploading(false);
    toast.success("Avatar updated.");
    window.location.reload();
  }

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-md">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <div className="flex items-center gap-5 mb-10">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? ""} />
          <AvatarFallback className="text-lg">
            {(profile?.full_name ?? user?.email ?? "?").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-none"
          >
            {uploading ? "Uploading…" : "Change photo"}
          </Button>
          <p className="mt-2 text-xs text-muted-ink">{user?.email}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+880 1XXX XXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredContactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred contact method</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="call">Phone call</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-charcoal text-ivory hover:bg-ink rounded-none h-12 px-8 text-xs uppercase tracking-[0.22em]"
          >
            {form.formState.isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
