<script setup lang="ts">
const props = defineProps<{
  code: string
  filename?: string
}>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // 非安全上下文下剪贴板不可用，忽略即可
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
    <div class="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
      <span class="truncate font-mono text-xs text-zinc-400">{{ filename ?? 'code' }}</span>
      <button
        type="button"
        class="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
        @click="copy"
      >
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre class="max-h-[560px] overflow-auto p-4 text-[13px] leading-relaxed text-zinc-100"><code>{{ code }}</code></pre>
  </div>
</template>
