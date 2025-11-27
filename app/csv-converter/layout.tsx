import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "CSV Converter - Convert CSV to JSON, XML & More | Free Tool",
  description:
    "Convert CSV files to JSON, XML, HTML tables, and more. Parse, preview, and transform CSV data. 100% browser-based - no uploads required.",
  keywords: [
    "csv converter",
    "csv to json",
    "csv to xml",
    "csv parser",
    "convert csv online",
    "csv to html table",
    "csv viewer",
    "json to csv"
  ],
  alternates: {
    canonical: `${siteUrl}/csv-converter`
  },
  openGraph: {
    url: `${siteUrl}/csv-converter`,
    type: "website",
    title: "CSV Converter - Convert CSV to JSON, XML & More | Free Tool",
    description:
      "Convert CSV files to JSON, XML, HTML tables. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CSV Converter",
  url: `${siteUrl}/csv-converter`,
  description:
    "Convert CSV files to various formats including JSON, XML, and HTML tables.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "CSV to JSON conversion",
    "CSV to XML conversion",
    "CSV to HTML table",
    "JSON to CSV conversion",
    "Custom delimiter support",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What formats can I convert CSV to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can convert CSV to JSON (array of objects or 2D array), XML, HTML tables, TSV (tab-separated), and Markdown tables. You can also convert JSON back to CSV."
      }
    },
    {
      "@type": "Question",
      name: "Does this tool support different CSV delimiters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the tool supports comma (,), semicolon (;), tab, and pipe (|) delimiters. It can also auto-detect the delimiter used in your CSV file."
      }
    },
    {
      "@type": "Question",
      name: "Is my CSV data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All CSV parsing and conversion happens entirely in your browser. Your data is never uploaded to any server, ensuring complete privacy for sensitive information like spreadsheet data."
      }
    },
    {
      "@type": "Question",
      name: "Can I convert large CSV files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, since processing happens in your browser, you can convert CSV files of any reasonable size. Very large files (100MB+) may be slower depending on your device's capabilities."
      }
    },
    {
      "@type": "Question",
      name: "How does the tool handle quoted fields?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The parser correctly handles quoted fields, including fields containing commas, newlines, or escaped quotes. It follows RFC 4180 CSV standards for proper parsing."
      }
    },
    {
      "@type": "Question",
      name: "Can I convert JSON back to CSV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can paste JSON data (array of objects) and convert it to CSV format. The tool automatically extracts headers from the object keys and creates a properly formatted CSV."
      }
    }
  ]
};

export default function CsvConverterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="csv-converter-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="csv-converter-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
