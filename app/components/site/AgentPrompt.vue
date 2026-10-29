<script setup lang="ts">
const props = defineProps<{
  /** 可直接复制给编码 Agent 的提示词，见 registry 的 componentPrompt / patternPrompt */
  prompt: string
}>()
</script>

<template>
  <section id="prompt" class="rounded-xl border border-indigo-200 bg-gradient-to-b from-indigo-50 to-white p-5 sm:p-6">
    <div class="flex flex-wrap items-start gap-4">
      <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/30">
        <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        </svg>
      </span>
      <div class="min-w-0 flex-1">
        <h2 class="text-lg font-semibold text-zinc-900">给 Agent 的使用提示</h2>
        <p class="mt-1 text-sm leading-relaxed text-zinc-600">
          复制提示词发给任何编码 Agent，它会按这套范式的源码与样式基准来生成 UI。
        </p>
      </div>
      <CopyButton
        class="h-9 rounded-lg bg-indigo-600 px-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500"
        :text="prompt"
        label="复制提示词"
      />
    </div>

    <pre class="mt-5 overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-indigo-100 bg-white p-4 font-mono text-[13px] leading-relaxed text-zinc-700">{{ prompt }}</pre>
  </section>
</template>
