<script setup lang="ts">
import { categories, componentEntries, groupByCategory, patternEntries } from '~/registry'

useHead({ title: 'UIRef · 给 Agent 的 UI 范式参考库' })

const groups = groupByCategory()
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="py-16">
      <p class="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        v0.1 · 持续建设中
      </p>
      <h1 class="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        给 Agent 的 UI 范式参考库
      </h1>
      <p class="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
        每个路由对应一个可交互预览 + 完整源码的 UI 范式。全部使用 Nuxt + Tailwind CSS 实现，
        生成 UI 时把对应页面（或仓库源码）喂给 Agent 即可对齐风格。
      </p>
      <div class="mt-7 flex flex-wrap items-center gap-3">
        <NuxtLink
          to="/components"
          class="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          浏览组件
        </NuxtLink>
        <a
          href="/llms.txt"
          class="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
        >
          llms.txt
        </a>
        <a href="/api/registry" class="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900">
          /api/registry →
        </a>
      </div>
      <dl class="mt-10 flex gap-12 text-sm text-zinc-500">
        <div>
          <dt class="text-2xl font-bold text-zinc-900">{{ componentEntries.length }}</dt>
          <dd class="mt-1">个组件</dd>
        </div>
        <div>
          <dt class="text-2xl font-bold text-zinc-900">{{ patternEntries.length }}</dt>
          <dd class="mt-1">个页面模板</dd>
        </div>
        <div>
          <dt class="text-2xl font-bold text-zinc-900">{{ categories.length }}</dt>
          <dd class="mt-1">个分类</dd>
        </div>
      </dl>
    </section>

    <!-- 分类目录 -->
    <section v-for="group in groups" :key="group.id" class="border-t border-zinc-200 py-10">
      <div class="flex flex-wrap items-baseline gap-3">
        <h2 class="text-xl font-semibold">{{ group.title }}</h2>
        <p class="text-sm text-zinc-500">{{ group.description }}</p>
      </div>
      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <EntryCard v-for="item in group.items" :key="item.name" :entry="item" base="/components" />
      </div>
    </section>

    <!-- 页面模板 -->
    <section class="border-t border-zinc-200 py-10">
      <div class="flex flex-wrap items-baseline gap-3">
        <h2 class="text-xl font-semibold">页面模板</h2>
        <p class="text-sm text-zinc-500">组件组合成整页的完整范式</p>
      </div>
      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <EntryCard v-for="item in patternEntries" :key="item.name" :entry="item" base="/patterns" />
      </div>
    </section>
  </div>
</template>
