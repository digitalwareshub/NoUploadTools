# Instructions for Claude: Build Remaining 12 Tools for NoUploadTools# Instructions for Claude: Build Remaining 12 Tools for NoUploadTools



## Project Context## Project Context

NoUploadTools is a privacy-first browser utility site where all processing happens client-side. Currently live with 19 tools. Need to complete the site with the remaining 12 tools to reach 31 total tools for maximum SEO coverage and user utility.

NoUploadTools is a privacy-first browser utility site where all processing happens client-side. Currently live with **19 tools**. Need to complete the site with the remaining **12 tools** to reach 31 total tools for maximum SEO coverage and user utility.

## Current Tech Stack

## Current Tech Stack- **Framework:** Next.js 14.2.3 (App Router)

- **Language:** TypeScript

- **Framework:** Next.js 14.2.3 (App Router)- **Styling:** Tailwind CSS

- **Language:** TypeScript- **Existing Dependencies:** pdf-lib, pdfjs-dist, qrcode, spark-md5, jszip, diff, marked

- **Styling:** Tailwind CSS- **Pattern:** Each tool has layout.tsx (metadata + FAQPage schema) and page.tsx (client-side tool)

- **Existing Dependencies:** pdf-lib, pdfjs-dist, qrcode, spark-md5, jszip, diff, marked

- **Pattern:** Each tool has layout.tsx (metadata + FAQPage schema) and page.tsx (client-side tool)## Tools to Build (Priority Order - 18 Total)



## Tools to Build (Priority Order - 12 Total)### BATCH 1: HIGH PRIORITY TEXT & DEVELOPER TOOLS (6 tools)



### BATCH 1: SECURITY & UTILITY TOOLS (6 tools)### 1. **Text Diff Tool** (`/text-diff`)

**Purpose:** Compare two blocks of text side-by-side with highlighted differences

---

**Features Required:**

### 1. **File Encryptor** (`/file-encryptor`)- Two textarea inputs for text comparison

**Purpose:** Encrypt files with a password in the browser- Side-by-side or unified diff view toggle

- Highlight additions (green), deletions (red), changes (yellow)

**Features Required:**- Line-by-line comparison

- File upload input- Character-level diff option

- Password input field (with show/hide toggle)- Copy result button

- Encrypt button- Clear/reset functionality

- Download encrypted file (.enc extension)- Case-sensitive toggle option

- Decrypt mode toggle

- Upload encrypted file + password to decrypt**Technical Requirements:**

- Progress indicator for large files- Use a diff library like `diff` or implement simple character/line diff

- Clear instructions for users- Client-side only processing

- Warning about password importance- Syntax highlighting for differences

- Responsive layout (stack on mobile)

**Technical Requirements:**

- Use Web Crypto API (AES-GCM encryption)**SEO/Schema Requirements:**

- Generate random IV (Initialization Vector) for each file- Full metadata (title, description, keywords)

- Store IV with encrypted data- OpenGraph and Twitter cards

- PBKDF2 for key derivation from password- FAQPage schema with 6 questions about text comparison, use cases, privacy

- Client-side only - no file uploads- WebApplication schema

- Handle large files with streaming/chunking

---

**SEO/Schema Requirements:**

- Full metadata targeting security-conscious users### 2. **Lorem Ipsum Generator** (`/lorem-ipsum`)

- FAQPage schema (6 questions: encryption strength, password security, file size limits, browser compatibility, etc.)**Purpose:** Generate placeholder text for design mockups

- WebApplication schema

**Features Required:**

---- Paragraph count slider (1-50)

- Word count option (custom number)

### 2. **Secure Password Checker** (`/secure-password-checker`)- Character count option

**Purpose:** Check password strength client-side without sending data anywhere- Sentence count option

- "Start with 'Lorem ipsum dolor sit amet'" toggle

**Features Required:**- Copy to clipboard button

- Password input field (with show/hide toggle)- Generate multiple variations button

- Real-time strength meter (Weak/Fair/Good/Strong/Excellent)- Output format options: plain text, HTML paragraphs

- Visual strength bar (color-coded: red→yellow→green)

- Detailed analysis display:**Technical Requirements:**

  - Length check- Classic Lorem Ipsum dictionary

  - Uppercase/lowercase check- Random generation algorithm

  - Numbers check- No external API calls

  - Special characters check- Instant generation

  - Common password check

  - Estimated crack time**SEO/Schema Requirements:**

- Entropy calculation- Full metadata targeting designers, developers

- Suggestions for improvement- FAQPage schema (6 questions: what is lorem ipsum, when to use, alternatives, etc.)

- Copy feedback button- WebApplication schema



**Technical Requirements:**---

- Client-side only analysis (never send password anywhere)

- Check against common password list (top 10,000)### 3. **Markdown Editor** (`/markdown-editor`)

- Calculate entropy based on character space**Purpose:** Write and preview markdown in real-time

- Use zxcvbn-style analysis (or implement simplified version)

- Real-time feedback as user types**Features Required:**

- Split-pane editor (markdown input | live preview)

**SEO/Schema Requirements:**- Support common markdown: headers, bold, italic, links, images, lists, code blocks, tables

- Full metadata emphasizing privacy and security- Toolbar with formatting shortcuts

- FAQPage schema (6 questions: how it works, privacy guarantees, strength criteria, etc.)- Download as .md file

- WebApplication schema- Copy markdown or HTML output

- Fullscreen mode toggle

---- Dark/light theme toggle

- Template examples (README, documentation, etc.)

### 3. **Text Encryptor** (`/text-encryptor`)

**Purpose:** Encrypt and decrypt text messages with a password**Technical Requirements:**

- Use `marked` or `remark` for markdown parsing

**Features Required:**- Syntax highlighting for code blocks (use `prismjs` or similar)

- Text input textarea (for plaintext or ciphertext)- Client-side rendering only

- Password input field- Save to localStorage (optional feature)

- Encrypt button

- Decrypt button**SEO/Schema Requirements:**

- Output display area- Full metadata targeting developers, writers

- Copy encrypted text button- FAQPage schema (6 questions about markdown syntax, use cases, privacy)

- Copy decrypted text button- WebApplication schema

- Clear/reset button

- Base64 output for easy sharing---



**Technical Requirements:**### 4. **Color Picker & Converter** (`/color-picker`)

- Use Web Crypto API (AES-256-GCM)**Purpose:** Pick colors and convert between color formats

- PBKDF2 for password-based key derivation

- Generate random salt and IV**Features Required:**

- Encode output as Base64 for easy copying- Visual color picker (HSL/RGB/Hex)

- Include salt and IV in output format- Input fields for HEX, RGB, HSL, CMYK

- Client-side only processing- Real-time conversion between all formats

- Color palette generator (complementary, analogous, triadic, etc.)

**SEO/Schema Requirements:**- Copy color codes button

