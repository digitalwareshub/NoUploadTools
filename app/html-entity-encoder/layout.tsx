import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "HTML Entity Encoder - Encode & Decode HTML Entities | Free Tool",
  description:
    "Encode and decode HTML entities instantly. Convert special characters to HTML entities and vice versa. 100% browser-based - no uploads required.",
  keywords: [
    "html entity encoder online",
    "html entity decoder free",
    "encode special characters html",
    "decode html entities to text",
    "html escape tool",
    "convert symbols to html entities",
    "html character codes",
    "encode less than greater than html",
    "html special characters converter",
    "prevent xss encode html",
    "html entities list reference",
    "ampersand encoding html"
  ],
  alternates: {
    canonical: `${siteUrl}/html-entity-encoder`
  },
  openGraph: {
    url: `${siteUrl}/html-entity-encoder`,
    type: "website",
    title: "HTML Entity Encoder - Encode & Decode HTML Entities | Free Tool",
    description:
      "Encode and decode HTML entities instantly. Convert special characters safely."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HTML Entity Encoder",
  url: `${siteUrl}/html-entity-encoder`,
  description:
    "Encode and decode HTML entities. Convert special characters to their HTML entity equivalents.",
  applicationCategory: "DeveloperApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "HTML entity encoding",
    "HTML entity decoding",
    "Named entity support",
    "Numeric entity support",
    "Common entities reference",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are HTML entities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HTML entities are special codes used to represent characters that have special meaning in HTML (like < > &) or characters not easily typed on a keyboard. For example, &lt; represents <, &gt; represents >, and &amp; represents &."
      }
    },
    {
      "@type": "Question",
      name: "Why do I need to encode HTML entities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Encoding prevents special characters from being interpreted as HTML code. This is essential for security (preventing XSS attacks) and for displaying characters like < and > as text rather than HTML tags."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between named and numeric entities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Named entities use descriptive names like &copy; for ©, while numeric entities use character codes like &#169; or &#xA9;. Named entities are more readable but numeric entities cover more characters."
      }
    },
    {
      "@type": "Question",
      name: "When should I use HTML entities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use HTML entities when: displaying user input in HTML to prevent XSS, showing code examples on web pages, including special characters in HTML attributes, or displaying characters that aren't on your keyboard."
      }
    },
    {
      "@type": "Question",
      name: "What characters must always be encoded in HTML?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Five characters must always be encoded in HTML content: < (&lt;), > (&gt;), & (&amp;), \" (&quot;), and ' (&#39; or &apos;). These have special meaning in HTML syntax."
      }
    },
    {
      "@type": "Question",
      name: "Is my data secure when using this encoder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all encoding and decoding happens entirely in your browser using JavaScript. Your text is never sent to any server, ensuring complete privacy for any content you process."
      }
    }
  ]
};

export default function HtmlEntityEncoderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="html-entity-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="html-entity-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "HTML Entity Encoder" }
        ]}
      />
      {children}
    </>
  );
}
