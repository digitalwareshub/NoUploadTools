"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

export default function PngToJpgPage() {
  const [sourceImage, setSourceImage] = useState<{
    file: File;
    url: string;
    width: number;
    height: number;
  } | null>(null);
  const [quality, setQuality] = useState(90);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.includes("png")) {
        setError("Please select a PNG file");
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
          url,
          width: img.width,
          height: img.height
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
    if (file && file.type.includes("png")) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    } else {
      setError("Please drop a PNG file");
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

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // Fill with white background (JPG doesn't support transparency)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Convert to JPG
      const dataUrl = canvas.toDataURL("image/jpeg", quality / 100);

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
  }, [sourceImage, quality, convertedUrl]);

  const download = useCallback(() => {
    if (!convertedUrl || !sourceImage) {
      return;
    }

    const a = document.createElement("a");
    a.href = convertedUrl;
    const baseName = sourceImage.file.name.replace(/\.png$/i, "");
    a.download = baseName + ".jpg";
    a.click();
  }, [convertedUrl, sourceImage]);

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
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          PNG to JPG Converter
        </h1>
        <p className="mt-2 text-gray-700">
          Convert PNG images to JPG format instantly. Reduce file size while
          maintaining quality. 100% browser-based — your images never leave your
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
            accept="image/png"
            onChange={handleFileSelect}
            className="hidden"
            id="png-input"
          />
          <label htmlFor="png-input" className="cursor-pointer">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-gray-600">
              Drop a PNG file here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PNG files only • No file size limit
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
              className="w-20 h-20 object-contain rounded border bg-white"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: "10px 10px",
                backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px"
              }}
            />
            <div className="flex-1">
              <p className="font-medium">{sourceImage.file.name}</p>
              <p className="text-sm text-gray-500">
                {sourceImage.width} × {sourceImage.height} •{" "}
                {formatSize(sourceImage.file.size)}
              </p>
              <p className="text-sm text-gray-500">PNG</p>
            </div>
            <button
              onClick={reset}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Quality slider */}
        {sourceImage && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <label
              htmlFor="quality-slider"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              JPG Quality: {quality}%
            </label>
            <input
              id="quality-slider"
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Smaller file</span>
              <span>Better quality</span>
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
            {processing ? "Converting..." : "Convert to JPG"}
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
                <span className="font-medium">Converted JPG</span>
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
                ⬇️ Download JPG
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
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All conversion happens in your
          browser using the Canvas API. Your images never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Convert PNG to JPG</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Drop or select a PNG image file</li>
          <li>
            Adjust the quality slider (higher = better quality, larger file)
          </li>
          <li>Click &quot;Convert to JPG&quot;</li>
          <li>Download your converted JPG image</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About PNG vs JPG</h2>
        <p>
          PNG (Portable Network Graphics) uses lossless compression and supports
          transparency, making it ideal for logos, graphics, and screenshots.
          However, PNG files are often larger than necessary for photographs.
        </p>
        <p>
          JPG (JPEG) uses lossy compression to achieve much smaller file sizes,
          typically 50-80% smaller than PNG. This makes JPG perfect for
          photographs and web images where file size matters. The trade-off is a
          slight reduction in quality and no transparency support.
        </p>
        <p>
          When you convert PNG to JPG, any transparent areas become white. For
          images with important transparency, consider keeping the PNG format or
          using WebP instead.
        </p>
      </section>
    </div>
  );
}
