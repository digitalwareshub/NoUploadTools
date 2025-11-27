import Link from "next/link";

type Props = {
  href: string;
  title: string;
  description: string;
  status?: "live" | "soon";
};

export function ToolCard({ href, title, description, status }: Props) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between rounded-md border border-gray-200 p-3 text-sm transition hover:border-black"
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          {status === "live" && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-green-700">
              Live
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      {status === "soon" && (
        <div className="mt-2 text-xs uppercase tracking-wide text-gray-500">
          Coming soon
        </div>
      )}
    </Link>
  );
}
