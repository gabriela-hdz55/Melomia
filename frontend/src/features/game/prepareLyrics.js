const SECTION_MARKER = /^\[.*\]$/;
// Strip leading/trailing punctuation but keep internal characters like
// apostrophes ("don't") and hyphens ("well-worn") intact.
const EDGE_PUNCTUATION = /^[^\w']+|[^\w']+$/g;

export function prepareLyrics(rawLyrics) {
  if (!rawLyrics) return [];

  return rawLyrics
    .split("\n")
    .filter((line) => !SECTION_MARKER.test(line.trim()))
    .flatMap((line) => line.trim().split(/\s+/))
    .map((word) => word.replace(EDGE_PUNCTUATION, ""))
    .filter(Boolean);
}
