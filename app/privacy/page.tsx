import type { Metadata } from "next";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how NoUploadTools protects your privacy. Our tools run entirely in your browser without uploading files to servers.",
  alternates: {
    canonical: `${siteUrl}/privacy/`
  },
  openGraph: {
    url: `${siteUrl}/privacy/`,
    type: "website",
    title: "Privacy Policy | NoUploadTools"
  }
};

export default function PrivacyPage() {
  return (
    <div className="space-y-4 text-base text-gray-800">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
      <p className="text-sm text-gray-700">
        This is a simple placeholder privacy page. Replace this text with your
        actual policy.
      </p>
      <p>
        The core idea behind NoUploadTools is that your files should stay on
        your device whenever possible. Our tools are designed to run inside your
        browser using JavaScript. That means file contents are not sent to our
        servers for processing.
      </p>
      <p>
        Analytics and advertising scripts, if enabled, may still collect
        high-level usage information. When you publish your final policy, make
        sure to describe how those systems work and what data they use.
      </p>
    </div>
  );
}
