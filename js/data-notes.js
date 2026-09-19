/* ==========================================================
   data-notes.js · 高频考点速记卡
   6 大类 × 4 张卡，front 为提示，back 为要点内容
   ========================================================== */

const NOTE_CATS = [
  { id: "syn",  name: "阅读同义替换" },
  { id: "sig",  name: "听力信号词" },
  { id: "wlc",  name: "写作连接与句型" },
  { id: "spk",  name: "口语地道表达" },
  { id: "tec",  name: "题型技巧" },
  { id: "trap", name: "易错陷阱" }
];

const NOTES = [
  /* ---- 阅读同义替换 ---- */
  { id: "syn-1", cat: "syn", front: "同义替换 · 数量与程度类",
    back: "**most** → the majority of / the vast majority\n**some** → a number of / certain\n**many** → a wide range of / a wealth of\n**more than** → in excess of / over\n**less than** → under / fewer than\n**expensive** → costly / overpriced / a hefty price" },
  { id: "syn-2", cat: "syn", front: "同义替换 · 因果关系类",
    back: "**because** → due to / owing to / on account of\n**cause** → lead to / result in / give rise to / bring about\n**affect** → influence / have an impact on\n**depend on** → rely on / be contingent upon\n**so that** → in order that / with the aim of" },
  { id: "syn-3", cat: "syn", front: "同义替换 · 观点态度类",
    back: "**think** → argue / claim / maintain / contend\n**believe** → be convinced that / hold the view that\n**important** → crucial / vital / essential / play a pivotal role\n**improve** → enhance / boost / upgrade / refine\n**reduce** → cut / curb / alleviate / mitigate" },
  { id: "syn-4", cat: "syn", front: "判断题 TRUE/FALSE/NOT GIVEN 快速判定",
    back: "**TRUE**：题目 = 原文同义改写（词变意不变）\n**FALSE**：题目与原文意思**相反**或不相容\n**NOT GIVEN**：原文完全**未提及**该比较/原因/结果\n技巧：FALSE 常出现在极端词（all/never/only）与原文部分限定（some/may）冲突处；找不到定位词对应信息 → 先选 NOT GIVEN" },

  /* ---- 听力信号词 ---- */
  { id: "sig-1", cat: "sig", front: "转折信号 · 答案常在 but 后面",
    back: "**however / but / actually / nevertheless / on the contrary**\n听力出题铁律：前面是干扰信息，转折后才是正确答案。\n例：The rent was advertised at 450, **but** we've reduced it to 420 → 填 420" },
  { id: "sig-2", cat: "sig", front: "修正信号 · 说话人自我纠正",
    back: "**sorry / actually / wait / I mean / rather than**\n例：Let's meet on the **tenth** — sorry, no, the **eleventh** → 填 eleventh\n口试与笔试通用原则：**后说的信息覆盖先说的信息**。" },
  { id: "sig-3", cat: "sig", front: "顺序与举例信号",
    back: "顺序：**first / then / after that / finally**（流程与方位题路标）\n举例：**for instance / such as / namely**（前后常互为同义替换）\n强调：**the key point is / above all / particularly**（紧接答案）" },
  { id: "sig-4", cat: "sig", front: "数字与日期捕捉要点",
    back: "十六 vs 六十：**fifteen/50** 用重音区分（FIFteen vs FIFty）\n双写读法：double 7 = 77；0 读作 **oh / zero / nil**\n日期：读 the **fifteenth** of September → 填 15(th)；月份常考 September/February 拼写\n价格：£4.50 读 four pounds fifty → 填 **4.50** 不是 450" },

  /* ---- 写作连接与句型 ---- */
  { id: "wlc-1", cat: "wlc", front: "高分开头改写三式",
    back: "① 同义替换：Some people think → It is argued that / A commonly held view is that\n② 换主语：People should... → There is a growing tendency for people to...\n③ 背景句切入：With the rapid development of...（谨慎使用，忌套话堆砌）\n注意：开头段必须给出明确立场，不背模板句。" },
  { id: "wlc-2", cat: "wlc", front: "让步与反驳句式（7 分必备）",
    back: "**Admittedly / Granted / While it is true that**..., ...\n**It would be simplistic to argue that**...\n**Critics point out that**...; **however**, ...\n**This argument overlooks the fact that**...\n例：Admittedly, free education would strain public budgets; however, the long-term returns in tax revenue outweigh the initial cost." },
  { id: "wlc-3", cat: "wlc", front: "图表题动词选择",
    back: "上升：surge / climb / edge up（平稳微升）\n下降：plummet / dip / decline steadily\n持平：remain stable at / plateau at\n波动：fluctuate between A and B\n倍数：double / triple / account for a threefold increase\n切忌：动态图误用比较级趋势词；静态图误用 increase。" },
  { id: "wlc-4", cat: "wlc", front: "结论段两种安全写法",
    back: "① 重申立场式：In conclusion, despite the merits of..., I am convinced that...\n② 条件收束式：Whether technology serves or stifle creativity **depends on** how it is used.\n禁忌：结论段引入全新论点；用 Firstly/Secondly 结尾显得机械；超过 3 句。" },

  /* ---- 口语地道表达 ---- */
  { id: "spk-1", cat: "spk", front: "争取思考时间的自然填充",
    back: "**That's an interesting question.**\n**Well, let me think...**\n**Off the top of my head, I'd say...**\n**I haven't really thought about it before, but...**\n避免：嗯嗯啊啊的中文语气词；背诵腔的 To be honest 开头每题都用。" },
  { id: "spk-2", cat: "spk", front: "Part 2 独白万能叙事框架",
    back: "**背景**：I'd like to talk about..., which happened...\n**细节**：What made it special was that...\n**感受**：I was really struck by... / It left a deep impression on me.\n**影响**：Looking back, it taught me that...\n四句框架覆盖 cue card 四个提示点，不怕说满 2 分钟。" },
  { id: "spk-3", cat: "spk", front: "提升词汇分的替换升级",
    back: "good → **beneficial / rewarding / worthwhile**\nbad → **detrimental / off-putting**\nvery important → **pivotal / paramount**\na lot of → **a great deal of / no end of**\nlike → **be really into / have a soft spot for**\n加分原则：用对 1 个高分词胜过堆 10 个难词。" },
  { id: "spk-4", cat: "spk", front: "流利度急救 · 说错怎么办",
    back: "说错单词：**or rather, ...**（I went there last Monday — or rather, Tuesday.）\n换说法：**What I mean is...** / **Let me put it another way.**\n忘词：**I can't think of the exact word, but it's something like...**\n原则：绝不长时间沉默；自然纠正比停顿扣分少得多。" },

  /* ---- 题型技巧 ---- */
  { id: "tec-1", cat: "tec", front: "填空题审题三查",
    back: "一查**字数**：NO MORE THAN TWO WORDS → 超字数直接 0 分\n二查**词性**：空前是冠词/动词可预判名词\n三查**限定**：carefully read 只剩 read 不得分\n技巧：空格前后词是定位词，答案常在原词附近出现。" },
  { id: "tec-2", cat: "tec", front: "段落信息匹配题流程",
    back: "1. 先读题干划定位词，**不读选项原文**（NB 选项可能多于题目）\n2. 通读段落首末句抓主旨\n3. 已确定答案的段落划掉，缩小范围\n4. 剩余难题用排除法\n注意：此题型**顺序打乱**，别用第 1 题答案在第 2 段找。" },
  { id: "tec-3", cat: "tec", front: "听力审题预判（播放前 30 秒）",
    back: "1. 划出题干关键词（大写/数字/地名优先）\n2. 预判答案类型：人名？价格？时间？\n3. 相邻两题距离远 → 中间必有干扰信息\n4. 选择题先读题干再扫选项，**别试图记住所有选项**" },
  { id: "tec-4", cat: "tec", front: "口语 Part 2 笔记法",
    back: "1 分钟准备期：按 cue card 四点各写 1-2 个**关键词**（不写整句）\n优先写：具体名词（人名/地点/数字）让故事可展开\n时间分配：四点各约 25 秒，最后一点多留 10 秒讲感受\n怕说满：多讲一个 small detail 或 small comparison（It wasn't as... as I expected）。" },

  /* ---- 易错陷阱 ---- */
  { id: "trap-1", cat: "trap", front: "判断题三大高频误判",
    back: "① 原文说 **some**，题目说 **all** → FALSE（范围扩大）\n② 原文说 **may reduce**，题目说 **reduces** → TRUE（情态不改事实方向）\n③ 原文提到 A 和 B，题目比较谁更大 → 原文没比较 → NOT GIVEN\n铁律：判断的是**题目陈述**，不是常识。" },
  { id: "trap-2", cat: "trap", front: "听力填空拼写扣分点",
    back: "必须正确拼写：accommodation / February / Wednesday / restaurant / government\n复数陷阱：听到 **books** 写 book 不得分\n大小写：专有名词大写，句首大写，其余小写均可\n字数：NO MORE THAN TWO WORDS 时，a + 名词算三个词（含 a）→ 视为超字数" },
  { id: "trap-3", cat: "trap", front: "写作审题扣分重灾区",
    back: "① Discuss both views 只写一方 → TR 直接掉档\n② Do advantages outweigh disadvantages 只写 advantage → 偏题\n③ Task 1 写成原因分析（图表题不解释原因）\n④ 字数不足 250/150 → 词汇语法再好也压分\n⑤ 结论段 first time 表态 → 全文立场不清" },
  { id: "trap-4", cat: "trap", front: "口语考场隐形扣分",
    back: "① 背诵痕迹：Part 2 语速突然变快、眼神上飘 → 考官直接压流利度\n② Part 3 回答过短（一句结束）→ 扩展法：观点 + 原因 + 例子 + 对比\n③ 纠结语法频繁自我打断 → 优先流利，错可自我纠正但别停\n④ 问 Do you like...? 答 Yes. 就结束 → 至少补一个 why" }
];
