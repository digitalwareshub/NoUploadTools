"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface FaviconSize {
  size: number;
  name: string;
  description: string;
  dataUrl?: string;
}

const FAVICON_SIZES: Omit<FaviconSize, "dataUrl">[] = [
  { size: 16, name: "favicon-16x16.png", description: "Browser tab (small)" },
  { size: 32, name: "favicon-32x32.png", description: "Browser tab (large)" },
  { size: 48, name: "favicon-48x48.png", description: "Windows site icons" },
  {
    size: 180,
    name: "apple-touch-icon.png",
    description: "Apple Touch Icon (iOS)"
  },
  {
    size: 192,
    name: "android-chrome-192x192.png",
    description: "Android (small)"
  },
  {
    size: 512,
    name: "android-chrome-512x512.png",
    description: "Android (large)"
  }
];

export default function FaviconGeneratorPage() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceSize, setSourceSize] = useState({ width: 0, height: 0 });
  const [generatedFavicons, setGeneratedFavicons] = useState<FaviconSize[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      setError("");
      setGeneratedFavicons([]);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setSourceImage(dataUrl);
          setSourceSize({ width: img.width, height: img.height });
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    }
  }, []);

  const generateFavicons = useCallback(async () => {
    if (!sourceImage) {
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = sourceImage;
      });

      const favicons: FaviconSize[] = [];

      for (const sizeInfo of FAVICON_SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = sizeInfo.size;
        canvas.height = sizeInfo.size;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        // Calculate crop to make square
        const srcSize = Math.min(img.width, img.height);
        const srcX = (img.width - srcSize) / 2;
        const srcY = (img.height - srcSize) / 2;

        ctx.drawImage(
          img,
          srcX,
          srcY,
          srcSize,
          srcSize,
          0,
          0,
          sizeInfo.size,
          sizeInfo.size
        );

        const dataUrl = canvas.toDataURL("image/png");
        favicons.push({ ...sizeInfo, dataUrl });
      }

      setGeneratedFavicons(favicons);
    } catch (err) {
      setError("Generation failed: " + (err as Error).message);
    } finally {
      setProcessing(false);
    }
  }, [sourceImage]);

  const downloadFavicon = (favicon: FaviconSize) => {
    if (!favicon.dataUrl) {
      return;
    }
    const a = document.createElement("a");
    a.href = favicon.dataUrl;
    a.download = favicon.name;
    a.click();
  };

  const downloadAll = async () => {
    for (const favicon of generatedFavicons) {
      downloadFavicon(favicon);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const htmlCode = `<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android Chrome -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">

<!-- Web Manifest (optional) -->
<link rel="manifest" href="/site.webmanifest">`;

  const copyHtmlCode = async () => {
    await navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSourceImage(null);
    setGeneratedFavicons([]);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Favicon Generator" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Favicon Generator
        </h1>
        <p className="mt-2 text-gray-700">
          Generate favicons in all necessary sizes from any image. All
          processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* File upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="favicon-input"
          />
          <label htmlFor="favicon-input" className="cursor-pointer">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-gray-600">
              Drop an image here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Use a square image (512×512 or larger) for best results
            </p>
          </label>
        </div>

        {/* Source image preview */}
        {sourceImage && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sourceImage}
              alt="Source"
              className="w-24 h-24 object-contain rounded border bg-white"
            />
            <div className="flex-1">
              <p className="font-medium">Source Image</p>
              <p className="text-sm text-gray-500">
                {sourceSize.width} × {sourceSize.height} pixels
              </p>
              {sourceSize.width !== sourceSize.height && (
                <p className="text-sm text-yellow-600">
                  ⚠️ Image will be cropped to square
                </p>
              )}
            </div>
            <button
              onClick={reset}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Generate button */}
        {sourceImage && generatedFavicons.length === 0 && (
          <button
            onClick={generateFavicons}
            disabled={processing}
            className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300"
          >
            {processing ? "Generating..." : "Generate Favicons"}
          </button>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Generated favicons */}
        {generatedFavicons.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Generated Favicons</h2>
              <button
                onClick={downloadAll}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
              >
                ⬇️ Download All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {generatedFavicons.map((favicon) => (
                <div
                  key={favicon.size}
                  className="border border-gray-300 rounded-lg p-3 text-center"
                >
                  <div className="h-16 flex items-center justify-center mb-2">
                    {favicon.dataUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={favicon.dataUrl}
                        alt={`${favicon.size}x${favicon.size}`}
                        style={{
                          width: Math.min(favicon.size, 64),
                          height: Math.min(favicon.size, 64)
                        }}
                        className="border border-gray-200"
                      />
                    )}
                  </div>
                  <p className="text-xs font-medium">
                    {favicon.size}×{favicon.size}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {favicon.description}
                  </p>
                  <button
                    onClick={() => downloadFavicon(favicon)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>

            {/* HTML code */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <span className="text-sm font-medium">HTML Code</span>
                <button
                  onClick={copyHtmlCode}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto">
                {htmlCode}
              </pre>
            </div>
          </div>
        )}

        {/* Size reference */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold">Favicon Size Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Size</th>
                  <th className="text-left py-2">Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">16×16</td>
                  <td className="py-2 text-gray-600">
                    Browser tabs, bookmarks
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">32×32</td>
                  <td className="py-2 text-gray-600">
                    Taskbar, high-DPI browser tabs
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">180×180</td>
                  <td className="py-2 text-gray-600">iOS home screen</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">192×192</td>
                  <td className="py-2 text-gray-600">Android home screen</td>
                </tr>
                <tr>
                  <td className="py-2">512×512</td>
                  <td className="py-2 text-gray-600">PWA splash screen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All favicon generation happens in
          your browser using the Canvas API. Images never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Upload a square image (512×512 pixels recommended)</li>
          <li>Click Generate to create all favicon sizes</li>
          <li>Download individual sizes or all at once</li>
          <li>Copy the HTML code and add it to your website</li>
          <li>Place favicon files in your website&apos;s root directory</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Favicons</h2>
        <p>
          Favicons are small icons that represent your website in browser tabs,
          bookmarks, and mobile home screens. Modern websites need multiple
          sizes to look sharp on different devices and resolutions.
        </p>
        <p>
          For best results, start with a simple, recognizable design at high
          resolution. Complex logos may not be legible at 16×16 pixels. Consider
          creating a simplified version specifically for favicon use.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What sizes do I need for favicons?</p>
            <p>
              Common sizes include 16x16 and 32x32 for browsers, 180x180 for
              Apple devices, and 192x192/512x512 for Android. This tool
              generates all recommended sizes automatically.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What image format should I use as the source?
            </p>
            <p>
              Use a high-resolution square image (at least 512x512 pixels) in
              PNG format with a transparent background if needed. JPG and WebP
              images also work but don&apos;t support transparency.
            </p>
          </div>

          <div>
            <p className="font-semibold">Do I need an ICO file?</p>
            <p>
              ICO files are still useful for legacy browser support and Windows
              shortcuts. However, most modern browsers support PNG favicons
              directly. This tool generates both formats.
            </p>
          </div>

          <div>
            <p className="font-semibold">What is an Apple Touch Icon?</p>
            <p>
              Apple Touch Icons appear when users save your website to their
              home screen on iOS devices. The recommended size is 180x180
              pixels. Without one, Safari will use a screenshot of your page.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              How do I add favicons to my website?
            </p>
            <p>
              Add link tags in your HTML head section for each favicon size.
              This tool provides ready-to-use HTML code that you can copy and
              paste into your website.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is my image uploaded to a server?</p>
            <p>
              No, all favicon generation happens in your browser using the
              Canvas API. Your images never leave your device, ensuring complete
              privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
