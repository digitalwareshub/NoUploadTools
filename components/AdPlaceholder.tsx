import { AdSense } from "./AdSense";

type Props = {
  label?: string;
  slot?: string;
  format?: "horizontal" | "vertical" | "rectangle" | "auto";
};

export function AdPlaceholder({ label, slot, format = "auto" }: Props) {
  // Set this to true when you're ready to show real ads
  const showRealAds = false;

  if (showRealAds && slot) {
    return (
      <div className="my-4 flex w-full justify-center">
        <div className="w-full max-w-[970px]">
          <AdSense adSlot={slot} adFormat={format} />
        </div>
      </div>
    );
  }

  // Placeholder for development
  return (
    <div className="my-4 flex w-full justify-center">
      <div className="flex h-24 w-full max-w-[970px] items-center justify-center border border-dashed border-gray-300 text-[10px] uppercase tracking-wide text-gray-500">
        {label ?? "Ad space"}
      </div>
    </div>
  );
}
