import type { Metadata } from "next";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the NoUploadTools team. Report bugs, suggest new tools, or ask questions about our privacy-first browser utilities.",
  alternates: {
    canonical: `${siteUrl}/contact`
  },
  openGraph: {
    url: `${siteUrl}/contact`,
    type: "website",
    title: "Contact | NoUploadTools",
    description:
      "Get in touch with the NoUploadTools team. Report bugs, suggest new tools, or ask questions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact NoUploadTools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | NoUploadTools",
    description:
      "Get in touch with the NoUploadTools team. Report bugs, suggest new tools, or ask questions.",
    images: ["/twitter-image.png"]
  }
};

export default function ContactPage() {
  return (
    <div className="space-y-6 text-base text-gray-800">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;d love to hear from you.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Email</h2>
        <p>
          The best way to reach us is by email. Whether you have a question,
          want to report a bug, or have a suggestion for a new tool — drop us a
          line.
        </p>
        <p>
          <a
            href="mailto:write@digiwares.xyz"
            className="text-blue-600 hover:underline"
          >
            write@digiwares.xyz
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What You Can Reach Out About</h2>
        <ul className="list-inside list-disc space-y-1 text-gray-700">
          <li>Bug reports or issues with any tool</li>
          <li>Suggestions for new tools</li>
          <li>Feature requests for existing tools</li>
          <li>Privacy or security concerns</li>
          <li>Business inquiries or partnerships</li>
          <li>General feedback</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Response Time</h2>
        <p>
          We typically respond within 1-2 business days. For urgent security
          concerns, please include &quot;SECURITY&quot; in the subject line and
          we will prioritize your message.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Built by Digiwares</h2>
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
          . We build privacy-respecting software that works for you without
          working against your privacy.
        </p>
      </section>
    </div>
  );
}
