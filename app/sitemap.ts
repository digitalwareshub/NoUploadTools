import type { MetadataRoute } from "next";
import { tools, blogPosts } from "../lib/tools";

const baseUrl = "https://nouploadtools.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    { 
      url: baseUrl, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    { 
      url: `${baseUrl}/image-to-pdf`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    { 
      url: `${baseUrl}/directory/`, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    { 
      url: `${baseUrl}/privacy/`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    { 
      url: `${baseUrl}/terms/`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    { 
      url: `${baseUrl}/blog/`, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];

  const toolUrls: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${baseUrl}${t.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9
  }));

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  return [...staticUrls, ...toolUrls, ...blogUrls];
}
