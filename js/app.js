/* ==========================================================
   app.js · IELTS Trainer 主逻辑
   localStorage 持久化 · 无后端依赖
   ========================================================== */
"use strict";

/* ---------- 图标 ---------- */
const I = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  wrong: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
  vocab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  write: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  read: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>',
  headphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>'
};

/* ---------- 常量 ---------- */
const NAVS = [
  { id: "home",  name: "首页",     icon: I.home },
  { id: "train", name: "真题训练", icon: I.train },
  { id: "notes", name: "考点速记", icon: I.notes },
  { id: "wrong", name: "错题本",   icon: I.wrong },
  { id: "vocab", name: "单词打卡", icon: I.vocab },
  { id: "plan",  name: "复习计划", icon: I.plan },
  { id: "writing", name: "写作范文", icon: I.write },
  { id: "reading", name: "阅读题库", icon: I.read },
  { id: "material", name: "词汇句型", icon: I.book }
];

const PLAN_TASKS = [
  { id: "listen", name: "听力训练" },
  { id: "read",   name: "阅读训练" },
  { id: "write",  name: "写作练习" },
  { id: "speak",  name: "口语练习" },
  { id: "vocab",  name: "单词打卡" },
  { id: "wrong",  name: "错题回顾" }
];

const KEY = "ielts_trainer_v1";

/* ---------- 状态 ---------- */
function defaults() {
  return {
    theme: "light",
    stats: { answered: 0, correct: 0, writing: 0, speaking: 0, wordsMet: 0, wordsKnown: 0 },
    best: {},                       // itemId -> 最高正确率
    wrong: [],                      // 错题记录
    checkins: {},                   // 'YYYY-MM-DD' -> {right,total}
    wordbook: [],                   // 生词数组
    plan: null,                     // {examDate,target,level,tasks[],created}
    planLog: {},                    // 'YYYY-MM-DD' -> {taskId:true}
    vocabToday: null                // {date, picks[], idx, known[], unknown[], done}
  };
}
let S = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign(defaults(), JSON.parse(raw));
  } catch (e) {}
  return defaults();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

