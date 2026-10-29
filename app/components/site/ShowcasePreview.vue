<script setup lang="ts">
/** 递增即重挂载 demo，恢复初始状态 */
const version = ref(0)
</script>

<template>
  <!-- 不加 overflow-hidden：下拉菜单等浮层需要能溢出画布 -->
  <div class="rounded-xl border border-zinc-200 bg-white shadow-sm">
    <div class="flex h-11 items-center gap-2 rounded-t-xl border-b border-zinc-200 px-4">
      <span class="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
      <span class="text-xs font-medium text-zinc-700">实时预览</span>
      <span class="hidden text-xs text-zinc-400 sm:inline">· 可直接交互</span>
      <ResetButton class="ml-auto" @click="version++" />
    </div>

    <!-- 画布：点阵底纹 + 内容水平居中，短内容垂直居中 -->
    <div class="bg-dots flex min-h-72 items-center rounded-b-xl bg-zinc-50/60 px-5 py-12 sm:px-10">
      <div :key="version" class="flex w-full justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>
