<script setup lang="ts">
import { toPascal } from '#shared/registry-meta'

const props = defineProps<{
  /** 组件路由名：标签显示为 U<Name>，并链接到 /components/<name> */
  name: string
}>()
</script>

<template>
  <!-- 标注层：像设计稿审查一样标出这块是哪个库组件，悬停显示虚线框 -->
  <div
    class="group/anno relative rounded-xl outline-1 outline-offset-4 outline-transparent outline-dashed transition-[outline-color] hover:outline-indigo-400"
  >
    <NuxtLink
      :to="`/components/${name}`"
      class="absolute -top-2 right-3 z-10 rounded border border-indigo-200 bg-white px-1.5 font-mono text-[10px] font-medium leading-4 text-indigo-600 shadow-sm transition-colors group-hover/anno:border-indigo-600 group-hover/anno:bg-indigo-600 group-hover/anno:text-white"
    >
      U{{ toPascal(name) }}
    </NuxtLink>
    <slot />
  </div>
</template>