/* ---------- 工具 ---------- */
const $ = (sel, p) => (p || document).querySelector(sel);
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function richText(s) { // **加粗** + 换行
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
}
function todayStr(d) {
  d = d || new Date();
  const p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
function toast(msg, cls) {
  const t = document.createElement("div");
  t.className = "toast" + (cls ? " " + cls : "");
  t.textContent = msg;
  $("#toastWrap").appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; }, 1900);
  setTimeout(() => t.remove(), 2300);
}
function streak() {
  let n = 0;
  const d = new Date();
  if (!S.checkins[todayStr(d)]) d.setDate(d.getDate() - 1);
  while (S.checkins[todayStr(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function wordCount(str) {
  const m = str.trim().match(/[A-Za-z0-9'-]+/g);
  return m ? m.length : 0;
}

/* ---------- TTS ---------- */
let voices = [];
function loadVoices() { voices = speechSynthesis ? speechSynthesis.getVoices() : []; }
if ("speechSynthesis" in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}
function ttsSpeak(text, rate) {
  if (!("speechSynthesis" in window)) { toast("当前浏览器不支持语音朗读"); return; }
  speechSynthesis.cancel();
  const segs = text.split("|").map(s => s.trim()).filter(Boolean)
    .map(s => s.replace(/^[A-Z][A-Z ]*:\s*/, ""));
  const vb = voices.find(v => v.lang === "en-GB") || voices.find(v => /^en/.test(v.lang));
  segs.forEach(seg => {
    const u = new SpeechSynthesisUtterance(seg);
    u.lang = "en-GB"; u.rate = rate || 0.9;
    if (vb) u.voice = vb;
    speechSynthesis.speak(u);
  });
}
function ttsStop() { if ("speechSynthesis" in window) speechSynthesis.cancel(); }

/* ---------- 计时器 ---------- */
let timerInt = null;
function clearTimer() { if (timerInt) { clearInterval(timerInt); timerInt = null; } }

/* ---------- 导航 ---------- */
let view = "home";
function navigate(v) {
  clearTimer(); ttsStop();
  view = v;
  document.querySelectorAll(".nav-item,.bnav-item").forEach(b => b.classList.toggle("active", b.dataset.view === v));
  const main = $("#main");
  main.scrollTop = 0; window.scrollTo(0, 0);
  const R = { home: renderHome, train: renderTrain, notes: renderNotes, wrong: renderWrong, vocab: renderVocab, plan: renderPlan, writing: renderWriting, reading: renderReading, material: renderMaterial };
  (R[v] || renderHome)();
}

/* ---------- 按需加载数据脚本 ---------- */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src*="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}
function renderNav() {
  const wrongN = S.wrong.filter(w => !w.mastered).length;
  $("#sideNav").innerHTML = NAVS.map(n => `
    <button class="nav-item${n.id === view ? " active" : ""}" data-view="${n.id}">
      ${n.icon}<span>${n.name}</span>${n.id === "wrong" && wrongN ? `<span class="nav-badge">${wrongN}</span>` : ""}
    </button>`).join("");
  $("#bottomNav").innerHTML = `<div class="bnav-inner">` + NAVS.map(n => `
    <button class="bnav-item${n.id === view ? " active" : ""}" data-view="${n.id}">
      ${n.icon}<span>${n.name.replace(/ .*/, "")}</span>${n.id === "wrong" && wrongN ? `<span class="bnav-badge">${wrongN}</span>` : ""}
    </button>`).join("") + `</div>`;
  document.querySelectorAll("[data-view]").forEach(b =>
    b.addEventListener("click", () => navigate(b.dataset.view)));
}

/* ===================== 首页 ===================== */
function renderHome() {
  const st = streak();
  const today = todayStr();
  const ck = S.checkins[today];
  const wrongN = S.wrong.filter(w => !w.mastered).length;
  const acc = S.stats.answered ? Math.round(S.stats.correct / S.stats.answered * 100) : 0;
  const hr = new Date().getHours();
  const greet = hr < 6 ? "夜深了" : hr < 12 ? "早上好" : hr < 18 ? "下午好" : "晚上好";
  const plan = S.plan;
  const log = S.planLog[today] || {};
  const daysLeft = plan ? Math.ceil((new Date(plan.examDate) - new Date(today)) / 86400000) : 0;

  const tasksHtml = plan
    ? `<ul class="today-list">${plan.tasks.map(t => {
        const name = (PLAN_TASKS.find(p => p.id === t) || {}).name || t;
        const auto = t === "vocab" && ck;
        const done = log[t] || auto;
        return `<li class="today-item${done ? " done" : ""}" data-task="${t}">
          <span class="tick">${I.check}</span><span class="grow">${name}</span><span class="tag">${done ? "已完成" : "待完成"}</span>
        </li>`;
      }).join("")}</ul>`
    : `<div class="empty-state" style="padding:26px 10px">
        <p>还没有制定复习计划</p>
        <button class="btn sm" id="goPlan">去制定计划</button></div>`;

  $("#main").innerHTML = `
  <div class="view">
    <div class="hero">
      <h2>${greet}，今天也要坚持刷题 💪</h2>
      <p>${today} · 雅思备考训练台</p>
      <div class="hero-row">
        <div class="hero-stat"><div class="num">${st}</div><div class="lbl">连续打卡（天）</div></div>
        <div class="hero-stat"><div class="num">${ck ? ck.right + "/" + ck.total : "—"}</div><div class="lbl">今日单词</div></div>
        <div class="hero-stat"><div class="num">${wrongN}</div><div class="lbl">待消灭错题</div></div>
        ${plan ? `<div class="hero-stat"><div class="num">${daysLeft > 0 ? daysLeft : 0}</div><div class="lbl">距考试（天）</div></div>` : ""}
      </div>
    </div>

    <div class="stat-grid">
      <div class="card stat-card"><div class="num">${S.stats.answered}</div><div class="lbl">累计做题</div><div class="hint">听力 + 阅读</div></div>
      <div class="card stat-card"><div class="num">${acc}%</div><div class="lbl">总正确率</div><div class="hint">客观题统计</div></div>
      <div class="card stat-card"><div class="num">${S.stats.writing + S.stats.speaking}</div><div class="lbl">写口练习</div><div class="hint">作文 ${S.stats.writing} · 口语 ${S.stats.speaking}</div></div>
      <div class="card stat-card"><div class="num">${S.wordbook.length}</div><div class="lbl">生词本</div><div class="hint">打卡时不认识的词</div></div>
    </div>

    <div class="home-grid">
      <div class="card">
        <div class="card-title">今日任务${plan ? `<span class="plan-stage" style="margin-left:auto">${stageName(plan)}</span>` : ""}</div>
        ${tasksHtml}
      </div>
      <div class="card">
        <div class="card-title">快捷入口</div>
        <div class="quick-entry">
          <button class="qe-btn" data-go="train"><span class="qe-ico" style="background:#4a6f8a">${I.headphone}</span><strong>真题训练</strong><span>听 / 读 / 写 / 口 分级刷</span></button>
          <button class="qe-btn" data-go="notes"><span class="qe-ico" style="background:#b07f22">${I.notes}</span><strong>考点速记</strong><span>高频考点翻卡记忆</span></button>
          <button class="qe-btn" data-go="vocab"><span class="qe-ico" style="background:#4a8a5f">${I.vocab}</span><strong>单词打卡</strong><span>每日 ${DAILY_WORDS} 词坚持签到</span></button>
          <button class="qe-btn" data-go="wrong"><span class="qe-ico" style="background:#b85c4b">${I.wrong}</span><strong>错题本</strong><span>自动收录 · 回看重做</span></button>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => navigate(b.dataset.go)));
  const gp = $("#goPlan"); if (gp) gp.addEventListener("click", () => navigate("plan"));
  if (plan) document.querySelectorAll(".today-item").forEach(li => {
    li.addEventListener("click", () => {
      const t = li.dataset.task;
      if (t === "vocab") return navigate("vocab");
      const log = S.planLog[today] = S.planLog[today] || {};
      if (log[t]) return;
      log[t] = true; save(); renderHome();
      toast("任务完成 +1", "ok");
    });
  });
}

/* ===================== 真题训练 ===================== */
let trainSub = null, trainLevel = 0;
let SES = null; // 当前会话

function renderTrain() {
  SES = null; clearTimer(); ttsStop();
  if (!trainSub) {
    $("#main").innerHTML = `
    <div class="view">
      <div class="view-head"><div class="view-title">真题训练</div>
      <div class="view-sub">选择科目开始分阶训练，客观题每题即时判分并自动收录错题</div></div>
      <div class="subject-grid">
        ${Object.keys(SUBJECT_META).map(k => {
          const m = SUBJECT_META[k];
          return `<button class="subject-card" data-sub="${k}">
            <span class="sc-ico" style="background:${m.color}">${I[m.icon]}</span>
            <h3>${m.name}</h3><p>${m.desc}</p></button>`;
        }).join("")}
      </div>
    </div>`;
    document.querySelectorAll("[data-sub]").forEach(b =>
      b.addEventListener("click", () => { trainSub = b.dataset.sub; renderTrain(); }));
    return;
  }

  const m = SUBJECT_META[trainSub];
  const items = BANK[trainSub].filter(it => !trainLevel || it.level === trainLevel);
  $("#main").innerHTML = `
  <div class="view">
    <div class="session-top">
      <button class="btn-back" id="subBack">${I.back}<span>科目</span></button>
      <div class="view-title" style="font-size:19px">${m.name}</div>
    </div>
    <div class="level-bar">
      <button class="level-chip${trainLevel === 0 ? " active" : ""}" data-lv="0">全部级别</button>
      ${[1, 2, 3].map(l => `<button class="level-chip${trainLevel === l ? " active" : ""}" data-lv="${l}">${LEVEL_META[l].name} · ${LEVEL_META[l].band}</button>`).join("")}
    </div>
    <div class="item-list">
      ${items.map(it => {
        const best = S.best[it.id];
        const qn = it.questions ? it.questions.length : "";
        return `<button class="item-row" data-item="${it.id}">
          <span class="ir-ico">${it.level}</span>
          <span class="grow">
            <span class="ir-title">${esc(it.title)}</span>
            <span class="ir-meta" style="display:block">${it.section || it.task || ""} · ${qn ? qn + " 题" : "练习"} · ${LEVEL_META[it.level].band}</span>
          </span>
          ${best ? `<span class="ir-score">最佳<br><b>${best}%</b></span>` : `<span class="ir-score muted">未挑战</span>`}
        </button>`;
      }).join("")}
    </div>
  </div>`;
  $("#subBack").addEventListener("click", () => { trainSub = null; renderTrain(); });
  document.querySelectorAll("[data-lv]").forEach(b => b.addEventListener("click", () => { trainLevel = +b.dataset.lv; renderTrain(); }));
  document.querySelectorAll("[data-item]").forEach(b => b.addEventListener("click", () => startSession(trainSub, b.dataset.item)));
}

function startSession(sub, itemId, qIdxs) {
  const item = BANK[sub].find(x => x.id === itemId);
  const idxs = qIdxs || (item.questions ? item.questions.map((_, i) => i) : [0]);
  SES = { sub, item, idxs, step: 0, answers: [], correct: 0, done: false };
  renderStep();
}

function stepHeader(extra) {
  const total = SES.idxs.length;
  const pct = Math.round(SES.step / total * 100);
  return `<div class="session-top">
    <button class="btn-back" id="sesBack">${I.back}<span>退出</span></button>
    <div class="session-progress"><i style="width:${pct}%"></i></div>
    <div class="session-count">${Math.min(SES.step + 1, total)} / ${total}</div>
  </div>${extra || ""}`;
}

function renderStep() {
  const { sub, item, idxs, step } = SES;
  const doneAll = step >= idxs.length;
  if (doneAll) return renderSessionEnd();

  if (sub === "writing") return renderWritingStep();
  if (sub === "speaking") return renderSpeakingStep();

  const q = item.questions[idxs[step]];
  const qi = idxs[step];
  const tagMap = { tfng: "判断题 TRUE / FALSE / NOT GIVEN", choice: "选择题", blank: "填空题", match: "段落匹配" };
  const answered = SES.answers[step] !== undefined;

  let passageHtml = "";
  if (sub === "reading") {
    passageHtml = `<div class="passage-box"><h4>${esc(item.title)}</h4>${item.passage.map(p => `<p>${esc(p)}</p>`).join("")}</div>`;
  } else if (sub === "listening") {
    const canTTS = "speechSynthesis" in window;
    passageHtml = `
    <div class="audio-panel">
      <div class="ap-tip">🎧 点击播放听力原文（TTS 朗读，语速 ${Math.round(item.rate * 100)}%）。可重复播放；做完后可对照原文复盘。</div>
      <div class="audio-ctrl">
        ${canTTS ? `<button class="btn sm" id="ttsPlay">${I.play} 播放</button>
        <button class="btn sm plain" id="ttsStopBtn">${I.stop} 停止</button>` : `<span class="muted">当前浏览器不支持语音朗读，可直接阅读下方原文练习。</span>`}
        <button class="btn sm ghost" id="showScript">${I.eye} 原文</button>
        <span class="rate-label">${esc(item.section)}</span>
      </div>
      <div id="scriptBox" style="display:none;margin-top:12px" class="passage-box">
        ${item.transcript.split("|").map(s => `<p>${esc(s.trim())}</p>`).join("")}
      </div>
    </div>`;
  }

  let qHtml = "";
  if (q.type === "choice" || q.type === "match") {
    const letters = ["A", "B", "C", "D", "E"];
    qHtml = q.options.map((o, i) => {
      let cls = "opt";
      if (answered) {
        if (i === q.answer) cls += " correct";
        else if (i === SES.answers[step].pick) cls += " wrong";
      } else if (SES.answers[step + 10] === i) cls += " selected";
      return `<button class="${cls}" data-pick="${i}" ${answered ? "disabled" : ""}>
        <span class="opt-key">${letters[i]}</span><span>${esc(o)}</span></button>`;
    }).join("");
  } else if (q.type === "tfng") {
    qHtml = ["TRUE", "FALSE", "NOT GIVEN"].map(v => {
      let cls = "opt";
      if (answered) {
        if (v === q.answer) cls += " correct";
        else if (v === SES.answers[step].pick) cls += " wrong";
      } else if (SES.answers[step + 10] === v) cls += " selected";
      return `<button class="${cls}" data-pick="${v}" ${answered ? "disabled" : ""}>
        <span class="opt-key">${v[0]}</span><span>${v === "TRUE" ? "TRUE（正确）" : v === "FALSE" ? "FALSE（错误）" : "NOT GIVEN（未提及）"}</span></button>`;
    }).join("");
  } else if (q.type === "blank") {
    const val = answered ? SES.answers[step].pick : (SES.answers[step + 10] || "");
    qHtml = `<input class="blank-input${answered ? (SES.answers[step].ok ? " ok" : " bad") : ""}" id="blankIn"
      placeholder="输入答案（单词 / 数字 / 短语）" value="${esc(val)}" ${answered ? "disabled" : ""}>`;
  }

  let fbHtml = "";
  if (answered) {
    const r = SES.answers[step];
    fbHtml = `<div class="feedback ${r.ok ? "ok" : "bad"}">
      <div class="fb-head">${r.ok ? I.check + " 回答正确" : I.x + " 回答错误"}</div>
      ${r.ok ? "" : `<div>正确答案：<b>${esc(q.type === "choice" || q.type === "match" ? ["A","B","C","D","E"][q.answer] : q.type === "tfng" ? q.answer : q.accept[0])}</b></div>`}
      <div class="fb-exp">💡 ${esc(q.explain)}</div>
    </div>`;
  }

  $("#main").innerHTML = `<div class="view">
    ${stepHeader()}
    ${passageHtml}
    <div class="card q-card">
      <span class="q-tag">${tagMap[q.type]}</span>
      <div class="q-stem"><span class="q-no">${step + 1}.</span>${esc(q.stem)}</div>
      ${qHtml}
      ${fbHtml}
      <div class="q-actions">
        ${!answered ? (q.type === "blank"
          ? `<button class="btn" id="submitBlank" disabled>提交答案</button>`
          : `<button class="btn" id="submitPick" disabled>确认</button>`)
        : `<button class="btn" id="nextStep">${step === SES.idxs.length - 1 ? "查看成绩" : "下一题"} →</button>`}
      </div>
    </div>
  </div>`;

  $("#sesBack").addEventListener("click", () => { ttsStop(); renderTrain(); });
  const sp = $("#ttsPlay"); if (sp) sp.addEventListener("click", () => ttsSpeak(item.transcript, item.rate));
  const stb = $("#ttsStopBtn"); if (stb) stb.addEventListener("click", ttsStop);
  const sb = $("#showScript"); if (sb) sb.addEventListener("click", () => {
    const box = $("#scriptBox");
    box.style.display = box.style.display === "none" ? "block" : "none";
  });

  if (q.type === "blank") {
    const inp = $("#blankIn");
    inp.addEventListener("input", () => { SES.answers[step + 10] = inp.value; const sb = $("#submitBlank"); if (sb) sb.disabled = !inp.value.trim(); });
    inp.addEventListener("keydown", e => { if (e.key === "Enter" && inp.value.trim() && !answered) { const sb = $("#submitBlank"); if (sb) sb.click(); } });
    const sbBtn = $("#submitBlank");
    if (sbBtn) sbBtn.addEventListener("click", () => submitObjective(q, qi, inp.value));
  } else {
    document.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => {
      if (SES.answers[step] !== undefined) return;
      const pick = q.type === "tfng" ? b.dataset.pick : +b.dataset.pick;
      SES.answers[step + 10] = pick;
      document.querySelectorAll("[data-pick]").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      const sp = $("#submitPick"); if (sp) sp.disabled = false;
    }));
    const spBtn = $("#submitPick");
    if (spBtn) spBtn.addEventListener("click", () => submitObjective(q, qi, SES.answers[step + 10]));
  }
  const nb = $("#nextStep"); if (nb) nb.addEventListener("click", () => { SES.step++; renderStep(); });
  if (q.type === "blank" && !answered) $("#blankIn").focus();
}

function submitObjective(q, qi, pick) {
  if (pick === undefined || pick === null || pick === "") return;
  let ok = false, userDisp = "", ansDisp = "";
  if (q.type === "blank") {
    const norm = s => String(s).toLowerCase().trim().replace(/\s+/g, " ");
    ok = q.accept.some(a => norm(a) === norm(pick));
    userDisp = pick; ansDisp = q.accept[0];
  } else if (q.type === "tfng") {
    ok = pick === q.answer;
    userDisp = pick; ansDisp = q.answer;
  } else {
    ok = pick === q.answer;
    userDisp = ["A", "B", "C", "D", "E"][pick] + " " + q.options[pick];
    ansDisp = ["A", "B", "C", "D", "E"][q.answer] + " " + q.options[q.answer];
  }

  SES.answers[SES.step] = { pick, ok };
  S.stats.answered++; if (ok) S.stats.correct++;
  if (!ok) addWrong(SES.sub, SES.item.id, qi, userDisp, ansDisp, q.explain);
  save(); renderStep();
}

function addWrong(sub, itemId, qi, user, ans, exp) {
  const qid = itemId + "#" + qi;
  const i = S.wrong.findIndex(w => w.qid === qid);
  const rec = { qid, sub, itemId, qi, user, ans, exp, mastered: false, time: Date.now() };
  if (i >= 0) S.wrong[i] = rec; else S.wrong.push(rec);
  renderNav();
}

function renderSessionEnd() {
  const { sub, item } = SES;
  const total = SES.idxs.length;
  const correct = SES.answers.slice(0, total).filter(r => r && r.ok).length;
  const pct = Math.round(correct / total * 100);
  const isObj = sub === "listening" || sub === "reading";
  const fullRun = isObj && total === item.questions.length;
  const prev = S.best[item.id] || 0;
  if (fullRun && pct > prev) S.best[item.id] = pct;
  if (sub === "writing") { S.stats.writing++; }
  if (sub === "speaking") { S.stats.speaking++; }
  save(); renderNav();

  const R = 54, C = 2 * Math.PI * R;
  $("#main").innerHTML = `<div class="view">
    <div class="card score-hero">
      <div class="score-ring">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--line-soft)" stroke-width="10"/>
          <circle cx="60" cy="60" r="${R}" fill="none" stroke="${isObj ? (pct >= 66 ? "var(--green)" : "var(--red)") : "var(--brand-2)"}" stroke-width="10"
            stroke-linecap="round" stroke-dasharray="${C * pct / 100} ${C}"/>
        </svg>
        <div class="val">${isObj ? pct + "%" : "完成"}</div>
      </div>
      <h3>${isObj ? (pct >= 80 ? "太棒了，继续保持！" : pct >= 60 ? "不错，错题已收录" : "别灰心，错题已收录待回看") : "练习完成，已记录 1 次"}</h3>
      <p>${esc(item.title)}${isObj ? ` · 正确 ${correct} / ${total}` : ""}${pct > prev ? " · 刷新最佳纪录 🎉" : ""}</p>
      <div class="score-detail">
        <div class="sd"><b>${S.stats.answered}</b><span>累计做题</span></div>
        <div class="sd"><b>${S.wrong.filter(w => !w.mastered).length}</b><span>待复习错题</span></div>
        <div class="sd"><b>${streak()}</b><span>连续打卡</span></div>
      </div>
      <div class="score-actions">
        <button class="btn" id="backList">返回题库</button>
        ${isObj ? `<button class="btn ghost" id="redoAll">${I.refresh} 重新挑战</button>` : ""}
        <button class="btn ghost" id="goWrong">查看错题本</button>
      </div>
    </div>
  </div>`;
  $("#backList").addEventListener("click", renderTrain);
  const ra = $("#redoAll"); if (ra) ra.addEventListener("click", () => startSession(sub, item.id));
  $("#goWrong").addEventListener("click", () => navigate("wrong"));
}

/* ---------- 写作 ---------- */
function renderWritingStep() {
  const { item } = SES;
  $("#main").innerHTML = `<div class="view">
    ${stepHeader()}
    <div class="card">
      <div class="card-title">${esc(item.task)} · ${esc(item.title)} <span class="plan-stage" style="margin-left:auto">建议 ${item.time} 分钟</span></div>
      <div class="writing-prompt">${esc(item.prompt).replace(/\//g, "<br>")}</div>
      <textarea class="essay-area" id="essay" placeholder="在此输入你的作文…（英文作答，注意字数要求）"></textarea>
      <div class="word-counter">
        <span id="wcText" class="muted">已输入 0 词 / 要求不少于 ${item.minWords} 词</span>
        <span class="muted">完成后点击提交，对照审题要点与范文自评</span>
      </div>
      <div class="q-actions"><button class="btn" id="submitEssay" disabled>提交并查看反馈</button></div>
    </div>
    <div id="essayFb"></div>
  </div>`;

  $("#sesBack").addEventListener("click", () => renderTrain());
  const ta = $("#essay");
  ta.addEventListener("input", () => {
    const n = wordCount(ta.value);
    const t = $("#wcText");
    t.innerHTML = `已输入 <b class="${n >= item.minWords ? "wc-ok" : "wc-low"}">${n}</b> 词 / 要求不少于 ${item.minWords} 词${n >= item.minWords ? " ✓ 字数达标" : ""}`;
    $("#submitEssay").disabled = n < 20;
  });
  $("#submitEssay").addEventListener("click", () => {
    const n = wordCount(ta.value);
    $("#essayFb").innerHTML = `
    <div class="card">
      <div class="card-title">即时反馈</div>
      <div class="feedback ${n >= item.minWords ? "ok" : "bad"}" style="margin:0 0 14px">
        <div class="fb-head">${n >= item.minWords ? I.check + " 字数达标：" + n + " 词" : I.x + " 字数不足：" + n + " / " + item.minWords + " 词（考场会直接扣分）"}</div>
      </div>
      <div class="two-col">
        <div>
          <h5 class="card-title" style="font-size:14px">审题要点对照</h5>
          <ul class="check-list" id="chkList">${item.points.map((p, i) => `<li data-i="${i}"><span class="ck-box">${I.check}</span><span>${esc(p)}</span></li>`).join("")}</ul>
        </div>
        <div>
          <h5 class="card-title" style="font-size:14px">建议结构</h5>
          <ul class="acc-list">${item.structure.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
          <h5 class="card-title" style="font-size:14px;margin-top:16px">高分表达</h5>
          <div class="hl-list">${item.vocab.map(v => `<span class="hl-chip">${esc(v)}</span>`).join("")}</div>
        </div>
      </div>
      <div class="section-gap"></div>
      <div class="sample-box">
        <h5>参考范文</h5>
        ${item.sample.split("/").map(s => `<p>${esc(s.trim())}</p>`).join("")}
        <p class="muted" style="margin-top:8px">${esc(item.sampleNote)}</p>
      </div>
      <div class="q-actions"><button class="btn" id="finishW">完成练习</button></div>
    </div>`;
    $("#essayFb").scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelectorAll("#chkList li").forEach(li => li.addEventListener("click", () => li.classList.toggle("checked")));
    $("#finishW").addEventListener("click", () => renderSessionEnd());
  });
}

/* ---------- 口语 ---------- */
function renderSpeakingStep() {
  const { item } = SES;
  $("#main").innerHTML = `<div class="view">
    ${stepHeader()}
    <div class="card speaking-card">
      <div class="card-title">${esc(item.part)} · ${esc(item.title)}</div>
      <div class="cue-card">
        ${item.cues.map((c, i) => i === 0 ? `<h4>${esc(c)}</h4>` : `<ul><li>${esc(c)}</li></ul>`).join("").replace(/<\/ul><ul>/g, "")}
      </div>
      ${item.part === "Part 2" ? `
      <div class="timer-ring">
        <div class="timer-num" id="timerNum">--:--</div>
        <div>
          <button class="btn sm" id="startPrep">开始 1 分钟准备</button>
          <button class="btn sm ghost" id="startTalk" style="margin-left:8px" disabled>开始作答</button>
          <button class="btn sm plain" id="stopTimer" style="margin-left:8px" disabled>结束</button>
        </div>
      </div>
      <p class="muted">准备期写下关键词即可，作答目标 ${Math.round(item.talk / 60)} 分钟。也可以用手机录音自查流利度。</p>` : `
      <p class="muted">建议每题口头作答 15-25 秒：直接回答 + 原因 + 一个小例子。</p>`}
      <div class="section-gap"></div>
      <div class="sample-box">
        <h5>参考回答（先自答再看）</h5>
        ${item.sample.split("/").map(s => `<p>${esc(s.trim())}</p>`).join("")}
      </div>
      <div class="section-gap"></div>
      <h5 class="card-title" style="font-size:14px">高分表达</h5>
      <div class="hl-list">${item.phrases.map(p => `<span class="hl-chip">${esc(p)}</span>`).join("")}</div>
      ${item.followups && item.followups.length ? `
      <div class="section-gap"></div>
      <h5 class="card-title" style="font-size:14px">Part 3 延伸思考</h5>
      <ul class="acc-list">${item.followups.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
      <div class="section-gap"></div>
      <div class="card-title" style="font-size:14px">自评（流利度 / 词汇 / 语法，各 1-5 分）</div>
      <div class="self-eval-row" id="evalRow">
        ${["流利度", "词汇", "语法"].map((d, k) => `
        <span style="min-width:56px">${d}</span>
        <span class="star-row" data-dim="${k}">${[1, 2, 3, 4, 5].map(s => `<button class="star" data-s="${s}">★</button>`).join("")}</span>`).join("")}
      </div>
      <div class="q-actions"><button class="btn" id="finishS">完成练习</button></div>
    </div>
  </div>`;

  $("#sesBack").addEventListener("click", () => { clearTimer(); renderTrain(); });
  document.querySelectorAll(".star-row").forEach(row => {
    row.querySelectorAll(".star").forEach(st => st.addEventListener("click", () => {
      row.dataset.val = st.dataset.s;
      row.querySelectorAll(".star").forEach(x => x.classList.toggle("on", +x.dataset.s <= +st.dataset.s));
    }));
  });
  $("#finishS").addEventListener("click", () => { clearTimer(); renderSessionEnd(); });

  if (item.part === "Part 2") {
    const num = $("#timerNum");
    const sp = $("#startPrep"), tk = $("#startTalk"), sp2 = $("#stopTimer");
    sp.addEventListener("click", () => {
      countdown(item.prep, num, () => { toast("准备时间到，开始作答"); tk.disabled = false; tk.click(); });
      sp.disabled = true; tk.disabled = true;
    });
    tk.addEventListener("click", () => {
      countdown(item.talk, num, () => { toast("时间到！对照参考回答自评"); sp2.click(); }, true);
      tk.disabled = true; sp2.disabled = false;
    });
    sp2.addEventListener("click", () => { clearTimer(); num.textContent = "--:--"; sp2.disabled = true; sp.disabled = false; });
  }
}
function countdown(sec, el, onEnd, warnAt60) {
  clearTimer();
  let left = sec;
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  el.textContent = fmt(left);
  timerInt = setInterval(() => {
    left--;
    el.textContent = fmt(Math.max(left, 0));
    if (warnAt60 && left <= 10) el.classList.add("warn");
    if (left <= 0) { clearTimer(); onEnd && onEnd(); }
  }, 1000);
}

/* ===================== 考点速记 ===================== */
let noteCat = "syn", noteIdx = 0, noteFlip = false, noteOrder = [];
function renderNotes() {
  const cats = NOTE_CATS.filter(c => NOTES.some(n => n.cat === c.id));
  if (!cats.some(c => c.id === noteCat)) noteCat = cats[0].id;
  const cards = NOTES.filter(n => n.cat === noteCat);
  if (!noteOrder.length || noteOrder.length !== cards.length) noteOrder = cards.map((_, i) => i);
  const ci = Math.min(noteIdx, cards.length - 1);
  const card = cards[noteOrder[ci]];
  noteFlip = false;

  $("#main").innerHTML = `<div class="view">
    <div class="view-head"><div class="view-title">高频考点速记</div>
    <div class="view-sub">点击卡片翻面查看要点 · 按「下一个」顺序过卡</div></div>
    <div class="note-cats">${cats.map(c => `<button class="note-cat-chip${c.id === noteCat ? " active" : ""}" data-cat="${c.id}">${c.name}</button>`).join("")}</div>
    <div class="flash-stage">
      <div class="flash-meta">第 ${ci + 1} / ${cards.length} 张</div>
      <div class="flash-card" id="flashCard" role="button" tabindex="0" aria-label="翻卡">
        <div class="fc-front">
          <div class="fc-label">${esc((cats.find(c => c.id === noteCat)).name)} · 点击翻面</div>
          <div class="fc-main">${esc(card.front)}</div>
          <div class="fc-hint">先回忆，再看答案</div>
        </div>
      </div>
      <div class="flash-actions">
        <button class="btn ghost" id="prevCard">← 上一张</button>
        <button class="btn" id="nextCard">下一个 →</button>
        <button class="btn plain" id="shuffleCards">${I.refresh} 随机</button>
      </div>
      <div class="fc-dots">${cards.map((_, i) => `<i class="${i === ci ? "on" : ""}"></i>`).join("")}</div>
    </div>
  </div>`;

  document.querySelectorAll("[data-cat]").forEach(b => b.addEventListener("click", () => {
    noteCat = b.dataset.cat; noteIdx = 0; noteOrder = []; renderNotes();
  }));
  const fc = $("#flashCard");
  const flip = () => {
    if (noteFlip) return renderNotes();
    noteFlip = true;
    fc.innerHTML = `<div class="fc-back">
      <div class="fc-label">要点 · 点击返回</div>
      <div class="fc-main">${richText(card.back)}</div>
    </div>`;
    fc.classList.add("flipped");
  };
  fc.addEventListener("click", flip);
  fc.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  $("#prevCard").addEventListener("click", () => { noteIdx = (ci - 1 + cards.length) % cards.length; renderNotes(); });
  $("#nextCard").addEventListener("click", () => { noteIdx = (ci + 1) % cards.length; renderNotes(); });
  $("#shuffleCards").addEventListener("click", () => {
    noteOrder = cards.map((_, i) => i);
    for (let i = noteOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [noteOrder[i], noteOrder[j]] = [noteOrder[j], noteOrder[i]];
    }
    noteIdx = 0; renderNotes();
  });
}

/* ===================== 错题本 ===================== */
let wrongFilter = "all";
function renderWrong() {
  const list = S.wrong.filter(w => wrongFilter === "all" ? !w.mastered : wrongFilter === "done" ? w.mastered : (!w.mastered && w.sub === wrongFilter));
  const subs = [["all", "全部未掌握"], ["listening", "听力"], ["reading", "阅读"], ["done", "已掌握"]];
  const subName = { listening: "听力", reading: "阅读" };

  $("#main").innerHTML = `<div class="view">
    <div class="view-head"><div class="view-title">错题本</div>
    <div class="view-sub">做错的客观题自动收录于此 · 重做答对后可标记掌握</div></div>
    <div class="wrong-filter">${subs.map(([v, n]) => `<button class="level-chip${wrongFilter === v ? " active" : ""}" data-wf="${v}">${n}</button>`).join("")}</div>
    ${list.length ? list.map(w => {
      const item = BANK[w.sub].find(x => x.id === w.itemId);
      const q = item.questions[w.qi];
      return `<div class="card wrong-item">
        <div class="wrong-head">
          <span class="wt">${subName[w.sub] || w.sub}</span>
          <span class="wt-sub">${esc(item.title)} · 第 ${w.qi + 1} 题</span>
          <span class="grow"></span>
          ${w.mastered ? `<span class="wt" style="background:var(--green-soft);color:var(--green)">已掌握</span>` : ""}
        </div>
        <div class="wrong-stem">${esc(q.stem)}</div>
        <div class="wrong-ans">
          <span class="wa-user">${I.x} 我的答案：${esc(w.user)}</span>
          <span class="wa-right">${I.check} 正确答案：${esc(w.ans)}</span>
        </div>
        <div class="wrong-exp">💡 ${esc(w.exp)}</div>
        <div class="wrong-actions">
          ${w.mastered ? "" : `<button class="btn sm" data-redo="${w.qid}">${I.refresh} 重做此题</button>
          <button class="btn sm plain" data-master="${w.qid}">${I.check} 标记已掌握</button>`}
          <button class="btn sm plain" data-del="${w.qid}">${I.trash} 删除</button>
        </div>
      </div>`;
    }).join("") : `<div class="card empty-state">
      ${I.wrong.replace('stroke-width="2"', 'stroke-width="1.5"')}
      <p>${wrongFilter === "done" ? "还没有标记已掌握的错题" : "太棒了，暂无待消灭错题！继续保持"}</p>
      <button class="btn sm" id="goTrain2">去刷题</button>
    </div>`}
  </div>`;

  document.querySelectorAll("[data-wf]").forEach(b => b.addEventListener("click", () => { wrongFilter = b.dataset.wf; renderWrong(); }));
  document.querySelectorAll("[data-redo]").forEach(b => b.addEventListener("click", () => {
    const w = S.wrong.find(x => x.qid === b.dataset.redo);
    trainSub = w.sub;
    startSession(w.sub, w.itemId, [w.qi]);
  }));
  document.querySelectorAll("[data-master]").forEach(b => b.addEventListener("click", () => {
    const w = S.wrong.find(x => x.qid === b.dataset.master);
    w.mastered = true; save(); renderNav(); renderWrong();
    toast("已标记掌握，移出待复习", "ok");
  }));
  document.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
    S.wrong = S.wrong.filter(x => x.qid !== b.dataset.del);
    save(); renderNav(); renderWrong();
    toast("已删除");
  }));
  const gt = $("#goTrain2"); if (gt) gt.addEventListener("click", () => navigate("train"));
}

/* ===================== 单词打卡 ===================== */
const DAILY_WORDS = 30;   // 每日打卡单词数
const ALL_WORDS = [];
VOCAB_TOPICS.forEach(t => t.words.forEach(w => ALL_WORDS.push(Object.assign({ topic: t.name }, w))));

function dailyPicks(dateStr) {
  const rng = mulberry32([...dateStr].reduce((a, c) => a * 33 + c.charCodeAt(0) >>> 0, 7));
  const idx = ALL_WORDS.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, DAILY_WORDS);
}
function ensureVocabToday() {
  const d = todayStr();
  if (!S.vocabToday || S.vocabToday.date !== d || (S.vocabToday.picks || []).length !== DAILY_WORDS) {
    S.vocabToday = { date: d, picks: dailyPicks(d), idx: 0, known: [], unknown: [], done: false };
    save();
  }
}

/* ---------- 联网查词（dictionaryapi.dev，带本地缓存） ---------- */
function dictPanelHTML(id) {
  return `<div class="dict-panel" id="${id}" hidden></div>`;
}
function attachDict(btnSel, panelSel, getWord) {
  const btn = $(btnSel), panel = $(panelSel);
  if (!btn || !panel) return;
  btn.addEventListener("click", async () => {
    const w = getWord();
    if (!panel.hidden && panel.dataset.word === w) { panel.hidden = true; return; }
    panel.hidden = false;
    panel.dataset.word = w || "";
    panel.innerHTML = `<div class="dict-loading">正在查询 ${esc(w)} …</div>`;
    try {
      const r = await DictAPI.lookup(w);
      if (r.ok) {
        const d = r.data;
        panel.innerHTML = `
          <div class="dict-head">
            <span class="dict-word">${esc(d.word)}</span>
            ${d.phon ? `<span class="dict-phon">${esc(d.phon)}</span>` : ""}
            ${d.pos ? `<span class="dict-pos-tag">${esc(d.pos)}</span>` : ""}
            <span class="dict-src">ECDICT 开源词典</span>
          </div>
          <div class="dict-meaning">
            ${d.cn.length ? `<div class="dict-pos">中文释义</div>${d.cn.map(c => `<div class="dict-def"><p>${esc(c)}</p></div>`).join("")}` : ""}
            ${d.en.length ? `<div class="dict-pos">English</div>${d.en.map(e => `<div class="dict-def"><p>${esc(e)}</p></div>`).join("")}` : ""}
          </div>
          ${r.syns && r.syns.length ? `
            <div class="dict-meaning">
              <div class="dict-pos">近义词 · via Datamuse</div>
              <div class="dict-syns">${r.syns.map(s => `<span class="dict-syn">${esc(s)}</span>`).join("")}</div>
            </div>` : ""}`;
      } else {
        panel.innerHTML = `<div class="dict-loading">词典库暂未收录「${esc(w)}」</div>`;
      }
    } catch (e) {
      panel.innerHTML = `<div class="dict-loading">网络异常，请稍后重试</div>`;
    }
  });
  panel.addEventListener("click", e => {
    const say = e.target.closest(".dict-say");
    if (say && say.dataset.audio) {
      new Audio(say.dataset.audio).play().catch(() => toast("音频播放失败"));
    }
  });
}
function renderVocab() {
  ensureVocabToday();
  const vt = S.vocabToday;
  const st = streak();
  const ck = S.checkins[vt.date];
  const doneN = vt.known.length + vt.unknown.length;

  // 顶部：进度 + 日历
  const R = 40, C = 2 * Math.PI * R;
  const pct = ck ? 100 : Math.round(doneN / DAILY_WORDS * 100);
  const calCells = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (29 - i));
    const ds = todayStr(d);
    return `<div class="cal-cell${S.checkins[ds] ? " hit" : ""}${ds === vt.date ? " today" : ""}" title="${ds}"></div>`;
  }).join("");

  let stage = "";
  if (ck) {
    stage = `<div class="card vocab-progress-card" style="margin-bottom:16px">
      <div class="vp-ring"><svg viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="${R}" fill="none" stroke="var(--green)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}"/>
      </svg><div class="val">✓</div></div>
      <div class="vp-info">
        <h3>今日打卡完成 🎉</h3>
        <p>认识 ${vt.known.length} 词 · 待巩固 ${vt.unknown.length} 词（已加入生词本）</p>
        <div class="streak-strip">${I.flame} 已连续打卡 ${st} 天</div>
      </div>
      <button class="btn ghost" id="extraRound">再来一组（不计打卡）</button>
    </div>`;
  } else {
    stage = `<div class="card vocab-progress-card" style="margin-bottom:16px">
      <div class="vp-ring"><svg viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="${R}" fill="none" stroke="var(--line-soft)" stroke-width="8"/>
        <circle cx="48" cy="48" r="${R}" fill="none" stroke="var(--brand-2)" stroke-width="8" stroke-linecap="round"
          stroke-dasharray="${C * pct / 100} ${C}"/>
      </svg><div class="val">${doneN}/${DAILY_WORDS}</div></div>
      <div class="vp-info">
        <h3>今日单词打卡</h3>
        <p>完成 ${DAILY_WORDS} 个高频词即可打卡 · 覆盖 8 大主题词库</p>
        <div class="streak-strip">${I.flame} 已连续打卡 ${st} 天</div>
      </div>
    </div>`;
  }

  let main = "";
  if (!ck && doneN < DAILY_WORDS) {
    const w = ALL_WORDS[vt.picks[doneN]];
    main = `<div class="card vocab-stage">
      <div class="vocab-count">第 ${doneN + 1} / ${DAILY_WORDS} 词</div>
      <div class="vocab-word">${esc(w.w)}</div>
      <div class="vocab-pos">${esc(w.p)} <button class="btn sm plain" id="sayWord" style="margin-left:8px">${I.volume} 发音</button></div>
      <div class="vocab-cn">${esc(w.cn)}</div>
      ${w.s ? `<div class="vocab-sent"><b>${esc(w.s)}</b><br>${esc(w.sc)}</div>` :
        (w.en && w.en.length ? `<div class="vocab-sent"><b>释义</b><br>${w.en.map(e => esc(e)).join("<br>")}</div>` : "")}
      <button class="btn sm plain dict-btn" id="dictBtn">${I.book} 联网查词</button>
      ${dictPanelHTML("dictPanel")}
      <div class="vocab-actions">
        <button class="vbtn no" id="vNo">不认识 😵</button>
        <button class="vbtn yes" id="vYes">认识 ✓</button>
      </div>
    </div>`;
  } else if (!ck && doneN >= DAILY_WORDS) {
    main = `<div class="card vocab-stage">
      <div class="empty-state" style="padding:30px">
        <p>本组已完成，点击完成打卡</p>
        <button class="btn" id="doCheckin">${I.check} 完成今日打卡</button>
      </div>
    </div>`;
  } else {
    main = `<div class="card vocab-stage" id="extraBox" style="display:none">
      <div class="vocab-count">加练词（不计入打卡）</div>
      <div class="vocab-word" id="exWord"></div>
      <div class="vocab-pos" id="exPos"></div>
      <div class="vocab-cn" id="exCn"></div>
      <div class="vocab-sent" id="exSent"></div>
      <button class="btn sm plain dict-btn" id="exDictBtn">${I.book} 联网查词</button>
      ${dictPanelHTML("exDictPanel")}
      <div class="vocab-actions">
        <button class="vbtn no" id="exNo">不认识 😵</button>
        <button class="vbtn yes" id="exYes">认识 ✓</button>
      </div>
    </div>`;
  }

  const wb = S.wordbook.slice().reverse();
  $("#main").innerHTML = `<div class="view">
    <div class="view-head"><div class="view-title">每日单词打卡</div>
    <div class="view-sub">每天 ${DAILY_WORDS} 个雅思高频词 · 不认识的自动进入生词本</div></div>
    ${stage}
    ${main}
    <div class="card" style="margin-top:16px">
      <div class="card-title">最近 30 天打卡记录</div>
      <div class="cal-grid">${calCells}</div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="card-title">生词本（${S.wordbook.length}）</div>
      ${wb.length ? `<div class="wordbook-list">${wb.map(w => {
        const full = ALL_WORDS.find(x => x.w === w);
        return full ? `<div class="wordbook-row"><span class="w">${esc(full.w)}</span><span class="p">${esc(full.p)}</span><span class="m">${esc(full.cn)}${full.s ? " — " + esc(full.s) : ""}</span>
          <button class="btn sm plain" data-known="${esc(full.w)}">已掌握</button></div>` : "";
      }).join("")}</div>` : `<p class="muted">打卡中选择「不认识」的词会出现在这里，方便集中复盘。</p>`}
    </div>
  </div>`;

  const say = w => ttsSpeak(w, 0.85);
  const sw = $("#sayWord"); if (sw) sw.addEventListener("click", () => say(ALL_WORDS[vt.picks[doneN]].w));
  attachDict("#dictBtn", "#dictPanel", () => ALL_WORDS[vt.picks[doneN]].w);

  function advance(known) {
    const w = ALL_WORDS[vt.picks[doneN]];
    S.stats.wordsMet++;
    if (known) { vt.known.push(w.w); S.stats.wordsKnown++; }
    else if (!S.wordbook.includes(w.w)) { S.wordbook.push(w.w); }
    if (vt.known.length + vt.unknown.length >= DAILY_WORDS) { /* wait for check-in */ }
    vt.idx++;
    save(); renderVocab();
  }
  const yn = $("#vNo"), yy = $("#vYes");
  if (yn) { yn.addEventListener("click", () => { vt.unknown.push(ALL_WORDS[vt.picks[doneN]].w); advance(false); }); }
  if (yy) yy.addEventListener("click", () => advance(true));
  const dc = $("#doCheckin");
  if (dc) dc.addEventListener("click", () => {
    S.checkins[vt.date] = { right: vt.known.length, total: DAILY_WORDS };
    const log = S.planLog[vt.date] = S.planLog[vt.date] || {};
    if (S.plan && S.plan.tasks.includes("vocab")) log.vocab = true;
    save(); renderNav(); renderVocab();
    toast("打卡成功！今天也是努力的一天", "ok");
  });

  // 加练
  const eb = $("#extraBox");
  if (eb) {
    let exPool = [], exI = -1, exKnown = 0, exUnknown = 0, exCur = null;
    function nextEx() {
      if (exI < 0 || exI >= exPool.length - 1) {
        exPool = dailyPicks(vt.date + "-" + Math.floor(Math.random() * 9999));
        exI = -1;
      }
      exI++;
      const w = ALL_WORDS[exPool[exI]];
      exCur = w;
      $("#exWord").textContent = w.w;
      $("#exPos").textContent = w.p;
      $("#exCn").textContent = w.cn;
      $("#exSent").innerHTML = w.s
        ? "<b>" + esc(w.s) + "</b><br>" + esc(w.sc)
        : (w.en && w.en.length ? "<b>释义</b><br>" + w.en.map(e => esc(e)).join("<br>") : "");
    }
    $("#extraRound").addEventListener("click", () => { eb.style.display = "block"; exI = -1; nextEx(); eb.scrollIntoView({ behavior: "smooth" }); });
    attachDict("#exDictBtn", "#exDictPanel", () => exCur && exCur.w);
    $("#exNo").addEventListener("click", () => { exUnknown++; if (!S.wordbook.includes(ALL_WORDS[exPool[exI]].w)) S.wordbook.push(ALL_WORDS[exPool[exI]].w); save(); nextEx(); });
    $("#exYes").addEventListener("click", () => { exKnown++; nextEx(); });
  }

  document.querySelectorAll("[data-known]").forEach(b => b.addEventListener("click", () => {
    S.wordbook = S.wordbook.filter(w => w !== b.dataset.known);
    save(); renderVocab(); toast("已从生词本移除", "ok");
  }));
}

/* ===================== 复习计划 ===================== */
function stageName(plan) {
  const d = Math.ceil((new Date(plan.examDate) - new Date(todayStr())) / 86400000);
  if (d <= 0) return "考试日";
  if (d > 90) return "基础期";
  if (d > 30) return "强化期";
  return "冲刺期";
}
function stageTip(plan) {
  const d = Math.ceil((new Date(plan.examDate) - new Date(todayStr())) / 86400000);
  if (d <= 0) return "考试就在眼前：保持手感即可，调整作息，不要再学新知识。";
  if (d > 90) return "基础期建议：以词汇积累和听力精听为主，每天保证单词打卡 + 一篇阅读，写作每周 2 篇即可。";
  if (d > 30) return "强化期建议：加大真题训练量（每天 1-2 组），写作口语开始限时练习，每周回看错题 2 次。";
  return "冲刺期建议：每 2-3 天一次全科模考节奏，重做错题本，口语写作保持每天开口/动笔，不做偏题难题。";
}
function renderPlan() {
  const plan = S.plan;
  if (!plan) return renderPlanForm();
  const today = todayStr();
  const daysLeft = Math.ceil((new Date(plan.examDate) - new Date(today)) / 86400000);
  const log = S.planLog[today] || {};
  const ck = S.checkins[today];
  const targetName = plan.target;
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = todayStr(d);
    const l = S.planLog[ds] || {};
    const c = S.checkins[ds];
    const doneN = plan.tasks.filter(t => l[t] || (t === "vocab" && c)).length;
    return { ds, doneN, total: plan.tasks.length };
  });
  const weekRate = weekDays.length ? Math.round(weekDays.reduce((a, w) => a + (w.total ? w.doneN / w.total : 0), 0) / weekDays.length * 100) : 0;

  $("#main").innerHTML = `<div class="view">
    <div class="view-head"><div class="view-title">我的复习计划</div>
    <div class="view-sub">按考试日期自动划分阶段 · 点击任务即可打卡</div></div>
    <div class="plan-summary">
      <div class="card plan-sum-card"><b>${daysLeft > 0 ? daysLeft : 0}</b><span>距考试（天）</span></div>
      <div class="card plan-sum-card"><b>${targetName}</b><span>目标分数</span></div>
      <div class="card plan-sum-card"><b>${weekRate}%</b><span>近 7 天完成度</span></div>
    </div>
    <div class="card">
      <div class="card-title">当前阶段 <span class="plan-stage" style="margin-left:auto">${stageName(plan)}</span></div>
      <ul class="today-list">
        ${plan.tasks.map(t => {
          const name = (PLAN_TASKS.find(p => p.id === t) || {}).name || t;
          const auto = t === "vocab" && ck;
          const done = log[t] || auto;
          return `<li class="today-item${done ? " done" : ""}" data-task="${t}">
            <span class="tick">${I.check}</span><span class="grow">${name}</span><span class="tag">${done ? "已完成" : "待完成"}</span></li>`;
        }).join("")}
      </ul>
      <div class="plan-tip">📅 ${esc(stageTip(plan))}</div>
    </div>
    <div class="card">
      <div class="card-title">近 7 天趋势</div>
      ${weekDays.map(w => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:13px">
        <span class="muted" style="width:86px">${w.ds.slice(5)}</span>
        <div class="session-progress" style="flex:1"><i style="width:${w.total ? w.doneN / w.total * 100 : 0}%"></i></div>
        <span class="muted" style="width:44px;text-align:right">${w.doneN}/${w.total}</span></div>`).join("")}
    </div>
    <div class="q-actions" style="justify-content:flex-start;margin-top:16px">
      <button class="btn ghost" id="editPlan">编辑计划</button>
      <button class="btn plain" id="delPlan">删除并重设</button>
    </div>
  </div>`;

  document.querySelectorAll(".today-item").forEach(li => li.addEventListener("click", () => {
    const t = li.dataset.task;
    if (t === "vocab") return navigate("vocab");
    const lg = S.planLog[today] = S.planLog[today] || {};
    if (lg[t]) return;
    lg[t] = true; save(); renderPlan();
    toast("任务完成 +1", "ok");
  }));
  $("#editPlan").addEventListener("click", () => renderPlanForm(plan));
  $("#delPlan").addEventListener("click", () => {
    S.plan = null; S.planLog = {}; save(); renderPlan(); toast("已删除计划");
  });
}

function renderPlanForm(prev) {
  const p = prev || S.plan;
  const dv = p ? p.examDate : "";
  const tg = p ? p.target : "6.5";
  const lv = p ? p.level : "2";
  const tks = p ? p.tasks : ["listen", "read", "vocab"];
  $("#main").innerHTML = `<div class="view">
    <div class="view-head"><div class="view-title">${p ? "编辑复习计划" : "制定复习计划"}</div>
    <div class="view-sub">设置考试日期与每日任务，生成贴合备考节奏的计划</div></div>
    <div class="card">
      <div class="plan-form">
        <div class="form-field">
          <label>考试日期</label>
          <input type="date" id="pExam" value="${dv}">
        </div>
        <div class="form-field">
          <label>目标分数</label>
          <select id="pTarget">${["5.5", "6.0", "6.5", "7.0", "7.5", "8.0"].map(v => `<option value="${v}"${v === tg ? " selected" : ""}>${v}</option>`).join("")}</select>
        </div>
        <div class="form-field full">
          <label>当前水平自评</label>
          <select id="pLevel">
            <option value="1"${lv === "1" ? " selected" : ""}>入门（四级水平 / 首次接触雅思）</option>
            <option value="2"${lv === "2" ? " selected" : ""}>进阶（六级水平 / 已刷过一轮题）</option>
            <option value="3"${lv === "3" ? " selected" : ""}>冲刺（目标 7 分以上 / 二刷提分）</option>
          </select>
        </div>
        <div class="form-field full">
          <label>每日任务（点选多项）</label>
          <div class="task-checks">${PLAN_TASKS.map(t => `<span class="task-check${tks.includes(t.id) ? " on" : ""}" data-tk="${t.id}"><span class="dot"></span>${t.name}</span>`).join("")}</div>
        </div>
      </div>
      <div class="q-actions" style="justify-content:flex-start">
        <button class="btn" id="savePlan">${p ? "保存修改" : "生成计划"}</button>
        ${p ? `<button class="btn plain" id="cancelEdit">取消</button>` : ""}
      </div>
    </div>
  </div>`;

  document.querySelectorAll("[data-tk]").forEach(c => c.addEventListener("click", () => c.classList.toggle("on")));
  $("#savePlan").addEventListener("click", () => {
    const exam = $("#pExam").value;
    if (!exam) { toast("请先选择考试日期", "bad"); return; }
    const tasks = [...document.querySelectorAll(".task-check.on")].map(c => c.dataset.tk);
    if (!tasks.length) { toast("至少选择一个每日任务", "bad"); return; }
    S.plan = { examDate: exam, target: $("#pTarget").value, level: +$("#pLevel").value, tasks, created: todayStr() };
    save(); renderPlan(); toast("计划已生成，坚持执行最重要 💪", "ok");
  });
  const ce = $("#cancelEdit"); if (ce) ce.addEventListener("click", renderPlan);
}

/* ===================== 主题 ===================== */
function applyTheme() {
  document.documentElement.dataset.theme = S.theme;
  const label = S.theme === "dark" ? "明亮模式" : "护眼浅色";
  const sp = $("#themeToggle span"); if (sp) sp.textContent = label;
}
function toggleTheme() {
  S.theme = S.theme === "dark" ? "light" : "dark";
  save(); applyTheme();
}

/* ===================== 写作范文 ===================== */
let writingTab = "task2";
async function renderWriting() {
  const v = view;
  $("#main").innerHTML = `<div class="view"><div class="card"><div class="card-title">写作范文库</div>
    <div class="seg"><button class="seg-btn${writingTab==="task2"?" active":""}" data-wtab="task2">大作文 Task 2（${window.TASK2?TASK2.length:"…"}）</button>
      <button class="seg-btn${writingTab==="task1"?" active":""}" data-wtab="task1">小作文 Task 1（${window.TASK1?TASK1.length:"…"}）</button></div>
    <input class="search" id="wSearch" placeholder="搜索题目关键词…">
    <div id="wList"><div class="dict-loading">加载中…</div></div>
  </div></div>`;
  try {
    if (writingTab === "task2") await loadScript("js/data-task2.js?v=6");
    else await loadScript("js/data-task1.js?v=6");
  } catch (e) { if (view !== v) return; $("#wList").innerHTML = `<div class="empty-state">数据加载失败</div>`; return; }
  if (view !== v) return;
  const list = writingTab === "task2" ? TASK2 : TASK1;
  const draw = (q) => {
    const kw = (q || "").trim().toLowerCase();
    const items = list.filter(e => !kw || e.q.toLowerCase().includes(kw) || e.essay.toLowerCase().includes(kw));
    if (!items.length) { $("#wList").innerHTML = `<div class="empty-state">没有匹配的题目</div>`; return; }
    $("#wList").innerHTML = items.map((e, i) => `
      <details class="essay-item" data-i="${i}">
        <summary><span class="essay-date">${esc(e.date)}</span><span class="essay-q">${esc(e.q.slice(0, 80))}${e.q.length > 80 ? "…" : ""}</span><span class="essay-wc">${e.words}词</span></summary>
        <div class="essay-body">
          <div class="essay-block"><div class="essay-label">题目</div><p>${esc(e.q)}</p></div>
          <div class="essay-block"><div class="essay-label">参考范文</div>${e.essay.split("\n\n").map(p => `<p>${esc(p)}</p>`).join("")}</div>
        </div>
      </details>`).join("");
  };
  draw();
  $("#wSearch").addEventListener("input", e => draw(e.target.value));
  document.querySelectorAll("[data-wtab]").forEach(b => b.addEventListener("click", () => { writingTab = b.dataset.wtab; renderWriting(); }));
}

/* ===================== 阅读题库 ===================== */
let readingOpen = -1;
async function renderReading() {
  const v = view;
  $("#main").innerHTML = `<div class="view"><div class="card"><div class="card-title">阅读题库（${window.READING?READING.length:"…"} 篇）</div>
    <input class="search" id="rSearch" placeholder="搜索文章标题…">
    <div id="rList"><div class="dict-loading">加载中…</div></div>
  </div></div>`;
  try { await loadScript("js/data-reading.js?v=6"); await loadScript("js/data-reading-answers.js?v=6"); }
  catch (e) { if (view !== v) return; $("#rList").innerHTML = `<div class="empty-state">数据加载失败</div>`; return; }
  if (view !== v) return;
  const draw = (q) => {
    const kw = (q || "").trim().toLowerCase();
    const items = READING.map((r, i) => ({ r, i })).filter(x => !kw || x.r.title.toLowerCase().includes(kw));
    $("#rList").innerHTML = items.map(({ r, i }) => `
      <div class="read-item" data-i="${i}">
        <div class="read-title">${esc(r.title)}</div>
        <div class="read-meta">${esc(r.dates.slice(0, 50))}${r.dates.length > 50 ? "…" : ""}</div>
        <button class="btn sm" data-open="${i}">阅读全文</button>
      </div>`).join("") || `<div class="empty-state">没有匹配的文章</div>`;
    document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => openReading(+b.dataset.open)));
  };
  draw();
  $("#rSearch").addEventListener("input", e => draw(e.target.value));
  if (readingOpen >= 0) openReading(readingOpen);
}
function openReading(i) {
  readingOpen = i;
  const r = READING[i];
  const ans = (READING_ANSWERS || []).find(a => a.title.toLowerCase() === r.title.toLowerCase());
  $("#main").innerHTML = `<div class="view">
    <div class="card">
      <div class="read-detail-head">
        <button class="btn sm ghost" id="rBack">${I.back} 返回</button>
        <h3>${esc(r.title)}</h3>
        <div class="read-meta">${esc(r.dates)}</div>
      </div>
      <div class="read-text">${r.text.split("\n\n").map(p => `<p>${esc(p)}</p>`).join("")}</div>
      ${r.questions ? `<div class="read-questions"><div class="essay-label">题目</div><pre>${esc(r.questions)}</pre></div>` : ""}
      ${ans ? `<div class="read-answer"><details><summary>查看答案</summary><pre>${esc(ans.answers)}</pre></details></div>` : `<div class="read-meta">（暂无对应答案）</div>`}
    </div></div>`;
  $("#rBack").addEventListener("click", () => { readingOpen = -1; renderReading(); });
}

/* ===================== 词汇句型 ===================== */
let materialTab = "sentences";
async function renderMaterial() {
  const v = view;
  $("#main").innerHTML = `<div class="view"><div class="card"><div class="card-title">词汇与句型</div>
    <div class="seg"><button class="seg-btn${materialTab==="sentences"?" active":""}" data-mtab="sentences">写作核心 100 句</button>
      <button class="seg-btn${materialTab==="vocab"?" active":""}" data-mtab="vocab">高考频词汇（${window.VOCAB1200?VOCAB1200.length:"…"}）</button></div>
    <div id="mBody"><div class="dict-loading">加载中…</div></div>
  </div></div>`;
  try {
    if (materialTab === "sentences") await loadScript("js/data-sentences.js?v=6");
    else await loadScript("js/data-vocab1200.js?v=6");
  } catch (e) { if (view !== v) return; $("#mBody").innerHTML = `<div class="empty-state">数据加载失败</div>`; return; }
  if (view !== v) return;
  if (materialTab === "sentences") {
    $("#mBody").innerHTML = SENTENCES.map((s, i) => `
      <div class="sent-item">
        <div class="sent-no">${i + 1}</div>
        <div class="sent-body">
          <p class="sent-en">${esc(s.en)} <button class="say-btn" data-say="${esc(s.en)}" title="朗读">${I.volume}</button></p>
          <p class="sent-cn">${esc(s.cn)}</p>
        </div>
      </div>`).join("");
    document.querySelectorAll("[data-say]").forEach(b => b.addEventListener("click", () => ttsSpeak(b.dataset.say)));
  } else {
    $("#mBody").innerHTML = `<input class="search" id="vSearch" placeholder="搜索单词或释义…">
      <div id="vList">${VOCAB1200.map(v => `
        <div class="vocab-item">
          <span class="vocab-w">${esc(v.w)}</span>
          <span class="vocab-pos">${esc(v.pos)}</span>
          <span class="vocab-def">${esc(v.def)}</span>
          <span class="vocab-freq">考频 ${v.freq}</span>
        </div>`).join("")}</div>`;
    $("#vSearch").addEventListener("input", e => {
      const kw = e.target.value.trim().toLowerCase();
      document.querySelectorAll(".vocab-item").forEach(el => {
        el.style.display = (!kw || el.textContent.toLowerCase().includes(kw)) ? "" : "none";
      });
    });
  }
  document.querySelectorAll("[data-mtab]").forEach(b => b.addEventListener("click", () => { materialTab = b.dataset.mtab; renderMaterial(); }));
}

/* ===================== 启动 ===================== */
function boot() {
  applyTheme();
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#themeToggleM").addEventListener("click", toggleTheme);
  renderNav();
  navigate("home");
  // 每过午夜刷新首页打卡状态
  setInterval(() => { if (view === "home") renderHome(); }, 60000);
}
boot();
