"use client";

import { useState, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

type HashResult = {
  algorithm: HashAlgorithm;
  hash: string;
};

export default function HashGeneratorPage() {
  const [input, setInput] = useState<string>("");
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const [fileName, setFileName] = useState<string>("");
  const [results, setResults] = useState<HashResult[]>([]);
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [verifyHash, setVerifyHash] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileDataRef = useRef<ArrayBuffer | null>(null);

  const algorithms: HashAlgorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

  const hashWithMD5 = async (data: ArrayBuffer): Promise<string> => {
    // Simple MD5 implementation (not crypto-grade but works for checksums)
    const SparkMD5 = (await import("spark-md5")).default;
    return SparkMD5.ArrayBuffer.hash(data);
  };

  const hashWithWebCrypto = async (
    algorithm: string,
    data: ArrayBuffer
  ): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const computeHash = async (
    algorithm: HashAlgorithm,
    data: ArrayBuffer
  ): Promise<string> => {
    switch (algorithm) {
      case "MD5":
        return hashWithMD5(data);
      case "SHA-1":
        return hashWithWebCrypto("SHA-1", data);
      case "SHA-256":
        return hashWithWebCrypto("SHA-256", data);
      case "SHA-512":
        return hashWithWebCrypto("SHA-512", data);
    }
  };

  const generateHashes = async () => {
    setIsHashing(true);
    setResults([]);

    try {
      let data: ArrayBuffer;

      if (inputType === "text") {
        data = new TextEncoder().encode(input).buffer as ArrayBuffer;
      } else if (fileDataRef.current) {
        data = fileDataRef.current;
      } else {
        setIsHashing(false);
        return;
      }

      const newResults: HashResult[] = [];

      for (const algorithm of algorithms) {
        const hash = await computeHash(algorithm, data);
        newResults.push({ algorithm, hash });
      }

      setResults(newResults);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHashing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);
    setInputType("file");

    const reader = new FileReader();
    reader.onload = () => {
      fileDataRef.current = reader.result as ArrayBuffer;
    };
    reader.readAsArrayBuffer(file);
  };

  const copyToClipboard = async (hash: string, algorithm: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(algorithm);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = hash;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(algorithm);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const switchToText = () => {
    setInputType("text");
    setFileName("");
    fileDataRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const verifyResult = results.find(
    (r) => r.hash.toLowerCase() === verifyHash.toLowerCase().trim()
  );

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Hash Generator" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Hash Generator
        </h1>
        <p className="text-sm text-gray-700">
          Generate MD5, SHA-1, SHA-256, SHA-512 hashes for text and files.
          Verify file integrity. All processing happens locally.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Completely Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>Uses Web Crypto API</li>
          <li>Files never uploaded</li>
          <li>Works offline</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={switchToText}
            className={`px-4 py-2 text-sm font-semibold rounded-md ${inputType === "text" ? "bg-black text-white" : "border border-gray-300 hover:bg-gray-100"}`}
          >
            Text Input
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`px-4 py-2 text-sm font-semibold rounded-md ${inputType === "file" ? "bg-black text-white" : "border border-gray-300 hover:bg-gray-100"}`}
          >
            File Input
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {inputType === "text" ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          />
        ) : (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
            📁 {fileName || "No file selected"}
          </div>
        )}

        <button
          type="button"
          onClick={generateHashes}
          disabled={
            isHashing ||
            (inputType === "text" && !input) ||
            (inputType === "file" && !fileDataRef.current)
          }
          className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:bg-gray-800"
        >
          {isHashing ? "Computing..." : "Generate Hashes"}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Hash Results</h2>
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.algorithm}
                className="rounded-md border border-gray-200 bg-white p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">
                    {result.algorithm}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(result.hash, result.algorithm)
                    }
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    {copied === result.algorithm ? "Copied!" : "Copy"}
                  </button>
                </div>
                <code className="mt-1 block break-all text-sm">
                  {result.hash}
                </code>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verify Section */}
      {results.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-base font-semibold">Verify Hash</h2>
          <input
            type="text"
            value={verifyHash}
            onChange={(e) => setVerifyHash(e.target.value)}
            placeholder="Paste a hash to verify..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          {verifyHash && (
            <p
              className={`text-sm ${verifyResult ? "text-green-600" : "text-red-500"}`}
            >
              {verifyResult
                ? `✓ Match! (${verifyResult.algorithm})`
                : "✗ No match found"}
            </p>
          )}
        </section>
      )}

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>🔐 MD5, SHA-1, SHA-256, SHA-512</li>
          <li>📝 Hash text or files</li>
          <li>✓ Verify checksums</li>
          <li>📋 One-click copy</li>
          <li>⚡ Fast local processing</li>
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
            <p className="font-semibold">What is a hash?</p>
            <p>
              A hash is a fixed-size string generated from input data. The same
              input always produces the same hash, but even tiny changes create
              completely different hashes. It&apos;s used to verify data
              integrity.
            </p>
          </div>

          <div>
            <p className="font-semibold">Which hash algorithm should I use?</p>
            <p>
              SHA-256 is recommended for most purposes. MD5 and SHA-1 are faster
              but have known vulnerabilities. SHA-512 offers more security but
              produces longer hashes.
            </p>
          </div>

          <div>
            <p className="font-semibold">Can I verify downloaded files?</p>
            <p>
              Yes! Drop or select a file to generate its hash, then compare it
              to the hash provided by the download source. If they match, the
              file wasn&apos;t corrupted or tampered with.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is hashing the same as encryption?</p>
            <p>
              No. Hashing is one-way - you can&apos;t reverse a hash to get the
              original data. Encryption is two-way - encrypted data can be
              decrypted with the right key.
            </p>
          </div>

          <div>
            <p className="font-semibold">Are my files uploaded?</p>
            <p>
              No. All hashing happens locally using the Web Crypto API. Your
              files never leave your device. This is crucial for verifying
              sensitive files privately.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why do different tools give different MD5 hashes?
            </p>
            <p>
              The hash depends on the exact bytes. Different line endings
              (Windows vs Unix), character encodings, or trailing whitespace can
              cause different hashes for seemingly identical text.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
