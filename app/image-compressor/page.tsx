"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type OutputFormat = "jpeg" | "png" | "webp";

type CompressedImage = {
  id: string;
  originalName: string;
  originalSize: number;
  compressedBlob: Blob;
  compressedSize: number;
  previewUrl: string;
};

export default function ImageCompressorPage() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState<number>(0.8);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("jpeg");
  const [status, setStatus] = useState<string>("Ready");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const compressImage = async (file: File): Promise<CompressedImage> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const mimeType =
          outputFormat === "jpeg"
            ? "image/jpeg"
            : outputFormat === "png"
              ? "image/png"
              : "image/webp";

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                id: `${file.name}-${Date.now()}-${Math.random()}`,
                originalName: file.name,
                originalSize: file.size,
                compressedBlob: blob,
                compressedSize: blob.size,
                previewUrl: URL.createObjectURL(blob)
              });
            } else {
              reject(new Error("Could not create blob"));
            }
          },
          mimeType,
          outputFormat === "png" ? undefined : quality
        );
      };
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  const processImages = async (fileList: FileList) => {
    setIsProcessing(true);
    setStatus("Compressing images...");

    const compressed: CompressedImage[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith("image/")) {
        continue;
      }

      try {
        const result = await compressImage(file);
        compressed.push(result);
      } catch (err) {
        console.error(`Error compressing ${file.name}:`, err);
      }
    }

    setImages((prev) => [...prev, ...compressed]);
    setStatus(
      compressed.length > 0
        ? `Compressed ${compressed.length} image(s)`
        : "No valid images found"
    );
    setIsProcessing(false);
  };

  const onSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      void processImages(fileList);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    if (fileList) {
      void processImages(fileList);
    }
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const downloadImage = (img: CompressedImage) => {
    const ext = outputFormat;
    const baseName = img.originalName.replace(/\.[^/.]+$/, "");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(img.compressedBlob);
    link.download = `${baseName}_compressed.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const downloadAll = async () => {
    if (images.length === 0) {
      return;
    }

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    images.forEach((img) => {
      const ext = outputFormat;
      const baseName = img.originalName.replace(/\.[^/.]+$/, "");
      zip.file(`${baseName}_compressed.${ext}`, img.compressedBlob);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "compressed_images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAll = () => {
    setImages([]);
    setStatus("Ready");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const totalSaved = images.reduce(
    (acc, img) => acc + (img.originalSize - img.compressedSize),
    0
  );

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Image Compressor" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Image Compressor (No Upload)
        </h1>
        <p className="text-sm text-gray-700">
          Compress images to reduce file size. Adjust quality and dimensions.
          All processing happens locally in your browser.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Your Files Stay Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>No uploads to servers</li>
          <li>Processing happens in your browser</li>
          <li>Files never leave your device</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      {/* Settings */}
      <div className="grid gap-3 rounded-md border border-gray-200 p-3 text-sm sm:grid-cols-3">
        <div className="space-y-1">
          <label htmlFor="format" className="block text-xs font-semibold">
            Output Format
          </label>
          <select
            id="format"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs"
          >
            <option value="jpeg">JPEG (best compression)</option>
            <option value="webp">WebP (modern, small)</option>
            <option value="png">PNG (lossless)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="quality" className="block text-xs font-semibold">
            Quality: {Math.round(quality * 100)}%
          </label>
          <input
            id="quality"
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
            disabled={outputFormat === "png"}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="maxWidth" className="block text-xs font-semibold">
            Max Width: {maxWidth}px
          </label>
          <input
            id="maxWidth"
            type="range"
            min="320"
            max="3840"
            step="160"
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={preventDefaults}
        onDragEnter={preventDefaults}
        onDragLeave={preventDefaults}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 px-4 py-12 text-sm text-gray-700 transition-colors hover:border-gray-600 hover:bg-gray-100"
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onSelectFiles}
        />
        <span className="text-2xl">📦</span>
        <span className="mt-2 font-semibold">Drop images here</span>
        <span className="mt-1 text-xs text-gray-600">
          or click to choose files
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-xs text-gray-700">
          {isProcessing ? "Processing..." : status}
        </span>
        {totalSaved > 0 && (
          <span className="text-xs text-green-600">
            Total saved: {formatFileSize(totalSaved)}
          </span>
        )}
      </div>

      {/* Compressed Images */}
      {images.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">
              Compressed Images ({images.length})
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={downloadAll}
                className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
              >
                Download All as ZIP
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-md border border-gray-200 bg-white"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.previewUrl}
                    alt={img.originalName}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-2 text-xs">
                  <div className="truncate font-medium">{img.originalName}</div>
                  <div className="text-gray-600">
                    {formatFileSize(img.originalSize)} →{" "}
                    <span className="text-green-600">
                      {formatFileSize(img.compressedSize)}
                    </span>
                    <span className="ml-1">
                      (
                      {Math.round(
                        ((img.originalSize - img.compressedSize) /
                          img.originalSize) *
                          100
                      )}
                      % smaller)
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => downloadImage(img)}
                      className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>📏 Resize dimensions</li>
          <li>🎚️ Adjustable quality</li>
          <li>🔄 Format conversion</li>
          <li>📦 Batch processing</li>
          <li>⚡ Fast, local processing</li>
          <li>🔒 100% private</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              How much can I reduce image file size?
            </p>
            <p>
              Typically 50-80% reduction for photos. Results depend on the
              original image quality and your chosen settings. You can preview
              the result and adjust quality to find the perfect balance.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Does compression reduce image quality?
            </p>
            <p>
              Some quality loss occurs with lossy compression (JPG, WebP). You
              control the quality level - higher settings preserve more detail.
              PNG uses lossless compression, so quality is preserved.
            </p>
          </div>

          <div>
            <p className="font-semibold">What image formats are supported?</p>
            <p>
              We support JPEG/JPG, PNG, and WebP formats. You can also convert
              between formats during compression for optimal file size.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I compress multiple images at once?
            </p>
            <p>
              Yes! You can upload multiple images and compress them all with the
              same settings. Download individually or all as a ZIP file.
            </p>
          </div>

          <div>
            <p className="font-semibold">Are my images uploaded to a server?</p>
            <p>
              No. All compression happens locally in your browser using the
              Canvas API. Your images never leave your device.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What&apos;s the best format for web images?
            </p>
            <p>
              WebP offers the best compression for web use. JPEG is best for
              photos with broad browser support. PNG is best for graphics with
              transparency or text.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
