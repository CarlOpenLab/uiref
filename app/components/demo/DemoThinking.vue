<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <div class="w-full max-w-xl space-y-4">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">思考中（脉冲动画）</h3>
      <UThinking class="mt-3" status="thinking">
        用户要三档价格表……需要确认主色和是否有年付折扣，我先按常见 SaaS 定价页结构推进。
      </UThinking>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">完成态（默认收起，点击展开）</h3>
      <UThinking class="mt-3" status="done" duration="4.2s">
        用户要三档价格表：免费 / 专业 / 企业。专业档做推荐高亮，年付切九折；
        技术上沿用现有 PlanCard 组件，只需新增 featured 属性和年付切换逻辑。
      </UThinking>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">默认展开</h3>
      <UThinking class="mt-3" status="done" duration="1.8s" :default-open="open">
        这里是默认展开的思考内容，适合希望用户直接看到推理过程的场景。
      </UThinking>
    </section>
  </div>
</template>
