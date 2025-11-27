import type { MetadataRoute } from "next";
import { tools, blogPosts } from "../lib/tools";

const baseUrl = "https://nouploadtools.com";

// Content modification dates for accurate lastmod values
// These should be updated when content actually changes
const contentDates = {
  homepage: "2025-11-27",
  imageToPdf: "2024-11-25",
  pdfToImage: "2024-11-27",
  compressPdf: "2024-11-28",
  mergePdf: "2024-11-28",
  passwordGenerator: "2024-11-28",
  // New tools added Nov 28, 2024
  metadataRemover: "2024-11-28",
  imageCompressor: "2024-11-28",
  qrGenerator: "2024-11-28",
  base64Encoder: "2024-11-28",
  hashGenerator: "2024-11-28",
  jsonFormatter: "2024-11-28",
  wordCounter: "2024-11-28",
  caseConverter: "2024-11-28",
  // Developer tools added Nov 2024
  textDiff: "2024-11-28",
  loremIpsum: "2024-11-28",
  markdownEditor: "2024-11-28",
  colorPicker: "2024-11-28",
  uuidGenerator: "2024-11-28",
  urlEncoder: "2024-11-28",
  // Batch 2 & 3 tools added Nov 27, 2025
  fileEncryptor: "2025-11-27",
  securePasswordChecker: "2025-11-27",
  textEncryptor: "2025-11-27",
  csvConverter: "2025-11-27",
  regexTester: "2025-11-27",
  htmlEntityEncoder: "2025-11-27",
  imageFormatConverter: "2025-11-27",
  codeBeautifier: "2025-11-27",
  faviconGenerator: "2025-11-27",
  unitConverter: "2025-11-27",
  timerStopwatch: "2025-11-27",
  svgOptimizer: "2025-11-27",
  directory: "2025-11-27",
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

      // Original tools
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
      // New tools added Nov 28
      else if (t.slug === "metadata-remover") {
        lastMod = contentDates.metadataRemover;
      } else if (t.slug === "image-compressor") {
        lastMod = contentDates.imageCompressor;
      } else if (t.slug === "qr-generator") {
        lastMod = contentDates.qrGenerator;
      } else if (t.slug === "base64-encoder") {
        lastMod = contentDates.base64Encoder;
      } else if (t.slug === "hash-generator") {
        lastMod = contentDates.hashGenerator;
      } else if (t.slug === "json-formatter") {
        lastMod = contentDates.jsonFormatter;
      } else if (t.slug === "word-counter") {
        lastMod = contentDates.wordCounter;
      } else if (t.slug === "case-converter") {
        lastMod = contentDates.caseConverter;
      }
      // Developer tools batch
      else if (t.slug === "text-diff") {
        lastMod = contentDates.textDiff;
      } else if (t.slug === "lorem-ipsum") {
        lastMod = contentDates.loremIpsum;
      } else if (t.slug === "markdown-editor") {
        lastMod = contentDates.markdownEditor;
      } else if (t.slug === "color-picker") {
        lastMod = contentDates.colorPicker;
      } else if (t.slug === "uuid-generator") {
        lastMod = contentDates.uuidGenerator;
      } else if (t.slug === "url-encoder") {
        lastMod = contentDates.urlEncoder;
      }
      // Final batch tools Nov 27, 2025
      else if (t.slug === "file-encryptor") {
        lastMod = contentDates.fileEncryptor;
      } else if (t.slug === "secure-password-checker") {
        lastMod = contentDates.securePasswordChecker;
      } else if (t.slug === "text-encryptor") {
        lastMod = contentDates.textEncryptor;
      } else if (t.slug === "csv-converter") {
        lastMod = contentDates.csvConverter;
      } else if (t.slug === "regex-tester") {
        lastMod = contentDates.regexTester;
      } else if (t.slug === "html-entity-encoder") {
        lastMod = contentDates.htmlEntityEncoder;
      } else if (t.slug === "image-format-converter") {
        lastMod = contentDates.imageFormatConverter;
      } else if (t.slug === "code-beautifier") {
        lastMod = contentDates.codeBeautifier;
      } else if (t.slug === "favicon-generator") {
        lastMod = contentDates.faviconGenerator;
      } else if (t.slug === "unit-converter") {
        lastMod = contentDates.unitConverter;
      } else if (t.slug === "timer-stopwatch") {
        lastMod = contentDates.timerStopwatch;
      } else if (t.slug === "svg-optimizer") {
        lastMod = contentDates.svgOptimizer;
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
