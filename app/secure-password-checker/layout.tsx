import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Secure Password Checker - Test Password Strength | Free Tool",
  description:
    "Check your password strength with detailed security analysis. Tests against common passwords, patterns, and provides improvement suggestions. 100% offline.",
  keywords: [
    "password checker",
    "password strength",
    "password security",
    "password tester",
    "how secure is my password",
    "password analyzer",
    "password strength meter",
    "secure password test"
  ],
  alternates: {
    canonical: `${siteUrl}/secure-password-checker`
  },
  openGraph: {
    url: `${siteUrl}/secure-password-checker`,
    type: "website",
    title: "Secure Password Checker - Test Password Strength | Free Tool",
    description:
      "Check your password strength with detailed security analysis. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Secure Password Checker",
  url: `${siteUrl}/secure-password-checker`,
  description:
    "Analyze password strength with detailed security feedback and improvement suggestions.",
  applicationCategory: "SecurityApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Password strength scoring",
    "Common password detection",
    "Pattern analysis",
    "Character diversity check",
    "Improvement suggestions",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it safe to enter my password in this checker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this password checker runs entirely in your browser. Your password is never sent to any server or stored anywhere. All analysis happens locally on your device using JavaScript."
      }
    },
    {
      "@type": "Question",
      name: "What makes a password strong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong password is at least 12-16 characters long, contains a mix of uppercase, lowercase, numbers, and symbols, doesn't use dictionary words or common patterns, and is unique to each account. Avoid personal information like birthdays or names."
      }
    },
    {
      "@type": "Question",
      name: "How does the password strength calculation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The checker analyzes multiple factors: length, character variety (uppercase, lowercase, numbers, symbols), common patterns (like '123', 'abc'), dictionary words, and known weak passwords. Each factor contributes to the overall score."
      }
    },
    {
      "@type": "Question",
      name: "What are common password patterns to avoid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Avoid sequential characters (123, abc), keyboard patterns (qwerty, asdf), repeated characters (aaa, 111), common substitutions (p@ssw0rd), dictionary words, personal information, and previously breached passwords."
      }
    },
    {
      "@type": "Question",
      name: "How long would it take to crack my password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Crack time depends on password complexity and attack method. A simple 8-character password can be cracked in hours. A 16-character random password with mixed characters could take billions of years. This tool estimates crack time based on brute-force attack assumptions."
      }
    },
    {
      "@type": "Question",
      name: "Should I use a password manager?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, password managers are highly recommended. They generate and store unique, complex passwords for each account, so you only need to remember one master password. This is much more secure than reusing passwords or using simple memorable passwords."
      }
    }
  ]
};

export default function SecurePasswordCheckerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="password-checker-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="password-checker-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
