<script setup lang="ts">
import { componentPrompt, demoFile, uiFile } from '#shared/registry-meta'
import {
  categories,
  componentEntries,
  getComponent,
  neighbors,
} from '~/registry'
import { demoFor } from '~/registry/demos'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const name = String(route.params.name)
const entry = getComponent(name)

if (!entry) {
  throw createError({ statusCode: 404, statusMessage: `组件 ${name} 不存在`, fatal: true })
}

const demo = demoFor(entry)
const { prev, next } = neighbors(componentEntries, entry.name)

const category = categories.find((item) => item.id === entry.category)
const crumbs = [
  { label: '组件', to: '/components' },
  ...(category ? [{ label: category.title, to: `/components#cat-${category.id}` }] : []),
]

/** 可直接复制给编码 Agent 的使用提示词 */
const prompt = componentPrompt(entry)

const files = [
  { label: '用法示例', filename: demoFile(entry.name), code: entry.usage },
  { label: '组件源码', filename: uiFile(entry.name), code: entry.source },
]

useHead({ title: `${entry.title} ${entry.name} · UIRef` })
</script>

<template>
  <article v-if="entry">
    <DocsPageHeader :entry="entry" :crumbs="crumbs" :prompt="prompt" :source-file="uiFile(entry.name)" />

    <ShowcasePreview class="mt-8">
      <component :is="demo" v-if="demo" />
    </ShowcasePreview>

    <section id="code" class="mt-12">
      <h2 class="text-xl font-semibold tracking-tight text-zinc-950">源码</h2>
      <p class="mt-1.5 text-sm leading-relaxed text-zinc-500">
        「用法示例」与上方预览一一对应；「组件源码」是可直接复制到任意 Vue / Nuxt 项目的单文件组件。
      </p>
      <CodeBlock class="mt-4" :files="files" />
    </section>

    <AgentPrompt class="mt-12" :prompt="prompt" />

    <PageNeighbors class="mt-12 border-t border-zinc-200 pt-8" :prev="prev" :next="next" />
  </article>
</template>
