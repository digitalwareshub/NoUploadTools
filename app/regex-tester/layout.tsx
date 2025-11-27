import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online | Free Tool",
  description:
    "Test and debug regular expressions with real-time matching, highlighting, and explanations. Supports JavaScript regex with flags. No uploads required.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex online",
    "regex debugger",
    "regex validator",
    "test regex",
    "regex pattern tester",
    "javascript regex"
  ],
  alternates: {
    canonical: `${siteUrl}/regex-tester`
  },
  openGraph: {
    url: `${siteUrl}/regex-tester`,
    type: "website",
    title: "Regex Tester - Test Regular Expressions Online | Free Tool",
    description:
      "Test and debug regular expressions with real-time matching and highlighting."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Regex Tester",
  url: `${siteUrl}/regex-tester`,
  description:
    "Test and debug regular expressions with real-time matching, highlighting, and detailed match information.",
  applicationCategory: "DeveloperApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Real-time regex matching",
    "Match highlighting",
    "Capture group display",
    "JavaScript regex flags support",
    "Common regex patterns library",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What regex flavor does this tester use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tester uses JavaScript's native RegExp engine. It supports standard regex syntax including character classes, quantifiers, anchors, groups, lookahead, and lookbehind (in modern browsers)."
      }
    },
    {
      "@type": "Question",
      name: "What do the regex flags mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "g (global) finds all matches, not just the first. i (case-insensitive) ignores letter case. m (multiline) makes ^ and $ match line boundaries. s (dotall) makes . match newlines. u (unicode) enables full Unicode support."
      }
    },
    {
      "@type": "Question",
      name: "How do I match special characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Special characters like . * + ? ^ $ { } [ ] \\ | ( ) need to be escaped with a backslash. For example, to match a literal dot, use \\. instead of just a dot."
      }
    },
    {
      "@type": "Question",
      name: "What are capture groups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Capture groups are created with parentheses () and allow you to extract specific parts of a match. For example, (\\d{4})-(\\d{2})-(\\d{2}) captures year, month, and day separately from a date."
      }
    },
    {
      "@type": "Question",
      name: "Why isn't my regex matching anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common issues include: forgetting to escape special characters, missing the global flag for multiple matches, case sensitivity (try the i flag), or incorrect anchors (^ and $ in multiline text)."
      }
    },
    {
      "@type": "Question",
      name: "Is my data secure when using this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all regex testing happens entirely in your browser using JavaScript. Your patterns and test text are never sent to any server, ensuring complete privacy."
      }
    }
  ]
};

export default function RegexTesterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="regex-tester-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="regex-tester-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
