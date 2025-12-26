import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Pretty Print JSON Online Free",
  description:
    "Format, validate, and beautify JSON data. Minify JSON for production. All processing happens locally in your browser - no data sent to servers.",
  keywords: [
    "json formatter online free",
    "json validator and formatter",
    "pretty print json online",
    "json beautifier tool",
    "minify json online",
    "format json with indentation",
    "json syntax checker",
    "how to format json",
    "json viewer online",
    "validate json api response",
    "json lint alternative",
    "fix json format errors"
  ],
  alternates: {
    canonical: `${siteUrl}/json-formatter`
  },
  openGraph: {
    url: `${siteUrl}/json-formatter`,
    type: "website",
    title: "JSON Formatter & Validator - Pretty Print Online",
    description: "Format and validate JSON locally in your browser. No uploads."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Formatter",
  url: `${siteUrl}/json-formatter`,
  description: "Format and validate JSON without uploading data",
  applicationCategory: "DeveloperApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Pretty print JSON",
    "Validate JSON syntax",
    "Minify JSON",
    "Syntax highlighting",
    "Error location display"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is JSON formatting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSON formatting adds proper indentation and line breaks to make JSON data human-readable. Minified JSON removes all whitespace for smaller file size."
      }
    },
    {
      "@type": "Question",
      name: "How do I validate JSON?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your JSON and click Format. If there's an error, we'll show you exactly where it is. Common issues include missing commas, unquoted keys, or trailing commas."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between format and minify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Format adds whitespace for readability. Minify removes all unnecessary whitespace for the smallest possible size - useful for APIs and production."
      }
    },
    {
      "@type": "Question",
      name: "Is my JSON data sent to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All processing uses built-in browser JavaScript (JSON.parse/stringify). Your data stays in your browser. Safe for sensitive API responses or configs."
      }
    },
    {
      "@type": "Question",
      name: "Can I format large JSON files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but very large files may be slow. Browser memory limits apply. For files over 10MB, consider using a desktop tool instead."
      }
    },
    {
      "@type": "Question",
      name: "Why does my JSON have errors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common issues: trailing commas (not allowed in JSON), single quotes (must use double), unquoted keys, or missing commas between items. Our error messages show the exact location."
      }
    }
  ]
};

export default function JsonFormatterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="json-formatter-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="json-formatter-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "JSON Formatter" }
        ]}
      />
      {children}
    </>
  );
}
