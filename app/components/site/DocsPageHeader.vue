<script setup lang="ts">
import { siteMeta } from '#shared/registry-meta'
import type { MetaEntry } from '#shared/registry-meta'

const props = defineProps<{
  entry: MetaEntry
  /** 面包屑上级，末尾自动追加当前条目 */
  crumbs: Array<{ label: string; to: string }>
  /** 「复制 Agent 提示词」按钮复制的内容 */
  prompt: string
  /** 主源码文件路径，生成 GitHub 链接 */
  sourceFile: string
}>()
</script>

<template>
  <header>
    <nav aria-label="面包屑" class="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
      <template v-for="crumb in crumbs" :key="crumb.to">
        <NuxtLink :to="crumb.to" class="transition-colors hover:text-zinc-900">{{ crumb.label }}</NuxtLink>
        <svg class="size-3.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </template>
      <span class="text-zinc-900" aria-current="page">{{ entry.title }}</span>
    </nav>

    <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">{{ entry.title }}</h1>
      <code class="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-sm text-zinc-600">{{ entry.name }}</code>
    </div>
    <p class="mt-3 max-w-3xl leading-relaxed text-zinc-600">{{ entry.description }}</p>

    <div class="mt-5 flex flex-wrap items-center gap-2">
      <CopyButton
        class="h-9 rounded-lg bg-indigo-600 px-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500"
        :text="prompt"
        label="复制 Agent 提示词"
      />
      <NuxtLink
        :to="{ hash: '#code' }"
        class="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
      >
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        </svg>
        查看源码
      </NuxtLink>
      <a
        :href="`${siteMeta.repository}/blob/main/${sourceFile}`"
        target="_blank"
        rel="noreferrer"
        class="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        GitHub
        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </a>
    </div>
  </header>
</template>
