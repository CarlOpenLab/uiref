<script setup lang="ts">
import { components, groupByCategory } from '#shared/registry-meta'

definePageMeta({ layout: 'docs' })

useHead({ title: '全部组件 · UIRef' })

const groups = groupByCategory()
</script>

<template>
  <div>
    <header class="border-b border-zinc-200 pb-8">
      <SectionHeading
        heading="h1"
        kicker="组件库"
        title="全部组件"
        :description="`${components.length} 个组件，按 ${groups.length} 个分类归组。缩略图即真实组件渲染，进入详情页可交互预览，并拿到用法示例与完整源码。`"
      />

      <nav aria-label="组件分类" class="mt-6 flex flex-wrap gap-2">
        <NuxtLink
          v-for="group in groups"
          :key="group.id"
          :to="{ hash: `#cat-${group.id}` }"
          class="inline-flex h-8 items-center gap-2 rounded-full border border-zinc-200 bg-white pl-2.5 pr-3 text-sm text-zinc-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
        >
          <CategoryIcon :id="group.id" class="size-3.5 text-zinc-400" />
          {{ group.title }}
          <span class="font-mono text-xs text-zinc-400">{{ group.items.length }}</span>
        </NuxtLink>
      </nav>
    </header>

    <section v-for="group in groups" :id="`cat-${group.id}`" :key="group.id" class="mt-12">
      <CategoryHeading :category="group" />

      <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <EntryCard v-for="item in group.items" :key="item.name" :entry="item" kind="component" />
      </div>
    </section>
  </div>
</template>
