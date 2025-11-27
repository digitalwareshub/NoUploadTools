"use client";

import { useState, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type EncodingMode = "minimal" | "all" | "non-ascii";

const NAMED_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  " ": "&nbsp;",
  "©": "&copy;",
  "®": "&reg;",
  "™": "&trade;",
  "€": "&euro;",
  "£": "&pound;",
  "¥": "&yen;",
  "¢": "&cent;",
  "§": "&sect;",
  "°": "&deg;",
  "±": "&plusmn;",
  "×": "&times;",
  "÷": "&divide;",
  "¶": "&para;",
  "•": "&bull;",
  "…": "&hellip;",
  "–": "&ndash;",
  "—": "&mdash;",
  "\u2018": "&lsquo;",
  "\u2019": "&rsquo;",
  "\u201C": "&ldquo;",
  "\u201D": "&rdquo;",
  "«": "&laquo;",
  "»": "&raquo;",
  "←": "&larr;",
  "→": "&rarr;",
  "↑": "&uarr;",
  "↓": "&darr;",
  "↔": "&harr;",
  "♠": "&spades;",
  "♣": "&clubs;",
  "♥": "&hearts;",
  "♦": "&diams;",
  α: "&alpha;",
  β: "&beta;",
  γ: "&gamma;",
  δ: "&delta;",
  π: "&pi;",
  "∞": "&infin;",
  "√": "&radic;",
  "∑": "&sum;",
  "∫": "&int;",
  "≠": "&ne;",
  "≤": "&le;",
  "≥": "&ge;",
  "≈": "&asymp;"
};

const REVERSE_ENTITIES: Record<string, string> = Object.fromEntries(
  Object.entries(NAMED_ENTITIES).map(([char, entity]) => [entity, char])
);

const COMMON_ENTITIES = [
  { char: "&", entity: "&amp;", name: "Ampersand" },
  { char: "<", entity: "&lt;", name: "Less than" },
  { char: ">", entity: "&gt;", name: "Greater than" },
  { char: '"', entity: "&quot;", name: "Double quote" },
  { char: "'", entity: "&#39;", name: "Single quote" },
  { char: " ", entity: "&nbsp;", name: "Non-breaking space" },
  { char: "©", entity: "&copy;", name: "Copyright" },
  { char: "®", entity: "&reg;", name: "Registered" },
  { char: "™", entity: "&trade;", name: "Trademark" },
  { char: "€", entity: "&euro;", name: "Euro" },
  { char: "£", entity: "&pound;", name: "Pound" },
  { char: "°", entity: "&deg;", name: "Degree" },
  { char: "•", entity: "&bull;", name: "Bullet" },
  { char: "—", entity: "&mdash;", name: "Em dash" },
  { char: "→", entity: "&rarr;", name: "Right arrow" },
  { char: "♥", entity: "&hearts;", name: "Heart" }
];

