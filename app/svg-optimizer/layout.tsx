import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "SVG Optimizer - Compress & Clean SVG Files | Free Tool",
  description:
    "Optimize and compress SVG files to reduce size. Remove unnecessary metadata, clean up code, and minify SVGs. 100% browser-based - no uploads required.",
  keywords: [
    "svg optimizer",
    "svg compressor",
    "optimize svg",
    "compress svg",
    "svg minifier",
    "clean svg",
    "reduce svg size",
    "svg cleaner"
  ],
  alternates: {
    canonical: `${siteUrl}/svg-optimizer`
  },
  openGraph: {
    url: `${siteUrl}/svg-optimizer`,
    type: "website",
    title: "SVG Optimizer - Compress & Clean SVG Files | Free Tool",
    description:
      "Optimize and compress SVG files to reduce size. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SVG Optimizer",
  url: `${siteUrl}/svg-optimizer`,
  description:
    "Optimize and compress SVG files by removing metadata, cleaning code, and minifying.",
  applicationCategory: "DesignApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Remove unnecessary metadata",
    "Clean up SVG code",
    "Minify SVG output",
    "Optimize path data",
    "Remove comments",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does SVG optimization do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVG optimization removes unnecessary data from SVG files - metadata, comments, editor artifacts, redundant attributes, and whitespace. This reduces file size without affecting how the image looks."
      }
    },
    {
      "@type": "Question",
      name: "How much smaller will my SVG be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reduction varies based on the source. SVGs exported from design tools like Illustrator or Figma often have 30-70% size reduction. Hand-coded or already optimized SVGs may see smaller improvements."
      }
    },
    {
      "@type": "Question",
      name: "Will optimization change how my SVG looks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, proper optimization only removes invisible data like metadata and whitespace. The visual appearance remains identical. Always preview the optimized SVG to verify."
      }
    },
    {
      "@type": "Question",
      name: "Is my SVG uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all optimization happens entirely in your browser using JavaScript. Your SVG files never leave your device, ensuring complete privacy for proprietary graphics."
      }
    },
    {
      "@type": "Question",
      name: "Should I optimize SVGs for the web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, optimized SVGs load faster and improve website performance. Smaller files mean less bandwidth usage and quicker rendering, especially important for icons and illustrations used throughout a site."
      }
    },
    {
      "@type": "Question",
      name: "What metadata is removed during optimization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The optimizer removes: XML declarations, DOCTYPE, editor metadata (from Illustrator, Sketch, Figma), comments, hidden elements, unused definitions, and redundant attributes that don't affect display."
      }
    }
  ]
};

export default function SvgOptimizerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="svg-optimizer-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="svg-optimizer-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
