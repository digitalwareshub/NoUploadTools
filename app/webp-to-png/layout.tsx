import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "WebP to PNG Converter - Free Online Tool | No Upload Required",
  description:
    "Convert WebP images to PNG format instantly in your browser. No file uploads, 100% private. Preserve transparency and download lossless PNG files.",
  keywords: [
    "webp to png",
    "convert webp to png",
    "webp to png converter",
    "webp to png online",
    "webp converter",
    "free webp to png",
    "webp to png no upload"
  ],
  alternates: {
    canonical: `${siteUrl}/webp-to-png`
  },
  openGraph: {
    url: `${siteUrl}/webp-to-png`,
    type: "website",
    title: "WebP to PNG Converter - Free Online Tool | No Upload Required",
    description:
      "Convert WebP images to PNG format instantly in your browser. No file uploads, 100% private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WebP to PNG Converter",
  url: `${siteUrl}/webp-to-png`,
  description:
    "Convert WebP images to PNG format instantly in your browser with transparency support.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "WebP to PNG conversion",
    "Preserves transparency",
    "No file uploads required",
    "100% browser-based processing",
    "Lossless PNG output",
    "Privacy-first design"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert WebP to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply upload your WebP file to our converter and click Convert. Your PNG file will be ready to download instantly. No account or server upload required."
      }
    },
    {
      "@type": "Question",
      name: "Is this WebP to PNG converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our WebP to PNG converter is completely free to use with no limits. There are no hidden fees, watermarks, or registration required."
      }
    },
    {
      "@type": "Question",
      name: "Does WebP to PNG conversion preserve transparency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our converter preserves the alpha channel (transparency) from WebP images when converting to PNG. PNG supports full transparency."
      }
    },
    {
      "@type": "Question",
      name: "Why convert WebP to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While WebP offers better compression, PNG has wider compatibility with older software and image editors. Converting to PNG ensures your images work everywhere."
      }
    },
    {
      "@type": "Question",
      name: "Are my images uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all processing happens entirely in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy."
      }
    },
    {
      "@type": "Question",
      name: "What is WebP format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP is a modern image format developed by Google that provides superior compression for web images. It supports both lossy and lossless compression, as well as transparency."
      }
    }
  ]
};

export default function WebpToPngLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="webp-to-png-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="webp-to-png-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "WebP to PNG Converter" }
        ]}
      />
      {children}
    </>
  );
}
