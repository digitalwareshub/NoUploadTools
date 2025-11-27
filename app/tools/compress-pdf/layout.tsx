import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Compress PDF Online Free - Reduce PDF File Size Without Upload",
  description:
    "Compress PDF files to reduce file size while maintaining quality. All processing happens in your browser - no uploads, completely private and secure.",
  keywords: [
    "compress pdf",
    "reduce pdf size",
    "pdf compressor",
    "shrink pdf",
    "pdf size reducer",
    "compress pdf online free",
    "no upload pdf compressor",
    "offline pdf compression",
    "reduce pdf file size"
  ],
  alternates: {
    canonical: `${siteUrl}/tools/compress-pdf`
  },
  openGraph: {
    url: `${siteUrl}/tools/compress-pdf`,
    type: "website",
    title: "Compress PDF Online Free - No Upload Required",
    description:
      "Reduce PDF file size while maintaining quality. All processing happens in your browser. No uploads, completely private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDF Compressor",
  url: `${siteUrl}/tools/compress-pdf`,
  description: "Compress PDF files to reduce file size without uploading",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "No file uploads required",
    "100% browser-based processing",
    "Multiple compression levels",
    "Before/after size comparison",
    "Preview compressed PDF",
    "Works offline after loading"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does PDF compression work without uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool uses pdf-lib, a JavaScript library that runs entirely in your browser. It processes your PDF locally, optimizing embedded images and removing unnecessary data. Your file never leaves your device."
      }
    },
    {
      "@type": "Question",
      name: "Will compression reduce the quality of my PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the compression level you choose. Low compression maintains the highest quality with modest size reduction. High compression achieves maximum size reduction but may reduce image quality. Medium compression offers a balanced approach suitable for most documents."
      }
    },
    {
      "@type": "Question",
      name: "How much can I reduce my PDF file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Results vary based on your PDF content. PDFs with many high-resolution images can be reduced by 50-80%. Text-heavy documents with few images may only reduce by 10-30%. The tool shows you the exact before and after file sizes."
      }
    },
    {
      "@type": "Question",
      name: "Is my PDF data safe during compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Your PDF never leaves your device. All compression happens locally in your browser using JavaScript. There are no server uploads, no cloud storage, and no data collection. Once you close the page, all data is cleared."
      }
    },
    {
      "@type": "Question",
      name: "What types of PDFs work best with compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDFs containing high-resolution images, scanned documents, or embedded photos compress best. Documents that are primarily text or already optimized will show less dramatic size reduction."
      }
    },
    {
      "@type": "Question",
      name: "Can I compress password-protected PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Currently, password-protected PDFs cannot be compressed directly. You would need to remove the password protection first, then compress, then optionally re-add password protection."
      }
    }
  ]
};

export default function CompressPdfLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="compress-pdf-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="compress-pdf-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
