import Link from "next/link";
import { blogPosts } from "../../lib/tools";

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
