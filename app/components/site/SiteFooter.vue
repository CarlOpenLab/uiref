<script setup lang="ts">
import { siteMeta } from '#shared/registry-meta'
</script>

<template>
  <footer class="border-t border-zinc-200 bg-white">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:px-6">
      <p>{{ siteMeta.title }} · {{ siteMeta.tagline }}</p>
      <div class="flex items-center gap-4">
        <a href="/llms.txt" class="hover:text-zinc-900">llms.txt</a>
        <a href="/api/registry" class="hover:text-zinc-900">/api/registry</a>
        <a :href="siteMeta.repository" target="_blank" rel="noreferrer" class="hover:text-zinc-900">
          CarlOpenLab/uiref
        </a>
      </div>
    </div>
  </footer>
</template>
