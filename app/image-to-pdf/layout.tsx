import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Image to PDF Converter",
  description:
    "Convert JPG and PNG images into a single PDF file. All processing happens in your browser. No uploads, completely private and secure. Works offline after loading.",
  keywords: [
    "image to pdf converter free",
    "jpg to pdf online free",
    "png to pdf converter no upload",
    "how to convert image to pdf",
    "combine images into pdf",
    "multiple images to single pdf",
    "photo to pdf converter free online",
    "convert pictures to pdf no watermark",
    "image to pdf no signup required",
    "best image to pdf converter",
    "convert screenshot to pdf",
    "merge photos into one pdf"
  ],
  alternates: {
    canonical: `${siteUrl}/image-to-pdf`
  },
  openGraph: {
    url: `${siteUrl}/image-to-pdf`,
    type: "website",
    title: "Image to PDF Converter - No Upload Required",
    description:
      "Convert JPG and PNG images into a single PDF file. All processing happens in your browser. No uploads, completely private.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Image to PDF Converter - NoUploadTools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter - No Upload Required",
    description:
      "Convert JPG and PNG images into a single PDF file. All processing happens in your browser. No uploads, completely private.",
    images: ["/twitter-image.png"]
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
      name: "How does image to PDF conversion work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All processing happens locally in your browser using JavaScript. When you select images, they're read directly from your device, converted to PDF format, and saved back to your device. No files are ever uploaded to any server."
      }
    },
    {
      "@type": "Question",
      name: "Is my data safe when using this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely safe. Your files never leave your device. Everything runs client-side in your browser, so there's no risk of data being intercepted, stored, or shared with third parties."
      }
    },
    {
      "@type": "Question",
      name: "What image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support all common image formats including JPG, JPEG, PNG, WEBP, GIF, BMP, and more. If your browser can display the image, our tool can convert it to PDF."
      }
    },
    {
      "@type": "Question",
      name: "Can I convert multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can select multiple images at once or drag and drop them. All images will be combined into a single PDF in the order you arrange them."
      }
    },
    {
      "@type": "Question",
      name: "What page sizes are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer A4 (standard international), Letter (US standard), and Fit (adjusts to image size). You can also choose portrait or landscape orientation, or let the tool auto-detect based on image dimensions."
      }
    },
    {
      "@type": "Question",
      name: "Do I need to install any software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No installation required. This is a web-based tool that works directly in your browser. Just visit the page and start converting."
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
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Image to PDF" }
        ]}
      />
      {children}
    </>
  );
}
