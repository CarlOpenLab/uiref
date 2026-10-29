<template>
  <!-- 预览区「重置」：使用方在点击时递增 demo 外层的 key，重挂载回初始状态 -->
  <button
    type="button"
    class="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs text-zinc-500 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900"
  >
    <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
      <path d="M3 3v5h5" />
    </svg>
    重置
  </button>
</template>
