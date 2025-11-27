"use client";

import { marked } from "marked";
import { useState, useMemo, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

const TEMPLATES = {
  readme: `# Project Name

A brief description of what this project does and who it's for.

## Installation

\`\`\`bash
npm install my-project
\`\`\`

## Usage

\`\`\`javascript
import myProject from 'my-project';
myProject.doSomething();
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## License

MIT`,
  blog: `# Blog Post Title

*Published on January 1, 2024*

Introduction paragraph that hooks the reader and explains what this post is about.

## Main Section

Your main content goes here. You can use **bold** and *italic* text for emphasis.

### Subsection

More detailed information about a specific topic.

> "A meaningful quote that adds value to your post."

## Conclusion

Wrap up your thoughts and include a call to action.

---

*Thanks for reading! Follow me for more content.*`,
  documentation: `# API Documentation

## Overview

This document describes the API endpoints available in our service.

## Authentication

All API requests require an API key in the header:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### GET /users

Returns a list of users.

| Parameter | Type | Description |
|-----------|------|-------------|
| limit | number | Max results (default: 10) |
| offset | number | Skip results |

### Response

\`\`\`json
{
  "users": [],
  "total": 0
}
\`\`\`

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |`
};

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

Write your **Markdown** here and see the *live preview* on the right.

## Features

- Live preview
- Common Markdown support
- Export options

### Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Try editing this text!
`);
  const [copied, setCopied] = useState<"md" | "html" | null>(null);

  const html = useMemo(() => {
    try {
      return marked(markdown, { breaks: true });
    } catch {
      return "<p>Error parsing Markdown</p>";
    }
  }, [markdown]);

  const insertText = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const textarea = document.querySelector(
        "textarea"
      ) as HTMLTextAreaElement | null;
      if (!textarea) {
        return;
      }

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = markdown.substring(start, end);
      const textToInsert = selectedText || placeholder;

      const newText =
        markdown.substring(0, start) +
        before +
        textToInsert +
        after +
        markdown.substring(end);

      setMarkdown(newText);

      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + textToInsert.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [markdown]
  );

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied("md");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html as string);
    setCopied("html");
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadTemplate = (key: keyof typeof TEMPLATES) => {
    setMarkdown(TEMPLATES[key]);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Markdown Editor
        </h1>
        <p className="mt-2 text-gray-700">
          Write Markdown and see the live preview. All processing happens in
          your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 bg-gray-100 rounded-md">
          <button
            onClick={() => insertText("**", "**", "bold")}
            className="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            onClick={() => insertText("*", "*", "italic")}
            className="px-2 py-1 text-sm italic hover:bg-gray-200 rounded"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            onClick={() => insertText("~~", "~~", "strikethrough")}
            className="px-2 py-1 text-sm line-through hover:bg-gray-200 rounded"
            title="Strikethrough"
          >
            S
          </button>
          <span className="w-px bg-gray-300 mx-1" />
          <button
            onClick={() => insertText("# ", "", "Heading")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => insertText("## ", "", "Heading")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => insertText("### ", "", "Heading")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Heading 3"
          >
            H3
          </button>
          <span className="w-px bg-gray-300 mx-1" />
          <button
            onClick={() => insertText("[", "](url)", "link text")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Link"
          >
            🔗
          </button>
          <button
            onClick={() => insertText("![alt](", ")", "image-url")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Image"
          >
            🖼️
          </button>
          <button
            onClick={() => insertText("`", "`", "code")}
            className="px-2 py-1 text-sm font-mono hover:bg-gray-200 rounded"
            title="Inline Code"
          >
            {"<>"}
          </button>
          <button
            onClick={() => insertText("```\n", "\n```", "code block")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Code Block"
          >
            {"{ }"}
          </button>
          <span className="w-px bg-gray-300 mx-1" />
          <button
            onClick={() => insertText("- ", "", "list item")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => insertText("1. ", "", "list item")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Numbered List"
          >
            1.
          </button>
          <button
            onClick={() => insertText("> ", "", "quote")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Blockquote"
          >
            &quot;
          </button>
          <button
            onClick={() => insertText("\n---\n", "", "")}
            className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
            title="Horizontal Rule"
          >
            ―
          </button>
        </div>

        {/* Templates dropdown */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Templates:</span>
          <button
            onClick={() => loadTemplate("readme")}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            README
          </button>
          <button
            onClick={() => loadTemplate("blog")}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Blog Post
          </button>
          <button
            onClick={() => loadTemplate("documentation")}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            API Docs
          </button>
        </div>

        {/* Editor and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">
                Markdown
              </span>
              <span className="text-xs text-gray-500">
                {markdown.length} characters
              </span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Write your Markdown here..."
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Preview</span>
            </div>
            <div
              className="w-full h-96 border border-gray-300 rounded-md px-4 py-3 overflow-auto bg-white prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html as string }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={copyMarkdown}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            {copied === "md" ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={copyHtml}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            {copied === "html" ? "Copied!" : "Copy HTML"}
          </button>
          <button
            onClick={downloadMd}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
          >
            Download .md
          </button>
          <button
            onClick={() => setMarkdown("")}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All Markdown parsing happens in
          your browser. Your content is never sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Type or paste Markdown in the left editor pane</li>
          <li>See the live preview update on the right</li>
          <li>Use the toolbar buttons for quick formatting</li>
          <li>Try a template to get started quickly</li>
          <li>Copy or download your content when done</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">Markdown Cheat Sheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs bg-gray-50 p-4 rounded-md">
          <div>
            <p>
              <strong># Heading 1</strong>
            </p>
            <p>
              <strong>## Heading 2</strong>
            </p>
            <p>**bold** → bold</p>
            <p>*italic* → italic</p>
            <p>[link](url) → link</p>
          </div>
          <div>
            <p>- bullet list</p>
            <p>1. numbered list</p>
            <p>&gt; blockquote</p>
            <p>`inline code`</p>
            <p>```code block```</p>
          </div>
        </div>
      </section>
    </div>
  );
}
