<script setup lang="ts">
const props = defineProps<{
  code: string
  filename?: string
  /** shiki 语言，默认 vue */
  lang?: string
}>()

const copied = ref(false)

/** 简单字符串哈希，作为 useFetch 的去重 key */
function hash(text: string): string {
  let h = 5381
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h + text.charCodeAt(i)) | 0
  }
  return Math.abs(h).toString(36)
}

// SSR 期间请求高亮，拿到 shiki 的彩色 HTML；失败回退纯文本
const { data } = await useFetch('/api/highlight', {
  key: `hl-${hash(props.code)}`,
  method: 'POST',
  body: { blocks: [{ code: props.code, lang: props.lang ?? 'vue' }] },
})

const html = computed(() => data.value?.html?.[0] ?? '')

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

    <!-- shiki 高亮结果 -->
    <div
      v-if="html"
      class="max-h-[560px] overflow-auto text-[13px] leading-relaxed [&_.line]:font-mono [&_code]:font-mono [&_pre]:m-0 [&_pre]:overflow-x-visible [&_pre]:!bg-transparent [&_pre]:p-4"
      v-html="html"
    />
    <!-- 回退：纯文本 -->
    <pre v-else class="max-h-[560px] overflow-auto p-4 text-[13px] leading-relaxed text-zinc-100"><code>{{ code }}</code></pre>
  </div>
</template>
