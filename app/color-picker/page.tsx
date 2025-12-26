"use client";

import { useState, useCallback, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export default function ColorPickerPage() {
  const [hex, setHex] = useState("#3B82F6");
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [contrastBg, setContrastBg] = useState("#FFFFFF");

  // Color conversion functions
  const hexToRgb = useCallback((hexColor: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  }, []);

  const rgbToHsl = useCallback((r: number, g: number, b: number): HSL => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, []);

  const rgbToCmyk = useCallback((r: number, g: number, b: number): CMYK => {
    if (r === 0 && g === 0 && b === 0) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }
    const c = 1 - r / 255;
    const m = 1 - g / 255;
    const y = 1 - b / 255;
    const k = Math.min(c, m, y);
    return {
      c: Math.round(((c - k) / (1 - k)) * 100),
      m: Math.round(((m - k) / (1 - k)) * 100),
      y: Math.round(((y - k) / (1 - k)) * 100),
      k: Math.round(k * 100)
    };
  }, []);

  const rgb = useMemo(() => hexToRgb(hex), [hex, hexToRgb]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb, rgbToHsl]);
  const cmyk = useMemo(() => rgbToCmyk(rgb.r, rgb.g, rgb.b), [rgb, rgbToCmyk]);

  // Contrast ratio calculation
  const getLuminance = useCallback(
    (r: number, g: number, b: number): number => {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    },
    []
  );

  const contrastRatio = useMemo(() => {
    const bgRgb = hexToRgb(contrastBg);
    const l1 = getLuminance(rgb.r, rgb.g, rgb.b);
    const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  }, [rgb, contrastBg, hexToRgb, getLuminance]);

  const wcagResult = useMemo(() => {
    const ratio = parseFloat(contrastRatio);
    if (ratio >= 7) {
      return { level: "AAA", normal: true, large: true };
    }
    if (ratio >= 4.5) {
      return { level: "AA", normal: true, large: true };
    }
    if (ratio >= 3) {
      return { level: "AA Large", normal: false, large: true };
    }
    return { level: "Fail", normal: false, large: false };
  }, [contrastRatio]);

  // Palette generation
  const generatePalette = useCallback(
    (type: "complementary" | "analogous" | "triadic" | "split") => {
      const colors: string[] = [hex];
      const { h, s, l } = hsl;

      switch (type) {
        case "complementary":
          colors.push(`hsl(${(h + 180) % 360}, ${s}%, ${l}%)`);
          break;
        case "analogous":
          colors.push(`hsl(${(h + 30) % 360}, ${s}%, ${l}%)`);
          colors.push(`hsl(${(h + 330) % 360}, ${s}%, ${l}%)`);
          break;
        case "triadic":
          colors.push(`hsl(${(h + 120) % 360}, ${s}%, ${l}%)`);
          colors.push(`hsl(${(h + 240) % 360}, ${s}%, ${l}%)`);
          break;
        case "split":
          colors.push(`hsl(${(h + 150) % 360}, ${s}%, ${l}%)`);
          colors.push(`hsl(${(h + 210) % 360}, ${s}%, ${l}%)`);
          break;
      }
      return colors;
    },
    [hex, hsl]
  );

  const handleColorChange = (newHex: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      if (!colorHistory.includes(hex) && hex !== newHex) {
        setColorHistory((prev) => [hex, ...prev.slice(0, 9)]);
      }
      setHex(newHex.toUpperCase());
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const randomColor = () => {
    const newHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
    handleColorChange(newHex);
  };

  const colorFormats = [
    { label: "HEX", value: hex },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    {
      label: "CMYK",
      value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Color Picker" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Color Picker & Converter
        </h1>
        <p className="mt-2 text-gray-700">
          Pick colors, convert between formats, and generate palettes. All
          processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-6">
        {/* Main color picker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Pick a Color
              </span>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-20 h-20 cursor-pointer rounded-md border border-gray-300"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      if (val.length <= 7) {
                        if (/^#[0-9A-F]{6}$/.test(val)) {
                          handleColorChange(val);
                        } else if (/^#[0-9A-F]{0,6}$/.test(val)) {
                          setHex(val);
                        }
                      }
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono"
                    placeholder="#000000"
                  />
                  <button
                    onClick={randomColor}
                    className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 w-full"
                  >
                    🎲 Random Color
                  </button>
                </div>
              </div>
            </div>

            {/* Color preview */}
            <div
              className="h-24 rounded-lg border border-gray-300"
              style={{ backgroundColor: hex }}
            />
          </div>

          {/* Color formats */}
          <div className="space-y-3">
            <span className="block text-sm font-medium text-gray-700">
              Color Formats
            </span>
            {colorFormats.map((format) => (
              <div key={format.label} className="flex gap-2">
                <span className="w-14 text-sm text-gray-600 py-2">
                  {format.label}:
                </span>
                <input
                  type="text"
                  value={format.value}
                  readOnly
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm bg-gray-50"
                />
                <button
                  onClick={() => copyToClipboard(format.value, format.label)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {copied === format.label ? "✓" : "📋"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contrast checker */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold">Contrast Checker (WCAG)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-sm text-gray-600 mb-1">
                Background Color
              </span>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={contrastBg}
                  onChange={(e) => setContrastBg(e.target.value.toUpperCase())}
                  className="w-12 h-10 cursor-pointer rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={contrastBg}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    if (/^#[0-9A-F]{6}$/.test(val)) {
                      setContrastBg(val);
                    }
                  }}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                />
              </div>
            </div>
            <div>
              <span className="block text-sm text-gray-600 mb-1">Preview</span>
              <div
                className="p-4 rounded-md text-center font-medium"
                style={{ backgroundColor: contrastBg, color: hex }}
              >
                Sample Text
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <span className="text-sm text-gray-600">Contrast Ratio:</span>{" "}
              <span className="font-bold">{contrastRatio}:1</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                wcagResult.normal
                  ? "bg-green-100 text-green-800"
                  : wcagResult.large
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {wcagResult.level}
            </div>
          </div>
        </div>

        {/* Color palettes */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold">Color Palettes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["complementary", "analogous", "triadic", "split"] as const).map(
              (type) => (
                <div key={type}>
                  <span className="block text-sm text-gray-600 mb-2 capitalize">
                    {type === "split" ? "Split Complementary" : type}
                  </span>
                  <div className="flex gap-1">
                    {generatePalette(type).map((color, i) => (
                      <button
                        key={i}
                        type="button"
                        className="flex-1 h-12 rounded cursor-pointer border border-gray-200"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          if (color.startsWith("#")) {
                            handleColorChange(color);
                          }
                        }}
                        title={color}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Color history */}
        {colorHistory.length > 0 && (
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Recent Colors
            </span>
            <div className="flex flex-wrap gap-2">
              {colorHistory.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleColorChange(c)}
                  className="w-10 h-10 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All color calculations happen in
          your browser. Nothing is sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Use the color picker or enter a HEX code directly</li>
          <li>Copy any color format by clicking the copy button</li>
          <li>Check contrast against a background for accessibility</li>
          <li>Generate harmonious palettes based on your color</li>
          <li>Access recent colors from the history bar</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Color Formats</h2>
        <p>
          Different color formats serve different purposes. <strong>HEX</strong>{" "}
          codes are compact and widely used in web design. <strong>RGB</strong>{" "}
          represents colors as red, green, and blue light values (0-255).{" "}
          <strong>HSL</strong> describes colors by hue, saturation, and
          lightness, making it intuitive for adjustments. <strong>CMYK</strong>{" "}
          is essential for print design where colors are created by mixing cyan,
          magenta, yellow, and black inks.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What color formats are supported?</p>
            <p>
              Our color picker supports HEX (e.g., #FF5733), RGB (e.g., rgb(255,
              87, 51)), HSL (e.g., hsl(11, 100%, 60%)), and CMYK (e.g., cmyk(0%,
              66%, 80%, 0%)) formats with real-time conversion between all
              formats.
            </p>
          </div>

          <div>
            <p className="font-semibold">What is the WCAG contrast checker?</p>
            <p>
              WCAG (Web Content Accessibility Guidelines) defines minimum
              contrast ratios for text readability. Our contrast checker
              calculates the ratio between text and background colors, helping
              you ensure your designs are accessible. A ratio of 4.5:1 is
              required for normal text, and 3:1 for large text.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              How does the palette generator work?
            </p>
            <p>
              The palette generator creates harmonious color schemes based on
              color theory. It can generate complementary (opposite), analogous
              (adjacent), triadic (three evenly spaced), and split-complementary
              palettes from any base color you select.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What&apos;s the difference between RGB and CMYK?
            </p>
            <p>
              RGB (Red, Green, Blue) is used for digital displays and adds light
              to create colors. CMYK (Cyan, Magenta, Yellow, Key/Black) is used
              for print and subtracts light. Colors may look different between
              RGB screens and CMYK prints due to this fundamental difference.
            </p>
          </div>

          <div>
            <p className="font-semibold">Can I save my favorite colors?</p>
            <p>
              Yes, the color picker maintains a history of colors you&apos;ve
              used during your session. You can click on any previous color to
              return to it. Colors are stored temporarily in your browser and
              are not uploaded anywhere.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is this tool free to use?</p>
            <p>
              Yes, our color picker is completely free with no limits or
              registration required. All color calculations happen in your
              browser, ensuring your design work remains private.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
