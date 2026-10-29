<script setup lang="ts">
const props = defineProps<{
  /** 端点地址：静态文件（/llms.txt）或服务端路由（/api/registry），整页跳转 */
  href: string
  /** 请求方法前缀，如 GET；不传则不显示 */
  method?: string
}>()
</script>

<template>
  <!-- 顶栏与首页 Hero 的接口徽标：等宽字体 + 可选方法前缀 -->
  <a
    :href="href"
    class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 font-mono text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
  >
    <span v-if="method" class="font-semibold text-indigo-600">{{ method }}</span><slot />
  </a>
</template>
