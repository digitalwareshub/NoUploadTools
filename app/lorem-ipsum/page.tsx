"use client";

import { useState, useCallback } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "perspiciatis",
  "unde",
  "omnis",
  "iste",
  "natus",
  "error",
  "voluptatem",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "explicabo",
  "nemo",
  "ipsam",
  "quia",
  "voluptas",
  "aspernatur",
  "aut",
  "odit",
  "fugit",
  "consequuntur",
  "magni",
  "dolores",
  "eos",
  "ratione",
  "sequi",
  "nesciunt",
  "neque",
  "porro",
  "quisquam",
  "dolorem",
  "adipisci",
  "numquam",
  "eius",
  "modi",
  "tempora",
  "magnam",
  "quaerat"
];

const CLASSIC_START =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";

type GenerateMode = "paragraphs" | "sentences" | "words";
type OutputFormat = "plain" | "html";

export default function LoremIpsumPage() {
  const [mode, setMode] = useState<GenerateMode>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithClassic, setStartWithClassic] = useState(true);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("plain");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const getRandomWord = useCallback(() => {
    return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
  }, []);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const generateSentence = useCallback(
    (wordCount?: number) => {
      const numWords = wordCount || Math.floor(Math.random() * 10) + 5;
      const words: string[] = [];
      for (let i = 0; i < numWords; i++) {
        words.push(getRandomWord());
      }
      return capitalize(words.join(" ")) + ".";
    },
    [getRandomWord]
  );

  const generateParagraph = useCallback(
    (isFirst: boolean = false) => {
      const numSentences = Math.floor(Math.random() * 4) + 4;
      const sentences: string[] = [];

      if (isFirst && startWithClassic) {
        sentences.push(CLASSIC_START.trim());
        for (let i = 1; i < numSentences; i++) {
          sentences.push(generateSentence());
        }
      } else {
        for (let i = 0; i < numSentences; i++) {
          sentences.push(generateSentence());
        }
      }

      return sentences.join(" ");
    },
    [startWithClassic, generateSentence]
  );

  const generate = useCallback(() => {
    let result = "";

    switch (mode) {
      case "paragraphs": {
        const paragraphs: string[] = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph(i === 0));
        }
        if (outputFormat === "html") {
          result = paragraphs.map((p) => `<p>${p}</p>`).join("\n\n");
        } else {
          result = paragraphs.join("\n\n");
        }
        break;
      }
      case "sentences": {
        const sentences: string[] = [];
        for (let i = 0; i < count; i++) {
          if (i === 0 && startWithClassic) {
            sentences.push(CLASSIC_START.trim());
          } else {
            sentences.push(generateSentence());
          }
        }
        result = sentences.join(" ");
        break;
      }
      case "words": {
        const words: string[] = [];
        if (startWithClassic) {
          const classicWords = CLASSIC_START.trim()
            .replace(".", "")
            .split(" ")
            .slice(0, count);
          words.push(...classicWords);
          for (let i = classicWords.length; i < count; i++) {
            words.push(getRandomWord());
          }
        } else {
          for (let i = 0; i < count; i++) {
            words.push(getRandomWord());
          }
        }
        result = words.join(" ");
        break;
      }
    }

    setOutput(result);
  }, [
    mode,
    count,
    startWithClassic,
    outputFormat,
    generateParagraph,
    generateSentence,
    getRandomWord
  ]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMaxCount = () => {
    switch (mode) {
      case "paragraphs":
        return 50;
      case "sentences":
        return 100;
      case "words":
        return 500;
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Lorem Ipsum" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Lorem Ipsum Generator
        </h1>
        <p className="mt-2 text-gray-700">
          Generate placeholder text for your designs, mockups, and prototypes.
          All processing happens locally in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="generate-mode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Generate
            </label>
            <select
              id="generate-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as GenerateMode)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count ({mode})
            </label>
            <input
              type="number"
              min={1}
              max={getMaxCount()}
              value={count}
              onChange={(e) =>
                setCount(
                  Math.min(
                    getMaxCount(),
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                )
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="output-format"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Output Format
            </label>
            <select
              id="output-format"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode !== "paragraphs"}
            >
              <option value="plain">Plain Text</option>
              <option value="html">HTML Paragraphs</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input
                type="checkbox"
                checked={startWithClassic}
                onChange={(e) => setStartWithClassic(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">
                Start with &quot;Lorem ipsum...&quot;
              </span>
            </label>
          </div>
        </div>

        {/* Generate button */}
        <div className="flex gap-2">
          <button
            onClick={generate}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Generate
          </button>
          {output && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          )}
        </div>

        {/* Output */}
        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Generated Text
              </span>
              <span className="text-xs text-gray-500">
                {output.split(/\s+/).length} words • {output.length} characters
              </span>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 border border-gray-300 rounded-md px-3 py-2 font-mono text-sm resize-none bg-gray-50"
            />
          </div>
        )}

        {/* Quick generate buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Quick generate:</span>
          {[1, 3, 5, 10].map((n) => (
            <button
              key={n}
              onClick={() => {
                setMode("paragraphs");
                setCount(n);
                setTimeout(generate, 0);
              }}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {n} paragraph{n > 1 ? "s" : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All text generation happens locally
          in your browser. Nothing is sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Choose what to generate: paragraphs, sentences, or words</li>
          <li>Set the count for how many items you need</li>
          <li>Toggle the classic &quot;Lorem ipsum&quot; start if desired</li>
          <li>Click Generate to create your placeholder text</li>
          <li>Copy the result to use in your designs</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Lorem Ipsum</h2>
        <p>
          Lorem Ipsum has been the industry&apos;s standard dummy text since the
          1500s, when an unknown printer scrambled a passage from Cicero&apos;s
          &quot;De Finibus Bonorum et Malorum&quot; to create a type specimen
          book. It survived five centuries of printing and the digital age,
          remaining the go-to placeholder text for designers and developers.
        </p>
        <p>
          The text resembles natural language patterns closely enough that it
          doesn&apos;t distract from design elements, while being obviously
          non-English to prevent confusion with actual content. This makes it
          ideal for prototypes, mockups, and layout testing.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">What is Lorem Ipsum?</p>
            <p>
              Lorem Ipsum is placeholder text used in the printing and design
              industry. It originated from a 1st century BC Latin text by
              Cicero, though it has been altered over time. Designers use it to
              demonstrate layouts without distracting viewers with meaningful
              content.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why use Lorem Ipsum instead of real text?
            </p>
            <p>
              Lorem Ipsum is used because it has a relatively normal
              distribution of letters and word lengths, making it look like
              readable English. This allows viewers to focus on design elements
              like typography, spacing, and layout rather than being distracted
              by actual content.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Is this Lorem Ipsum generator free to use?
            </p>
            <p>
              Yes, our Lorem Ipsum generator is completely free with no limits.
              Generate as much placeholder text as you need for your design
              projects, websites, or documents without any cost or registration.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I generate Lorem Ipsum in HTML format?
            </p>
            <p>
              Yes, our generator offers both plain text and HTML output options.
              The HTML format wraps paragraphs in &lt;p&gt; tags, making it
              ready to paste directly into your web projects.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What&apos;s the classic Lorem Ipsum starting phrase?
            </p>
            <p>
              The classic Lorem Ipsum text begins with &quot;Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.&quot; This opening is so
              well-known that many generators include an option to always start
              with this phrase for familiarity.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Is my generated text stored anywhere?
            </p>
            <p>
              No, all text generation happens in your browser using JavaScript.
              Nothing is sent to any server, and no generated text is stored or
              tracked.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
