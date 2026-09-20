import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const rawDir = "d:/作业/ielts-trainer/scripts/_raw";
const outDir = "d:/作业/ielts-trainer/js";
const files = Object.fromEntries(
  readdirSync(rawDir).map(f => [f, readFileSync(join(rawDir, f), "utf8")])
);

const dec = s => s
  .replace(/&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/\s+/g, " ").trim();

const linesOf = name => files[name].split(/\r?\n/).map(l => l.trim());

/* ============ 1. 写作核心 100 句 ============ */
function parseSentences() {
  const lines = linesOf("雅思写作核心100句1789898588.txt");
  const out = [];
  let cur = null;
  for (const l of lines) {
    if (!l) continue;
    const m = l.match(/^\s*\d{1,3}\s*[、.,]\s*(.+)$/);
    if (m) { if (cur) out.push(cur); cur = { en: dec(m[1]), cn: "" }; }
    else if (cur && !cur.cn && /[\u4e00-\u9fa5]/.test(l)) { cur.cn = dec(l); out.push(cur); cur = null; }
  }
  if (cur) out.push(cur);
  return out;
}

/* ============ 2. 高考频 1200 词 ============ */
function parse1200() {
  const lines = linesOf("雅思高考频1200 词1789898588.txt");
  const out = [];
  let last = null;
  for (let raw of lines) {
    if (!raw) { last = null; continue; }
    let l = raw.replace(/^[^A-Za-z]*/, ""); // 去掉行首所有非英文字符
    const m = l.match(/^([A-Za-z][A-Za-z-]*)\s*\({1,}\s*考频\s*(\d+)\s*次?\s*\){1,}\s*(.*)$/);
    if (m) {
      const w = m[1].toLowerCase();
      const freq = parseInt(m[2], 10);
      const rest = m[3].trim();
      const pm = rest.match(/^([a-zA-Z./]+)\.?\s*(.+)$/);
      const pos = pm ? pm[1].replace(/\.$/, "") : "";
      const def = pm ? pm[2].trim() : rest;
      if (!out.some(x => x.w === w)) { out.push({ w, freq, pos, def }); last = out[out.length - 1]; }
    } else if (last && /^[；、]/.test(l)) {
      // 续行：接在上一个释义后
      last.def += l;
    } else {
      last = null;
    }
  }
  return out;
}

/* ============ 3. 大作文 Task 2 ============ */
function parseTask2() {
  const text = files["【多次元雅思】2024年雅思大作文真题汇编（带范文）(1)1789898457.txt"];
  const start = text.indexOf("2024 年雅思大作文真题汇编");
  const body = start >= 0 ? text.slice(start) : text;
  const dateRe = /【\s*(\d+)\s*月\s*(\d+)\s*日题目\s*】/g;
  const blocks = [];
  let m, lastIdx = 0, lastDate = null;
  while ((m = dateRe.exec(body)) !== null) {
    if (lastDate) blocks.push({ date: lastDate, content: body.slice(lastIdx, m.index) });
    lastDate = `${m[1]}月${m[2]}日`; lastIdx = m.index + m[0].length;
  }
  if (lastDate) blocks.push({ date: lastDate, content: body.slice(lastIdx) });

  const out = [];
  for (const b of blocks) {
    const parts = b.content.split(/[（(]\s*(\d+)\s*words?\s*[)）]/);
    for (let i = 0; i + 1 < parts.length; i += 2) {
      const seg = parts[i];
      const words = parseInt(parts[i + 1], 10);
      const paras = seg.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (paras.length < 2) continue;
      const q = dec(paras[0]);
      const essay = paras.slice(1).map(dec).filter(Boolean).join("\n\n");
      if (essay) out.push({ date: b.date, q, essay, words });
    }
  }
  return out;
}

