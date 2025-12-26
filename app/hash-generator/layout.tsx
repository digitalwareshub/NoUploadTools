import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online Free",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-512 hashes for text and files. Verify file integrity. All processing happens locally in your browser.",
  keywords: [
    "hash generator online free",
    "md5 hash generator",
    "sha256 hash calculator",
    "sha512 hash online",
    "file checksum calculator",
    "generate hash from text",
    "verify file checksum online",
    "md5 checksum generator",
    "sha256 file hash",
    "how to check file hash",
    "hash calculator no upload",
    "compare file checksums"
  ],
  alternates: {
    canonical: `${siteUrl}/hash-generator`
  },
  openGraph: {
    url: `${siteUrl}/hash-generator`,
    type: "website",
    title: "Hash Generator - MD5, SHA-256, SHA-512 Online",
    description: "Generate hashes for text and files locally in your browser."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hash Generator",
  url: `${siteUrl}/hash-generator`,
  description: "Generate cryptographic hashes without uploading data",
  applicationCategory: "DeveloperApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "MD5, SHA-1, SHA-256, SHA-512 hashes",
    "Hash text or files",
    "Verify file checksums",
    "One-click copy",
    "Uses Web Crypto API"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a hash?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hash is a fixed-size string generated from input data. The same input always produces the same hash, but even tiny changes create completely different hashes. It's used to verify data integrity."
      }
    },
    {
      "@type": "Question",
      name: "Which hash algorithm should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SHA-256 is recommended for most purposes. MD5 and SHA-1 are faster but have known vulnerabilities. SHA-512 offers more security but produces longer hashes."
      }
    },
    {
      "@type": "Question",
      name: "Can I verify downloaded files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Drop or select a file to generate its hash, then compare it to the hash provided by the download source. If they match, the file wasn't corrupted or tampered with."
      }
    },
    {
      "@type": "Question",
      name: "Is hashing the same as encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Hashing is one-way - you can't reverse a hash to get the original data. Encryption is two-way - encrypted data can be decrypted with the right key."
      }
    },
    {
      "@type": "Question",
      name: "Are my files uploaded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All hashing happens locally using the Web Crypto API. Your files never leave your device. This is crucial for verifying sensitive files privately."
      }
    },
    {
      "@type": "Question",
      name: "Why do different tools give different MD5 hashes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The hash depends on the exact bytes. Different line endings (Windows vs Unix), character encodings, or trailing whitespace can cause different hashes for seemingly identical text."
      }
    }
  ]
};

export default function HashGeneratorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="hash-generator-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="hash-generator-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Hash Generator" }
        ]}
      />
      {children}
    </>
  );
}
