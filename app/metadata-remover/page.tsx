"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type ProcessedFile = {
  id: string;
  originalName: string;
  originalSize: number;
  cleanedBlob: Blob;
  cleanedSize: number;
  type: "image" | "pdf";
};

export default function MetadataRemoverPage() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
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

  const removeImageMetadata = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Could not create blob"));
            }
          },
          file.type === "image/png" ? "image/png" : "image/jpeg",
          0.95
        );
      };
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  const removePdfMetadata = async (file: File): Promise<Blob> => {
    const { PDFDocument } = await import("pdf-lib");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Clear all metadata
    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    pdfDoc.setCreator("");
    pdfDoc.setCreationDate(new Date(0));
    pdfDoc.setModificationDate(new Date(0));

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes.buffer as ArrayBuffer], {
      type: "application/pdf"
    });
  };

  const processFiles = async (fileList: FileList) => {
    setIsProcessing(true);
    setStatus("Processing files...");

    const processed: ProcessedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      if (!isImage && !isPdf) {
        continue;
      }

      try {
        let cleanedBlob: Blob;
        if (isImage) {
          cleanedBlob = await removeImageMetadata(file);
        } else {
          cleanedBlob = await removePdfMetadata(file);
        }

        processed.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          originalName: file.name,
          originalSize: file.size,
          cleanedBlob,
          cleanedSize: cleanedBlob.size,
          type: isImage ? "image" : "pdf"
        });
      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
      }
    }

    setFiles((prev) => [...prev, ...processed]);
    setStatus(
      processed.length > 0
        ? `Cleaned ${processed.length} file(s)`
        : "No valid files found"
    );
    setIsProcessing(false);
  };

  const onSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      void processFiles(fileList);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    if (fileList) {
      void processFiles(fileList);
    }
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const downloadFile = (file: ProcessedFile) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file.cleanedBlob);
    link.download = `cleaned_${file.originalName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const downloadAll = async () => {
    if (files.length === 0) {
      return;
    }

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(`cleaned_${file.originalName}`, file.cleanedBlob);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "cleaned_files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setStatus("Ready");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Metadata Remover (No Upload)
        </h1>
        <p className="text-sm text-gray-700">
          Remove hidden metadata from images and PDFs before sharing. Strip
          EXIF, GPS, and author data. All processing happens locally.
        </p>
      </section>

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
          accept="image/*,.pdf"
          multiple
          className="hidden"
          onChange={onSelectFiles}
        />
        <span className="text-2xl">🔒</span>
        <span className="mt-2 font-semibold">Drop files here</span>
        <span className="mt-1 text-xs text-gray-600">
          or click to choose files
        </span>
        <span className="mt-2 text-xs text-gray-500">
          Images (JPG, PNG) and PDFs supported
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-xs text-gray-700">
          {isProcessing ? "Processing..." : status}
        </span>
      </div>

      {/* Processed Files */}
      {files.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">
              Cleaned Files ({files.length})
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

          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3"
              >
                <div>
                  <div className="font-medium text-sm">{file.originalName}</div>
                  <div className="text-xs text-gray-600">
                    {file.type === "image" ? "🖼️" : "📄"}{" "}
                    {formatFileSize(file.originalSize)} →{" "}
                    {formatFileSize(file.cleanedSize)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => downloadFile(file)}
                    className="rounded border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How to Use */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">How to Use</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Drop or select image/PDF files</li>
          <li>Files are automatically cleaned of metadata</li>
          <li>Download cleaned files individually or as ZIP</li>
        </ol>
      </section>

      {/* What's Removed */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          What&apos;s Removed
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold">From Images:</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>GPS coordinates / location</li>
              <li>Camera make and model</li>
              <li>Date and time taken</li>
              <li>Device identifiers</li>
              <li>Editing software info</li>
              <li>Thumbnail images</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">From PDFs:</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Author name</li>
              <li>Creation/modification dates</li>
              <li>Software used to create</li>
              <li>Title and subject</li>
              <li>Keywords</li>
              <li>Producer info</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>🖼️ Strip EXIF from images</li>
          <li>📄 Clean PDF metadata</li>
          <li>📍 Remove GPS coordinates</li>
          <li>📦 Batch processing</li>
          <li>⚡ Fast, local processing</li>
          <li>🔒 100% private</li>
        </ul>
      </section>
    </div>
  );
}
