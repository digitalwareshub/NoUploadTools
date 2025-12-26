import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Image Format Converter - Convert PNG, JPG, WebP | Free Tool",
  description:
    "Convert images between PNG, JPG, WebP, and GIF formats. Adjust quality and resize images. 100% browser-based - no uploads required.",
  keywords: [
    "image converter",
    "convert png to jpg",
    "convert jpg to png",
    "convert to webp",
    "image format converter",
    "convert image online",
    "png to webp",
    "jpg to webp"
  ],
  alternates: {
    canonical: `${siteUrl}/image-format-converter`
  },
  openGraph: {
    url: `${siteUrl}/image-format-converter`,
    type: "website",
    title: "Image Format Converter - Convert PNG, JPG, WebP | Free Tool",
    description:
      "Convert images between formats with quality control. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Format Converter",
  url: `${siteUrl}/image-format-converter`,
  description:
    "Convert images between PNG, JPG, WebP, and GIF formats with quality and size control.",
  applicationCategory: "MultimediaApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "PNG to JPG conversion",
    "JPG to PNG conversion",
    "WebP conversion",
    "Quality adjustment",
    "Image resizing",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What image formats can I convert between?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool supports conversion between PNG, JPG/JPEG, WebP, and GIF formats. You can convert from any of these formats to any other supported format."
      }
    },
    {
      "@type": "Question",
      name: "Is my image uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all image processing happens entirely in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy for sensitive images."
      }
    },
    {
      "@type": "Question",
      name: "What is the difference between PNG and JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG supports transparency and uses lossless compression, making it ideal for graphics, logos, and screenshots. JPG uses lossy compression for smaller file sizes, best for photographs. WebP offers better compression than both."
      }
    },
    {
      "@type": "Question",
      name: "What quality setting should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For JPG and WebP, 80-90% quality usually provides a good balance between file size and visual quality. PNG is lossless so quality doesn't apply. Lower quality means smaller files but more compression artifacts."
      }
    },
    {
      "@type": "Question",
      name: "Can I convert multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Currently, this tool processes one image at a time for optimal performance and simplicity. For batch processing, you can convert images sequentially."
      }
    },
    {
      "@type": "Question",
      name: "Why should I convert to WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP typically produces 25-35% smaller files than JPG at equivalent quality, and supports transparency like PNG. It's supported by all modern browsers and is recommended for web use to improve page load times."
      }
    }
  ]
};

export default function ImageFormatConverterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="image-converter-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="image-converter-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Image Format Converter" }
        ]}
      />
      {children}
    </>
  );
}