- Full metadata targeting privacy users- Color history/saved colors

- FAQPage schema (6 questions: encryption method, sharing encrypted text, password recovery, etc.)- Contrast checker (WCAG compliance for text)

- WebApplication schema- Random color generator



---**Technical Requirements:**

- Use HTML5 color input as base

### 4. **CSV Converter** (`/csv-converter`)- Convert between color spaces (RGB ↔ HSL ↔ CMYK ↔ HEX)

**Purpose:** Convert CSV files to other formats locally- Calculate color relationships for palette generation

- WCAG contrast ratio calculator

**Features Required:**- No external APIs

- File upload for CSV

- Or paste CSV text directly**SEO/Schema Requirements:**

- Output format selector:- Full metadata targeting designers, developers

  - JSON (array of objects)- FAQPage schema (6 questions: color formats, WCAG compliance, etc.)

  - JSON (array of arrays)- WebApplication schema

  - Excel-style table (HTML)

  - SQL INSERT statements---

  - TSV (Tab-separated)

- Preview data table### 5. **UUID/GUID Generator** (`/uuid-generator`)

- Download converted file**Purpose:** Generate universally unique identifiers

- Copy to clipboard option

- Handle headers option (first row as headers)**Features Required:**

- Custom delimiter option- Generate UUID v4 (random)

- Generate UUID v1 (timestamp-based) optional

**Technical Requirements:**- Bulk generation (1-100 UUIDs at once)

- Use PapaParse library for CSV parsing (or implement parser)- Uppercase/lowercase toggle

- Client-side only processing- With/without hyphens toggle

- Handle large CSV files efficiently- Copy individual UUID or copy all

- Validate CSV format- Regenerate button

- Generate proper JSON/SQL output- Show UUID format explanation



**SEO/Schema Requirements:****Technical Requirements:**

- Full metadata targeting developers and data analysts- Use Web Crypto API for secure random generation

- FAQPage schema (6 questions: supported formats, file size limits, delimiter handling, etc.)- UUID v4 implementation (random 128-bit)

- WebApplication schema- Client-side only

- No dependencies needed (or use `uuid` package if preferred)

---

**SEO/Schema Requirements:**

### 5. **Regex Tester** (`/regex-tester`)- Full metadata targeting developers

**Purpose:** Test regular expressions against sample text with live matching- FAQPage schema (6 questions: what is UUID, UUID versions, when to use, etc.)

- WebApplication schema

**Features Required:**

- Regex pattern input field---

- Flags selector (g, i, m, s, u, y)

- Sample text textarea### 6. **URL Encoder/Decoder** (`/url-encoder`)

- Live match highlighting in text**Purpose:** Encode and decode URLs and query parameters

- Match count display

- Capture groups display (if any)**Features Required:**

- Replace functionality with replacement string- Input textarea for URL/text

- Common regex examples dropdown- Encode button (encodeURIComponent)

- Syntax error display- Decode button (decodeURIComponent)

- Explanation of regex pattern (optional)- Full URL encoding vs component encoding toggle

- Parse query parameters (show as key-value table)

**Technical Requirements:**- Encode/decode individual parameters

- Use JavaScript RegExp- Copy result button

- Real-time matching as user types- Clear functionality

- Highlight matches in sample text- Handle special characters explanation

- Display capture groups separately

- Handle regex errors gracefully**Technical Requirements:**

- Client-side only- Use built-in `encodeURIComponent()`, `decodeURIComponent()`

- Use built-in `encodeURI()`, `decodeURI()` for full URLs

**SEO/Schema Requirements:**- Parse URL parameters using URLSearchParams API

- Full metadata targeting developers- Client-side only

- FAQPage schema (6 questions: regex syntax, flags explanation, common use cases, etc.)- Handle edge cases (already encoded, malformed URLs)

- WebApplication schema

**SEO/Schema Requirements:**

---- Full metadata targeting developers

- FAQPage schema (6 questions: URL encoding, when needed, special characters, etc.)

### 6. **HTML Entity Encoder/Decoder** (`/html-entity-encoder`)- WebApplication schema

**Purpose:** Encode or decode HTML entities

---

**Features Required:**

- Input textarea### BATCH 2: SECURITY & UTILITY TOOLS (6 tools)

- Encode button (convert special chars to &entities;)

- Decode button (convert &entities; to special chars)### 7. **File Encryptor** (`/file-encryptor`)

- Output display area**Purpose:** Encrypt files with a password before sharing

- Copy button

- Clear button**Features Required:**

- Mode toggle: Named entities vs Numeric entities- File upload/drag-drop input

- Common entities reference table- Password input (with confirmation)

- Show character count- Encryption algorithm selector (AES-256 recommended)

- Encrypt button

**Technical Requirements:**- Download encrypted file (.enc extension)

- Encode: Replace <, >, &, ", ', etc. with &lt;, &gt;, &amp;, etc.- File size limit warning (browser memory considerations)

- Decode: Reverse the process- Show encryption progress

