<script setup lang="ts">
import { demoFile, getComponent, neighbors, componentEntries, uiFile } from '~/registry'
import { demoMap } from '~/registry/demos'

const route = useRoute()
const name = String(route.params.name)
const entry = getComponent(name)

if (!entry) {
  throw createError({ statusCode: 404, statusMessage: `组件 ${name} 不存在`, fatal: true })
}

const demo = demoMap[entry.name]
const { prev, next } = neighbors(componentEntries, entry.name)

/** 可直接复制给编码 Agent 的使用提示词 */
const agentPrompt = `请按照 UIRef 组件库的「${entry.title} (${entry.name})」范式来实现界面：
- 组件源码：${uiFile(entry.name)}
- 用法示例：${demoFile(entry.name)}
- 在线预览：/components/${entry.name}（源码也可从 /api/registry 获取）
- 样式基准：Tailwind CSS，中性色 zinc，强调色 indigo，圆角 rounded-lg / rounded-xl`

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

    <section class="mt-8">
      <div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5">
        <h2 class="text-lg font-semibold text-zinc-900">给 Agent 的使用提示</h2>
        <p class="mt-1 text-sm text-zinc-600">
          复制下面的提示词发给任何编码 Agent，它就会按这套范式的源码与样式基准来生成 UI。
        </p>
        <CodeBlock class="mt-3" :code="agentPrompt" filename="agent-prompt.md" lang="markdown" />
      </div>
    </section>

    <nav v-if="prev || next" class="mt-12 grid gap-3 border-t border-zinc-200 pt-6 sm:grid-cols-2">
      <NuxtLink
        v-if="prev"
        :to="`/components/${prev.name}`"
        class="group rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-indigo-300"
      >
        <p class="text-xs text-zinc-400">← 上一个</p>
        <p class="mt-1 font-semibold text-zinc-900 group-hover:text-indigo-600">
          {{ prev.title }}
          <span class="ml-1 font-mono text-xs font-normal text-zinc-400">{{ prev.name }}</span>
        </p>
      </NuxtLink>
      <span v-else aria-hidden="true" />
      <NuxtLink
        v-if="next"
        :to="`/components/${next.name}`"
        class="group rounded-xl border border-zinc-200 bg-white p-4 text-right transition-colors hover:border-indigo-300"
      >
        <p class="text-xs text-zinc-400">下一个 →</p>
        <p class="mt-1 font-semibold text-zinc-900 group-hover:text-indigo-600">
          {{ next.title }}
          <span class="ml-1 font-mono text-xs font-normal text-zinc-400">{{ next.name }}</span>
        </p>
      </NuxtLink>
    </nav>
  </div>
</template>
