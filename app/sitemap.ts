import type { MetadataRoute } from "next";
import { tools, blogPosts } from "../lib/tools";

const baseUrl = "https://nouploadtools.com";

// Content modification dates for accurate lastmod values
// These should be updated when content actually changes
// Updated Dec 26, 2024: Added long-tail SEO keywords to all tools
const contentDates = {
  homepage: "2024-12-26",
  imageToPdf: "2024-12-26",
  pdfToImage: "2024-12-26",
  compressPdf: "2024-12-26",
  mergePdf: "2024-12-26",
  passwordGenerator: "2024-12-26",
  // Tools with SEO keywords updated Dec 26, 2024
  metadataRemover: "2024-12-26",
  imageCompressor: "2024-12-26",
  qrGenerator: "2024-12-26",
  base64Encoder: "2024-12-26",
  hashGenerator: "2024-12-26",
  jsonFormatter: "2024-12-26",
  wordCounter: "2024-12-26",
  caseConverter: "2024-12-26",
  textDiff: "2024-12-26",
  loremIpsum: "2024-12-26",
  markdownEditor: "2024-12-26",
  colorPicker: "2024-12-26",
  uuidGenerator: "2024-12-26",
  urlEncoder: "2024-12-26",
  fileEncryptor: "2024-12-26",
  securePasswordChecker: "2024-12-26",
  textEncryptor: "2024-12-26",
  csvConverter: "2024-12-26",
  regexTester: "2024-12-26",
  htmlEntityEncoder: "2024-12-26",
  imageFormatConverter: "2024-12-26",
  codeBeautifier: "2024-12-26",
  faviconGenerator: "2024-12-26",
  unitConverter: "2024-12-26",
  timerStopwatch: "2024-12-26",
  svgOptimizer: "2024-12-26",
  // New high-volume SEO tools added Dec 26, 2024
  pngToJpg: "2024-12-26",
  webpToPng: "2024-12-26",
  imageResizer: "2024-12-26",
  heicToJpg: "2024-12-26",
  exifRemover: "2024-12-26",
  svgToPng: "2024-12-26",
  jwtDecoder: "2024-12-26",
  directory: "2024-12-26",
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
      // New tools added Nov 28 (Batch 2)
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
      // Final batch tools Nov 28, 2025
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
      // New high-volume SEO tools Dec 26, 2024
      else if (t.slug === "png-to-jpg") {
        lastMod = contentDates.pngToJpg;
      } else if (t.slug === "webp-to-png") {
        lastMod = contentDates.webpToPng;
      } else if (t.slug === "image-resizer") {
        lastMod = contentDates.imageResizer;
      } else if (t.slug === "heic-to-jpg") {
        lastMod = contentDates.heicToJpg;
      } else if (t.slug === "exif-remover") {
        lastMod = contentDates.exifRemover;
      } else if (t.slug === "svg-to-png") {
        lastMod = contentDates.svgToPng;
      } else if (t.slug === "jwt-decoder") {
        lastMod = contentDates.jwtDecoder;
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
