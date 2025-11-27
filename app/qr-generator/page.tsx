"use client";

import { useState, useEffect, useRef } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

export default function QrGeneratorPage() {
  const [text, setText] = useState<string>("https://nouploadtools.com");
  const [size, setSize] = useState<number>(256);
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!text.trim()) {
        setQrDataUrl("");
        setError("");
        return;
      }

      try {
        const QRCode = (await import("qrcode")).default;
        const dataUrl = await QRCode.toDataURL(text, {
          width: size,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor
          },
          errorCorrectionLevel: "M"
        });
        setQrDataUrl(dataUrl);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Could not generate QR code. Text might be too long.");
        setQrDataUrl("");
      }
    };

    void generateQR();
  }, [text, size, fgColor, bgColor]);

  const downloadPng = () => {
    if (!qrDataUrl) {
      return;
    }
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSvg = async () => {
    if (!text.trim()) {
      return;
    }
    try {
      const QRCode = (await import("qrcode")).default;
      const svgString = await QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor
        }
      });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) {
      return;
    }
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
    } catch {
      // Fallback - some browsers don't support clipboard images
      alert("Could not copy to clipboard. Try downloading instead.");
    }
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          QR Code Generator (No Upload)
        </h1>
        <p className="text-sm text-gray-700">
          Generate QR codes for URLs, text, WiFi, and more. Download as PNG or
          SVG. All generation happens locally in your browser.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Completely Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>QR codes generated locally</li>
          <li>Your data never leaves your device</li>
          <li>Works offline after page loads</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-semibold">
              Text or URL
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or data to encode..."
              className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="size" className="block text-xs font-semibold">
                Size: {size}px
              </label>
              <input
                id="size"
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="fgColor" className="block text-xs font-semibold">
                Foreground
              </label>
              <input
                id="fgColor"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-8 w-full cursor-pointer rounded border border-gray-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="bgColor" className="block text-xs font-semibold">
                Background
              </label>
              <input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-8 w-full cursor-pointer rounded border border-gray-300"
              />
            </div>
          </div>

          {/* Quick Templates */}
          <div className="space-y-2">
            <span className="text-xs font-semibold">Quick Templates:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setText("https://")}
                className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setText("WIFI:T:WPA;S:NetworkName;P:Password;;")}
                className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
              >
                WiFi
              </button>
              <button
                type="button"
                onClick={() => setText("tel:+1")}
                className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
              >
                Phone
              </button>
              <button
                type="button"
                onClick={() => setText("mailto:")}
                className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setText("smsto::")}
                className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
              >
                SMS
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-64 w-64 items-center justify-center rounded-md border border-gray-200 bg-white p-4">
            {error ? (
              <p className="text-center text-sm text-red-500">{error}</p>
            ) : qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="max-h-full max-w-full"
              />
            ) : (
              <p className="text-center text-sm text-gray-400">
                Enter text to generate QR code
              </p>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />

          {qrDataUrl && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={downloadPng}
                className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={downloadSvg}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
              >
                Download SVG
              </button>
              <button
                type="button"
                onClick={copyToClipboard}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>🔗 URLs, text, WiFi, and more</li>
          <li>📏 Customizable size</li>
          <li>🎨 Custom colors</li>
          <li>📥 Download PNG or SVG</li>
          <li>♾️ QR codes never expire</li>
          <li>🔒 100% private</li>
        </ul>
      </section>
    </div>
  );
}
