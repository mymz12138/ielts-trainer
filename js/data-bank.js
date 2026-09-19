/* ==========================================================
   data-bank.js · 分级真题训练题库
   听力（TTS 朗读）· 阅读 · 写作 · 口语
   level: 1 基础(5.0-5.5) / 2 进阶(6.0-6.5) / 3 冲刺(7.0+)
   ========================================================== */

const SUBJECT_META = {
  listening: { name: "听力 Listening", icon: "headphone", color: "#4a6f8a", desc: "TTS 朗读真题场景，练 Section 1-4 抓词与定位" },
  reading:   { name: "阅读 Reading",  icon: "book",      color: "#3e6b57", desc: "判断 / 选择 / 段落匹配三大题型分阶精练" },
  writing:   { name: "写作 Writing",  icon: "pen",       color: "#b07f22", desc: "Task 1 图表 + Task 2 议论文，对照要点与范文自评" },
  speaking:  { name: "口语 Speaking", icon: "mic",       color: "#b85c4b", desc: "Part 1-2-3 题卡，限时准备，对照高分表达" }
};

const LEVEL_META = {
  1: { name: "基础", band: "目标 5.0 - 5.5", cls: "lv1" },
  2: { name: "进阶", band: "目标 6.0 - 6.5", cls: "lv2" },
  3: { name: "冲刺", band: "目标 7.0 +",   cls: "lv3" }
};

