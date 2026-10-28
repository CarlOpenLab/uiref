<script setup lang="ts">
import { siteMeta } from '#shared/registry-meta'
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
    <div class="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4 sm:px-6">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="flex size-7 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white">U</span>
        <span class="font-semibold tracking-tight">UIRef</span>
        <span class="hidden rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500 md:inline">
          给 Agent 的 UI 参考
        </span>
      </NuxtLink>

      <nav class="ml-auto flex items-center gap-1 text-sm">
        <NuxtLink
          to="/components"
          active-class="text-indigo-600"
          class="rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          组件
        </NuxtLink>
        <NuxtLink
          to="/patterns"
          active-class="text-indigo-600"
          class="rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          页面模板
        </NuxtLink>
        <a
          :href="siteMeta.repository"
          target="_blank"
          rel="noreferrer"
          class="rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          GitHub
        </a>
      </nav>
    </div>
  </header>
</template>
