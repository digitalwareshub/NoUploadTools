import Link from "next/link";
import { tools } from "../../lib/tools";
import { AdPlaceholder } from "../../components/AdPlaceholder";

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
        if (!list.length) return null;
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
                    <Link
                      href={tool.path}
                      className="font-semibold underline"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {tool.description}
                    </p>
                  </div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">
                    {tool.status === "live" ? "Live" : "Coming soon"}
                  </div>
                </li>
              ))}
            </ul>
            {index === 0 && (
              <AdPlaceholder label="In-content ad space" />
            )}
          </section>
        );
      })}
    </div>
  );
}
