<script setup lang="ts">
import type { CategoryMeta, MetaEntry } from '#shared/registry-meta'

withDefaults(
  defineProps<{
    /** 分类及其条目：数量从 items 长度取，与列表永远一致 */
    category: CategoryMeta & { items: MetaEntry[] }
    /** 标题级别：分类总览区用 h2，首页面板内用 h4 */
    heading?: 'h2' | 'h4'
  }>(),
  {
    heading: 'h2',
  },
)
</script>

<template>
  <div class="flex items-start gap-3">
    <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <CategoryIcon :id="category.id" class="size-[18px]" />
    </span>
    <div class="min-w-0">
      <component
        :is="heading"
        class="flex items-center gap-2 font-semibold"
        :class="heading === 'h2' ? 'text-lg text-zinc-950' : 'text-zinc-900'"
      >
        {{ category.title }}
        <span class="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs font-medium text-zinc-500">
          {{ category.items.length }}
        </span>
      </component>
      <p class="mt-0.5 text-sm text-zinc-500">{{ category.description }}</p>
    </div>
  </div>
</template>
