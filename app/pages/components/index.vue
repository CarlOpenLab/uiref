<script setup lang="ts">
import { groupByCategory } from '~/registry'

useHead({ title: '全部组件 · UIRef' })

const groups = groupByCategory()
</script>

<template>
  <div class="py-10">
    <h1 class="text-3xl font-bold tracking-tight">全部组件</h1>
    <p class="mt-2 text-zinc-600">
      {{ groups.reduce((n, g) => n + g.items.length, 0) }} 个组件，按分类归组。点击进入可查看实时预览、用法示例与完整源码。
    </p>

    <section v-for="group in groups" :key="group.id" class="mt-10">
      <h2 class="text-lg font-semibold">{{ group.title }}</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <EntryCard v-for="item in group.items" :key="item.name" :entry="item" base="/components" />
      </div>
    </section>
  </div>
</template>
