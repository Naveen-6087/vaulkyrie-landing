import type { MetadataRoute } from "next";
import { VAULKYRIE_LINKS } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: VAULKYRIE_LINKS.website,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
