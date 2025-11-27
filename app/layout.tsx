import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Layout } from "../components/Layout";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NoUploadTools — Privacy-First Browser Utilities",
    template: "%s | NoUploadTools"
  },
  description:
    "Convert images to PDF and use other privacy-first tools without uploading files. Everything runs locally in your browser.",
  keywords: [
    "no upload tools",
    "privacy-first",
    "browser tools",
    "offline tools",
    "image to pdf",
    "pdf converter",
    "client-side processing",
    "secure file conversion"
  ],
  authors: [{ name: "NoUploadTools" }],
  creator: "NoUploadTools",
  publisher: "NoUploadTools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NoUploadTools",
    title: "NoUploadTools — Privacy-First Browser Utilities",
    description:
      "Convert images to PDF and use other privacy-first tools without uploading files. Everything runs locally in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoUploadTools - Privacy-First Browser Utilities"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NoUploadTools — Privacy-First Browser Utilities",
    description:
      "Convert images to PDF and use other privacy-first tools without uploading files. Everything runs locally in your browser.",
    images: ["/twitter-image.png"]
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png"
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png"
      }
    ]
  },
  manifest: "/site.webmanifest"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
        <Analytics />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
