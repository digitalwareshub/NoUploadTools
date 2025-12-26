import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "EXIF Remover - Remove Photo Metadata | No Upload Required",
  description:
    "Remove EXIF metadata from photos including GPS location, camera info, and timestamps. 100% browser-based, your images never leave your device.",
  keywords: [
    "remove exif data from photo free",
    "exif remover online no upload",
    "remove gps location from photo",
    "strip metadata from image",
    "photo privacy tool",
    "remove camera info from image",
    "how to remove location from photo",
    "delete photo metadata online",
    "remove exif before sharing",
    "exif data remover for privacy",
    "clean photo metadata free",
    "remove personal info from picture"
  ],
  alternates: {
    canonical: `${siteUrl}/exif-remover`
  },
  openGraph: {
    url: `${siteUrl}/exif-remover`,
    type: "website",
    title: "EXIF Remover - Remove Photo Metadata | No Upload Required",
    description:
      "Remove EXIF metadata from photos including GPS location. 100% browser-based, private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EXIF Remover",
  url: `${siteUrl}/exif-remover`,
  description:
    "Remove EXIF metadata from photos including GPS location, camera info, and timestamps.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Remove GPS location data",
    "Strip camera information",
    "Remove timestamps",
    "Preserve image quality",
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
      name: "What is EXIF data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EXIF (Exchangeable Image File Format) is metadata embedded in photos that includes camera settings, date/time, GPS location, device information, and more. This data can reveal personal information you may not want to share."
      }
    },
    {
      "@type": "Question",
      name: "Why should I remove EXIF data from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EXIF data can reveal your location (GPS coordinates), when the photo was taken, and what device you used. Removing it protects your privacy when sharing photos online or with others."
      }
    },
    {
      "@type": "Question",
      name: "Does removing EXIF affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool preserves the original image quality. We use the Canvas API to redraw the image, which strips all metadata while maintaining the visual quality of your photo."
      }
    },
    {
      "@type": "Question",
      name: "Are my photos uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all processing happens entirely in your browser. Your photos never leave your device, making this the most private way to remove EXIF data."
      }
    },
    {
      "@type": "Question",
      name: "What types of metadata are removed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All EXIF metadata is removed including: GPS coordinates, date/time taken, camera make/model, lens information, exposure settings, software used, and any embedded thumbnails."
      }
    },
    {
      "@type": "Question",
      name: "Which image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool supports JPG/JPEG, PNG, and WebP images. The output format can be selected, with JPG being the most common choice for photos."
      }
    }
  ]
};

export default function ExifRemoverLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="exif-remover-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="exif-remover-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "EXIF Remover" }
        ]}
      />
      {children}
    </>
  );
}
