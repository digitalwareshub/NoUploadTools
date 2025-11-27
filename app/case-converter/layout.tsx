import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Case Converter - Convert Text Case Online Free",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and more. All processing happens locally in your browser.",
  keywords: [
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "title case",
    "sentence case",
    "text case changer",
    "convert text case",
    "capitalize text"
  ],
  alternates: {
    canonical: `${siteUrl}/case-converter`
  },
  openGraph: {
    url: `${siteUrl}/case-converter`,
    type: "website",
    title: "Case Converter - Change Text Case Free",
    description: "Convert text case locally in your browser."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Converter",
  url: `${siteUrl}/case-converter`,
  description: "Convert text between different cases without uploading",
  applicationCategory: "UtilitiesApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "UPPERCASE conversion",
    "lowercase conversion",
    "Title Case",
    "Sentence case",
    "camelCase and more"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What case options are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer UPPERCASE, lowercase, Title Case (capitalize each word), Sentence case (capitalize first letter), camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between Title Case and Sentence case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title Case capitalizes the first letter of every word (like book titles). Sentence case only capitalizes the first letter of each sentence (like normal writing)."
      }
    },
    {
      "@type": "Question",
      name: "What are camelCase and PascalCase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are programming naming conventions. camelCase starts lowercase with each new word capitalized (firstName). PascalCase is the same but starts uppercase (FirstName)."
      }
    },
    {
      "@type": "Question",
      name: "Is my text sent to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All conversion happens instantly in your browser using JavaScript. Your text never leaves your device."
      }
    },
    {
      "@type": "Question",
      name: "Does it work with special characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Special characters, numbers, and punctuation are preserved. Only letters are affected by case conversion. Works with accented characters too."
      }
    },
    {
      "@type": "Question",
      name: "Can I convert programming variable names?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Use snake_case for Python, camelCase for JavaScript, PascalCase for classes, and CONSTANT_CASE for constants. Great for refactoring code."
      }
    }
  ]
};

export default function CaseConverterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="case-converter-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="case-converter-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
