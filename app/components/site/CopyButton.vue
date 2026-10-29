<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** 要复制的文本 */
    text: string
    /** 按钮文案 */
    label?: string
  }>(),
  {
    label: '复制',
  },
)

/** 复制成功后短暂显示「已复制」 */
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

/**
 * @description 写入剪贴板并显示 1.5 秒「已复制」反馈；非安全上下文（如 http 局域网访问）下剪贴板不可用，静默忽略
 * @returns {Promise<void>} 复制完成或被忽略后 resolve
 */
async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch {
    return
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 1500)
}

onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <!-- 配色、尺寸由使用方通过 class 传入：深色代码块头部 / 靛蓝主按钮 -->
  <button type="button" class="inline-flex shrink-0 items-center gap-1.5" @click="copy">
    <svg v-if="copied" class="size-[1.15em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
    <svg v-else class="size-[1.15em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
    <span aria-live="polite">{{ copied ? '已复制' : label }}</span>
  </button>
</template>
