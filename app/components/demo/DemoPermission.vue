<script setup lang="ts">
const result = ref('')

function onApprove(mode: 'once' | 'always') {
  result.value = mode === 'once' ? '✓ 已允许本次执行' : '✓ 已加入白名单，后续同类操作自动放行'
}

function onDeny() {
  result.value = '✗ 已拒绝，Agent 停止了该操作'
}
</script>

<template>
  <div class="w-full max-w-xl space-y-6">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">中风险（可交互）</h3>
      <UPermission
        class="mt-3"
        tool="Bash"
        action="npm install @nuxtjs/tailwindcss"
        risk="medium"
        @approve="onApprove"
        @deny="onDeny"
      />
      <p v-if="result" class="mt-2 font-mono text-xs text-zinc-500">{{ result }}</p>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">高风险</h3>
      <UPermission
        class="mt-3"
        tool="Bash"
        action="rm -rf dist && npx api deploy --prod"
        risk="high"
        description="该操作会清空构建产物并直接部署到生产环境："
        @approve="onApprove"
        @deny="onDeny"
      />
    </section>
  </div>
</template>
