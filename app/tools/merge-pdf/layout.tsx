import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free - Combine PDFs Without Upload",
  description:
    "Combine multiple PDF files into one document. Drag to reorder pages. All processing happens in your browser - no uploads, completely private and secure.",
  keywords: [
    "merge pdf",
    "combine pdf",
    "join pdf files",
    "pdf merger",
    "merge pdf online free",
    "combine pdf files",
    "no upload pdf merger",
    "offline pdf merge",
    "join multiple pdfs"
  ],
  alternates: {
    canonical: `${siteUrl}/tools/merge-pdf`
  },
  openGraph: {
    url: `${siteUrl}/tools/merge-pdf`,
    type: "website",
    title: "Merge PDF Files Online Free - No Upload Required",
    description:
      "Combine multiple PDFs into one document. All processing happens in your browser. No uploads, completely private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDF Merger",
  url: `${siteUrl}/tools/merge-pdf`,
  description: "Merge multiple PDF files into one document without uploading",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "No file uploads required",
    "100% browser-based processing",
    "Drag and drop reordering",
    "Preview first page of each PDF",
    "Shows total page count",
    "Works offline after loading"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does PDF merging work without uploading files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool uses pdf-lib, a JavaScript library that runs entirely in your browser. It reads your PDF files locally, combines them into a single document, and saves the result directly to your device. No files are ever sent to any server."
      }
    },
    {
      "@type": "Question",
      name: "Can I change the order of PDFs before merging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! After adding your PDFs, you can drag and drop them to reorder, or use the up/down buttons. The merged document will follow the order you set. You can also preview the first page of each PDF to help with ordering."
      }
    },
    {
      "@type": "Question",
      name: "Is there a limit to how many PDFs I can merge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no hard limit, but very large merges may use significant browser memory. For best results with many large PDFs, we recommend merging in batches. The tool shows the total page count so you can track the size of your merged document."
      }
    },
    {
      "@type": "Question",
      name: "Will the merged PDF maintain the original quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, merging is a lossless operation. The content, images, and formatting from each original PDF are preserved exactly as they were. No compression or quality reduction occurs during merging."
      }
    },
    {
      "@type": "Question",
      name: "Can I merge password-protected PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Currently, password-protected PDFs cannot be merged directly. You would need to remove the password protection first using another tool, then merge the unprotected PDFs."
      }
    },
    {
      "@type": "Question",
      name: "Are my PDF files kept private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Your files never leave your device. All processing happens entirely in your browser using JavaScript. There are no uploads, no cloud storage, and no data collection. Once you close the page, all data is cleared from memory."
      }
    }
  ]
};

export default function MergePdfLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="merge-pdf-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="merge-pdf-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