const BANK = {

/* ===================== 听力 ===================== */
listening: [
  {
    id: "lis-1", level: 1, section: "Part 1 · 场景对话", rate: 0.82,
    title: "租房咨询 Renting a Flat",
    intro: "你将听到一段学生打给房屋中介的电话。请边听边作答。本段可重复播放，语速较慢。",
    transcript: "AGENT: Good morning, City Homes Agency. How can I help you? | STUDENT: Hi, I am calling about the two-bedroom flat advertised on your website. | AGENT: Ah yes, the flat on Northfield Road. It was advertised at four hundred and fifty pounds a month, but we have just reduced it to four hundred and twenty, as the landlord wants someone to move in quickly. | STUDENT: That sounds good. When is it available? | AGENT: The current tenants are leaving on the tenth of September, so the flat will be ready from the fifteenth. | STUDENT: Perfect, I need somewhere before the new term starts. Could you tell me about the bills? | AGENT: The rent includes the water bill, but you will have to pay for gas and electricity separately. | STUDENT: I see. And what do I need to pay before moving in? | AGENT: You will need to pay one month's rent in advance, plus a deposit of the same amount. That is standard practice, I am afraid. | STUDENT: All right. Is the flat furnished? | AGENT: Yes, it comes with a bed, a wardrobe, a desk and a small sofa. | STUDENT: Great. I would like to view it this weekend. | AGENT: Of course. How about Saturday morning at ten? | STUDENT: Saturday at ten works for me. Thank you very much. | AGENT: My pleasure. See you then.",
    questions: [
      { type: "blank", stem: "1. 每月租金：£ ______", accept: ["420", "four hundred and twenty", "four twenty"], explain: "原文先说广告价 £450，随后更正为 reduced it to £420，注意干扰信息。" },
      { type: "blank", stem: "2. 公寓名称：______ Road", accept: ["northfield"], explain: "the flat on Northfield Road，地址信息通常出现在开头。" },
      { type: "blank", stem: "3. 可入住日期：9 月 ______ 日", accept: ["15", "15th", "fifteenth"], explain: "前租客 10 号搬走，房子从 15 号起可入住，注意不是 10 号。" },
      { type: "blank", stem: "4. 房租含水费，租客需另付燃气和 ______ 费。", accept: ["electricity", "electric", "power"], explain: "you will have to pay for gas and electricity separately。" },
      { type: "choice", stem: "5. 入住前租客需要支付什么？", options: ["一个月房租", "一个月房租加等额押金", "半个月房租"], answer: 1, explain: "one month's rent in advance, plus a deposit of the same amount。" }
    ]
  },
  {
    id: "lis-2", level: 2, section: "Part 2 · 独白介绍", rate: 0.92,
    title: "图书馆入馆介绍 Library Tour",
    intro: "你将听到一段图书馆新馆介绍独白。请边听边作答。",
    transcript: "Welcome to the New Central Library. Before you start borrowing books, let me briefly explain how the building is organised and how our system works. | First, opening hours. We are open from eight in the morning until nine in the evening on weekdays, and from ten to six on Saturdays. The library is closed on Sundays. | As for the floors, the reception desk and the cafe are on the ground floor. The first floor holds the humanities collection, while science periodicals are kept on the second floor. If you need absolute silence, the individual study rooms on the third floor are available on a first-come, first-served basis. | To borrow books, you must first become a member. Please bring your student card together with proof of enrolment to the reception. Each member may borrow up to six books at a time for a loan period of three weeks. Books can be renewed twice online, but overdue items cannot be renewed by phone. | Finally, a small reminder: eating is only allowed in the cafe area, and please switch your phone to silent mode in all reading areas. Enjoy your time here.",
    questions: [
      { type: "blank", stem: "1. 工作日开馆时间：早 ______ 点", accept: ["8", "eight", "8:00", "8 am"], explain: "open from eight in the morning until nine in the evening on weekdays。" },
      { type: "blank", stem: "2. 每人最多可借 ______ 本书。", accept: ["6", "six"], explain: "Each member may borrow up to six books at a time。" },
      { type: "blank", stem: "3. 借书期限为 ______ 周。", accept: ["3", "three"], explain: "a loan period of three weeks，可线上续借两次。" },
      { type: "choice", stem: "4. 科学类期刊收藏在几楼？", options: ["一层（humanities）", "二层", "三层"], answer: 1, explain: "science periodicals are kept on the second floor；三层是无声自习室。" },
      { type: "choice", stem: "5. 办理借书证需要携带什么？", options: ["在读证明", "护照", "银行卡"], answer: 0, explain: "student card together with proof of enrolment，注意不是护照。" }
    ]
  },
  {
    id: "lis-3", level: 3, section: "Part 3 · 学术讨论", rate: 1.0,
    title: "论文选题讨论 Choosing a Research Topic",
    intro: "你将听到导师与两名学生讨论小组研究课题。语速接近真实考试，注意观点转折与让步。",
    transcript: "TUTOR: So, Jack, Maria, you are here to discuss your research project. Where have you got to? | JACK: We started with air pollution in cities, but the data collection turned out to be too difficult, so we decided to switch to something more manageable. | MARIA: Yes, now we are thinking about how take-away packaging affects student behaviour on campus. | TUTOR: That is a workable topic, but it is not new. Hundreds of studies have already covered plastic waste. What angle could you add? | MARIA: Well, most research looks at the packaging itself. We want to find out whether students would actually pay more for environmentally friendly alternatives. | TUTOR: Good. That gives you an original angle. How will you collect data? | JACK: We planned to interview students in the canteen, but Maria thinks a questionnaire emailed to all students would give us a larger sample. | TUTOR: And what do you think, Maria? | MARIA: Interviews give richer answers, but with three thousand students, we need breadth before depth. We could interview a small group later if the questionnaire results are unclear. | TUTOR: A sensible compromise. One more thing: watch your timing. The deadline for the first draft is the twenty-second, and you have only four weeks left. | JACK: That is tight, but if we finalise the questionnaire this week, we can send it out on Monday and start analysing the results two weeks later. | TUTOR: Exactly. Email me the questionnaire before Friday and I will give you feedback.",
    questions: [
      { type: "choice", stem: "1. 两人为什么放弃了最初的研究课题？", options: ["导师不批准", "数据收集太难", "课题缺乏新意"], answer: 1, explain: "the data collection turned out to be too difficult，注意不是导师否决。" },
      { type: "choice", stem: "2. 他们最终的研究角度是什么？", options: ["外卖包装的材质成分", "学生是否愿意为环保包装多付钱", "塑料垃圾的回收流程"], answer: 1, explain: "whether students would actually pay more for environmentally friendly alternatives。" },
      { type: "choice", stem: "3. 导师认为该课题的最大优点是？", options: ["数据容易收集", "成本很低", "有原创角度"], answer: 2, explain: "That gives you an original angle，前一句先指出话题不新，注意转折。" },
      { type: "choice", stem: "4. Maria 主张用问卷而不用访谈的主要原因？", options: ["问卷更省时间", "样本量更大", "访谈问题太敏感"], answer: 1, explain: "a questionnaire would give us a larger sample；访谈更深入但样本小。" },
      { type: "choice", stem: "5. 初稿截止日期距今还有多久？", options: ["两周", "四周", "两个月"], answer: 1, explain: "The deadline is the twenty-second, and you have only four weeks left。" }
    ]
  }
],

/* ===================== 阅读 ===================== */
reading: [
  {
    id: "read-1", level: 1,
    title: "The Origins of Tea 茶的起源",
    intro: "判断题（TRUE / FALSE / NOT GIVEN）与选择题各 3 题。注意：NOT GIVEN 意为原文未提及。",
    passage: [
      "Tea is so much a part of everyday life in many countries that it is easy to forget it was once a rare medicine. According to Chinese legend, the emperor Shennong discovered tea in 2737 BC when leaves from a wild tree blew into his pot of boiling water. Early on, tea was valued mainly for its healing powers: it was chewed, ground into paste and applied to aches, or boiled and drunk as a remedy against tiredness. Only during the Tang dynasty, roughly between the seventh and tenth centuries, did tea drinking become a daily pleasure rather than a medical treatment.",
      "Tea reached Europe in the seventeenth century, carried by Dutch merchants. It arrived in Britain a few decades later and was initially so expensive that only wealthy families could afford it. The drink slowly worked its way down the social ladder, and by the eighteenth century tea had become the national drink of Britain. The tax on imported tea, however, was so high that a huge smuggling trade developed. When the government slashed import duties in the nineteenth century, prices dropped and even the poorest households could finally enjoy a cup.",
      "Chemically, tea is a mild stimulant. A cup of black tea contains roughly half the caffeine of a cup of coffee, and green tea contains slightly less than black. This gentler lift is one reason many people prefer tea in the afternoon: it refreshes without the jittery effect that strong coffee can bring."
    ],
    questions: [
      { type: "tfng", stem: "1. 在成为饮品之前，茶最初是被当作药物使用的。", answer: "TRUE", explain: "Early on, tea was valued mainly for its healing powers，后文才说 Tang dynasty 成为日常饮品。" },
      { type: "tfng", stem: "2. 荷兰商人将茶叶带到了欧洲。", answer: "TRUE", explain: "Tea reached Europe in the seventeenth century, carried by Dutch merchants。" },
      { type: "tfng", stem: "3. 绿茶的咖啡因含量高于咖啡。", answer: "FALSE", explain: "咖啡因约为咖啡的一半，绿茶又略低于红茶，因此远低于咖啡。" },
      { type: "tfng", stem: "4. 葡萄牙人是第一批喝到茶的欧洲人。", answer: "NOT GIVEN", explain: "原文只提到 Dutch merchants 与英国，未提及葡萄牙人。" },
      { type: "choice", stem: "5. 根据文章，茶在中国最初主要被用作 ______。", options: ["日常饮料", "社交礼物", "药物"], answer: 2, explain: "drunk as a remedy against tiredness，remedy 意为药物、疗法。" },
      { type: "choice", stem: "6. 19 世纪是什么让普通英国人也买得起茶？", options: ["本土茶园的建立", "进口税大幅削减", "走私贸易的发展"], answer: 1, explain: "slashed import duties → prices dropped；走私是高税的后果而非降价原因。" }
    ]
  },
  {
    id: "read-2", level: 2,
    title: "Urban Heat Islands 城市热岛效应",
    intro: "进阶难度长文，判断题与选择题各 3 题。注意定位词与同义替换。",
    passage: [
      "On a hot summer day, the air above a large city can be several degrees warmer than the air over the countryside just a few kilometres away. Scientists call this phenomenon the urban heat island effect. The difference is usually modest at midday but becomes dramatic after sunset: while rural areas cool quickly once the sun goes down, the mass of concrete and brick in a city releases the heat it has stored during the day, keeping urban night-time temperatures stubbornly high.",
      "The causes are easy to list but hard to remove. Dark surfaces such as asphalt roads and tar roofs absorb enormous amounts of solar energy; buildings packed tightly together block the wind that would otherwise carry heat away; and the waste heat released by vehicles, factories and air-conditioning systems adds a further artificial boost. Perhaps most importantly, cities have far fewer plants and ponds than the landscapes they replaced, so the natural cooling provided by evaporation is largely lost.",
      "The consequences are more serious than mere discomfort. Higher temperatures increase demand for air-conditioning, which in turn burns more electricity and releases more waste heat, creating a feedback loop. Heat waves that would be uncomfortable in the countryside become deadly in the city, particularly for elderly residents living on the upper floors of poorly insulated apartment blocks.",
      "City planners are now experimenting with countermeasures. Light-coloured or reflective roofing can cut surface temperatures dramatically, and planting street trees cools the air both by shading pavement and by returning moisture to the atmosphere. A few pioneering cities have even passed regulations requiring new commercial buildings to include green roofs, although critics point out that installation costs remain high and that such laws, so far, cover only a fraction of the urban roofscape."
    ],
    questions: [
      { type: "tfng", stem: "1. 大城市上空的气温通常比几公里外的乡村高。", answer: "TRUE", explain: "首句直接给出：several degrees warmer than the air over the countryside。" },
      { type: "tfng", stem: "2. 城乡昼夜温差在夜间比白天更小。", answer: "FALSE", explain: "原文说 The difference is usually modest at midday but becomes dramatic after sunset，即夜间差异更大。" },
      { type: "tfng", stem: "3. 深色屋顶比浅色屋顶吸收更多热量。", answer: "TRUE", explain: "Dark surfaces absorb enormous amounts of solar energy；对策部分也印证浅色屋顶可降温。" },
      { type: "tfng", stem: "4. 目前所有城市都已立法强制安装绿色屋顶。", answer: "FALSE", explain: "只有 A few pioneering cities 通过了相关法规，并非所有城市。" },
      { type: "choice", stem: "5. 下列哪一项不属于文中提到的热岛成因？", options: ["密集建筑阻挡风力", "车辆与空调的废热", "城市上空的温室气体"], answer: 2, explain: "文中列了深色路面、建筑挡风、设备废热与植被减少，未提温室气体。" },
      { type: "choice", stem: "6. 作者对绿色屋顶法规的态度可以概括为 ______。", options: ["坚定支持", "客观并指出局限", "坚决反对"], answer: 1, explain: "既肯定了试点立法，又转述批评者意见（成本高、覆盖面小），属客观平衡表述。" }
    ]
  },
  {
    id: "read-3", level: 3,
    title: "The Science of Sleep 睡眠的科学",
    intro: "冲刺难度：段落信息匹配（A-E）与选择题各 3 题。匹配题需通读全篇，警惕同义改写。",
    passage: [
      "A. For most of the twentieth century, sleep was viewed as a passive shutdown of the brain. Modern imaging technology has demolished that picture. During a single night, the sleeping brain cycles through several stages, each with its own electrical signature and purpose. Far from switching off, certain regions of a sleeping brain are busier than they are while we are awake.",
      "B. One of those busy regions is the hippocampus, a small structure that acts as the brain's temporary filing system. Experiments by Matthew Wilson at MIT showed that rats running mazes replayed the day's routes in their sleep, neuron by neuron. Follow-up studies in humans have found the same replay effect, and it is now widely believed that this nightly re-run is when fragile new memories are transferred into long-term storage. Students who sleep after revising consistently outperform those who stay up to cram.",
      "C. Sleep also performs a cleaning function. In 2013, researchers discovered the glymphatic system, a network of channels that opens wide during deep sleep and flushes waste products out of the brain, including the beta-amyloid proteins associated with Alzheimer's disease. This discovery suggests that chronic sleep shortage may raise the long-term risk of dementia, a possibility that public health authorities are only beginning to take seriously.",
      "D. The practical implications extend to safety. Analyses of industrial accidents show a clear peak in the early hours of the morning, when the body's circadian rhythm dips to its lowest point. After seventeen hours awake, performance on reaction-time tests resembles that of a person at the legal alcohol limit for driving. Some airlines and hospitals now schedule staff using fatigue models rather than fixed shifts, and the early evidence points to fewer errors.",
      "E. Yet modern life pushes in the opposite direction. Artificial light, late-night screens and flexible working hours have all shortened average sleep, and surveys in several countries report that a third of adults regularly get less than the recommended seven hours. Researchers warn that treating sleep as a luxury rather than a biological necessity may prove to be one of the costliest mistakes of the modern age."
    ],
    questions: [
      { type: "match", stem: "1. 哪一段提到对工业事故数据的研究？", options: ["A", "B", "C", "D", "E"], answer: 3, explain: "D 段：Analyses of industrial accidents show a clear peak in the early hours。" },
      { type: "match", stem: "2. 哪一段描述了大脑在睡眠中清理废物的机制？", options: ["A", "B", "C", "D", "E"], answer: 2, explain: "C 段：glymphatic system 在深睡时冲洗废物，包括与阿尔茨海默病相关的蛋白。" },
      { type: "match", stem: "3. 哪一段提到现代生活方式缩短了人们的平均睡眠时间？", options: ["A", "B", "C", "D", "E"], answer: 4, explain: "E 段：人造光、夜间屏幕与弹性工作缩短了睡眠，三分之一成年人不足 7 小时。" },
      { type: "choice", stem: "4. Wilson 的迷宫实验证明了什么？", options: ["睡眠分为多个阶段", "睡眠中会回放白天的经历", "缺睡影响反应速度"], answer: 1, explain: "B 段：老鼠在睡眠中逐个神经元回放迷宫路线，人类也有同样现象。" },
      { type: "choice", stem: "5. 连续清醒 17 小时后的测试表现相当于 ______。", options: ["熬夜复习的学生", "达到酒驾法定限度的人", "一名疲惫的夜班护士"], answer: 1, explain: "D 段：performance resembles that of a person at the legal alcohol limit for driving。" },
      { type: "choice", stem: "6. 作者在 E 段的主要意图是 ______。", options: ["批评企业强制加班", "警告忽视睡眠的代价", "呼吁减少屏幕时间"], answer: 1, explain: "结尾 treating sleep as a luxury may prove one of the costliest mistakes 点明主旨。" }
    ]
  }
],

/* ===================== 写作 ===================== */
writing: [
  {
    id: "wri-1", level: 1, task: "Task 2", title: "议论文 · 入学年龄",
    prompt: "Some people believe that children should begin formal schooling at as early an age as possible, while others think young children should spend more time playing at home. Discuss both views and give your own opinion.",
    minWords: 250, time: 40,
    points: [
      "题型为 Discuss both views + opinion，两方观点都必须展开，且个人立场要贯穿全文",
      "观点 A 论据：早期智力开发、语言黄金期、缩小家庭背景差距",
      "观点 B 论据：游戏是幼儿学习的主要方式、过早学业压力损害兴趣与心理健康",
      "结论须明确表态（可倾向任一方或提出折中，如：可早入学但以游戏化教学为主）"
    ],
    structure: [
      "开头：改写题目 + 亮明立场",
      "主体 1：一方观点 + 2 个论据或例子",
      "主体 2：另一方观点 + 2 个论据或例子",
      "结论：重申立场，不引入新论点"
    ],
    vocab: ["formal schooling 正规学校教育", "cognitive development 认知发展", "a critical period for language acquisition 语言习得关键期", "peer interaction 同伴交往", "academic pressure 学业压力", "play-based learning 游戏化学习", "holistic development 全面发展"],
    sample: "Opinions differ on when children should enter formal education. While some argue that an early start gives children an academic advantage, others believe that early childhood is better spent playing at home. In my view, school can begin early provided that teaching remains playful. / Those who support early schooling point to the fact that the first few years of life are a critical period for language acquisition and cognitive development. In a structured classroom, children are exposed to letters, numbers and, crucially, to peers, which builds social skills that home routines rarely provide. Early schooling may also narrow the gap between children from different family backgrounds, since not every household can offer books, toys and stimulation. / On the other hand, opponents rightly note that play is how young children actually learn. A four-year-old who spends the day building blocks or role-playing is developing imagination, negotiation and problem-solving skills; forcing such a child into formal lessons risks boredom and anxiety, and may sour their attitude towards learning for years. / In conclusion, both positions have merit, and the answer depends less on age than on method. I believe children should start school at the usual age of five or six, but that classrooms for the youngest pupils should be built around play-based learning rather than formal instruction.",
    sampleNote: "范文约 250 词，两个主体段分别让步展开，结论给出条件式立场（可早入学但需游戏化）。"
  },
  {
    id: "wri-2", level: 2, task: "Task 2", title: "议论文 · 大学免费",
    prompt: "Some people think university education should be free for everyone, regardless of their family income. Others believe students should pay for their own degree. To what extent do you agree or disagree?",
    minWords: 250, time: 40,
    points: [
      "题型为 To what extent do you agree or disagree，立场必须清晰且前后一致",
      "免费论据：教育是权利而非奢侈品、经济障碍伤害社会流动性、毕业生最终以税收回馈社会",
      "收费论据：财政不可持续、免费补贴了本来付得起的家庭、学费促使学生认真选择专业",
      "高分写法：完全同意或部分同意（如：对低收入家庭免费）均可，但需论证充分"
    ],
    structure: [
      "开头：改写 + 明确表态（agree / partially agree / disagree）",
      "主体 1：核心论点 + 展开论证",
      "主体 2：第二论点（可让步反驳对方）",
      "结论：重申立场并升华"
    ],
    vocab: ["higher education 高等教育", "social mobility 社会流动性", "a lifetime of earnings 一生的收入", "public funding 公共资金", "graduate tax 毕业生税", "means-tested 按经济状况审查的", "the burden on taxpayers 纳税人负担"],
    sample: "Whether universities should charge tuition fees is one of the most divisive questions in education policy. I partially agree that degrees should be free, but only for students from low-income families, while those who can afford to pay should continue to do so. / The case for free education rests on fairness. A talented student from a poor household should not be priced out of medical school simply because of the family they were born into, and societies lose enormous potential when ability rather than money determines who becomes a doctor or an engineer. It is also true that graduates pay back into the system indirectly: they earn more, so they pay more tax over a lifetime of earnings. / However, making university free for everyone, including the wealthy, is difficult to defend. The money would come from general taxation, meaning cleaners and nurses would help fund degrees for students whose parents own several properties. Worse, when education costs nothing, universities lose their incentive to compete for students, and lecture halls fill with people who are there because it is free rather than because they need a degree. Means-tested support, such as scholarships and subsidised loans, targets the money precisely where it changes lives. / In conclusion, I disagree with free university education for all, but strongly support it for those whom fees would genuinely exclude. Public money is limited, and it should open doors rather than subsidise privilege.",
    sampleNote: "范文约 260 词，采用部分同意立场：主体段先立后破，结论给出政策建议。"
  },
  {
    id: "wri-3", level: 3, task: "Task 2", title: "议论文 · 科技与创造力",
    prompt: "Some people believe that modern technology is making people less creative, while others argue that it actually gives us more opportunities to be creative. Discuss both views and give your own opinion.",
    minWords: 250, time: 40,
    points: [
      "Discuss both views + opinion；冲刺级要求论证层次更深（机制而非仅举例）",
      "削弱论据：算法推荐造成信息茧房、模板化工具取代原创、被动刷屏取代主动创造",
      "增强论据：创作门槛降低（剪辑/编程/设计工具）、网络协作与反馈加速迭代、AI 承担重复劳动让人聚焦构思",
      "冲刺级语言目标：让步句式（Admittedly... However...）、抽象名词化（the proliferation of...）"
    ],
    structure: [
      "开头：背景句 + 改写 + 立场",
      "主体 1： technology 削弱创造力的机制 + 例证",
      "主体 2：增强创造力的机制 + 例证，并反驳主体 1",
      "结论：给出条件式立场（取决于使用方式）"
    ],
    vocab: ["stifle creativity 扼杀创造力", "algorithmic feeds 算法推送", "echo chamber 信息茧房", "lower the barriers to creation 降低创作门槛", "democratise access to tools 使工具大众化", "passive consumption 被动消费", "iterative feedback 即时反馈"],
    sample: "Technology now mediates almost every creative act, from writing a report to producing a song. While some claim this dependence is dulling our imagination, I would argue that technology has, on balance, expanded creative opportunity, although the way we use it determines the outcome. / The pessimistic view is not without foundation. Recommendation algorithms feed users an endless stream of similar content, locking them inside echo chambers where they consume rather than create. Ready-made templates, meanwhile, nudge millions of presentations and videos towards the same polished sameness, and a scrolling habit built on short clips leaves little room for the slow thinking from which original ideas grow. / Yet the deeper truth is that these tools have demolished barriers that once excluded ordinary people. A teenager with free editing software can produce films that would once have required a studio; an amateur musician can distribute a song globally in minutes; and online communities provide iterative feedback that accelerates learning at a pace no previous generation enjoyed. When artificial intelligence takes over routine drafting, human effort is pushed up the value chain towards conception, judgement and taste, which is precisely where creativity lives. The problem, in other words, is not the technology but passive consumption of it. / In conclusion, I believe technology multiplies creative possibilities for those who engage actively, while quietly flattening those who surrender their attention to it. Digital literacy, taught early, is the best guarantee that these tools remain amplifiers of imagination rather than substitutes for it.",
    sampleNote: "范文约 280 词，冲刺级：名词化表达、让步反驳结构、条件式结论。"
  },
  {
    id: "wri-4", level: 1, task: "Task 1", title: "图表题 · 静态柱状图",
    prompt: "The chart below shows the main reasons why students in two age groups (18-24 and 25-35) chose to study at university in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. / 图表数据（柱状图）：18-24 岁组 — 兴趣 45%、职业发展 30%、父母期望 15%、其他 10%；25-35 岁组 — 职业发展 52%、兴趣 25%、父母期望 5%、其他 18%。",
    minWords: 150, time: 20,
    points: [
      "静态图（无时间变化）只做比较，不写 increase/decrease 等趋势词",
      "开头改写：The chart compares / illustrates why students in two age groups chose to study at university",
      "概述句（Overview）必须写：最显著特征是两组的动机排序几乎相反",
      "数据选取：写最大值、倍数关系与对比（45% vs 25%），不必罗列每个数字"
    ],
    structure: [
      "第 1 段：改写题目（1-2 句）",
      "第 2 段：Overview，概括最显著特征（不写具体数字）",
      "第 3 段：详述 18-24 岁组主要数据",
      "第 4 段：详述 25-35 岁组并对比"
    ],
    vocab: ["account for 占（比例）", "by far the most significant reason 最主要的原因", "twice as likely to 可能性是…两倍", "in contrast 相比之下", "the reverse is true for... …则相反", "career progression 职业发展", "parental expectations 父母期望"],
    sample: "The bar chart compares the motivations of two age groups of university students in 2025, in terms of four factors: interest, career development, parental expectations and other reasons. / Overall, the two groups show almost opposite patterns. Younger students study mainly out of personal interest, whereas for mature students career development is the dominant motive. Parental pressure matters least for both groups. / In the 18-24 group, interest is by far the most significant reason, accounting for 45% of responses, followed by career development at 30%. Notably, 15% of this younger group say they chose university because of their parents' expectations, a figure three times higher than that of the older group. / The picture for 25-35-year-olds is strikingly different. More than half of them (52%) enrol to advance their careers, while only a quarter cite interest, which was the leading reason for their younger counterparts. Their sense of parental pressure has all but disappeared at 5%, and this group registers the highest proportion of other reasons, at 18%. / In summary, motivation appears to shift from passion to pragmatism as students get older.",
    sampleNote: "范文约 175 词：Overview 点明对比结构，数据段有取舍（倍数、对比），结尾一句话总结。"
  },
  {
    id: "wri-5", level: 2, task: "Task 1", title: "图表题 · 动态线图",
    prompt: "The graph below shows the average daily time spent on smartphones, in hours, by people in three age groups between 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. / 图表数据（线图）：18-25 岁 — 2015: 2.0h → 2020: 3.5h → 2025: 5.0h；26-45 岁 — 2015: 1.5h → 2020: 2.6h → 2025: 3.4h；46 岁以上 — 2015: 0.6h → 2020: 1.4h → 2025: 2.2h。",
    minWords: 150, time: 20,
    points: [
      "动态图（有时间跨度）优先写趋势：rose / climbed / doubled / the fastest growth",
      "Overview 要覆盖两个维度：所有人的使用都在上升； youngest 组时长与增速均最高",
      "冲刺 7 分关键：把三组数据织成对比（差距扩大），而非三段孤立的流水账",
      "注意倍数表达：more than doubled / three times the 2015 figure"
    ],
    structure: [
      "第 1 段：改写题目",
      "第 2 段：Overview（趋势 + 差距）",
      "第 3 段：详述 youngest 组与 middle 组",
      "第 4 段：详述 oldest 组并点明差距变化"
    ],
    vocab: ["increase steadily 稳步上升", "the sharpest rise 增幅最大", "more than doubled 翻了一倍多", "reach a high of 5 hours 达到 5 小时的高点", "narrow / widen the gap 缩小/扩大差距", "over the period shown 在所示时期内"],
    sample: "The line graph illustrates how long people in three age brackets spent on their smartphones each day, on average, between 2015 and 2025. / Overall, smartphone use increased across all three groups over the period shown, and the youngest users not only spent the most time on their devices but also recorded the fastest growth, widening the gap between generations. / Young adults aged 18-25 doubled their daily screen time from 2.0 hours in 2015 to 4.0 hours by 2020, and the figure continued climbing to 5.0 hours in 2025. Users aged 26-45 followed a similar but gentler path, rising from 1.5 hours to 3.4 hours over the decade, meaning the youngest group's usage overtook theirs by a widening margin each year. / The most dramatic relative change, however, belonged to the over-46 group. Although they remained the lightest users throughout, their average time almost quadrupled, from just 0.6 hours in 2015 to 2.2 hours in 2025. / In summary, while every age group grew more attached to its phone over the decade, adoption was steepest among the youngest, and even the oldest group more than tripled its usage.",
    sampleNote: "范文约 190 词：趋势动词丰富，突出相对变化与差距，避免逐点罗列。"
  },
  {
    id: "wri-6", level: 3, task: "Task 1", title: "流程图 · 再生纸生产",
    prompt: "The diagram below shows the process of recycling paper. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. / 流程描述：①废纸收集（居民与办公室投放回收箱）→ ②分类（按纸种与颜色分拣，剔除污染物）→ ③制浆（与水、化学剂混合打成纸浆）→ ④清洗与漂白 → ⑤抄纸（纸浆铺成薄层并压平烘干）→ ⑥成品纸卷出厂，可再次进入循环。",
    minWords: 150, time: 20,
    points: [
      "流程图时态一律用一般现在时 + 被动语态（is collected / is sorted / is pulped）",
      "开篇数清步骤总数（6 步），概述句写清起点（回收箱）与终点（成品纸卷）以及它是循环过程",
      "顺序连接词是得分重点：first / next / after that / subsequently / the final stage",
      "冲刺技巧：给关键步骤加目的状语（so that impurities can be removed）体现 7 分语法多样性"
    ],
    structure: [
      "第 1 段：改写题目 + 点明步骤数",
      "第 2 段：Overview：线性 6 步 + 循环特征",
      "第 3 段：前半流程（收集→分类→制浆）",
      "第 4 段：后半流程（清洗→抄纸→出厂循环）"
    ],
    vocab: ["be transported to 被运往", "be sorted by type and colour 按种类和颜色分拣", "be pulped 打成纸浆", "bleach 漂白", "be pressed and dried 被压平烘干", "the process then repeats 随后循环往复", "at the initial / final stage 在最初/最后阶段"],
    sample: "The diagram illustrates the six stages involved in recycling used paper, from initial collection to the production of new paper rolls. / Overall, the process is linear but cyclical: waste paper passes through six consecutive steps before emerging as fresh paper, which itself can eventually be recycled again. / At the initial stage, used paper is collected from households and offices, where people deposit it in dedicated recycling bins. The collected paper is then transported to a sorting facility, where it is separated by type and colour, and contaminants such as plastic or metal are removed. / Next, the sorted paper is mixed with water and chemicals and pulped into a thick slurry. The pulp is subsequently cleaned and bleached so that ink and impurities are stripped away, leaving a clean base material. / In the final stages, the pulp is spread into thin sheets, which are pressed flat and dried in heated rollers. The finished paper is wound into large rolls and dispatched to manufacturers, at which point the cycle can begin once more.",
    sampleNote: "范文约 165 词：全程被动语态 + 顺序连接词 + 目的状语，Overview 点出 cyclical 特征。"
  }
],

/* ===================== 口语 ===================== */
speaking: [
  {
    id: "spk-1", level: 1, part: "Part 1", title: "Home & Hometown 家与家乡",
    intro: "Part 1 为快问快答（每题 15-25 秒）。先自己口头作答，再对照范例与加分表达。",
    cues: [
      "Where are you from, and do you like living there?",
      "What kind of accommodation do you live in?",
      "What is your hometown famous for?",
      "Would you like to move to another city in the future?"
    ],
    prep: 0, talk: 0,
    phrases: ["I was born and raised in... 我在……出生长大", "a close-knit community 关系紧密的社区", "It has a laid-back pace of life. 生活节奏很悠闲", "high-rise apartment 高层公寓", "What I appreciate most about it is... 我最喜欢它的一点是", "I'm considering relocating to... 我在考虑搬到……"],
    sample: "Q1: I'm from Hangzhou, a city in eastern China famous for West Lake. I really enjoy living there because it balances modern city life with beautiful natural scenery. / Q2: I live in a high-rise apartment on the outskirts of the city with my parents. It's quite convenient — there's a subway station and a shopping mall within walking distance. / Q3: It's best known for West Lake and its tea culture. Whenever friends visit, I take them to the lakeside and to a tea village nearby. / Q4: Possibly. If I get a good job opportunity, I wouldn't mind relocating, but I'd still see my hometown as the place to settle down eventually.",
    followups: []
  },
  {
    id: "spk-2", level: 2, part: "Part 1", title: "Work, Study & Free Time 工作学习与休闲",
    intro: "Part 1 进阶：练习扩展答案（直接回答 + 1-2 句原因/例子，避免过短或跑题）。",
    cues: [
      "Do you work, or are you a student?",
      "What do you usually do in your free time?",
      "Do you prefer studying alone or with others? Why?",
      "Is your daily routine the same at weekends?"
    ],
    prep: 0, talk: 0,
    phrases: ["I'm currently in my third year, majoring in... 我目前大三，专业是……", "in my spare time 在空闲时间", "it helps me switch off 帮我放松大脑", "group study keeps me accountable 小组学习让我有约束力", "stick to the same routine 保持同样的作息", "I recharge by... 我通过……充电"],
    sample: "Q1: I'm currently a third-year student majoring in civil engineering. The workload is heavy, but I find the design courses genuinely interesting. / Q2: In my spare time I mostly play badminton and watch documentaries. Exercise helps me switch off after a long day of classes. / Q3: I prefer studying alone for memorisation-heavy subjects because I can set my own pace, but I join group study for problem sets — discussing tricky questions keeps me accountable and exposes me to different approaches. / Q4: Not exactly. On weekdays everything is scheduled around lectures, but weekends are much more flexible — I usually sleep in, catch up on assignments and meet friends in the afternoon.",
    followups: []
  },
  {
    id: "spk-3", level: 3, part: "Part 1", title: "Abstract Topics 抽象话题",
    intro: "冲刺级 Part 1：应对抽象问题（时间管理、习惯、记忆等），练习抽象话题具体化。",
    cues: [
      "Do you think it's important to have a daily routine?",
      "Are you good at remembering names and numbers?",
      "Do you prefer to plan things in advance or make decisions on the spot?",
      "How have your habits changed compared with five years ago?"
    ],
    prep: 0, talk: 0,
    phrases: ["a sense of structure and predictability 结构感与可预期性", "It's a double-edged sword. 这把双刃剑", "off the top of my head 毫无准备地（凭记忆）", "spur-of-the-moment decisions 即兴决定", "procrastinate on... 拖延……", "self-discipline 自律"],
    sample: "Q1: Generally yes. A routine gives my day a sense of structure and predictability, which lowers stress. That said, I think an overly rigid schedule makes life monotonous, so I try to leave some room for spontaneity. / Q2: Honestly, I'm better with faces than names. Numbers are even worse — I still need to double-check my own bank card number. I rely on my phone's notes app for anything important. / Q3: It's a bit of a double-edged sword. Planning in advance saves money and avoids last-minute panic, but some of my best experiences came from spur-of-the-moment decisions, like a road trip I joined on a whim last summer. / Q4: Quite a lot has changed. Five years ago I procrastinated constantly and stayed up past midnight; now I follow a stricter schedule and exercise regularly, mostly because university taught me how costly poor habits can be.",
    followups: []
  },
  {
    id: "spk-4", level: 1, part: "Part 2", title: "话题卡 · 帮助过你的人",
    intro: "Part 2：准备 1 分钟，陈述 1-2 分钟。笔记只写关键词，练习按 cue card 四点展开。",
    cues: [
      "Describe a person who has helped you a lot.",
      "You should say:",
      "— who this person is",
      "— how this person helped you",
      "— why the help was important",
      "— and explain how you felt about it"
    ],
    prep: 60, talk: 120,
    phrases: ["The person I'd like to talk about is... 我想谈的人是……", "What made it special was that... 特别之处在于……", "I can't thank him/her enough. 我感激不尽", "It meant a great deal to me. 对我意义重大", "out of genuine concern 出于真心关怀", "I owe him/her a big favour. 我欠他/她一个大人情"],
    sample: "The person I'd like to talk about is my high school maths teacher, Mr Chen. He was in his forties and had a reputation for being strict, but I found him incredibly patient. / During my final year, I really struggled with calculus before the national exam. Mr Chen noticed my falling grades and offered to tutor me every Friday afternoon after class — completely free of charge. He would break complicated formulas into simple steps and gave me tailor-made exercises based on my mistakes. / That help mattered enormously. My exam score improved by nearly twenty points, which opened the door to my current university. But more importantly, he restored my confidence: before that, I genuinely believed I was just 'bad at maths'. / Looking back, I felt deeply grateful and a little embarrassed, because I had never even asked for the help — he offered it himself, purely out of concern for his students. It taught me that small acts of kindness from teachers can change a student's entire path, and I try to pass that on by tutoring younger students myself now.",
    followups: ["Part 3 延伸：Should schools teach students to be helpful to others?", "Part 3 延伸：Do you think people today are less willing to help strangers than in the past?"]
  },
  {
    id: "spk-5", level: 2, part: "Part 2", title: "话题卡 · 常用的网站/App",
    intro: "Part 2 进阶：练习描述物品类话题的结构（是什么→何时开始用→功能→为何重要）。",
    cues: [
      "Describe a website or app that you find useful.",
      "You should say:",
      "— what it is and how you found it",
      "— what you use it for",
      "— what makes it useful",
      "— and explain how it has changed your daily life"
    ],
    prep: 60, talk: 120,
    phrases: ["It was recommended by a friend of mine. 是朋友推荐给我的", "It has become part and parcel of my daily routine. 已成为我日常生活的一部分", "Its killer feature is... 它最棒的功能是……", "it saves me a ton of time 帮我省了大量时间", "before I discovered it 在发现它之前", "I'd be lost without it. 没有它会手足无措"],
    sample: "I'd like to talk about a vocabulary app called Anki, which was recommended by a friend of mine when I was preparing for an English test about a year ago. / It's a flashcard programme based on spaced repetition — basically, it shows you a card, you rate how well you remembered it, and the algorithm schedules the next review at the moment you're most likely to forget. / What makes it genuinely useful is the flexibility. I've built my own deck with example sentences, photos and even audio, so each card connects a new word to something memorable rather than just a translation. I review it for twenty minutes on the subway every morning, which means I'm turning dead commuting time into study time. / In terms of how it's changed my life — I'd say it has made learning feel automatic. Before I discovered it, I used to cram vocabulary lists and forget everything within a week. Now I've memorised over two thousand words with maybe fifteen minutes a day, and I'd honestly be lost without it. It has become part and parcel of my daily routine.",
    followups: ["Part 3 延伸：Why do some apps become popular while others fail?", "Part 3 延伸：Do you think people spend too much time on their phones?"]
  },
  {
    id: "spk-6", level: 3, part: "Part 2", title: "话题卡 · 克服困难完成的事",
    intro: "冲刺级 Part 2：练习叙事结构（背景→困难→行动→结果→反思），并使用高级词汇与习语。",
    cues: [
      "Describe something difficult that you succeeded in doing.",
      "You should say:",
      "— what it was and when you did it",
      "— why it was difficult",
      "— what you did to overcome the difficulty",
      "— and explain how you felt afterwards"
    ],
    prep: 60, talk: 120,
    phrases: ["It was a steep learning curve. 学习曲线非常陡峭", "I was on the verge of giving up. 我差点放弃", "trial and error 反复试错", "It paid off in the end. 最终得到了回报", "a huge sense of accomplishment 巨大的成就感", "It boosted my confidence no end. 极大增强了我的信心", "step out of my comfort zone 走出舒适区"],
    sample: "I'd like to describe running a half marathon last spring, which was easily one of the most demanding things I've ever accomplished. / The difficulty was threefold. First, I had never been athletic — at the start I couldn't jog five kilometres without stopping. Second, training had to fit around a full course load, so I was getting up at six to run before lectures. And third, about a month in, I strained my knee, which was the moment I was honestly on the verge of giving up. / To overcome all this, I followed a structured sixteen-week plan and learned to treat running as a discipline rather than a mood. I switched to gentler routes to protect my knee, did strength exercises twice a week, and tracked every session — seeing the numbers improve week by week kept me going. It was largely trial and error, but the consistency paid off. / On race day I finished in just over two hours. Crossing that line gave me a huge sense of accomplishment, not because of the medal, but because it proved I could set a long-term goal and grind it out. Since then, whenever something seems intimidating, I remind myself of that steep learning curve — and just start.",
    followups: ["Part 3 延伸：Why do some people give up easily while others persist?", "Part 3 延伸：Should universities reward effort as well as results?"]
  }
]
};
