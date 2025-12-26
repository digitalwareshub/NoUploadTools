import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1.5 text-gray-400">/</span>}
            {item.path ? (
              <Link
                href={item.path}
                className="hover:text-gray-900 hover:underline"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-900">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
