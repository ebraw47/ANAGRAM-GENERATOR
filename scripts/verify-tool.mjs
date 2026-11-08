import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "src/lib/anagram.ts");
const outDir = path.join(root, ".tmp-verify");
fs.mkdirSync(outDir, { recursive: true });

const tsc = spawnSync(
  "npx",
  [
    "tsc",
    src,
    "--outDir",
    outDir,
    "--module",
    "esnext",
    "--target",
    "es2020",
    "--moduleResolution",
    "node",
    "--esModuleInterop",
    "--skipLibCheck",
  ],
  { cwd: root, encoding: "utf8" }
);

if (tsc.status !== 0) {
  console.error(tsc.stdout);
  console.error(tsc.stderr);
  process.exit(1);
}

const { findAnagrams, scrubInput, stripAccents } = await import(
  pathToFileURL(path.join(outDir, "anagram.js")).href
);

const miniDict = [
  "silent",
  "enlist",
  "tinsel",
  "listen",
  "dirty",
  "room",
  "dormitory",
  "heart",
  "earth",
  "thing",
  "night",
  "let",
  "list",
  "line",
];

const cases = [
  {
    name: "exact listen",
    input: "listen",
    mode: "exact",
    expectIncludes: ["silent", "enlist", "tinsel"],
  },
  {
    name: "subset listen includes short",
    input: "listen",
    mode: "subset",
    expectIncludes: ["let", "list", "silent"],
  },
  {
    name: "multi dormitory",
    input: "dormitory",
    mode: "multi",
    expectIncludes: ["dirty room"],
  },
];

let failed = 0;
for (const c of cases) {
  const result = findAnagrams(miniDict, c.input, {
    mode: c.mode,
    minLength: 2,
    maxWords: 2,
    maxResults: 50,
  });
  const words = result.hits.map((h) => h.word);
  for (const need of c.expectIncludes) {
    if (!words.includes(need)) {
      console.error(`FAIL ${c.name}: missing ${need}; got ${words.join(", ")}`);
      failed += 1;
    }
  }
}

const scrub = scrubInput("Hi!? There");
if (scrub.letters !== "hithere" || scrub.wildcards !== 1) {
  console.error("FAIL scrubInput", scrub);
  failed += 1;
}

if (stripAccents("café") !== "cafe") {
  console.error("FAIL stripAccents", stripAccents("café"));
  failed += 1;
}

const accentScrub = scrubInput("café");
if (accentScrub.letters !== "cafe") {
  console.error("FAIL accent scrub", accentScrub);
  failed += 1;
}

if (failed) {
  console.error(`${failed} failure(s)`);
  process.exit(1);
}

console.log("anagram engine ok");
