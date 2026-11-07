import { Fragment, type CSSProperties } from "react";

// Splits display copy into per-character spans for staggered reveals. Screen
// readers receive the sentence once; the animated copy is hidden from them.
export default function SplitText({
  lines,
  accentLast = false,
}: {
  lines: string[];
  accentLast?: boolean;
}) {
  const words = lines.map((line) => line.split(" "));
  const flat = words.flat();
  const starts = flat.map((_, index) =>
    flat.slice(0, index).reduce((sum, word) => sum + word.length, 0),
  );
  const total = flat.reduce((sum, word) => sum + word.length, 0);
  const parsed = words.map((lineWords, lineIndex) => {
    const before = words
      .slice(0, lineIndex)
      .reduce((count, line) => count + line.length, 0);
    return lineWords.map((word, wordIndex) => ({
      word,
      start: starts[before + wordIndex],
    }));
  });
  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      <span className="split" aria-hidden="true">
        {parsed.map((words, lineIndex) => (
          <span className="split-line" key={lineIndex}>
            {words.map(({ word, start }, wordIndex) => (
              <Fragment key={wordIndex}>
                {wordIndex > 0 && " "}
                <span className="split-word">
                  {Array.from(word).map((char, charIndex) => {
                    const position = start + charIndex;
                    return (
                      <span
                        key={charIndex}
                        className={`split-char${accentLast && position === total - 1 ? " is-accent" : ""}`}
                        style={{ "--ci": position } as CSSProperties}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}
