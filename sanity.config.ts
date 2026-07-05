import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "./src/lib/sanity";

const SINGLETON_TYPES = new Set(["siteSettings", "homepage"]);

export default defineConfig({
  name: "stylr",
  title: "Stylr Studio",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? prev.filter(({ action }) => action && !["duplicate", "delete"].includes(action))
        : prev,
  },
});
