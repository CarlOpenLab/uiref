<script setup lang="ts">
import { components, patterns } from '#shared/registry-meta'

const route = useRoute()

/** 移动端目录抽屉开关 */
const drawerOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
/** 桌面端侧边栏滚动容器：首屏把当前条目滚到中部，长目录里也能一眼看到自己在哪 */
const sidebarScroller = ref<HTMLElement | null>(null)

/** 移动端顶栏显示的当前位置：栏目 + 条目标题（总览页无标题） */
const location = computed(() => {
  const name = String(route.params.name ?? '')
  if (route.path.startsWith('/patterns')) {
    return { section: '页面模板', title: name ? patterns.find((item) => item.name === name)?.title : undefined }
  }
  return { section: '组件', title: name ? components.find((item) => item.name === name)?.title : undefined }
})

/**
 * @description 抽屉打开时按 Esc 关闭，与遮罩点击、关闭按钮行为一致
 * @param {KeyboardEvent} event - 键盘事件
 * @returns {void}
 */
function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') drawerOpen.value = false
}

// 抽屉里点了链接 → 路由变化 → 自动收起
watch(() => route.fullPath, () => {
  drawerOpen.value = false
})

// 焦点管理：打开时落到关闭按钮，关闭后回到「目录」按钮；Esc 监听只在抽屉存活期间挂载
watch(drawerOpen, (open) => {
  if (open) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
  nextTick(() => (open ? closeButton.value : menuButton.value)?.focus())
})

onMounted(() => {
  const scroller = sidebarScroller.value
  const active = scroller?.querySelector<HTMLElement>('[aria-current="page"]')
  if (scroller && active) scroller.scrollTop = active.offsetTop - scroller.clientHeight / 2
})

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="flex-1 [--anchor-offset:7rem] lg:[--anchor-offset:5rem]">
    <!-- 移动端：目录按钮 + 当前位置 -->
    <div class="sticky top-14 z-30 border-b border-zinc-200 bg-white lg:hidden">
      <div class="page-container flex h-11 items-center gap-3">
        <button
          ref="menuButton"
          type="button"
          class="-ml-2 inline-flex h-8 shrink-0 items-center gap-2 rounded-lg px-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
          aria-controls="docs-drawer"
          :aria-expanded="drawerOpen"
          @click="drawerOpen = true"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          目录
        </button>
        <span class="h-4 w-px shrink-0 bg-zinc-200" aria-hidden="true" />
        <p class="truncate text-sm text-zinc-500">
          {{ location.section }}<template v-if="location.title">
            <span class="mx-1.5 text-zinc-300">/</span><span class="text-zinc-900">{{ location.title }}</span>
          </template>
        </p>
      </div>
    </div>

    <div class="page-container lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-14">
      <aside class="hidden lg:block">
        <div
          ref="sidebarScroller"
          class="scrollbar-thin sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain py-8 pr-2"
        >
          <DocsSidebar />
        </div>
      </aside>

      <main id="main" class="min-w-0 pb-20 pt-8 lg:pt-10">
        <slot />
      </main>
    </div>

    <!-- 移动端目录抽屉 -->
    <Transition name="drawer">
      <div
        v-if="drawerOpen"
        id="docs-drawer"
        class="fixed inset-0 z-50 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="文档目录"
      >
        <div class="absolute inset-0 bg-zinc-950/40" @click="drawerOpen = false" />
        <div class="drawer-panel absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-xl">
          <div class="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 px-4">
            <span class="text-sm font-semibold">文档目录</span>
            <button
              ref="closeButton"
              type="button"
              class="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="关闭目录"
              @click="drawerOpen = false"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div class="scrollbar-thin flex-1 overflow-y-auto overscroll-contain px-4 py-6">
            <DocsSidebar />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
