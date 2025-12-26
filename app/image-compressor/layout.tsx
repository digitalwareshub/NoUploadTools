import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Image Compressor - Reduce Image Size Online Free",
  description:
    "Compress images to reduce file size while maintaining quality. Supports JPG, PNG, WebP. All processing happens locally - no uploads required.",
  keywords: [
    "compress image",
    "reduce image size",
    "image compressor",
    "compress jpg",
    "compress png",
    "resize image",
    "optimize image",
    "image size reducer"
  ],
  alternates: {
    canonical: `${siteUrl}/image-compressor`
  },
  openGraph: {
    url: `${siteUrl}/image-compressor`,
    type: "website",
    title: "Image Compressor - Reduce File Size Online Free",
    description:
      "Compress images locally in your browser. No uploads, 100% private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Compressor",
  url: `${siteUrl}/image-compressor`,
  description: "Compress images to reduce file size without uploading",
  applicationCategory: "UtilitiesApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Compress JPG, PNG, WebP images",
    "Adjustable quality settings",
    "Resize dimensions",
    "Before/after comparison",
    "100% browser-based"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much can I reduce image file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically 50-80% reduction for photos. Results depend on the original image quality and your chosen settings. You can preview the result and adjust quality to find the perfect balance."
      }
    },
    {
      "@type": "Question",
      name: "Does compression reduce image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some quality loss occurs with lossy compression (JPG, WebP). You control the quality level - higher settings preserve more detail. PNG uses lossless compression, so quality is preserved."
      }
    },
    {
      "@type": "Question",
      name: "What image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support JPEG/JPG, PNG, and WebP formats. You can also convert between formats during compression for optimal file size."
      }
    },
    {
      "@type": "Question",
      name: "Can I compress multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can upload multiple images and compress them all with the same settings. Download individually or all as a ZIP file."
      }
    },
    {
      "@type": "Question",
      name: "Are my images uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All compression happens locally in your browser using the Canvas API. Your images never leave your device."
      }
    },
    {
      "@type": "Question",
      name: "What's the best format for web images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP offers the best compression for web use. JPEG is best for photos with broad browser support. PNG is best for graphics with transparency or text."
      }
    }
  ]
};

export default function ImageCompressorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="image-compressor-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="image-compressor-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Image Compressor" }
        ]}
      />
      {children}
    </>
  );
}
