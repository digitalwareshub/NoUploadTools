import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Text Encryptor - Encrypt & Decrypt Text Online | Free Tool",
  description:
    "Encrypt and decrypt text messages with AES-256 encryption. Share encrypted messages securely. 100% browser-based - no server uploads.",
  keywords: [
    "text encryptor online free",
    "encrypt message with password",
    "aes text encryption tool",
    "decrypt text message online",
    "secure message encryption",
    "encrypt text for email",
    "how to encrypt text message",
    "password protect text online",
    "encrypted message sender",
    "text encryption no upload",
    "send encrypted message free",
    "encode secret message online"
  ],
  alternates: {
    canonical: `${siteUrl}/text-encryptor`
  },
  openGraph: {
    url: `${siteUrl}/text-encryptor`,
    type: "website",
    title: "Text Encryptor - Encrypt & Decrypt Text Online | Free Tool",
    description:
      "Encrypt and decrypt text messages with AES-256 encryption. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text Encryptor",
  url: `${siteUrl}/text-encryptor`,
  description:
    "Encrypt and decrypt text messages with military-grade AES-256 encryption.",
  applicationCategory: "SecurityApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "AES-256-GCM encryption",
    "PBKDF2 key derivation",
    "Base64 output for easy sharing",
    "Text encryption and decryption",
    "Password-based protection",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I share an encrypted message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After encrypting your message, copy the encrypted text (Base64 format) and share it through any channel - email, messaging apps, etc. Share the password separately through a different channel for security. The recipient can use this same tool to decrypt it."
      }
    },
    {
      "@type": "Question",
      name: "Is text encryption secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this tool uses AES-256-GCM encryption, the same standard used by governments and banks. Combined with PBKDF2 key derivation (100,000 iterations), your messages are protected by military-grade encryption that would take billions of years to crack."
      }
    },
    {
      "@type": "Question",
      name: "Can encrypted messages be decrypted without the password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, without the correct password, the encrypted message cannot be recovered. AES-256 encryption is considered unbreakable with current technology. Always share passwords through secure channels and never include them with the encrypted message."
      }
    },
    {
      "@type": "Question",
      name: "Is my message stored anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all encryption and decryption happens in your browser using JavaScript. Your messages and passwords are never sent to any server, stored, or logged. When you close or refresh the page, everything is gone."
      }
    },
    {
      "@type": "Question",
      name: "Why does the encrypted output look random?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The encrypted output is encoded in Base64 format, which uses letters, numbers, and symbols. It contains the encrypted data plus metadata (salt and IV) needed for decryption. Each encryption produces different output even for the same message."
      }
    },
    {
      "@type": "Question",
      name: "Can I encrypt long messages or entire documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can encrypt text of any length. However, for large documents or files, consider using our File Encryptor tool instead, which is optimized for handling larger data more efficiently."
      }
    }
  ]
};

export default function TextEncryptorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="text-encryptor-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="text-encryptor-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Text Encryptor" }
        ]}
      />
      {children}
    </>
  );
}
