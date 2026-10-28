<script setup lang="ts">
const status = ref<'pending' | 'applied' | 'rejected'>('pending')

const diff = `@@ -12,7 +12,21 @@
 <section class="pricing">
-  <h2>价格</h2>
+  <h2 class="text-2xl font-bold">选择适合你的方案</h2>
+  <div class="mt-2 flex gap-2">
+    <PlanToggle v-model="billing" />
+  </div>
+  <div class="mt-6 grid grid-cols-3 gap-4">
+    <PlanCard name="免费" price="0" />
+    <PlanCard name="专业" price="99" featured />
+    <PlanCard name="企业" price="联系我们" />
+  </div>
 </section>`

const diffApplied = '+  <UBadge v-if="featured" tone="indigo" size="sm">推荐</UBadge>'
</script>

<template>
  <div class="w-full max-w-xl space-y-6">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">待审核（带接受 / 拒绝操作）</h3>
      <UCodeDiff
        class="mt-3"
        file="app/pages/pricing.vue"
        :additions="9"
        :deletions="1"
        :diff="diff"
        :status="status"
      >
        <template #actions>
          <UButton size="sm" variant="ghost" @click="status = 'rejected'">拒绝</UButton>
          <UButton size="sm" @click="status = 'applied'">接受改动</UButton>
        </template>
      </UCodeDiff>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">已应用</h3>
      <UCodeDiff
        class="mt-3"
        file="app/components/PlanCard.vue"
        :additions="4"
        :deletions="0"
        status="applied"
        :diff="diffApplied"
      />
    </section>
  </div>
</template>
