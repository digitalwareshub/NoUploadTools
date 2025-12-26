"use client";

import { useState, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState("");

  const decodeBase64Url = (str: string): string => {
    // Replace URL-safe characters
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    // Pad with = if needed
    while (base64.length % 4) {
      base64 += "=";
    }
    return atob(base64);
  };

  const decode = useCallback(() => {
    if (!token.trim()) {
      setError("Please enter a JWT token");
      setDecoded(null);
      return;
    }

    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) {
        throw new Error(
          "Invalid JWT format. Token must have 3 parts separated by dots."
        );
      }

      const [headerB64, payloadB64, signature] = parts;

      let header: Record<string, unknown>;
      let payload: Record<string, unknown>;

      try {
        header = JSON.parse(decodeBase64Url(headerB64));
      } catch {
        throw new Error(
          "Invalid header. Could not decode Base64 or parse JSON."
        );
      }

      try {
        payload = JSON.parse(decodeBase64Url(payloadB64));
      } catch {
        throw new Error(
          "Invalid payload. Could not decode Base64 or parse JSON."
        );
      }

      setDecoded({ header, payload, signature });
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setDecoded(null);
    }
  }, [token]);

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const isExpired = (payload: Record<string, unknown>): boolean | null => {
    if (typeof payload.exp !== "number") {
      return null;
    }
    return Date.now() > payload.exp * 1000;
  };

  const getTimeUntilExpiry = (
    payload: Record<string, unknown>
  ): string | null => {
    if (typeof payload.exp !== "number") {
      return null;
    }
    const now = Date.now();
    const expiry = payload.exp * 1000;
    const diff = expiry - now;

    if (diff < 0) {
      const expired = Math.abs(diff);
      if (expired < 60000) {
        return `Expired ${Math.round(expired / 1000)} seconds ago`;
      }
      if (expired < 3600000) {
        return `Expired ${Math.round(expired / 60000)} minutes ago`;
      }
      if (expired < 86400000) {
        return `Expired ${Math.round(expired / 3600000)} hours ago`;
      }
      return `Expired ${Math.round(expired / 86400000)} days ago`;
    }

    if (diff < 60000) {
      return `Expires in ${Math.round(diff / 1000)} seconds`;
    }
    if (diff < 3600000) {
      return `Expires in ${Math.round(diff / 60000)} minutes`;
    }
    if (diff < 86400000) {
      return `Expires in ${Math.round(diff / 3600000)} hours`;
    }
    return `Expires in ${Math.round(diff / 86400000)} days`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clear = () => {
    setToken("");
    setDecoded(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "JWT Decoder" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">JWT Decoder</h1>
        <p className="mt-2 text-gray-700">
          Decode and inspect JSON Web Tokens instantly. View header, payload,
          and expiration status. 100% browser-based — your tokens never leave
          your device.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Token input */}
        <div>
          <label
            htmlFor="jwt-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            JWT Token
          </label>
          <textarea
            id="jwt-input"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={decode}
            className="flex-1 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Decode Token
          </button>
          <button
            onClick={clear}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Decoded result */}
        {decoded && (
          <div className="space-y-4">
            {/* Expiration status */}
            {typeof decoded.payload.exp === "number" && (
              <div
                className={`p-4 rounded-lg border ${
                  isExpired(decoded.payload)
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {isExpired(decoded.payload) ? "⚠️" : "✓"}
                  </span>
                  <div>
                    <p
                      className={`font-medium ${
                        isExpired(decoded.payload)
                          ? "text-red-800"
                          : "text-green-800"
                      }`}
                    >
                      {isExpired(decoded.payload)
                        ? "Token Expired"
                        : "Token Valid"}
                    </p>
                    <p
                      className={`text-sm ${
                        isExpired(decoded.payload)
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {getTimeUntilExpiry(decoded.payload)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <span className="font-medium text-blue-600">Header</span>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(decoded.header, null, 2))
                  }
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 bg-white text-sm overflow-x-auto font-mono">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <span className="font-medium text-purple-600">Payload</span>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(decoded.payload, null, 2))
                  }
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 bg-white text-sm overflow-x-auto font-mono">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>

            {/* Common claims */}
            {Object.keys(decoded.payload).length > 0 && (
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <span className="font-medium">Decoded Claims</span>
                </div>
                <div className="p-4 bg-white">
                  <table className="w-full text-sm">
                    <tbody>
                      {decoded.payload.iss !== undefined && (
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600 w-24">
                            iss
                          </td>
                          <td className="py-2">
                            Issuer: {String(decoded.payload.iss)}
                          </td>
                        </tr>
                      )}
                      {decoded.payload.sub !== undefined && (
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            sub
                          </td>
                          <td className="py-2">
                            Subject: {String(decoded.payload.sub)}
                          </td>
                        </tr>
                      )}
                      {decoded.payload.aud !== undefined && (
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            aud
                          </td>
                          <td className="py-2">
                            Audience: {String(decoded.payload.aud)}
                          </td>
                        </tr>
                      )}
                      {typeof decoded.payload.exp === "number" && (
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            exp
                          </td>
                          <td className="py-2">
                            Expires: {formatTimestamp(decoded.payload.exp)}
                          </td>
                        </tr>
                      )}
                      {typeof decoded.payload.iat === "number" && (
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            iat
                          </td>
                          <td className="py-2">
                            Issued: {formatTimestamp(decoded.payload.iat)}
                          </td>
                        </tr>
                      )}
                      {typeof decoded.payload.nbf === "number" && (
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            nbf
                          </td>
                          <td className="py-2">
                            Not Before: {formatTimestamp(decoded.payload.nbf)}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Signature */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <span className="font-medium text-orange-600">Signature</span>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-600 mb-2">
                  The signature is used to verify the token hasn&apos;t been
                  tampered with. Verification requires the secret key.
                </p>
                <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto">
                  {decoded.signature}
                </code>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All decoding happens in your
          browser. Your tokens never leave your device.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Decode a JWT</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Paste your JWT token in the input field</li>
          <li>Click &quot;Decode Token&quot;</li>
          <li>View the decoded header, payload, and claims</li>
          <li>Check the expiration status</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About JWT Tokens</h2>
        <p>
          JWT (JSON Web Token) is a compact, URL-safe means of representing
          claims to be transferred between two parties. The claims are encoded
          as a JSON object that is digitally signed.
        </p>
        <p>
          A JWT consists of three parts separated by dots: Header, Payload, and
          Signature. The header and payload are Base64Url encoded JSON objects.
        </p>
        <p>
          <strong>Security Note:</strong> While this tool can decode JWTs, it
          cannot verify signatures. Never share your secret keys with any
          third-party tool. Treat JWTs like passwords — they often contain
          sensitive information.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What is a JWT token?</p>
            <p>
              JWT (JSON Web Token) is a compact, URL-safe way to represent
              claims between two parties. It&apos;s commonly used for
              authentication and information exchange in web applications.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Is it safe to decode JWT tokens online?
            </p>
            <p>
              With our tool, yes! All decoding happens in your browser. Your
              tokens never leave your device. However, you should never share
              JWT tokens publicly as they may contain sensitive information.
            </p>
          </div>

          <div>
            <p className="font-semibold">What information is in a JWT?</p>
            <p>
              A JWT has three parts: Header (algorithm and token type), Payload
              (claims like user ID, expiration, etc.), and Signature (for
              verification). Our decoder shows the header and payload.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can this tool verify JWT signatures?
            </p>
            <p>
              This tool decodes and displays JWT contents but doesn&apos;t
              verify signatures. Signature verification requires the secret key,
              which should never be shared with a third-party tool.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What does the &apos;exp&apos; claim mean?
            </p>
            <p>
              The &apos;exp&apos; claim is the expiration time in Unix timestamp
              format. Our decoder shows this as a human-readable date and
              indicates if the token has expired.
            </p>
          </div>

          <div>
            <p className="font-semibold">Why is my token not decoding?</p>
            <p>
              Make sure you&apos;re pasting a complete JWT token. It should have
              three parts separated by dots (xxxxx.yyyyy.zzzzz). The header and
              payload must be valid Base64-encoded JSON.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
