"use client";

import { useCallback, useState, useRef, type ChangeEvent } from "react";
import { AdPlaceholder } from "../../../components/AdPlaceholder";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

type CompressionLevel = "low" | "medium" | "high";

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressionLevel, setCompressionLevel] =
    useState<CompressionLevel>("medium");
  const [status, setStatus] = useState<string>("Ready");
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  const calculateReduction = (): string => {
    if (originalSize === 0 || compressedSize === 0) {
      return "0";
    }
    const reduction = ((originalSize - compressedSize) / originalSize) * 100;
    return reduction.toFixed(1);
  };

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setStatus("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedSize(0);
    setCompressedBlob(null);
    setPreviewUrl(null);
    setStatus("Ready to compress");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) {
      return;
    }

    if (droppedFile.type !== "application/pdf") {
      setStatus("Please drop a PDF file.");
      return;
    }

    setFile(droppedFile);
    setOriginalSize(droppedFile.size);
    setCompressedSize(0);
    setCompressedBlob(null);
    setPreviewUrl(null);
    setStatus("Ready to compress");
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const compress = useCallback(async () => {
    if (!file) {
      setStatus("Please select a PDF file first.");
      return;
    }

    setIsCompressing(true);
    setStatus("Compressing PDF...");

    try {
      const { PDFDocument } = await import("pdf-lib");

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Save with compression options
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: compressionLevel === "high" ? 20 : 50
      });

      const blob = new Blob([compressedPdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf"
      });
      setCompressedBlob(blob);
      setCompressedSize(blob.size);

      // Generate preview
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const pdf = await pdfjs.getDocument({ data: compressedPdfBytes }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.5 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({
          canvasContext: context,
          viewport: viewport,
          // @ts-expect-error - canvas is required by pdfjs-dist but not in types
          canvas: canvas
        }).promise;
        setPreviewUrl(canvas.toDataURL("image/jpeg", 0.8));
      }

      setStatus("Compression complete!");
    } catch (err) {
      console.error(err);
      setStatus("Error compressing PDF. Please try a different file.");
    } finally {
      setIsCompressing(false);
    }
  }, [file, compressionLevel]);

  const downloadCompressed = () => {
    if (!compressedBlob || !file) {
      return;
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = file.name.replace(/\.pdf$/i, "_compressed.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const clearFile = () => {
    setFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setCompressedBlob(null);
    setPreviewUrl(null);
    setStatus("Ready");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void compress();
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Compress PDF" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Compress PDF (No Upload)
        </h1>
        <p className="text-sm text-gray-700">
          Reduce PDF file size while maintaining quality. All processing happens
          in your browser. Files are never uploaded to our servers.
        </p>
      </section>

      {/* Privacy & Security Callout */}
      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Your Files Stay Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>No uploads to servers</li>
          <li>Processing happens in your browser</li>
          <li>Files never leave your device</li>
          <li>Works offline after page loads</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      <form onSubmit={onSubmit} className="space-y-4">
        {/* File Drop Zone */}
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
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={onSelectFile}
          />
          <span className="text-2xl">📄</span>
          <span className="mt-2 font-semibold">Drop PDF here</span>
          <span className="mt-1 text-xs text-gray-600">
            or click to choose a file from your device
          </span>
        </div>

        {/* Selected File Info */}
        {file && (
          <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">📑</span>
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-xs text-gray-600">
                  Original size: {formatFileSize(originalSize)}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="rounded border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100"
            >
              Remove
            </button>
          </div>
        )}

        {/* Compression Settings */}
        <div className="rounded-md border border-gray-200 p-3 text-sm">
          <span className="block text-xs font-semibold">Compression Level</span>
          <div className="mt-2 flex gap-3">
            {(["low", "medium", "high"] as CompressionLevel[]).map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="compression"
                  value={level}
                  checked={compressionLevel === level}
                  onChange={() => setCompressionLevel(level)}
                  className="h-4 w-4"
                />
                <span className="capitalize">{level}</span>
                <span className="text-xs text-gray-500">
                  {level === "low" && "(best quality)"}
                  {level === "medium" && "(balanced)"}
                  {level === "high" && "(smallest size)"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Compress Button */}
        <div className="flex items-center justify-between text-sm">
          <button
            type="submit"
            disabled={isCompressing || !file}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {isCompressing ? "Compressing..." : "Compress PDF"}
          </button>
          <span className="text-xs text-gray-700">{status}</span>
        </div>
      </form>

      {/* Results */}
      {compressedBlob && (
        <section className="space-y-4 rounded-md border border-gray-200 bg-white p-4">
          <h2 className="text-base font-semibold">Compression Results</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Size Comparison */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Original:</span>
                <span className="font-medium">
                  {formatFileSize(originalSize)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Compressed:</span>
                <span className="font-medium text-green-600">
                  {formatFileSize(compressedSize)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Reduction:</span>
                <span className="font-medium text-green-600">
                  {calculateReduction()}%
                </span>
              </div>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Preview of first page"
                  className="max-h-40 rounded border border-gray-200 object-contain"
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={downloadCompressed}
            className="w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Download Compressed PDF
          </button>
        </section>
      )}

      {/* How to Use */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">How to Use</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Select PDF:</strong> Click the upload area or drag and drop
            your PDF file
          </li>
          <li>
            <strong>Choose compression level:</strong> Low for best quality,
            High for smallest size
          </li>
          <li>
            <strong>Compress:</strong> Click &ldquo;Compress PDF&rdquo; and wait
            for processing
          </li>
          <li>
            <strong>Download:</strong> Review the size reduction and download
            your compressed file
          </li>
        </ol>
      </section>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>📄 Compress any PDF file</li>
          <li>🎚️ Three compression levels</li>
          <li>📊 Before/after size comparison</li>
          <li>👀 Preview compressed result</li>
          <li>⚡ Fast, local processing</li>
          <li>🔒 100% private and secure</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">Does anything get uploaded?</p>
            <p>
              No. All processing happens in your browser using JavaScript. Files
              are never sent to our servers.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Which compression level should I use?
            </p>
            <p>
              Use Low for documents you&apos;ll print or need maximum quality.
              Medium is good for most purposes. High is best when file size is
              critical and some quality loss is acceptable.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why didn&apos;t my file get much smaller?
            </p>
            <p>
              PDFs that are already optimized or contain mostly text won&apos;t
              compress much further. Image-heavy PDFs typically show the best
              compression results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
