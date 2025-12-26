import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Free Online Tool | No Upload Required",
  description:
    "Convert PNG images to JPG format instantly in your browser. No file uploads, 100% private. Adjust quality settings and download compressed JPG files.",
  keywords: [
    "png to jpg converter free",
    "convert png to jpg online",
    "png to jpeg without losing quality",
    "how to convert png to jpg",
    "png to jpg no upload required",
    "change png to jpg free",
    "png to jpg converter no watermark",
    "convert png to jpg for email",
    "reduce png file size by converting to jpg",
    "png to jpg batch converter",
    "best png to jpg converter online",
    "transparent png to jpg with white background"
  ],
  alternates: {
    canonical: `${siteUrl}/png-to-jpg`
  },
  openGraph: {
    url: `${siteUrl}/png-to-jpg`,
    type: "website",
    title: "PNG to JPG Converter - Free Online Tool | No Upload Required",
    description:
      "Convert PNG images to JPG format instantly in your browser. No file uploads, 100% private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PNG to JPG Converter",
  url: `${siteUrl}/png-to-jpg`,
  description:
    "Convert PNG images to JPG format instantly in your browser with adjustable quality settings.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "PNG to JPG conversion",
    "Adjustable quality settings",
    "No file uploads required",
    "100% browser-based processing",
    "Instant download",
    "Privacy-first design"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert PNG to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply upload your PNG file to our converter, adjust the quality if needed, and click Convert. Your JPG file will be ready to download instantly. No account or upload to servers required."
      }
    },
    {
      "@type": "Question",
      name: "Is this PNG to JPG converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our PNG to JPG converter is completely free to use with no limits. There are no hidden fees, watermarks, or registration required."
      }
    },
    {
      "@type": "Question",
      name: "Are my images uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all processing happens entirely in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy for sensitive images."
      }
    },
    {
      "@type": "Question",
      name: "Why convert PNG to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPG files are typically smaller than PNG files because they use lossy compression. This makes them ideal for photographs, web images, and sharing via email. Converting to JPG can reduce file sizes by 50-80%."
      }
    },
    {
      "@type": "Question",
      name: "What happens to transparency when converting PNG to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPG does not support transparency. When you convert a PNG with transparent areas to JPG, the transparent parts will be replaced with a white background."
      }
    },
    {
      "@type": "Question",
      name: "What quality setting should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most uses, 85-90% quality provides an excellent balance between file size and image quality. For photographs where quality is critical, use 95%. For web images where file size matters more, try 70-80%."
      }
    }
  ]
};

export default function PngToJpgLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="png-to-jpg-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="png-to-jpg-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "PNG to JPG Converter" }
        ]}
      />
      {children}
    </>
  );
}
