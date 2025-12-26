import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Image Resizer - Free Online Tool | No Upload Required",
  description:
    "Resize images to any dimension instantly in your browser. No file uploads, 100% private. Supports JPG, PNG, WebP with quality control.",
  keywords: [
    "resize image online free",
    "image resizer no upload",
    "how to resize image without losing quality",
    "resize photo for passport",
    "reduce image dimensions online",
    "resize image to specific pixels",
    "image resizer for Instagram",
    "resize picture for Facebook",
    "bulk image resizer free",
    "resize image for email attachment",
    "change image size online free",
    "photo resizer no watermark"
  ],
  alternates: {
    canonical: `${siteUrl}/image-resizer`
  },
  openGraph: {
    url: `${siteUrl}/image-resizer`,
    type: "website",
    title: "Image Resizer - Free Online Tool | No Upload Required",
    description:
      "Resize images to any dimension instantly in your browser. No file uploads, 100% private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Resizer",
  url: `${siteUrl}/image-resizer`,
  description:
    "Resize images to any dimension instantly in your browser with quality control.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Custom width and height",
    "Maintain aspect ratio option",
    "Multiple output formats",
    "Quality adjustment",
    "No file uploads required",
    "Privacy-first design"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I resize an image online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your image, enter the desired width and/or height, and click Resize. Your resized image will be ready to download instantly. All processing happens in your browser."
      }
    },
    {
      "@type": "Question",
      name: "Is this image resizer free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our image resizer is completely free with no limits on the number of images you can resize. No registration or watermarks."
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
      name: "What image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our resizer supports all common image formats including JPG/JPEG, PNG, WebP, and GIF. You can also choose the output format."
      }
    },
    {
      "@type": "Question",
      name: "Can I maintain the aspect ratio when resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, there's an option to lock the aspect ratio. When enabled, changing the width will automatically adjust the height proportionally, and vice versa."
      }
    },
    {
      "@type": "Question",
      name: "Will resizing affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enlarging images can reduce quality as the browser interpolates new pixels. Reducing size generally maintains quality. You can adjust the output quality for JPG and WebP formats."
      }
    }
  ]
};

export default function ImageResizerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="image-resizer-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="image-resizer-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Image Resizer" }
        ]}
      />
      {children}
    </>
  );
}
