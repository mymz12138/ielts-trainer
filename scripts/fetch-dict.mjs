#!/usr/bin/env node
/* ==========================================================
   fetch-dict.mjs · 从 ECDICT 开源词典扩充雅思词库
   1) 保留 js/data-vocab.js 原有 80 个带例句的核心词
   2) 从 ECDICT 筛选 ~2920 个雅思/高频词（无例句，含音标/中英释义）
   3) 生成 js/data-vocab.js（3000 词，供每日打卡）
   4) 更新 data/dict.json（供联网查词）
   数据：skywind3000/ECDICT（MIT）
   用法：node scripts/fetch-dict.mjs [--force]
   ========================================================== */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const VOCAB_OUT = join(root, "js", "data-vocab.js");
const DICT_OUT = join(root, "data", "dict.json");
const CSV_URL = "https://raw.githubusercontent.com/skywind3000/ECDICT/master/ecdict.csv";
const FORCE = process.argv.includes("--force");
const TARGET_TOTAL = 3000;

// 基础停用词（雅思考生已掌握的常见词，不纳入打卡词库）
const STOPWORDS = new Set((
  "a about above after again against all am an and any are aren't as at be because been before being below between both but by " +
  "can can't cannot could couldn't did didn't do does doesn't doing don't down during each few for from further had hadn't has hasn't " +
  "have haven't having he he'd he'll he's her here here's hers herself him himself his how how's i i'd i'll i'm i've if in into is " +
  "isn't it it's its itself let's me more most mustn't my myself no nor not of off on once only or other ought our ours ourselves " +
  "out over own same shan't she she'd she'll she's should shouldn't so some such than that that's the their theirs them themselves " +
  "then there there's these they they'd they'll they're they've this those through to too under until up very was wasn't we we'd we'll " +
  "we're we've were weren't what what's when when's where where's which while who who's whom why why's with won't would wouldn't you " +
  "you'd you'll you're you've your yours yourself yourselves " +
  "good bad big small old new young long short high low great little own same different first last next another such many much more " +
  "most few several various due per via upon till amongst despite unless provided since although though whether whereas while " +
  "go come get make take give say see know think look want use find tell ask work seem feel become leave put mean keep let begin " +
  "seem try ask need feel become leave call keep hold turn move live believe bring happen write provide sit stand lose pay meet " +
  "include continue set learn change lead understand watch follow stop create speak read allow add spend grow open walk win offer " +
  "remember love consider appear buy wait serve die send expect build stay fall cut reach kill remain suggest raise pass sell " +
  "require report decide pull develop level rise draw cook drive manage face break teach force hit train save contain " +
  "time day year people way man woman thing child world life hand part place case week company system program question work " +
  "government number night point home water room mother area money story fact month lot right study book eye job word business " +
  "issue side kind head house service friend father power hour game line end member law car city community name team minute idea " +
  "body information back parent face others level office door health person art war history party result change morning reason " +
  "research girl moment staff teacher education class population group problem action century evidence idea moment " +
  "just also now very well back still even new already never really always sometimes often usually maybe perhaps quite rather " +
  "almost enough then there here where when why how which who whom what whose this that these those " +
  "yes no not no one nobody nothing none neither either each every all both few many much more most some any " +
  "one two three four five six seven eight nine ten first second third " +
  "able about across after against along among around before behind below beneath beside between beyond by during except for " +
  "from inside into like near of off on onto out outside over past since through throughout till to toward towards under " +
  "underneath unlike until up upon with within without " +
  "the a an this that these those i me my we us our you your he him his she her it its they them their " +
  "and or but so if then than when while although because as since unless until before after " +
  "in on at by for with from to of up down out off over under into onto upon " +
  "is are was were be been being have has had do does did will would shall should can could may might must " +
  "am not no yes very too so quite rather almost enough just only even still also already " +
  "here there where when why how which who whom what whose "
).split(/\s+/).filter(Boolean));

/* ---------- 读取原 data-vocab.js，保留带例句的 80 词 ---------- */
function readOriginalVocab() {
  const src = readFileSync(VOCAB_OUT, "utf8");
  const ctx = {};
  vm.createContext(ctx);
  // 注意：const/let 不会挂到 context 对象上，需用返回值读取
  const topics = vm.runInContext(src + "\nVOCAB_TOPICS;", ctx) || [];
  const words = [];
  for (const t of topics) for (const w of t.words) words.push(Object.assign({ topic: t.name }, w));
  return { topics, words };
}

/* ---------- CSV 解析（支持引号/跨行/转义） ---------- */
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

/* ---------- 从 ECDICT 一行构造词条 ---------- */
function buildEntry(cols) {
  // word, phonetic, definition, translation, pos, collins, oxford, tag, bnc, frq, exchange, detail, audio
  const cn = (cols[3] || "").split("\n").map(s => s.trim()).filter(Boolean).slice(0, 2);
  const en = (cols[2] || "").split("\n").map(s => s.trim()).filter(Boolean).slice(0, 2);
  const pos = (cols[4] || "").split("/").map(p => p.split(":")[0].trim()).filter(Boolean).join("/");
  if (!cn.length && !en.length) return null;
  return { word: cols[0], phon: cols[1] || "", pos, cn, en };
}

