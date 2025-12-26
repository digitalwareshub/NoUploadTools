"use client";

import { useState, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

interface MatchResult {
  fullMatch: string;
  index: number;
  groups: string[];
}

const COMMON_PATTERNS = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  {
    name: "URL",
    pattern: "https?:\\/\\/[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}[\\/\\w.-]*"
  },
  { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { name: "Time (HH:MM)", pattern: "\\d{1,2}:\\d{2}(?::\\d{2})?" },
  {
    name: "IPv4 Address",
    pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}"
  },
  { name: "Hex Color", pattern: "#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}" },
  { name: "HTML Tag", pattern: "<[^>]+>" },
  { name: "Integer", pattern: "-?\\d+" },
  { name: "Decimal Number", pattern: "-?\\d+\\.\\d+" },
  { name: "Username", pattern: "[a-zA-Z][a-zA-Z0-9_]{2,15}" },
  { name: "ZIP Code (US)", pattern: "\\d{5}(?:-\\d{4})?" }
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [testText, setTestText] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [replacement, setReplacement] = useState("");
  const [showReplace, setShowReplace] = useState(false);

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([, enabled]) => enabled)
      .map(([flag]) => flag)
      .join("");
  }, [flags]);

  const { regex, error } = useMemo(() => {
    if (!pattern) {
      return { regex: null, error: "" };
    }
    try {
      const re = new RegExp(pattern, flagString);
      return { regex: re, error: "" };
    } catch (err) {
      return { regex: null, error: (err as Error).message };
    }
  }, [pattern, flagString]);

  const matches = useMemo((): MatchResult[] => {
    if (!regex || !testText) {
      return [];
    }

    const results: MatchResult[] = [];
    let match;

    if (flags.g) {
      while ((match = regex.exec(testText)) !== null) {
        results.push({
          fullMatch: match[0],
          index: match.index,
          groups: match.slice(1)
        });
        if (match[0].length === 0) {
          regex.lastIndex++;
        }
      }
    } else {
      match = regex.exec(testText);
      if (match) {
        results.push({
          fullMatch: match[0],
          index: match.index,
          groups: match.slice(1)
        });
      }
    }

    return results;
  }, [regex, testText, flags.g]);

  const highlightedText = useMemo(() => {
    if (!regex || !testText || matches.length === 0) {
      return null;
    }

    const parts: { text: string; isMatch: boolean; matchIndex: number }[] = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      if (match.index > lastIndex) {
        parts.push({
          text: testText.slice(lastIndex, match.index),
          isMatch: false,
          matchIndex: -1
        });
      }
      parts.push({
        text: match.fullMatch,
        isMatch: true,
        matchIndex: i
      });
      lastIndex = match.index + match.fullMatch.length;
    });

    if (lastIndex < testText.length) {
      parts.push({
        text: testText.slice(lastIndex),
        isMatch: false,
        matchIndex: -1
      });
    }

    return parts;
  }, [regex, testText, matches]);

  const replacedText = useMemo(() => {
    if (!regex || !testText || !replacement) {
      return "";
    }
    try {
      return testText.replace(regex, replacement);
    } catch {
      return "";
    }
  }, [regex, testText, replacement]);

  const applyPattern = (patternStr: string) => {
    setPattern(patternStr);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Regex Tester" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Regex Tester</h1>
        <p className="mt-2 text-gray-700">
          Test and debug regular expressions with real-time matching and
          highlighting. All processing happens in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Pattern input */}
        <div>
          <label
            htmlFor="regex-pattern"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Regular Expression
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 py-2 bg-gray-50 text-gray-500 border-r">
                /
              </span>
              <input
                id="regex-pattern"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter your regex pattern..."
                className="flex-1 px-3 py-2 font-mono text-sm outline-none"
              />
              <span className="px-3 py-2 bg-gray-50 text-gray-500 border-l">
                /{flagString}
              </span>
            </div>
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">Invalid regex: {error}</p>
          )}
        </div>

        {/* Flags */}
        <div className="flex flex-wrap gap-4">
          <span className="text-sm font-medium text-gray-700">Flags:</span>
          {[
            { key: "g", label: "Global", desc: "Find all matches" },
            { key: "i", label: "Case Insensitive", desc: "Ignore case" },
            { key: "m", label: "Multiline", desc: "^ and $ match lines" },
            { key: "s", label: "Dotall", desc: ". matches newlines" }
          ].map(({ key, label, desc }) => (
            <label
              key={key}
              className="flex items-center gap-1 cursor-pointer"
              title={desc}
            >
              <input
                type="checkbox"
                checked={flags[key as keyof typeof flags]}
                onChange={(e) =>
                  setFlags({ ...flags, [key]: e.target.checked })
                }
                className="rounded"
              />
              <span className="text-sm">
                {label}{" "}
                <code className="text-xs bg-gray-100 px-1 rounded">{key}</code>
              </span>
            </label>
          ))}
        </div>

        {/* Test text */}
        <div>
          <label
            htmlFor="test-text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Test String
          </label>
          <textarea
            id="test-text"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none"
          />
        </div>

        {/* Highlighted result */}
        {highlightedText && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
              <span className="text-sm font-medium">
                Highlighted Matches ({matches.length} found)
              </span>
            </div>
            <div className="p-4 font-mono text-sm whitespace-pre-wrap break-all bg-white">
              {highlightedText.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.isMatch
                      ? "bg-yellow-200 border-b-2 border-yellow-400"
                      : ""
                  }
                >
                  {part.text}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Match details */}
        {matches.length > 0 && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
              <span className="text-sm font-medium">Match Details</span>
            </div>
            <div className="divide-y divide-gray-200 max-h-64 overflow-auto">
              {matches.map((match, i) => (
                <div key={i} className="p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                      Match {i + 1}
                    </span>
                    <span className="text-gray-500 text-xs">
                      Index: {match.index}
                    </span>
                  </div>
                  <code className="block bg-yellow-50 px-2 py-1 rounded font-mono text-sm">
                    {match.fullMatch}
                  </code>
                  {match.groups.length > 0 && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-200">
                      <span className="text-xs text-gray-500">
                        Capture Groups:
                      </span>
                      {match.groups.map((group, j) => (
                        <div key={j} className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            Group {j + 1}:
                          </span>
                          <code className="bg-blue-50 px-1 rounded text-xs">
                            {group || "(empty)"}
                          </code>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Replace mode */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showReplace}
              onChange={(e) => setShowReplace(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Show Replace</span>
          </label>

          {showReplace && (
            <>
              <div>
                <label
                  htmlFor="replacement"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Replacement (use $1, $2 for groups)
                </label>
                <input
                  id="replacement"
                  type="text"
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  placeholder="Enter replacement text..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                />
              </div>
              {replacedText && (
                <div>
                  <span className="block text-sm text-gray-600 mb-1">
                    Result:
                  </span>
                  <pre className="p-3 bg-gray-50 rounded-md font-mono text-sm whitespace-pre-wrap">
                    {replacedText}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>

        {/* Common patterns */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold">Common Patterns</h2>
          <div className="flex flex-wrap gap-2">
            {COMMON_PATTERNS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPattern(p.pattern)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick reference */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-3">Quick Reference</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            {[
              { pattern: ".", desc: "Any character" },
              { pattern: "\\d", desc: "Digit (0-9)" },
              { pattern: "\\w", desc: "Word char" },
              { pattern: "\\s", desc: "Whitespace" },
              { pattern: "^", desc: "Start of line" },
              { pattern: "$", desc: "End of line" },
              { pattern: "*", desc: "0 or more" },
              { pattern: "+", desc: "1 or more" },
              { pattern: "?", desc: "0 or 1" },
              { pattern: "{n}", desc: "Exactly n" },
              { pattern: "[abc]", desc: "Any of a,b,c" },
              { pattern: "()", desc: "Capture group" }
            ].map(({ pattern: p, desc }) => (
              <div key={p} className="flex items-center gap-2">
                <code className="bg-gray-100 px-1 rounded font-mono text-xs">
                  {p}
                </code>
                <span className="text-gray-600 text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All regex testing happens in your
          browser. Your patterns and text are never sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your regular expression pattern</li>
          <li>Select the flags you need (g, i, m, s)</li>
          <li>Enter or paste your test text</li>
          <li>View highlighted matches and capture groups</li>
          <li>Optionally test replacements with the replace feature</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Regular Expressions</h2>
        <p>
          Regular expressions (regex) are powerful patterns for matching and
          manipulating text. They&apos;re essential for validation, searching,
          and text processing in programming.
        </p>
        <p>
          This tester uses JavaScript&apos;s RegExp engine, which supports most
          standard regex features including lookahead (?=), lookbehind (?&lt;=),
          and named groups (?&lt;name&gt;) in modern browsers.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              What regex flavor does this tester use?
            </p>
            <p>
              This tester uses JavaScript&apos;s native RegExp engine. It
              supports standard regex syntax including character classes,
              quantifiers, anchors, groups, lookahead, and lookbehind (in modern
              browsers).
            </p>
          </div>

          <div>
            <p className="font-semibold">What do the regex flags mean?</p>
            <p>
              g (global) finds all matches, not just the first. i
              (case-insensitive) ignores letter case. m (multiline) makes ^ and
              $ match line boundaries. s (dotall) makes . match newlines. u
              (unicode) enables full Unicode support.
            </p>
          </div>

          <div>
            <p className="font-semibold">How do I match special characters?</p>
            <p>
              Special characters like . * + ? ^ $ {"{}"} [] \ | ( ) need to be
              escaped with a backslash. For example, to match a literal dot, use
              \. instead of just a dot.
            </p>
          </div>

          <div>
            <p className="font-semibold">What are capture groups?</p>
            <p>
              Capture groups are created with parentheses () and allow you to
              extract specific parts of a match. For example, (\d{"{4}"})-(\d
              {"{2}"})-(\d{"{2}"}) captures year, month, and day separately from
              a date.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why isn&apos;t my regex matching anything?
            </p>
            <p>
              Common issues include: forgetting to escape special characters,
              missing the global flag for multiple matches, case sensitivity
              (try the i flag), or incorrect anchors (^ and $ in multiline
              text).
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Is my data secure when using this tool?
            </p>
            <p>
              Yes, all regex testing happens entirely in your browser using
              JavaScript. Your patterns and test text are never sent to any
              server, ensuring complete privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
