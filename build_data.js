const fs = require('fs');
const path = require('path');

const tools = [
  { id: 'qwen', name: '通义千问', category: 'chat', company: '阿里巴巴', description: '阿里自研大模型，支持多轮对话、代码生成、文档分析，生态覆盖办公与开发者场景。', url: 'https://tongyi.aliyun.com', tags: ['免费', '多模态'], hot: true },
  { id: 'wenxin', name: '文心一言', category: 'chat', company: '百度', description: '百度 ERNIE 大模型对话产品，擅长中文理解与创作，深度整合百度搜索生态。', url: 'https://yiyan.baidu.com', tags: ['免费', '中文'], hot: true },
  { id: 'doubao', name: '豆包', category: 'chat', company: '字节跳动', description: '字节跳动 AI 助手，支持对话、写作、编程，与抖音、飞书等产品深度联动。', url: 'https://www.doubao.com', tags: ['免费', '多模态'], hot: true },
  { id: 'kimi', name: 'Kimi', category: 'chat', company: '月之暗面', description: '支持超长上下文（200 万字）的智能助手，擅长长文档阅读、总结与信息检索。', url: 'https://kimi.moonshot.cn', tags: ['长文本', '免费'], hot: true },
  { id: 'chatglm', name: '智谱清言', category: 'chat', company: '智谱 AI', description: '基于 GLM 大模型的对话助手，支持多模态理解与 Agent 智能体能力。', url: 'https://chatglm.cn', tags: ['免费', 'Agent'], hot: true },
  { id: 'spark', name: '讯飞星火', category: 'chat', company: '科大讯飞', description: '科大讯飞认知大模型，在语音、教育、医疗等垂直领域有深度优化。', url: 'https://xinghuo.xfyun.cn', tags: ['语音', '垂直'] },
  { id: 'yuanbao', name: '腾讯元宝', category: 'chat', company: '腾讯', description: '腾讯混元大模型 C 端产品，整合微信生态，支持联网搜索与多模态对话。', url: 'https://yuanbao.tencent.com', tags: ['免费', '联网'], hot: true },
  { id: 'minimax', name: 'MiniMax', category: 'chat', company: 'MiniMax', description: '国产大模型新锐，海螺 AI 对话产品，在角色扮演与创意写作方面表现突出。', url: 'https://chat.minimaxi.com', tags: ['创意', '角色扮演'] },
  { id: 'stepfun', name: '阶跃星辰', category: 'chat', company: '阶跃星辰', description: 'Step 系列大模型，专注多模态理解与推理，跃问为其对话产品。', url: 'https://www.stepfun.com', tags: ['多模态', '推理'] },
  { id: 'baichuan', name: '百川智能', category: 'chat', company: '百川智能', description: '王小川创立的大模型公司，百小应对话助手，开源与商用模型并行发展。', url: 'https://www.baichuan-ai.com', tags: ['开源', '商用'] },
  { id: 'tiangong', name: '天工 AI', category: 'chat', company: '昆仑万维', description: '昆仑万维天工大模型，集对话、搜索、音乐生成于一体的一站式 AI 平台。', url: 'https://www.tiangong.cn', tags: ['搜索', '音乐'] },
  { id: '360ai', name: '360 智脑', category: 'chat', company: '360', description: '360 自研大模型，整合安全能力与搜索，提供对话、写作、绘图等功能。', url: 'https://ai.360.com', tags: ['安全', '搜索'] },
  { id: 'sensechat', name: '商量 SenseChat', category: 'chat', company: '商汤科技', description: '商汤日日新大模型对话产品，在视觉理解与多模态交互方面有优势。', url: 'https://chat.sensetime.com', tags: ['视觉', '多模态'] },
  { id: 'hailuo-chat', name: '海螺 AI', category: 'chat', company: 'MiniMax', description: 'MiniMax 旗下对话产品，支持语音通话、角色扮演与创意内容生成。', url: 'https://hailuoai.com', tags: ['语音通话', '角色扮演'] },
  { id: 'metaso', name: '秘塔 AI 搜索', category: 'search', company: '秘塔科技', description: '无广告 AI 搜索引擎，直接给出结构化答案与引用来源，适合学术与深度检索。', url: 'https://metaso.cn', tags: ['无广告', '引用来源'], hot: true },
  { id: 'quark-ai', name: '夸克 AI', category: 'search', company: '阿里巴巴', description: '夸克浏览器内置 AI 搜索，整合网盘、扫描、学习等功能，移动端体验优秀。', url: 'https://quark.cn', tags: ['移动端', '综合'] },
  { id: '360-search', name: '360 AI 搜索', category: 'search', company: '360', description: '360 推出的 AI 搜索引擎，支持追问与多轮对话式搜索体验。', url: 'https://so.360.com', tags: ['追问', '免费'] },
  { id: 'tongyi-wanxiang', name: '通义万相', category: 'image', company: '阿里巴巴', description: '阿里 AI 绘画平台，支持文生图、图生图、风格迁移，中文提示词理解优秀。', url: 'https://tongyi.aliyun.com/wanxiang', tags: ['文生图', '免费额度'], hot: true },
  { id: 'yige', name: '文心一格', category: 'image', company: '百度', description: '百度 AI 艺术画平台，支持多种画风与尺寸，适合插画、海报、概念设计。', url: 'https://yige.baidu.com', tags: ['艺术', '免费'], hot: true },
  { id: 'jimeng', name: '即梦 AI', category: 'image', company: '字节跳动', description: '剪映团队出品，支持 AI 绘画与视频生成，与剪映生态无缝衔接。', url: 'https://jimeng.jianying.com', tags: ['视频', '剪映'], hot: true },
  { id: 'kling-image', name: '可灵 AI', category: 'image', company: '快手', description: '快手自研视觉生成模型，图像与视频生成质量领先，支持多种创意风格。', url: 'https://klingai.kuaishou.com', tags: ['高质量', '视频'], hot: true },
  { id: 'liblib', name: 'LiblibAI', category: 'image', company: 'LiblibAI', description: '国内最大 AI 绘画模型社区，海量 Stable Diffusion 模型，支持在线生图。', url: 'https://www.liblib.art', tags: ['社区', 'SD 模型'], hot: true },
  { id: 'whee', name: '美图 WHEE', category: 'image', company: '美图', description: '美图 AI 绘画工具，主打移动端，支持多种风格模板与一键生成。', url: 'https://www.whee.com', tags: ['移动端', '模板'] },
  { id: 'wujie', name: '无界 AI', category: 'image', company: '无界 AI', description: '国产 AI 绘画平台，提供模型训练、在线生图与社区分享功能。', url: 'https://www.wujieai.com', tags: ['训练', '社区'] },
  { id: '6pen', name: '6pen Art', category: 'image', company: '6pen', description: '国内早期 AI 绘画平台，支持多种模型与风格，界面简洁易上手。', url: 'https://6pen.art', tags: ['简洁', '多模型'] },
  { id: 'tusiart', name: '吐司 AI', category: 'image', company: 'TusiArt', description: 'AI 绘画模型分享与在线生成平台，类似 Civitai 的国内替代品。', url: 'https://tusiart.com', tags: ['模型分享', '社区'] },
  { id: 'kling', name: '可灵 AI 视频', category: 'video', company: '快手', description: '国内领先的 AI 视频生成工具，支持文生视频、图生视频，效果接近 Sora。', url: 'https://klingai.kuaishou.com', tags: ['文生视频', '高质量'], hot: true },
  { id: 'jimeng-video', name: '即梦 AI 视频', category: 'video', company: '字节跳动', description: '字节跳动 AI 视频生成，与剪映深度整合，适合短视频创作者快速出片。', url: 'https://jimeng.jianying.com', tags: ['剪映', '短视频'], hot: true },
  { id: 'hailuo-video', name: '海螺 AI 视频', category: 'video', company: 'MiniMax', description: 'MiniMax 视频生成产品，支持文字与图片驱动，生成效果自然流畅。', url: 'https://hailuoai.com/video', tags: ['图生视频', '自然'] },
  { id: 'pixverse', name: 'PixVerse', category: 'video', company: '爱诗科技', description: '国产 AI 视频生成平台，支持特效模板与一键生成，适合社交媒体内容。', url: 'https://pixverse.ai', tags: ['特效', '模板'] },
  { id: 'jianying-ai', name: '剪映 AI', category: 'video', company: '字节跳动', description: '剪映内置 AI 功能，含智能剪辑、AI 配音、数字人、图文成片等创作工具。', url: 'https://www.capcut.cn', tags: ['剪辑', '配音'], hot: true },
  { id: 'xiezuocat', name: '秘塔写作猫', category: 'writing', company: '秘塔科技', description: 'AI 写作助手，支持论文查重、语法纠错、内容续写，学术写作首选。', url: 'https://xiezuocat.com', tags: ['学术', '查重'], hot: true },
  { id: 'wps-ai', name: 'WPS AI', category: 'writing', company: '金山办公', description: 'WPS 内置 AI 助手，支持文档生成、PPT 制作、表格分析，办公场景全覆盖。', url: 'https://ai.wps.cn', tags: ['办公', 'PPT'], hot: true },
  { id: 'iflytek-write', name: '讯飞写作', category: 'writing', company: '科大讯飞', description: '科大讯飞 AI 写作平台，支持新闻稿、公文、营销文案等多种文体生成。', url: 'https://huixie.iflyrec.com', tags: ['公文', '新闻'] },
  { id: 'chatppt', name: 'ChatPPT', category: 'writing', company: 'ChatPPT', description: 'AI 一键生成 PPT，输入主题即可产出完整演示文稿，支持在线编辑。', url: 'https://www.chatppt.com', tags: ['PPT', '一键生成'], hot: true },
  { id: 'islide', name: 'iSlide AI', category: 'writing', company: 'iSlide', description: 'PPT 插件 + AI 助手，提供模板、图表、AI 生成幻灯片等高效办公能力。', url: 'https://www.islide.cc', tags: ['PPT 插件', '模板'] },
  { id: 'feishu-ai', name: '飞书文档 AI', category: 'writing', company: '字节跳动', description: '飞书内置 AI 能力，支持文档总结、翻译、续写，团队协作场景深度整合。', url: 'https://www.feishu.cn/product/docs', tags: ['协作', '翻译'] },
  { id: 'tongyi-lingma', name: '通义灵码', category: 'coding', company: '阿里巴巴', description: '阿里 AI 编程助手，支持 VS Code / JetBrains，代码补全、解释、单元测试生成。', url: 'https://tongyi.aliyun.com/lingma', tags: ['IDE 插件', '免费'], hot: true },
  { id: 'codegeex', name: 'CodeGeeX', category: 'coding', company: '智谱 AI', description: '智谱开源代码大模型，提供 IDE 插件，支持 100+ 编程语言的代码生成。', url: 'https://codegeex.cn', tags: ['开源', '多语言'], hot: true },
  { id: 'marscode', name: 'MarsCode', category: 'coding', company: '字节跳动', description: '字节跳动 AI 编程助手，支持云端 IDE 与 VS Code 插件，免费使用。', url: 'https://www.marscode.cn', tags: ['云端 IDE', '免费'], hot: true },
  { id: 'comate', name: '文心快码 Comate', category: 'coding', company: '百度', description: '百度 AI 编程助手，深度理解中文需求，支持代码生成、调试与重构。', url: 'https://comate.baidu.com', tags: ['中文需求', '调试'] },
  { id: 'iflycode', name: 'iFlyCode', category: 'coding', company: '科大讯飞', description: '讯飞 AI 编程助手，支持多种 IDE，提供代码补全、Review 与技术问答。', url: 'https://iflycode.xfyun.cn', tags: ['Review', '问答'] },
  { id: 'coze', name: '扣子 Coze', category: 'agent', company: '字节跳动', description: '零代码 AI Bot 搭建平台，支持插件、工作流与多渠道发布。', url: 'https://www.coze.cn', tags: ['零代码', 'Bot'], hot: true },
  { id: 'dify', name: 'Dify', category: 'agent', company: 'Dify.AI', description: '开源 LLM 应用开发平台，支持 RAG、Agent、工作流，可私有化部署。', url: 'https://dify.ai', tags: ['开源', 'RAG'], hot: true },
  { id: 'fastgpt', name: 'FastGPT', category: 'agent', company: 'FastGPT', description: '开源知识库问答系统，支持文档导入、向量检索与多模型接入，部署简单。', url: 'https://fastgpt.in', tags: ['知识库', '开源'], hot: true },
  { id: 'wenxin-agent', name: '文心智能体平台', category: 'agent', company: '百度', description: '百度 Agent 开发平台，基于文心大模型，支持创建与发布自定义 AI 智能体。', url: 'https://agents.baidu.com', tags: ['Agent', '发布'] },
  { id: 'yuanqi', name: '腾讯元器', category: 'agent', company: '腾讯', description: '腾讯 AI 智能体创建平台，可发布到微信、QQ 等腾讯生态渠道。', url: 'https://yuanqi.tencent.com', tags: ['微信', 'QQ'] },
  { id: 'zhipu-open', name: '智谱开放平台', category: 'agent', company: '智谱 AI', description: '智谱 AI 开发者平台，提供 GLM API、微调与 Agent 构建全套工具链。', url: 'https://open.bigmodel.cn', tags: ['API', '微调'] },
  { id: 'bailian', name: '阿里云百炼', category: 'agent', company: '阿里巴巴', description: '阿里云大模型应用开发平台，提供模型调用、RAG、Agent 编排与企业级服务。', url: 'https://bailian.console.aliyun.com', tags: ['企业级', 'RAG'] },
  { id: 'suno-cn', name: '海绵音乐', category: 'audio', company: '字节跳动', description: '字节跳动 AI 音乐生成，输入描述或歌词即可创作完整歌曲，中文支持好。', url: 'https://www.haimian.com', tags: ['音乐生成', '中文'], hot: true },
  { id: 'tiangong-music', name: '天工 AI 音乐', category: 'audio', company: '昆仑万维', description: '天工平台 AI 音乐创作，支持多种风格与情绪，可生成纯音乐或带歌词歌曲。', url: 'https://www.tiangong.cn', tags: ['多风格', '歌词'] },
  { id: 'iflyrec', name: '讯飞听见', category: 'audio', company: '科大讯飞', description: 'AI 语音转文字服务，支持会议录音转写、字幕生成，准确率高。', url: 'https://www.iflyrec.com', tags: ['转写', '字幕'], hot: true },
  { id: 'xunfei-tts', name: '讯飞开放平台语音', category: 'audio', company: '科大讯飞', description: '提供 TTS 语音合成、语音识别、声纹识别等全套语音 AI 能力 API。', url: 'https://www.xfyun.cn', tags: ['TTS', 'API'] },
  { id: 'volcengine-audio', name: '火山引擎语音', category: 'audio', company: '字节跳动', description: '字节跳动语音 AI 服务，含语音合成、识别、音频理解，音色自然多样。', url: 'https://www.volcengine.com/product/voice', tags: ['合成', '企业级'] },
  { id: 'moyin', name: '魔音工坊', category: 'audio', company: '出门问问', description: 'AI 配音工具，提供数百种音色，适合短视频、有声书、广告配音。', url: 'https://www.moyin.com', tags: ['配音', '短视频'] },
  { id: 'modelscope', name: '魔搭 ModelScope', category: 'platform', company: '阿里巴巴', description: '国内最大 AI 模型开源社区，提供模型下载、在线体验与微调工具。', url: 'https://modelscope.cn', tags: ['开源', '模型库'], hot: true },
  { id: 'hf-mirror', name: 'HF-Mirror', category: 'platform', company: '社区镜像', description: 'Hugging Face 国内镜像站，方便国内开发者下载模型与数据集。', url: 'https://hf-mirror.com', tags: ['镜像', '下载'], hot: true },
  { id: 'openi', name: 'OpenI 启智', category: 'platform', company: 'OpenI', description: '新一代 AI 开源开放平台，提供算力、模型、数据集与协作开发环境。', url: 'https://openi.org.cn', tags: ['算力', '协作'] },
  { id: 'paddlepaddle', name: '飞桨 PaddlePaddle', category: 'platform', company: '百度', description: '百度开源深度学习框架，中文文档完善，产业级 AI 开发首选框架之一。', url: 'https://www.paddlepaddle.org.cn', tags: ['框架', '开源'] },
  { id: 'mindspore', name: '昇思 MindSpore', category: 'platform', company: '华为', description: '华为开源 AI 框架，端边云协同，适合 Ascend 芯片与全场景 AI 开发。', url: 'https://www.mindspore.cn', tags: ['华为', '端边云'] },
  { id: 'guiji', name: '硅基智能', category: 'digital-human', company: '硅基智能', description: 'AI 数字人克隆与直播，支持形象、声音复刻，用于短视频与直播带货。', url: 'https://www.guiji.ai', tags: ['数字人', '直播'], hot: true },
  { id: 'tencent-avatar', name: '腾讯云数智人', category: 'digital-human', company: '腾讯', description: '腾讯云数字人服务，提供 2D/3D 虚拟形象驱动，适用于客服与播报场景。', url: 'https://cloud.tencent.com/product/vdh', tags: ['2D/3D', '客服'] },
  { id: 'xiaoice', name: '小冰', category: 'digital-human', company: '小冰公司', description: 'AI 虚拟人平台，支持情感计算与个性化交互，可用于品牌虚拟代言人。', url: 'https://xiaoice.com', tags: ['虚拟人', '情感'] },
  { id: 'chanjing', name: '蝉镜', category: 'digital-human', company: '蝉妈妈', description: 'AI 数字人视频生成，输入文案即可生成数字人口播视频，适合营销场景。', url: 'https://www.chanjing.cc', tags: ['口播', '营销'] },
  { id: 'mastergo-ai', name: 'MasterGo AI', category: 'design', company: 'MasterGo', description: '国产设计工具内置 AI，支持设计稿生成、智能布局与组件推荐。', url: 'https://mastergo.com', tags: ['UI 设计', '国产 Figma'] },
  { id: 'js-design', name: '即时设计 AI', category: 'design', company: '即时设计', description: '在线 UI 设计工具 AI 功能，支持 AI 生成界面、图标与设计系统。', url: 'https://js.design', tags: ['UI', '在线'] },
  { id: 'pixso', name: 'Pixso AI', category: 'design', company: 'Pixso', description: '国产协同设计工具，内置 AI 辅助设计、原型生成与素材推荐功能。', url: 'https://pixso.cn', tags: ['协同', '原型'] },
  { id: 'tripo', name: 'Tripo AI', category: 'design', company: 'VAST', description: '国产 AI 3D 模型生成，文字或图片一键生成 3D 模型，支持导出多种格式。', url: 'https://www.tripo3d.ai', tags: ['3D', '文生 3D'], hot: true },
  { id: 'zuoyebang', name: '作业帮 AI', category: 'education', company: '作业帮', description: 'AI 学习助手，支持拍照搜题、口算批改、AI 写作辅导，学生用户量大。', url: 'https://www.zuoyebang.com', tags: ['搜题', 'K12'], hot: true },
  { id: 'youdao-ai', name: '有道智云', category: 'education', company: '网易有道', description: '有道 AI 教育云服务，提供翻译、口语评测、作文批改等教育 API。', url: 'https://ai.youdao.com', tags: ['API', '口语'] },
  { id: 'squirrel-ai', name: '松鼠 AI', category: 'education', company: '松鼠 AI', description: 'AI 自适应学习系统，通过知识图谱精准诊断学生薄弱点并推送学习内容。', url: 'https://www.squirrelai.com', tags: ['自适应', '知识图谱'] },
  { id: 'youdao-trans', name: '有道翻译', category: 'translate', company: '网易有道', description: '集成 AI 大模型的翻译工具，支持文档翻译、同声传译与 AI 润色。', url: 'https://fanyi.youdao.com', tags: ['文档', '同声传译'], hot: true },
  { id: 'baidu-trans', name: '百度翻译', category: 'translate', company: '百度', description: '百度 AI 翻译，支持 200+ 语言互译，文档、图片、语音翻译全覆盖。', url: 'https://fanyi.baidu.com', tags: ['多语言', '图片翻译'] },
  { id: 'tencent-trans', name: '腾讯翻译君', category: 'translate', company: '腾讯', description: '腾讯 AI 翻译工具，支持实时对话翻译、文档翻译与 OCR 图片翻译。', url: 'https://fanyi.qq.com', tags: ['对话翻译', 'OCR'] },
  { id: 'caiyun', name: '彩云小译', category: 'translate', company: '彩云科技', description: 'AI 翻译插件与工具，支持网页双语对照、PDF 翻译，阅读体验优秀。', url: 'https://fanyi.caiyunapp.com', tags: ['双语对照', 'PDF'] },
  { id: 'volcengine', name: '火山引擎', category: 'enterprise', company: '字节跳动', description: '字节跳动 TOB AI 云平台，提供大模型、推荐、视觉等全套 AI 企业服务。', url: 'https://www.volcengine.com', tags: ['企业级', '云服务'], hot: true },
  { id: 'aliyun-ai', name: '阿里云 AI', category: 'enterprise', company: '阿里巴巴', description: '阿里云人工智能平台，含通义系列模型、PAI 训练平台与企业 AI 解决方案。', url: 'https://www.aliyun.com/product/ai', tags: ['云服务', 'PAI'] },
  { id: 'baidu-cloud-ai', name: '百度智能云 AI', category: 'enterprise', company: '百度', description: '百度 AI 云服务，提供文心 API、飞桨框架与企业级 AI 落地方案。', url: 'https://cloud.baidu.com/product/wenxinworkshop', tags: ['文心 API', '企业'] },
  { id: 'huawei-pangu', name: '华为云盘古', category: 'enterprise', company: '华为', description: '华为盘古大模型，聚焦工业、气象、金融等 B 端场景，云原生 AI 服务。', url: 'https://www.huaweicloud.com/product/pangu.html', tags: ['工业', 'B 端'] },
];

