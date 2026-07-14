import { defineField, defineType } from "sanity";
import { PATH_OPTIONS } from "./shared/pathOptions";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      description: "Optional. Overrides the default gold monogram in the header and footer when set.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandSuffix",
      title: "Brand Suffix",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headerNavLinks",
      title: "Header Nav Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "path",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: { list: PATH_OPTIONS },
            }),
          ],
          preview: { select: { title: "label", subtitle: "path" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "footerNavLinks",
      title: "Footer Nav Links (\"Maison\")",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "path",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: { list: PATH_OPTIONS },
            }),
          ],
          preview: { select: { title: "label", subtitle: "path" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer Blurb",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLocationTag",
      title: "Footer Location Tag",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "copyrightSuffix",
      title: "Copyright Suffix",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addressLines",
      title: "Address Lines",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "delivery",
      title: "Delivery Note",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phones",
      title: "Phone / WhatsApp Numbers",
      type: "array",
      of: [
        {
          type: "object",
          name: "phoneEntry",
          fields: [
            defineField({
              name: "channel",
              title: "Channel",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Watches", value: "watches" },
                  { title: "Perfumes", value: "perfumes" },
                  { title: "Eyewear", value: "eyewear" },
                ],
              },
            }),
            defineField({ name: "phone", title: "Phone (display)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "waNumber", title: "WhatsApp Number (digits only)", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "phone", subtitle: "channel" } },
        },
      ],
      validation: (Rule) => Rule.required().length(3).error("Exactly 3 phone lines are required (watches, perfumes, eyewear)"),
    }),
  ],
  preview: {
    select: { media: "logo" },
    prepare: ({ media }) => ({ title: "Site Settings", media }),
  },
});
