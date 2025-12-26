"use client";

import { useState, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type PasswordStrength = "weak" | "fair" | "good" | "strong" | "very-strong";

type GeneratedPassword = {
  id: string;
  value: string;
  strength: PasswordStrength;
};

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordCount, setPasswordCount] = useState<number>(1);
  const [passwords, setPasswords] = useState<GeneratedPassword[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const calculateStrength = (password: string): PasswordStrength => {
    let score = 0;

    // Length scoring
    if (password.length >= 8) {
      score += 1;
    }
    if (password.length >= 12) {
      score += 1;
    }
    if (password.length >= 16) {
      score += 1;
    }
    if (password.length >= 20) {
      score += 1;
    }

    // Character variety scoring
    if (/[a-z]/.test(password)) {
      score += 1;
    }
    if (/[A-Z]/.test(password)) {
      score += 1;
    }
    if (/[0-9]/.test(password)) {
      score += 1;
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1;
    }

    if (score <= 2) {
      return "weak";
    }
    if (score <= 4) {
      return "fair";
    }
    if (score <= 5) {
      return "good";
    }
    if (score <= 7) {
      return "strong";
    }
    return "very-strong";
  };

  const getStrengthColor = (strength: PasswordStrength): string => {
    switch (strength) {
      case "weak":
        return "bg-red-500";
      case "fair":
        return "bg-orange-500";
      case "good":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      case "very-strong":
        return "bg-green-600";
    }
  };

  const getStrengthWidth = (strength: PasswordStrength): string => {
    switch (strength) {
      case "weak":
        return "w-1/5";
      case "fair":
        return "w-2/5";
      case "good":
        return "w-3/5";
      case "strong":
        return "w-4/5";
      case "very-strong":
        return "w-full";
    }
  };

  const generatePassword = useCallback((): string => {
    let charset = "";
    if (includeUppercase) {
      charset += UPPERCASE;
    }
    if (includeLowercase) {
      charset += LOWERCASE;
    }
    if (includeNumbers) {
      charset += NUMBERS;
    }
    if (includeSymbols) {
      charset += SYMBOLS;
    }

    if (charset === "") {
      charset = LOWERCASE; // Fallback to lowercase if nothing selected
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset[array[i] % charset.length];
    }

    return password;
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  ]);

  const generate = () => {
    const newPasswords: GeneratedPassword[] = [];

    for (let i = 0; i < passwordCount; i++) {
      const value = generatePassword();
      newPasswords.push({
        id: `${Date.now()}-${i}-${Math.random()}`,
        value,
        strength: calculateStrength(value)
      });
    }

    setPasswords(newPasswords);
    setCopiedId(null);
  };

  const copyToClipboard = async (password: GeneratedPassword) => {
    try {
      await navigator.clipboard.writeText(password.value);
      setCopiedId(password.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = password.value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(password.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const copyAllPasswords = async () => {
    const allPasswords = passwords.map((p) => p.value).join("\n");
    try {
      await navigator.clipboard.writeText(allPasswords);
      setCopiedId("all");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = allPasswords;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId("all");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const atLeastOneSelected =
    includeUppercase || includeLowercase || includeNumbers || includeSymbols;

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Password Generator" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Password Generator
        </h1>
        <p className="text-sm text-gray-700">
          Generate strong, random passwords instantly. Uses cryptographically
          secure randomness. All generation happens locally in your browser.
        </p>
      </section>

      {/* Privacy & Security Callout */}
      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Completely Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>Passwords generated locally in your browser</li>
          <li>Uses Web Crypto API for true randomness</li>
          <li>Nothing sent to any server</li>
          <li>Works offline after page loads</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      {/* Generator Controls */}
      <div className="space-y-4 rounded-md border border-gray-200 bg-white p-4">
        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-sm font-semibold">
              Password Length
            </label>
            <span className="rounded bg-gray-100 px-2 py-1 text-sm font-mono">
              {length}
            </span>
          </div>
          <input
            id="length"
            type="range"
            min="8"
            max="128"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="space-y-2">
          <span className="text-sm font-semibold">Include Characters</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="h-4 w-4"
              />
              Uppercase (A-Z)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="h-4 w-4"
              />
              Lowercase (a-z)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="h-4 w-4"
              />
              Numbers (0-9)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="h-4 w-4"
              />
              Symbols (!@#$...)
            </label>
          </div>
          {!atLeastOneSelected && (
            <p className="text-xs text-red-500">
              Select at least one character type
            </p>
          )}
        </div>

        {/* Password Count */}
        <div className="space-y-2">
          <label htmlFor="count" className="text-sm font-semibold">
            Number of Passwords
          </label>
          <select
            id="count"
            value={passwordCount}
            onChange={(e) => setPasswordCount(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value={1}>1 password</option>
            <option value={3}>3 passwords</option>
            <option value={5}>5 passwords</option>
            <option value={10}>10 passwords</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={generate}
          disabled={!atLeastOneSelected}
          className="w-full rounded-md bg-black px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          Generate Password{passwordCount > 1 ? "s" : ""}
        </button>
      </div>

      {/* Generated Passwords */}
      {passwords.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Generated Passwords</h2>
            {passwords.length > 1 && (
              <button
                type="button"
                onClick={copyAllPasswords}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                {copiedId === "all" ? "Copied all!" : "Copy all"}
              </button>
            )}
          </div>

          <div className="space-y-2">
            {passwords.map((password) => (
              <div
                key={password.id}
                className="rounded-md border border-gray-200 bg-white p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <code className="flex-1 break-all font-mono text-sm">
                    {password.value}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(password)}
                    className="shrink-0 rounded border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100"
                  >
                    {copiedId === password.id ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Strength Indicator */}
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${getStrengthColor(password.strength)} ${getStrengthWidth(password.strength)} transition-all`}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="capitalize text-gray-600">
                      {password.strength.replace("-", " ")}
                    </span>
                    <span className="text-gray-500">
                      {password.value.length} characters
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How to Use */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">How to Use</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Set length:</strong> Use the slider to choose password
            length (8-128 characters)
          </li>
          <li>
            <strong>Select characters:</strong> Choose which character types to
            include
          </li>
          <li>
            <strong>Generate:</strong> Click the button to create random
            passwords
          </li>
          <li>
            <strong>Copy:</strong> Click &ldquo;Copy&rdquo; to save to your
            clipboard
          </li>
        </ol>
      </section>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>🔐 Cryptographically secure</li>
          <li>📏 8-128 character length</li>
          <li>🔤 Customizable character sets</li>
          <li>💪 Strength indicator</li>
          <li>📋 One-click copy</li>
          <li>🔢 Generate multiple at once</li>
          <li>⚡ Instant generation</li>
          <li>🔒 100% private</li>
        </ul>
      </section>

      {/* Password Tips */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Password Security Tips
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Use at least 16 characters for important accounts</li>
          <li>Include all character types when possible</li>
          <li>Never reuse passwords across different sites</li>
          <li>Use a password manager to store your passwords securely</li>
          <li>Enable two-factor authentication when available</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">Are these passwords truly random?</p>
            <p>
              Yes. We use the Web Crypto API (crypto.getRandomValues) which
              provides cryptographically secure random numbers suitable for
              security-sensitive applications.
            </p>
          </div>

          <div>
            <p className="font-semibold">Are my passwords stored anywhere?</p>
            <p>
              No. Passwords are generated entirely in your browser and are never
              sent to any server. When you close or refresh the page, they are
              gone.
            </p>
          </div>

          <div>
            <p className="font-semibold">How long should my password be?</p>
            <p>
              We recommend at least 16 characters for important accounts. Longer
              passwords are exponentially harder to crack through brute force.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
