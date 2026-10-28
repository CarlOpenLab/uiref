<script setup lang="ts">
const agreed = ref(false)
const newsletter = ref(true)
</script>

<template>
  <div class="w-full max-w-xl space-y-4">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">受控 + 禁用态</h3>
      <div class="mt-3 space-y-3">
        <UCheckbox v-model="agreed" label="我已阅读并同意服务条款" />
        <UCheckbox v-model="newsletter" label="订阅产品更新邮件" />
        <UCheckbox model-value label="禁用（选中）" disabled />
        <UCheckbox :model-value="false" label="禁用（未选中）" disabled />
      </div>
      <p class="mt-3 text-xs text-zinc-500">agreed = {{ agreed }} · newsletter = {{ newsletter }}</p>
    </section>
  </div>
</template>
