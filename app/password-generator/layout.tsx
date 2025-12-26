import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong Secure Passwords Free",
  description:
    "Generate strong, random passwords instantly. Customize length, characters, and complexity. All generation happens locally in your browser - completely private.",
  keywords: [
    "password generator online free",
    "random password generator secure",
    "strong password generator tool",
    "generate secure password",
    "password creator with symbols",
    "how to generate strong password",
    "random password no signup",
    "password generator for accounts",
    "16 character password generator",
    "uncrackable password generator",
    "password generator with special characters",
    "memorable strong password generator"
  ],
  alternates: {
    canonical: `${siteUrl}/password-generator`
  },
  openGraph: {
    url: `${siteUrl}/password-generator`,
    type: "website",
    title: "Password Generator - Create Strong Secure Passwords",
    description:
      "Generate strong, random passwords instantly. All generation happens locally in your browser. Completely private."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Password Generator",
  url: `${siteUrl}/password-generator`,
  description: "Generate strong, random passwords locally in your browser",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Cryptographically secure random generation",
    "Customizable length (8-128 characters)",
    "Include/exclude character types",
    "Password strength indicator",
    "Generate multiple passwords at once",
    "One-click copy to clipboard",
    "Works offline"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are the passwords generated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Passwords are generated using the Web Crypto API's cryptographically secure random number generator (crypto.getRandomValues). This ensures truly random, unpredictable passwords that are safe to use for important accounts."
      }
    },
    {
      "@type": "Question",
      name: "Are my generated passwords stored anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Passwords are generated entirely in your browser and are never sent to any server. We don't log, store, or have any access to the passwords you generate. Once you close or refresh the page, all generated passwords are gone."
      }
    },
    {
      "@type": "Question",
      name: "What makes a password strong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong password is long (12+ characters), uses a mix of uppercase letters, lowercase letters, numbers, and symbols, and is random rather than based on dictionary words or personal information. Our generator creates passwords meeting all these criteria."
      }
    },
    {
      "@type": "Question",
      name: "How long should my password be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend at least 16 characters for important accounts. Longer passwords are exponentially harder to crack. For maximum security accounts like password managers or financial services, consider 20-24 characters or more."
      }
    },
    {
      "@type": "Question",
      name: "Should I use symbols in my password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, when possible. Including symbols significantly increases password complexity. However, some systems have restrictions on allowed characters. If a site rejects your password, try generating one without symbols or with a limited symbol set."
      }
    },
    {
      "@type": "Question",
      name: "Can I generate passwords offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Once the page loads, you can disconnect from the internet and continue generating passwords. The Web Crypto API used for generation works entirely locally in your browser with no network connection required."
      }
    }
  ]
};

export default function PasswordGeneratorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="password-generator-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="password-generator-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Password Generator" }
        ]}
      />
      {children}
    </>
  );
}