- Support both named (&nbsp;) and numeric (&#160;) entities- Decrypt mode toggle (decrypt .enc files with password)

- Client-side only processing

- Handle all common HTML entities**Technical Requirements:**

- Use Web Crypto API (SubtleCrypto.encrypt)

**SEO/Schema Requirements:**- AES-GCM encryption

- Full metadata targeting web developers- Generate secure salt and IV

- FAQPage schema (6 questions: what are HTML entities, when to use, named vs numeric, etc.)- Client-side only processing

- WebApplication schema- Handle large files with chunking if needed



---**SEO/Schema Requirements:**

- Full metadata targeting privacy-conscious users

### BATCH 2: IMAGE & CODE TOOLS (6 tools)- FAQPage schema (6 questions: encryption strength, security, file types, password requirements, etc.)

- WebApplication schema

---

---

### 7. **Image Format Converter** (`/image-format-converter`)

**Purpose:** Convert images between different formats### 8. **Secure Password Checker** (`/secure-password-checker`)

**Purpose:** Check password strength and security without sending to server

**Features Required:**

- Image upload input**Features Required:**

- Output format selector (PNG, JPEG, WEBP, GIF, BMP)- Password input field (with show/hide toggle)

- Quality slider (for JPEG/WEBP)- Real-time strength meter (weak, fair, good, strong, very strong)

- Preview original and converted image- Detailed feedback (length, character variety, common patterns)

- Download button- Check against common passwords list (local, no API)

- File size comparison (before/after)- Estimate crack time

- Batch conversion option (multiple files)- Show entropy score

- Maintain/remove transparency toggle- Breach check warning (but don't actually check - privacy focus)

- Suggestions for improvement

**Technical Requirements:**

- Use Canvas API for conversion**Technical Requirements:**

- Load image to canvas, export in target format- Password strength algorithm (zxcvbn-style scoring)

- Handle transparency (PNG/WEBP)- Local common passwords dictionary (top 1000)

- Quality control for lossy formats- Pattern detection (sequences, repeats, keyboard patterns)

- Client-side only processing- Entropy calculation

- Show loading state for large images- Client-side only (emphasize NO data sent anywhere)



**SEO/Schema Requirements:****SEO/Schema Requirements:**

- Full metadata targeting designers and web developers- Full metadata targeting security-conscious users

- FAQPage schema (6 questions: supported formats, quality settings, transparency, batch processing, etc.)- FAQPage schema (6 questions: password strength, what makes strong password, entropy, etc.)

- WebApplication schema- WebApplication schema



------



### 8. **Code Beautifier** (`/code-beautifier`)### 9. **Text Encryptor** (`/text-encryptor`)

**Purpose:** Format and prettify code snippets**Purpose:** Encrypt/decrypt text messages with password



**Features Required:****Features Required:**

- Code input textarea- Text input area

- Language selector (JavaScript, CSS, HTML, JSON, XML)- Password field

- Beautify button- Encrypt/Decrypt toggle

- Minify button- Output area (encrypted Base64 or decrypted text)

- Output display with syntax highlighting- Copy encrypted text button

- Copy formatted code button- Clear functionality

- Indentation size selector (2/4 spaces, tabs)- Algorithm info (AES-256-GCM)

- Line wrapping toggle- Share instructions (how to send encrypted text safely)

- Download as file option

**Technical Requirements:**

**Technical Requirements:**- Web Crypto API (SubtleCrypto)

- Use js-beautify library (or similar)- AES-GCM encryption

- Syntax highlighting with Prism.js or highlight.js- Base64 encoding for output

- Support multiple languages- PBKDF2 for key derivation from password

- Client-side only processing- Client-side only

- Handle formatting errors gracefully

**SEO/Schema Requirements:**

**SEO/Schema Requirements:**- Full metadata targeting privacy/security users

- Full metadata targeting developers- FAQPage schema (6 questions: encryption methods, security, use cases, etc.)

- FAQPage schema (6 questions: supported languages, beautify vs minify, indentation options, etc.)- WebApplication schema

- WebApplication schema

---

---

### 10. **CSV Converter** (`/csv-converter`)

### 9. **Favicon Generator** (`/favicon-generator`)**Purpose:** Convert CSV to JSON, Excel, or other formats

**Purpose:** Generate favicon files from an image

**Features Required:**

**Features Required:**- CSV file upload or paste input

- Image upload input- Auto-detect delimiter (comma, semicolon, tab)

- Preview uploaded image- Preview parsed data (table view)

- Generate multiple sizes:- Export formats: JSON, Excel (XLSX), TSV, SQL INSERT

  - 16x16 (favicon.ico)- Custom delimiter input

  - 32x32- First row as headers toggle

  - 180x180 (Apple touch icon)- Download converted file

  - 192x192 (Android)- Sample CSV template

  - 512x512 (Android)

- Preview all generated sizes**Technical Requirements:**

- Download individual files- CSV parsing (use library or implement parser)

- Download all as ZIP- JSON conversion

- Generate manifest.json code snippet- Use `xlsx` library for Excel export

- Generate HTML <link> tags snippet- SQL INSERT statement generation

- Background color option (for transparent images)- Handle edge cases (quotes, commas in values)

- Client-side only

**Technical Requirements:**

- Use Canvas API for resizing**SEO/Schema Requirements:**

- Generate ICO format (or multiple PNGs)- Full metadata targeting developers, data analysts

- Create ZIP with jszip (already installed)- FAQPage schema (6 questions: CSV format, delimiter types, data conversion, etc.)

- Client-side only processing- WebApplication schema

- Maintain aspect ratio with padding option

---

**SEO/Schema Requirements:**

- Full metadata targeting web developers### 11. **Regex Tester** (`/regex-tester`)

- FAQPage schema (6 questions: favicon sizes, browser support, formats, manifest.json, etc.)**Purpose:** Test regular expressions against sample text

- WebApplication schema

**Features Required:**

---- Regex pattern input (with flags: g, i, m, s, u)

- Test string textarea (multi-line support)

### 10. **Unit Converter** (`/unit-converter`)- Live match highlighting

**Purpose:** Convert between common measurement units- Match count and match groups display

- Replace mode (regex replace preview)

**Features Required:**- Common regex examples/templates (email, URL, phone, date)

- Category selector:- Regex explanation (what the pattern does)

  - Length (mm, cm, m, km, in, ft, yd, mi)- Export matches as list

  - Weight (mg, g, kg, oz, lb)

  - Temperature (°C, °F, K)**Technical Requirements:**

  - Volume (mL, L, gal, oz, cup, tbsp, tsp)- JavaScript RegExp

  - Area (m², km², ft², acre, hectare)- Syntax highlighting for matches

  - Speed (km/h, mph, m/s, knots)- Handle regex errors gracefully

  - Time (ms, s, min, hr, day, week)- Show capture groups

- From unit selector- Client-side only

- To unit selector

- Input value field**SEO/Schema Requirements:**

- Real-time conversion- Full metadata targeting developers

- Result display (formatted)- FAQPage schema (6 questions: regex syntax, flags, common patterns, etc.)

- Swap units button (from ↔ to)- WebApplication schema

- Clear button

- Common conversions examples---



**Technical Requirements:**### 12. **HTML Entity Encoder/Decoder** (`/html-entity-encoder`)

- Implement conversion formulas for each category**Purpose:** Encode and decode HTML entities

- Real-time calculation as user types

- Handle decimal precision properly**Features Required:**

- Client-side only processing- Input textarea

- No external APIs needed- Encode/Decode toggle buttons

- Encode options: Named entities (&amp;) or numeric (&#38;)

**SEO/Schema Requirements:**- Decode both named and numeric entities

- Full metadata targeting students, professionals, general users- Copy result button

- FAQPage schema (6 questions: supported units, accuracy, common conversions, etc.)- Clear functionality

- WebApplication schema- Show common entities reference table

- Handle special characters

---

**Technical Requirements:**

### 11. **Timer & Stopwatch** (`/timer-stopwatch`)- HTML entity mapping (create lookup table)

**Purpose:** Simple timer and stopwatch in the browser- Handle both &name; and &#num; formats

- Use built-in browser APIs where possible

**Features Required:**- Client-side only

- Tab toggle: Timer | Stopwatch

- **Timer Mode:****SEO/Schema Requirements:**

  - Time input (hours, minutes, seconds)- Full metadata targeting developers, content creators

  - Start/Pause button- FAQPage schema (6 questions: HTML entities, when to use, encoding vs escaping, etc.)

  - Reset button- WebApplication schema

  - Visual countdown display (large)

  - Progress bar---

  - Sound notification when complete

  - Browser notification (if permitted)### BATCH 3: IMAGE & CODE TOOLS (6 tools)

- **Stopwatch Mode:**

  - Start/Stop button### 13. **Image Format Converter** (`/image-format-converter`)

  - Lap button**Purpose:** Convert images between formats (JPG, PNG, WebP, etc.)

  - Reset button

  - Elapsed time display (large)**Features Required:**

  - Lap times list- Image upload/drag-drop

  - Clear laps button- Source format auto-detection

- Background operation support (keep running when tab not active)- Target format selector (JPG, PNG, WebP, BMP, GIF)

- Quality slider (for lossy formats)

**Technical Requirements:**- Preview before/after

- Use setInterval or requestAnimationFrame- Download converted image

- Web Notifications API for timer completion- Batch conversion support

- Web Audio API for sound (or HTML5 audio)- Show file size comparison

- Store state in sessionStorage to persist across refresh

- Continue timing when tab inactive**Technical Requirements:**

- Client-side only- Canvas API for conversion

- Handle transparency (PNG/WebP to JPG)

**SEO/Schema Requirements:**- Quality compression settings

- Full metadata targeting productivity users- Client-side only

- FAQPage schema (6 questions: timer features, notifications, accuracy, background operation, etc.)- Handle large images

- WebApplication schema

**SEO/Schema Requirements:**

---- Full metadata targeting designers, photographers

- FAQPage schema (6 questions: image formats, quality, transparency, when to use each, etc.)

### 12. **SVG Optimizer** (`/svg-optimizer`)- WebApplication schema

**Purpose:** Clean and minify SVG files

---

**Features Required:**

- SVG file upload or paste SVG code### 14. **Code Beautifier** (`/code-beautifier`)

- Optimization options:**Purpose:** Format and beautify code (JS, HTML, CSS, JSON, etc.)

  - Remove comments

  - Remove metadata**Features Required:**

  - Remove unused IDs- Code input textarea

  - Minify colors (shorten hex codes)- Language selector (JavaScript, HTML, CSS, JSON, XML)

  - Round/precision numbers- Beautify/Format button

  - Remove empty attributes- Minify button (opposite of beautify)

  - Combine paths (optional)- Indentation settings (2 or 4 spaces, tabs)

- Before/After preview (visual)- Copy formatted code

- Before/After code comparison- Syntax highlighting

- File size comparison- Before/after comparison

- Download optimized SVG

- Copy optimized code**Technical Requirements:**

- Optimization level slider (light/medium/aggressive)- Use libraries like `js-beautify` or implement formatters

- Support multiple languages

**Technical Requirements:**- Syntax highlighting (Prism.js or similar)

- Implement SVG parsing and optimization (or use svgo-browser)- Client-side only

- Parse XML/SVG structure

- Remove unnecessary whitespace and attributes**SEO/Schema Requirements:**

- Maintain visual appearance- Full metadata targeting developers

- Client-side only processing- FAQPage schema (6 questions: code formatting, minification, language support, etc.)

- Preview in iframe or img- WebApplication schema



**SEO/Schema Requirements:**---

- Full metadata targeting web developers and designers

- FAQPage schema (6 questions: what is SVG optimization, file size savings, compatibility, etc.)### 15. **Favicon Generator** (`/favicon-generator`)

- WebApplication schema**Purpose:** Generate favicon files from an image



---**Features Required:**

- Image upload

## Implementation Requirements for ALL Tools- Generate multiple sizes (16x16, 32x32, 180x180, 192x192, 512x512)

- Preview all sizes

### File Structure (for each tool)- Download as .ico file

- Download as .png files (separate)

```- Download all as ZIP

app/[tool-slug]/- Generate manifest.json code

  ├── layout.tsx    (metadata + schemas)- Generate HTML link tags

  └── page.tsx      (client component with tool logic)

```**Technical Requirements:**

- Canvas API for resizing

### layout.tsx Template Structure- ICO file format generation (or use library)

- Create ZIP with jszip (already installed)

```typescript- Client-side only

import type { Metadata } from "next";

import Script from "next/script";**SEO/Schema Requirements:**

- Full metadata targeting web developers

const siteUrl = "https://nouploadtools.com";- FAQPage schema (6 questions: favicon sizes, formats, browser support, etc.)

- WebApplication schema

export const metadata: Metadata = {

  title: "[Tool Name] - [SEO Hook]",---

  description: "[150-160 char description with keywords]",

  keywords: ["keyword1", "keyword2", ...],### 16. **Unit Converter** (`/unit-converter`)

  alternates: {**Purpose:** Convert between common measurement units

    canonical: `${siteUrl}/[tool-slug]`

  },**Features Required:**

  openGraph: {- Category selector (Length, Weight, Temperature, Volume, Area, Speed, Time)

    url: `${siteUrl}/[tool-slug]`,- From unit selector

    type: "website",- To unit selector

    title: "[Tool Name] - [SEO Hook]",- Input value field

    description: "[Description]"- Real-time conversion

  }- Common conversions quick buttons

};- Conversion formula display

- Support decimal and scientific notation

const webAppSchema = {

  "@context": "https://schema.org",**Technical Requirements:**

  "@type": "WebApplication",- Conversion formulas for all units

  name: "[Tool Name]",- Categories: Length, Weight, Temperature, Volume, Area, Speed, Time, Data (bytes)

  url: `${siteUrl}/[tool-slug]`,- Client-side calculations

  description: "[Description]",- Handle edge cases (negative temps, etc.)

  applicationCategory: "UtilitiesApplication",

  offers: {**SEO/Schema Requirements:**

    "@type": "Offer",- Full metadata targeting students, engineers, general users

    price: "0",- FAQPage schema (6 questions: unit types, common conversions, accuracy, etc.)

    priceCurrency: "USD"- WebApplication schema

  },

  featureList: [---

    "Feature 1",

    "Feature 2",### 17. **Timer & Stopwatch** (`/timer-stopwatch`)

    // ... 4-6 features**Purpose:** Simple timer and stopwatch in browser

  ]

};**Features Required:**

- Tab toggle (Timer | Stopwatch)

const faqSchema = {- **Timer mode:** Set hours/minutes/seconds, Start, Pause, Reset, Sound alert

  "@context": "https://schema.org",- **Stopwatch mode:** Start, Pause, Reset, Lap times

  "@type": "FAQPage",- Full-screen mode option

  mainEntity: [- Sound notification (timer complete)

    {- Visual notification (browser notification API)

      "@type": "Question",- Save timer presets (common durations)

      name: "Question 1?",- Background timer (continues when tab not active)

      acceptedAnswer: {

        "@type": "Answer",**Technical Requirements:**

        text: "Answer 1..."- JavaScript setInterval/requestAnimationFrame

      }- Web Notifications API (with permission)

    },- Web Audio API for sound alert

    // ... 6 questions total- localStorage for presets

  ]- Client-side only

};

**SEO/Schema Requirements:**

export default function [Tool]Layout({ children }: { children: React.ReactNode }) {- Full metadata targeting students, productivity users

  return (- FAQPage schema (6 questions: timer vs stopwatch, accuracy, browser notifications, etc.)

    <>- WebApplication schema

      <Script

        id="[tool]-webapp-schema"---

        type="application/ld+json"

        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}### 18. **SVG Optimizer** (`/svg-optimizer`)

      />**Purpose:** Clean and minify SVG files

      <Script

        id="[tool]-faq-schema"**Features Required:**

        type="application/ld+json"- SVG file upload or paste

        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}- Preview original SVG

      />- Optimize button (remove metadata, comments, unused attributes)

      {children}- Optimization level (safe, aggressive)

    </>- Show file size before/after

  );- Download optimized SVG

}- Copy SVG code

```- Prettify option (readable formatting)



### page.tsx Template Structure**Technical Requirements:**

- Use library like `svgo` or implement basic optimization

```typescript- Parse SVG as XML

"use client";- Remove unnecessary attributes

- Minify paths

import { useState } from "react";- Client-side only

import { AdPlaceholder } from "../../components/AdPlaceholder";

**SEO/Schema Requirements:**

export default function [Tool]Page() {- Full metadata targeting web developers, designers

  // State management- FAQPage schema (6 questions: SVG optimization, file size, quality preservation, etc.)

  - WebApplication schema

  // Handler functions

  ---

  return (

    <div className="space-y-6">### BATCH 4: LOWER PRIORITY / ADVANCED (Optional - 0 tools in this batch, keeping focused)

      <header>

        <h1 className="text-3xl font-semibold tracking-tight">Note: Barcode Scanner requires camera access and is complex - skip for now or build later separately.

          [Tool Name]

        </h1>---

        <p className="mt-2 text-gray-700">

          [Description emphasizing privacy and no-upload]## Implementation Requirements for ALL Tools

        </p>

      </header>### File Structure (for each tool)

```

      <AdPlaceholder label="Top ad space" />app/[tool-slug]/

  ├── layout.tsx    (metadata + schemas)

      <div className="space-y-4">  └── page.tsx      (client component with tool logic)

        {/* Tool interface */}```

      </div>

### layout.tsx Template Structure

      <AdPlaceholder label="Bottom ad space" />```typescript

import type { Metadata } from "next";

      <section className="space-y-3 text-sm text-gray-700">import Script from "next/script";

        <h2 className="text-xl font-semibold">How to Use</h2>

        <ol className="list-decimal pl-6 space-y-2">const siteUrl = "https://nouploadtools.com";

          <li>Step 1</li>

          <li>Step 2</li>export const metadata: Metadata = {

        </ol>  title: "[Tool Name] - [SEO Hook]",

      </section>  description: "[150-160 char description with keywords]",

  keywords: ["keyword1", "keyword2", ...],

      <section className="space-y-3 text-sm text-gray-700">  alternates: {

        <h2 className="text-xl font-semibold">About [Tool]</h2>    canonical: `${siteUrl}/[tool-slug]`

        <p>[Educational content about the tool and privacy benefits]</p>  },

      </section>  openGraph: {

    </div>    url: `${siteUrl}/[tool-slug]`,

  );    type: "website",

}    title: "[Tool Name] - [SEO Hook]",

```    description: "[Description]"

  }

---};



## After Building Tools: Update lib/tools.tsconst webAppSchema = {

  "@context": "https://schema.org",

For each new tool (12 total), update status from `"soon"` to `"live"`:  "@type": "WebApplication",

  name: "[Tool Name]",

```typescript  url: `${siteUrl}/[tool-slug]`,

// Change these from "soon" to "live":  description: "[Description]",

{  applicationCategory: "UtilitiesApplication",

  slug: "file-encryptor",  offers: {

  path: "/file-encryptor",    "@type": "Offer",

  name: "File Encryptor",    price: "0",

  description: "Encrypt files with a password in your browser.",    priceCurrency: "USD"

  category: "dev",  },

  status: "live"  // ← Change from "soon"  featureList: [

},    "Feature 1",

{    "Feature 2",

  slug: "secure-password-checker",    // ... 4-6 features

  path: "/secure-password-checker",  ]

  name: "Secure Password Checker",};

  description: "Check password strength client-side.",

  category: "dev",const faqSchema = {

  status: "live"  // ← Change from "soon"  "@context": "https://schema.org",

},  "@type": "FAQPage",

{  mainEntity: [

  slug: "text-encryptor",    {

  path: "/text-encryptor",      "@type": "Question",

  name: "Text Encryptor",      name: "Question 1?",

  description: "Encrypt sensitive text locally.",      acceptedAnswer: {

  category: "text",        "@type": "Answer",

  status: "live"  // ← Change from "soon"        text: "Answer 1..."

},      }

{    },

  slug: "csv-converter",    // ... 6 questions total

  path: "/csv-converter",  ]

  name: "CSV Converter",};

  description: "Convert CSV to other formats locally.",

  category: "dev",export default function [Tool]Layout({ children }: { children: React.ReactNode }) {

  status: "live"  // ← Change from "soon"  return (

},    <>

{      <Script

  slug: "regex-tester",        id="[tool]-webapp-schema"

  path: "/regex-tester",        type="application/ld+json"

  name: "Regex Tester",        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}

  description: "Test regular expressions against sample text.",      />

  category: "dev",      <Script

  status: "live"  // ← Change from "soon"        id="[tool]-faq-schema"

},        type="application/ld+json"

{        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}

  slug: "html-entity-encoder",      />

  path: "/html-entity-encoder",      {children}

  name: "HTML Entity Encoder",    </>

  description: "Encode or decode HTML entities.",  );

  category: "dev",}

  status: "live"  // ← Change from "soon"```

},

