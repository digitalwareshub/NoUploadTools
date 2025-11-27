import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Layout } from "../components/Layout";

export const metadata: Metadata = {
  title: "NoUploadTools — Privacy-First Browser Utilities",
  description:
    "Convert images to PDF and use other privacy-first tools without uploading files. Everything runs locally in your browser."
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
      </body>
    </html>
  );
}
