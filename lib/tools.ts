export type ToolStatus = "live" | "soon";

export type ToolMeta = {
  slug: string;
  path: string;
  name: string;
  description: string;
  category: "pdf" | "text" | "dev" | "misc";
  status: ToolStatus;
};

export const tools: ToolMeta[] = [
  // PDF focus
  {
    slug: "image-to-pdf",
    path: "/image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG/PNG images to a single PDF in your browser.",
    category: "pdf",
    status: "live"
  },
  {
    slug: "compress-pdf",
    path: "/tools/compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size locally without uploading.",
    category: "pdf",
    status: "soon"
  },
  {
    slug: "pdf-to-image",
    path: "/tools/pdf-to-image",
    name: "PDF to Image",
    description: "Turn each PDF page into an image in your browser.",
    category: "pdf",
    status: "soon"
  },
  {
    slug: "merge-pdf",
    path: "/tools/merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one file client-side.",
    category: "pdf",
    status: "soon"
  },
  {
    slug: "metadata-remover",
    path: "/metadata-remover/",
    name: "Metadata Remover",
    description: "Remove hidden metadata from documents before sharing.",
    category: "pdf",
    status: "soon"
  },

  // Existing misc/dev/text tools (status soon for now)
  { slug: "password-generator", path: "/password-generator/", name: "Password Generator", description: "Generate strong random passwords locally.", category: "dev", status: "soon" },
  { slug: "hash-generator", path: "/hash-generator/", name: "Hash Generator", description: "Compute file and text hashes in your browser.", category: "dev", status: "soon" },
  { slug: "base64-encoder", path: "/base64-encoder/", name: "Base64 Encoder", description: "Encode or decode Base64 text locally.", category: "text", status: "soon" },
  { slug: "json-formatter", path: "/json-formatter/", name: "JSON Formatter", description: "Pretty-print and validate JSON safely.", category: "dev", status: "soon" },
  { slug: "text-diff", path: "/text-diff/", name: "Text Diff", description: "Compare two blocks of text side by side.", category: "text", status: "soon" },
  { slug: "qr-generator", path: "/qr-generator/", name: "QR Generator", description: "Create QR codes directly in your browser.", category: "misc", status: "soon" },
  { slug: "lorem-ipsum", path: "/lorem-ipsum/", name: "Lorem Ipsum", description: "Generate placeholder text locally.", category: "text", status: "soon" },
  { slug: "file-encryptor", path: "/file-encryptor/", name: "File Encryptor", description: "Encrypt files with a password in your browser.", category: "dev", status: "soon" },
  { slug: "image-compressor", path: "/image-compressor/", name: "Image Compressor", description: "Compress images in the browser before sharing.", category: "pdf", status: "soon" },
  { slug: "secure-password-checker", path: "/secure-password-checker/", name: "Secure Password Checker", description: "Check password strength client-side.", category: "dev", status: "soon" },
  { slug: "text-encryptor", path: "/text-encryptor/", name: "Text Encryptor", description: "Encrypt sensitive text locally.", category: "text", status: "soon" },
  { slug: "markdown-editor", path: "/markdown-editor/", name: "Markdown Editor", description: "Write and preview markdown offline.", category: "text", status: "soon" },
  { slug: "color-picker", path: "/color-picker/", name: "Color Picker", description: "Pick and copy colors from the browser.", category: "misc", status: "soon" },
  { slug: "csv-converter", path: "/csv-converter/", name: "CSV Converter", description: "Convert CSV to other formats locally.", category: "dev", status: "soon" },
  { slug: "regex-tester", path: "/regex-tester/", name: "Regex Tester", description: "Test regular expressions against sample text.", category: "dev", status: "soon" },
  { slug: "file-splitter", path: "/file-splitter/", name: "File Splitter", description: "Split large files into smaller chunks client-side.", category: "dev", status: "soon" },
  { slug: "favicon-generator", path: "/favicon-generator/", name: "Favicon Generator", description: "Generate favicon files from an image.", category: "misc", status: "soon" },
  { slug: "image-format-converter", path: "/image-format-converter/", name: "Image Format Converter", description: "Convert between common image formats locally.", category: "pdf", status: "soon" },
  { slug: "code-beautifier", path: "/code-beautifier/", name: "Code Beautifier", description: "Format and tidy code snippets in the browser.", category: "dev", status: "soon" },
  { slug: "word-counter", path: "/word-counter/", name: "Word Counter", description: "Count words, characters and lines.", category: "text", status: "soon" },
  { slug: "case-converter", path: "/case-converter/", name: "Case Converter", description: "Convert text between UPPER, lower, Title case.", category: "text", status: "soon" },
  { slug: "html-entity-encoder", path: "/html-entity-encoder/", name: "HTML Entity Encoder", description: "Encode or decode HTML entities.", category: "dev", status: "soon" },
  { slug: "unit-converter", path: "/unit-converter/", name: "Unit Converter", description: "Convert between common units offline.", category: "misc", status: "soon" },
  { slug: "timer-stopwatch", path: "/timer-stopwatch/", name: "Timer & Stopwatch", description: "Simple timer and stopwatch in your browser.", category: "misc", status: "soon" },
  { slug: "svg-optimizer", path: "/svg-optimizer/", name: "SVG Optimizer", description: "Clean and minify SVG files client-side.", category: "dev", status: "soon" },
  { slug: "barcode-scanner", path: "/barcode-scanner/", name: "Barcode Scanner", description: "Scan barcodes using your device camera.", category: "misc", status: "soon" }
];

export const blogPosts = [
  {
    slug: "how-to-verify-privacy-first-tools",
    title: "How to Verify Privacy-First Tools",
    description: "Simple checks to confirm if a tool truly keeps data local."
  },
  {
    slug: "how-to-remove-metadata-from-documents",
    title: "How to Remove Metadata from Documents",
    description: "Why metadata matters and how to clean it up."
  },
  {
    slug: "client-side-vs-server-side-processing",
    title: "Client-Side vs Server-Side Processing",
    description: "Understand the trade-offs between local and remote tools."
  },
  {
    slug: "why-you-should-never-upload-sensitive-pdfs",
    title: "Why You Should Never Upload Sensitive PDFs",
    description: "Risks of uploading private documents to random sites."
  },
  {
    slug: "hidden-cost-of-free-online-tools",
    title: "The Hidden Cost of Free Online Tools",
    description: "What you might be paying with your data instead of money."
  }
];
