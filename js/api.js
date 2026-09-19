/* ==========================================================
   api.js · 联网查词模块（三层数据策略）
   ① 词义/音标/例句：同源 data/dict.json
      （由 GitHub Actions 定时从 dictionaryapi.dev 抓取生成）
   ② 兜底：浏览器直连 dictionaryapi.dev（网络可达时生效）
   ③ 近义词/搭配：直连 Datamuse 开放接口
   查询结果 localStorage 缓存，减少请求、离线可用
   ========================================================== */
"use strict";

const DictAPI = (() => {
  const SYN_CACHE_KEY = "ielts_syn_cache_v1";
  const SYN_CACHE_MAX = 300;
  let dictPromise = null;

  /* ---- 同源词典数据（首次查词时加载一次） ---- */
  function loadDict() {
    if (!dictPromise) {
      dictPromise = fetch("data/dict.json", { cache: "no-cache" })
        .then(r => (r.ok ? r.json() : { words: {} }))
        .catch(() => ({ words: {} }));
    }
    return dictPromise;
  }

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

  /* ---- 兜底：直连 dictionaryapi.dev ---- */
  let remoteBroken = false;   // 直连失败/超时一次后，本会话不再重试
  async function fetchRemote(word) {
    if (remoteBroken) return null;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 5000);   // 不可达网络下避免长时间挂起
    try {
      const res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word), { signal: ctl.signal });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      return normalize(Array.isArray(json) ? json[0] : json);
    } catch (e) {
      remoteBroken = true;
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  /* ---- Datamuse 近义词 ---- */
  function readSynCache() {
    try { return JSON.parse(localStorage.getItem(SYN_CACHE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function writeSynCache(c) {
    const keys = Object.keys(c);
    if (keys.length > SYN_CACHE_MAX) {
      keys.slice(0, keys.length - SYN_CACHE_MAX).forEach(k => delete c[k]);
    }
    try { localStorage.setItem(SYN_CACHE_KEY, JSON.stringify(c)); } catch (e) {}
  }
  async function synonyms(word) {
    const w = String(word || "").trim().toLowerCase();
    if (!w) return [];
    const cache = readSynCache();
    if (cache[w]) return cache[w];
    const res = await fetch("https://api.datamuse.com/words?rel_syn=" + encodeURIComponent(w) + "&max=6");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const arr = await res.json();
    const list = arr.map(x => x.word).filter(Boolean).slice(0, 6);
    cache[w] = list;
    writeSynCache(cache);
    return list;
  }

  /* ---- 对外入口 ---- */
  async function lookup(word) {
    const w = String(word || "").trim().toLowerCase();
    if (!w) return { ok: false, miss: true, data: null, syns: [] };

    // ① 同源静态数据
    const db = await loadDict();
    let data = (db.words && db.words[w]) || null;

    // ② 未命中则尝试直连（本地种子/新词兜底）
    if (!data) {
      try { data = await fetchRemote(w); } catch (e) { /* 网络不可达时静默降级 */ }
    }

    // ③ 近义词（失败不影响主结果）
    let syns = [];
    try { syns = await synonyms(w); } catch (e) { syns = []; }

    return { ok: !!data, miss: !data, data, syns };
  }

  return { lookup };
})();
