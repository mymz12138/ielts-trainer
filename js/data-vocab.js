/* ==========================================================
   data-vocab.js · 每日单词打卡词库（雅思高频学术词汇）
   8 个主题 × 10 词
   ========================================================== */
const VOCAB_TOPICS = [
  {
    id: "edu", name: "教育 Education",
    words: [
      { w: "curriculum", p: "n.", cn: "课程（体系）", s: "The school curriculum should balance academic subjects with creative activities.", sc: "学校课程应平衡学科与创造性活动。" },
      { w: "academic", p: "adj.", cn: "学术的；学业的", s: "Academic pressure can have a negative impact on students' mental health.", sc: "学业压力可能对学生的心理健康产生负面影响。" },
      { w: "discipline", p: "n./v.", cn: "纪律；训练", s: "Self-discipline is more important than external punishment in education.", sc: "在教育中，自律比外部惩罚更重要。" },
      { w: "motivate", p: "v.", cn: "激励；激发", s: "Teachers should motivate students to explore knowledge independently.", sc: "教师应激励学生独立探索知识。" },
      { w: "tuition", p: "n.", cn: "学费；教学", s: "Rising tuition fees prevent many students from accessing higher education.", sc: "不断上涨的学费使许多学生无法接受高等教育。" },
      { w: "literacy", p: "n.", cn: "读写能力；素养", s: "Digital literacy has become as essential as traditional literacy.", sc: "数字素养已变得与传统读写能力一样重要。" },
      { w: "assess", p: "v.", cn: "评估；评定", s: "Exams are not the only way to assess a student's ability.", sc: "考试并不是评估学生能力的唯一方式。" },
      { w: "vocational", p: "adj.", cn: "职业的；职业培训的", s: "Vocational training prepares young people for practical careers.", sc: "职业培训为年轻人从事实际工作做准备。" },
      { w: "intellectual", p: "adj./n.", cn: "智力的；知识分子", s: "Children develop intellectual abilities through play and exploration.", sc: "儿童通过游戏和探索发展智力。" },
      { w: "mentor", p: "n./v.", cn: "导师；指导", s: "A good mentor can significantly influence a student's career path.", sc: "一位好导师能极大地影响学生的职业道路。" }
    ]
  },
  {
    id: "env", name: "环境 Environment",
    words: [
      { w: "sustainable", p: "adj.", cn: "可持续的", s: "Sustainable development meets present needs without compromising future generations.", sc: "可持续发展在不损害后代利益的前提下满足当前需求。" },
      { w: "emission", p: "n.", cn: "排放（物）", s: "Governments must reduce carbon emissions to slow down climate change.", sc: "各国政府必须减少碳排放以减缓气候变化。" },
      { w: "conservation", p: "n.", cn: "保护；节约", s: "Wildlife conservation requires both funding and public awareness.", sc: "野生动物保护既需要资金也需要公众意识。" },
      { w: "contaminate", p: "v.", cn: "污染", s: "Industrial waste continues to contaminate rivers and soil.", sc: "工业废料持续污染河流和土壤。" },
      { w: "renewable", p: "adj.", cn: "可再生的", s: "Renewable energy sources such as solar power are becoming cheaper.", sc: "太阳能等可再生能源正变得更廉价。" },
      { w: "deforestation", p: "n.", cn: "滥伐森林", s: "Deforestation accelerates the loss of biodiversity worldwide.", sc: "滥伐森林加速了全球生物多样性的丧失。" },
      { w: "ecosystem", p: "n.", cn: "生态系统", s: "Every species plays a role in maintaining a balanced ecosystem.", sc: "每个物种都在维持生态平衡中扮演角色。" },
      { w: "toxic", p: "adj.", cn: "有毒的", s: "Toxic chemicals from factories pose a serious threat to public health.", sc: "工厂排放的有毒化学品对公众健康构成严重威胁。" },
      { w: "offset", p: "v.", cn: "抵消；补偿", s: "Companies can offset their carbon footprint by planting trees.", sc: "企业可以通过植树来抵消其碳足迹。" },
      { w: "degrade", p: "v.", cn: "使退化；降低", s: "Over-farming degrades soil quality over time.", sc: "过度耕作会逐渐使土壤质量退化。" }
    ]
  },
  {
    id: "tech", name: "科技 Technology",
    words: [
      { w: "innovation", p: "n.", cn: "创新", s: "Technological innovation drives economic growth in modern societies.", sc: "技术创新推动现代社会的经济增长。" },
      { w: "automate", p: "v.", cn: "使自动化", s: "Many factories have automated their production lines to cut costs.", sc: "许多工厂已将生产线自动化以降低成本。" },
      { w: "artificial", p: "adj.", cn: "人工的；人造的", s: "Artificial intelligence is transforming the way we work and live.", sc: "人工智能正在改变我们的工作和生活方式。" },
      { w: "surveillance", p: "n.", cn: "监视；监控", s: "Widespread surveillance raises concerns about personal privacy.", sc: "大范围监控引发了对个人隐私的担忧。" },
      { w: "accessibility", p: "n.", cn: "可及性；无障碍", s: "The internet improves accessibility to education in remote areas.", sc: "互联网提高了偏远地区获得教育的机会。" },
      { w: "obsolete", p: "adj.", cn: "过时的；淘汰的", s: "Rapid technological change makes some skills obsolete within years.", sc: "快速的技术变革使某些技能在几年内过时。" },
      { w: "digital", p: "adj.", cn: "数字的；数码的", s: "The digital divide separates those with and without internet access.", sc: "数字鸿沟将有无网络的人群分隔开来。" },
      { w: "breakthrough", p: "n.", cn: "突破；重大进展", s: "Medical breakthroughs have extended average life expectancy dramatically.", sc: "医学突破显著延长了平均预期寿命。" },
      { w: "reliable", p: "adj.", cn: "可靠的", s: "Self-driving cars must prove they are more reliable than human drivers.", sc: "自动驾驶汽车必须证明比人类驾驶更可靠。" },
      { w: "cybersecurity", p: "n.", cn: "网络安全", s: "Cybersecurity has become a top priority for governments and businesses.", sc: "网络安全已成为政府和企业的头等大事。" }
    ]
  },
  {
    id: "health", name: "健康 Health",
    words: [
      { w: "obesity", p: "n.", cn: "肥胖（症）", s: "Childhood obesity is closely linked to the consumption of fast food.", sc: "儿童肥胖与快餐消费密切相关。" },
      { w: "immune", p: "adj.", cn: "免疫的", s: "Regular exercise strengthens the immune system.", sc: "规律运动能增强免疫系统。" },
      { w: "epidemic", p: "n./adj.", cn: "流行病；流行性的", s: "The government took swift action to contain the epidemic.", sc: "政府迅速采取行动控制疫情。" },
      { w: "therapy", p: "n.", cn: "治疗；疗法", s: "Physical therapy helps patients recover mobility after surgery.", sc: "物理治疗帮助患者在术后恢复行动能力。" },
      { w: "chronic", p: "adj.", cn: "慢性的；长期的", s: "Chronic stress can lead to serious health problems.", sc: "长期压力会引发严重的健康问题。" },
      { w: "diagnose", p: "v.", cn: "诊断", s: "Early diagnosis greatly increases the chance of successful treatment.", sc: "早期诊断能大大提高治疗成功的机会。" },
      { w: "nutrition", p: "n.", cn: "营养", s: "Schools should educate children about nutrition and healthy eating.", sc: "学校应教育儿童了解营养和健康饮食。" },
      { w: "sedentary", p: "adj.", cn: "久坐的", s: "A sedentary lifestyle increases the risk of heart disease.", sc: "久坐的生活方式会增加患心脏病的风险。" },
      { w: "vaccine", p: "n.", cn: "疫苗", s: "Vaccines have eliminated several deadly diseases over the past century.", sc: "疫苗在过去一个世纪消灭了几种致命疾病。" },
      { w: "well-being", p: "n.", cn: "健康；幸福", s: "Employers should care about both the productivity and well-being of staff.", sc: "雇主应同时关注员工的生产力与身心健康。" }
    ]
  },
  {
    id: "soc", name: "社会 Society",
    words: [
      { w: "urbanisation", p: "n.", cn: "城市化", s: "Rapid urbanisation puts enormous pressure on housing and transport.", sc: "快速城市化给住房和交通带来巨大压力。" },
      { w: "inequality", p: "n.", cn: "不平等", s: "Income inequality has widened in many developed countries.", sc: "许多发达国家的收入不平等加剧了。" },
      { w: "welfare", p: "n.", cn: "福利", s: "A strong welfare system protects the most vulnerable members of society.", sc: "健全的福利体系保护社会中最脆弱的群体。" },
      { w: "community", p: "n.", cn: "社区；群体", s: "Volunteering strengthens the bonds within a community.", sc: "志愿服务能增强社区内部的联系。" },
      { w: "demographic", p: "adj./n.", cn: "人口的；人口统计数据", s: "An ageing population creates demographic challenges for pension systems.", sc: "人口老龄化给养老金体系带来人口结构上的挑战。" },
      { w: "poverty", p: "n.", cn: "贫困", s: "Education is one of the most effective tools for reducing poverty.", sc: "教育是减少贫困最有效的手段之一。" },
      { w: "infrastructure", p: "n.", cn: "基础设施", s: "The government plans to invest heavily in transport infrastructure.", sc: "政府计划大力投资交通基础设施。" },
      { w: "migrant", p: "n.", cn: "移民；移居者", s: "Migrant workers make significant contributions to the urban economy.", sc: "移民工人为城市经济作出重大贡献。" },
      { w: "legislate", p: "v.", cn: "立法", s: "The parliament voted to legislate against single-use plastics.", sc: "议会投票立法禁止一次性塑料制品。" },
      { w: "cohesion", p: "n.", cn: "凝聚力；团结", s: "Shared public spaces promote social cohesion in big cities.", sc: "共享公共空间能促进大城市的社会凝聚力。" }
    ]
  },
  {
    id: "work", name: "工作 Work",
    words: [
      { w: "recruit", p: "v.", cn: "招聘；招募", s: "Companies often recruit graduates from top universities.", sc: "公司常常从顶尖大学招聘毕业生。" },
      { w: "qualification", p: "n.", cn: "资格；学历", s: "Formal qualifications are no longer a guarantee of a good job.", sc: "正式学历已不再是获得好工作的保证。" },
      { w: "colleague", p: "n.", cn: "同事", s: "A supportive colleague can make a demanding job much easier.", sc: "支持你的同事能让繁重的工作轻松许多。" },
      { w: "telecommute", p: "v.", cn: "远程办公", s: "More employees choose to telecommute to save commuting time.", sc: "更多员工选择远程办公以节省通勤时间。" },
      { w: "promotion", p: "n.", cn: "晋升；促销", s: "Hard work alone does not always lead to promotion.", sc: "仅靠努力工作并不总能获得晋升。" },
      { w: "workload", p: "n.", cn: "工作量", s: "An excessive workload is a major cause of workplace stress.", sc: "过大的工作量是职场压力的主要原因。" },
      { w: "entrepreneur", p: "n.", cn: "企业家；创业者", s: "Young entrepreneurs need both capital and mentorship to succeed.", sc: "年轻创业者需要资金和指导才能成功。" },
      { w: "redundant", p: "adj.", cn: "被裁员的；多余的", s: "Workers were made redundant when the factory switched to automation.", sc: "工厂转向自动化后，工人们被裁员了。" },
      { w: "productivity", p: "n.", cn: "生产力；效率", s: "Flexible working hours can actually improve productivity.", sc: "弹性工作时间实际上能提高生产力。" },
      { w: "internship", p: "n.", cn: "实习（岗位）", s: "An internship offers valuable experience before entering the job market.", sc: "实习为进入就业市场前提供了宝贵经验。" }
    ]
  },
  {
    id: "media", name: "媒体 Media",
    words: [
      { w: "censorship", p: "n.", cn: "审查（制度）", s: "Media censorship remains a controversial issue worldwide.", sc: "媒体审查在全球仍是一个有争议的话题。" },
      { w: "influence", p: "n./v.", cn: "影响；左右", s: "Social media has a powerful influence on young people's values.", sc: "社交媒体对年轻人的价值观有强大影响。" },
      { w: "misleading", p: "adj.", cn: "误导性的", s: "Misleading headlines spread faster than accurate reporting.", sc: "误导性标题比准确报道传播得更快。" },
      { w: "coverage", p: "n.", cn: "新闻报道（范围）", s: "Live coverage of the event attracted millions of viewers.", sc: "对赛事的直播吸引了数百万观众。" },
      { w: "publicity", p: "n.", cn: "宣传；公众关注", s: "Celebrities use their fame to gain publicity for charitable causes.", sc: "名人利用名气为慈善事业争取公众关注。" },
      { w: "broadcast", p: "v./n.", cn: "播放；广播", s: "The interview was broadcast live on national television.", sc: "该采访在国家电视台现场直播。" },
      { w: "tabloid", p: "n.", cn: "小报", s: "Tabloids often prioritise sensational stories over factual accuracy.", sc: "小报常常把煽情报道置于事实准确之上。" },
      { w: "disseminate", p: "v.", cn: "散布；传播", s: "The internet makes it easy to disseminate information—and misinformation.", sc: "互联网使传播信息——以及错误信息——变得容易。" },
      { w: "exposure", p: "n.", cn: "接触；曝光", s: "Children's exposure to violent content should be limited.", sc: "应限制儿童接触暴力内容。" },
      { w: "verify", p: "v.", cn: "核实；查证", s: "Readers should verify sources before sharing news online.", sc: "读者在网上分享新闻前应核实信源。" }
    ]
  },
  {
    id: "life", name: "生活与旅行 Life & Travel",
    words: [
      { w: "commute", p: "n./v.", cn: "通勤", s: "A long commute leaves little time for family or exercise.", sc: "长时间的通勤让人几乎没有时间陪伴家人或锻炼。" },
      { w: "accommodation", p: "n.", cn: "住处；住宿", s: "Student accommodation near campus is often expensive.", sc: "校园附近的学生住宿通常很贵。" },
      { w: "leisure", p: "n.", cn: "休闲；闲暇", s: "Leisure time is essential for maintaining a work-life balance.", sc: "闲暇时间对保持工作与生活的平衡至关重要。" },
      { w: "destination", p: "n.", cn: "目的地", s: "Overtourism has damaged many popular travel destinations.", sc: "过度旅游破坏了许多热门旅游目的地。" },
      { w: "itinerary", p: "n.", cn: "行程；旅行路线", s: "A flexible itinerary allows travellers to explore spontaneously.", sc: "灵活的行程让旅行者可以随性探索。" },
      { w: "budget", p: "n./adj.", cn: "预算；经济的", s: "Budget travellers often stay in hostels to save money.", sc: "预算有限的旅行者常住青年旅舍省钱。" },
      { w: "convenience", p: "n.", cn: "便利", s: "The convenience of online shopping comes at an environmental cost.", sc: "网购的便利是以环境代价换来的。" },
      { w: "household", p: "n./adj.", cn: "家庭；家庭的", s: "Household waste can be reduced through recycling schemes.", sc: "通过回收计划可以减少家庭垃圾。" },
      { w: "amenity", p: "n.", cn: "便利设施", s: "Parks and libraries are valuable public amenities.", sc: "公园和图书馆是宝贵的公共设施。" },
      { w: "communal", p: "adj.", cn: "公共的；共用的", s: "The apartment has a communal kitchen shared by six students.", sc: "这间公寓有一个六名学生共用的公共厨房。" }
    ]
  }
];
