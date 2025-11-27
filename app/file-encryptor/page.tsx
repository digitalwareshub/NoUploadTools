"use client";

import { useState, useCallback, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type Mode = "encrypt" | "decrypt";

export default function FileEncryptorPage() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const encryptFile = useCallback(async () => {
    if (!file || !password) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setProcessing(true);
    setError("");
    setSuccess("");
    setProgress(10);

    try {
      const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
      const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

      setProgress(20);

      const key = await deriveKey(password, salt);
      setProgress(40);

      const fileBuffer = await file.arrayBuffer();
      setProgress(60);

      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv.buffer as ArrayBuffer },
        key,
        fileBuffer
      );
      setProgress(80);

      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(
        salt.length + iv.length + encrypted.byteLength
      );
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);

      const blob = new Blob([combined], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name}.encrypted`;
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setSuccess(`File "${file.name}" encrypted successfully!`);
    } catch (err) {
      setError("Encryption failed: " + (err as Error).message);
    } finally {
      setProcessing(false);
    }
  }, [file, password, confirmPassword]);

  const decryptFile = useCallback(async () => {
    if (!file || !password) {
      return;
    }

    setProcessing(true);
    setError("");
    setSuccess("");
    setProgress(10);

    try {
      const fileBuffer = await file.arrayBuffer();
      const data = new Uint8Array(fileBuffer);
      setProgress(20);

      if (data.length < SALT_LENGTH + IV_LENGTH + 16) {
        throw new Error("Invalid encrypted file format");
      }

      const salt = data.slice(0, SALT_LENGTH);
      const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
      const encrypted = data.slice(SALT_LENGTH + IV_LENGTH);
      setProgress(40);

      const key = await deriveKey(password, salt);
      setProgress(60);

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
      setProgress(80);

      let originalName = file.name;
      if (originalName.endsWith(".encrypted")) {
        originalName = originalName.slice(0, -10);
      } else {
        originalName = `decrypted_${originalName}`;
      }

      const blob = new Blob([decrypted]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalName;
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setSuccess(`File decrypted successfully as "${originalName}"!`);
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes("decrypt")) {
        setError("Decryption failed: Wrong password or corrupted file");
      } else {
        setError("Decryption failed: " + message);
      }
    } finally {
      setProcessing(false);
    }
  }, [file, password]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError("");
      setSuccess("");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setSuccess("");
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + " B";
    }
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    }
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const reset = () => {
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          File Encryptor
        </h1>
        <p className="mt-2 text-gray-700">
          Encrypt and decrypt files with AES-256-GCM encryption. All processing
          happens in your browser - files never leave your device.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Mode selection */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode("encrypt");
              reset();
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
              reset();
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

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="text-4xl mb-2">
              {mode === "encrypt" ? "🔒" : "🔓"}
            </div>
            <p className="text-gray-600">
              Drop a file here or{" "}
              <span className="text-black underline">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {mode === "encrypt"
                ? "Any file type supported"
                : "Select an .encrypted file"}
            </p>
          </label>
        </div>

        {/* Selected file */}
        {file && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={reset}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Password input */}
        <div className="space-y-3">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password"
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
          </div>

          {mode === "encrypt" && (
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          )}
        </div>

        {/* Progress bar */}
        {processing && (
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              {mode === "encrypt" ? "Encrypting" : "Decrypting"}... {progress}%
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            {success}
          </div>
        )}

        {/* Action button */}
        <button
          onClick={mode === "encrypt" ? encryptFile : decryptFile}
          disabled={!file || !password || processing}
          className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {processing
            ? mode === "encrypt"
              ? "Encrypting..."
              : "Decrypting..."
            : mode === "encrypt"
              ? "🔒 Encrypt File"
              : "🔓 Decrypt File"}
        </button>

        {/* Encryption info */}
        <div className="p-4 bg-gray-50 rounded-lg text-sm space-y-2">
          <h3 className="font-semibold">Encryption Details</h3>
          <ul className="text-gray-600 space-y-1">
            <li>
              • <strong>Algorithm:</strong> AES-256-GCM (Authenticated
              Encryption)
            </li>
            <li>
              • <strong>Key Derivation:</strong> PBKDF2 with 100,000 iterations
            </li>
            <li>
              • <strong>Salt:</strong> 128-bit random salt per file
            </li>
            <li>
              • <strong>IV:</strong> 96-bit random initialization vector
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All encryption happens in your
          browser using the Web Crypto API. Files and passwords never leave your
          device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Select Encrypt or Decrypt mode</li>
          <li>Drop or select a file to process</li>
          <li>Enter a strong password (minimum 8 characters)</li>
          <li>For encryption, confirm your password</li>
          <li>Click the button to encrypt/decrypt your file</li>
          <li>The processed file will download automatically</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About File Encryption</h2>
        <p>
          AES-256-GCM is a symmetric encryption algorithm that provides both
          confidentiality and authenticity. The &quot;256&quot; refers to the
          key size in bits, making it practically unbreakable through brute
          force. GCM (Galois/Counter Mode) adds authentication, ensuring the
          encrypted data hasn&apos;t been tampered with.
        </p>
        <p>
          PBKDF2 key derivation converts your password into a strong encryption
          key through 100,000 iterations, making password guessing attacks
          extremely slow. Each file uses a unique random salt and IV, so
          encrypting the same file twice produces completely different outputs.
        </p>
      </section>
    </div>
  );
}
