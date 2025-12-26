"use client";

import { useState, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type Mode = "encode" | "decode";

export default function Base64EncoderPage() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encode = (text: string): string => {
    try {
      // Handle Unicode properly
      const bytes = new TextEncoder().encode(text);
      const binary = Array.from(bytes)
        .map((byte) => String.fromCharCode(byte))
        .join("");
      return btoa(binary);
    } catch {
      throw new Error("Could not encode text");
    }
  };

  const decode = (base64: string): string => {
    try {
      const binary = atob(base64.trim());
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      throw new Error("Invalid Base64 string");
    }
  };

  const handleConvert = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encode(input));
      } else {
        setOutput(decode(input));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
      setOutput("");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setOutput(result);
        setInput(`File: ${file.name} (${file.type || "unknown type"})`);
        setError("");
      };
      reader.readAsDataURL(file);
    } catch {
      setError("Could not read file");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
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

  const swapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError("");
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Base64 Encoder" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Base64 Encoder/Decoder
        </h1>
        <p className="text-sm text-gray-700">
          Encode text to Base64 or decode Base64 back to text. Convert files to
          Base64 data URLs. All processing happens locally.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Completely Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>All processing in your browser</li>
          <li>Data never sent to servers</li>
          <li>Works offline</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      {/* Mode Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex rounded-md border border-gray-300">
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`px-4 py-2 text-sm font-semibold ${mode === "encode" ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setMode("decode")}
            className={`px-4 py-2 text-sm font-semibold ${mode === "decode" ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
          >
            Decode
          </button>
        </div>
        <button
          type="button"
          onClick={swapMode}
          className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
          title="Swap input and output"
        >
          ⇄ Swap
        </button>
        {mode === "encode" && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
            >
              📁 File to Data URL
            </button>
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <label htmlFor="input" className="text-sm font-semibold">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter text to encode..."
                : "Paste Base64 string to decode..."
            }
            className="h-48 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="output" className="text-sm font-semibold">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            {output && (
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
            placeholder="Result will appear here..."
            className="h-48 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleConvert}
          className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>🔤 Text to Base64</li>
          <li>🔙 Base64 to text</li>
          <li>📁 File to data URL</li>
          <li>🌐 Unicode support</li>
          <li>📋 One-click copy</li>
          <li>🔒 100% private</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What is Base64 encoding?</p>
            <p>
              Base64 is a way to represent binary data using only printable
              ASCII characters. It&apos;s commonly used to embed images in
              HTML/CSS, transmit data in URLs, and encode email attachments.
            </p>
          </div>

          <div>
            <p className="font-semibold">Why does Base64 increase file size?</p>
            <p>
              Base64 uses 4 characters to represent every 3 bytes of data,
              resulting in about 33% size increase. This is the trade-off for
              being able to represent binary data as text.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is Base64 encryption?</p>
            <p>
              No, Base64 is encoding, not encryption. Anyone can decode Base64
              data. It&apos;s meant for data transport compatibility, not
              security. Don&apos;t use it to hide sensitive information.
            </p>
          </div>

          <div>
            <p className="font-semibold">Can I encode files to Base64?</p>
            <p>
              Yes! You can drag and drop or select any file to convert it to a
              Base64 data URL. This is useful for embedding small images
              directly in HTML or CSS.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is my data sent to a server?</p>
            <p>
              No. All encoding and decoding happens locally in your browser
              using built-in JavaScript functions. Your data never leaves your
              device.
            </p>
          </div>

          <div>
            <p className="font-semibold">What&apos;s a Base64 data URL?</p>
            <p>
              A data URL includes the Base64 data along with the MIME type, like
              &apos;data:image/png;base64,...&apos;. This can be used directly
              as an image src in HTML.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
