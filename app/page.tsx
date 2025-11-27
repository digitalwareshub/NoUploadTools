import Link from "next/link";
import { ToolCard } from "../components/ToolCard";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { tools, blogPosts } from "../lib/tools";

export default function HomePage() {
  const featured = [
    "image-to-pdf",
    "compress-pdf",
    "pdf-to-image",
    "merge-pdf",
    "metadata-remover"
  ];
  const featuredTools = tools.filter((t) => featured.includes(t.slug));

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Convert Images to PDF — No Upload, 100% Browser-Side
        </h1>
        <p className="text-sm text-gray-700">
          Turn your JPG/PNG images into a single PDF safely. All processing
          happens locally in your browser. Nothing is uploaded to our servers.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span>No uploads</span>
          <span>Privacy-first</span>
          <span>Works offline after load</span>
        </div>
        <div className="pt-2">
          <Link
            href="/image-to-pdf"
            className="inline-flex items-center rounded-md bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            Open Image to PDF tool
          </Link>
        </div>
      </section>

      <section className="space-y-3 text-base text-gray-700">
        <h2 className="text-xl font-semibold tracking-tight">
          What are “No Upload” tools?
        </h2>
        <p>
          Most online converters send your files to a remote server, process
          them there, and then send a result back. That means your private
          documents, IDs, contracts, or medical reports may live on a computer
          you do not control. NoUploadTools works differently.
        </p>
        <p>
          Every tool on this site is designed to run entirely in your browser.
          Files stay on your device. Our servers never see the content of what
          you open. Once a page is loaded, many tools can even work offline.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Tools</h2>
        <p className="text-sm text-gray-700">
          Start with our Image to PDF tool, and see what is coming next.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              href={tool.path}
              title={tool.name}
              description={tool.description}
              status={tool.status}
            />
          ))}
          <ToolCard
            href="/directory/"
            title="View all tools"
            description="Browse every planned and live tool on NoUploadTools."
          />
        </div>
      </section>

      <AdPlaceholder label="In-content ad space" />

      <section className="space-y-3 text-base text-gray-700">
        <h2 className="text-xl font-semibold tracking-tight">
          Why privacy-first utilities matter
        </h2>
        <p>
          Converters and utilities have become the glue of everyday digital
          work. Students, freelancers, lawyers, doctors and government officers
          all rely on small tools to convert, compress or clean files before
          uploading them somewhere else. The problem is that most of these tools
          require you to upload your files to a remote server.
        </p>
        <p>
          When you upload sensitive PDFs, images of ID cards, signed contracts
          or internal reports, you are forced to trust a system you cannot see.
          You do not know how long files are kept, who has access, or whether
          copies end up in backups and logs. Even if a site promises that files
          are deleted after a few minutes, you have no way to audit that claim.
        </p>
        <p>
          NoUploadTools takes a simpler approach: keep the data on your device.
          Modern browsers are powerful enough to resize images, generate PDFs,
          encrypt files and more directly on your computer. Our tools use that
          power so your files never leave your machine.
        </p>
        <p>
          The result is a calmer workflow. You can convert a set of scanned
          pages into a PDF, compress a report for upload, or prepare documents
          for e‑mail without constantly worrying about where the data is going.
          For highly sensitive material, that difference matters.
        </p>
        <p>
          Over time, NoUploadTools will grow into a small directory of focused,
          privacy‑first utilities. The goal is not to have hundreds of flashy
          features, but a short list of tools you can rely on every day.
        </p>
      </section>

      <section className="space-y-3 text-base text-gray-700">
        <h2 className="text-xl font-semibold tracking-tight">
          From the blog
        </h2>
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
      </section>
    </div>
  );
}
