<script setup lang="ts">
const props = defineProps<{
  /** 地址栏文字，通常是路由路径 */
  address: string
  /** 紧凑尺寸：卡片缩略图使用 */
  compact?: boolean
}>()
</script>

<template>
  <div class="flex flex-col bg-white">
    <div
      class="flex shrink-0 items-center gap-3 border-b border-zinc-200 bg-zinc-50"
      :class="compact ? 'h-7 px-3' : 'h-10 px-4'"
    >
      <div class="flex shrink-0 gap-1.5" aria-hidden="true">
        <span v-for="n in 3" :key="n" class="rounded-full bg-zinc-300" :class="compact ? 'size-2' : 'size-2.5'" />
      </div>

      <div class="flex min-w-0 flex-1 justify-center">
        <span
          class="flex min-w-0 items-center gap-1.5 rounded-md border border-zinc-200 bg-white font-mono text-zinc-500"
          :class="compact ? 'h-4.5 px-2 text-[10px]' : 'h-6 w-full max-w-sm justify-center px-3 text-[11px]'"
        >
          <svg class="shrink-0 text-zinc-400" :class="compact ? 'size-2.5' : 'size-3'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span class="truncate">{{ address }}</span>
        </span>
      </div>

      <!-- 右侧操作区；未提供时用与左侧圆点等宽的占位，让地址栏居中 -->
      <slot name="actions">
        <span class="shrink-0" :class="compact ? 'w-9' : 'w-[42px]'" aria-hidden="true" />
      </slot>
    </div>

    <div class="relative min-h-0 flex-1">
      <slot />
    </div>
  </div>
</template>
