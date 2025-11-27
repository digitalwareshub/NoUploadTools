"use client";

import { useState } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

export default function JsonFormatterPage() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid JSON";
      setError(message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid JSON";
      setError(message);
      setOutput("");
    }
  };

  const validateJson = () => {
    setError("");
    setOutput("");
    if (!input.trim()) {
      return;
    }

    try {
      JSON.parse(input);
      setOutput("✓ Valid JSON");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid JSON";
      setError(message);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = output;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          name: "NoUploadTools",
          type: "web-app",
          features: ["privacy", "local-processing", "free"],
          stats: { tools: 15, users: "many" },
          active: true
        },
        null,
        2
      )
    );
    setOutput("");
    setError("");
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          JSON Formatter & Validator
        </h1>
        <p className="text-sm text-gray-700">
          Format, validate, and beautify JSON data. Minify for production. All
          processing happens locally in your browser.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Completely Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>Processing in your browser</li>
          <li>JSON never sent to servers</li>
          <li>Safe for API responses</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={formatJson}
          className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Format
        </button>
        <button
          type="button"
          onClick={minifyJson}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
        >
          Minify
        </button>
        <button
          type="button"
          onClick={validateJson}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
        >
          Validate
        </button>
        <select
          value={indentSize}
          onChange={(e) => setIndentSize(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={1}>1 tab</option>
        </select>
        <button
          type="button"
          onClick={loadSample}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <label htmlFor="input" className="text-sm font-semibold">
            Input JSON
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"paste": "your JSON here"}'
            className="h-80 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="output" className="text-sm font-semibold">
              Output
            </label>
            {output && output !== "✓ Valid JSON" && (
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            id="output"
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className={`h-80 w-full rounded-md border px-3 py-2 font-mono text-sm ${
              output === "✓ Valid JSON"
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-gray-300 bg-gray-50"
            }`}
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>📝 Pretty print JSON</li>
          <li>📦 Minify JSON</li>
          <li>✓ Validate syntax</li>
          <li>📏 Custom indentation</li>
          <li>📋 One-click copy</li>
          <li>🔒 100% private</li>
        </ul>
      </section>

      {/* Common Errors */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Common JSON Errors
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Trailing commas:</strong> JSON doesn&apos;t allow commas
            after the last item
          </li>
          <li>
            <strong>Single quotes:</strong> Use double quotes for strings
          </li>
          <li>
            <strong>Unquoted keys:</strong> Object keys must be quoted
          </li>
          <li>
            <strong>Comments:</strong> JSON doesn&apos;t support comments
          </li>
        </ul>
      </section>
    </div>
  );
}
