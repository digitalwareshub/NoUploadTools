"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type ImageFormat = "image/png" | "image/jpeg" | "image/webp";

interface ImageInfo {
  file: File;
  width: number;
  height: number;
  url: string;
}

export default function ImageFormatConverterPage() {
  const [sourceImage, setSourceImage] = useState<ImageInfo | null>(null);
  const [outputFormat, setOutputFormat] = useState<ImageFormat>("image/webp");
  const [quality, setQuality] = useState(85);
  const [scale, setScale] = useState(100);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatLabels: Record<ImageFormat, string> = useMemo(
    () => ({
      "image/png": "PNG",
      "image/jpeg": "JPG",
      "image/webp": "WebP"
    }),
    []
  );

  const formatExtensions: Record<ImageFormat, string> = useMemo(
    () => ({
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/webp": ".webp"
    }),
    []
  );

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
      setConvertedUrl(null);
      setConvertedSize(null);

      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setSourceImage({
          file,
          width: img.width,
          height: img.height,
          url
        });
      };
      img.onerror = () => {
        setError("Failed to load image");
        URL.revokeObjectURL(url);
      };
      img.src = url;
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const input = document.createElement("input");
      input.type = "file";
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

  const convert = useCallback(async () => {
    if (!sourceImage) {
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = sourceImage.url;
      });

      const targetWidth = Math.round(img.width * (scale / 100));
      const targetHeight = Math.round(img.height * (scale / 100));

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // For JPG, fill with white background (no transparency)
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const qualityValue =
        outputFormat === "image/png" ? undefined : quality / 100;
      const dataUrl = canvas.toDataURL(outputFormat, qualityValue);

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
  }, [sourceImage, outputFormat, quality, scale, convertedUrl]);

  const download = useCallback(() => {
    if (!convertedUrl || !sourceImage) {
      return;
    }

    const a = document.createElement("a");
    a.href = convertedUrl;
    const baseName = sourceImage.file.name.replace(/\.[^.]+$/, "");
    a.download = baseName + formatExtensions[outputFormat];
    a.click();
  }, [convertedUrl, sourceImage, outputFormat, formatExtensions]);

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
    if (sourceImage) {
      URL.revokeObjectURL(sourceImage.url);
    }
    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
    }
    setSourceImage(null);
    setConvertedUrl(null);
    setConvertedSize(null);
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
          { name: "Image Format Converter" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Image Format Converter
        </h1>
        <p className="mt-2 text-gray-700">
          Convert images between PNG, JPG, and WebP formats. Adjust quality and
          size. All processing happens in your browser.
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
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
            id="image-input"
          />
          <label htmlFor="image-input" className="cursor-pointer">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-gray-600">
              Drop an image here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports PNG, JPG, WebP, GIF
            </p>
          </label>
        </div>

        {/* Source image info */}
        {sourceImage && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sourceImage.url}
              alt="Source"
              className="w-20 h-20 object-contain rounded border"
            />
            <div className="flex-1">
              <p className="font-medium">{sourceImage.file.name}</p>
              <p className="text-sm text-gray-500">
                {sourceImage.width} × {sourceImage.height} •{" "}
                {formatSize(sourceImage.file.size)}
              </p>
              <p className="text-sm text-gray-500">
                {sourceImage.file.type.replace("image/", "").toUpperCase()}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Conversion options */}
        {sourceImage && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="output-format"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Output Format
              </label>
              <select
                id="output-format"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as ImageFormat)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="image/webp">WebP</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="quality-slider"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quality: {quality}%
              </label>
              <input
                id="quality-slider"
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                disabled={outputFormat === "image/png"}
                className="w-full"
              />
              {outputFormat === "image/png" && (
                <p className="text-xs text-gray-500">
                  PNG uses lossless compression
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="scale-slider"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Scale: {scale}%
              </label>
              <input
                id="scale-slider"
                type="range"
                min="10"
                max="200"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
                className="w-full"
              />
              {sourceImage && (
                <p className="text-xs text-gray-500">
                  Output: {Math.round(sourceImage.width * (scale / 100))} ×{" "}
                  {Math.round(sourceImage.height * (scale / 100))}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Convert button */}
        {sourceImage && (
          <button
            onClick={convert}
            disabled={processing}
            className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300"
          >
            {processing
              ? "Converting..."
              : `Convert to ${formatLabels[outputFormat]}`}
          </button>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {convertedUrl && convertedSize !== null && sourceImage && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <div>
                <span className="font-medium">Converted Image</span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatSize(convertedSize)}
                </span>
                {convertedSize < sourceImage.file.size && (
                  <span className="text-sm text-green-600 ml-2">
                    (
                    {Math.round(
                      (1 - convertedSize / sourceImage.file.size) * 100
                    )}
                    % smaller)
                  </span>
                )}
              </div>
              <button
                onClick={download}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
              >
                ⬇️ Download {formatLabels[outputFormat]}
              </button>
            </div>
            <div className="p-4 bg-white flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={convertedUrl}
                alt="Converted"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          </div>
        )}

        {/* Format comparison */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold">Format Comparison</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <h3 className="font-medium">PNG</h3>
              <ul className="text-gray-600 text-xs mt-1 space-y-1">
                <li>✓ Lossless compression</li>
                <li>✓ Transparency support</li>
                <li>✓ Best for graphics/logos</li>
                <li>✗ Larger file size</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h3 className="font-medium">JPG</h3>
              <ul className="text-gray-600 text-xs mt-1 space-y-1">
                <li>✓ Small file size</li>
                <li>✓ Best for photos</li>
                <li>✓ Universal support</li>
                <li>✗ No transparency</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h3 className="font-medium">WebP</h3>
              <ul className="text-gray-600 text-xs mt-1 space-y-1">
                <li>✓ Smallest file size</li>
                <li>✓ Transparency support</li>
                <li>✓ Best for web</li>
                <li>✗ Less universal support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All image conversion happens in
          your browser using the Canvas API. Images never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Drop or select an image file</li>
          <li>Choose your desired output format</li>
          <li>Adjust quality (for JPG/WebP) and scale if needed</li>
          <li>Click Convert to process the image</li>
          <li>Download your converted image</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Image Formats</h2>
        <p>
          Different image formats serve different purposes. PNG is ideal for
          graphics with sharp edges and transparency. JPG works best for
          photographs where some quality loss is acceptable for smaller files.
          WebP is a modern format that offers superior compression for both
          photos and graphics.
        </p>
        <p>
          For web use, WebP typically reduces file sizes by 25-35% compared to
          JPG at equivalent visual quality. This improves page load times and
          reduces bandwidth usage.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              What image formats can I convert between?
            </p>
            <p>
              This tool supports conversion between PNG, JPG/JPEG, WebP, and GIF
              formats. You can convert from any of these formats to any other
              supported format.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is my image uploaded to a server?</p>
            <p>
              No, all image processing happens entirely in your browser using
              the Canvas API. Your images never leave your device, ensuring
              complete privacy for sensitive images.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What is the difference between PNG and JPG?
            </p>
            <p>
              PNG supports transparency and uses lossless compression, making it
              ideal for graphics, logos, and screenshots. JPG uses lossy
              compression for smaller file sizes, best for photographs. WebP
              offers better compression than both.
            </p>
          </div>

          <div>
            <p className="font-semibold">What quality setting should I use?</p>
            <p>
              For JPG and WebP, 80-90% quality usually provides a good balance
              between file size and visual quality. PNG is lossless so quality
              doesn&apos;t apply. Lower quality means smaller files but more
              compression artifacts.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I convert multiple images at once?
            </p>
            <p>
              Currently, this tool processes one image at a time for optimal
              performance and simplicity. For batch processing, you can convert
              images sequentially.
            </p>
          </div>

          <div>
            <p className="font-semibold">Why should I convert to WebP?</p>
            <p>
              WebP typically produces 25-35% smaller files than JPG at
              equivalent quality, and supports transparency like PNG. It&apos;s
              supported by all modern browsers and is recommended for web use to
              improve page load times.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
