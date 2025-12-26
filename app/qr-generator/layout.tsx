import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "QR Code Generator - Create QR Codes Free Online",
  description:
    "Generate QR codes for URLs, text, WiFi, and more. Download as PNG or SVG. All generation happens locally in your browser - no data sent to servers.",
  keywords: [
    "qr code generator",
    "create qr code",
    "qr code maker",
    "free qr code",
    "qr code for url",
    "wifi qr code",
    "qr code download",
    "generate qr code online"
  ],
  alternates: {
    canonical: `${siteUrl}/qr-generator`
  },
  openGraph: {
    url: `${siteUrl}/qr-generator`,
    type: "website",
    title: "QR Code Generator - Create Free QR Codes",
    description:
      "Generate QR codes locally in your browser. No uploads, completely private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR Code Generator",
  url: `${siteUrl}/qr-generator`,
  description: "Generate QR codes locally without uploading data",
  applicationCategory: "UtilitiesApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Generate QR codes for any text or URL",
    "Download as PNG or SVG",
    "Customizable size",
    "Works offline",
    "No data collection"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What can I encode in a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can encode URLs, plain text, WiFi credentials, phone numbers, email addresses, SMS messages, and more. QR codes can hold up to about 3KB of data."
      }
    },
    {
      "@type": "Question",
      name: "What format should I download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG is best for digital use and most applications. SVG is vector format - perfect for printing at any size without quality loss or for editing in design software."
      }
    },
    {
      "@type": "Question",
      name: "Is my data sent to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. QR code generation happens entirely in your browser using JavaScript. Your data never leaves your device. This is especially important for sensitive data like WiFi passwords."
      }
    },
    {
      "@type": "Question",
      name: "How big can my QR code be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can generate QR codes up to 1000x1000 pixels. For larger sizes, download the SVG format and scale it infinitely without quality loss."
      }
    },
    {
      "@type": "Question",
      name: "Do QR codes expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, QR codes generated here never expire. They contain the data directly, not a link to our service. The codes work forever and don't depend on any server."
      }
    },
    {
      "@type": "Question",
      name: "Can I customize the QR code colors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can customize the foreground and background colors. Keep in mind that high contrast (like black on white) ensures the best scanning reliability."
      }
    }
  ]
};

export default function QrGeneratorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="qr-generator-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="qr-generator-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "QR Code Generator" }
        ]}
      />
      {children}
    </>
  );
}
