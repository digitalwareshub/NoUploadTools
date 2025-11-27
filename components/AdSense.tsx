"use client";

import { useEffect } from "react";

type AdSenseProps = {
  adClient?: string;
  adSlot?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  adTest?: string;
};

export function AdSense({
  adClient = "ca-pub-XXXXXXXXXXXXXXXX", // Replace with your AdSense client ID
  adSlot = "XXXXXXXXXX", // Replace with your ad slot ID
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
  adTest = undefined // Set to "on" for testing
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Push ad to AdSense
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
      data-ad-test={adTest}
    />
  );
}