const cats = [
  { id: 'all', name: '全部', icon: '🌐' },
  { id: 'chat', name: '对话助手', icon: '💬' },
  { id: 'search', name: 'AI 搜索', icon: '🔍' },
  { id: 'image', name: 'AI 绘画', icon: '🎨' },
  { id: 'video', name: 'AI 视频', icon: '🎬' },
  { id: 'writing', name: 'AI 写作', icon: '✍️' },
  { id: 'coding', name: 'AI 编程', icon: '💻' },
  { id: 'agent', name: '智能体', icon: '🤖' },
  { id: 'audio', name: 'AI 音频', icon: '🎵' },
  { id: 'platform', name: '模型平台', icon: '📦' },
  { id: 'digital-human', name: '数字人', icon: '👤' },
  { id: 'design', name: 'AI 设计', icon: '🎯' },
  { id: 'education', name: 'AI 教育', icon: '📚' },
  { id: 'translate', name: 'AI 翻译', icon: '🌍' },
  { id: 'enterprise', name: '企业服务', icon: '🏢' },
];

function fmtTool(t) {
  const hot = t.hot ? ', hot: true' : '';
  const tags = JSON.stringify(t.tags);
  const desc = t.description.replace(/'/g, "\\'");
  return `  { id: '${t.id}', name: '${t.name}', category: '${t.category}', company: '${t.company}', description: '${desc}', url: '${t.url}', tags: ${tags}${hot} }`;
}

const lines = ['const AI_TOOLS = ['];
tools.slice(0, -1).forEach(t => lines.push(fmtTool(t) + ','));
lines.push(fmtTool(tools[tools.length - 1]));
lines.push('];');
lines.push('const CATEGORIES = [');
cats.forEach((c, i) => {
  const comma = i < cats.length - 1 ? ',' : '';
  lines.push(`  { id: '${c.id}', name: '${c.name}', icon: '${c.icon}' }${comma}`);
});
lines.push('];');

fs.writeFileSync(path.join(__dirname, 'js', 'data.js'), lines.join('\n') + '\n', 'utf8');
console.log('Generated', tools.length, 'tools');