{### page.tsx Template Structure

  slug: "image-format-converter",```typescript

  path: "/image-format-converter","use client";

  name: "Image Format Converter",

  description: "Convert between common image formats locally.",import { useState } from "react";

  category: "pdf",import { AdPlaceholder } from "../../components/AdPlaceholder";

  status: "live"  // ← Change from "soon"

},export default function [Tool]Page() {

{  // State management

  slug: "code-beautifier",  

  path: "/code-beautifier",  // Handler functions

  name: "Code Beautifier",  

  description: "Format and tidy code snippets in the browser.",  return (

  category: "dev",    <div className="space-y-6">

  status: "live"  // ← Change from "soon"      <header>

},        <h1 className="text-3xl font-semibold tracking-tight">

{          [Tool Name]

  slug: "favicon-generator",        </h1>

  path: "/favicon-generator",        <p className="mt-2 text-gray-700">

  name: "Favicon Generator",          [Description]

  description: "Generate favicon files from an image.",        </p>

  category: "misc",      </header>

  status: "live"  // ← Change from "soon"

},      <AdPlaceholder label="Top ad space" />

{

  slug: "unit-converter",      <div className="space-y-4">

  path: "/unit-converter",        {/* Tool interface */}

  name: "Unit Converter",      </div>

  description: "Convert between common units offline.",

  category: "misc",      <AdPlaceholder label="Bottom ad space" />

  status: "live"  // ← Change from "soon"

},      <section className="space-y-3 text-sm text-gray-700">

{        <h2 className="text-xl font-semibold">How to Use</h2>

  slug: "timer-stopwatch",        <ol className="list-decimal pl-6 space-y-2">

  path: "/timer-stopwatch",          <li>Step 1</li>

  name: "Timer & Stopwatch",          <li>Step 2</li>

  description: "Simple timer and stopwatch in your browser.",        </ol>

  category: "misc",      </section>

  status: "live"  // ← Change from "soon"

},      <section className="space-y-3 text-sm text-gray-700">

{        <h2 className="text-xl font-semibold">About [Tool]</h2>

  slug: "svg-optimizer",        <p>[Educational content about the tool]</p>

  path: "/svg-optimizer",      </section>

  name: "SVG Optimizer",    </div>

  description: "Clean and minify SVG files client-side.",  );

  category: "dev",}

  status: "live"  // ← Change from "soon"```

}

