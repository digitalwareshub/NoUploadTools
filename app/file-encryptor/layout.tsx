import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "../../components/BreadcrumbSchema";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "File Encryptor - Encrypt Files with AES-256 | Free Tool",
  description:
    "Encrypt and decrypt files securely with AES-256-GCM encryption. Free browser-based file encryption tool. No uploads - your files never leave your device.",
  keywords: [
    "file encryptor",
    "encrypt files online",
    "AES encryption",
    "file decryptor",
    "secure file encryption",
    "browser encryption",
    "offline encryption",
    "password protect files"
  ],
  alternates: {
    canonical: `${siteUrl}/file-encryptor`
  },
  openGraph: {
    url: `${siteUrl}/file-encryptor`,
    type: "website",
    title: "File Encryptor - Encrypt Files with AES-256 | Free Tool",
    description:
      "Encrypt and decrypt files securely with AES-256-GCM encryption. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "File Encryptor",
  url: `${siteUrl}/file-encryptor`,
  description:
    "Encrypt and decrypt files with AES-256-GCM encryption directly in your browser.",
  applicationCategory: "SecurityApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "AES-256-GCM encryption",
    "PBKDF2 key derivation",
    "Secure random IV generation",
    "File encryption and decryption",
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
      name: "How secure is AES-256-GCM encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AES-256-GCM is a military-grade encryption standard used by governments and financial institutions worldwide. It provides both confidentiality and integrity verification, making it virtually impossible to crack with current technology."
      }
    },
    {
      "@type": "Question",
      name: "Is my file uploaded to a server for encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, absolutely not. All encryption and decryption happens entirely in your browser using the Web Crypto API. Your files and passwords never leave your device, ensuring complete privacy and security."
      }
    },
    {
      "@type": "Question",
      name: "What happens if I forget my password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you forget your password, there is no way to recover the encrypted file. The encryption is designed to be unbreakable without the correct password. Always store your passwords securely in a password manager."
      }
    },
    {
      "@type": "Question",
      name: "What file types can I encrypt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can encrypt any file type - documents, images, videos, archives, or any other file. The encryption works on the raw file data regardless of the file format."
      }
    },
    {
      "@type": "Question",
      name: "What is PBKDF2 key derivation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PBKDF2 (Password-Based Key Derivation Function 2) converts your password into a strong encryption key. It uses 100,000 iterations with SHA-256, making brute-force attacks extremely time-consuming and impractical."
      }
    },
    {
      "@type": "Question",
      name: "Can I decrypt files encrypted with this tool elsewhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Files encrypted with this tool can only be decrypted using this same tool or compatible software that supports AES-256-GCM with the same IV and key derivation parameters. The encrypted file contains all necessary metadata."
      }
    }
  ]
};

export default function FileEncryptorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="file-encryptor-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="file-encryptor-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "File Encryptor" }
        ]}
      />
      {children}
    </>
  );
}
