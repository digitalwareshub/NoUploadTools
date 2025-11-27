import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { tools } from "../../lib/tools";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "All Tools Directory",
  description:
    "Browse all privacy-first browser utilities on NoUploadTools. Convert PDFs, images, text and more without uploading files to servers.",
  alternates: {
    canonical: `${siteUrl}/directory/`
  },
  openGraph: {
    url: `${siteUrl}/directory/`,
    type: "website",
    title: "All Tools Directory | NoUploadTools",
    description:
      "Browse all privacy-first browser utilities on NoUploadTools. Convert PDFs, images, text and more without uploading files to servers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoUploadTools - All Tools Directory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "All Tools Directory | NoUploadTools",
    description:
      "Browse all privacy-first browser utilities on NoUploadTools. Convert PDFs, images, text and more without uploading files to servers.",
    images: ["/twitter-image.png"]
  }
};

const categories = [
  { id: "pdf", label: "PDF & Documents" },
  { id: "text", label: "Text & Writing" },
  { id: "dev", label: "Developer Utilities" },
  { id: "misc", label: "Misc Tools" }
] as const;

export default function DirectoryPage() {
  return (
    <div className="space-y-6 text-base text-gray-800">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">All tools</h1>
        <p className="text-sm text-gray-700">
          A growing collection of privacy-first, no-upload utilities. Tools
          marked as “Coming soon” are planned but not live yet.
        </p>
      </section>

      {categories.map((cat, index) => {
        const list = tools.filter((t) => t.category === cat.id);
        if (!list.length) {
          return null;
        }
        return (
          <section key={cat.id} className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {cat.label}
            </h2>
            <ul className="divide-y divide-gray-200 border border-gray-200 text-sm">
              {list.map((tool) => (
                <li
                  key={tool.slug}
                  className="flex items-center justify-between px-3 py-2"
                >
                  <div>
                    <Link href={tool.path} className="font-semibold underline">
                      {tool.name}
                    </Link>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                  {tool.status === "live" ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                      Live
                    </span>
                  ) : (
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      Coming soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {index === 0 && <AdPlaceholder label="In-content ad space" />}
          </section>
        );
      })}
    </div>
  );
}
