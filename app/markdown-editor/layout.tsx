import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Markdown Editor - Live Preview | Free Online Tool",
  description:
    "Write and preview Markdown in real-time. Free online Markdown editor with live preview, syntax highlighting, and export options. No uploads required.",
  keywords: [
    "markdown editor online free",
    "markdown preview live",
    "online markdown writer",
    "free markdown editor tool",
    "markdown to html converter",
    "github markdown editor",
    "markdown editor with preview",
    "write markdown online",
    "markdown table generator",
    "readme md editor online",
    "markdown syntax editor",
    "wysiwyg markdown editor"
  ],
  alternates: {
    canonical: `${siteUrl}/markdown-editor`
  },
  openGraph: {
    url: `${siteUrl}/markdown-editor`,
    type: "website",
    title: "Markdown Editor - Live Preview | Free Online Tool",
    description:
      "Write and preview Markdown in real-time. Free online Markdown editor with live preview and export options."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Markdown Editor",
  url: `${siteUrl}/markdown-editor`,
  description:
    "Write and preview Markdown in real-time with live rendering and export options.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Live Markdown preview",
    "Support for all common Markdown syntax",
    "Download as .md file",
    "Copy HTML output",
    "Toolbar with formatting shortcuts",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Markdown is a lightweight markup language created by John Gruber in 2004. It uses simple syntax like # for headers, * for emphasis, and - for lists to format plain text that can be converted to HTML. It's widely used for documentation, README files, and web content."
      }
    },
    {
      "@type": "Question",
      name: "Is my Markdown text saved anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this Markdown editor runs entirely in your browser. Your text is never sent to any server. You can optionally save to your browser's local storage for convenience, but nothing leaves your device."
      }
    },
    {
      "@type": "Question",
      name: "What Markdown syntax is supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our editor supports standard Markdown including headers (# H1 to ###### H6), emphasis (*italic*, **bold**), links, images, code blocks, blockquotes, ordered and unordered lists, horizontal rules, and tables."
      }
    },
    {
      "@type": "Question",
      name: "Can I export my Markdown as HTML?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can copy the rendered HTML directly or download your content as a .md Markdown file. The live preview shows exactly how your Markdown will render as HTML."
      }
    },
    {
      "@type": "Question",
      name: "Why use Markdown instead of a word processor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Markdown is platform-independent, version-control friendly, and produces clean, semantic HTML. It's faster to write than HTML, more portable than word processor formats, and widely supported by platforms like GitHub, Reddit, Stack Overflow, and many CMS systems."
      }
    },
    {
      "@type": "Question",
      name: "Does this editor work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, once the page loads, the editor works entirely offline. All Markdown parsing and rendering happens in your browser using JavaScript, so you can write without an internet connection."
      }
    }
  ]
};

export default function MarkdownEditorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="markdown-editor-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="markdown-editor-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Markdown Editor" }
        ]}
      />
      {children}
    </>
  );
}
