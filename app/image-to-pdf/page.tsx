"use client";

import { PDFDocument, StandardFonts } from "pdf-lib";
import { useCallback, useState, type ChangeEvent } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type SelectedFile = {
  id: string;
  file: File;
  previewUrl: string;
};

type PageSize = "A4" | "Letter" | "Fit";
type Orientation = "Portrait" | "Landscape" | "Auto";
type Margin = "None" | "Small" | "Medium";

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Auto");
  const [margin, setMargin] = useState<Margin>("Small");
  const [status, setStatus] = useState<string>("Ready");
  const [isConverting, setIsConverting] = useState(false);

  const onSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files;
    if (!list) {
      return;
    }
    const next: SelectedFile[] = [];
    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      if (!file.type.startsWith("image/")) {
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file)
      });
    }
    setFiles((prev) => [...prev, ...next]);
    setStatus("Ready");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const list = e.dataTransfer.files;
    if (!list) {
      return;
    }
    const next: SelectedFile[] = [];
    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      if (!file.type.startsWith("image/")) {
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file)
      });
    }
    setFiles((prev) => [...prev, ...next]);
    setStatus("Ready");
  };

  const move = (id: string, direction: "up" | "down") => {
    setFiles((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index === -1) {
        return prev;
      }
      const next = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) {
        return prev;
      }
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      return next;
    });
  };

  const remove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const convert = useCallback(async () => {
    if (!files.length) {
      setStatus("Add at least one image first.");
      return;
    }
    setIsConverting(true);
    setStatus("Converting…");

    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      for (const item of files) {
        const bytes = await item.file.arrayBuffer();
        const ext = item.file.type;
        let image;
        if (ext === "image/jpeg" || ext === "image/jpg") {
          image = await pdfDoc.embedJpg(bytes);
        } else {
          image = await pdfDoc.embedPng(bytes);
        }

        const imgWidth = image.width;
        const imgHeight = image.height;

        let pageWidth = 595.28; // A4 default
        let pageHeight = 841.89;

        if (pageSize === "Letter") {
          pageWidth = 612;
          pageHeight = 792;
        } else if (pageSize === "Fit") {
          pageWidth = imgWidth;
          pageHeight = imgHeight;
        }

        // orientation
        const isLandscapeImage = imgWidth > imgHeight;
        let finalWidth = pageWidth;
        let finalHeight = pageHeight;

        if (orientation === "Landscape") {
          [finalWidth, finalHeight] = [pageHeight, pageWidth];
        } else if (orientation === "Auto" && isLandscapeImage) {
          [finalWidth, finalHeight] = [pageHeight, pageWidth];
        }

        let marginValue = 0;
        if (margin === "Small") {
          marginValue = 20;
        }
        if (margin === "Medium") {
          marginValue = 40;
        }

        const page = pdfDoc.addPage([finalWidth, finalHeight]);

        const maxWidth = finalWidth - marginValue * 2;
        const maxHeight = finalHeight - marginValue * 2;

        const widthScale = maxWidth / imgWidth;
        const heightScale = maxHeight / imgHeight;
        const scale = Math.min(widthScale, heightScale, 1);

        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;

        const x = (finalWidth - drawWidth) / 2;
        const y = (finalHeight - drawHeight) / 2;

        page.drawImage(image, {
          x,
          y,
          width: drawWidth,
          height: drawHeight
        });

        page.setFont(font);
        page.setFontSize(6);
        page.drawText("Generated locally with NoUploadTools", {
          x: marginValue,
          y: marginValue / 2,
          opacity: 0.4
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images-to-pdf.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus("Done. PDF downloaded.");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong while creating the PDF.");
    } finally {
      setIsConverting(false);
    }
  }, [files, pageSize, orientation, margin]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void convert();
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Image to PDF" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Image to PDF (No Upload)
        </h1>
        <p className="text-sm text-gray-700">
          Convert JPG and PNG images into a single PDF. All processing happens
          in your browser. Files are never uploaded to our servers.
        </p>
      </section>

      {/* Privacy & Security Callout */}
      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">🔒 Your Files Stay Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>✓ No uploads to servers</li>
          <li>✓ Processing happens in your browser</li>
          <li>✓ Files never leave your device</li>
          <li>✓ Works offline after page loads</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      <form onSubmit={onSubmit} className="space-y-4">
        <div
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={preventDefaults}
          onDragEnter={preventDefaults}
          onDragLeave={preventDefaults}
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 px-4 py-12 text-sm text-gray-700 transition-colors hover:border-gray-600 hover:bg-gray-100"
          onClick={() => {
            const input = document.getElementById("file-input");
            (input as HTMLInputElement | null)?.click();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              const input = document.getElementById("file-input");
              (input as HTMLInputElement | null)?.click();
            }
          }}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onSelectFiles}
          />
          <span className="text-2xl">📁</span>
          <span className="mt-2 font-semibold">Drop images here</span>
          <span className="mt-1 text-xs text-gray-600">
            or click to choose files from your device
          </span>
          <span className="mt-2 text-xs text-gray-500">
            Supports JPG and PNG files
          </span>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-tight">
              Selected images
            </h2>
            <ul className="space-y-2 text-sm">
              {files.map((f, index) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between rounded-md border border-gray-200 p-2"
                >
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.previewUrl}
                      alt={f.file.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div className="space-y-1">
                      <div className="truncate text-xs font-medium">
                        {f.file.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        Position {index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => move(f.id, "up")}
                      className="rounded border border-gray-300 px-2 py-1"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() => move(f.id, "down")}
                      className="rounded border border-gray-300 px-2 py-1"
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(f.id)}
                      className="rounded border border-gray-300 px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-3 rounded-md border border-gray-200 p-3 text-sm sm:grid-cols-3">
          <div className="space-y-1">
            <label htmlFor="page-size" className="block text-xs font-semibold">
              Page size
            </label>
            <select
              id="page-size"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as PageSize)}
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
              <option value="Fit">Fit to image</option>
            </select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="orientation"
              className="block text-xs font-semibold"
            >
              Orientation
            </label>
            <select
              id="orientation"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs"
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as Orientation)}
            >
              <option value="Auto">Auto</option>
              <option value="Portrait">Portrait</option>
              <option value="Landscape">Landscape</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="margin" className="block text-xs font-semibold">
              Margin
            </label>
            <select
              id="margin"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs"
              value={margin}
              onChange={(e) => setMargin(e.target.value as Margin)}
            >
              <option value="None">None</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <button
            type="submit"
            disabled={isConverting}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {isConverting ? "Converting…" : "Convert to PDF"}
          </button>
          <span className="text-xs text-gray-700">{status}</span>
        </div>
      </form>

      {/* How to Use */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          📋 How to Use
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Select images:</strong> Click the upload area or drag and
            drop JPG/PNG images
          </li>
          <li>
            <strong>Arrange order:</strong> Use Up/Down buttons to reorder pages
            in your PDF
          </li>
          <li>
            <strong>Configure settings:</strong> Choose page size, orientation,
            and margins
          </li>
          <li>
            <strong>Convert:</strong> Click &ldquo;Convert to PDF&rdquo; and
            your file will download automatically
          </li>
        </ol>
      </section>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">⭐ Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>📄 Combine multiple images into one PDF</li>
          <li>🔄 Reorder pages with drag controls</li>
          <li>📏 A4, Letter, or Fit-to-image sizing</li>
          <li>🔄 Auto, Portrait, or Landscape orientation</li>
          <li>📐 Adjustable margins (None, Small, Medium)</li>
          <li>🖼️ Supports JPG and PNG formats</li>
          <li>⚡ Fast, instant conversion</li>
          <li>🔒 100% private and secure</li>
        </ul>
      </section>

      {/* FAQ */}
      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          ❓ Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">Does anything get uploaded?</p>
            <p>
              No. All processing happens in your browser using JavaScript. Files
              are never sent to our servers. You can even disconnect from the
              internet after the page loads and the tool will still work.
            </p>
          </div>

          <div>
            <p className="font-semibold">What image formats are supported?</p>
            <p>
              Currently JPG and PNG formats are supported. These are the most
              common image formats. The tool automatically detects the format
              and processes it correctly.
            </p>
          </div>

          <div>
            <p className="font-semibold">Can I use this offline?</p>
            <p>
              After the page has fully loaded once, your browser can usually run
              the tool again without a network connection, as long as it keeps
              the files cached.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is there a file size limit?</p>
            <p>
              Large images require more memory, and every browser has practical
              limits. If you try to convert extremely large images or many pages
              at once, you may hit those limits. For best results, use images
              under 10MB each and convert fewer than 50 images at a time.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I adjust the quality or compress the PDF?
            </p>
            <p>
              The current version embeds images at their original quality. The
              resulting PDF size depends on your source images. To reduce file
              size, compress your images before converting, or use smaller page
              sizes like A4 instead of &ldquo;Fit to image&rdquo;.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What happens to my images after conversion?
            </p>
            <p>
              Nothing. The images stay in your browser&apos;s memory only during
              the conversion process. Once you close or refresh the page,
              everything is cleared. No data is stored anywhere.
            </p>
          </div>

          <div>
            <p className="font-semibold">Can I convert a PDF back to images?</p>
            <p>
              Yes, we have a separate &ldquo;PDF to Image&rdquo; tool planned.
              It will work the same way—completely in your browser without
              uploads. Check the tools directory for updates.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          🔧 Troubleshooting
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              The conversion fails or the page freezes
            </p>
            <p>
              This usually happens with very large images or too many files at
              once. Try reducing the number of images, or compress them before
              converting. Close other browser tabs to free up memory.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              My images appear rotated incorrectly
            </p>
            <p>
              Use the Orientation setting to manually choose Portrait or
              Landscape. The &ldquo;Auto&rdquo; option detects orientation based
              on image dimensions, but some photos have incorrect metadata.
            </p>
          </div>

          <div>
            <p className="font-semibold">The PDF quality looks poor</p>
            <p>
              The tool preserves your original image quality. If the PDF looks
              poor, your source images may be low resolution. Try using
              higher-quality images or the &ldquo;Fit to image&rdquo; page size
              to avoid scaling.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I report a bug or request a feature?
            </p>
            <p>
              Yes! This tool is actively maintained. Check our GitHub repository
              or contact page for feedback options. We regularly add new
              features based on user requests.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
