<template>
  <!-- 组件预览壳：细点阵底纹，提示「这是可交互画布」 -->
  <div
    class="rounded-xl border border-zinc-200 bg-white p-8"
    style="background-image: radial-gradient(circle, rgb(0 0 0 / 0.05) 1px, transparent 1px); background-size: 18px 18px;"
  >
    <slot />
  </div>
</template>
