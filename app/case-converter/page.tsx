"use client";

import { useState } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant";

export default function CaseConverterPage() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const convertCase = (text: string, caseType: CaseType): string => {
    if (!text) {
      return "";
    }

    switch (caseType) {
      case "upper":
        return text.toUpperCase();

      case "lower":
        return text.toLowerCase();

      case "title":
        return text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );

      case "sentence":
        return text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

      case "camel": {
        const words = text.toLowerCase().split(/[\s_-]+/);
        return words
          .map((word, index) =>
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join("");
      }

      case "pascal": {
        const words = text.toLowerCase().split(/[\s_-]+/);
        return words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");
      }

      case "snake":
        return text
          .replace(/[\s-]+/g, "_")
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .toLowerCase();

      case "kebab":
        return text
          .replace(/[\s_]+/g, "-")
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .toLowerCase();

      case "constant":
        return text
          .replace(/[\s-]+/g, "_")
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .toUpperCase();

      default:
        return text;
    }
  };

  const handleConvert = (caseType: CaseType) => {
    setOutput(convertCase(input, caseType));
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

  const useOutput = () => {
    setInput(output);
    setOutput("");
  };

  const clear = () => {
    setInput("");
    setOutput("");
  };

  const caseButtons: { type: CaseType; label: string; example: string }[] = [
    { type: "upper", label: "UPPERCASE", example: "HELLO WORLD" },
    { type: "lower", label: "lowercase", example: "hello world" },
    { type: "title", label: "Title Case", example: "Hello World" },
    {
      type: "sentence",
      label: "Sentence case",
      example: "Hello world. How are you?"
    },
    { type: "camel", label: "camelCase", example: "helloWorld" },
    { type: "pascal", label: "PascalCase", example: "HelloWorld" },
    { type: "snake", label: "snake_case", example: "hello_world" },
    { type: "kebab", label: "kebab-case", example: "hello-world" },
    { type: "constant", label: "CONSTANT_CASE", example: "HELLO_WORLD" }
  ];

  return (
    <div className="space-y-6 text-base text-gray-800">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Case Converter
        </h1>
        <p className="text-sm text-gray-700">
          Convert text between UPPERCASE, lowercase, Title Case, camelCase, and
          more. All processing happens locally in your browser.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Completely Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>Text processed in your browser</li>
          <li>Never sent to any server</li>
          <li>Works offline</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="input" className="text-sm font-semibold">
            Input Text
          </label>
          <button
            type="button"
            onClick={clear}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Clear
          </button>
        </div>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Case Buttons */}
      <div className="space-y-2">
        <span className="text-sm font-semibold">Convert to:</span>
        <div className="flex flex-wrap gap-2">
          {caseButtons.map((btn) => (
            <button
              key={btn.type}
              type="button"
              onClick={() => handleConvert(btn.type)}
              disabled={!input}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
              title={`Example: ${btn.example}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="output" className="text-sm font-semibold">
            Output
          </label>
          {output && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={useOutput}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                Use as input
              </button>
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>
        <textarea
          id="output"
          value={output}
          readOnly
          placeholder="Converted text will appear here..."
          className="h-32 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
        />
      </div>

      {/* Case Examples */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Case Examples
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="pb-2 pr-4 font-semibold">Type</th>
                <th className="pb-2 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {caseButtons.map((btn) => (
                <tr key={btn.type}>
                  <td className="py-2 pr-4">{btn.label}</td>
                  <td className="py-2 font-mono">{btn.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>🔠 UPPERCASE & lowercase</li>
          <li>📖 Title & Sentence case</li>
          <li>💻 camelCase & PascalCase</li>
          <li>🐍 snake_case & kebab-case</li>
          <li>📋 One-click copy</li>
          <li>🔒 100% private</li>
        </ul>
      </section>
    </div>
  );
}
