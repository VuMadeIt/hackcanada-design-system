// Fails if a spacing or size class uses a value off the rule-of-8 scale (4 is the only half step).
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "components/hc", "components/site", "components/docs", "components/home"];
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx|ts|css)$/.test(f)) files.push(p);
  }
};
roots.forEach(walk);

const prop = "(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|w|h|size|min-w|min-h|max-w|max-h|top|right|bottom|left|inset|inset-x|inset-y)";
const arbitrary = new RegExp(`(?<![\\w-])-?${prop}-\\[(-?\\d+(?:\\.\\d+)?)px\\]`, "g");
const cssPx = /(?:padding|margin|gap)(?:-[a-z]+)?\s*:\s*([^;]+);/g;
const okPx = (n) => n === 0 || n === 1 || n === 2 || n % 4 === 0;

let bad = 0;
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes("lint-spacing-ignore")) return;
    for (const m of line.matchAll(arbitrary)) {
      const n = Math.abs(parseFloat(m[1]));
      if (!okPx(n)) { bad++; console.log(`${f}:${i + 1}  ${m[0]}  (${n} is off the 4/8 grid)`); }
    }
    if (f.endsWith(".css")) {
      for (const m of line.matchAll(cssPx)) {
        for (const v of m[1].matchAll(/(\d+(?:\.\d+)?)px/g)) {
          const n = parseFloat(v[1]);
          if (!okPx(n)) { bad++; console.log(`${f}:${i + 1}  ${m[0].trim()}  (${n} is off the 4/8 grid)`); }
        }
      }
    }
  });
}
if (bad) { console.log(`\n${bad} off-grid value(s). Use the spacing scale, or add // lint-spacing-ignore with a reason.`); process.exit(1); }
console.log(`Spacing OK: ${files.length} files checked, every value on the rule of 8.`);
