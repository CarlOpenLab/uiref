<script setup lang="ts">
// factor 缩小倍数：内容按容器 factor 倍的尺寸排版，再等比缩回容器大小
const { factor = 2, centered = false } = defineProps<{
  /** 缩小倍数：内容按容器 factor 倍的尺寸排版，再等比缩回容器大小 */
  factor?: number
  /** 组件缩略图：在画布中居中、底部渐隐；整页模板：铺满画布 */
  centered?: boolean
}>()

const canvasStyle = computed(() => ({
  width: `${factor * 100}%`,
  height: `${factor * 100}%`,
  transform: `scale(${1 / factor})`,
}))
</script>

<template>
  <!-- 纯视觉缩略图：inert 禁止交互与聚焦，aria-hidden 对读屏隐藏；冻结内部动画，几十张卡片同屏时不空转 -->
  <div
    class="freeze-animations absolute inset-0 animate-fade-in overflow-hidden"
    :class="centered ? '[mask-image:linear-gradient(to_bottom,#000_72%,transparent)]' : ''"
    aria-hidden="true"
  >
    <div
      inert
      class="absolute left-0 top-0 origin-top-left"
      :class="centered ? 'flex flex-col items-center justify-center-safe p-10' : ''"
      :style="canvasStyle"
    >
      <slot />
    </div>
  </div>
</template>
