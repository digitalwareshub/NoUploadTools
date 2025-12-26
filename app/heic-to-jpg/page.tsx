"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

export default function HeicToJpgPage() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(90);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  type Heic2AnyFn = (options: {
    blob: Blob;
    toType?: string;
    quality?: number;
  }) => Promise<Blob | Blob[]>;
  const [heic2any, setHeic2any] = useState<Heic2AnyFn | null>(null);
  const [libraryLoading, setLibraryLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamically load heic2any library
  useEffect(() => {
    import("heic2any")
      .then((module) => {
        setHeic2any(() => module.default as Heic2AnyFn);
        setLibraryLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load heic2any:", err);
        setError(
          "Failed to load HEIC conversion library. Please refresh the page."
        );
        setLibraryLoading(false);
      });
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const isHeic =
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");

      if (!isHeic) {
        setError("Please select a HEIC or HEIF file");
        return;
      }

      setError("");
      setConvertedUrl(null);
      setConvertedSize(null);
      setSourceFile(file);
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const isHeic =
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");

      if (isHeic) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files;
          fileInputRef.current.dispatchEvent(
            new Event("change", { bubbles: true })
          );
        }
      } else {
        setError("Please drop a HEIC or HEIF file");
      }
    }
  }, []);

  const convert = useCallback(async () => {
    if (!sourceFile || !heic2any) {
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // Convert HEIC to JPEG blob
      const conversionResult = await heic2any({
        blob: sourceFile,
        toType: "image/jpeg",
        quality: quality / 100
      });

      // heic2any can return a single blob or an array
      const jpegBlob = Array.isArray(conversionResult)
        ? conversionResult[0]
        : conversionResult;

      const url = URL.createObjectURL(jpegBlob);

      if (convertedUrl) {
        URL.revokeObjectURL(convertedUrl);
      }

      setConvertedUrl(url);
      setConvertedSize(jpegBlob.size);
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        "Conversion failed. The file may be corrupted or not a valid HEIC image."
      );
    } finally {
      setProcessing(false);
    }
  }, [sourceFile, quality, heic2any, convertedUrl]);

  const download = useCallback(() => {
    if (!convertedUrl || !sourceFile) {
      return;
    }

    const a = document.createElement("a");
    a.href = convertedUrl;
    const baseName = sourceFile.name.replace(/\.(heic|heif)$/i, "");
    a.download = baseName + ".jpg";
    a.click();
  }, [convertedUrl, sourceFile]);

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
    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
    }
    setSourceFile(null);
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
          HEIC to JPG Converter
        </h1>
        <p className="mt-2 text-gray-700">
          Convert iPhone HEIC photos to JPG format instantly. Make your iOS
          photos compatible with Windows and other devices. 100% browser-based —
          your photos never leave your device.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {libraryLoading && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
            Loading HEIC conversion library...
          </div>
        )}

        {/* File upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".heic,.heif,image/heic,image/heif"
            onChange={handleFileSelect}
            className="hidden"
            id="heic-input"
            disabled={libraryLoading}
          />
          <label
            htmlFor="heic-input"
            className={`cursor-pointer ${libraryLoading ? "opacity-50" : ""}`}
          >
            <div className="text-4xl mb-2">📱</div>
            <p className="text-gray-600">
              Drop a HEIC file here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              HEIC/HEIF files from iPhone • No file size limit
            </p>
          </label>
        </div>

        {/* Source file info */}
        {sourceFile && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-20 h-20 bg-gray-200 rounded border flex items-center justify-center text-2xl">
              📷
            </div>
            <div className="flex-1">
              <p className="font-medium">{sourceFile.name}</p>
              <p className="text-sm text-gray-500">
                {formatSize(sourceFile.size)}
              </p>
              <p className="text-sm text-gray-500">HEIC</p>
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
        {sourceFile && (
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
        {sourceFile && (
          <button
            onClick={convert}
            disabled={processing || libraryLoading}
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
        {convertedUrl && convertedSize !== null && sourceFile && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <div>
                <span className="font-medium">Converted JPG</span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatSize(convertedSize)}
                </span>
                {convertedSize < sourceFile.size && (
                  <span className="text-sm text-green-600 ml-2">
                    ({Math.round((1 - convertedSize / sourceFile.size) * 100)}%
                    smaller)
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
          browser. Your photos never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Convert HEIC to JPG</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Drop or select a HEIC/HEIF file from your iPhone</li>
          <li>Adjust the quality slider if needed</li>
          <li>Click &quot;Convert to JPG&quot;</li>
          <li>Download your converted JPG photo</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About HEIC Format</h2>
        <p>
          HEIC (High Efficiency Image Container) is Apple&apos;s default photo
          format since iOS 11. It uses advanced compression to store photos at
          about half the size of JPG while maintaining the same quality.
        </p>
        <p>
          However, HEIC has limited support outside the Apple ecosystem.
          Windows, Android, and many websites don&apos;t natively support HEIC.
          Converting to JPG ensures your photos work everywhere.
        </p>
        <p>
          <strong>Tip:</strong> You can change your iPhone to save photos as JPG
          instead of HEIC in Settings → Camera → Formats → Most Compatible.
        </p>
      </section>
    </div>
  );
}
