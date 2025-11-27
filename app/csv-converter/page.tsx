"use client";

import Papa from "papaparse";
import { useState, useMemo, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type OutputFormat = "json" | "json-array" | "xml" | "html" | "tsv" | "markdown";

export default function CsvConverterPage() {
  const [input, setInput] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("json");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const parsedData = useMemo(() => {
    if (!input.trim()) {
      return null;
    }

    try {
      const result = Papa.parse(input, {
        delimiter: delimiter === "auto" ? undefined : delimiter,
        header: hasHeader,
        skipEmptyLines: true
      });

      if (result.errors.length > 0) {
        setError(result.errors[0].message);
        return null;
      }

      setError("");
      return {
        data: result.data as Record<string, string>[] | string[][],
        fields: result.meta.fields || [],
        rowCount: result.data.length
      };
    } catch (err) {
      setError("Failed to parse CSV: " + (err as Error).message);
      return null;
    }
  }, [input, delimiter, hasHeader]);

  const output = useMemo(() => {
    if (!parsedData) {
      return "";
    }

    const { data, fields } = parsedData;

    try {
      switch (outputFormat) {
        case "json":
          return JSON.stringify(data, null, 2);

        case "json-array": {
          if (hasHeader && Array.isArray(data[0]) === false) {
            const arr = (data as Record<string, string>[]).map((row) =>
              fields.map((f) => row[f])
            );
            return JSON.stringify([fields, ...arr], null, 2);
          }
          return JSON.stringify(data, null, 2);
        }

        case "xml": {
          let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';
          if (hasHeader) {
            (data as Record<string, string>[]).forEach((row, i) => {
              xml += `  <row index="${i}">\n`;
              fields.forEach((field) => {
                const value = row[field] || "";
                const escaped = value
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;");
                xml += `    <${field}>${escaped}</${field}>\n`;
              });
              xml += "  </row>\n";
            });
          } else {
            (data as string[][]).forEach((row, i) => {
              xml += `  <row index="${i}">\n`;
              row.forEach((cell, j) => {
                const escaped = cell
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;");
                xml += `    <col${j}>${escaped}</col${j}>\n`;
              });
              xml += "  </row>\n";
            });
          }
          xml += "</data>";
          return xml;
        }

        case "html": {
          let html = '<table border="1">\n';
          if (hasHeader) {
            html += "  <thead>\n    <tr>\n";
            fields.forEach((field) => {
              html += `      <th>${field}</th>\n`;
            });
            html += "    </tr>\n  </thead>\n  <tbody>\n";
            (data as Record<string, string>[]).forEach((row) => {
              html += "    <tr>\n";
              fields.forEach((field) => {
                html += `      <td>${row[field] || ""}</td>\n`;
              });
              html += "    </tr>\n";
            });
            html += "  </tbody>\n";
          } else {
            html += "  <tbody>\n";
            (data as string[][]).forEach((row) => {
              html += "    <tr>\n";
              row.forEach((cell) => {
                html += `      <td>${cell}</td>\n`;
              });
              html += "    </tr>\n";
            });
            html += "  </tbody>\n";
          }
          html += "</table>";
          return html;
        }

        case "tsv": {
          if (hasHeader) {
            const header = fields.join("\t");
            const rows = (data as Record<string, string>[]).map((row) =>
              fields.map((f) => row[f] || "").join("\t")
            );
            return [header, ...rows].join("\n");
          }
          return (data as string[][]).map((row) => row.join("\t")).join("\n");
        }

        case "markdown": {
          if (hasHeader) {
            const header = `| ${fields.join(" | ")} |`;
            const separator = `| ${fields.map(() => "---").join(" | ")} |`;
            const rows = (data as Record<string, string>[]).map(
              (row) => `| ${fields.map((f) => row[f] || "").join(" | ")} |`
            );
            return [header, separator, ...rows].join("\n");
          }
          const firstRow = data[0] as string[];
          const separator = `| ${firstRow.map(() => "---").join(" | ")} |`;
          const rows = (data as string[][]).map(
            (row) => `| ${row.join(" | ")} |`
          );
          return [rows[0], separator, ...rows.slice(1)].join("\n");
        }

        default:
          return "";
      }
    } catch (err) {
      return "Conversion error: " + (err as Error).message;
    }
  }, [parsedData, outputFormat, hasHeader]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target?.result as string);
      };
      reader.readAsText(file);
    },
    []
  );

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    const extensions: Record<OutputFormat, string> = {
      json: "json",
      "json-array": "json",
      xml: "xml",
      html: "html",
      tsv: "tsv",
      markdown: "md"
    };
    const mimeTypes: Record<OutputFormat, string> = {
      json: "application/json",
      "json-array": "application/json",
      xml: "application/xml",
      html: "text/html",
      tsv: "text/tab-separated-values",
      markdown: "text/markdown"
    };

    const blob = new Blob([output], { type: mimeTypes[outputFormat] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${extensions[outputFormat]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">CSV Converter</h1>
        <p className="mt-2 text-gray-700">
          Convert CSV files to JSON, XML, HTML tables, and more. All processing
          happens in your browser - no data is uploaded.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="delimiter-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delimiter
            </label>
            <select
              id="delimiter-select"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="auto">Auto-detect</option>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="format-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Output Format
            </label>
            <select
              id="format-select"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="json">JSON (Objects)</option>
              <option value="json-array">JSON (2D Array)</option>
              <option value="xml">XML</option>
              <option value="html">HTML Table</option>
              <option value="tsv">TSV (Tab-separated)</option>
              <option value="markdown">Markdown Table</option>
            </select>
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">First row is header</span>
            </label>
          </div>

          <div className="flex items-end pb-2">
            <label className="w-full">
              <span className="sr-only">Upload CSV file</span>
              <input
                type="file"
                accept=".csv,.tsv,.txt"
                onChange={handleFileUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </label>
          </div>
        </div>

        {/* Input */}
        <div>
          <label
            htmlFor="csv-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CSV Input
          </label>
          <textarea
            id="csv-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV data here or upload a file..."
            className="w-full h-40 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Preview table */}
        {parsedData && parsedData.rowCount > 0 && (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
              <span className="text-sm font-medium">
                Preview ({parsedData.rowCount} rows
                {hasHeader ? `, ${parsedData.fields.length} columns` : ""})
              </span>
            </div>
            <div className="overflow-x-auto max-h-48">
              <table className="w-full text-sm">
                {hasHeader && parsedData.fields.length > 0 && (
                  <thead className="bg-gray-100">
                    <tr>
                      {parsedData.fields.map((field, i) => (
                        <th
                          key={i}
                          className="px-3 py-2 text-left font-medium border-b"
                        >
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {(
                    parsedData.data.slice(0, 5) as
                      | Record<string, string>[]
                      | string[][]
                  ).map((row, i) => (
                    <tr key={i} className="border-b">
                      {hasHeader
                        ? parsedData.fields.map((field, j) => (
                            <td key={j} className="px-3 py-2">
                              {(row as Record<string, string>)[field]}
                            </td>
                          ))
                        : (row as string[]).map((cell, j) => (
                            <td key={j} className="px-3 py-2">
                              {cell}
                            </td>
                          ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsedData.rowCount > 5 && (
              <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500 text-center">
                ... and {parsedData.rowCount - 5} more rows
              </div>
            )}
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Output ({outputFormat.toUpperCase()})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
                <button
                  onClick={downloadOutput}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none bg-gray-50"
            />
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All CSV parsing and conversion
          happens in your browser. Your data is never uploaded to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Paste your CSV data or upload a CSV file</li>
          <li>Select the appropriate delimiter (or use auto-detect)</li>
          <li>Indicate if the first row contains headers</li>
          <li>Choose your desired output format</li>
          <li>Preview the data and copy or download the result</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About CSV Conversion</h2>
        <p>
          CSV (Comma-Separated Values) is a simple format for storing tabular
          data. While widely supported, different applications often need data
          in other formats like JSON for web APIs, XML for legacy systems, or
          HTML for display.
        </p>
        <p>
          This converter handles standard CSV features including quoted fields
          (for values containing commas or newlines), various delimiters, and
          optional header rows. The parser follows RFC 4180 standards for
          reliable conversion.
        </p>
      </section>
    </div>
  );
}
