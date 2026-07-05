import { defineField, defineType } from "sanity";
import { PATH_OPTIONS } from "./shared/pathOptions";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Carousel Slides",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({ name: "kicker", title: "Kicker", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "headingPrefix", title: "Heading Prefix", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "headingEmphasis", title: "Heading Emphasis (gold italic)", type: "string" }),
            defineField({ name: "headingSuffix", title: "Heading Suffix", type: "string" }),
            defineField({ name: "copy", title: "Copy", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "ctaLink",
              title: "CTA Link",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: { list: PATH_OPTIONS },
            }),
          ],
          preview: { select: { title: "headingPrefix", subtitle: "kicker", media: "image" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "trustPoints",
      title: "Trust Strip Points",
      type: "array",
      of: [
        {
          type: "object",
          name: "trustPoint",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (Rule) => Rule.required().length(3).error("Exactly 3 trust points are required"),
    }),
    defineField({
      name: "promoBanners",
      title: "Promo Banners",
      type: "array",
      of: [
        {
          type: "object",
          name: "promoBanner",
          fields: [
            defineField({ name: "kicker", title: "Kicker", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "headingPrefix", title: "Heading Prefix", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "headingEmphasis", title: "Heading Emphasis (italic)", type: "string" }),
            defineField({ name: "headingSuffix", title: "Heading Suffix", type: "string" }),
            defineField({ name: "paragraph", title: "Paragraph", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
            defineField({
              name: "imagePosition",
              title: "Image Position",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                ],
              },
            }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "ctaLink",
              title: "CTA Link",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: { list: PATH_OPTIONS },
            }),
          ],
          preview: { select: { title: "headingPrefix", subtitle: "kicker", media: "image" } },
        },
      ],
      validation: (Rule) => Rule.required().length(3).error("Exactly 3 promo banners are required"),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
