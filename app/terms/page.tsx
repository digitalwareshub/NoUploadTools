import type { Metadata } from "next";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using NoUploadTools. Understand your rights and responsibilities when using our privacy-first browser utilities.",
  alternates: {
    canonical: `${siteUrl}/terms/`
  },
  openGraph: {
    url: `${siteUrl}/terms/`,
    type: "website",
    title: "Terms of Service | NoUploadTools"
  }
};

export default function TermsPage() {
  return (
    <div className="space-y-4 text-base text-gray-800">
      <h1 className="text-3xl font-semibold tracking-tight">Terms</h1>
      <p className="text-sm text-gray-700">
        This is a placeholder terms of use page. Replace this content with your
        actual terms and conditions.
      </p>
      <p>
        NoUploadTools is provided on an “as is” basis with no warranties of any
        kind. You are responsible for verifying results before using them in
        critical workflows, and for complying with any laws or regulations that
        apply to your documents or data.
      </p>
      <p>
        Because the tools run in your browser, resource usage depends on your
        device and environment. Extremely large files or complex operations may
        fail on some hardware.
      </p>
    </div>
  );
}
