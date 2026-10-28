<script setup lang="ts">
import { getPattern, patternFile } from '~/registry'
import { patternDemoMap } from '~/registry/demos'

const route = useRoute()
const name = String(route.params.name)
const entry = getPattern(name)

if (!entry) {
  throw createError({ statusCode: 404, statusMessage: `页面模板 ${name} 不存在`, fatal: true })
}

const demo = patternDemoMap[entry.name]

useHead({ title: `${entry.title} ${entry.name} · UIRef` })
</script>

<template>
  <div v-if="entry" class="py-10">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink to="/patterns" class="hover:text-zinc-900">页面模板</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="font-mono text-zinc-900">{{ entry.name }}</span>
    </nav>

    <h1 class="mt-4 text-3xl font-bold tracking-tight">
      {{ entry.title }}
      <span class="ml-1 font-mono text-lg font-normal text-zinc-400">{{ entry.name }}</span>
    </h1>
    <p class="mt-2 max-w-2xl leading-relaxed text-zinc-600">{{ entry.description }}</p>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">整页预览</h2>
      <div class="mt-3 h-[620px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <component :is="demo" v-if="demo" class="h-full" />
      </div>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">模板源码</h2>
      <p class="mt-1 text-sm text-zinc-500">单个 .vue 文件即整页，复制后替换数据即可使用。</p>
      <CodeBlock class="mt-3" :code="entry.source" :filename="patternFile(entry.name)" />
    </section>
  </div>
</template>
