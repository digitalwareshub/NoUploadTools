import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdPlaceholder } from "../../../components/AdPlaceholder";
import { StructuredData } from "../../../components/StructuredData";
import { blogPosts, type BlogPost } from "../../../lib/tools";

const siteUrl = "https://nouploadtools.com";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}/`
    },
    openGraph: {
      url: `${siteUrl}/blog/${post.slug}/`,
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: new Date().toISOString(),
      authors: ["NoUploadTools"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/twitter-image.png"]
    }
  };
}

function renderContent(content: BlogPost["content"]) {
  return content.map((block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <h2
            key={index}
            className="mt-6 text-xl font-semibold tracking-tight text-gray-900"
          >
            {block.text}
          </h2>
        );
      case "paragraph":
        return (
          <p key={index} className="leading-relaxed">
            {block.text}
          </p>
        );
      case "list":
        return (
          <ul key={index} className="list-disc space-y-1 pl-6">
            {block.items?.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return notFound();
  }

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    url: `${siteUrl}/blog/${post.slug}/`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "NoUploadTools",
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: "NoUploadTools",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}/`
    }
  };

  return (
    <>
      <StructuredData data={blogPostSchema} />
      <article className="space-y-4 text-base text-gray-800">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{post.description}</p>
        </header>

        <AdPlaceholder label="In-article ad space" />

        <div className="space-y-4 text-base text-gray-800">
          {renderContent(post.content)}
        </div>

        <footer className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            Published by NoUploadTools. All our tools process files locally in
            your browser for maximum privacy.
          </p>
        </footer>
      </article>
    </>
  );
}
