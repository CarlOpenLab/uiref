<script setup lang="ts">
import { entryPath } from '#shared/registry-meta'
import type { MetaEntry } from '#shared/registry-meta'
import { demoFor } from '~/registry/demos'

const props = defineProps<{
  entry: MetaEntry
  /** component：组件卡片（居中缩略图）；pattern：页面模板卡片（浏览器外框 + 整页缩略图） */
  kind: 'component' | 'pattern'
}>()

const isPattern = computed(() => props.kind === 'pattern')
const demo = computed(() => demoFor(props.entry))

/** 卡片接近视口才挂载缩略图：首屏不批量拉起几十个 demo 异步分片；SSR 期恒为 false，天然跳过服务端渲染 */
const { el, visible } = useNearViewport()
</script>

<template>
  <article
    ref="el"
    class="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-indigo-500"
  >
    <!-- 缩略图 = 真实组件缩小渲染：纯视觉（inert + aria-hidden），Agent 抓目录页只拿到文字信息 -->
    <BrowserFrame v-if="isPattern" :address="entryPath(entry)" compact class="border-b border-zinc-200">
      <div class="relative aspect-[16/10] bg-zinc-50">
        <ScaledPreview v-if="visible" :factor="3">
          <component :is="demo" class="h-full" />
        </ScaledPreview>
      </div>
    </BrowserFrame>
    <div v-else class="bg-dots relative h-44 border-b border-zinc-100 bg-zinc-50/70">
      <ScaledPreview v-if="visible" centered>
        <component :is="demo" />
      </ScaledPreview>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <h3 class="flex items-center justify-between gap-3">
        <!-- after:inset-0 把整张卡片变成点击区域，缩略图不必嵌进 <a> -->
        <NuxtLink
          :to="entryPath(entry)"
          class="font-semibold text-zinc-900 transition-colors after:absolute after:inset-0 focus:outline-none group-hover:text-indigo-600"
        >
          {{ entry.title }}
        </NuxtLink>
        <span class="truncate font-mono text-xs text-zinc-400">{{ entry.name }}</span>
      </h3>
      <p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-500">{{ entry.description }}</p>
    </div>
  </article>
</template>
