<script setup lang="ts">
import { entryPath, patternFile, patternPrompt } from '#shared/registry-meta'
import { getPattern, neighbors, patternEntries } from '~/registry'
import { demoFor } from '~/registry/demos'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const name = String(route.params.name)
const entry = getPattern(name)

if (!entry) {
  throw createError({ statusCode: 404, statusMessage: `页面模板 ${name} 不存在`, fatal: true })
}

const demo = demoFor(entry)
const { prev, next } = neighbors(patternEntries, entry.name)

/** 可直接复制给编码 Agent 的使用提示词 */
const prompt = patternPrompt(entry)

const files = [{ filename: patternFile(entry.name), code: entry.source }]

/** 递增即重挂载整页模板，恢复初始状态 */
const version = ref(0)

useHead({ title: `${entry.title} ${entry.name} · UIRef` })
</script>

<template>
  <article v-if="entry">
    <DocsPageHeader
      :entry="entry"
      :crumbs="[{ label: '页面模板', to: '/patterns' }]"
      :prompt="prompt"
      :source-file="patternFile(entry.name)"
    />

    <BrowserFrame
      :address="entryPath(entry)"
      class="mt-8 overflow-hidden rounded-xl border border-zinc-200 shadow-sm"
    >
      <template #actions>
        <ResetButton @click="version++" />
      </template>
      <!-- 固定视口：模板内部可交互，超出视口的部分在框内滚动 -->
      <div :key="version" class="h-[40rem] overflow-auto">
        <component :is="demo" v-if="demo" class="h-full" />
      </div>
    </BrowserFrame>

    <section id="code" class="mt-12">
      <h2 class="text-xl font-semibold tracking-tight text-zinc-950">模板源码</h2>
      <p class="mt-1.5 text-sm leading-relaxed text-zinc-500">单个 .vue 文件即整页，复制后替换数据即可使用。</p>
      <CodeBlock class="mt-4" :files="files" />
    </section>

    <AgentPrompt class="mt-12" :prompt="prompt" />

    <PageNeighbors class="mt-12 border-t border-zinc-200 pt-8" base="/patterns" :prev="prev" :next="next" />
  </article>
</template>
