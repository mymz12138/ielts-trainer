/* ==========================================================
   api.js · 联网查词模块
   词义/音标/释义：同源 data/dict.json
      （由 GitHub Actions 每日从 ECDICT 开源词典抓取生成）
   近义词/搭配：直连 Datamuse 开放接口（支持 CORS）
   近义词结果 localStorage 缓存，减少请求
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

    const db = await loadDict();
    const data = (db.words && db.words[w]) || null;

    let syns = [];
    try { syns = await synonyms(w); } catch (e) { syns = []; }

    return { ok: !!data, miss: !data, data, syns };
  }

  return { lookup };
})();
