<script setup lang="ts">
import { entryPath, groupByCategory, patterns } from '#shared/registry-meta'
import type { MetaEntry } from '#shared/registry-meta'

const route = useRoute()

/** 侧边栏筛选关键词 */
const query = ref('')

const overview = [
  { to: '/components', label: '组件总览', icon: 'all' },
  { to: '/patterns', label: '页面模板总览', icon: 'pattern' },
]

/** 组件按分类分区，页面模板单独成区 */
const sections: Array<{ id: string; title: string; items: MetaEntry[] }> = [
  ...groupByCategory().map((group) => ({ id: group.id, title: group.title, items: group.items })),
  { id: 'pattern', title: '页面模板', items: patterns },
]

/** 按关键词过滤后的分区：命中分区名则整区保留，否则按条目标题 / 路由名过滤，空分区隐藏 */
const visibleSections = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return sections
  return sections
    .map((section) =>
      section.title.toLowerCase().includes(keyword)
        ? section
        : {
            ...section,
            items: section.items.filter(
              (item) => item.title.toLowerCase().includes(keyword) || item.name.includes(keyword),
            ),
          },
    )
    .filter((section) => section.items.length > 0)
})

/**
 * @description 目录条目样式：当前页左侧靛蓝竖线 + 加粗，其余条目悬停加深
 * @param {string} to - 条目对应的路由
 * @returns {string} 当前状态下应使用的 Tailwind 类名
 */
function itemClass(to: string): string {
  return route.path === to
    ? 'border-indigo-600 font-medium text-indigo-700'
    : 'border-transparent text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
}
</script>

<template>
  <nav aria-label="文档目录" class="text-sm">
    <label class="relative block">
      <span class="sr-only">筛选组件与页面模板</span>
      <svg
        class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        v-model="query"
        type="search"
        placeholder="筛选组件…"
        class="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-8 pr-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50"
      >
    </label>

    <ul class="mt-5 space-y-0.5">
      <li v-for="link in overview" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors"
          :class="
            route.path === link.to
              ? 'bg-indigo-50 font-medium text-indigo-700'
              : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
          "
        >
          <CategoryIcon :id="link.icon" class="size-4 shrink-0 opacity-70" />
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>

    <div v-for="section in visibleSections" :key="section.id" class="mt-7">
      <p class="mb-2 flex items-center gap-2 px-2.5 text-xs font-semibold text-zinc-900">
        {{ section.title }}
        <span class="font-mono text-[11px] font-normal text-zinc-400">{{ section.items.length }}</span>
      </p>
      <ul class="ml-2.5 border-l border-zinc-200">
        <li v-for="item in section.items" :key="item.name">
          <NuxtLink
            :to="entryPath(item)"
            class="-ml-px flex items-baseline justify-between gap-3 border-l py-1.5 pl-3.5 pr-1 transition-colors"
            :class="itemClass(entryPath(item))"
          >
            <span class="shrink-0">{{ item.title }}</span>
            <span class="min-w-0 truncate font-mono text-[11px] font-normal text-zinc-400">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <p v-if="visibleSections.length === 0" class="mt-6 px-2.5 text-sm text-zinc-500">
      没有匹配「{{ query }}」的条目
    </p>
  </nav>
</template>
