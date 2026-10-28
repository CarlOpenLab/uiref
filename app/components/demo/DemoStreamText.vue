<script setup lang="ts">
const sample =
  '好的，我来实现价格表：① 三档定价卡片，推荐档高亮；② 月付 / 年付切换，年付显示九折角标；③ 底部加一行企业版联系入口。现在开始生成代码……'

const streamOn = ref(true)
const round = ref(0)

function replay() {
  round.value++
}
</script>

<template>
  <div class="w-full max-w-xl space-y-4">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">流式输出（打字机 + 呼吸光标）</h3>
      <div class="mt-3 rounded-xl border border-zinc-200 bg-white p-4">
        <!-- 用 key 强制重挂载实现重播 -->
        <UStreamText :key="round" :text="sample" :streaming="streamOn" />
      </div>
      <div class="mt-3 flex gap-2">
        <UButton size="sm" variant="outline" @click="replay">重播</UButton>
        <UButton size="sm" variant="outline" @click="streamOn = !streamOn">
          {{ streamOn ? '跳过动画（streaming = false）' : '恢复流式（streaming = true）' }}
        </UButton>
      </div>
    </section>
  </div>
</template>
