import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "../../../lib/tools";

const siteUrl = "https://nouploadtools.com";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const tool = tools.find((t) => t.path === `/tools/${params.slug}`);
  if (!tool) {
    return {};
  }

  return {
    title: `${tool.name} - Coming Soon`,
    description: tool.description,
    alternates: {
      canonical: `${siteUrl}/tools/${params.slug}`
    },
    openGraph: {
      url: `${siteUrl}/tools/${params.slug}`,
      type: "website",
      title: `${tool.name} - Coming Soon | NoUploadTools`,
      description: tool.description
    }
  };
}

export default function ToolPlaceholderNested({ params }: Props) {
  const slug = params.slug;
  const tool = tools.find((t) => t.path === `/tools/${slug}`);
  if (!tool) {
    return notFound();
  }

  return (
    <div className="space-y-4 text-base text-gray-800">
      <h1 className="text-3xl font-semibold tracking-tight">{tool.name}</h1>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        Coming soon
      </p>
      <p className="text-sm text-gray-700">
        This PDF tool is planned but not live yet. It will process files in your
        browser only, without uploading them to a server.
      </p>
      <p className="text-sm text-gray-700">
        While this page is in progress, you can use the live{" "}
        <Link href="/image-to-pdf" className="underline">
          Image to PDF (No Upload)
        </Link>{" "}
        tool or explore all planned tools in the{" "}
        <Link href="/directory/" className="underline">
          directory
        </Link>
        .
      </p>
    </div>
  );
}
