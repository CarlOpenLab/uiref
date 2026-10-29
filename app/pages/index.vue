<script setup lang="ts">
import { categories, componentPrompt, entryPath, groupByCategory } from '#shared/registry-meta'
import { components, patterns } from '#shared/registry-meta'

useHead({ title: 'UIRef · 给 Agent 的 UI 范式参考库' })

/** 条目多于此数的分类用宽面板（占两列、条目两列排布） */
const WIDE_PANEL_MIN_ITEMS = 6

const groups = groupByCategory()

/** 目录分两层：Agent 组件（本库重点）在上，通用组件在下；归属由注册表的 tier 声明 */
const tiers = [
  { title: 'Agent 组件', groups: groups.filter((group) => group.tier === 'agent') },
  { title: '通用组件', groups: groups.filter((group) => group.tier === 'general') },
].map((tier) => ({ ...tier, count: tier.groups.reduce((sum, group) => sum + group.items.length, 0) }))

const stats = [
  { label: '组件', value: components.length },
  { label: '页面模板', value: patterns.length },
  { label: '分类', value: categories.length },
]

/** 「Agent 接入」区块举例用的组件：第一个 Agent 组件 */
const sample = groups.find((group) => group.tier === 'agent')?.items[0] ?? components[0]!

const ways = [
  {
    title: '抓取详情页',
    description: '详情页 SSR 直出：可交互预览 + 语法高亮的完整源码，Agent 读一次 HTML 就拿到全部物料。',
    snippet: `GET ${entryPath(sample)}\n\n→ 200 text/html\n  实时预览 · 用法示例 · 组件源码`,
    cta: '打开示例详情页',
    to: entryPath(sample),
    external: false,
  },
  {
    title: '一次 GET 拿全量',
    description: '/api/registry 返回全部分类、元数据与完整源码，构建期从源文件注入，永不失真。',
    snippet: [
      'GET /api/registry',
      '',
      '{',
      `  "categories": [ …${categories.length} ],`,
      `  "components": [ …${components.length} ],`,
      `  "patterns":   [ …${patterns.length} ]`,
      '}',
    ].join('\n'),
    cta: '查看 JSON',
    to: '/api/registry',
    external: true,
  },
  {
    title: '复制提示词',
    description: '每个详情页都附带现成提示词：源码路径 + 样式基准，粘贴给任何编码 Agent 即可。',
    snippet: componentPrompt(sample),
    cta: '去复制提示词',
    to: `${entryPath(sample)}#prompt`,
    external: false,
  },
]
</script>

<template>
  <div>
    <!-- Hero：左侧定位 + 右侧由本库组件拼装的 Agent 演示窗 -->
    <section class="relative overflow-hidden border-b border-zinc-200">
      <div
        class="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_35%,transparent_100%)]"
        aria-hidden="true"
      />

      <div class="page-container relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <UBadge tone="indigo" dot>v0.1 · 持续建设中</UBadge>
          <h1 class="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.5rem]">
            给 Agent 的<br><span class="text-indigo-600">UI 范式</span>参考库
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            每个路由 = 一个可交互预览 + 完整源码。生成界面前把对应页面或源码喂给 Agent，产出就能对齐同一套 zinc + indigo 风格基准。
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/components"
              class="inline-flex h-11 items-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-500"
            >
              浏览组件
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/patterns"
              class="inline-flex h-11 items-center rounded-lg border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              页面模板
            </NuxtLink>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-2 text-sm">
            <span class="text-zinc-500">给 Agent：</span>
            <EndpointChip href="/api/registry" method="GET">/api/registry</EndpointChip>
            <EndpointChip href="/llms.txt" method="GET">/llms.txt</EndpointChip>
          </div>

          <dl class="mt-10 grid max-w-md grid-cols-3 divide-x divide-zinc-200 border-t border-zinc-200 pt-6">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse gap-1 px-5 first:pl-0">
              <dt class="text-sm text-zinc-500">{{ stat.label }}</dt>
              <dd class="text-3xl font-bold tracking-tight text-zinc-950">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>

        <HeroDemo />
      </div>
    </section>

    <!-- 组件目录 -->
    <section class="page-container py-20 lg:py-24">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          kicker="组件目录"
          :title="`${components.length} 个组件，Agent 场景优先`"
          description="对话与执行类组件覆盖 Agent 产品的核心交互；通用组件补齐表单、反馈与数据展示。"
        />
        <NuxtLink to="/components" class="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500">
          浏览全部组件 →
        </NuxtLink>
      </div>

      <div v-for="tier in tiers" :key="tier.title" class="mt-12">
        <h3 class="flex items-center gap-2 text-sm font-semibold text-zinc-900">
          {{ tier.title }}
          <span class="font-mono text-xs font-normal text-zinc-400">{{ tier.count }}</span>
        </h3>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryPanel
            v-for="group in tier.groups"
            :key="group.id"
            :group="group"
            :wide="group.items.length > WIDE_PANEL_MIN_ITEMS"
          />
        </div>
      </div>
    </section>

    <!-- 页面模板 -->
    <section class="border-t border-zinc-200 bg-zinc-50">
      <div class="page-container py-20 lg:py-24">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="页面模板"
            title="组件拼成整页，拿来即用"
            description="登录、仪表盘、Agent 工作台、落地页 —— 单个 .vue 文件即整页，缩略图就是真实渲染。"
          />
          <NuxtLink to="/patterns" class="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500">
            全部模板 →
          </NuxtLink>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <EntryCard v-for="item in patterns" :key="item.name" :entry="item" kind="pattern" />
        </div>
      </div>
    </section>

    <!-- Agent 接入 -->
    <section id="agent" class="bg-zinc-950 text-white">
      <div class="page-container py-20 lg:py-24">
        <p class="font-mono text-sm font-medium text-indigo-400">// Agent 接入</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight">三种方式，把范式喂给 Agent</h2>
        <p class="mt-3 max-w-2xl leading-relaxed text-zinc-400">
          页面、JSON、提示词，选你的 Agent 最顺手的一种；站点说明见
          <a href="/llms.txt" class="font-mono text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-zinc-300">/llms.txt</a>。
        </p>

        <div class="mt-12 grid gap-4 lg:grid-cols-3">
          <div
            v-for="(way, index) in ways"
            :key="way.title"
            class="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <span class="font-mono text-xs text-indigo-400">0{{ index + 1 }}</span>
            <h3 class="mt-3 text-lg font-semibold">{{ way.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">{{ way.description }}</p>
            <pre class="mt-6 flex-1 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-300">{{ way.snippet }}</pre>
            <NuxtLink
              :to="way.to"
              :external="way.external"
              class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              {{ way.cta }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
