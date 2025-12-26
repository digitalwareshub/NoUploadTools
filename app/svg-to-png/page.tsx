"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

export default function SvgToPngPage() {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.includes("svg") && !file.name.endsWith(".svg")) {
        setError("Please select an SVG file");
        return;
      }

      setError("");
      setConvertedUrl(null);
      setConvertedSize(null);

      try {
        const text = await file.text();
        setSvgContent(text);
        setFileName(file.name);

        // Create URL for preview
        const blob = new Blob([text], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        setSvgUrl(url);

        // Parse SVG to get dimensions
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svgElement = doc.querySelector("svg");

        if (svgElement) {
          const width =
            parseFloat(svgElement.getAttribute("width") || "0") ||
            parseFloat(svgElement.viewBox?.baseVal?.width?.toString() || "0") ||
            300;
          const height =
            parseFloat(svgElement.getAttribute("height") || "0") ||
            parseFloat(
              svgElement.viewBox?.baseVal?.height?.toString() || "0"
            ) ||
            150;
          setOriginalWidth(width);
          setOriginalHeight(height);
        }
      } catch (err) {
        setError("Failed to read SVG file");
      }
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.includes("svg") || file.name.endsWith(".svg"))) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    } else {
      setError("Please drop an SVG file");
    }
  }, []);

  const convert = useCallback(async () => {
    if (!svgContent) {
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const targetWidth = Math.round(originalWidth * scale);
      const targetHeight = Math.round(originalHeight * scale);

      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // Create image from SVG
      const img = new Image();
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load SVG"));
        };
        img.src = url;
      });

      // Convert to PNG
      const dataUrl = canvas.toDataURL("image/png");

      // Calculate size
      const base64 = dataUrl.split(",")[1];
      const binaryString = atob(base64);
      const bytes = binaryString.length;

      if (convertedUrl) {
        URL.revokeObjectURL(convertedUrl);
      }

      setConvertedUrl(dataUrl);
      setConvertedSize(bytes);
    } catch (err) {
      setError("Conversion failed: " + (err as Error).message);
    } finally {
      setProcessing(false);
    }
  }, [svgContent, originalWidth, originalHeight, scale, convertedUrl]);

  const download = useCallback(() => {
    if (!convertedUrl) {
      return;
    }

    const a = document.createElement("a");
    a.href = convertedUrl;
    const baseName = fileName.replace(/\.svg$/i, "");
    const targetWidth = Math.round(originalWidth * scale);
    const targetHeight = Math.round(originalHeight * scale);
    a.download = `${baseName}_${targetWidth}x${targetHeight}.png`;
    a.click();
  }, [convertedUrl, fileName, originalWidth, originalHeight, scale]);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + " B";
    }
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    }
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const reset = () => {
    if (svgUrl) {
      URL.revokeObjectURL(svgUrl);
    }
    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
    }
    setSvgContent(null);
    setSvgUrl(null);
    setFileName("");
    setOriginalWidth(0);
    setOriginalHeight(0);
    setConvertedUrl(null);
    setConvertedSize(null);
    setScale(1);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const scaleOptions = [
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "3x", value: 3 },
    { label: "4x", value: 4 }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "SVG to PNG" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          SVG to PNG Converter
        </h1>
        <p className="mt-2 text-gray-700">
          Convert SVG vector graphics to PNG images instantly. Choose custom
          dimensions or scale. 100% browser-based — your files never leave your
          device.
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
            accept=".svg,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
            id="svg-input"
          />
          <label htmlFor="svg-input" className="cursor-pointer">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-gray-600">
              Drop an SVG file here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">SVG files only</p>
          </label>
        </div>

        {/* Source info */}
        {svgContent && svgUrl && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div
              className="w-20 h-20 rounded border bg-white flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                backgroundSize: "10px 10px",
                backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={svgUrl}
                alt="SVG preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{fileName}</p>
              <p className="text-sm text-gray-500">
                {originalWidth} × {originalHeight} px
              </p>
              <p className="text-sm text-gray-500">SVG</p>
            </div>
            <button
              onClick={reset}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Scale options */}
        {svgContent && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Output Scale
              </span>
              <div className="flex gap-2 flex-wrap">
                {scaleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setScale(option.value)}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      scale === option.value
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Output size:{" "}
              <strong>
                {Math.round(originalWidth * scale)} ×{" "}
                {Math.round(originalHeight * scale)} px
              </strong>
            </div>
          </div>
        )}

        {/* Convert button */}
        {svgContent && (
          <button
            onClick={convert}
            disabled={processing}
            className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300"
          >
            {processing
              ? "Converting..."
              : `Convert to PNG (${Math.round(originalWidth * scale)}×${Math.round(originalHeight * scale)})`}
          </button>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {convertedUrl && convertedSize !== null && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <div>
                <span className="font-medium">Converted PNG</span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatSize(convertedSize)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({Math.round(originalWidth * scale)}×
                  {Math.round(originalHeight * scale)})
                </span>
              </div>
              <button
                onClick={download}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
              >
                ⬇️ Download PNG
              </button>
            </div>
            <div
              className="p-4 flex justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={convertedUrl}
                alt="Converted"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All conversion happens in your
          browser using the Canvas API. Your files never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Convert SVG to PNG</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Drop or select an SVG file</li>
          <li>Choose the output scale (1x, 2x, 3x, 4x)</li>
          <li>Click &quot;Convert to PNG&quot;</li>
          <li>Download your converted PNG image</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About SVG vs PNG</h2>
        <p>
          SVG (Scalable Vector Graphics) is a vector format that scales
          infinitely without losing quality. It&apos;s perfect for logos, icons,
          and graphics.
        </p>
        <p>
          PNG is a raster format with a fixed resolution. Converting SVG to PNG
          is useful when you need to use your graphics in applications that
          don&apos;t support SVG, or when you need a specific pixel size.
        </p>
        <p>
          <strong>Tip:</strong> Use higher scales (2x, 3x, 4x) for high-DPI
          displays or when you need larger images for print.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">How do I convert SVG to PNG?</p>
            <p>
              Upload your SVG file, choose your desired output size or scale,
              and click Convert. Your PNG will be ready to download instantly.
              All processing happens in your browser.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is this SVG to PNG converter free?</p>
            <p>
              Yes, our SVG to PNG converter is completely free with no limits.
              No registration, watermarks, or hidden fees.
            </p>
          </div>

          <div>
            <p className="font-semibold">Why convert SVG to PNG?</p>
            <p>
              While SVG is great for scalable graphics, many applications and
              platforms only accept raster images like PNG. Converting allows
              you to use your vector graphics anywhere.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Does the conversion preserve transparency?
            </p>
            <p>
              Yes, PNG supports transparency. If your SVG has transparent areas,
              they will be preserved in the PNG output.
            </p>
          </div>

          <div>
            <p className="font-semibold">Can I choose the output size?</p>
            <p>
              Yes, you can set custom dimensions or use scale multipliers (2x,
              3x, 4x) to create high-resolution PNGs from your SVG.
            </p>
          </div>

          <div>
            <p className="font-semibold">Are my files uploaded to a server?</p>
            <p>
              No, all processing happens entirely in your browser using the
              Canvas API. Your files never leave your device.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