/* ---------- 主流程 ---------- */
async function main() {
  const { topics: origTopics, words: origWords } = readOriginalVocab();
  const origSet = new Set(origWords.map(w => w.w.toLowerCase()));
  console.log(`original vocab: ${origWords.length} words in ${origTopics.length} topics`);

  const need = TARGET_TOTAL - origWords.length;
  console.log(`need ${need} more words from ECDICT`);

  // 下载并解析 ECDICT
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  const text = await res.text();
  const rows = parseCSV(text);
  console.log(`csv rows: ${rows.length}`);

  // 第一遍：收集所有候选（雅思标签优先，其次高频词）
  const ieltsPool = [];   // tag 含 "雅思"
  const freqPool = [];    // 高频通用词
  for (const cols of rows) {
    const word = (cols[0] || "").trim();
    const wl = word.toLowerCase();
    if (!word || origSet.has(wl) || STOPWORDS.has(wl)) continue;
    // 跳过太长/太短/含特殊字符的词
    if (word.length < 2 || word.length > 20) continue;
    if (!/^[A-Za-z][A-Za-z'-]*$/.test(word)) continue;
    const tag = cols[7] || "";
    const collins = parseInt(cols[5]) || 0;
    const oxford = parseInt(cols[6]) || 0;
    const bnc = parseInt(cols[8]) || 0;
    const frq = parseInt(cols[9]) || 0;
    const rec = { word, cols, collins, oxford, bnc, frq };
    // 排除 BNC 前 1500 个太基础的词（the/on/say/as...），保留 bnc==0（未收录）的词
    const notTooBasic = bnc === 0 || bnc > 1500;
    if (tag.includes("ielts") && notTooBasic) ieltsPool.push(rec);
    else if ((collins >= 3 || oxford >= 2) && notTooBasic) freqPool.push(rec);
  }
  console.log(`ielts-tagged candidates: ${ieltsPool.length}, freq candidates: ${freqPool.length}`);

  // 排序：collins 降序 → oxford 降序 → bnc 升序 → frq 升序
  const sortFn = (a, b) =>
    b.collins - a.collins || b.oxford - a.oxford ||
    (a.bnc || 999999) - (b.bnc || 999999) ||
    (a.frq || 999999) - (b.frq || 999999);
  ieltsPool.sort(sortFn);
  freqPool.sort(sortFn);

  const chosen = [...ieltsPool, ...freqPool].slice(0, need);
  console.log(`chosen ${chosen.length} new words`);

  // 构造打卡词条：{w, p, cn, en}（ECDICT 词无例句）
  const newEntries = [];
  const newWords = {}; // dict.json 用
  for (const rec of chosen) {
    const e = buildEntry(rec.cols);
    if (!e) continue;
    newEntries.push({
      w: e.word,
      p: e.phon,
      cn: e.cn.join("；"),
      en: e.en,
    });
    newWords[e.word.toLowerCase()] = e;
  }
  console.log(`valid new entries: ${newEntries.length}`);

  // 把新词分成若干 topic，每组 100 词
  const newTopics = [];
  const groupSize = 100;
  for (let i = 0; i < newEntries.length; i += groupSize) {
    const g = newEntries.slice(i, i + groupSize);
    const n = Math.floor(i / groupSize) + 1;
    newTopics.push({ id: `ielts${n}`, name: `雅思核心词 第${n}组`, words: g });
  }

  // 合并原有 topic + 新 topic
  const allTopics = [...origTopics, ...newTopics];
  const totalWords = allTopics.reduce((s, t) => s + t.words.length, 0);
  console.log(`total topics: ${allTopics.length}, total words: ${totalWords}`);

  // 写 data-vocab.js
  const vocabSrc = `/* auto-generated by scripts/fetch-dict.mjs · ${totalWords} words */\n` +
    `const VOCAB_TOPICS = ${JSON.stringify(allTopics, null, 0)};\n`;
  writeFileSync(VOCAB_OUT, vocabSrc);

  // 更新 data/dict.json：原词条 + 新词条
  const db = existsSync(DICT_OUT) ? JSON.parse(readFileSync(DICT_OUT, "utf8")) : { updated: "", words: {} };
  for (const [k, v] of Object.entries(newWords)) {
    if (FORCE || !db.words[k]) db.words[k] = v;
  }
  db.updated = new Date().toISOString().slice(0, 10);
  mkdirSync(dirname(DICT_OUT), { recursive: true });
  writeFileSync(DICT_OUT, JSON.stringify(db, null, 1) + "\n");

  const ok = Object.values(db.words).filter(Boolean).length;
  console.log(`done. vocab=${totalWords} dict=${ok}`);
}

main().catch(e => { console.error(e); process.exit(1); });
