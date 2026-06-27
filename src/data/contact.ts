export const CONTACT = {
  address: "KAKOLI Apartment 562, Middle Monipur, Mirpur-2, Dhaka, Bangladesh",
  email: "concierge@stylr.store",
  concierge: {
    phone: "+880 1770 484702",
    wa: "https://wa.me/8801770484702",
    waNumber: "8801770484702",
  },
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

export function inquiryLink(channel: "concierge" | "watches" | "perfumes", productName?: string) {
  const number = CONTACT[channel].waNumber;
  const msg = productName
    ? `Hello Stylr.store — I'd like to inquire about: ${productName}.`
    : `Hello Stylr.store — I'd like to start a private inquiry.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}
