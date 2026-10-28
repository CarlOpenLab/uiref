/**
 * 全站唯一的元数据注册表。
 * app 端与 server 端（/api/registry）都从这里读取，源码字符串由 app/registry 注入。
 */

export interface CategoryMeta {
  id: string
  title: string
  description: string
}

export interface MetaEntry {
  /** 路由名：决定 /components/<name> 与 /patterns/<name> */
  name: string
  /** 中文标题 */
  title: string
  /** 分类 id，模板固定为 'pattern' */
  category: string
  description: string
}

export const siteMeta = {
  name: 'uiref',
  title: 'UIRef',
  tagline: '给 Agent 的 UI 范式参考库',
  description:
    '每个路由对应一个可交互预览 + 完整源码的 UI 范式，全部使用 Nuxt + Tailwind CSS 实现，可直接复制给任何代码生成 Agent 使用。',
  repository: 'https://github.com/CarlOpenLab/uiref',
}

/** 路由名 → PascalCase 文件名：agent-message → AgentMessage */
export function toPascal(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export const categories: CategoryMeta[] = [
  { id: 'basic', title: '基础', description: '按钮、徽标等最小交互单元' },
  { id: 'agent', title: 'Agent 对话', description: '与 AI Agent 对话时的输入与交互控件' },
  { id: 'agent-exec', title: 'Agent 执行', description: 'Agent 执行过程的展示与控制：任务、代码、终端、浏览器' },
  { id: 'form', title: '表单', description: '输入与选择类控件' },
  { id: 'layout', title: '布局', description: '内容分区与容器' },
  { id: 'navigation', title: '导航', description: '内容与页面的切换' },
  { id: 'feedback', title: '反馈', description: '状态告知与轻交互' },
  { id: 'data', title: '数据展示', description: '结构化数据的呈现' },
]

export const components: MetaEntry[] = [
  {
    name: 'button',
    title: '按钮',
    category: 'basic',
    description: '触发操作的基础按钮。5 种视觉变体、3 种尺寸，支持 loading / disabled / 整行。',
  },
  {
    name: 'badge',
    title: '徽标',
    category: 'basic',
    description: '轻量状态标签。5 种语义色调、2 种尺寸，用于计数、状态与元信息标记。',
  },
  {
    name: 'input',
    title: '输入框',
    category: 'form',
    description: '单行文本输入。defineModel 双向绑定，支持 3 种尺寸与校验错误态。',
  },
  {
    name: 'card',
    title: '卡片',
    category: 'layout',
    description: '通用内容容器。可选标题、描述与底部操作区，是页面分区的默认选择。',
  },
  {
    name: 'tabs',
    title: '选项卡',
    category: 'navigation',
    description: '下划线式选项卡导航，用于同层级内容的切换，v-model 控制激活项。',
  },
  {
    name: 'alert',
    title: '警告提示',
    category: 'feedback',
    description: '传达重要信息的横幅提示。info / success / warning / danger 四种语义色调。',
  },
  {
    name: 'modal',
    title: '模态框',
    category: 'feedback',
    description: '模态对话框。遮罩点击关闭，支持标题、正文与自定义底部操作区。',
  },
  {
    name: 'table',
    title: '表格',
    category: 'data',
    description: '数据表格。列配置驱动，支持单元格插槽自定义与空状态。',
  },
  {
    name: 'sender',
    title: '发送器',
    category: 'agent',
    description:
      'Agent 对话输入器。自适应高度文本域，Enter 发送 / Shift+Enter 换行（兼容输入法组词），生成中一键变停止按钮，工具栏与提示支持插槽自定义。',
  },
  {
    name: 'agent-message',
    title: '消息气泡',
    category: 'agent',
    description:
      '对话消息容器。用户右侧气泡、Agent 左侧带头像与操作行（复制 / 重新生成），是对话流的基础原语。',
  },
  {
    name: 'thinking',
    title: '思考过程',
    category: 'agent',
    description:
      '推理过程折叠面板。思考中带脉冲动画，完成后收起为「已完成思考 · 用时」，可展开查看推理内容。',
  },
  {
    name: 'stream-text',
    title: '流式文本',
    category: 'agent',
    description:
      '逐字打字机流式输出 + 呼吸光标，streaming 置 false 立即显示全文，适合对接 SSE / 流式接口。',
  },
  {
    name: 'tool-call',
    title: '工具调用',
    category: 'agent',
    description:
      '工具调用卡片。展示工具名与运行 / 成功 / 失败状态，可展开查看调用参数与返回结果，Function Calling / MCP 场景必备。',
  },
  {
    name: 'quick-replies',
    title: '建议追问',
    category: 'agent',
    description: '对话末尾的可点击快捷指令 chips，点击 emit select，用于引导下一步对话。',
  },
  {
    name: 'permission',
    title: '权限审批',
    category: 'agent',
    description:
      'Agent 请求执行敏感操作时的审批卡。展示工具与命令、风险等级，支持允许一次 / 总是允许 / 拒绝。',
  },
  {
    name: 'task-list',
    title: '任务计划',
    category: 'agent-exec',
    description:
      'Agent 执行计划清单。pending / in_progress / completed 三态，头部自动汇总进度，长任务透明化的标配。',
  },
  {
    name: 'code-diff',
    title: '文件改动',
    category: 'agent-exec',
    description:
      '代码改动卡片。文件路径 + 增删行数统计 + 逐行着色 diff，带审核状态与接受 / 拒绝操作区。',
  },
  {
    name: 'terminal-block',
    title: '终端执行',
    category: 'agent-exec',
    description:
      '命令执行块。命令 + 输出流 + 完成 / 失败状态，运行中可一键停止，编码类 Agent 的标配。',
  },
  {
    name: 'browser-step',
    title: '浏览器操作',
    category: 'agent-exec',
    description:
      'computer-use 步骤卡。步骤序号 + 动作描述 + 目标网址 + 截图区域，展示 Agent 操控浏览器的过程。',
  },
  {
    name: 'attachments',
    title: '附件',
    category: 'agent',
    description:
      '文件上传列表。按类型着色的图标（图片 / PDF / 代码 / 文件）、上传进度条、失败态与移除操作。',
  },
  {
    name: 'model-picker',
    title: '模型选择器',
    category: 'agent',
    description:
      '分组下拉选择模型。选项带描述与 New/Beta 标签、选中打勾，点击外部自动收起。',
  },
  {
    name: 'sources',
    title: '来源引用',
    category: 'agent',
    description:
      '检索类回答的来源块。编号角标行 + 可展开来源列表（标题 + 站点），点击 emit select。',
  },
  {
    name: 'toast',
    title: '轻提示',
    category: 'feedback',
    description:
      '全局轻提示。success / error / info 三态，支持自动消失时长与手动关闭，Teleport 渲染在底部居中。',
  },
  {
    name: 'skeleton',
    title: '骨架屏',
    category: 'feedback',
    description:
      'shimmer 加载占位块。尺寸圆角由类名控制，demo 提供 Agent 回复与卡片两种常见预设。',
  },
  {
    name: 'select',
    title: '下拉选择',
    category: 'form',
    description:
      '表单级下拉选择。与输入框同宽同高，v-model 绑定，支持占位与禁用态。',
  },
  {
    name: 'checkbox',
    title: '复选框',
    category: 'form',
    description: '自定义复选框。v-model 绑定，label 可用插槽替换，带禁用态。',
  },
  {
    name: 'pagination',
    title: '分页',
    category: 'data',
    description:
      '页码分页。总页数超 7 页时自动省略号折叠，当前页实心高亮，首末页禁用翻页。',
  },
]

export const patterns: MetaEntry[] = [
  {
    name: 'login',
    title: '登录页',
    category: 'pattern',
    description: '居中卡片式登录页：表单 + 记住我 + 第三方登录 + 辅助链接。',
  },
  {
    name: 'dashboard',
    title: '后台仪表盘',
    category: 'pattern',
    description: '后台首页布局：侧边栏导航 + 顶栏搜索 + 统计卡片 + 数据表格。',
  },
  {
    name: 'agent-workspace',
    title: 'Agent 工作台',
    category: 'pattern',
    description:
      '完整的 Agent 对话工作台：会话侧边栏 + 模型选择 + 思考/任务/工具调用线程 + 发送器，全库 Agent 组件的组合示范。',
  },
  {
    name: 'landing',
    title: '落地页',
    category: 'pattern',
    description: 'SaaS 营销落地页：导航 + Hero + 客户 Logo + 特性卡片 + CTA 区 + 页脚。',
  },
]
