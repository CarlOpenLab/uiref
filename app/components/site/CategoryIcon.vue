<script setup lang="ts">
const props = defineProps<{
  /** 分类 id（见 shared/registry-meta.ts），另有 all = 全部组件、pattern = 页面模板 */
  id: string
}>()

const square = 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z'

/** 分类 → 图标路径（lucide 风格 24×24 描边）。新增分类不必在此登记，会回退为通用方块 */
const icons: Record<string, string[]> = {
  all: [
    'M4 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
    'M15 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
    'M15 14h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z',
    'M4 14h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z',
  ],
  basic: [
    'M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z',
    'm12 2 3.5 3.5L12 9 8.5 5.5 12 2Z',
    'M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z',
    'm12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z',
  ],
  agent: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'M13 8H7', 'M17 12H7'],
  'agent-exec': [square, 'm7 11 2-2-2-2', 'M11 13h4'],
  form: [square, 'm9 12 2 2 4-4'],
  layout: [square, 'M3 9h18', 'M9 21V9'],
  navigation: [
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z',
    'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
  ],
  feedback: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  data: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
  pattern: [
    'M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
    'M4 14h7a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z',
    'M17 14h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z',
  ],
}

const paths = computed(() => icons[props.id] ?? [square])
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="d in paths" :key="d" :d="d" />
  </svg>
</template>
