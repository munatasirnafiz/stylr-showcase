import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeliveryAddresses,
  useSaveDeliveryAddress,
  useDeleteDeliveryAddress,
} from "@/hooks/useDeliveryAddresses";
import type { DeliveryAddressRow } from "@/lib/supabase/types";

export const Route = createFileRoute("/account/delivery")({
  head: () => ({
    meta: [{ title: "Delivery Details — Stylr.store" }],
  }),
  component: DeliveryPage,
});

const addressSchema = z.object({
  label: z.string().min(1, "Give this address a label."),
  recipient_name: z.string().min(1, "Enter a recipient name."),
  phone: z.string().min(1, "Enter a phone number."),
  area: z.string().optional(),
  address_line1: z.string().min(1, "Enter an address."),
  address_line2: z.string().optional(),
  city: z.string().min(1, "Enter a city."),
  notes: z.string().optional(),
  is_default: z.boolean(),
});

type AddressValues = z.infer<typeof addressSchema>;

const emptyValues: AddressValues = {
  label: "Home",
  recipient_name: "",
  phone: "",
  area: "",
  address_line1: "",
  address_line2: "",
  city: "Dhaka",
  notes: "",
  is_default: false,
};

function AddressDialog({
  address,
  trigger,
}: {
  address?: DeliveryAddressRow;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const saveAddress = useSaveDeliveryAddress();
  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: address
      ? {
          label: address.label,
          recipient_name: address.recipient_name,
          phone: address.phone,
          area: address.area ?? "",
          address_line1: address.address_line1,
          address_line2: address.address_line2 ?? "",
          city: address.city,
          notes: address.notes ?? "",
          is_default: address.is_default,
        }
      : emptyValues,
  });

  async function onSubmit(values: AddressValues) {
    await saveAddress.mutateAsync({
      id: address?.id,
      ...values,
      area: values.area || null,
      address_line2: values.address_line2 || null,
      notes: values.notes || null,
    });
    setOpen(false);
    form.reset(emptyValues);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {address ? "Edit delivery address" : "Add a delivery address"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Home, Office…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipient_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="address_line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address line 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address_line2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address line 2 (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Mirpur-2…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_default"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="!mt-0">Set as default address</FormLabel>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-charcoal text-ivory hover:bg-ink rounded-none h-12 text-xs uppercase tracking-[0.22em]"
            >
              {form.formState.isSubmitting ? "Saving…" : "Save Address"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function DeliveryPage() {
  const { data: addresses, isLoading } = useDeliveryAddresses();
  const deleteAddress = useDeleteDeliveryAddress();

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex justify-end mb-6">
        <AddressDialog
          trigger={
            <Button variant="outline" className="rounded-none gap-2">
              <Plus size={16} /> Add Address
            </Button>
          }
        />
      </div>

      {!addresses?.length ? (
        <div className="text-center py-16">
          <p className="kicker">No addresses saved</p>
          <h3 className="font-serif text-2xl text-ink mt-4">Add a delivery address.</h3>
          <p className="mt-3 text-muted-ink">Save your details for faster private delivery.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="card-lux p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="eyebrow text-gold-deep">{address.label}</span>
                    {address.is_default && (
                      <span className="eyebrow text-muted-ink">· Default</span>
                    )}
                  </div>
                  <p className="font-serif text-lg text-ink mt-2">{address.recipient_name}</p>
                  <p className="text-sm text-muted-ink mt-1">{address.phone}</p>
                  <p className="text-sm text-muted-ink mt-2 leading-relaxed">
                    {address.address_line1}
                    {address.address_line2 ? `, ${address.address_line2}` : ""}
                    {address.area ? `, ${address.area}` : ""}, {address.city}
                  </p>
                  {address.notes && (
                    <p className="text-xs text-muted-ink mt-2 italic">{address.notes}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <AddressDialog
                    address={address}
                    trigger={
                      <Button variant="ghost" size="icon" aria-label="Edit address">
                        <Pencil size={16} />
                      </Button>
                    }
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Delete address">
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove this address?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This can't be undone. You can add a new address at any time.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteAddress.mutate(address.id)}>
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
