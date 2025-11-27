"use client";

import { useState, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [withHyphens, setWithHyphens] = useState(true);
  const [copied, setCopied] = useState<number | "all" | null>(null);

  const generateUuidV4 = useCallback((): string => {
    // Use crypto.getRandomValues for secure random generation
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // Set version 4 (random) - bits 12-15 of time_hi_and_version
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Set variant bits - bits 6-7 of clock_seq_hi_and_reserved
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    // Convert to hex string
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Format as UUID
    let uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;

    if (!withHyphens) {
      uuid = uuid.replace(/-/g, "");
    }

    if (uppercase) {
      uuid = uuid.toUpperCase();
    }

    return uuid;
  }, [uppercase, withHyphens]);

  const generate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUuidV4());
    }
    setUuids(newUuids);
  }, [count, generateUuidV4]);

  const regenerate = () => {
    generate();
  };

  const copyToClipboard = async (text: string, index: number | "all") => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    await copyToClipboard(uuids.join("\n"), "all");
  };

  const downloadAsTxt = () => {
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uuids.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          UUID Generator
        </h1>
        <p className="mt-2 text-gray-700">
          Generate random UUID v4 identifiers using the Web Crypto API. All
          processing happens locally in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="uuid-count"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of UUIDs
            </label>
            <input
              id="uuid-count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) =>
                setCount(
                  Math.min(100, Math.max(1, parseInt(e.target.value) || 1))
                )
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Uppercase</span>
            </label>
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={withHyphens}
                onChange={(e) => setWithHyphens(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Include hyphens</span>
            </label>
          </div>
        </div>

        {/* Generate button */}
        <div className="flex gap-2">
          <button
            onClick={generate}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Generate UUID{count > 1 ? "s" : ""}
          </button>
          {uuids.length > 0 && (
            <>
              <button
                onClick={regenerate}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                🔄 Regenerate
              </button>
              <button
                onClick={copyAll}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {copied === "all" ? "Copied!" : "Copy All"}
              </button>
              {uuids.length > 1 && (
                <button
                  onClick={downloadAsTxt}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Download .txt
                </button>
              )}
            </>
          )}
        </div>

        {/* Quick generate buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Quick generate:</span>
          {[1, 5, 10, 25, 50].map((n) => (
            <button
              key={n}
              onClick={() => {
                setCount(n);
                const newUuids: string[] = [];
                for (let i = 0; i < n; i++) {
                  newUuids.push(generateUuidV4());
                }
                setUuids(newUuids);
              }}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {n} UUID{n > 1 ? "s" : ""}
            </button>
          ))}
        </div>

        {/* UUID list */}
        {uuids.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Generated UUIDs ({uuids.length})
            </label>
            <div className="border border-gray-300 rounded-md divide-y divide-gray-200 max-h-96 overflow-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 hover:bg-gray-50"
                >
                  <code className="font-mono text-sm select-all">{uuid}</code>
                  <button
                    onClick={() => copyToClipboard(uuid, index)}
                    className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {copied === index ? "✓" : "📋"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UUID format explanation */}
        <div className="p-4 bg-gray-50 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">UUID v4 Format</h3>
          <code className="block font-mono text-xs bg-white p-2 rounded border">
            xxxxxxxx-xxxx-<span className="text-blue-600 font-bold">4</span>
            xxx-
            <span className="text-green-600 font-bold">[8-b]</span>
            xxx-xxxxxxxxxxxx
          </code>
          <p className="mt-2 text-gray-600">
            The <span className="text-blue-600 font-bold">4</span> indicates
            version 4 (random). The{" "}
            <span className="text-green-600 font-bold">[8-b]</span> indicates
            the variant (RFC 4122).
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> UUIDs are generated using the Web
          Crypto API in your browser. Nothing is sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Set the number of UUIDs you need (1-100)</li>
          <li>Choose your format preferences (case, hyphens)</li>
          <li>Click Generate to create new UUIDs</li>
          <li>Copy individual UUIDs or all at once</li>
          <li>Download as a text file for bulk UUIDs</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About UUIDs</h2>
        <p>
          UUIDs (Universally Unique Identifiers) are 128-bit identifiers
          designed to be unique without coordination. UUID v4 uses random
          numbers, providing 2^122 possible values - enough that collisions are
          astronomically unlikely.
        </p>
        <p>
          UUIDs are commonly used as database primary keys, session identifiers,
          transaction IDs, and anywhere you need unique identifiers that
          don&apos;t reveal information about order or timing. The random nature
          of v4 UUIDs also makes them suitable for security-sensitive
          applications.
        </p>
      </section>
    </div>
  );
}
