"use client";

import { useCallback, useState, useRef, type ChangeEvent } from "react";
import { AdPlaceholder } from "../../../components/AdPlaceholder";

type ImageFormat = "jpg" | "png";
type ConvertedPage = {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  fileName: string;
};

export default function PdfToImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState<string>("");
  const [format, setFormat] = useState<ImageFormat>("jpg");
  const [quality, setQuality] = useState<number>(0.9);
  const [scale, setScale] = useState<number>(2);
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);
  const [status, setStatus] = useState<string>("Ready");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number }>({
    current: 0,
    total: 0
  });
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
    setFileSize(formatFileSize(selectedFile.size));
    setConvertedPages([]);
    setStatus("Ready to convert");
    setProgress({ current: 0, total: 0 });
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
    setFileSize(formatFileSize(droppedFile.size));
    setConvertedPages([]);
    setStatus("Ready to convert");
    setProgress({ current: 0, total: 0 });
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const convert = useCallback(async () => {
    if (!file) {
      setStatus("Please select a PDF file first.");
      return;
    }

    setIsConverting(true);
    setConvertedPages([]);
    setStatus("Loading PDF...");

    try {
      // Dynamically import pdfjs-dist
      const pdfjs = await import("pdfjs-dist");

      // Set worker source
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      setProgress({ current: 0, total: numPages });
      setStatus(`Converting ${numPages} page${numPages > 1 ? "s" : ""}...`);

      const pages: ConvertedPage[] = [];
      const baseName = file.name.replace(/\.pdf$/i, "");

      for (let i = 1; i <= numPages; i++) {
        setProgress({ current: i, total: numPages });
        setStatus(`Converting page ${i} of ${numPages}...`);

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Could not get canvas context");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Fill with white background for JPG (which doesn't support transparency)
        if (format === "jpg") {
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas
        }).promise;

        const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
        const dataUrl = canvas.toDataURL(
          mimeType,
          format === "jpg" ? quality : undefined
        );

        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        const fileName = `${baseName}_page_${i}.${format}`;

        pages.push({
          pageNumber: i,
          dataUrl,
          blob,
          fileName
        });
      }

      setConvertedPages(pages);
      setStatus(`Done! Converted ${numPages} page${numPages > 1 ? "s" : ""}.`);
    } catch (err) {
      console.error(err);
      setStatus("Error converting PDF. Please try a different file.");
    } finally {
      setIsConverting(false);
    }
  }, [file, format, quality, scale]);

  const downloadPage = (page: ConvertedPage) => {
    const link = document.createElement("a");
    link.href = page.dataUrl;
    link.download = page.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllAsZip = async () => {
    if (convertedPages.length === 0) {
      return;
    }

    setStatus("Creating ZIP file...");

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      convertedPages.forEach((page) => {
        zip.file(page.fileName, page.blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const baseName = file?.name.replace(/\.pdf$/i, "") || "converted";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `${baseName}_images.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      setStatus("ZIP downloaded successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Error creating ZIP file.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileSize("");
    setConvertedPages([]);
    setStatus("Ready");
    setProgress({ current: 0, total: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void convert();
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          PDF to Image Converter (No Upload)
        </h1>
        <p className="text-sm text-gray-700">
          Convert PDF pages to JPG or PNG images. All processing happens in your
          browser. Files are never uploaded to our servers.
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
          <span className="mt-2 text-xs text-gray-500">PDF files only</span>
        </div>

        {/* Selected File Info */}
        {file && (
          <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">📑</span>
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-xs text-gray-600">{fileSize}</div>
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

        {/* Conversion Settings */}
        <div className="grid gap-3 rounded-md border border-gray-200 p-3 text-sm sm:grid-cols-3">
          <div className="space-y-1">
            <label htmlFor="format" className="block text-xs font-semibold">
              Output Format
            </label>
            <select
              id="format"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs"
              value={format}
              onChange={(e) => setFormat(e.target.value as ImageFormat)}
            >
              <option value="jpg">JPG (smaller size)</option>
              <option value="png">PNG (lossless)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="scale" className="block text-xs font-semibold">
              Resolution Scale
            </label>
            <select
              id="scale"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            >
              <option value="1">1x (faster)</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x (recommended)</option>
              <option value="3">3x (high quality)</option>
            </select>
          </div>
          {format === "jpg" && (
            <div className="space-y-1">
              <label htmlFor="quality" className="block text-xs font-semibold">
                JPG Quality: {Math.round(quality * 100)}%
              </label>
              <input
                id="quality"
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isConverting && progress.total > 0 && (
          <div className="space-y-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{
                  width: `${(progress.current / progress.total) * 100}%`
                }}
              />
            </div>
            <div className="text-center text-xs text-gray-600">
              {progress.current} of {progress.total} pages
            </div>
          </div>
        )}

        {/* Convert Button */}
        <div className="flex items-center justify-between text-sm">
          <button
            type="submit"
            disabled={isConverting || !file}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {isConverting ? "Converting..." : "Convert to Images"}
          </button>
          <span className="text-xs text-gray-700">{status}</span>
        </div>
      </form>

      {/* Converted Pages Preview */}
      {convertedPages.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">
              Converted Pages ({convertedPages.length})
            </h2>
            <button
              type="button"
              onClick={downloadAllAsZip}
              className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
            >
              Download All as ZIP
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {convertedPages.map((page) => (
              <div
                key={page.pageNumber}
                className="overflow-hidden rounded-md border border-gray-200 bg-white"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.dataUrl}
                    alt={`Page ${page.pageNumber}`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 p-2">
                  <span className="text-xs text-gray-600">
                    Page {page.pageNumber} ({formatFileSize(page.blob.size)})
                  </span>
                  <button
                    type="button"
                    onClick={() => downloadPage(page)}
                    className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
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
            <strong>Choose settings:</strong> Select output format (JPG/PNG),
            resolution scale, and quality
          </li>
          <li>
            <strong>Convert:</strong> Click &ldquo;Convert to Images&rdquo; and
            wait for processing
          </li>
          <li>
            <strong>Download:</strong> Download individual pages or all images
            as a ZIP file
          </li>
        </ol>
      </section>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>📄 Convert any PDF to images</li>
          <li>🖼️ Choose JPG or PNG format</li>
          <li>📏 Adjustable resolution (1x to 3x)</li>
          <li>🎚️ Control JPG quality</li>
          <li>👀 Preview before download</li>
          <li>📦 Download all as ZIP</li>
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
              No. All processing happens in your browser using PDF.js. Files are
              never sent to our servers. You can even disconnect from the
              internet after the page loads and the tool will still work.
            </p>
          </div>

          <div>
            <p className="font-semibold">Which format should I choose?</p>
            <p>
              Use JPG for smaller file sizes, especially for photos or scanned
              documents. Choose PNG for documents with text, diagrams, or when
              you need the highest quality with no compression artifacts.
            </p>
          </div>

          <div>
            <p className="font-semibold">What resolution scale should I use?</p>
            <p>
              2x is recommended for most uses, providing a good balance of
              quality and file size. Use 3x for documents you plan to print or
              zoom into. Use 1x for quick previews or when file size matters
              most.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why is conversion slow for large PDFs?
            </p>
            <p>
              Each page must be rendered and converted individually in your
              browser. Large PDFs or high resolution settings require more
              processing time. The progress bar shows you the current status.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I convert password-protected PDFs?
            </p>
            <p>
              Currently, password-protected PDFs are not supported. You would
              need to remove the password protection first using another tool.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What happens to my files after conversion?
            </p>
            <p>
              Nothing. The files stay in your browser&apos;s memory only during
              the conversion process. Once you close or refresh the page,
              everything is cleared. No data is stored anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Troubleshooting
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              The conversion fails or page freezes
            </p>
            <p>
              This usually happens with very large PDFs or high resolution
              settings. Try reducing the resolution scale to 1x or 1.5x. Close
              other browser tabs to free up memory.
            </p>
          </div>

          <div>
            <p className="font-semibold">Images appear blurry</p>
            <p>
              Increase the resolution scale to 2x or 3x for sharper output. Keep
              in mind this will increase processing time and file sizes.
            </p>
          </div>

          <div>
            <p className="font-semibold">File sizes are too large</p>
            <p>
              Use JPG format instead of PNG, reduce the quality slider, or lower
              the resolution scale. JPG at 80% quality typically provides good
              results with smaller files.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
