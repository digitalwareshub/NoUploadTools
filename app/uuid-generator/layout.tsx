import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "UUID Generator - Generate Unique IDs Online | Free Tool",
  description:
    "Generate UUID v4 (random) unique identifiers instantly. Free online UUID generator with bulk generation and format options. No uploads required.",
  keywords: [
    "uuid generator",
    "guid generator",
    "unique id generator",
    "uuid v4",
    "random uuid",
    "bulk uuid generator",
    "online uuid generator",
    "free uuid tool"
  ],
  alternates: {
    canonical: `${siteUrl}/uuid-generator`
  },
  openGraph: {
    url: `${siteUrl}/uuid-generator`,
    type: "website",
    title: "UUID Generator - Generate Unique IDs Online | Free Tool",
    description:
      "Generate UUID v4 unique identifiers instantly. Free online generator with bulk options."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID Generator",
  url: `${siteUrl}/uuid-generator`,
  description:
    "Generate UUID v4 (random) unique identifiers with bulk generation and format options.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "UUID v4 (random) generation",
    "Bulk generation up to 100 UUIDs",
    "Uppercase/lowercase toggle",
    "With/without hyphens option",
    "Copy individual or all UUIDs",
    "100% client-side using Web Crypto API"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a UUID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UUID (Universally Unique Identifier) is a 128-bit identifier standard used to uniquely identify information. Also known as GUID (Globally Unique Identifier), UUIDs are designed to be unique across all devices and time without requiring a central authority."
      }
    },
    {
      "@type": "Question",
      name: "What is UUID v4?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UUID v4 is a randomly generated UUID. It uses random or pseudo-random numbers to generate the identifier, with certain bits set to indicate the version (4) and variant. UUID v4 has 122 random bits, providing approximately 5.3×10^36 unique combinations."
      }
    },
    {
      "@type": "Question",
      name: "Are these UUIDs truly random and secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our generator uses the Web Crypto API (crypto.getRandomValues) which provides cryptographically strong random values. This is the same API used for security-critical applications in browsers."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between UUID and GUID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UUID and GUID are essentially the same thing. UUID is the term used in most standards and Unix/Linux systems, while GUID (Globally Unique Identifier) is the term Microsoft uses. Both follow the same specification and format."
      }
    },
    {
      "@type": "Question",
      name: "Can I generate UUIDs without hyphens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our generator includes an option to remove hyphens from the generated UUIDs. The standard format includes hyphens (e.g., 550e8400-e29b-41d4-a716-446655440000), but some systems prefer the compact format without them."
      }
    },
    {
      "@type": "Question",
      name: "Are my generated UUIDs stored or tracked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all UUID generation happens entirely in your browser using JavaScript and the Web Crypto API. No data is sent to any server, and we don't store or track the UUIDs you generate."
      }
    }
  ]
};

export default function UuidGeneratorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="uuid-generator-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="uuid-generator-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "UUID Generator" }
        ]}
      />
      {children}
    </>
  );
}
