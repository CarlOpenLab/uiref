<script setup lang="ts">
import type { MetaEntry } from '#shared/registry-meta'

defineProps<{
  entry: MetaEntry
  /** 路由前缀：/components 或 /patterns */
  base: string
}>()
</script>

<template>
  <NuxtLink
    :to="`${base}/${entry.name}`"
    class="group block rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
  >
    <div class="flex items-center justify-between gap-3">
      <span class="font-semibold text-zinc-900">{{ entry.title }}</span>
      <span class="font-mono text-xs text-zinc-400 transition-colors group-hover:text-indigo-500">
        {{ entry.name }}
      </span>
    </div>
    <p class="mt-2 text-sm leading-relaxed text-zinc-500">{{ entry.description }}</p>
  </NuxtLink>
</template>
