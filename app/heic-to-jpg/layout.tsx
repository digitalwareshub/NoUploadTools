import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter - Free Online Tool | No Upload Required",
  description:
    "Convert iPhone HEIC photos to JPG format instantly in your browser. No file uploads, 100% private. Works with iOS photos offline.",
  keywords: [
    "heic to jpg converter free",
    "convert heic to jpg online",
    "how to open heic file on windows",
    "iphone photo to jpg converter",
    "heic to jpeg no upload",
    "convert apple photos to jpg",
    "heic file converter free",
    "open heic on pc",
    "heic to jpg without software",
    "batch heic to jpg converter",
    "ios photo format converter",
    "heic not opening fix"
  ],
  alternates: {
    canonical: `${siteUrl}/heic-to-jpg`
  },
  openGraph: {
    url: `${siteUrl}/heic-to-jpg`,
    type: "website",
    title: "HEIC to JPG Converter - Free Online Tool | No Upload Required",
    description:
      "Convert iPhone HEIC photos to JPG format instantly in your browser. No file uploads, 100% private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HEIC to JPG Converter",
  url: `${siteUrl}/heic-to-jpg`,
  description:
    "Convert iPhone HEIC photos to JPG format instantly in your browser.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "HEIC to JPG conversion",
    "iPhone photo support",
    "Adjustable quality",
    "No file uploads required",
    "100% browser-based processing",
    "Privacy-first design"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is HEIC format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEIC (High Efficiency Image Container) is Apple's default photo format since iOS 11. It offers better compression than JPG while maintaining quality, but has limited compatibility with non-Apple devices and software."
      }
    },
    {
      "@type": "Question",
      name: "How do I convert HEIC to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply upload your HEIC file to our converter, adjust quality if needed, and click Convert. Your JPG will be ready to download instantly. No account or server upload required."
      }
    },
    {
      "@type": "Question",
      name: "Is this HEIC converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our HEIC to JPG converter is completely free with no limits. There are no watermarks, registration, or hidden fees."
      }
    },
    {
      "@type": "Question",
      name: "Are my photos uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all processing happens entirely in your browser. Your photos never leave your device, ensuring complete privacy for personal images."
      }
    },
    {
      "@type": "Question",
      name: "Why won't Windows open my iPhone photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "iPhones save photos in HEIC format by default, which Windows doesn't natively support. Converting to JPG makes your photos compatible with all devices and software."
      }
    },
    {
      "@type": "Question",
      name: "Does conversion affect photo quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can control the output quality. At 90-95% quality, the difference is virtually imperceptible. Lower quality settings reduce file size but may show compression artifacts."
      }
    }
  ]
};

export default function HeicToJpgLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="heic-to-jpg-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="heic-to-jpg-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "HEIC to JPG Converter" }
        ]}
      />
      {children}
    </>
  );
}
