<template>
  <div class="w-full max-w-xl space-y-3">
    <section>
      <h3 class="mb-3 text-sm font-medium text-zinc-900">三种状态（点击展开参数与结果）</h3>

      <UToolCall
        name="web_search"
        args='{"query": "Nuxt 4 release notes"}'
        status="running"
      />

      <UToolCall
        class="mt-2"
        name="write_file"
        args='{"path": "app/components/PriceTable.vue", "lines": 128}'
        status="success"
        duration="0.8s"
        result="✓ File written successfully (128 lines)"
      />

      <UToolCall
        class="mt-2"
        name="fetch_api"
        args='{"url": "https://api.example.com/v1/pricing"}'
        status="error"
        duration="3.2s"
        result="Error: 502 Bad Gateway"
      />
    </section>
  </div>
</template>
