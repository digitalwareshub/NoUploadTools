import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Text Diff Tool - Compare Text Side by Side Online | Free",
  description:
    "Compare two blocks of text and highlight differences instantly. Free online text diff tool with line-by-line and character-level comparison. No uploads required.",
  keywords: [
    "text diff tool online",
    "compare two texts free",
    "text comparison tool",
    "diff checker online",
    "find differences between files",
    "side by side text compare",
    "highlight text changes",
    "online diff checker free",
    "compare documents online",
    "code diff tool",
    "text difference finder",
    "compare text versions"
  ],
  alternates: {
    canonical: `${siteUrl}/text-diff`
  },
  openGraph: {
    url: `${siteUrl}/text-diff`,
    type: "website",
    title: "Text Diff Tool - Compare Text Side by Side Online | Free",
    description:
      "Compare two blocks of text and highlight differences instantly. Free online text diff tool with line-by-line comparison."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text Diff Tool",
  url: `${siteUrl}/text-diff`,
  description:
    "Compare two blocks of text side by side with highlighted differences. Line-by-line and character-level comparison.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Side-by-side text comparison",
    "Line-by-line diff highlighting",
    "Character-level diff option",
    "Case-sensitive toggle",
    "Unified and split view modes",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a text diff tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A text diff tool compares two blocks of text and highlights the differences between them. It shows additions, deletions, and changes, making it easy to see what has been modified between two versions of text."
      }
    },
    {
      "@type": "Question",
      name: "Is my text data uploaded to any server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, our text diff tool processes everything in your browser using JavaScript. Your text never leaves your device, ensuring complete privacy for sensitive documents."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between line-by-line and character-level diff?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Line-by-line diff compares entire lines and marks whole lines as added, removed, or changed. Character-level diff goes deeper, highlighting the specific characters that differ within each line for more precise comparison."
      }
    },
    {
      "@type": "Question",
      name: "When should I use a text comparison tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Text diff tools are useful for comparing code versions, reviewing document changes, checking contract revisions, verifying configuration file changes, comparing API responses, and finding differences in any text content."
      }
    },
    {
      "@type": "Question",
      name: "What do the colors in the diff output mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Green highlighting indicates text that was added (present in the second text but not the first). Red highlighting shows text that was removed (present in the first text but not the second). Yellow or gray may indicate unchanged context lines."
      }
    },
    {
      "@type": "Question",
      name: "Can I compare large text files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, since processing happens in your browser, you can compare large text files limited only by your device's memory. There are no server-imposed file size limits."
      }
    }
  ]
};

export default function TextDiffLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="text-diff-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="text-diff-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Text Diff" }
        ]}
      />
      {children}
    </>
  );
}
