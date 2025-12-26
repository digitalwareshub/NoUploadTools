"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface OptimizationOptions {
  removeComments: boolean;
  removeMetadata: boolean;
  removeEditorData: boolean;
  removeEmptyGroups: boolean;
  removeHiddenElements: boolean;
  cleanupIds: boolean;
  minifyStyles: boolean;
  removeWhitespace: boolean;
}

interface OptimizationResult {
  originalSize: number;
  optimizedSize: number;
  savings: number;
  savingsPercent: number;
}

export default function SvgOptimizerPage() {
  const [originalSvg, setOriginalSvg] = useState("");
  const [optimizedSvg, setOptimizedSvg] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<OptimizationOptions>({
    removeComments: true,
    removeMetadata: true,
    removeEditorData: true,
    removeEmptyGroups: true,
    removeHiddenElements: true,
    cleanupIds: false,
    minifyStyles: true,
    removeWhitespace: true
  });

  const optimizeSvg = useCallback(
    (svg: string): string => {
      let result = svg;

      // Remove XML declaration
      result = result.replace(/<\?xml[^?]*\?>/gi, "");

      // Remove DOCTYPE
      result = result.replace(/<!DOCTYPE[^>]*>/gi, "");

      // Remove comments
      if (options.removeComments) {
        result = result.replace(/<!--[\s\S]*?-->/g, "");
      }

      // Remove metadata elements
      if (options.removeMetadata) {
        result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
        result = result.replace(/<title[\s\S]*?<\/title>/gi, "");
        result = result.replace(/<desc[\s\S]*?<\/desc>/gi, "");
      }

      // Remove editor-specific data
      if (options.removeEditorData) {
        // Remove Illustrator/Inkscape namespaced attributes
        result = result.replace(
          /\s+(xmlns:(?:i|inkscape|sodipodi|serif|sketch)|(?:i|inkscape|sodipodi|serif|sketch):[a-zA-Z-]+)="[^"]*"/g,
          ""
        );
        // Remove data attributes
        result = result.replace(/\s+data-[a-zA-Z-]+="[^"]*"/g, "");
        // Remove sketch: and other editor elements
        result = result.replace(
          /<(?:i|inkscape|sodipodi|serif|sketch):[^>]*>/gi,
          ""
        );
        result = result.replace(
          /<\/(?:i|inkscape|sodipodi|serif|sketch):[^>]*>/gi,
          ""
        );
      }

      // Remove empty groups
      if (options.removeEmptyGroups) {
        // Repeat to handle nested empty groups
        for (let i = 0; i < 5; i++) {
          result = result.replace(/<g[^>]*>\s*<\/g>/gi, "");
        }
      }

      // Remove hidden elements
      if (options.removeHiddenElements) {
        result = result.replace(
          /<[^>]+display\s*:\s*none[^>]*>[\s\S]*?<\/[^>]+>/gi,
          ""
        );
        result = result.replace(
          /<[^>]+visibility\s*:\s*hidden[^>]*>[\s\S]*?<\/[^>]+>/gi,
          ""
        );
      }

      // Clean up IDs (remove unused)
      if (options.cleanupIds) {
        // Find all id definitions
        const idMatches = result.match(/\sid="([^"]+)"/g) || [];
        const ids = idMatches
          .map((m) => m.match(/id="([^"]+)"/)?.[1])
          .filter(Boolean);

        // Check which IDs are referenced
        ids.forEach((id) => {
          if (id) {
            const refPattern = new RegExp(`#${id}|url\\(#${id}\\)`, "g");
            if (!refPattern.test(result)) {
              // ID is not referenced, can be removed
              result = result.replace(new RegExp(`\\s+id="${id}"`, "g"), "");
            }
          }
        });
      }

      // Minify inline styles
      if (options.minifyStyles) {
        result = result.replace(/style="([^"]*)"/g, (match, styles) => {
          const minified = styles
            .replace(/\s*:\s*/g, ":")
            .replace(/\s*;\s*/g, ";")
            .replace(/;+/g, ";")
            .replace(/;$/, "");
          return `style="${minified}"`;
        });
      }

      // Remove unnecessary whitespace
      if (options.removeWhitespace) {
        // Remove newlines and extra spaces between tags
        result = result.replace(/>\s+</g, "><");
        // Collapse multiple spaces in attributes
        result = result.replace(/\s{2,}/g, " ");
        // Trim
        result = result.trim();
      }

      // Clean up unnecessary attributes
      result = result.replace(/\s+version="[^"]*"/g, "");
      result = result.replace(/\s+xml:space="[^"]*"/g, "");

      // Remove empty style attributes
      result = result.replace(/\s+style=""/g, "");

      return result;
    },
    [options]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.includes("svg") && !file.name.endsWith(".svg")) {
        setError("Please select an SVG file");
        return;
      }

      setFileName(file.name);
      setError("");

      const reader = new FileReader();
      reader.onload = (event) => {
        const svg = event.target?.result as string;
        setOriginalSvg(svg);

        const optimized = optimizeSvg(svg);
        setOptimizedSvg(optimized);

        const originalSize = new Blob([svg]).size;
        const optimizedSize = new Blob([optimized]).size;
        const savings = originalSize - optimizedSize;

        setResult({
          originalSize,
          optimizedSize,
          savings,
          savingsPercent: Math.round((savings / originalSize) * 100)
        });
      };
      reader.readAsText(file);
    },
    [optimizeSvg]
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    }
  }, []);

  const handlePaste = useCallback(
    (svg: string) => {
      if (!svg.includes("<svg")) {
        setError("Invalid SVG content");
        return;
      }

      setOriginalSvg(svg);
      setFileName("pasted.svg");
      setError("");

      const optimized = optimizeSvg(svg);
      setOptimizedSvg(optimized);

      const originalSize = new Blob([svg]).size;
      const optimizedSize = new Blob([optimized]).size;
      const savings = originalSize - optimizedSize;

      setResult({
        originalSize,
        optimizedSize,
        savings,
        savingsPercent: Math.round((savings / originalSize) * 100)
      });
    },
    [optimizeSvg]
  );

  const reoptimize = useCallback(() => {
    if (originalSvg) {
      const optimized = optimizeSvg(originalSvg);
      setOptimizedSvg(optimized);

      const originalSize = new Blob([originalSvg]).size;
      const optimizedSize = new Blob([optimized]).size;
      const savings = originalSize - optimizedSize;

      setResult({
        originalSize,
        optimizedSize,
        savings,
        savingsPercent: Math.round((savings / originalSize) * 100)
      });
    }
  }, [originalSvg, optimizeSvg]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(optimizedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvg = () => {
    const blob = new Blob([optimizedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(".svg", ".min.svg");
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + " B";
    }
    return (bytes / 1024).toFixed(2) + " KB";
  };

  const reset = () => {
    setOriginalSvg("");
    setOptimizedSvg("");
    setFileName("");
    setResult(null);
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
          { name: "SVG Optimizer" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">SVG Optimizer</h1>
        <p className="mt-2 text-gray-700">
          Optimize and compress SVG files by removing unnecessary data. All
          processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* File upload */}
        {!originalSvg && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,image/svg+xml"
              onChange={handleFileSelect}
              className="hidden"
              id="svg-input"
            />
            <label htmlFor="svg-input" className="cursor-pointer">
              <div className="text-4xl mb-2">📐</div>
              <p className="text-gray-600">
                Drop an SVG file here or{" "}
                <span className="text-black underline">browse</span>
              </p>
            </label>
          </div>
        )}

        {/* Paste option */}
        {!originalSvg && (
          <div className="text-center">
            <span className="text-sm text-gray-500">or paste SVG code:</span>
            <textarea
              placeholder="<svg>...</svg>"
              className="mt-2 w-full h-24 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none"
              onPaste={(e) => {
                const text = e.clipboardData.getData("text");
                if (text) {
                  handlePaste(text);
                }
              }}
              onChange={(e) => {
                if (e.target.value.includes("<svg")) {
                  handlePaste(e.target.value);
                }
              }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Options */}
        {originalSvg && (
          <div className="border border-gray-300 rounded-lg p-4 space-y-3">
            <h2 className="text-sm font-semibold">Optimization Options</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(options).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => {
                      setOptions({ ...options, [key]: e.target.checked });
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
            <button
              onClick={reoptimize}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Re-optimize
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm text-gray-500">Original: </span>
                  <span className="font-medium">
                    {formatSize(result.originalSize)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Optimized: </span>
                  <span className="font-medium text-green-600">
                    {formatSize(result.optimizedSize)}
                  </span>
                </div>
                <div
                  className={`px-2 py-1 rounded text-sm font-medium ${result.savingsPercent > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                >
                  {result.savingsPercent > 0 ? "-" : ""}
                  {result.savingsPercent}%
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
                <button
                  onClick={downloadSvg}
                  className="px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800"
                >
                  ⬇️ Download
                </button>
                <button
                  onClick={reset}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  New SVG
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
              <div className="p-4">
                <span className="text-sm font-medium text-gray-500 block mb-2">
                  Original Preview
                </span>
                <div
                  className="bg-white border border-gray-200 rounded p-4 flex items-center justify-center"
                  style={{ minHeight: "150px" }}
                  dangerouslySetInnerHTML={{ __html: originalSvg }}
                />
              </div>
              <div className="p-4">
                <span className="text-sm font-medium text-gray-500 block mb-2">
                  Optimized Preview
                </span>
                <div
                  className="bg-white border border-gray-200 rounded p-4 flex items-center justify-center"
                  style={{ minHeight: "150px" }}
                  dangerouslySetInnerHTML={{ __html: optimizedSvg }}
                />
              </div>
            </div>

            {/* Code preview */}
            <div className="border-t border-gray-300 p-4">
              <span className="text-sm font-medium text-gray-500 block mb-2">
                Optimized Code
              </span>
              <textarea
                value={optimizedSvg}
                readOnly
                className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-xs resize-none bg-gray-50"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All SVG optimization happens in
          your browser. Files never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Upload an SVG file or paste SVG code</li>
          <li>Adjust optimization options if needed</li>
          <li>Preview the before and after comparison</li>
          <li>Copy the optimized code or download the file</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About SVG Optimization</h2>
        <p>
          SVG files from design tools often contain unnecessary data: editor
          metadata, comments, hidden elements, and verbose formatting. This
          optimizer removes these elements while preserving the visual
          appearance.
        </p>
        <p>
          Optimized SVGs load faster on websites, reducing bandwidth and
          improving user experience. For sites using many icons or
          illustrations, the cumulative size reduction can significantly improve
          page load times.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What does SVG optimization do?</p>
            <p>
              SVG optimization removes unnecessary data from SVG files -
              metadata, comments, editor artifacts, redundant attributes, and
              whitespace. This reduces file size without affecting how the image
              looks.
            </p>
          </div>

          <div>
            <p className="font-semibold">How much smaller will my SVG be?</p>
            <p>
              Reduction varies based on the source. SVGs exported from design
              tools like Illustrator or Figma often have 30-70% size reduction.
              Hand-coded or already optimized SVGs may see smaller improvements.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Will optimization change how my SVG looks?
            </p>
            <p>
              No, proper optimization only removes invisible data like metadata
              and whitespace. The visual appearance remains identical. Always
              preview the optimized SVG to verify.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is my SVG uploaded to a server?</p>
            <p>
              No, all optimization happens entirely in your browser using
              JavaScript. Your SVG files never leave your device, ensuring
              complete privacy for proprietary graphics.
            </p>
          </div>

          <div>
            <p className="font-semibold">Should I optimize SVGs for the web?</p>
            <p>
              Yes, optimized SVGs load faster and improve website performance.
              Smaller files mean less bandwidth usage and quicker rendering,
              especially important for icons and illustrations used throughout a
              site.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What metadata is removed during optimization?
            </p>
            <p>
              The optimizer removes: XML declarations, DOCTYPE, editor metadata
              (from Illustrator, Sketch, Figma), comments, hidden elements,
              unused definitions, and redundant attributes that don&apos;t
              affect display.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
