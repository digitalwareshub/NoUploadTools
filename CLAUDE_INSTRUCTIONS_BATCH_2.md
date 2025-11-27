# Instructions for Claude: Build ALL Remaining 18 Tools for NoUploadTools

## Project Context
NoUploadTools is a privacy-first browser utility site where all processing happens client-side. Currently live with 13 tools. Need to complete the site with ALL remaining 18 tools to reach 31 total tools for maximum SEO coverage and user utility.

## Current Tech Stack
- **Framework:** Next.js 14.2.3 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Existing Dependencies:** pdf-lib, pdfjs-dist, qrcode, spark-md5, jszip
- **Pattern:** Each tool has layout.tsx (metadata + FAQPage schema) and page.tsx (client-side tool)

## Tools to Build (Priority Order - 18 Total)

### BATCH 1: HIGH PRIORITY TEXT & DEVELOPER TOOLS (6 tools)

### 1. **Text Diff Tool** (`/text-diff`)
**Purpose:** Compare two blocks of text side-by-side with highlighted differences

**Features Required:**
- Two textarea inputs for text comparison
- Side-by-side or unified diff view toggle
- Highlight additions (green), deletions (red), changes (yellow)
- Line-by-line comparison
- Character-level diff option
- Copy result button
- Clear/reset functionality
- Case-sensitive toggle option

**Technical Requirements:**
- Use a diff library like `diff` or implement simple character/line diff
- Client-side only processing
- Syntax highlighting for differences
- Responsive layout (stack on mobile)

**SEO/Schema Requirements:**
- Full metadata (title, description, keywords)
- OpenGraph and Twitter cards
- FAQPage schema with 6 questions about text comparison, use cases, privacy
- WebApplication schema

---

### 2. **Lorem Ipsum Generator** (`/lorem-ipsum`)
**Purpose:** Generate placeholder text for design mockups

**Features Required:**
- Paragraph count slider (1-50)
- Word count option (custom number)
- Character count option
- Sentence count option
- "Start with 'Lorem ipsum dolor sit amet'" toggle
- Copy to clipboard button
- Generate multiple variations button
- Output format options: plain text, HTML paragraphs

**Technical Requirements:**
- Classic Lorem Ipsum dictionary
- Random generation algorithm
- No external API calls
- Instant generation

**SEO/Schema Requirements:**
- Full metadata targeting designers, developers
- FAQPage schema (6 questions: what is lorem ipsum, when to use, alternatives, etc.)
- WebApplication schema

---

### 3. **Markdown Editor** (`/markdown-editor`)
**Purpose:** Write and preview markdown in real-time

**Features Required:**
- Split-pane editor (markdown input | live preview)
- Support common markdown: headers, bold, italic, links, images, lists, code blocks, tables
- Toolbar with formatting shortcuts
- Download as .md file
- Copy markdown or HTML output
- Fullscreen mode toggle
- Dark/light theme toggle
- Template examples (README, documentation, etc.)

**Technical Requirements:**
- Use `marked` or `remark` for markdown parsing
- Syntax highlighting for code blocks (use `prismjs` or similar)
- Client-side rendering only
- Save to localStorage (optional feature)

**SEO/Schema Requirements:**
- Full metadata targeting developers, writers
- FAQPage schema (6 questions about markdown syntax, use cases, privacy)
- WebApplication schema

---

### 4. **Color Picker & Converter** (`/color-picker`)
**Purpose:** Pick colors and convert between color formats

**Features Required:**
- Visual color picker (HSL/RGB/Hex)
- Input fields for HEX, RGB, HSL, CMYK
- Real-time conversion between all formats
- Color palette generator (complementary, analogous, triadic, etc.)
- Copy color codes button
- Color history/saved colors
- Contrast checker (WCAG compliance for text)
- Random color generator

**Technical Requirements:**
- Use HTML5 color input as base
- Convert between color spaces (RGB ↔ HSL ↔ CMYK ↔ HEX)
- Calculate color relationships for palette generation
- WCAG contrast ratio calculator
- No external APIs

