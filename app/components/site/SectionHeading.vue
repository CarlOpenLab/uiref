<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 眉题：区块上方的小字标签 */
    kicker: string
    /** 区块标题 */
    title: string
    /** 标题下的说明文字 */
    description?: string
    /** 标题级别：页面头部用 h1，区块用 h2 */
    heading?: 'h1' | 'h2'
  }>(),
  {
    heading: 'h2',
  },
)
</script>

<template>
  <div>
    <p class="text-sm font-semibold text-indigo-600">{{ kicker }}</p>
    <component
      :is="heading"
      class="mt-2 text-3xl font-bold tracking-tight text-zinc-950"
      :class="heading === 'h1' ? 'sm:text-4xl' : ''"
    >
      {{ title }}
    </component>
    <p v-if="description" class="mt-3 max-w-2xl leading-relaxed text-zinc-600">{{ description }}</p>
  </div>
</template>
