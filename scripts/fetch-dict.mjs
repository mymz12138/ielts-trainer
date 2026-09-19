#!/usr/bin/env node
/* ==========================================================
   fetch-dict.mjs · 抓取词典数据生成静态 JSON
   数据源：dictionaryapi.dev（GitHub Actions 海外环境可直连）
   词表来源：js/data-vocab.js 中的单词打卡词库
   输出：data/dict.json（同源加载，规避 CORS 与网络差异）
   用法：node scripts/fetch-dict.mjs [--force]
   ========================================================== */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "data", "dict.json");
const API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const FORCE = process.argv.includes("--force");
const sleep = ms => new Promise(r => setTimeout(r, ms));

// 从 data-vocab.js 提取单词打卡词表
function extractWords() {
  const src = readFileSync(join(root, "js", "data-vocab.js"), "utf8");
  const words = new Set();
  for (const m of src.matchAll(/\bw:\s*"([A-Za-z][A-Za-z'-]*)"/g)) words.add(m[1].toLowerCase());
  return [...words];
}

// 与 js/api.js 保持一致的压缩结构
function normalize(entry) {
  if (!entry || !entry.meanings || !entry.meanings.length) return null;
  const phon = (entry.phonetics || []).find(p => p && p.text) || {};
  const audio = (entry.phonetics || []).find(p => p && p.audio) || {};
  const meanings = entry.meanings.slice(0, 3).map(m => ({
    pos: m.partOfSpeech || "",
    defs: (m.definitions || []).slice(0, 2).map(d => ({
      en: d.definition || "",
      ex: d.example || ""
    })).filter(d => d.en)
  })).filter(m => m.defs.length);
  if (!meanings.length) return null;
  return { word: entry.word, phon: phon.text || "", audio: audio.audio || "", meanings };
}

async function fetchWord(word) {
  const res = await fetch(API + encodeURIComponent(word));
  if (res.status === 404) return null;   // 未收录，缓存空值避免反复请求
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return normalize(Array.isArray(json) ? json[0] : json);
}

async function main() {
  const words = extractWords();
  const db = existsSync(OUT)
    ? JSON.parse(readFileSync(OUT, "utf8"))
    : { updated: "", words: {} };

  let fresh = 0;
  for (const w of words) {
    if (!FORCE && (db.words[w] || db.words[w] === null)) continue;
    try {
      db.words[w] = await fetchWord(w);
      fresh++;
      console.log(`ok   ${w}`);
    } catch (e) {
      console.log(`skip ${w}: ${e.message}`);
      continue;               // 失败不写入，留待下次运行重试
    }
    await sleep(300);
  }

  db.updated = new Date().toISOString().slice(0, 10);
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(db, null, 1) + "\n");
  const ok = Object.values(db.words).filter(Boolean).length;
  console.log(`total=${words.length} fresh=${fresh} ok=${ok}`);
}

main();
