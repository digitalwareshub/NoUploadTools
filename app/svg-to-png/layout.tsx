import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "SVG to PNG Converter - Free Online Tool | No Upload Required",
  description:
    "Convert SVG vector graphics to PNG images instantly in your browser. Choose custom dimensions and scale. No file uploads, 100% private.",
  keywords: [
    "svg to png converter free",
    "convert svg to png online",
    "svg to png with transparent background",
    "how to convert svg to png",
    "svg to png high resolution",
    "vector to raster converter",
    "svg to png no upload",
    "svg to png 2x 3x scale",
    "convert logo svg to png",
    "svg to png for social media",
    "best svg to png converter",
    "svg to png custom size"
  ],
  alternates: {
    canonical: `${siteUrl}/svg-to-png`
  },
  openGraph: {
    url: `${siteUrl}/svg-to-png`,
    type: "website",
    title: "SVG to PNG Converter - Free Online Tool | No Upload Required",
    description:
      "Convert SVG vector graphics to PNG images instantly. No file uploads, 100% private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SVG to PNG Converter",
  url: `${siteUrl}/svg-to-png`,
  description:
    "Convert SVG vector graphics to PNG images with custom dimensions.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "SVG to PNG conversion",
    "Custom output dimensions",
    "Scale multiplier options",
    "Transparent background support",
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
      name: "How do I convert SVG to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your SVG file, choose your desired output size or scale, and click Convert. Your PNG will be ready to download instantly. All processing happens in your browser."
      }
    },
    {
      "@type": "Question",
      name: "Is this SVG to PNG converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our SVG to PNG converter is completely free with no limits. No registration, watermarks, or hidden fees."
      }
    },
    {
      "@type": "Question",
      name: "Why convert SVG to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While SVG is great for scalable graphics, many applications and platforms only accept raster images like PNG. Converting allows you to use your vector graphics anywhere."
      }
    },
    {
      "@type": "Question",
      name: "Does the conversion preserve transparency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, PNG supports transparency. If your SVG has transparent areas, they will be preserved in the PNG output."
      }
    },
    {
      "@type": "Question",
      name: "Can I choose the output size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can set custom dimensions or use scale multipliers (2x, 3x, 4x) to create high-resolution PNGs from your SVG."
      }
    },
    {
      "@type": "Question",
      name: "Are my files uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all processing happens entirely in your browser using the Canvas API. Your files never leave your device."
      }
    }
  ]
};

export default function SvgToPngLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="svg-to-png-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="svg-to-png-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "SVG to PNG Converter" }
        ]}
      />
      {children}
    </>
  );
}
