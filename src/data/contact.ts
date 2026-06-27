export const CONTACT = {
  address: "KAKOLI Apartment 562, Middle Monipur, Mirpur-2, Dhaka, Bangladesh",
  email: "hello@stylr.store",
  delivery: "Bangladesh wide — cash on delivery available in Dhaka.",
  watches: {
    phone: "+880 1711 885606",
    wa: "https://wa.me/8801711885606",
    waNumber: "8801711885606",
  },
  perfumes: {
    phone: "+880 1521 430196",
    wa: "https://wa.me/8801521430196",
    waNumber: "8801521430196",
  },
} as const;

export type InquiryChannel = "watches" | "perfumes";

export function inquiryLink(channel: InquiryChannel = "watches", productName?: string) {
  const number = CONTACT[channel].waNumber;
  const msg = productName
    ? `Hello Stylr.store — I'd like to inquire about: ${productName}.`
    : `Hello Stylr.store — I'd like to start a private inquiry.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}
