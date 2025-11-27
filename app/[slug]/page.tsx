import { notFound } from "next/navigation";
import Link from "next/link";
import { tools } from "../../lib/tools";

type Props = {
  params: { slug: string };
};

export default function ToolPlaceholderTopLevel({ params }: Props) {
  const slug = params.slug;
  const tool = tools.find((t) => t.path === `/${slug}/`);
  if (!tool) return notFound();

  return (
    <div className="space-y-4 text-base text-gray-800">
      <h1 className="text-3xl font-semibold tracking-tight">{tool.name}</h1>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        Coming soon
      </p>
      <p className="text-sm text-gray-700">
        This tool is planned but not live yet. It will be implemented as a
        privacy-first, no-upload utility that runs entirely in your browser.
      </p>
      <p className="text-sm text-gray-700">
        For now, you can try the live{" "}
        <Link href="/image-to-pdf" className="underline">
          Image to PDF (No Upload)
        </Link>{" "}
        tool, or browse other entries in the{" "}
        <Link href="/directory/" className="underline">
          tools directory
        </Link>
        .
      </p>
    </div>
  );
}
