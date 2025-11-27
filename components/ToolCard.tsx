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
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      {status && (
        <div className="mt-2 text-xs uppercase tracking-wide text-gray-500">
          {status === "live" ? "Live" : "Coming soon"}
        </div>
      )}
    </Link>
  );
}
