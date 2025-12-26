"use client";

import { useState, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type EncodingMode = "component" | "full";

interface ParsedParam {
  key: string;
  value: string;
  encodedKey: string;
  encodedValue: string;
}

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<EncodingMode>("component");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    setError("");
    try {
      if (mode === "component") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(encodeURI(input));
      }
    } catch (e) {
      setError("Error encoding: " + (e as Error).message);
    }
  };

  const decode = () => {
    setError("");
    try {
      if (mode === "component") {
        setOutput(decodeURIComponent(input));
      } else {
        setOutput(decodeURI(input));
      }
    } catch (e) {
      setError(
        "Error decoding: Invalid encoded string. " + (e as Error).message
      );
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  // Parse query parameters from URL
  const parsedParams = useMemo((): ParsedParam[] => {
    try {
      let urlToParse = input;
      // Try to extract query string
      const queryIndex = input.indexOf("?");
      if (queryIndex !== -1) {
        urlToParse = input.substring(queryIndex + 1);
      }
      // Remove hash if present
      const hashIndex = urlToParse.indexOf("#");
      if (hashIndex !== -1) {
        urlToParse = urlToParse.substring(0, hashIndex);
      }

      if (!urlToParse.includes("=")) {
        return [];
      }

      const params: ParsedParam[] = [];
      const pairs = urlToParse.split("&");

      for (const pair of pairs) {
        const [key, ...valueParts] = pair.split("=");
        const value = valueParts.join("="); // Handle values with = in them
        if (key) {
          try {
            params.push({
              key: decodeURIComponent(key),
              value: value ? decodeURIComponent(value) : "",
              encodedKey: key,
              encodedValue: value || ""
            });
          } catch {
            params.push({
              key: key,
              value: value || "",
              encodedKey: key,
              encodedValue: value || ""
            });
          }
        }
      }

      return params;
    } catch {
      return [];
    }
  }, [input]);

  // Common encoding examples
  const examples = [
    { char: " ", encoded: "%20", description: "Space" },
    { char: "&", encoded: "%26", description: "Ampersand" },
    { char: "?", encoded: "%3F", description: "Question mark" },
    { char: "=", encoded: "%3D", description: "Equals" },
    { char: "#", encoded: "%23", description: "Hash" },
    { char: "/", encoded: "%2F", description: "Forward slash" },
    { char: "@", encoded: "%40", description: "At sign" },
    { char: "+", encoded: "%2B", description: "Plus" }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "URL Encoder" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          URL Encoder/Decoder
        </h1>
        <p className="mt-2 text-gray-700">
          Encode and decode URLs and query parameters. All processing happens in
          your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Mode selection */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            Encoding mode:
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              checked={mode === "component"}
              onChange={() => setMode("component")}
              className="text-black"
            />
            <span className="text-sm">
              Component{" "}
              <span className="text-gray-500">(encodeURIComponent)</span>
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              checked={mode === "full"}
              onChange={() => setMode("full")}
              className="text-black"
            />
            <span className="text-sm">
              Full URL <span className="text-gray-500">(encodeURI)</span>
            </span>
          </label>
        </div>

        {/* Input */}
        <div>
          <label
            htmlFor="url-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Input
          </label>
          <textarea
            id="url-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URL or text to encode/decode..."
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={encode}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Encode →
          </button>
          <button
            onClick={decode}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            ← Decode
          </button>
          <button
            onClick={swap}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            ⇄ Swap
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Output */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Output</span>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none bg-gray-50"
          />
        </div>

        {/* Parsed parameters */}
        {parsedParams.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-4 space-y-3">
            <h2 className="text-lg font-semibold">
              Parsed Query Parameters ({parsedParams.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4">Key</th>
                    <th className="text-left py-2 pr-4">Value (Decoded)</th>
                    <th className="text-left py-2">Encoded</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedParams.map((param, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-mono text-xs">
                        {param.key}
                      </td>
                      <td className="py-2 pr-4 font-mono text-xs break-all">
                        {param.value || (
                          <span className="text-gray-400">(empty)</span>
                        )}
                      </td>
                      <td className="py-2 font-mono text-xs text-gray-500 break-all">
                        {param.encodedKey}={param.encodedValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Common encodings reference */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-lg font-semibold">Common URL Encodings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            {examples.map((ex) => (
              <div
                key={ex.char}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                <code className="font-mono bg-white px-1 rounded border">
                  {ex.char}
                </code>
                <span className="text-gray-500">→</span>
                <code className="font-mono text-blue-600">{ex.encoded}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All encoding and decoding happens
          in your browser using built-in JavaScript functions. No data is sent
          to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Choose encoding mode: Component for values, Full URL for complete
            URLs
          </li>
          <li>Paste or type your URL/text in the input field</li>
          <li>Click Encode to URL-encode, or Decode to decode</li>
          <li>Copy the result or swap to continue editing</li>
          <li>For URLs with query strings, see parsed parameters below</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About URL Encoding</h2>
        <p>
          URL encoding converts special characters into a format safe for URLs.
          This is necessary because URLs can only contain certain characters
          (letters, numbers, and a few symbols). Characters with special meaning
          in URLs (like ? & =) or unsafe characters (like spaces) must be
          encoded.
        </p>
        <p>
          <strong>encodeURIComponent</strong> encodes everything except letters,
          numbers, and - _ . ! ~ * ` ( ). Use it for query parameter values.{" "}
          <strong>encodeURI</strong> preserves URL structure characters like : /
          ? # & =. Use it for complete URLs where you want to keep the
          structure.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What is URL encoding?</p>
            <p>
              URL encoding (also called percent encoding) converts special
              characters into a format that can be safely transmitted in URLs.
              Characters like spaces, &amp;, ?, and = have special meanings in
              URLs, so they must be encoded as %20, %26, %3F, and %3D
              respectively.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What&apos;s the difference between encodeURI and
              encodeURIComponent?
            </p>
            <p>
              encodeURI is used for encoding complete URLs and preserves
              characters that are valid in URLs (like :, /, ?, #, &amp;).
              encodeURIComponent is more aggressive and encodes all special
              characters, making it suitable for encoding query parameter values
              that might contain URL-special characters.
            </p>
          </div>

          <div>
            <p className="font-semibold">When do I need to URL encode?</p>
            <p>
              You need URL encoding when: passing user input in URLs, including
              special characters in query parameters, building URLs
              programmatically, sending data via GET requests, or when a URL
              contains non-ASCII characters like accented letters or emojis.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What characters need to be URL encoded?
            </p>
            <p>
              Reserved characters that have special meaning in URLs need
              encoding: ! # $ &amp; &apos; ( ) * + , / : ; = ? @ [ ]. Unsafe
              characters like spaces, &lt; &gt; {"{}"} | \ ^ ` also need
              encoding. Any non-ASCII characters (like e, n, Chinese characters)
              must be encoded.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why does my URL show %20 instead of spaces?
            </p>
            <p>
              %20 is the URL-encoded representation of a space character. URLs
              cannot contain literal spaces, so they are converted to %20 (or
              sometimes + in query strings). When decoded, %20 converts back to
              a space.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Is my data secure when using this tool?
            </p>
            <p>
              Yes, all encoding and decoding happens entirely in your browser
              using JavaScript&apos;s built-in functions. Your URLs and data are
              never sent to any server, ensuring complete privacy for sensitive
              information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
