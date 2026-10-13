import React, { useState, useCallback } from "react";
import Timer, { formatElapsedTime } from "./Timer";

/**
 * LyricBoard
 * ----------
 * A single global input controls a grid of blocks. Typing a word that
 * matches a hidden block reveals it and clears the input automatically.
 *
 * Usage:
 *   <LyricBoard words={["amber", "quartz", "willow", "ember"]} />
 */

const DEFAULT_WORDS = ["amber", "quartz", "willow", "ember", "cobalt", "linen"];

function normalize(str) {
  return str.trim().toLowerCase();
}

export default function LyricBoard({ words = DEFAULT_WORDS }) {
  const [revealed, setRevealed] = useState(() => new Set());
  const [input, setInput] = useState("");
  const [flash, setFlash] = useState(null); // "hit" | "miss" | null
  const [completionTime, setCompletionTime] = useState(null);

  const allRevealed = revealed.size === words.length;

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInput(value);

      const guess = normalize(value);
      if (!guess) return;

       // reveal every not-yet-revealed block that matches this guess
      const matchIndices = words
        .map((w, i) => (normalize(w) === guess && !revealed.has(i) ? i : null))
        .filter((i) => i !== null);
 
      if (matchIndices.length > 0) {
        setRevealed((prev) => {
          const next = new Set(prev);
          matchIndices.forEach((i) => next.add(i));
          return next;
        });

        setInput(""); // reset input on correct match
        setFlash("hit");
        window.setTimeout(() => setFlash(null), 400);
      }
    },
    [words, revealed]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      const guess = normalize(input);
      if (!guess) return;
      const isValid = words.some((w, i) => normalize(w) === guess && !revealed.has(i));
      if (!isValid) {
        setFlash("miss");
        window.setTimeout(() => setFlash(null), 400);
      }
    },
    [input, words]
  );

  const inputBorder =
    flash === "hit"
      ? "border-green-500"
      : flash === "miss"
      ? "border-red-500"
      : "border-black";

  return (
    <div className="max-w-xl bg-white text-black">
      <Timer isRunning={!allRevealed} onComplete={setCompletionTime} />
      <div>
        <label htmlFor="reveal-input">Enter a word to reveal it</label>
        <br />
        <input
          id="reveal-input"
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="type here…"
          autoComplete="off"
          spellCheck={false}
          className={`w-full rounded border-2 bg-white px-2 py-1.5 text-black ${inputBorder}`}
        />
        <p>
          {revealed.size} / {words.length} revealed
        </p>
      </div>

      <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
        {words.map((word, i) => {
          const isRevealed = revealed.has(i);
          return (
            <div
              key={i}
              className="rounded border-2 border-black bg-white p-1 text-center text-black"
            >
              {isRevealed ? word : ""}
            </div>
          );
        })}
      </div>

      {completionTime !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-complete-title"
            className="w-full max-w-sm rounded-lg bg-white p-6 text-center text-black shadow-xl"
          >
            <h2 id="game-complete-title" className="mb-2 text-xl font-bold">
              All lyrics have been revealed!
            </h2>
            <p className="mb-5">
              Your time: {formatElapsedTime(completionTime)}
            </p>
            <button
              type="button"
              onClick={() => setCompletionTime(null)}
              className="rounded bg-pink-500 px-4 py-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}