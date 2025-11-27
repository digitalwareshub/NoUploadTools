import Script from "next/script";

type StructuredDataProps = {
  data: Record<string, unknown>;
};

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${data["@type"]}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