**SEO/Schema Requirements:**
- Full metadata targeting designers, developers
- FAQPage schema (6 questions: color formats, WCAG compliance, etc.)
- WebApplication schema

---

### 5. **UUID/GUID Generator** (`/uuid-generator`)
**Purpose:** Generate universally unique identifiers

**Features Required:**
- Generate UUID v4 (random)
- Generate UUID v1 (timestamp-based) optional
- Bulk generation (1-100 UUIDs at once)
- Uppercase/lowercase toggle
- With/without hyphens toggle
- Copy individual UUID or copy all
- Regenerate button
- Show UUID format explanation

**Technical Requirements:**
- Use Web Crypto API for secure random generation
- UUID v4 implementation (random 128-bit)
- Client-side only
- No dependencies needed (or use `uuid` package if preferred)

**SEO/Schema Requirements:**
- Full metadata targeting developers
- FAQPage schema (6 questions: what is UUID, UUID versions, when to use, etc.)
- WebApplication schema

---

### 6. **URL Encoder/Decoder** (`/url-encoder`)
**Purpose:** Encode and decode URLs and query parameters

**Features Required:**
- Input textarea for URL/text
- Encode button (encodeURIComponent)
- Decode button (decodeURIComponent)
- Full URL encoding vs component encoding toggle
- Parse query parameters (show as key-value table)
- Encode/decode individual parameters
- Copy result button
- Clear functionality
- Handle special characters explanation

**Technical Requirements:**
- Use built-in `encodeURIComponent()`, `decodeURIComponent()`
- Use built-in `encodeURI()`, `decodeURI()` for full URLs
- Parse URL parameters using URLSearchParams API
- Client-side only
- Handle edge cases (already encoded, malformed URLs)

**SEO/Schema Requirements:**
- Full metadata targeting developers
- FAQPage schema (6 questions: URL encoding, when needed, special characters, etc.)
- WebApplication schema

---

### BATCH 2: SECURITY & UTILITY TOOLS (6 tools)

### 7. **File Encryptor** (`/file-encryptor`)
**Purpose:** Encrypt files with a password before sharing

**Features Required:**
- File upload/drag-drop input
- Password input (with confirmation)
- Encryption algorithm selector (AES-256 recommended)
- Encrypt button
- Download encrypted file (.enc extension)
- File size limit warning (browser memory considerations)
- Show encryption progress
- Decrypt mode toggle (decrypt .enc files with password)

**Technical Requirements:**
- Use Web Crypto API (SubtleCrypto.encrypt)
- AES-GCM encryption
- Generate secure salt and IV
- Client-side only processing
- Handle large files with chunking if needed

**SEO/Schema Requirements:**
- Full metadata targeting privacy-conscious users
- FAQPage schema (6 questions: encryption strength, security, file types, password requirements, etc.)
- WebApplication schema

---

### 8. **Secure Password Checker** (`/secure-password-checker`)
**Purpose:** Check password strength and security without sending to server

