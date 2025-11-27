import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Favicon Generator - Create Favicons from Images | Free Tool",
  description:
    "Generate favicons in multiple sizes from any image. Create ICO, PNG favicons and Apple Touch icons. 100% browser-based - no uploads required.",
  keywords: [
    "favicon generator",
    "create favicon",
    "favicon maker",
    "ico generator",
    "favicon from image",
    "apple touch icon",
    "favicon converter",
    "website icon maker"
  ],
  alternates: {
    canonical: `${siteUrl}/favicon-generator`
  },
  openGraph: {
    url: `${siteUrl}/favicon-generator`,
    type: "website",
    title: "Favicon Generator - Create Favicons from Images | Free Tool",
    description:
      "Generate favicons in multiple sizes from any image. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Favicon Generator",
  url: `${siteUrl}/favicon-generator`,
  description:
    "Generate favicons in multiple sizes from any image for websites and web apps.",
  applicationCategory: "DesignApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Multiple favicon sizes",
    "PNG favicon generation",
    "Apple Touch icon support",
    "Android icon support",
    "HTML code generation",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What sizes do I need for favicons?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common sizes include 16x16 and 32x32 for browsers, 180x180 for Apple devices, and 192x192/512x512 for Android. This tool generates all recommended sizes automatically."
      }
    },
    {
      "@type": "Question",
      name: "What image format should I use as the source?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a high-resolution square image (at least 512x512 pixels) in PNG format with a transparent background if needed. JPG and WebP images also work but don't support transparency."
      }
    },
    {
      "@type": "Question",
      name: "Do I need an ICO file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ICO files are still useful for legacy browser support and Windows shortcuts. However, most modern browsers support PNG favicons directly. This tool generates both formats."
      }
    },
    {
      "@type": "Question",
      name: "What is an Apple Touch Icon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apple Touch Icons appear when users save your website to their home screen on iOS devices. The recommended size is 180x180 pixels. Without one, Safari will use a screenshot of your page."
      }
    },
    {
      "@type": "Question",
      name: "How do I add favicons to my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add link tags in your HTML head section for each favicon size. This tool provides ready-to-use HTML code that you can copy and paste into your website."
      }
    },
    {
      "@type": "Question",
      name: "Is my image uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all favicon generation happens in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy."
      }
    }
  ]
};

export default function FaviconGeneratorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="favicon-generator-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="favicon-generator-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
