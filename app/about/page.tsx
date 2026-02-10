import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "NoUploadTools is a collection of free, privacy-first browser utilities. Every tool runs entirely in your browser — no file uploads, no server processing, no data collection.",
  alternates: {
    canonical: `${siteUrl}/about`
  },
  openGraph: {
    url: `${siteUrl}/about`,
    type: "website",
    title: "About | NoUploadTools",
    description:
      "NoUploadTools is a collection of free, privacy-first browser utilities. Every tool runs entirely in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About NoUploadTools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About | NoUploadTools",
    description:
      "NoUploadTools is a collection of free, privacy-first browser utilities. Every tool runs entirely in your browser.",
    images: ["/twitter-image.png"]
  }
};

export default function AboutPage() {
  return (
    <div className="space-y-6 text-base text-gray-800">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          About NoUploadTools
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Privacy-first browser utilities, built by Digiwares.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p>
          NoUploadTools exists because we believe you shouldn&apos;t have to
          sacrifice your privacy to use basic online utilities. Every tool on
          this site runs entirely in your browser — your files never leave your
          device.
        </p>
        <p>
          We build free, open, and accessible tools for tasks people do every
          day: converting images, compressing PDFs, generating passwords,
          formatting code, and much more. All without requiring signups,
          subscriptions, or file uploads.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <p>
          Unlike most online tools that upload your files to remote servers for
          processing, our tools use modern browser technologies like JavaScript
          and WebAssembly to do everything locally on your device. This means:
        </p>
        <ul className="list-inside list-disc space-y-1 text-gray-700">
          <li>No files are uploaded to any server</li>
          <li>No data is collected, stored, or shared</li>
          <li>Tools work offline after the page loads</li>
          <li>
            Processing speed depends only on your device, not your internet
          </li>
        </ul>
        <p>
          You can verify this yourself by opening your browser&apos;s Network
          tab while using any tool — you&apos;ll see zero file uploads.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Who We Are</h2>
        <p>
          NoUploadTools is built and maintained by{" "}
          <a
            href="https://digiwares.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Digiwares
          </a>
          , a small team focused on building privacy-respecting software. We
          believe the best tools are the ones that work for you without working
          against your privacy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Our Tools</h2>
        <p>
          We currently offer 35+ free tools across categories including PDF
          utilities, text processing, developer tools, and image converters. See
          the full list on our{" "}
          <Link href="/directory" className="text-blue-600 hover:underline">
            tools directory
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Get in Touch</h2>
        <p>
          Have a question, suggestion, or found a bug? We&apos;d love to hear
          from you. Reach out at{" "}
          <a
            href="mailto:write@digiwares.xyz"
            className="text-blue-600 hover:underline"
          >
            write@digiwares.xyz
          </a>{" "}
          or visit our{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Support Us</h2>
        <p>
          NoUploadTools is free and always will be. If you find our tools
          useful, you can support the project by{" "}
          <a
            href="https://ko-fi.com/digiwares"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            buying us a coffee
          </a>
          . Every contribution helps us keep the tools free, ad-light, and
          privacy-first.
        </p>
      </section>
    </div>
  );
}
