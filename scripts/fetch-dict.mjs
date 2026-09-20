#!/usr/bin/env node
/* ==========================================================
   fetch-dict.mjs · 从 ECDICT 开源词典生成静态 data/dict.json
   数据：skywind3000/ECDICT（英汉双解，含音标/释义）
   GitHub Actions 定时运行（raw.githubusercontent.com 在跑机侧可达）
   用法：node scripts/fetch-dict.mjs [--force]
   ========================================================== */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "data", "dict.json");
const CSV_URL = "https://raw.githubusercontent.com/skywind3000/ECDICT/master/ecdict.csv";
const FORCE = process.argv.includes("--force");

// 从 data-vocab.js 提取单词打卡词表
function extractWords() {
  const src = readFileSync(join(root, "js", "data-vocab.js"), "utf8");
  const words = new Set();
  for (const m of src.matchAll(/\bw:\s*"([A-Za-z][A-Za-z'-]*)"/g)) words.add(m[1].toLowerCase());
  return [...words];
}

// 简易但完整的 CSV 解析（支持引号包裹、跨行、转义双引号）
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false, i = 0;
  const len = text.length;
  while (i < len) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function buildEntry(cols) {
  // 列: word, phonetic, definition, translation, pos, collins, oxford, tag, bnc, frq, exchange, detail, audio
  const cn = (cols[3] || "").split("\n").map(s => s.trim()).filter(Boolean).slice(0, 3);
  const en = (cols[2] || "").split("\n").map(s => s.trim()).filter(Boolean).slice(0, 3);
  const pos = (cols[4] || "").split("/").map(p => p.split(":")[0].trim()).filter(Boolean).join("/");
  if (!cn.length && !en.length) return null;
  return { word: cols[0], phon: cols[1] || "", pos, cn, en };
}

async function main() {
  const words = extractWords();
  const want = new Set(words);
  const db = existsSync(OUT)
    ? JSON.parse(readFileSync(OUT, "utf8"))
    : { updated: "", words: {} };

  if (!FORCE) {
    for (const w of words) if (db.words[w] || db.words[w] === null) want.delete(w);
  }
  if (want.size === 0) {
    console.log("all words up-to-date, nothing to fetch");
    return;
  }
  console.log(`need to fetch ${want.size} / ${words.length} words`);

  // 下载并解析整份 ECDICT CSV
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  const text = await res.text();
  const rows = parseCSV(text);
  console.log(`csv rows: ${rows.length}`);

  // 精确匹配（小写）
  const found = new Map();
  for (const cols of rows) {
    const w = (cols[0] || "").toLowerCase();
    if (want.has(w) && !found.has(w)) {
      const entry = buildEntry(cols);
      found.set(w, entry || null);
    }
    if (found.size === want.size) break;
  }

  for (const w of want) db.words[w] = found.get(w) ?? null;

  db.updated = new Date().toISOString().slice(0, 10);
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(db, null, 1) + "\n");
  const ok = Object.values(db.words).filter(Boolean).length;
  console.log(`done. total=${words.length} fetched=${want.size} ok=${ok} missing=${want.size - [...found.values()].filter(Boolean).length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
