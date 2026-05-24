import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: "https://umrahthailand.com/sitemap.xml",
    host: "https://umrahthailand.com",
  };
}
