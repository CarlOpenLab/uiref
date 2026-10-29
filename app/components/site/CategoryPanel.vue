<script setup lang="ts">
import { entryPath } from '#shared/registry-meta'
import type { CategoryMeta, MetaEntry } from '#shared/registry-meta'

const props = defineProps<{
  group: CategoryMeta & { items: MetaEntry[] }
  /** 宽面板：在 3 列网格中占 2 列，条目分两列排布 */
  wide?: boolean
}>()
</script>

<template>
  <div class="flex flex-col rounded-xl border border-zinc-200 bg-white" :class="wide ? 'lg:col-span-2' : ''">
    <div class="border-b border-zinc-100 p-4">
      <CategoryHeading :category="group" heading="h4" />
    </div>

    <ul class="grid content-start gap-0.5 p-2" :class="wide ? 'sm:grid-cols-2' : ''">
      <li v-for="item in group.items" :key="item.name">
        <NuxtLink
          :to="entryPath(item)"
          class="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-zinc-50"
        >
          <span class="shrink-0 font-medium text-zinc-800 transition-colors group-hover:text-indigo-600">{{ item.title }}</span>
          <span class="truncate font-mono text-xs text-zinc-400">{{ item.name }}</span>
          <svg class="ml-auto size-3.5 shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
