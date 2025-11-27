import { notFound } from "next/navigation";
import { AdPlaceholder } from "../../../components/AdPlaceholder";
import { blogPosts } from "../../../lib/tools";

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return notFound();
  }

  return (
    <div className="space-y-4 text-base text-gray-800">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="text-sm text-gray-700">{post.description}</p>

      <AdPlaceholder label="In-article ad space" />

      <div className="space-y-3 text-base text-gray-800">
        <p>
          This is placeholder content for the article &ldquo;{post.title}
          &rdquo;. Replace it with a real write‑up later. For now, use this page
          to help search engines understand that NoUploadTools is focused on
          privacy, client‑ side processing and safer document handling.
        </p>
        <p>
          Traditional online tools take your files, send them to a remote
          server, process them there and then return a result. That model can be
          convenient, but it also concentrates risk: a single breach or misused
          log can expose many sensitive documents at once.
        </p>
        <p>
          Client‑side tools invert that pattern. Instead of shipping files to a
          server, the logic is shipped to your browser. Modern JavaScript
          runtimes can resize images, generate PDFs, encrypt data and more
          directly on your device. NoUploadTools is built around that idea.
        </p>
        <p>
          As you expand this article, you can add concrete tips, threat models
          and simple checklists for people who handle private information every
          day.
        </p>
      </div>
    </div>
  );
}
