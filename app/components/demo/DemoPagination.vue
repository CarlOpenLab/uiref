<script setup lang="ts">
const page = ref(5)
</script>

<template>
  <div class="w-full max-w-xl space-y-8">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">总页数较多（带省略号折叠）</h3>
      <UPagination v-model="page" :total="12" class="mt-3" />
      <p class="mt-3 text-xs text-zinc-500">第 {{ page }} / 12 页</p>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">总页数较少（全部展示）</h3>
      <UPagination v-model="page" :total="4" class="mt-3" />
    </section>
  </div>
</template>
