import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Unit Converter - Convert Length, Weight, Temperature | Free Tool",
  description:
    "Convert between units of length, weight, temperature, volume, and more. Instant calculations with no ads or tracking. 100% browser-based.",
  keywords: [
    "unit converter",
    "convert units",
    "length converter",
    "weight converter",
    "temperature converter",
    "metric converter",
    "measurement converter",
    "unit conversion calculator"
  ],
  alternates: {
    canonical: `${siteUrl}/unit-converter`
  },
  openGraph: {
    url: `${siteUrl}/unit-converter`,
    type: "website",
    title: "Unit Converter - Convert Length, Weight, Temperature | Free Tool",
    description:
      "Convert between units of length, weight, temperature, and more. Instant calculations."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unit Converter",
  url: `${siteUrl}/unit-converter`,
  description:
    "Convert between various units of measurement including length, weight, temperature, and volume.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Length conversion",
    "Weight/mass conversion",
    "Temperature conversion",
    "Volume conversion",
    "Area conversion",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of units can I convert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool converts length (meters, feet, miles, etc.), weight/mass (kilograms, pounds, ounces), temperature (Celsius, Fahrenheit, Kelvin), volume (liters, gallons, cups), and area (square meters, acres, hectares)."
      }
    },
    {
      "@type": "Question",
      name: "How accurate are the conversions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All conversions use precise mathematical conversion factors. Results are displayed with appropriate decimal precision for practical accuracy in everyday use."
      }
    },
    {
      "@type": "Question",
      name: "How do I convert Celsius to Fahrenheit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select Temperature as the category, enter a value in Celsius, and the Fahrenheit equivalent will be calculated instantly. The formula is F = C × 9/5 + 32."
      }
    },
    {
      "@type": "Question",
      name: "What's the difference between metric and imperial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Metric (SI) uses meters, kilograms, and liters with decimal prefixes. Imperial uses feet, pounds, and gallons. Most countries use metric, while the US primarily uses imperial."
      }
    },
    {
      "@type": "Question",
      name: "Can I convert between any two units?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can convert between any units within the same category (e.g., meters to feet, both length units). You cannot convert between different categories (e.g., length to weight) as they measure different physical properties."
      }
    },
    {
      "@type": "Question",
      name: "Is this converter available offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, once loaded, all calculations happen in your browser without needing an internet connection. No data is sent to any server."
      }
    }
  ]
};

export default function UnitConverterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="unit-converter-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="unit-converter-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