```---



---## After Building Tools: Update lib/tools.ts



## After Building Tools: Update app/sitemap.tsFor each new tool (18 total), update status from `"soon"` to `"live"`:



Add new dates to the `contentDates` object for all 12 tools:```typescript

// Change these from "soon" to "live":

```typescript{

const contentDates = {  slug: "text-diff",

  // ... existing dates ...  path: "/text-diff",

    name: "Text Diff",

  // BATCH 1: Security & Utility Tools  description: "Compare two blocks of text side by side.",

  fileEncryptor: "2024-11-29",  category: "text",

  securePasswordChecker: "2024-11-29",  status: "live"  // ← Change from "soon"

  textEncryptor: "2024-11-29",},

  csvConverter: "2024-11-29",{

  regexTester: "2024-11-29",  slug: "lorem-ipsum",

  htmlEntityEncoder: "2024-11-29",  path: "/lorem-ipsum",

    name: "Lorem Ipsum",

  // BATCH 2: Image & Code Tools  description: "Generate placeholder text locally.",

  imageFormatConverter: "2024-11-30",  category: "text",

  codeBeautifier: "2024-11-30",  status: "live"  // ← Change from "soon"

  faviconGenerator: "2024-11-30",},

  unitConverter: "2024-11-30",{

  timerStopwatch: "2024-11-30",  slug: "file-encryptor",

  svgOptimizer: "2024-11-30",  path: "/file-encryptor",

}  name: "File Encryptor",

```  description: "Encrypt files with a password in your browser.",

  category: "dev",

