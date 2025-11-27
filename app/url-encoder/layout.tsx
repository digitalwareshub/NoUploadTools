import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "URL Encoder/Decoder - Encode URLs Online | Free Tool",
  description:
    "Encode and decode URLs and query parameters instantly. Free online URL encoder with parameter parsing and special character handling. No uploads required.",
  keywords: [
    "url encoder",
    "url decoder",
    "encode url online",
    "decode url online",
    "url encoding",
    "percent encoding",
    "query string encoder",
    "encodeURIComponent"
  ],
  alternates: {
    canonical: `${siteUrl}/url-encoder`
  },
  openGraph: {
    url: `${siteUrl}/url-encoder`,
    type: "website",
    title: "URL Encoder/Decoder - Encode URLs Online | Free Tool",
    description:
      "Encode and decode URLs and query parameters instantly. Free online tool with parameter parsing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "URL Encoder/Decoder",
  url: `${siteUrl}/url-encoder`,
  description:
    "Encode and decode URLs and query parameters with support for special characters.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "URL encoding (encodeURIComponent)",
    "URL decoding (decodeURIComponent)",
    "Full URL vs component encoding",
    "Query parameter parsing",
    "Special character handling",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is URL encoding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "URL encoding (also called percent encoding) converts special characters into a format that can be safely transmitted in URLs. Characters like spaces, &, ?, and = have special meanings in URLs, so they must be encoded as %20, %26, %3F, and %3D respectively."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between encodeURI and encodeURIComponent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "encodeURI is used for encoding complete URLs and preserves characters that are valid in URLs (like :, /, ?, #, &). encodeURIComponent is more aggressive and encodes all special characters, making it suitable for encoding query parameter values that might contain URL-special characters."
      }
    },
    {
      "@type": "Question",
      name: "When do I need to URL encode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You need URL encoding when: passing user input in URLs, including special characters in query parameters, building URLs programmatically, sending data via GET requests, or when a URL contains non-ASCII characters like accented letters or emojis."
      }
    },
    {
      "@type": "Question",
      name: "What characters need to be URL encoded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reserved characters that have special meaning in URLs need encoding: ! # $ & ' ( ) * + , / : ; = ? @ [ ]. Unsafe characters like spaces, < > { } | \\ ^ ` also need encoding. Any non-ASCII characters (like é, ñ, 中文) must be encoded."
      }
    },
    {
      "@type": "Question",
      name: "Why does my URL show %20 instead of spaces?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "%20 is the URL-encoded representation of a space character. URLs cannot contain literal spaces, so they are converted to %20 (or sometimes + in query strings). When decoded, %20 converts back to a space."
      }
    },
    {
      "@type": "Question",
      name: "Is my data secure when using this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all encoding and decoding happens entirely in your browser using JavaScript's built-in functions. Your URLs and data are never sent to any server, ensuring complete privacy for sensitive information."
      }
    }
  ]
};

export default function UrlEncoderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="url-encoder-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="url-encoder-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
