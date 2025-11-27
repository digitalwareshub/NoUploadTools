import type { MetadataRoute } from "next";
import { tools, blogPosts } from "../lib/tools";

const baseUrl = "https://nouploadtools.com";

// Content modification dates for accurate lastmod values
// These should be updated when content actually changes
const contentDates = {
  homepage: "2024-11-25",
  imageToPdf: "2024-11-25",
  pdfToImage: "2024-11-27",
  compressPdf: "2024-11-28",
  mergePdf: "2024-11-28",
  passwordGenerator: "2024-11-28",
  directory: "2024-11-25",
  privacy: "2024-11-20",
  terms: "2024-11-20",
  blog: "2024-11-26"
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages - no trailing slashes for consistency
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(contentDates.homepage),
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: new Date(contentDates.directory),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(contentDates.privacy),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(contentDates.terms),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(contentDates.blog),
      changeFrequency: "weekly",
      priority: 0.9
    }
  ];

  // Only include live tools in sitemap (filter out "coming soon" pages)
  // This prevents thin content issues with Bing
  const toolUrls: MetadataRoute.Sitemap = tools
    .filter((t) => t.status === "live")
    .map((t) => {
      // Determine last modified date based on tool
      let lastMod = contentDates.homepage;
      if (t.slug === "image-to-pdf") {
        lastMod = contentDates.imageToPdf;
      } else if (t.slug === "pdf-to-image") {
        lastMod = contentDates.pdfToImage;
      } else if (t.slug === "compress-pdf") {
        lastMod = contentDates.compressPdf;
      } else if (t.slug === "merge-pdf") {
        lastMod = contentDates.mergePdf;
      } else if (t.slug === "password-generator") {
        lastMod = contentDates.passwordGenerator;
      }

      return {
        url: `${baseUrl}${t.path}`,
        lastModified: new Date(lastMod),
        changeFrequency: "monthly" as const,
        priority: 0.9
      };
    });

  // Blog URLs - no trailing slashes for consistency
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(contentDates.blog),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [...staticUrls, ...toolUrls, ...blogUrls];
}
