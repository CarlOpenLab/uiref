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

export const categories: CategoryMeta[] = [
  { id: 'basic', title: '基础', description: '按钮、徽标等最小交互单元' },
  { id: 'agent', title: 'Agent 对话', description: '与 AI Agent 协作时的输入与交互控件' },
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
]
