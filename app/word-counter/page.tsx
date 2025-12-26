"use client";

import { useState, useEffect } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

type Stats = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
};

export default function WordCounterPage() {
  const [text, setText] = useState<string>("");
  const [stats, setStats] = useState<Stats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: "0 min",
    speakingTime: "0 min"
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;

    const words = text.trim()
      ? text
          .trim()
          .split(/\s+/)
          .filter((w) => w.length > 0).length
      : 0;

    const sentences = text.trim()
      ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;

    const paragraphs = text.trim()
      ? text.split(/\n\n+/).filter((p) => p.trim().length > 0).length
      : 0;

    // Average reading speed: 200-250 WPM
    const readingMinutes = words / 225;
    const readingTime =
      readingMinutes < 1
        ? `${Math.ceil(readingMinutes * 60)} sec`
        : `${Math.ceil(readingMinutes)} min`;

    // Average speaking speed: 125-150 WPM
    const speakingMinutes = words / 137;
    const speakingTime =
      speakingMinutes < 1
        ? `${Math.ceil(speakingMinutes * 60)} sec`
        : `${Math.ceil(speakingMinutes)} min`;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    });
  }, [text]);

  const clear = () => {
    setText("");
  };

  return (
    <div className="space-y-6 text-base text-gray-800">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Word Counter" }
        ]}
      />
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Word Counter</h1>
        <p className="text-sm text-gray-700">
          Count words, characters, sentences, and paragraphs. Estimate reading
          and speaking time. All processing happens locally.
        </p>
      </section>

      <section className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <h2 className="font-semibold">Completely Private</h2>
        <ul className="space-y-1 text-gray-700">
          <li>Text processed in your browser</li>
          <li>Never sent to any server</li>
          <li>Real-time counting</li>
        </ul>
      </section>

      <AdPlaceholder label="In-page ad space" />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <div className="text-2xl font-bold">{stats.words}</div>
          <div className="text-xs text-gray-600">Words</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <div className="text-2xl font-bold">{stats.characters}</div>
          <div className="text-xs text-gray-600">Characters</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <div className="text-2xl font-bold">{stats.charactersNoSpaces}</div>
          <div className="text-xs text-gray-600">No Spaces</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <div className="text-2xl font-bold">{stats.sentences}</div>
          <div className="text-xs text-gray-600">Sentences</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <div className="text-2xl font-bold">{stats.paragraphs}</div>
          <div className="text-xs text-gray-600">Paragraphs</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <div className="text-2xl font-bold">{stats.readingTime}</div>
          <div className="text-xs text-gray-600">Reading</div>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <div className="text-2xl font-bold">{stats.speakingTime}</div>
          <div className="text-xs text-gray-600">Speaking</div>
        </div>
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="text" className="text-sm font-semibold">
            Your Text
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
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="h-64 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Features */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">Features</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>📝 Word count</li>
          <li>🔤 Character count</li>
          <li>📄 Sentence & paragraph count</li>
          <li>⏱️ Reading time estimate</li>
          <li>🎤 Speaking time estimate</li>
          <li>⚡ Real-time updates</li>
          <li>🔒 100% private</li>
        </ul>
      </section>

      {/* Info */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">How It Works</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Reading time:</strong> Based on average 225 words per minute
          </li>
          <li>
            <strong>Speaking time:</strong> Based on average 137 words per
            minute
          </li>
          <li>
            <strong>Sentences:</strong> Counted by periods, exclamation marks,
            and question marks
          </li>
          <li>
            <strong>Paragraphs:</strong> Counted by double line breaks
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">How are words counted?</p>
            <p>
              Words are counted by splitting text on whitespace. Hyphenated
              words count as one word. Numbers count as words. Empty strings
              between multiple spaces are not counted.
            </p>
          </div>

          <div>
            <p className="font-semibold">How is reading time calculated?</p>
            <p>
              We use an average reading speed of 200-250 words per minute.
              Actual reading time varies based on content complexity and the
              reader.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What&apos;s the difference between character counts?
            </p>
            <p>
              &apos;Characters&apos; counts every character including spaces.
              &apos;Characters (no spaces)&apos; excludes spaces. Some platforms
              (like Twitter) count characters differently.
            </p>
          </div>

          <div>
            <p className="font-semibold">Is my text sent to a server?</p>
            <p>
              No. All counting happens instantly in your browser using
              JavaScript. Your text never leaves your device. Safe for
              confidential documents.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Does it work with different languages?
            </p>
            <p>
              Yes! Character counting works for any language. Word counting
              works best for space-separated languages. CJK languages without
              spaces may need different counting methods.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Why do word counts differ from Microsoft Word?
            </p>
            <p>
              Different tools count words slightly differently. Variations come
              from how hyphenated words, numbers, and special characters are
              handled. Differences are usually minor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
