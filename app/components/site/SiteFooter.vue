<script setup lang="ts">
import { siteMeta } from '#shared/registry-meta'

interface FooterLink {
  label: string
  to: string
  /** 静态文件 / 服务端路由，需整页跳转而非客户端路由 */
  external?: boolean
}

const columns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: '浏览',
    links: [
      { label: '组件总览', to: '/components' },
      { label: 'Agent 组件', to: '/components#cat-agent' },
      { label: '页面模板', to: '/patterns' },
    ],
  },
  {
    title: 'Agent 接入',
    links: [
      { label: '接入方式', to: '/#agent' },
      { label: 'llms.txt', to: '/llms.txt', external: true },
      { label: '/api/registry', to: '/api/registry', external: true },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-zinc-200 bg-zinc-50">
    <div class="page-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
      <div>
        <NuxtLink to="/" class="inline-flex items-center gap-2.5">
          <SiteLogo />
        </NuxtLink>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">{{ siteMeta.description }}</p>
        <p class="mt-4 font-mono text-xs text-zinc-400">Nuxt 4 · Tailwind CSS 4 · Vue 3</p>
      </div>

      <div v-for="column in columns" :key="column.title">
        <p class="text-sm font-semibold text-zinc-900">{{ column.title }}</p>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="link in column.links" :key="link.to">
            <NuxtLink
              :to="link.to"
              :external="link.external"
              class="text-zinc-500 transition-colors hover:text-zinc-900"
              :class="link.external ? 'font-mono text-[13px]' : ''"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-zinc-200">
      <div class="page-container flex flex-col gap-2 py-5 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{{ siteMeta.title }} · {{ siteMeta.tagline }}</p>
        <a :href="siteMeta.repository" target="_blank" rel="noreferrer" class="font-mono transition-colors hover:text-zinc-700">
          {{ siteMeta.repository.replace('https://', '') }}
        </a>
      </div>
    </div>
  </footer>
</template>
