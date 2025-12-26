import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder - Encode & Decode Base64 Online Free",
  description:
    "Encode text to Base64 or decode Base64 back to text. Convert files to Base64 data URLs. All processing happens locally in your browser.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "encode base64",
    "decode base64",
    "base64 converter",
    "text to base64",
    "base64 to text",
    "base64 online"
  ],
  alternates: {
    canonical: `${siteUrl}/base64-encoder`
  },
  openGraph: {
    url: `${siteUrl}/base64-encoder`,
    type: "website",
    title: "Base64 Encoder/Decoder - Free Online Tool",
    description: "Encode and decode Base64 locally in your browser."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Base64 Encoder/Decoder",
  url: `${siteUrl}/base64-encoder`,
  description: "Encode and decode Base64 without uploading data",
  applicationCategory: "DeveloperApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Encode text to Base64",
    "Decode Base64 to text",
    "File to Base64 conversion",
    "One-click copy",
    "Works offline"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Base64 encoding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 is a way to represent binary data using only printable ASCII characters. It's commonly used to embed images in HTML/CSS, transmit data in URLs, and encode email attachments."
      }
    },
    {
      "@type": "Question",
      name: "Why does Base64 increase file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 uses 4 characters to represent every 3 bytes of data, resulting in about 33% size increase. This is the trade-off for being able to represent binary data as text."
      }
    },
    {
      "@type": "Question",
      name: "Is Base64 encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Base64 is encoding, not encryption. Anyone can decode Base64 data. It's meant for data transport compatibility, not security. Don't use it to hide sensitive information."
      }
    },
    {
      "@type": "Question",
      name: "Can I encode files to Base64?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can drag and drop or select any file to convert it to a Base64 data URL. This is useful for embedding small images directly in HTML or CSS."
      }
    },
    {
      "@type": "Question",
      name: "Is my data sent to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All encoding and decoding happens locally in your browser using built-in JavaScript functions. Your data never leaves your device."
      }
    },
    {
      "@type": "Question",
      name: "What's a Base64 data URL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A data URL includes the Base64 data along with the MIME type, like 'data:image/png;base64,...'. This can be used directly as an image src in HTML."
      }
    }
  ]
};

export default function Base64EncoderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="base64-encoder-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="base64-encoder-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Base64 Encoder" }
        ]}
      />
      {children}
    </>
  );
}
