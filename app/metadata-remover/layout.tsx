import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Metadata Remover - Strip EXIF Data from Images & PDFs Free",
  description:
    "Remove hidden metadata from images and PDFs before sharing. Strip EXIF data, GPS coordinates, author info. All processing happens locally - no uploads.",
  keywords: [
    "remove metadata",
    "strip exif data",
    "remove exif from photo",
    "metadata remover",
    "remove gps from photo",
    "privacy metadata",
    "clean metadata",
    "remove author from pdf"
  ],
  alternates: {
    canonical: `${siteUrl}/metadata-remover`
  },
  openGraph: {
    url: `${siteUrl}/metadata-remover`,
    type: "website",
    title: "Metadata Remover - Strip Hidden Data from Files",
    description:
      "Remove EXIF, GPS, and author data from images and PDFs. 100% local processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Metadata Remover",
  url: `${siteUrl}/metadata-remover`,
  description: "Remove hidden metadata from images and PDFs without uploading",
  applicationCategory: "UtilitiesApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Remove EXIF data from images",
    "Strip GPS coordinates",
    "Clean PDF metadata",
    "100% browser-based",
    "No file uploads"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What metadata is removed from images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We remove all EXIF data including GPS coordinates, camera information, date/time taken, device identifiers, thumbnail images, and editing software info. The resulting image contains only pixel data."
      }
    },
    {
      "@type": "Question",
      name: "What metadata is removed from PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We remove author name, creation/modification dates, software info, title, subject, keywords, and other document properties. The content of your PDF remains unchanged."
      }
    },
    {
      "@type": "Question",
      name: "Why should I remove metadata before sharing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Photos can reveal your exact location through GPS data. Documents can expose your name and organization. Metadata can be used to track you or reveal information you didn't intend to share."
      }
    },
    {
      "@type": "Question",
      name: "Does removing metadata affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most formats, no. We strip metadata without re-encoding the image. For some formats, a minimal re-encoding may occur but at maximum quality settings to preserve image fidelity."
      }
    },
    {
      "@type": "Question",
      name: "Is my data kept private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All processing happens in your browser using JavaScript. Your files never leave your device. There are no uploads, no cloud storage, and no data collection."
      }
    },
    {
      "@type": "Question",
      name: "What file formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support JPEG/JPG images (full EXIF removal), PNG images (metadata chunks removal), and PDF documents (document properties removal)."
      }
    }
  ]
};

export default function MetadataRemoverLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="metadata-remover-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="metadata-remover-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
