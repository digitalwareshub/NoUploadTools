"use client";

import { useState, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type Mode = "encrypt" | "decrypt";

export default function TextEncryptorPage() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const SALT_LENGTH = 16;
  const IV_LENGTH = 12;
  const ITERATIONS = 100000;

  const deriveKey = async (
    password: string,
    salt: Uint8Array
  ): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt.buffer.slice(
          salt.byteOffset,
          salt.byteOffset + salt.byteLength
        ) as ArrayBuffer,
        iterations: ITERATIONS,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const base64ToArrayBuffer = (base64: string): Uint8Array => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  const encrypt = useCallback(async () => {
    if (!input || !password) {
      setError("Please enter both text and password");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const encoder = new TextEncoder();
      const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
      const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
      const key = await deriveKey(password, salt);

      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv.buffer as ArrayBuffer },
        key,
        encoder.encode(input)
      );

      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(
        salt.length + iv.length + encrypted.byteLength
      );
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);

      setOutput(arrayBufferToBase64(combined.buffer));
    } catch (err) {
      setError("Encryption failed: " + (err as Error).message);
    } finally {
      setProcessing(false);
    }
  }, [input, password]);

  const decrypt = useCallback(async () => {
    if (!input || !password) {
      setError("Please enter both encrypted text and password");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const data = base64ToArrayBuffer(input);

      if (data.length < SALT_LENGTH + IV_LENGTH + 16) {
        throw new Error("Invalid encrypted text format");
      }

      const salt = data.slice(0, SALT_LENGTH);
      const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
      const encrypted = data.slice(SALT_LENGTH + IV_LENGTH);

      const key = await deriveKey(password, salt);

      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv.buffer.slice(
            iv.byteOffset,
            iv.byteOffset + iv.byteLength
          ) as ArrayBuffer
        },
        key,
        encrypted
      );

      const decoder = new TextDecoder();
      setOutput(decoder.decode(decrypted));
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes("decrypt") || message.includes("tag")) {
        setError("Decryption failed: Wrong password or corrupted data");
      } else if (message.includes("atob") || message.includes("base64")) {
        setError("Invalid encrypted text format");
      } else {
        setError("Decryption failed: " + message);
      }
    } finally {
      setProcessing(false);
    }
  }, [input, password]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setPassword("");
    setError("");
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Text Encryptor
        </h1>
        <p className="mt-2 text-gray-700">
          Encrypt and decrypt text messages with AES-256-GCM encryption. Share
          encrypted messages securely - all processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Mode selection */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode("encrypt");
              setOutput("");
              setError("");
            }}
            className={`px-4 py-2 rounded-md ${
              mode === "encrypt"
                ? "bg-black text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            🔒 Encrypt
          </button>
          <button
            onClick={() => {
              setMode("decrypt");
              setOutput("");
              setError("");
            }}
            className={`px-4 py-2 rounded-md ${
              mode === "decrypt"
                ? "bg-black text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            🔓 Decrypt
          </button>
        </div>

        {/* Input */}
        <div>
          <label
            htmlFor="text-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {mode === "encrypt" ? "Text to Encrypt" : "Encrypted Text"}
          </label>
          <textarea
            id="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encrypt"
                ? "Enter the text you want to encrypt..."
                : "Paste the encrypted text here..."
            }
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter encryption password..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {mode === "encrypt"
              ? "Choose a strong password. You'll need it to decrypt."
              : "Enter the same password used for encryption."}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={mode === "encrypt" ? encrypt : decrypt}
            disabled={processing || !input || !password}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {processing
              ? "Processing..."
              : mode === "encrypt"
                ? "🔒 Encrypt"
                : "🔓 Decrypt"}
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear
          </button>
          {output && (
            <button
              onClick={swap}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ⇄ Swap & {mode === "encrypt" ? "Decrypt" : "Encrypt"}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {mode === "encrypt" ? "Encrypted Text" : "Decrypted Text"}
              </span>
              <button
                onClick={copyToClipboard}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none bg-gray-50"
            />
            {mode === "encrypt" && (
              <p className="text-xs text-gray-500">
                Share this encrypted text and the password separately for
                security.
              </p>
            )}
          </div>
        )}

        {/* Info box */}
        <div className="p-4 bg-gray-50 rounded-lg text-sm space-y-2">
          <h3 className="font-semibold">How It Works</h3>
          <ul className="text-gray-600 space-y-1">
            <li>• Your password is converted to a key using PBKDF2</li>
            <li>• Text is encrypted with AES-256-GCM</li>
            <li>• Output includes salt and IV for decryption</li>
            <li>• Each encryption produces unique output</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All encryption happens in your
          browser using the Web Crypto API. Your text and password never leave
          your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Select Encrypt or Decrypt mode</li>
          <li>Enter your text or paste encrypted text</li>
          <li>Enter a password (minimum 4 characters)</li>
          <li>Click the Encrypt/Decrypt button</li>
          <li>Copy the result and share (password separately)</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Text Encryption</h2>
        <p>
          This tool uses AES-256-GCM encryption, the same standard used by
          governments and financial institutions. The password is converted to
          an encryption key using PBKDF2 with 100,000 iterations, making
          brute-force attacks impractical.
        </p>
        <p>
          Each encryption uses a unique random salt and initialization vector
          (IV), so encrypting the same text twice produces completely different
          outputs. This prevents pattern analysis and ensures maximum security.
        </p>
      </section>
    </div>
  );
}
