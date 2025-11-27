import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "PDF to Image Converter - Convert PDF to JPG/PNG Online Free",
  description:
    "Convert PDF pages to high-quality JPG or PNG images. All processing happens in your browser - no uploads, completely private and secure. Works offline after loading.",
  keywords: [
    "pdf to image",
    "pdf to jpg",
    "pdf to png",
    "convert pdf to image",
    "pdf converter no upload",
    "offline pdf to image",
    "privacy pdf tool",
    "extract images from pdf",
    "pdf page to image",
    "free pdf to jpg converter"
  ],
  alternates: {
    canonical: `${siteUrl}/tools/pdf-to-image`
  },
  openGraph: {
    url: `${siteUrl}/tools/pdf-to-image`,
    type: "website",
    title: "PDF to Image Converter - No Upload Required",
    description:
      "Convert PDF pages to JPG or PNG images. All processing happens in your browser. No uploads, completely private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDF to Image Converter",
  url: `${siteUrl}/tools/pdf-to-image`,
  description:
    "Convert PDF pages to JPG or PNG images without uploading to servers",
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
    "Convert to JPG or PNG",
    "Adjustable image quality",
    "Download as ZIP or individual files",
    "Preview before download"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does PDF to image conversion work without uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool uses PDF.js, a JavaScript library developed by Mozilla, to render PDF pages directly in your browser. Each page is drawn onto a canvas element and then converted to your chosen image format. The entire process happens locally on your device - no files are ever sent to any server."
      }
    },
    {
      "@type": "Question",
      name: "What image formats can I convert PDF to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can convert PDF pages to JPG (JPEG) or PNG format. JPG is best for photographs and complex images with many colors, offering smaller file sizes. PNG is ideal for documents with text, diagrams, or graphics where you need crisp edges and transparency support."
      }
    },
    {
      "@type": "Question",
      name: "Can I control the quality of the output images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can adjust both the resolution scale (1x, 1.5x, 2x, 3x) for higher quality output, and for JPG format, you can set the compression quality from 0.1 to 1.0. Higher values mean better quality but larger file sizes."
      }
    },
    {
      "@type": "Question",
      name: "Is there a limit to how many pages I can convert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no hard limit, but very large PDFs with many pages may use significant browser memory. For best results with large documents, we recommend converting in batches or using a device with adequate RAM. The tool will show progress as each page is converted."
      }
    },
    {
      "@type": "Question",
      name: "How do I download all converted images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After conversion, you can download all images as a single ZIP file using the 'Download All as ZIP' button. This packages all converted pages into one convenient download. You can also download individual pages by clicking the download button on each preview."
      }
    },
    {
      "@type": "Question",
      name: "Are my PDF files kept private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Your PDF files never leave your device. All processing happens entirely in your browser using JavaScript. There are no server uploads, no cloud storage, and no data collection. Once you close or refresh the page, all data is cleared from memory."
      }
    }
  ]
};

export default function PdfToImageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="pdf-to-image-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="pdf-to-image-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
