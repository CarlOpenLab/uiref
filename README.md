# UIRef

给 AI Agent 的 UI 范式参考库。每个路由对应一个**可交互预览 + 完整源码**的组件或页面模板；Agent 生成 UI 时把对应页面或源码喂进去，即可对齐风格。

技术栈：**Nuxt 4 + Tailwind CSS 4 + Vue 3**（无其他运行时依赖，组件可直接复制到任何 Vue/Nuxt 项目）。

## 路由结构

| 路由 | 说明 |
| --- | --- |
| `/` | 总目录：分类 → 组件卡片 → 页面模板 |
| `/components` | 全部组件列表 |
| `/components/:name` | 组件详情：实时预览 + 用法示例源码 + 组件源码 |
| `/patterns` | 页面模板列表 |
| `/patterns/:name` | 整页模板：固定视口预览 + 完整源码 |
| `/api/registry` | 机器可读元数据 JSON（分类、条目、源码文件路径） |
| `/llms.txt` | Agent 友好的站点说明 |

## 目录约定（核心）

路由由 `shared/registry-meta.ts` 这一份注册表驱动，**注册表里的一条记录 = 一个路由 = 一对源码文件**：

```
app/components/ui/UButton.vue        ← 组件本体（agent 抄的就是这个）
app/components/demo/DemoButton.vue   ← 用法示例（详情页渲染它，源码也展示它）
app/components/patterns/PatternLogin.vue ← 整页模板
app/registry/index.ts                ← 合并元数据 + ?raw 源码（自动同步，永不失真）
app/registry/demos.ts                ← 路由名 → 渲染组件的映射
server/api/registry.get.ts           ← /api/registry
```

命名规则：路由名 `button` ↔ 组件 `UButton.vue` ↔ 示例 `DemoButton.vue` ↔ 模板 `PatternLogin.vue`。

## 如何新增一个组件（3 步）

1. 写组件：`app/components/ui/USelect.vue`（Tailwind 类，配色基准 zinc + indigo）。
2. 写示例：`app/components/demo/DemoSelect.vue`，把所有变体/状态摆出来 —— 它的源码会原样展示给 agent。
3. 注册：在 `shared/registry-meta.ts` 的 `components` 数组加一条元数据；在 `app/registry/index.ts` 的 `sourceMap` 加一行源码导入；在 `app/registry/demos.ts` 加一行映射。

路由 `/components/select`、目录卡片、`/api/registry` 自动生效，无需改任何页面。

## 如何新增一个页面模板（2 步）

1. 写整页组件：`app/components/patterns/PatternXxx.vue`。
2. 在 `shared/registry-meta.ts` 的 `patterns`、`app/registry/index.ts` 的 `patternSourceMap`、`app/registry/demos.ts` 的 `patternDemoMap` 各加一行。

## Agent 接入

- `GET /api/registry` — 一次 GET 拿到全部条目的元数据**与完整源码**（构建期由 `modules/registry-code.ts` 扫描注入，dev 下组件文件变更自动重写 `server/generated/registry-code.json`，该目录已 gitignore）。
- 抓详情页 HTML（SSR）可获得语法高亮的完整源码；或直接读仓库 `app/components/` 下的文件。
- 每个详情页底部有「给 Agent 的使用提示」—— 可直接复制的提示词（含源码路径与样式基准）。
- `POST /api/highlight` — 批量代码高亮服务（shiki, github-dark 主题）。
- `public/llms.txt` 是给爬虫/agent 的入口说明。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 生产构建 → .output/
npm run generate   # 纯静态生成（SSG）
```

## Roadmap

- [x] Agent 组件批次 1（对话：sender / message / thinking / stream / tool-call / quick-replies / permission；执行：task-list / code-diff / terminal / browser-step）
- [x] Agent 组件批次 2（attachments / sources / model-picker）
- [x] 通用组件（toast / skeleton / select / checkbox / pagination；dropdown 由 model-picker 与 select 覆盖，radio 场景并入 checkbox）
- [x] 页面模板：登录页 / 后台仪表盘 / Agent 工作台 / 落地页
- [ ] 暗色模式
- [x] 构建期把源码注入 `/api/registry`（一次 GET 拿全部代码）
- [x] 代码块语法高亮（shiki · github-dark，SSR 直出）
- [ ] 更多模板：设置页、列表页、文章页
- [ ] 持续 loop：按网站逐个扒范式入库（每批 = 检索 → 实现 → 注册 → 验证 → 推送）
