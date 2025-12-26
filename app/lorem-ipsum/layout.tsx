import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Free Placeholder Text | NoUploadTools",
  description:
    "Generate Lorem Ipsum placeholder text for design mockups. Create paragraphs, sentences, or words instantly. Free online tool with no uploads.",
  keywords: [
    "lorem ipsum generator free",
    "placeholder text generator",
    "dummy text for design",
    "lorem ipsum copy paste",
    "generate filler text",
    "lorem ipsum paragraphs",
    "mockup text generator",
    "random text generator",
    "lorem ipsum for website",
    "blank text generator",
    "sample text generator",
    "lorem ipsum html"
  ],
  alternates: {
    canonical: `${siteUrl}/lorem-ipsum`
  },
  openGraph: {
    url: `${siteUrl}/lorem-ipsum`,
    type: "website",
    title: "Lorem Ipsum Generator - Free Placeholder Text | NoUploadTools",
    description:
      "Generate Lorem Ipsum placeholder text for design mockups. Create paragraphs, sentences, or words instantly."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lorem Ipsum Generator",
  url: `${siteUrl}/lorem-ipsum`,
  description:
    "Generate Lorem Ipsum placeholder text for design mockups and prototypes.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Generate paragraphs, sentences, or words",
    "Customizable text length",
    "Start with classic Lorem Ipsum option",
    "Copy as plain text or HTML",
    "Instant generation",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Lorem Ipsum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lorem Ipsum is placeholder text used in the printing and design industry. It originated from a 1st century BC Latin text by Cicero, though it has been altered over time. Designers use it to demonstrate layouts without distracting viewers with meaningful content."
      }
    },
    {
      "@type": "Question",
      name: "Why use Lorem Ipsum instead of real text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lorem Ipsum is used because it has a relatively normal distribution of letters and word lengths, making it look like readable English. This allows viewers to focus on design elements like typography, spacing, and layout rather than being distracted by actual content."
      }
    },
    {
      "@type": "Question",
      name: "Is this Lorem Ipsum generator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our Lorem Ipsum generator is completely free with no limits. Generate as much placeholder text as you need for your design projects, websites, or documents without any cost or registration."
      }
    },
    {
      "@type": "Question",
      name: "Can I generate Lorem Ipsum in HTML format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our generator offers both plain text and HTML output options. The HTML format wraps paragraphs in <p> tags, making it ready to paste directly into your web projects."
      }
    },
    {
      "@type": "Question",
      name: "What's the classic Lorem Ipsum starting phrase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The classic Lorem Ipsum text begins with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' This opening is so well-known that many generators include an option to always start with this phrase for familiarity."
      }
    },
    {
      "@type": "Question",
      name: "Is my generated text stored anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all text generation happens in your browser using JavaScript. Nothing is sent to any server, and no generated text is stored or tracked."
      }
    }
  ]
};

export default function LoremIpsumLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="lorem-ipsum-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="lorem-ipsum-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Lorem Ipsum Generator" }
        ]}
      />
      {children}
    </>
  );
}
