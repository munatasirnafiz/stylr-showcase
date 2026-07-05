import { defineField, defineType } from "sanity";

export const perfume = defineType({
  name: "perfume",
  title: "Perfume",
  type: "document",
  fields: [
    defineField({
      name: "catalogueNumber",
      title: "Catalogue Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specs",
      title: "Specs",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().length(3).error("Exactly 3 spec lines are required"),
    }),
    defineField({
      name: "price",
      title: "Price (BDT)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "brand",
      media: "image",
    },
  },
});