Then add the mapping logic:  status: "live"  // ← Change from "soon"

},

```typescript{

// Inside the toolUrls map function, add these conditions:  slug: "secure-password-checker",

else if (t.slug === "file-encryptor") {  path: "/secure-password-checker",

  lastMod = contentDates.fileEncryptor;  name: "Secure Password Checker",

} else if (t.slug === "secure-password-checker") {  description: "Check password strength client-side.",

  lastMod = contentDates.securePasswordChecker;  category: "dev",

} else if (t.slug === "text-encryptor") {  status: "live"  // ← Change from "soon"

  lastMod = contentDates.textEncryptor;},

} else if (t.slug === "csv-converter") {{

  lastMod = contentDates.csvConverter;  slug: "text-encryptor",

} else if (t.slug === "regex-tester") {  path: "/text-encryptor",

  lastMod = contentDates.regexTester;  name: "Text Encryptor",

} else if (t.slug === "html-entity-encoder") {  description: "Encrypt sensitive text locally.",

  lastMod = contentDates.htmlEntityEncoder;  category: "text",

} else if (t.slug === "image-format-converter") {  status: "live"  // ← Change from "soon"

  lastMod = contentDates.imageFormatConverter;},

} else if (t.slug === "code-beautifier") {{

  lastMod = contentDates.codeBeautifier;  slug: "markdown-editor",

} else if (t.slug === "favicon-generator") {  path: "/markdown-editor",

  lastMod = contentDates.faviconGenerator;  name: "Markdown Editor",

} else if (t.slug === "unit-converter") {  description: "Write and preview markdown offline.",

  lastMod = contentDates.unitConverter;  category: "text",

} else if (t.slug === "timer-stopwatch") {  status: "live"  // ← Change from "soon"

  lastMod = contentDates.timerStopwatch;},

} else if (t.slug === "svg-optimizer") {{

  lastMod = contentDates.svgOptimizer;  slug: "color-picker",

}  path: "/color-picker",

```  name: "Color Picker",

  description: "Pick and copy colors from the browser.",

**Note**: Use actual completion dates to show fresh content to Bing crawler.  category: "misc",

  status: "live"  // ← Change from "soon"

---},

{

## Design & UX Requirements  slug: "csv-converter",

  path: "/csv-converter",

### UI Consistency  name: "CSV Converter",

- Use existing Tailwind classes from other tools  description: "Convert CSV to other formats locally.",

- Match button styles: `bg-black text-white px-4 py-2 rounded-md`  category: "dev",

- Match input styles: `border border-gray-300 rounded-md px-3 py-2`  status: "live"  // ← Change from "soon"

- Use consistent spacing: `space-y-4`, `space-y-6`},

- Maintain mobile responsiveness{

  slug: "regex-tester",

### User Experience  path: "/regex-tester",

- Instant feedback (no loading states for client-side operations)  name: "Regex Tester",

- Clear error messages  description: "Test regular expressions against sample text.",

- Copy buttons should show "Copied!" feedback  category: "dev",

- Include helpful tooltips or hints  status: "live"  // ← Change from "soon"

- Add keyboard shortcuts where applicable},

- Privacy messaging throughout ("No uploads", "100% browser-based"){

  slug: "file-splitter",

### Accessibility  path: "/file-splitter",

- Proper ARIA labels  name: "File Splitter",

- Keyboard navigation support  description: "Split large files into smaller chunks client-side.",

- Focus indicators  category: "dev",

- Screen reader friendly  status: "live"  // ← Change from "soon"

},

---{

  slug: "favicon-generator",

## Testing Requirements  path: "/favicon-generator",

  name: "Favicon Generator",

Before committing:  description: "Generate favicon files from an image.",

  category: "misc",

1. ✅ Run `npm run lint` (must pass with no errors)  status: "live"  // ← Change from "soon"

2. ✅ Run `npm run build` (must compile successfully)},

