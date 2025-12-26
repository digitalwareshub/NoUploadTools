import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Word Counter - Count Words, Characters, Sentences Online Free",
  description:
    "Count words, characters, sentences, and paragraphs in your text. Check reading time. All processing happens locally in your browser.",
  keywords: [
    "word counter online free",
    "character counter tool",
    "count words in text",
    "word count checker",
    "sentence counter online",
    "reading time calculator",
    "how many words in my text",
    "text length counter",
    "word counter for essay",
    "character count with spaces",
    "paragraph counter online",
    "free word count tool"
  ],
  alternates: {
    canonical: `${siteUrl}/word-counter`
  },
  openGraph: {
    url: `${siteUrl}/word-counter`,
    type: "website",
    title: "Word Counter - Count Words & Characters Free",
    description: "Count words, characters, and sentences locally."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  url: `${siteUrl}/word-counter`,
  description: "Count words and characters without uploading text",
  applicationCategory: "UtilitiesApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Word count",
    "Character count (with/without spaces)",
    "Sentence and paragraph count",
    "Reading time estimate",
    "Real-time counting"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are words counted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Words are counted by splitting text on whitespace. Hyphenated words count as one word. Numbers count as words. Empty strings between multiple spaces are not counted."
      }
    },
    {
      "@type": "Question",
      name: "How is reading time calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use an average reading speed of 200-250 words per minute. Actual reading time varies based on content complexity and the reader."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between character counts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "'Characters' counts every character including spaces. 'Characters (no spaces)' excludes spaces. Some platforms (like Twitter) count characters differently."
      }
    },
    {
      "@type": "Question",
      name: "Is my text sent to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All counting happens instantly in your browser using JavaScript. Your text never leaves your device. Safe for confidential documents."
      }
    },
    {
      "@type": "Question",
      name: "Does it work with different languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Character counting works for any language. Word counting works best for space-separated languages. CJK languages without spaces may need different counting methods."
      }
    },
    {
      "@type": "Question",
      name: "Why do word counts differ from Microsoft Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Different tools count words slightly differently. Variations come from how hyphenated words, numbers, and special characters are handled. Differences are usually minor."
      }
    }
  ]
};

export default function WordCounterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="word-counter-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="word-counter-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Word Counter" }
        ]}
      />
      {children}
    </>
  );
}
