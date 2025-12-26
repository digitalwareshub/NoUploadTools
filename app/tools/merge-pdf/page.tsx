"use client";

import { useCallback, useState, useRef, type ChangeEvent } from "react";
import { AdPlaceholder } from "../../../components/AdPlaceholder";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

type PdfFile = {
  id: string;
  file: File;
  name: string;
  pageCount: number;
  previewUrl: string | null;
};

export default function MergePdfPage() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [status, setStatus] = useState<string>("Ready");
  const [isMerging, setIsMerging] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
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

  const generatePreview = async (
    arrayBuffer: ArrayBuffer
  ): Promise<string | null> => {
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.3 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        return null;
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
        // @ts-expect-error - canvas is required by pdfjs-dist but not in types
        canvas: canvas
      }).promise;

      return canvas.toDataURL("image/jpeg", 0.7);
    } catch {
      return null;
    }
  };

  const processFile = async (file: File): Promise<PdfFile | null> => {
    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const previewUrl = await generatePreview(arrayBuffer);

      return {
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        pageCount: pdf.numPages,
        previewUrl
      };
    } catch {
      return null;
    }
  };

  const onSelectFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) {
      return;
    }

    setStatus("Processing files...");
    const newFiles: PdfFile[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.type !== "application/pdf") {
        continue;
      }
      const processed = await processFile(file);
      if (processed) {
        newFiles.push(processed);
      }
    }

    setFiles((prev) => {
      const updated = [...prev, ...newFiles];
      const total = updated.reduce((sum, f) => sum + f.pageCount, 0);
      setTotalPages(total);
      return updated;
    });

    setMergedBlob(null);
    setStatus(newFiles.length > 0 ? "Ready to merge" : "No valid PDFs found");
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles) {
      return;
    }

    setStatus("Processing files...");
    const newFiles: PdfFile[] = [];

    for (let i = 0; i < droppedFiles.length; i++) {
      const file = droppedFiles[i];
      if (file.type !== "application/pdf") {
        continue;
      }
      const processed = await processFile(file);
      if (processed) {
        newFiles.push(processed);
      }
    }

    setFiles((prev) => {
      const updated = [...prev, ...newFiles];
      const total = updated.reduce((sum, f) => sum + f.pageCount, 0);
      setTotalPages(total);
      return updated;
    });

    setMergedBlob(null);
    setStatus(newFiles.length > 0 ? "Ready to merge" : "No valid PDFs found");
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const moveFile = (id: string, direction: "up" | "down") => {
    setFiles((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index === -1) {
        return prev;
      }
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) {
        return prev;
      }
      const newFiles = [...prev];
      const [item] = newFiles.splice(index, 1);
      newFiles.splice(targetIndex, 0, item);
      return newFiles;
    });
    setMergedBlob(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      const total = updated.reduce((sum, f) => sum + f.pageCount, 0);
      setTotalPages(total);
      return updated;
    });
    setMergedBlob(null);
  };

  const merge = useCallback(async () => {
    if (files.length < 2) {
      setStatus("Please add at least 2 PDF files to merge.");
      return;
    }

    setIsMerging(true);
    setStatus("Merging PDFs...");

    try {
      const { PDFDocument } = await import("pdf-lib");

      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf"
      });

      setMergedBlob(blob);
      setStatus(`Merged ${files.length} PDFs (${totalPages} pages total)`);
    } catch (err) {
      console.error(err);
      setStatus("Error merging PDFs. Please try different files.");
    } finally {
      setIsMerging(false);
    }
  }, [files, totalPages]);

  const downloadMerged = () => {
    if (!mergedBlob) {
      return;
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(mergedBlob);
    link.download = "merged.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const clearAll = () => {
    setFiles([]);
    setTotalPages(0);
    setMergedBlob(null);
    setStatus("Ready");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void merge();
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Merge PDF" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Merge PDF Files (No Upload)
        </h1>
        <p className="text-sm text-gray-700">
          Combine multiple PDF files into one document. Drag to reorder. All
          processing happens in your browser.
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
            multiple
            className="hidden"
            onChange={onSelectFiles}
          />
          <span className="text-2xl">📑</span>
          <span className="mt-2 font-semibold">Drop PDF files here</span>
          <span className="mt-1 text-xs text-gray-600">
            or click to choose files from your device
          </span>
          <span className="mt-2 text-xs text-gray-500">
            Select multiple PDF files
          </span>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Selected PDFs ({files.length} files, {totalPages} pages total)
              </h2>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                Clear all
              </button>
            </div>
            <ul className="space-y-2 text-sm">
              {files.map((f, index) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-2"
                >
                  <div className="flex items-center gap-3">
                    {f.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={f.previewUrl}
                        alt={`Preview of ${f.name}`}
                        className="h-12 w-10 rounded border border-gray-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-10 items-center justify-center rounded border border-gray-200 bg-gray-100 text-lg">
                        📄
                      </div>
                    )}
                    <div>
                      <div
                        className="truncate font-medium"
                        style={{ maxWidth: "200px" }}
                      >
                        {f.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {f.pageCount} page{f.pageCount !== 1 ? "s" : ""} •{" "}
                        {formatFileSize(f.file.size)} • Position {index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveFile(f.id, "up")}
                      disabled={index === 0}
                      className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFile(f.id, "down")}
                      disabled={index === files.length - 1}
                      className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(f.id)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Merge Button */}
        <div className="flex items-center justify-between text-sm">
          <button
            type="submit"
            disabled={isMerging || files.length < 2}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {isMerging ? "Merging..." : "Merge PDFs"}
          </button>
          <span className="text-xs text-gray-700">{status}</span>
        </div>
      </form>

      {/* Download Result */}
      {mergedBlob && (
        <section className="rounded-md border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Merged PDF Ready</h2>
              <p className="text-sm text-gray-600">
                {files.length} files • {totalPages} pages •{" "}
                {formatFileSize(mergedBlob.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={downloadMerged}
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Download Merged PDF
            </button>
          </div>
        </section>
      )}

      {/* How to Use */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">How to Use</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Select PDFs:</strong> Click the upload area or drag and drop
            multiple PDF files
          </li>
          <li>
            <strong>Arrange order:</strong> Use the up/down arrows to reorder
            files as needed
          </li>
          <li>
            <strong>Merge:</strong> Click &ldquo;Merge PDFs&rdquo; to combine
            them
          </li>
          <li>
            <strong>Download:</strong> Get your merged PDF file
          </li>
        </ol>
      </section>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>📑 Merge unlimited PDFs</li>
          <li>🔄 Drag to reorder files</li>
          <li>👀 Preview first page of each</li>
          <li>📊 Shows total page count</li>
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
            <p className="font-semibold">Is there a limit to file count?</p>
            <p>
              There&apos;s no hard limit, but very large merges may use
              significant memory. For many large PDFs, consider merging in
              batches.
            </p>
          </div>

          <div>
            <p className="font-semibold">Will quality be affected?</p>
            <p>
              No, merging is lossless. All content, images, and formatting from
              original PDFs are preserved exactly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
