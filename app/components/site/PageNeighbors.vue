<script setup lang="ts">
import { entryPath } from '#shared/registry-meta'
import type { MetaEntry } from '#shared/registry-meta'

const props = defineProps<{
  prev?: MetaEntry
  next?: MetaEntry
}>()

const card =
  'group flex flex-col rounded-xl border border-zinc-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50/40'
</script>

<template>
  <nav v-if="prev || next" aria-label="上一个 / 下一个" class="grid gap-3 sm:grid-cols-2">
    <NuxtLink v-if="prev" :to="entryPath(prev)" :class="card">
      <span class="flex items-center gap-1 text-xs text-zinc-400">
        <svg class="size-3.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
        上一个
      </span>
      <span class="mt-1.5 font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600">
        {{ prev.title }}
        <span class="ml-1 font-mono text-xs font-normal text-zinc-400">{{ prev.name }}</span>
      </span>
    </NuxtLink>

    <NuxtLink
      v-if="next"
      :to="entryPath(next)"
      :class="[card, 'items-end text-right', prev ? '' : 'sm:col-start-2']"
    >
      <span class="flex items-center gap-1 text-xs text-zinc-400">
        下一个
        <svg class="size-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
      <span class="mt-1.5 font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600">
        {{ next.title }}
        <span class="ml-1 font-mono text-xs font-normal text-zinc-400">{{ next.name }}</span>
      </span>
    </NuxtLink>
  </nav>
</template>
