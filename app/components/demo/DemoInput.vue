<script setup lang="ts">
const value = ref('')
const search = ref('')
</script>

<template>
  <div class="space-y-8">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">受控输入（v-model）</h3>
      <div class="mt-3 w-80 space-y-3">
        <UInput v-model="value" placeholder="请输入用户名" />
        <p class="text-xs text-zinc-500">当前值：{{ value || '（空）' }}</p>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">尺寸</h3>
      <div class="mt-3 w-80 space-y-3">
        <UInput v-model="search" size="sm" placeholder="小号 sm" />
        <UInput size="md" placeholder="中号 md（默认）" />
        <UInput size="lg" placeholder="大号 lg" />
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">错误态与禁用</h3>
      <div class="mt-3 w-80 space-y-3">
        <UInput invalid model-value="不是合法的邮箱地址" />
        <UInput disabled model-value="不可编辑" />
      </div>
    </section>
  </div>
</template>
