import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Image to PDF Converter",
  description:
    "Convert JPG and PNG images into a single PDF file. All processing happens in your browser. No uploads, completely private and secure. Works offline after loading.",
  keywords: [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "convert image pdf",
    "no upload converter",
    "offline pdf converter",
    "privacy pdf tool"
  ],
  alternates: {
    canonical: `${siteUrl}/image-to-pdf`
  },
  openGraph: {
    url: `${siteUrl}/image-to-pdf`,
    type: "website",
    title: "Image to PDF Converter - No Upload Required",
    description:
      "Convert JPG and PNG images into a single PDF file. All processing happens in your browser. No uploads, completely private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to PDF Converter",
  url: `${siteUrl}/image-to-pdf`,
  description:
    "Convert JPG and PNG images into a single PDF file without uploading to servers",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "No file uploads required",
    "100% browser-based processing",
    "Works offline after loading",
    "Supports JPG and PNG",
    "Multiple page sizes (A4, Letter, Fit)",
    "Adjustable orientation and margins"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does anything get uploaded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All processing happens in your browser using JavaScript. Files are never sent to our servers."
      }
    },
    {
      "@type": "Question",
      name: "Can I use this offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After the page has fully loaded once, your browser can usually run the tool again without a network connection, as long as it keeps the files cached."
      }
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Large images require more memory, and every browser has practical limits. If you try to convert extremely large images or many pages at once, you may hit those limits."
      }
    }
  ]
};

export default function ImageToPdfLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="image-to-pdf-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="image-to-pdf-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
