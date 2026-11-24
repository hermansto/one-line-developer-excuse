import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one funny line this entry submits: a developer excuse for prod.
const excuse =
  "It worked on my machine. Production just has commitment issues, the code didn't break, the server simply wasn't ready for this level of genius.";

// The grader gives us a writable output folder; default to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Make sure the folder exists, then write exactly the line, no newline.
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, excuse, "utf8");

// The competition caps the line at 200 characters, so fail loudly if
// anyone ever edits the excuse past that limit instead of shipping it.
if (excuse.length > 200) {
  throw new Error(`excuse is ${excuse.length} characters, over the 200 limit`);
}

// Read it back and confirm it is byte-for-byte the same line, with no
// trailing newline sneaking in at the end.
const written = readFileSync(outFile, "utf8");
if (written !== excuse) {
  throw new Error("entry.txt does not match the excuse line exactly");
}
if (written.endsWith("\n") || written.endsWith("\r")) {
  throw new Error("entry.txt must not end with a newline");
}
console.log(`Wrote ${written.length} characters to ${outFile}`);
