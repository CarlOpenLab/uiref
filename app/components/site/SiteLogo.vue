<script setup lang="ts">
import { siteMeta } from '#shared/registry-meta'
</script>

<template>
  <!-- 顶栏 / 页脚共用的品牌标识：靛蓝方块 + 站名 -->
  <span
    class="flex size-7 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white shadow-sm shadow-indigo-600/30"
    aria-hidden="true"
  >
    U
  </span>
  <span class="font-semibold tracking-tight">{{ siteMeta.title }}</span>
</template>
