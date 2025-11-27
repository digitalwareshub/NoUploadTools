import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Color Picker & Converter - HEX, RGB, HSL | Free Online Tool",
  description:
    "Pick colors and convert between HEX, RGB, HSL, and CMYK formats. Free online color picker with palette generator and WCAG contrast checker.",
  keywords: [
    "color picker",
    "hex to rgb",
    "rgb to hex",
    "color converter",
    "hsl color",
    "color palette generator",
    "contrast checker",
    "wcag color contrast"
  ],
  alternates: {
    canonical: `${siteUrl}/color-picker`
  },
  openGraph: {
    url: `${siteUrl}/color-picker`,
    type: "website",
    title: "Color Picker & Converter - HEX, RGB, HSL | Free Online Tool",
    description:
      "Pick colors and convert between HEX, RGB, HSL, and CMYK formats. Free color palette generator."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Color Picker & Converter",
  url: `${siteUrl}/color-picker`,
  description:
    "Pick colors and convert between HEX, RGB, HSL, and CMYK formats with palette generation.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Visual color picker",
    "HEX, RGB, HSL, CMYK conversion",
    "Color palette generator",
    "WCAG contrast checker",
    "Color history",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What color formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our color picker supports HEX (e.g., #FF5733), RGB (e.g., rgb(255, 87, 51)), HSL (e.g., hsl(11, 100%, 60%)), and CMYK (e.g., cmyk(0%, 66%, 80%, 0%)) formats with real-time conversion between all formats."
      }
    },
    {
      "@type": "Question",
      name: "What is the WCAG contrast checker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios for text readability. Our contrast checker calculates the ratio between text and background colors, helping you ensure your designs are accessible. A ratio of 4.5:1 is required for normal text, and 3:1 for large text."
      }
    },
    {
      "@type": "Question",
      name: "How does the palette generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The palette generator creates harmonious color schemes based on color theory. It can generate complementary (opposite), analogous (adjacent), triadic (three evenly spaced), and split-complementary palettes from any base color you select."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between RGB and CMYK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RGB (Red, Green, Blue) is used for digital displays and adds light to create colors. CMYK (Cyan, Magenta, Yellow, Key/Black) is used for print and subtracts light. Colors may look different between RGB screens and CMYK prints due to this fundamental difference."
      }
    },
    {
      "@type": "Question",
      name: "Can I save my favorite colors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the color picker maintains a history of colors you've used during your session. You can click on any previous color to return to it. Colors are stored temporarily in your browser and are not uploaded anywhere."
      }
    },
    {
      "@type": "Question",
      name: "Is this tool free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our color picker is completely free with no limits or registration required. All color calculations happen in your browser, ensuring your design work remains private."
      }
    }
  ]
};

export default function ColorPickerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="color-picker-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="color-picker-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