export default function HtmlEntityEncoderPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<EncodingMode>("minimal");
  const [useNamedEntities, setUseNamedEntities] = useState(true);
  const [copied, setCopied] = useState(false);

  const encodeHtml = (text: string): string => {
    let result = "";

    for (const char of text) {
      const code = char.charCodeAt(0);

      // Check if we should encode this character
      let shouldEncode = false;

      if (mode === "minimal") {
        // Only encode HTML-special characters
        shouldEncode = ["&", "<", ">", '"', "'"].includes(char);
      } else if (mode === "all") {
        // Encode all non-alphanumeric ASCII
        shouldEncode = code < 32 || code > 126 || /[^a-zA-Z0-9 ]/.test(char);
      } else if (mode === "non-ascii") {
        // Encode HTML-special + non-ASCII
        shouldEncode = ["&", "<", ">", '"', "'"].includes(char) || code > 127;
      }

      if (shouldEncode) {
        if (useNamedEntities && NAMED_ENTITIES[char]) {
          result += NAMED_ENTITIES[char];
        } else {
          result += `&#${code};`;
        }
      } else {
        result += char;
      }
    }

    return result;
  };

  const decodeHtml = (text: string): string => {
    // First handle named entities
    let result = text;

    // Replace named entities
    for (const [entity, char] of Object.entries(REVERSE_ENTITIES)) {
      result = result.split(entity).join(char);
    }

    // Replace numeric entities (decimal)
    result = result.replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(parseInt(code, 10))
    );

    // Replace numeric entities (hex)
    result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    );

    return result;
  };

  const encoded = useMemo(
    () => encodeHtml(input),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input, mode, useNamedEntities]
  );
  const decoded = useMemo(
    () => decodeHtml(input),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input]
  );

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertEntity = (char: string) => {
    setInput((prev) => prev + char);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          HTML Entity Encoder
        </h1>
        <p className="mt-2 text-gray-700">
          Encode and decode HTML entities. Convert special characters to HTML
          entities for safe display. All processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Input */}
        <div>
          <label
            htmlFor="entity-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Input Text
          </label>
          <textarea
            id="entity-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or encoded text to decode..."
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none"
          />
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label
              htmlFor="encoding-mode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Encoding Mode
            </label>
            <select
              id="encoding-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as EncodingMode)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="minimal">Minimal (HTML special only)</option>
              <option value="non-ascii">Non-ASCII + HTML special</option>
              <option value="all">All special characters</option>
            </select>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useNamedEntities}
                onChange={(e) => setUseNamedEntities(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">
                Use named entities when available
              </span>
            </label>
          </div>
        </div>

        {/* Encoded output */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Encoded Output
            </span>
            {encoded && (
              <button
                onClick={() => copyToClipboard(encoded)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            )}
          </div>
          <textarea
            value={encoded}
            readOnly
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none bg-gray-50"
          />
        </div>

        {/* Decoded output */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Decoded Output
            </span>
            {decoded && (
              <button
                onClick={() => copyToClipboard(decoded)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                📋 Copy
              </button>
            )}
          </div>
          <textarea
            value={decoded}
            readOnly
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none bg-gray-50"
          />
        </div>

        {/* Common entities */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold">Common HTML Entities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COMMON_ENTITIES.map((e) => (
              <button
                key={e.entity}
                onClick={() => insertEntity(e.char)}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 text-left"
                title={e.name}
              >
                <span className="text-lg w-6 text-center">{e.char}</span>
                <div className="flex-1 min-w-0">
                  <code className="text-xs text-blue-600 block truncate">
                    {e.entity}
                  </code>
                  <span className="text-xs text-gray-500 block truncate">
                    {e.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Click to insert character into input
          </p>
        </div>

        {/* Full reference */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold">Entity Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Character</th>
                  <th className="text-left py-2 pr-4">Named</th>
                  <th className="text-left py-2 pr-4">Decimal</th>
                  <th className="text-left py-2">Hex</th>
                </tr>
              </thead>
              <tbody>
                {["&", "<", ">", '"', "'", "©", "®", "€", "—", "→"].map(
                  (char) => (
                    <tr key={char} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-mono">{char}</td>
                      <td className="py-2 pr-4 font-mono text-blue-600">
                        {NAMED_ENTITIES[char] || "N/A"}
                      </td>
                      <td className="py-2 pr-4 font-mono text-gray-600">
                        &#{char.charCodeAt(0)};
                      </td>
                      <td className="py-2 font-mono text-gray-600">
                        &#x{char.charCodeAt(0).toString(16).toUpperCase()};
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All encoding and decoding happens
          in your browser. Your text is never sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter text in the input field</li>
          <li>Choose an encoding mode based on your needs</li>
          <li>View encoded output (converts characters to entities)</li>
          <li>View decoded output (converts entities to characters)</li>
          <li>Copy the result you need</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About HTML Entities</h2>
        <p>
          HTML entities are used to display characters that have special meaning
          in HTML or that can&apos;t be easily typed. The five most important
          entities are: &amp;lt; for &lt;, &amp;gt; for &gt;, &amp;amp; for
          &amp;, &amp;quot; for &quot;, and &amp;#39; for &apos;.
        </p>
        <p>
          Encoding user input as HTML entities is crucial for web security. It
          prevents Cross-Site Scripting (XSS) attacks by ensuring that special
          characters are displayed as text rather than interpreted as HTML code.
        </p>
      </section>
    </div>
  );
}
