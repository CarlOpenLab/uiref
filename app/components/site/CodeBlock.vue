<script setup lang="ts">
interface CodeFile {
  /** 多文件时作为 tab 文案，如「用法示例」 */
  label?: string
  /** 文件路径，显示在头部 */
  filename: string
  code: string
}

const props = defineProps<{
  /** 单文件：头部显示文件路径；多文件：头部显示 tab。所有文件都会 SSR 输出（v-show 切换），Agent 抓 HTML 不丢源码 */
  files: CodeFile[]
}>()

const uid = useId()
const active = ref(0)
const current = computed(() => props.files[active.value]!)

/**
 * @description 简单字符串哈希（djb2），作为 useFetch 的去重 key
 * @param {string} text - 待哈希的文本
 * @returns {string} 36 进制哈希串
 */
function hash(text: string): string {
  let h = 5381
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h + text.charCodeAt(i)) | 0
  }
  return Math.abs(h).toString(36)
}

// SSR 期间一次请求高亮全部文件，拿到 shiki 的彩色 HTML；失败回退纯文本
const blocks = props.files.map((file) => ({ code: file.code.trimEnd(), lang: 'vue' }))
const { data } = await useFetch('/api/highlight', {
  key: `hl-${hash(blocks.map((block) => `${block.lang}:${block.code}`).join('\n'))}`,
  method: 'POST',
  body: { blocks },
})
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm">
    <div class="flex h-11 items-center gap-3 border-b border-zinc-800 px-2">
      <div v-if="files.length > 1" class="flex shrink-0 items-center gap-1" role="tablist" aria-label="源码文件">
        <button
          v-for="(file, index) in files"
          :id="`${uid}-tab-${index}`"
          :key="file.filename"
          type="button"
          role="tab"
          :aria-selected="index === active"
          :aria-controls="`${uid}-panel-${index}`"
          class="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
          :class="index === active ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'"
          @click="active = index"
        >
          {{ file.label ?? file.filename }}
        </button>
      </div>

      <span
        class="min-w-0 items-center gap-2 font-mono text-xs text-zinc-500"
        :class="files.length > 1 ? 'hidden sm:flex' : 'flex pl-2'"
      >
        <svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
        </svg>
        <span class="truncate">{{ current.filename }}</span>
      </span>

      <CopyButton
        class="ml-auto h-7 rounded-md px-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        :text="current.code"
      />
    </div>

    <div
      v-for="(file, index) in files"
      v-show="index === active"
      :id="`${uid}-panel-${index}`"
      :key="file.filename"
      :role="files.length > 1 ? 'tabpanel' : undefined"
      :aria-labelledby="files.length > 1 ? `${uid}-tab-${index}` : undefined"
    >
      <!-- shiki 高亮结果（自带 tabindex，键盘可滚动） -->
      <div
        v-if="data?.html?.[index]"
        class="code-lines text-[13px] leading-relaxed [&_code]:font-mono [&_pre]:scrollbar-thin [&_pre]:m-0 [&_pre]:max-h-[36rem] [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:py-4 [&_pre]:pl-2 [&_pre]:pr-6"
        v-html="data.html[index]"
      />
      <!-- 回退：纯文本 -->
      <pre
        v-else
        tabindex="0"
        class="scrollbar-thin max-h-[36rem] overflow-auto p-4 text-[13px] leading-relaxed text-zinc-100"
      ><code>{{ file.code }}</code></pre>
    </div>
  </div>
</template>