/* ============ 4. 小作文 Task 1 ============ */
function parseTask1() {
  const text = files["多次元雅思小作文真题与范文集-2024年版1789898420.txt"];
  const start = text.indexOf("2024 年雅思小作文真题汇编");
  const body = start >= 0 ? text.slice(start) : text;
  const dateRe = /2024\s*年\s*(\d+)\s*月\s*(\d+)\s*日/g;
  const blocks = [];
  let m, lastIdx = 0, lastDate = null;
  while ((m = dateRe.exec(body)) !== null) {
    if (lastDate) blocks.push({ date: lastDate, content: body.slice(lastIdx, m.index) });
    lastDate = `${m[1]}月${m[2]}日`; lastIdx = m.index + m[0].length;
  }
  if (lastDate) blocks.push({ date: lastDate, content: body.slice(lastIdx) });

  const out = [];
  for (const b of blocks) {
    const parts = b.content.split(/[（(]\s*(\d+)\s*words?\s*[)）]/);
    for (let i = 0; i + 1 < parts.length; i += 2) {
      const seg = parts[i];
      const words = parseInt(parts[i + 1], 10);
      const paras = seg.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (paras.length < 2) continue;
      const qStart = paras.findIndex(p => /You should spend about 20 minutes/i.test(p));
      const qEnd = paras.findIndex(p => /Write at least 150 words/i.test(p));
      let q, essay;
      if (qStart >= 0 && qEnd > qStart) {
        q = paras.slice(qStart, qEnd + 1).map(dec).join("\n");
        essay = paras.slice(qEnd + 1).map(dec).filter(Boolean).join("\n\n");
      } else {
        q = dec(paras[0]);
        essay = paras.slice(1).map(dec).filter(Boolean).join("\n\n");
      }
      if (essay) out.push({ date: b.date, q, essay, words });
    }
  }
  return out;
}

/* ============ 5. 阅读题库 64 篇 ============ */
function parseReading() {
  const paras = linesOf("预测阅读64篇文章1789898486.txt");
  const isDateLine = l => /^\d{4}\.\d{1,2}\.\d{1,2}/.test(l);
  // 找出所有新文章起始行索引
  const starts = [];
  for (let i = 0; i < paras.length; i++) {
    if (isDateLine(paras[i])) starts.push(i);
  }
  const out = [];
  for (let s = 0; s < starts.length; s++) {
    const end = s + 1 < starts.length ? starts[s + 1] : paras.length;
    const block = paras.slice(starts[s], end);
    // 收集日期行（连续匹配日期格式的行）
    let k = 0, dates = "";
    while (k < block.length && isDateLine(block[k])) { dates += (dates ? " " : "") + block[k]; k++; }
    // 跳过空行，取标题
    while (k < block.length && !block[k]) k++;
    const title = block[k] || "";
    k++;
    // 正文 + 题目
    const rest = block.slice(k).filter(Boolean);
    const qIdx = rest.findIndex(p => /^Questions?\s+\d/i.test(p));
    const textPart = qIdx >= 0 ? rest.slice(0, qIdx) : rest;
    const qPart = qIdx >= 0 ? rest.slice(qIdx) : [];
    const cleanText = textPart.map(p => dec(p)).join("\n\n");
    const questions = qPart.map(p => dec(p)).join("\n");
    if (title && cleanText.length > 200 && !/^Section [A-Z]$/i.test(title) && title.length > 3) {
      out.push({ dates, title: dec(title), text: cleanText, questions });
    }
  }
  return out;
}

/* ============ 6. 阅读机经答案 ============ */
function parseReadingAnswers() {
  const lines = linesOf("雅思阅读机经答案1789898588.txt");
  const out = [];
  let cur = null;
  for (const l of lines) {
    if (!l) continue;
    if (/^[超高中低]?频题/.test(l) || /^阅读\d+篇/.test(l)) continue;
    if (/^[A-Z][A-Za-z'\-& ]{2,}$/.test(l) && !/\d/.test(l)) {
      if (cur) out.push(cur);
      cur = { title: l, answers: [] };
    } else if (cur) cur.answers.push(l);
  }
  if (cur) out.push(cur);
  return out.map(x => ({ ...x, answers: x.answers.join(" ") }));
}

/* ============ 输出 ============ */
function writeData(filename, varName, data) {
  const js = `/* auto-generated from D:\\SU素材\\pack docx */\nwindow.${varName} = ${JSON.stringify(data)};\n`;
  writeFileSync(join(outDir, filename), js, "utf8");
  console.log(`${filename}: ${data.length} items, ${js.length} bytes`);
}

const sentences = parseSentences();
const words1200 = parse1200();
const task2 = parseTask2();
const task1 = parseTask1();
const reading = parseReading();
const answers = parseReadingAnswers();

writeData("data-sentences.js", "SENTENCES", sentences);
writeData("data-vocab1200.js", "VOCAB1200", words1200);
writeData("data-task2.js", "TASK2", task2);
writeData("data-task1.js", "TASK1", task1);
writeData("data-reading.js", "READING", reading);
writeData("data-reading-answers.js", "READING_ANSWERS", answers);

console.log("\nSUMMARY");
console.log("sentences:", sentences.length);
console.log("vocab1200:", words1200.length);
console.log("task2 essays:", task2.length);
console.log("task1 essays:", task1.length);
console.log("reading passages:", reading.length);
console.log("reading answers:", answers.length);
