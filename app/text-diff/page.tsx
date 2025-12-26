"use client";

import * as Diff from "diff";
import { useState, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type DiffMode = "line" | "word" | "character";
type ViewMode = "split" | "unified";

export default function TextDiffPage() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diffMode, setDiffMode] = useState<DiffMode>("line");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [copied, setCopied] = useState(false);

  const diffResult = useMemo(() => {
    const optionsA = caseSensitive ? textA : textA.toLowerCase();
    const optionsB = caseSensitive ? textB : textB.toLowerCase();

    switch (diffMode) {
      case "character":
        return Diff.diffChars(optionsA, optionsB);
      case "word":
        return Diff.diffWords(optionsA, optionsB);
      case "line":
      default:
        return Diff.diffLines(optionsA, optionsB);
    }
  }, [textA, textB, diffMode, caseSensitive]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    diffResult.forEach((part) => {
      const count = part.value.length;
      if (part.added) {
        added += count;
      } else if (part.removed) {
        removed += count;
      } else {
        unchanged += count;
      }
    });

    return { added, removed, unchanged };
  }, [diffResult]);

  const copyDiff = async () => {
    const diffText = diffResult
      .map((part) => {
        const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
        return part.value
          .split("\n")
          .filter((line) => line || diffMode !== "line")
          .map((line) => prefix + line)
          .join("\n");
      })
      .join("");

    await navigator.clipboard.writeText(diffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setTextA("");
    setTextB("");
  };

  const swapTexts = () => {
    const temp = textA;
    setTextA(textB);
    setTextB(temp);
  };

  const renderUnifiedDiff = () => {
    return (
      <div className="font-mono text-sm whitespace-pre-wrap break-all">
        {diffResult.map((part, index) => (
          <span
            key={index}
            className={
              part.added
                ? "bg-green-200 text-green-900"
                : part.removed
                  ? "bg-red-200 text-red-900"
                  : ""
            }
          >
            {part.value}
          </span>
        ))}
      </div>
    );
  };

  const renderSplitDiff = () => {
    const linesA: { text: string; type: "removed" | "unchanged" }[] = [];
    const linesB: { text: string; type: "added" | "unchanged" }[] = [];

    diffResult.forEach((part) => {
      const lines = part.value.split("\n").filter((l, i, arr) => {
        if (diffMode === "line") {
          return i < arr.length - 1 || l !== "";
        }
        return true;
      });

      lines.forEach((line) => {
        if (part.added) {
          linesB.push({ text: line, type: "added" });
        } else if (part.removed) {
          linesA.push({ text: line, type: "removed" });
        } else {
          linesA.push({ text: line, type: "unchanged" });
          linesB.push({ text: line, type: "unchanged" });
        }
      });
    });

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="border border-gray-300 rounded-md p-3 font-mono text-sm overflow-auto max-h-80">
          <div className="text-xs text-gray-500 mb-2 font-sans">
            Original Text
          </div>
          {linesA.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "removed"
                  ? "bg-red-100 text-red-900"
                  : "text-gray-800"
              }
            >
              {line.text || "\u00A0"}
            </div>
          ))}
          {linesA.length === 0 && (
            <div className="text-gray-400 italic">No content</div>
          )}
        </div>
        <div className="border border-gray-300 rounded-md p-3 font-mono text-sm overflow-auto max-h-80">
          <div className="text-xs text-gray-500 mb-2 font-sans">
            Modified Text
          </div>
          {linesB.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "added"
                  ? "bg-green-100 text-green-900"
                  : "text-gray-800"
              }
            >
              {line.text || "\u00A0"}
            </div>
          ))}
          {linesB.length === 0 && (
            <div className="text-gray-400 italic">No content</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Text Diff" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Text Diff</h1>
        <p className="mt-2 text-gray-700">
          Compare two blocks of text and highlight the differences. All
          processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Options */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Diff mode:</span>
            <select
              value={diffMode}
              onChange={(e) => setDiffMode(e.target.value as DiffMode)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="line">Line by Line</option>
              <option value="word">Word by Word</option>
              <option value="character">Character by Character</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as ViewMode)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="split">Split</option>
              <option value="unified">Unified</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-600">Case sensitive</span>
          </label>
        </div>

        {/* Text inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="text-a"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Original Text
            </label>
            <textarea
              id="text-a"
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder="Paste original text here..."
              className="w-full h-48 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="text-b"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Modified Text
            </label>
            <textarea
              id="text-b"
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="Paste modified text here..."
              className="w-full h-48 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={swapTexts}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            ⇄ Swap Texts
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            Clear All
          </button>
          <button
            onClick={copyDiff}
            disabled={!textA && !textB}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 text-sm"
          >
            {copied ? "Copied!" : "Copy Diff"}
          </button>
        </div>

        {/* Stats */}
        {(textA || textB) && (
          <div className="flex gap-4 text-sm">
            <span className="text-green-700">+{stats.added} added</span>
            <span className="text-red-700">-{stats.removed} removed</span>
            <span className="text-gray-500">{stats.unchanged} unchanged</span>
          </div>
        )}

        {/* Diff output */}
        {(textA || textB) && (
          <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Differences</h2>
            {viewMode === "unified" ? renderUnifiedDiff() : renderSplitDiff()}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All text comparison happens
          directly in your browser. Your text is never uploaded to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Paste your original text in the left box</li>
          <li>Paste the modified text in the right box</li>
          <li>Choose your preferred diff mode (line, word, or character)</li>
          <li>
            View differences highlighted in green (added) and red (removed)
          </li>
          <li>Use the Copy Diff button to copy the comparison result</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Text Diff</h2>
        <p>
          A text diff (or &quot;difference&quot;) tool compares two pieces of
          text and identifies what has changed between them. This is essential
          for code review, document revision tracking, contract comparison, and
          any situation where you need to spot changes between versions.
        </p>
        <p>
          Our tool supports three comparison modes: line-by-line for general
          document comparison, word-by-word for prose editing, and
          character-by-character for precise technical comparison. The split
          view shows both versions side by side, while unified view combines
          them with inline highlighting.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What is a text diff tool?</p>
            <p>
              A text diff tool compares two blocks of text and highlights the
              differences between them. It shows additions, deletions, and
              changes, making it easy to see what has been modified between two
              versions of text.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Is my text data uploaded to any server?
            </p>
            <p>
              No, our text diff tool processes everything in your browser using
              JavaScript. Your text never leaves your device, ensuring complete
              privacy for sensitive documents.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What&apos;s the difference between line-by-line and
              character-level diff?
            </p>
            <p>
              Line-by-line diff compares entire lines and marks whole lines as
              added, removed, or changed. Character-level diff goes deeper,
              highlighting the specific characters that differ within each line
              for more precise comparison.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              When should I use a text comparison tool?
            </p>
            <p>
              Text diff tools are useful for comparing code versions, reviewing
              document changes, checking contract revisions, verifying
              configuration file changes, comparing API responses, and finding
              differences in any text content.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What do the colors in the diff output mean?
            </p>
            <p>
              Green highlighting indicates text that was added (present in the
              second text but not the first). Red highlighting shows text that
              was removed (present in the first text but not the second). Yellow
              or gray may indicate unchanged context lines.
            </p>
          </div>

          <div>
            <p className="font-semibold">Can I compare large text files?</p>
            <p>
              Yes, since processing happens in your browser, you can compare
              large text files limited only by your device&apos;s memory. There
              are no server-imposed file size limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
