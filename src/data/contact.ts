export type InquiryChannel = "watches" | "perfumes" | "eyewear";

export function buildInquiryLink(
  phones: { channel: InquiryChannel; waNumber: string }[],
  channel: InquiryChannel = "watches",
  productName?: string,
) {
  const entry = phones.find((p) => p.channel === channel);
  const number = entry?.waNumber ?? "";
  const msg = productName
    ? `Hello Stylr.store — I'd like to inquire about: ${productName}.`
    : `Hello Stylr.store — I'd like to start a private inquiry.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}
