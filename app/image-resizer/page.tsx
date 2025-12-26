"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageResizerPage() {
  const [sourceImage, setSourceImage] = useState<{
    file: File;
    url: string;
    width: number;
    height: number;
  } | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(90);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aspectRatio = useRef<number>(1);

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
        aspectRatio.current = img.width / img.height;
        setSourceImage({
          file,
          url,
          width: img.width,
          height: img.height
        });
        setTargetWidth(img.width);
        setTargetHeight(img.height);
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

  const handleWidthChange = useCallback(
    (value: number) => {
      setTargetWidth(value);
      if (lockAspectRatio && aspectRatio.current) {
        setTargetHeight(Math.round(value / aspectRatio.current));
      }
    },
    [lockAspectRatio]
  );

  const handleHeightChange = useCallback(
    (value: number) => {
      setTargetHeight(value);
      if (lockAspectRatio && aspectRatio.current) {
        setTargetWidth(Math.round(value * aspectRatio.current));
      }
    },
    [lockAspectRatio]
  );

  const resize = useCallback(async () => {
    if (!sourceImage || targetWidth <= 0 || targetHeight <= 0) {
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
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      // Fill with white background for JPEG
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw resized image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Convert to selected format
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
      setError("Resize failed: " + (err as Error).message);
    } finally {
      setProcessing(false);
    }
  }, [
    sourceImage,
    targetWidth,
    targetHeight,
    outputFormat,
    quality,
    convertedUrl
  ]);

  const download = useCallback(() => {
    if (!convertedUrl || !sourceImage) {
      return;
    }

    const a = document.createElement("a");
    a.href = convertedUrl;
    const baseName = sourceImage.file.name.replace(/\.[^.]+$/, "");
    const ext =
      outputFormat === "image/jpeg"
        ? "jpg"
        : outputFormat === "image/png"
          ? "png"
          : "webp";
    a.download = `${baseName}_${targetWidth}x${targetHeight}.${ext}`;
    a.click();
  }, [convertedUrl, sourceImage, outputFormat, targetWidth, targetHeight]);

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
    setTargetWidth(0);
    setTargetHeight(0);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Preset sizes
  const presets = [
    { label: "50%", factor: 0.5 },
    { label: "75%", factor: 0.75 },
    { label: "150%", factor: 1.5 },
    { label: "200%", factor: 2 }
  ];

  const applyPreset = (factor: number) => {
    if (!sourceImage) {
      return;
    }
    setTargetWidth(Math.round(sourceImage.width * factor));
    setTargetHeight(Math.round(sourceImage.height * factor));
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Image Resizer" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Image Resizer</h1>
        <p className="mt-2 text-gray-700">
          Resize images to any dimension instantly. Maintain aspect ratio,
          adjust quality, and choose output format. 100% browser-based — your
          images never leave your device.
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
            id="image-input"
          />
          <label htmlFor="image-input" className="cursor-pointer">
            <div className="text-4xl mb-2">📐</div>
            <p className="text-gray-600">
              Drop an image here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports JPG, PNG, WebP, GIF
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
                Original: {sourceImage.width} × {sourceImage.height} •{" "}
                {formatSize(sourceImage.file.size)}
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

        {/* Resize controls */}
        {sourceImage && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            {/* Presets */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Quick Presets
              </span>
              <div className="flex gap-2 flex-wrap">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset.factor)}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
                  >
                    {preset.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setTargetWidth(sourceImage.width);
                    setTargetHeight(sourceImage.height);
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
                >
                  Original
                </button>
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="width"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Width (px)
                </label>
                <input
                  id="width"
                  type="number"
                  min="1"
                  max="10000"
                  value={targetWidth}
                  onChange={(e) =>
                    handleWidthChange(parseInt(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Height (px)
                </label>
                <input
                  id="height"
                  type="number"
                  min="1"
                  max="10000"
                  value={targetHeight}
                  onChange={(e) =>
                    handleHeightChange(parseInt(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Lock aspect ratio */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lockAspectRatio}
                onChange={(e) => setLockAspectRatio(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                🔗 Lock aspect ratio
              </span>
            </label>

            {/* Output format */}
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
                  <option value="image/jpeg">JPG</option>
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

        {/* Resize button */}
        {sourceImage && (
          <button
            onClick={resize}
            disabled={processing || targetWidth <= 0 || targetHeight <= 0}
            className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300"
          >
            {processing
              ? "Resizing..."
              : `Resize to ${targetWidth} × ${targetHeight}`}
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
                <span className="font-medium">
                  Resized: {targetWidth} × {targetHeight}
                </span>
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
                ⬇️ Download
              </button>
            </div>
            <div className="p-4 bg-white flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={convertedUrl}
                alt="Resized"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All resizing happens in your
          browser using the Canvas API. Your images never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Resize Images</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Drop or select an image file</li>
          <li>Use presets or enter custom dimensions</li>
          <li>Choose output format and quality</li>
          <li>Click Resize and download your image</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">Tips for Resizing</h2>
        <p>
          <strong>Reducing size</strong> generally maintains quality well.
          Images can be scaled down significantly without visible quality loss.
        </p>
        <p>
          <strong>Enlarging images</strong> can reduce quality as the browser
          must interpolate new pixels. For best results, avoid enlarging more
          than 150-200% of the original size.
        </p>
        <p>
          <strong>Aspect ratio</strong> keeps your images proportional. Unlock
          it only if you specifically want to stretch or squash the image.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">How do I resize an image online?</p>
            <p>
              Upload your image, enter the desired width and/or height, and
              click Resize. Your resized image will be ready to download
              instantly. All processing happens in your browser.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is this image resizer free?</p>
            <p>
              Yes, our image resizer is completely free with no limits on the
              number of images you can resize. No registration or watermarks.
            </p>
          </div>

          <div>
            <p className="font-semibold">Are my images uploaded to a server?</p>
            <p>
              No, all processing happens entirely in your browser using the
              Canvas API. Your images never leave your device, ensuring complete
              privacy.
            </p>
          </div>

          <div>
            <p className="font-semibold">What image formats are supported?</p>
            <p>
              Our resizer supports all common image formats including JPG/JPEG,
              PNG, WebP, and GIF. You can also choose the output format.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I maintain the aspect ratio when resizing?
            </p>
            <p>
              Yes, there&apos;s an option to lock the aspect ratio. When
              enabled, changing the width will automatically adjust the height
              proportionally, and vice versa.
            </p>
          </div>

          <div>
            <p className="font-semibold">Will resizing affect image quality?</p>
            <p>
              Enlarging images can reduce quality as the browser interpolates
              new pixels. Reducing size generally maintains quality. You can
              adjust the output quality for JPG and WebP formats.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
