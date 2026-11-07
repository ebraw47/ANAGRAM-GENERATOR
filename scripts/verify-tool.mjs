import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "src/lib/titleCase.ts");
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

const { convertCase, convertCaseDetailed } = await import(
  pathToFileURL(path.join(outDir, "titleCase.js")).href
);

const cases = [
  { name: "chicago basic", input: "the lord of the flies", mode: "title-chicago", expect: "The Lord of the Flies" },
  { name: "apa about", input: "a study about sleep and stress", mode: "title-apa", expect: "A Study About Sleep and Stress" },
  { name: "chicago about (5+ letter prep)", input: "a study about sleep and stress", mode: "title-chicago", expect: "A Study About Sleep and Stress" },
  { name: "mla with", input: "working with remote teams", mode: "title-mla", expect: "Working with Remote Teams" },
  { name: "ap with", input: "working with remote teams", mode: "title-ap", expect: "Working With Remote Teams" },
  { name: "sentence", input: "THE RISE OF REMOTE WORK IN AUSTIN", mode: "sentence", expect: "The rise of remote work in austin" },
  { name: "upper", input: "hello world", mode: "upper", expect: "HELLO WORLD" },
  { name: "lower", input: "Hello World", mode: "lower", expect: "hello world" },
  { name: "keep all caps", input: "FREE consultation with SEO tips", mode: "title-chicago", expect: "FREE Consultation with SEO Tips", opts: { keepAllCaps: true } },
  { name: "multi-line", input: "the art of war\nhow to build a brand", mode: "title-chicago", expect: "The Art of War\nHow to Build a Brand", opts: { multiLine: true } },
  { name: "first word always", input: "a better way to write", mode: "title-chicago", expect: "A Better Way to Write" },
  { name: "is verb", input: "what is title case", mode: "title-chicago", expect: "What Is Title Case" },
  { name: "wikipedia from", input: "tales from the crypt", mode: "title-wikipedia", expect: "Tales from the Crypt" },
  { name: "ama short prep", input: "life in the city", mode: "title-ama", expect: "Life in the City" },
  { name: "bluebook with", input: "dealing with evidence", mode: "title-bluebook", expect: "Dealing with Evidence" },
  { name: "nyt for", input: "tips for better headlines", mode: "title-nyt", expect: "Tips for Better Headlines" },
  { name: "whitespace passthrough", input: "   ", mode: "title-chicago", expect: "   " },
  { name: "acronym usa", input: "travel in the usa today", mode: "title-chicago", expect: "Travel in the USA Today" },
  { name: "colon subtitle", input: "growth: a practical guide", mode: "title-chicago", expect: "Growth: A Practical Guide" },
  { name: "colon long title", input: "the lord of the flies: a study about sleep and stress", mode: "title-chicago", expect: "The Lord of the Flies: A Study About Sleep and Stress" },
  { name: "straight quotes off curly", input: '"rock n roll"', mode: "title-chicago", expect: "“Rock N Roll”", opts: { straightQuotes: false } },
  { name: "straight quotes on", input: "“rock n roll”", mode: "title-chicago", expect: '"Rock N Roll"', opts: { straightQuotes: true } },
];

let pass = 0;
let fail = 0;
for (const c of cases) {
  const got = convertCase(c.input, c.mode, c.opts);
  if (got === c.expect) {
    pass++;
    console.log("PASS:", c.name);
  } else {
    fail++;
    console.log("FAIL:", c.name);
    console.log("  input :", JSON.stringify(c.input));
    console.log("  expect:", JSON.stringify(c.expect));
    console.log("  got   :", JSON.stringify(got));
  }
}

const det = convertCaseDetailed("what is title case", "title-chicago");
const explOk = det.words.length >= 4 && det.words.every((w) => w.reason.length > 0);
console.log(explOk ? "PASS: explanations" : "FAIL: explanations");
if (explOk) pass++;
else fail++;

console.log("\nRESULT", { pass, fail, total: pass + fail });
process.exit(fail ? 1 : 0);