3. ✅ Test each tool functionality manually{

4. ✅ Verify mobile responsiveness  slug: "image-format-converter",

5. ✅ Check all copy/download buttons work  path: "/image-format-converter",

6. ✅ Validate FAQPage schema with Google's Rich Results Test  name: "Image Format Converter",

  description: "Convert between common image formats locally.",

---  category: "pdf",

  status: "live"  // ← Change from "soon"

## Dependencies to Add},

{

You may need these packages (install if required):  slug: "code-beautifier",

  path: "/code-beautifier",

```bash  name: "Code Beautifier",

# For code beautifying and CSV parsing  description: "Format and tidy code snippets in the browser.",

npm install js-beautify papaparse he  category: "dev",

  status: "live"  // ← Change from "soon"

# TypeScript types},

npm install -D @types/js-beautify @types/papaparse @types/he{

```  slug: "html-entity-encoder",

  path: "/html-entity-encoder",

**Note**: Most tools can be built with native Web APIs (Canvas, Crypto, FileReader, Audio). Only install packages when absolutely necessary.  name: "HTML Entity Encoder",

  description: "Encode or decode HTML entities.",

---  category: "dev",

  status: "live"  // ← Change from "soon"

## Commit Message Format},

{

After building all 12 tools (or in batches):  slug: "unit-converter",

  path: "/unit-converter",

**Option 1 (All at once):**  name: "Unit Converter",

```  description: "Convert between common units offline.",

feat: Add 12 tools completing all 31 planned utilities  category: "misc",

  status: "live"  // ← Change from "soon"

BATCH 1 - Security & Utility Tools:},

- File Encryptor: Encrypt files with AES-GCM encryption{

- Secure Password Checker: Analyze password strength  slug: "timer-stopwatch",

- Text Encryptor: Encrypt/decrypt text with password  path: "/timer-stopwatch",

- CSV Converter: Convert CSV to JSON/Excel/SQL  name: "Timer & Stopwatch",

- Regex Tester: Test regex patterns with live matching  description: "Simple timer and stopwatch in your browser.",

- HTML Entity Encoder: Encode/decode HTML entities  category: "misc",

  status: "live"  // ← Change from "soon"

BATCH 2 - Image & Code Tools:},

- Image Format Converter: Convert between image formats{

- Code Beautifier: Format JavaScript/CSS/HTML/JSON  slug: "svg-optimizer",

- Favicon Generator: Generate favicon in multiple sizes  path: "/svg-optimizer",

- Unit Converter: Convert between measurement units  name: "SVG Optimizer",

- Timer & Stopwatch: Browser-based timer utility  description: "Clean and minify SVG files client-side.",

- SVG Optimizer: Minify and clean SVG files  category: "dev",

  status: "live"  // ← Change from "soon"

All tools process data client-side with FAQPage schema for SEO.}

Updated lib/tools.ts to mark all 12 tools as "live".```

Updated app/sitemap.ts with modification dates for new tools.

Site now has 31 total live tools.Also need to ADD these 2 new tools to lib/tools.ts (not in list yet):

``````typescript

{

**Option 2 (Per batch):**  slug: "uuid-generator",

```  path: "/uuid-generator",

feat: Add Batch 1 - 6 security and utility tools  name: "UUID Generator",

  description: "Generate universally unique identifiers.",

- File Encryptor: Password-based file encryption  category: "dev",

- Secure Password Checker: Client-side strength analysis  status: "live"

- Text Encryptor: AES-256-GCM text encryption},

- CSV Converter: Convert to JSON/SQL/TSV{

- Regex Tester: Live pattern matching  slug: "url-encoder",

- HTML Entity Encoder: Encode/decode entities  path: "/url-encoder",

  name: "URL Encoder",

All tools client-side with FAQPage schema for SEO.  description: "Encode and decode URLs and query parameters.",

```  category: "dev",

  status: "live"

---}

```

## Final Deliverables

---

1. **24 new files:**

   - 12 × `app/[tool-slug]/layout.tsx` (metadata + schema)## After Building Tools: Update app/sitemap.ts

   - 12 × `app/[tool-slug]/page.tsx` (UI + logic)

Add new dates to the `contentDates` object for all 18 tools:

2. **Updated files:**

   - `lib/tools.ts` (12 tools changed from "soon" to "live")```typescript

   - `app/sitemap.ts` (12 new date entries in contentDates)const contentDates = {

   - `package.json` and `package-lock.json` (if new packages added)  // ... existing dates ...

  

3. **Total site tools:** 31 (19 existing + 12 new)  // BATCH 1: High Priority Text & Dev Tools

  "/text-diff": new Date("2024-11-29").toISOString(),

---  "/lorem-ipsum": new Date("2024-11-29").toISOString(),

  "/markdown-editor": new Date("2024-11-29").toISOString(),

## Quality Checklist  "/color-picker": new Date("2024-11-29").toISOString(),

  "/uuid-generator": new Date("2024-11-29").toISOString(),

- [ ] All 12 tools work correctly  "/url-encoder": new Date("2024-11-29").toISOString(),

- [ ] Each tool has proper metadata and SEO (title, description, OG tags)  

- [ ] Each tool has FAQPage schema with 6 Q&As  // BATCH 2: Security & Utility Tools

- [ ] Each tool has WebApplication schema  "/file-encryptor": new Date("2024-11-30").toISOString(),

- [ ] All tools are client-side only (no server API calls)  "/secure-password-checker": new Date("2024-11-30").toISOString(),

- [ ] All tools emphasize "no upload" messaging  "/text-encryptor": new Date("2024-11-30").toISOString(),

- [ ] Mobile responsive on all screen sizes  "/csv-converter": new Date("2024-11-30").toISOString(),

- [ ] Copy/download functions work properly  "/regex-tester": new Date("2024-11-30").toISOString(),

- [ ] No console errors or warnings  "/html-entity-encoder": new Date("2024-11-30").toISOString(),

- [ ] `npm run lint` passes with no errors  

- [ ] `npm run build` succeeds  // BATCH 3: Image & Code Tools

- [ ] All 12 tools added to `lib/tools.ts` with `status: "live"`  "/image-format-converter": new Date("2024-12-01").toISOString(),

- [ ] All 12 tools added to `app/sitemap.ts` with proper dates  "/code-beautifier": new Date("2024-12-01").toISOString(),

- [ ] Test on actual devices (mobile + desktop)  "/favicon-generator": new Date("2024-12-01").toISOString(),

- [ ] Verify PWA offline functionality works  "/unit-converter": new Date("2024-12-01").toISOString(),

  "/timer-stopwatch": new Date("2024-12-01").toISOString(),

---  "/svg-optimizer": new Date("2024-12-01").toISOString(),

}

## Post-Deployment Steps```



After merging to main and deploying:**Note**: Use actual completion dates (Nov 29, Nov 30, Dec 1) to show fresh content to Bing crawler. Different dates help with indexation priority.



1. **Verify sitemap:** Visit `https://nouploadtools.com/sitemap.xml`---

   - Should now show 36 URLs (5 static + 31 tools + 5 blog posts)

   - Verify all new tool URLs are present## Design & UX Requirements

   - Check that lastmod dates are correct

### UI Consistency

2. **Submit to Bing:**- Use existing Tailwind classes from other tools

   - Go to Bing Webmaster Tools- Match button styles: `bg-black text-white px-4 py-2 rounded-md`

   - Submit updated sitemap- Match input styles: `border border-gray-300 rounded-md px-3 py-2`

   - Request immediate reindexing- Use consistent spacing: `space-y-4`, `space-y-6`

- Maintain mobile responsiveness

3. **Monitor indexing:**

   - Check "URL Inspection" tool in Bing Webmaster### User Experience

   - Verify new pages move from "Discovered" → "Crawled" → "Indexed"- Instant feedback (no loading states for client-side operations)

   - Expected timeline: 3-7 days for full indexing- Clear error messages

- Copy buttons should show "Copied!" feedback

4. **Test live site:**- Include helpful tooltips or hints

   - Verify all 31 tools accessible- Add keyboard shortcuts where applicable (Ctrl+Enter to generate, etc.)

   - Test on mobile devices

   - Check PWA offline mode### Accessibility

   - Validate structured data with Google Rich Results Test- Proper ARIA labels

- Keyboard navigation support

---- Focus indicators

- Screen reader friendly

## Notes

---

- **Barcode Scanner** is excluded from this batch as it requires camera API and is more complex. Can be added later as a separate feature.

- Focus on tools that provide immediate value and are easier to implement with existing dependencies.## Testing Requirements

- All 12 tools use only browser APIs and minimal external libraries to maintain the "no upload" privacy guarantee.

- This completes the NoUploadTools site with 31 total utilities covering PDF, text, developer, and misc tool categories.Before committing:

1. ✅ Run `npm run lint` (must pass with no errors)
2. ✅ Run `npm run build` (must compile successfully)
3. ✅ Test each tool functionality manually
4. ✅ Verify mobile responsiveness
5. ✅ Check all copy/download buttons work
6. ✅ Validate FAQPage schema with Google's Rich Results Test

---

## Dependencies to Add

You may need these packages (install if required):
```bash
# For text diff, markdown, syntax highlighting
npm install diff marked prismjs js-beautify papaparse

# TypeScript types
npm install -D @types/diff @types/marked @types/prismjs @types/js-beautify @types/papaparse
```

**Note**: Most tools can be built with native Web APIs (Canvas, Crypto, FileReader). Only install packages when absolutely necessary.

---

## Commit Message Format

After building all 18 tools (or in batches):

**Option 1 (All at once):**
```
feat: Add 18 tools completing all 31 planned utilities

BATCH 1 - High Priority Text & Dev Tools:
- Text Diff: Compare text blocks with highlighted differences
- Lorem Ipsum Generator: Generate placeholder text
- Markdown Editor: Write and preview markdown in real-time
- Color Picker: Pick colors and convert between formats
- UUID Generator: Generate unique identifiers (v4)
- URL Encoder: Encode/decode URLs and query parameters

BATCH 2 - Security & Utility Tools:
- File Encryptor: Encrypt files with AES-GCM encryption
- Secure Password Checker: Analyze password strength
- Text Encryptor: Encrypt/decrypt text with password
- CSV Converter: Convert CSV to JSON/Excel/SQL
- Regex Tester: Test regex patterns with live matching
- HTML Entity Encoder: Encode/decode HTML entities

BATCH 3 - Image & Code Tools:
- Image Format Converter: Convert between image formats
- Code Beautifier: Format JavaScript/CSS/HTML/JSON
- Favicon Generator: Generate favicon in multiple sizes
- Unit Converter: Convert between measurement units
- Timer & Stopwatch: Browser-based timer utility
- SVG Optimizer: Minify and clean SVG files

All tools process data client-side with FAQPage schema for SEO.
Updated lib/tools.ts to mark all 18 tools as "live".
Updated app/sitemap.ts with modification dates for new tools.
```

**Option 2 (Per batch):**
```
feat: Add Batch 1 - 6 text and developer utilities

- Text Diff: Compare text blocks with highlighted differences
- Lorem Ipsum Generator: Generate placeholder text
- Markdown Editor: Write and preview markdown
- Color Picker: Pick and convert color formats
- UUID Generator: Generate unique identifiers
- URL Encoder: Encode/decode URLs

All tools client-side with FAQPage schema for SEO.
```

---

## Final Deliverables

1. **36 new files:**
   - 18 × `app/[tool-slug]/layout.tsx` (metadata + schema)
   - 18 × `app/[tool-slug]/page.tsx` (UI + logic)

2. **Updated files:**
   - `lib/tools.ts` (18 tools changed from "soon" to "live", 2 new tools added)
   - `app/sitemap.ts` (18 new date entries in contentDates)
   - `package.json` and `package-lock.json` (if new packages added)

3. **Total site tools:** 31 (13 existing + 18 new)

---

## Quality Checklist

- [ ] All 18 tools work correctly
- [ ] Each tool has proper metadata and SEO (title, description, OG tags)
- [ ] Each tool has FAQPage schema with 6 Q&As
- [ ] Each tool has WebApplication schema
- [ ] All tools are client-side only (no server API calls)
- [ ] All tools emphasize "no upload" messaging
- [ ] Mobile responsive on all screen sizes
- [ ] Copy/download functions work properly
- [ ] No console errors or warnings
- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` succeeds
- [ ] All 18 tools added to `lib/tools.ts` with `status: "live"`
- [ ] All 18 tools added to `app/sitemap.ts` with proper dates
- [ ] Test on actual devices (mobile + desktop)
- [ ] Verify PWA offline functionality works

---

## Post-Deployment Steps

After merging to main and deploying:

1. **Verify sitemap:** Visit `https://nouploadtools.com/sitemap.xml`
   - Should now show 41 URLs (5 static + 31 tools + 5 blog posts)
   - Verify all new tool URLs are present
   - Check that lastmod dates are correct

2. **Submit to Bing:**
   - Go to Bing Webmaster Tools
   - Submit updated sitemap
   - Request immediate reindexing

3. **Monitor indexing:**
   - Check "URL Inspection" tool in Bing Webmaster
   - Verify new pages move from "Discovered" → "Crawled" → "Indexed"
   - Expected timeline: 3-7 days for full indexing

4. **Test live site:**
   - Verify all 31 tools accessible
   - Test on mobile devices
   - Check PWA offline mode
   - Validate structured data with Google Rich Results Test

---

This will bring the total from **13 live tools to 19 live tools**, significantly expanding the site's SEO footprint and user utility!
