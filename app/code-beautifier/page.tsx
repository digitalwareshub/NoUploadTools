"use client";

import beautify from "js-beautify";
import { useState, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type Language = "javascript" | "html" | "css" | "json";
type IndentStyle = "space" | "tab";

export default function CodeBeautifierPage() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [indentStyle, setIndentStyle] = useState<IndentStyle>("space");
  const [indentSize, setIndentSize] = useState(2);
  const [wrapLineLength, setWrapLineLength] = useState(80);
  const [copied, setCopied] = useState(false);

  const beautified = useMemo(() => {
    if (!input.trim()) {
      return "";
    }

    const options = {
      indent_size: indentStyle === "tab" ? 1 : indentSize,
      indent_char: indentStyle === "tab" ? "\t" : " ",
      max_preserve_newlines: 2,
      preserve_newlines: true,
      wrap_line_length: wrapLineLength,
      end_with_newline: true
    };

    try {
      switch (language) {
        case "javascript":
          return beautify.js(input, {
            ...options,
            brace_style: "collapse",
            space_after_anon_function: true,
            space_after_named_function: false,
            jslint_happy: false,
            keep_array_indentation: false
          });

        case "html":
          return beautify.html(input, {
            ...options,
            indent_inner_html: true,
            indent_body_inner_html: true,
            indent_head_inner_html: true,
            extra_liners: ["head", "body", "/html"],
            unformatted: ["code", "pre"]
          });

        case "css":
          return beautify.css(input, {
            ...options,
            selector_separator_newline: true,
            newline_between_rules: true
          });

        case "json":
          try {
            const parsed = JSON.parse(input);
            return JSON.stringify(
              parsed,
              null,
              indentStyle === "tab" ? "\t" : indentSize
            );
          } catch {
            return "Invalid JSON: " + input;
          }

        default:
          return input;
      }
    } catch (err) {
      return "Error: " + (err as Error).message;
    }
  }, [input, language, indentStyle, indentSize, wrapLineLength]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(beautified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    const samples: Record<Language, string> = {
      javascript: `function fibonacci(n){if(n<=1)return n;return fibonacci(n-1)+fibonacci(n-2);}const result=fibonacci(10);console.log("Result:",result);const arr=[1,2,3,4,5].map(x=>x*2).filter(x=>x>4);`,
      html: `<!DOCTYPE html><html><head><title>Test</title><style>body{margin:0;}</style></head><body><div class="container"><h1>Hello World</h1><p>This is a paragraph.</p><ul><li>Item 1</li><li>Item 2</li></ul></div></body></html>`,
      css: `.container{display:flex;flex-direction:column;align-items:center;padding:20px;}.button{background-color:#007bff;color:white;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;}.button:hover{background-color:#0056b3;}`,
      json: `{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York","country":"USA"},"hobbies":["reading","coding","gaming"],"active":true}`
    };
    setInput(samples[language]);
  };

  const languageLabels: Record<Language, string> = {
    javascript: "JavaScript",
    html: "HTML",
    css: "CSS",
    json: "JSON"
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Code Beautifier
        </h1>
        <p className="mt-2 text-gray-700">
          Beautify and format JavaScript, HTML, CSS, and JSON code. All
          processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div>
            <label
              htmlFor="language-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Language
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="javascript">JavaScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="indent-style"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Indent Style
            </label>
            <select
              id="indent-style"
              value={indentStyle}
              onChange={(e) => setIndentStyle(e.target.value as IndentStyle)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="space">Spaces</option>
              <option value="tab">Tabs</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="indent-size"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Indent Size
            </label>
            <select
              id="indent-size"
              value={indentSize}
              onChange={(e) => setIndentSize(parseInt(e.target.value))}
              disabled={indentStyle === "tab"}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="wrap-length"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Wrap Length
            </label>
            <select
              id="wrap-length"
              value={wrapLineLength}
              onChange={(e) => setWrapLineLength(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="0">No wrap</option>
              <option value="80">80</option>
              <option value="100">100</option>
              <option value="120">120</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadSample}
              className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Load Sample
            </button>
          </div>
        </div>

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="code-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Input ({languageLabels[language]})
            </label>
            <textarea
              id="code-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your ${languageLabels[language]} code here...`}
              className="w-full h-80 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">
                Beautified Output
              </span>
              {beautified && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>
            <textarea
              value={beautified}
              readOnly
              className="w-full h-80 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none bg-gray-50"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Stats */}
        {input && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>
              Input: {input.length} chars, {input.split("\n").length} lines
            </span>
            <span>
              Output: {beautified.length} chars, {beautified.split("\n").length}{" "}
              lines
            </span>
          </div>
        )}

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setInput("")}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            onClick={() => setInput(beautified)}
            disabled={!beautified}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Copy Output to Input
          </button>
        </div>

        {/* Language tips */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-2">
          <h2 className="text-sm font-semibold">
            {languageLabels[language]} Tips
          </h2>
          {language === "javascript" && (
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • Supports ES6+ syntax including arrow functions and classes
              </li>
              <li>• Preserves comments and multi-line strings</li>
              <li>• Handles JSX syntax in React components</li>
            </ul>
          )}
          {language === "html" && (
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Preserves pre and code blocks without formatting</li>
              <li>• Properly indents nested elements</li>
              <li>• Handles inline styles and scripts</li>
            </ul>
          )}
          {language === "css" && (
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Supports modern CSS features and properties</li>
              <li>• Handles SCSS/SASS syntax</li>
              <li>• Adds newlines between rule blocks</li>
            </ul>
          )}
          {language === "json" && (
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Validates JSON syntax while formatting</li>
              <li>• Shows error if JSON is invalid</li>
              <li>• Perfect for API response formatting</li>
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All code formatting happens in your
          browser. Your code is never sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Select the language of your code</li>
          <li>Paste or type your code in the input area</li>
          <li>Adjust formatting options as needed</li>
          <li>View the beautified output instantly</li>
          <li>Copy the formatted code to use it</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Code Beautification</h2>
        <p>
          Code beautification transforms minified or poorly formatted code into
          readable, well-structured code. This is essential for debugging, code
          reviews, and understanding unfamiliar codebases. Consistent formatting
          also reduces merge conflicts in version control.
        </p>
        <p>
          This tool uses js-beautify, a popular and reliable library that
          handles modern JavaScript (ES6+), HTML5, CSS3, and JSON. The output
          follows common style conventions while being customizable to match
          your preferences.
        </p>
      </section>
    </div>
  );
}
