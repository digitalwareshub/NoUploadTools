import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "../../lib/tools";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Blog - Privacy & Security Tips",
  description:
    "Short notes on privacy, client-side tools and safer everyday workflows. Learn how to protect your data while working with files online.",
  alternates: {
    canonical: `${siteUrl}/blog/`
  },
  openGraph: {
    url: `${siteUrl}/blog/`,
    type: "website",
    title: "Blog - Privacy & Security Tips | NoUploadTools",
    description:
      "Short notes on privacy, client-side tools and safer everyday workflows.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoUploadTools Blog - Privacy & Security Tips"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Privacy & Security Tips | NoUploadTools",
    description:
      "Short notes on privacy, client-side tools and safer everyday workflows.",
    images: ["/twitter-image.png"]
  }
};

export default function BlogIndexPage() {
  return (
    <div className="space-y-4 text-base text-gray-800">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="text-sm text-gray-700">
        Short notes on privacy, client-side tools and safer everyday workflows.
      </p>
      <ul className="space-y-2 text-sm">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}/`}
              className="font-semibold underline"
            >
              {post.title}
            </Link>
            <span className="ml-1 text-gray-600">— {post.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
