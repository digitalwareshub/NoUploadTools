"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

export default function WebpToPngPage() {
  const [sourceImage, setSourceImage] = useState<{
    file: File;
    url: string;
    width: number;
    height: number;
  } | null>(null);
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

      if (!file.type.includes("webp")) {
        setError("Please select a WebP file");
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
    if (file && file.type.includes("webp")) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    } else {
      setError("Please drop a WebP file");
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

      // Draw image (preserves transparency)
      ctx.drawImage(img, 0, 0);

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
  }, [sourceImage, convertedUrl]);

  const download = useCallback(() => {
    if (!convertedUrl || !sourceImage) {
      return;
    }

    const a = document.createElement("a");
    a.href = convertedUrl;
    const baseName = sourceImage.file.name.replace(/\.webp$/i, "");
    a.download = baseName + ".png";
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
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "WebP to PNG" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          WebP to PNG Converter
        </h1>
        <p className="mt-2 text-gray-700">
          Convert WebP images to PNG format instantly. Preserve transparency and
          get lossless PNG files. 100% browser-based — your images never leave
          your device.
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
            accept="image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id="webp-input"
          />
          <label htmlFor="webp-input" className="cursor-pointer">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-gray-600">
              Drop a WebP file here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              WebP files only • No file size limit
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
              <p className="text-sm text-gray-500">WebP</p>
            </div>
            <button
              onClick={reset}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Convert button */}
        {sourceImage && (
          <button
            onClick={convert}
            disabled={processing}
            className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300"
          >
            {processing ? "Converting..." : "Convert to PNG"}
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
                <span className="font-medium">Converted PNG</span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatSize(convertedSize)}
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
          browser using the Canvas API. Your images never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Convert WebP to PNG</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Drop or select a WebP image file</li>
          <li>Click &quot;Convert to PNG&quot;</li>
          <li>Download your converted PNG image</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About WebP vs PNG</h2>
        <p>
          WebP is a modern image format developed by Google that offers superior
          compression for web images. It supports both lossy and lossless
          compression, as well as transparency.
        </p>
        <p>
          PNG (Portable Network Graphics) is a widely supported format that uses
          lossless compression. While PNG files are typically larger than WebP,
          they work with virtually all image editors and older software.
        </p>
        <p>
          Converting WebP to PNG is useful when you need to edit images in
          software that doesn&apos;t support WebP, or when sharing with users
          who may have compatibility issues.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">How do I convert WebP to PNG?</p>
            <p>
              Simply upload your WebP file to our converter and click Convert.
              Your PNG file will be ready to download instantly. No account or
              server upload required.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is this WebP to PNG converter free?</p>
            <p>
              Yes, our WebP to PNG converter is completely free to use with no
              limits. There are no hidden fees, watermarks, or registration
              required.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Does WebP to PNG conversion preserve transparency?
            </p>
            <p>
              Yes, our converter preserves the alpha channel (transparency) from
              WebP images when converting to PNG. PNG supports full
              transparency.
            </p>
          </div>

          <div>
            <p className="font-semibold">Why convert WebP to PNG?</p>
            <p>
              While WebP offers better compression, PNG has wider compatibility
              with older software and image editors. Converting to PNG ensures
              your images work everywhere.
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
            <p className="font-semibold">What is WebP format?</p>
            <p>
              WebP is a modern image format developed by Google that provides
              superior compression for web images. It supports both lossy and
              lossless compression, as well as transparency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
