<script setup lang="ts">
const loading = ref(true)
</script>

<template>
  <div class="space-y-8">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">变体</h3>
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <UButton variant="primary">主要操作</UButton>
        <UButton variant="secondary">次要操作</UButton>
        <UButton variant="outline">描边按钮</UButton>
        <UButton variant="ghost">幽灵按钮</UButton>
        <UButton variant="danger">危险操作</UButton>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">尺寸</h3>
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <UButton size="sm">小号</UButton>
        <UButton size="md">中号（默认）</UButton>
        <UButton size="lg">大号</UButton>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">状态</h3>
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <UButton disabled>禁用</UButton>
        <UButton :loading="loading">加载中</UButton>
        <UButton variant="outline" @click="loading = !loading">切换 loading</UButton>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">整行（block）</h3>
      <div class="mt-3 w-72">
        <UButton block>提交表单</UButton>
      </div>
    </section>
  </div>
</template>
