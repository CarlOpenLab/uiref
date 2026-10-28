<script setup lang="ts">
import { demoFile, getComponent, uiFile } from '~/registry'
import { demoMap } from '~/registry/demos'

const route = useRoute()
const name = String(route.params.name)
const entry = getComponent(name)

if (!entry) {
  throw createError({ statusCode: 404, statusMessage: `组件 ${name} 不存在`, fatal: true })
}

const demo = demoMap[entry.name]

useHead({ title: `${entry.title} ${entry.name} · UIRef` })
</script>

<template>
  <div v-if="entry" class="py-10">
    <nav class="flex items-center gap-2 text-sm text-zinc-500">
      <NuxtLink to="/components" class="hover:text-zinc-900">组件</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="font-mono text-zinc-900">{{ entry.name }}</span>
    </nav>

    <h1 class="mt-4 text-3xl font-bold tracking-tight">
      {{ entry.title }}
      <span class="ml-1 font-mono text-lg font-normal text-zinc-400">{{ entry.name }}</span>
    </h1>
    <p class="mt-2 max-w-2xl leading-relaxed text-zinc-600">{{ entry.description }}</p>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">实时预览</h2>
      <ShowcasePreview class="mt-3">
        <component :is="demo" v-if="demo" />
      </ShowcasePreview>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">用法示例</h2>
      <p class="mt-1 text-sm text-zinc-500">预览里的每种状态都对应这份源码中的一段标记。</p>
      <CodeBlock class="mt-3" :code="entry.usage" :filename="demoFile(entry.name)" />
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">组件源码</h2>
      <CodeBlock class="mt-3" :code="entry.source" :filename="uiFile(entry.name)" />
    </section>
  </div>
</template>
