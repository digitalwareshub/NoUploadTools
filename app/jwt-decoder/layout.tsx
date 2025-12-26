import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "JWT Decoder - Decode JSON Web Tokens | No Upload Required",
  description:
    "Decode and inspect JWT tokens instantly in your browser. View header, payload, and verify structure. 100% client-side, your tokens stay private.",
  keywords: [
    "jwt decoder",
    "decode jwt",
    "jwt parser",
    "json web token decoder",
    "jwt debugger",
    "jwt viewer",
    "jwt decoder online",
    "decode jwt token"
  ],
  alternates: {
    canonical: `${siteUrl}/jwt-decoder`
  },
  openGraph: {
    url: `${siteUrl}/jwt-decoder`,
    type: "website",
    title: "JWT Decoder - Decode JSON Web Tokens | No Upload Required",
    description:
      "Decode and inspect JWT tokens instantly. 100% client-side, your tokens stay private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JWT Decoder",
  url: `${siteUrl}/jwt-decoder`,
  description: "Decode and inspect JWT tokens instantly in your browser.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Decode JWT header",
    "Decode JWT payload",
    "View expiration time",
    "Validate token structure",
    "No server upload",
    "Privacy-first design"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a JWT token?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JWT (JSON Web Token) is a compact, URL-safe way to represent claims between two parties. It's commonly used for authentication and information exchange in web applications."
      }
    },
    {
      "@type": "Question",
      name: "Is it safe to decode JWT tokens online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With our tool, yes! All decoding happens in your browser. Your tokens never leave your device. However, you should never share JWT tokens publicly as they may contain sensitive information."
      }
    },
    {
      "@type": "Question",
      name: "What information is in a JWT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A JWT has three parts: Header (algorithm and token type), Payload (claims like user ID, expiration, etc.), and Signature (for verification). Our decoder shows the header and payload."
      }
    },
    {
      "@type": "Question",
      name: "Can this tool verify JWT signatures?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool decodes and displays JWT contents but doesn't verify signatures. Signature verification requires the secret key, which should never be shared with a third-party tool."
      }
    },
    {
      "@type": "Question",
      name: "What does the 'exp' claim mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 'exp' claim is the expiration time in Unix timestamp format. Our decoder shows this as a human-readable date and indicates if the token has expired."
      }
    },
    {
      "@type": "Question",
      name: "Why is my token not decoding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Make sure you're pasting a complete JWT token. It should have three parts separated by dots (xxxxx.yyyyy.zzzzz). The header and payload must be valid Base64-encoded JSON."
      }
    }
  ]
};

export default function JwtDecoderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="jwt-decoder-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="jwt-decoder-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "JWT Decoder" }
        ]}
      />
      {children}
    </>
  );
}
