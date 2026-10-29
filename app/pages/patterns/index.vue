<script setup lang="ts">
import { patterns } from '#shared/registry-meta'

definePageMeta({ layout: 'docs' })

useHead({ title: '页面模板 · UIRef' })
</script>

<template>
  <div>
    <header class="border-b border-zinc-200 pb-8">
      <SectionHeading
        heading="h1"
        kicker="整页范式"
        title="页面模板"
        :description="`${patterns.length} 个由组件组合而成的整页模板。缩略图即真实渲染，进入详情页可在固定视口里交互预览，并拿到单文件完整源码。`"
      />
    </header>

    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <EntryCard v-for="item in patterns" :key="item.name" :entry="item" kind="pattern" />
    </div>
  </div>
</template>