**Features Required:**
- Password input field (with show/hide toggle)
- Real-time strength meter (weak, fair, good, strong, very strong)
- Detailed feedback (length, character variety, common patterns)
- Check against common passwords list (local, no API)
- Estimate crack time
- Show entropy score
- Breach check warning (but don't actually check - privacy focus)
- Suggestions for improvement

**Technical Requirements:**
- Password strength algorithm (zxcvbn-style scoring)
- Local common passwords dictionary (top 1000)
- Pattern detection (sequences, repeats, keyboard patterns)
- Entropy calculation
- Client-side only (emphasize NO data sent anywhere)

**SEO/Schema Requirements:**
- Full metadata targeting security-conscious users
- FAQPage schema (6 questions: password strength, what makes strong password, entropy, etc.)
- WebApplication schema

---

### 9. **Text Encryptor** (`/text-encryptor`)
**Purpose:** Encrypt/decrypt text messages with password

**Features Required:**
- Text input area
- Password field
- Encrypt/Decrypt toggle
- Output area (encrypted Base64 or decrypted text)
- Copy encrypted text button
- Clear functionality
- Algorithm info (AES-256-GCM)
- Share instructions (how to send encrypted text safely)

**Technical Requirements:**
- Web Crypto API (SubtleCrypto)
- AES-GCM encryption
- Base64 encoding for output
- PBKDF2 for key derivation from password
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting privacy/security users
- FAQPage schema (6 questions: encryption methods, security, use cases, etc.)
- WebApplication schema

---

### 10. **CSV Converter** (`/csv-converter`)
**Purpose:** Convert CSV to JSON, Excel, or other formats

**Features Required:**
- CSV file upload or paste input
- Auto-detect delimiter (comma, semicolon, tab)
- Preview parsed data (table view)
- Export formats: JSON, Excel (XLSX), TSV, SQL INSERT
- Custom delimiter input
- First row as headers toggle
- Download converted file
- Sample CSV template

**Technical Requirements:**
- CSV parsing (use library or implement parser)
- JSON conversion
- Use `xlsx` library for Excel export
- SQL INSERT statement generation
- Handle edge cases (quotes, commas in values)
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting developers, data analysts
- FAQPage schema (6 questions: CSV format, delimiter types, data conversion, etc.)
- WebApplication schema

---

### 11. **Regex Tester** (`/regex-tester`)
**Purpose:** Test regular expressions against sample text

**Features Required:**
- Regex pattern input (with flags: g, i, m, s, u)
- Test string textarea (multi-line support)
- Live match highlighting
- Match count and match groups display
- Replace mode (regex replace preview)
- Common regex examples/templates (email, URL, phone, date)
- Regex explanation (what the pattern does)
- Export matches as list

**Technical Requirements:**
- JavaScript RegExp
- Syntax highlighting for matches
- Handle regex errors gracefully
- Show capture groups
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting developers
- FAQPage schema (6 questions: regex syntax, flags, common patterns, etc.)
- WebApplication schema

---

### 12. **HTML Entity Encoder/Decoder** (`/html-entity-encoder`)
**Purpose:** Encode and decode HTML entities

**Features Required:**
- Input textarea
- Encode/Decode toggle buttons
- Encode options: Named entities (&amp;) or numeric (&#38;)
- Decode both named and numeric entities
- Copy result button
- Clear functionality
- Show common entities reference table
- Handle special characters

**Technical Requirements:**
- HTML entity mapping (create lookup table)
- Handle both &name; and &#num; formats
- Use built-in browser APIs where possible
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting developers, content creators
- FAQPage schema (6 questions: HTML entities, when to use, encoding vs escaping, etc.)
- WebApplication schema

---

### BATCH 3: IMAGE & CODE TOOLS (6 tools)

### 13. **Image Format Converter** (`/image-format-converter`)
**Purpose:** Convert images between formats (JPG, PNG, WebP, etc.)

**Features Required:**
- Image upload/drag-drop
- Source format auto-detection
- Target format selector (JPG, PNG, WebP, BMP, GIF)
- Quality slider (for lossy formats)
- Preview before/after
- Download converted image
- Batch conversion support
- Show file size comparison

**Technical Requirements:**
- Canvas API for conversion
- Handle transparency (PNG/WebP to JPG)
- Quality compression settings
- Client-side only
- Handle large images

**SEO/Schema Requirements:**
- Full metadata targeting designers, photographers
- FAQPage schema (6 questions: image formats, quality, transparency, when to use each, etc.)
- WebApplication schema

---

### 14. **Code Beautifier** (`/code-beautifier`)
**Purpose:** Format and beautify code (JS, HTML, CSS, JSON, etc.)

**Features Required:**
- Code input textarea
- Language selector (JavaScript, HTML, CSS, JSON, XML)
- Beautify/Format button
- Minify button (opposite of beautify)
- Indentation settings (2 or 4 spaces, tabs)
- Copy formatted code
- Syntax highlighting
- Before/after comparison

**Technical Requirements:**
- Use libraries like `js-beautify` or implement formatters
- Support multiple languages
- Syntax highlighting (Prism.js or similar)
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting developers
- FAQPage schema (6 questions: code formatting, minification, language support, etc.)
- WebApplication schema

---

### 15. **Favicon Generator** (`/favicon-generator`)
**Purpose:** Generate favicon files from an image

**Features Required:**
- Image upload
- Generate multiple sizes (16x16, 32x32, 180x180, 192x192, 512x512)
- Preview all sizes
- Download as .ico file
- Download as .png files (separate)
- Download all as ZIP
- Generate manifest.json code
- Generate HTML link tags

**Technical Requirements:**
- Canvas API for resizing
- ICO file format generation (or use library)
- Create ZIP with jszip (already installed)
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting web developers
- FAQPage schema (6 questions: favicon sizes, formats, browser support, etc.)
- WebApplication schema

---

### 16. **Unit Converter** (`/unit-converter`)
**Purpose:** Convert between common measurement units

**Features Required:**
- Category selector (Length, Weight, Temperature, Volume, Area, Speed, Time)
- From unit selector
- To unit selector
- Input value field
- Real-time conversion
- Common conversions quick buttons
- Conversion formula display
- Support decimal and scientific notation

**Technical Requirements:**
- Conversion formulas for all units
- Categories: Length, Weight, Temperature, Volume, Area, Speed, Time, Data (bytes)
- Client-side calculations
- Handle edge cases (negative temps, etc.)

**SEO/Schema Requirements:**
- Full metadata targeting students, engineers, general users
- FAQPage schema (6 questions: unit types, common conversions, accuracy, etc.)
- WebApplication schema

---

### 17. **Timer & Stopwatch** (`/timer-stopwatch`)
**Purpose:** Simple timer and stopwatch in browser

**Features Required:**
- Tab toggle (Timer | Stopwatch)
- **Timer mode:** Set hours/minutes/seconds, Start, Pause, Reset, Sound alert
- **Stopwatch mode:** Start, Pause, Reset, Lap times
- Full-screen mode option
- Sound notification (timer complete)
- Visual notification (browser notification API)
- Save timer presets (common durations)
- Background timer (continues when tab not active)

**Technical Requirements:**
- JavaScript setInterval/requestAnimationFrame
- Web Notifications API (with permission)
- Web Audio API for sound alert
- localStorage for presets
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting students, productivity users
- FAQPage schema (6 questions: timer vs stopwatch, accuracy, browser notifications, etc.)
- WebApplication schema

---

### 18. **SVG Optimizer** (`/svg-optimizer`)
**Purpose:** Clean and minify SVG files

**Features Required:**
- SVG file upload or paste
- Preview original SVG
- Optimize button (remove metadata, comments, unused attributes)
- Optimization level (safe, aggressive)
- Show file size before/after
- Download optimized SVG
- Copy SVG code
- Prettify option (readable formatting)

**Technical Requirements:**
- Use library like `svgo` or implement basic optimization
- Parse SVG as XML
- Remove unnecessary attributes
- Minify paths
- Client-side only

**SEO/Schema Requirements:**
- Full metadata targeting web developers, designers
- FAQPage schema (6 questions: SVG optimization, file size, quality preservation, etc.)
- WebApplication schema

---

### BATCH 4: LOWER PRIORITY / ADVANCED (Optional - 0 tools in this batch, keeping focused)

Note: Barcode Scanner requires camera access and is complex - skip for now or build later separately.

---

## Implementation Requirements for ALL Tools

### File Structure (for each tool)
```
app/[tool-slug]/
  ├── layout.tsx    (metadata + schemas)
  └── page.tsx      (client component with tool logic)
```

### layout.tsx Template Structure
```typescript
import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "[Tool Name] - [SEO Hook]",
  description: "[150-160 char description with keywords]",
  keywords: ["keyword1", "keyword2", ...],
  alternates: {
    canonical: `${siteUrl}/[tool-slug]`
  },
  openGraph: {
    url: `${siteUrl}/[tool-slug]`,
    type: "website",
    title: "[Tool Name] - [SEO Hook]",
    description: "[Description]"
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "[Tool Name]",
  url: `${siteUrl}/[tool-slug]`,
  description: "[Description]",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Feature 1",
    "Feature 2",
    // ... 4-6 features
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Question 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Answer 1..."
      }
    },
    // ... 6 questions total
  ]
};

export default function [Tool]Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="[tool]-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="[tool]-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
```

### page.tsx Template Structure
```typescript
"use client";

import { useState } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

export default function [Tool]Page() {
  // State management
  
  // Handler functions
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          [Tool Name]
        </h1>
        <p className="mt-2 text-gray-700">
          [Description]
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Tool interface */}
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Step 1</li>
          <li>Step 2</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About [Tool]</h2>
        <p>[Educational content about the tool]</p>
      </section>
    </div>
  );
}
```

---

## After Building Tools: Update lib/tools.ts

For each new tool (18 total), update status from `"soon"` to `"live"`:

```typescript
// Change these from "soon" to "live":
{
  slug: "text-diff",
  path: "/text-diff",
  name: "Text Diff",
  description: "Compare two blocks of text side by side.",
  category: "text",
  status: "live"  // ← Change from "soon"
},
{
  slug: "lorem-ipsum",
  path: "/lorem-ipsum",
  name: "Lorem Ipsum",
  description: "Generate placeholder text locally.",
  category: "text",
  status: "live"  // ← Change from "soon"
},
{
  slug: "file-encryptor",
  path: "/file-encryptor",
  name: "File Encryptor",
  description: "Encrypt files with a password in your browser.",
  category: "dev",
  status: "live"  // ← Change from "soon"
},
{
  slug: "secure-password-checker",
  path: "/secure-password-checker",
  name: "Secure Password Checker",
  description: "Check password strength client-side.",
  category: "dev",
  status: "live"  // ← Change from "soon"
},
{
  slug: "text-encryptor",
  path: "/text-encryptor",
  name: "Text Encryptor",
  description: "Encrypt sensitive text locally.",
  category: "text",
  status: "live"  // ← Change from "soon"
},
{
  slug: "markdown-editor",
  path: "/markdown-editor",
  name: "Markdown Editor",
  description: "Write and preview markdown offline.",
  category: "text",
  status: "live"  // ← Change from "soon"
},
{
  slug: "color-picker",
  path: "/color-picker",
  name: "Color Picker",
  description: "Pick and copy colors from the browser.",
  category: "misc",
  status: "live"  // ← Change from "soon"
},
{
  slug: "csv-converter",
  path: "/csv-converter",
  name: "CSV Converter",
  description: "Convert CSV to other formats locally.",
  category: "dev",
  status: "live"  // ← Change from "soon"
},
{
  slug: "regex-tester",
  path: "/regex-tester",
  name: "Regex Tester",
  description: "Test regular expressions against sample text.",
  category: "dev",
  status: "live"  // ← Change from "soon"
},
{
  slug: "file-splitter",
  path: "/file-splitter",
  name: "File Splitter",
  description: "Split large files into smaller chunks client-side.",
  category: "dev",
  status: "live"  // ← Change from "soon"
},
{
  slug: "favicon-generator",
  path: "/favicon-generator",
  name: "Favicon Generator",
  description: "Generate favicon files from an image.",
  category: "misc",
  status: "live"  // ← Change from "soon"
},
{
  slug: "image-format-converter",
  path: "/image-format-converter",
  name: "Image Format Converter",
  description: "Convert between common image formats locally.",
  category: "pdf",
  status: "live"  // ← Change from "soon"
},
{
  slug: "code-beautifier",
  path: "/code-beautifier",
  name: "Code Beautifier",
  description: "Format and tidy code snippets in the browser.",
  category: "dev",
  status: "live"  // ← Change from "soon"
},
{
  slug: "html-entity-encoder",
  path: "/html-entity-encoder",
  name: "HTML Entity Encoder",
  description: "Encode or decode HTML entities.",
  category: "dev",
  status: "live"  // ← Change from "soon"
},
{
  slug: "unit-converter",
  path: "/unit-converter",
  name: "Unit Converter",
  description: "Convert between common units offline.",
  category: "misc",
  status: "live"  // ← Change from "soon"
},
{
  slug: "timer-stopwatch",
  path: "/timer-stopwatch",
  name: "Timer & Stopwatch",
  description: "Simple timer and stopwatch in your browser.",
  category: "misc",
  status: "live"  // ← Change from "soon"
},
{
  slug: "svg-optimizer",
  path: "/svg-optimizer",
  name: "SVG Optimizer",
  description: "Clean and minify SVG files client-side.",
  category: "dev",
  status: "live"  // ← Change from "soon"
}
```

Also need to ADD these 2 new tools to lib/tools.ts (not in list yet):
```typescript
{
  slug: "uuid-generator",
  path: "/uuid-generator",
  name: "UUID Generator",
  description: "Generate universally unique identifiers.",
  category: "dev",
  status: "live"
},
{
  slug: "url-encoder",
  path: "/url-encoder",
  name: "URL Encoder",
  description: "Encode and decode URLs and query parameters.",
  category: "dev",
  status: "live"
}
```

---

## After Building Tools: Update app/sitemap.ts

Add new dates to the `contentDates` object for all 18 tools:

```typescript
const contentDates = {
  // ... existing dates ...
  
  // BATCH 1: High Priority Text & Dev Tools
  "/text-diff": new Date("2024-11-29").toISOString(),
  "/lorem-ipsum": new Date("2024-11-29").toISOString(),
  "/markdown-editor": new Date("2024-11-29").toISOString(),
  "/color-picker": new Date("2024-11-29").toISOString(),
  "/uuid-generator": new Date("2024-11-29").toISOString(),
  "/url-encoder": new Date("2024-11-29").toISOString(),
  
  // BATCH 2: Security & Utility Tools
  "/file-encryptor": new Date("2024-11-30").toISOString(),
  "/secure-password-checker": new Date("2024-11-30").toISOString(),
  "/text-encryptor": new Date("2024-11-30").toISOString(),
  "/csv-converter": new Date("2024-11-30").toISOString(),
  "/regex-tester": new Date("2024-11-30").toISOString(),
  "/html-entity-encoder": new Date("2024-11-30").toISOString(),
  
  // BATCH 3: Image & Code Tools
  "/image-format-converter": new Date("2024-12-01").toISOString(),
  "/code-beautifier": new Date("2024-12-01").toISOString(),
  "/favicon-generator": new Date("2024-12-01").toISOString(),
  "/unit-converter": new Date("2024-12-01").toISOString(),
  "/timer-stopwatch": new Date("2024-12-01").toISOString(),
  "/svg-optimizer": new Date("2024-12-01").toISOString(),
}
```

**Note**: Use actual completion dates (Nov 29, Nov 30, Dec 1) to show fresh content to Bing crawler. Different dates help with indexation priority.

---

## Design & UX Requirements

### UI Consistency
- Use existing Tailwind classes from other tools
- Match button styles: `bg-black text-white px-4 py-2 rounded-md`
- Match input styles: `border border-gray-300 rounded-md px-3 py-2`
- Use consistent spacing: `space-y-4`, `space-y-6`
- Maintain mobile responsiveness

### User Experience
- Instant feedback (no loading states for client-side operations)
- Clear error messages
- Copy buttons should show "Copied!" feedback
- Include helpful tooltips or hints
- Add keyboard shortcuts where applicable (Ctrl+Enter to generate, etc.)

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

---

## Testing Requirements

Before committing:
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
