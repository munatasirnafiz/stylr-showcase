import type { StructureResolver } from "sanity/structure";

const SINGLETON_IDS = new Set(["siteSettings", "homepage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETON_IDS.has(item.getId() ?? "")),
    ]);
