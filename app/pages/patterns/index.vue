<script setup lang="ts">
import { patternEntries } from '~/registry'

useHead({ title: '页面模板 · UIRef' })
</script>

<template>
  <div class="py-10">
    <h1 class="text-3xl font-bold tracking-tight">页面模板</h1>
    <p class="mt-2 text-zinc-600">
      组件组合成整页的完整范式。点击进入可在固定视口里预览整页效果，并拿到完整源码。
    </p>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <EntryCard v-for="item in patternEntries" :key="item.name" :entry="item" base="/patterns" />
    </div>
  </div>
</template>
