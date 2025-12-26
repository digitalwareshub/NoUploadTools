"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ExifRemoverPage() {
  const [sourceImage, setSourceImage] = useState<{
    file: File;
    url: string;
    width: number;
    height: number;
  } | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(95);
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);
  const [cleanedSize, setCleanedSize] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
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
      setCleanedUrl(null);
      setCleanedSize(null);

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
    if (file && file.type.startsWith("image/")) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    } else {
      setError("Please drop an image file");
    }
  }, []);

  const removeExif = useCallback(async () => {
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

      // Create canvas - this automatically strips all EXIF data
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // Fill with white background for JPEG
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw image (EXIF is stripped when using Canvas)
      ctx.drawImage(img, 0, 0);

      // Export as clean image
      const qualityValue =
        outputFormat === "image/png" ? undefined : quality / 100;
      const dataUrl = canvas.toDataURL(outputFormat, qualityValue);

      // Calculate size
      const base64 = dataUrl.split(",")[1];
      const binaryString = atob(base64);
      const bytes = binaryString.length;

      if (cleanedUrl) {
        URL.revokeObjectURL(cleanedUrl);
      }

      setCleanedUrl(dataUrl);
      setCleanedSize(bytes);
    } catch (err) {
      setError("Processing failed: " + (err as Error).message);
    } finally {
      setProcessing(false);
    }
  }, [sourceImage, outputFormat, quality, cleanedUrl]);

  const download = useCallback(() => {
    if (!cleanedUrl || !sourceImage) {
      return;
    }

    const a = document.createElement("a");
    a.href = cleanedUrl;
    const baseName = sourceImage.file.name.replace(/\.[^.]+$/, "");
    const ext =
      outputFormat === "image/jpeg"
        ? "jpg"
        : outputFormat === "image/png"
          ? "png"
          : "webp";
    a.download = `${baseName}_no_exif.${ext}`;
    a.click();
  }, [cleanedUrl, sourceImage, outputFormat]);

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
    if (cleanedUrl) {
      URL.revokeObjectURL(cleanedUrl);
    }
    setSourceImage(null);
    setCleanedUrl(null);
    setCleanedSize(null);
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
          { name: "EXIF Remover" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">EXIF Remover</h1>
        <p className="mt-2 text-gray-700">
          Remove metadata from photos including GPS location, camera info, and
          timestamps. Protect your privacy before sharing images. 100%
          browser-based — your photos never leave your device.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      {/* Warning banner */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>⚠️ Did you know?</strong> Photos contain hidden data like GPS
          coordinates that can reveal where you live or work. Always remove EXIF
          data before sharing photos publicly.
        </p>
      </div>

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
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id="image-input"
          />
          <label htmlFor="image-input" className="cursor-pointer">
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-gray-600">
              Drop an image here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports JPG, PNG, WebP
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
            />
            <div className="flex-1">
              <p className="font-medium">{sourceImage.file.name}</p>
              <p className="text-sm text-gray-500">
                {sourceImage.width} × {sourceImage.height} •{" "}
                {formatSize(sourceImage.file.size)}
              </p>
              <p className="text-sm text-red-600">
                ⚠️ May contain EXIF metadata
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

        {/* Options */}
        {sourceImage && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="format"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Output Format
                </label>
                <select
                  id="format"
                  value={outputFormat}
                  onChange={(e) =>
                    setOutputFormat(e.target.value as OutputFormat)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="image/jpeg">JPG (recommended)</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="quality"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quality: {quality}%
                </label>
                <input
                  id="quality"
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  disabled={outputFormat === "image/png"}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Remove button */}
        {sourceImage && (
          <button
            onClick={removeExif}
            disabled={processing}
            className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300"
          >
            {processing ? "Removing metadata..." : "Remove EXIF Data"}
          </button>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {cleanedUrl && cleanedSize !== null && sourceImage && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <div>
                <span className="font-medium text-green-600">
                  ✓ EXIF Removed
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatSize(cleanedSize)}
                </span>
              </div>
              <button
                onClick={download}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
              >
                ⬇️ Download Clean Image
              </button>
            </div>
            <div className="p-4 bg-white flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cleanedUrl}
                alt="Cleaned"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          </div>
        )}

        {/* What is removed */}
        {cleanedUrl && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm font-medium mb-2">
              ✓ The following metadata has been removed:
            </p>
            <ul className="text-green-700 text-sm grid grid-cols-2 gap-1">
              <li>• GPS coordinates</li>
              <li>• Date/time taken</li>
              <li>• Camera make/model</li>
              <li>• Lens information</li>
              <li>• Exposure settings</li>
              <li>• Software used</li>
              <li>• Embedded thumbnails</li>
              <li>• All other EXIF tags</li>
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All processing happens in your
          browser using the Canvas API. Your photos never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Remove EXIF Data</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Drop or select a photo</li>
          <li>Choose output format and quality</li>
          <li>Click &quot;Remove EXIF Data&quot;</li>
          <li>Download your clean, metadata-free image</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">Why Remove EXIF Data?</h2>
        <p>
          Every photo you take contains hidden information called EXIF metadata.
          This can include sensitive data like GPS coordinates showing exactly
          where the photo was taken, the date and time, and details about your
          device.
        </p>
        <p>
          When you share photos online, this metadata goes with them. Someone
          could potentially extract your home address from vacation photos or
          track your movements from a series of images.
        </p>
        <p>
          By removing EXIF data before sharing, you protect your privacy while
          keeping the image quality intact.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What is EXIF data?</p>
            <p>
              EXIF (Exchangeable Image File Format) is metadata embedded in
              photos that includes camera settings, date/time, GPS location,
              device information, and more. This data can reveal personal
              information you may not want to share.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why should I remove EXIF data from photos?
            </p>
            <p>
              EXIF data can reveal your location (GPS coordinates), when the
              photo was taken, and what device you used. Removing it protects
              your privacy when sharing photos online or with others.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Does removing EXIF affect image quality?
            </p>
            <p>
              Our tool preserves the original image quality. We use the Canvas
              API to redraw the image, which strips all metadata while
              maintaining the visual quality of your photo.
            </p>
          </div>

          <div>
            <p className="font-semibold">Are my photos uploaded to a server?</p>
            <p>
              No, all processing happens entirely in your browser. Your photos
              never leave your device, making this the most private way to
              remove EXIF data.
            </p>
          </div>

          <div>
            <p className="font-semibold">What types of metadata are removed?</p>
            <p>
              All EXIF metadata is removed including: GPS coordinates, date/time
              taken, camera make/model, lens information, exposure settings,
              software used, and any embedded thumbnails.
            </p>
          </div>

          <div>
            <p className="font-semibold">Which image formats are supported?</p>
            <p>
              Our tool supports JPG/JPEG, PNG, and WebP images. The output
              format can be selected, with JPG being the most common choice for
              photos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
