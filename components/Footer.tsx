import Link from "next/link";
import { tools } from "../lib/tools";

export function Footer() {
  // Group tools by category
  const pdfTools = tools.filter((t) => t.category === "pdf").slice(0, 6);
  const textTools = tools.filter((t) => t.category === "text").slice(0, 6);
  const devTools = tools.filter((t) => t.category === "dev").slice(0, 6);
  const miscTools = tools.filter((t) => t.category === "misc").slice(0, 6);

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* PDF Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight">
              PDF Tools
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {pdfTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.path} className="hover:text-gray-900">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Text Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight">
              Text Tools
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {textTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.path} className="hover:text-gray-900">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight">
              Developer Tools
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {devTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.path} className="hover:text-gray-900">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & About */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/directory/" className="hover:text-gray-900">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-base text-gray-600 sm:flex-row">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold text-gray-900">
              NoUploadTools
            </Link>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <p className="text-sm text-gray-500">
            Privacy-first browser utilities. All processing happens locally.
          </p>
        </div>
      </div>
    </footer>
  );
}
