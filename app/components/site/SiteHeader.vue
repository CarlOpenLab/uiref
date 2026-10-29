<script setup lang="ts">
import { siteMeta } from '#shared/registry-meta'

const route = useRoute()

const nav = [
  { to: '/components', label: '组件' },
  { to: '/patterns', label: '页面模板' },
]

/**
 * @description 顶部导航激活态：栏目总览页及其下所有详情页都高亮所属栏目
 * @param {string} prefix - 栏目路由前缀，如 /components
 * @returns {boolean} 当前路由属于该栏目时为 true
 */
function isActive(prefix: string): boolean {
  return route.path === prefix || route.path.startsWith(`${prefix}/`)
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-zinc-200/80 bg-white">
    <div class="page-container flex h-14 items-center gap-2">
      <NuxtLink to="/" class="mr-2 flex shrink-0 items-center gap-2.5 sm:mr-5" aria-label="UIRef 首页">
        <SiteLogo />
      </NuxtLink>

      <nav class="flex items-center gap-1 text-sm" aria-label="主导航">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-1.5 transition-colors"
          :class="isActive(item.to) ? 'bg-zinc-100 font-medium text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          to="/#agent"
          class="hidden rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:text-zinc-900 md:block"
        >
          Agent 接入
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <!-- 端点徽标只在桌面端展示，移动端留 GitHub 入口 -->
        <div class="hidden items-center gap-2 lg:flex">
          <EndpointChip href="/llms.txt">llms.txt</EndpointChip>
          <EndpointChip href="/api/registry" method="GET">/api/registry</EndpointChip>
        </div>
        <a
          :href="siteMeta.repository"
          target="_blank"
          rel="noreferrer"
          class="flex size-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="GitHub 仓库"
        >
          <svg class="size-[18px]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>
