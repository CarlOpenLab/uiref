<script setup lang="ts">
const model = ref('glm-5')

const modelOptions = [
  { id: 'glm-5', name: 'GLM-5', description: '综合能力最强', group: '旗舰' },
  { id: 'glm-flash', name: 'GLM Flash', description: '响应最快', group: '旗舰' },
]

const sessions = [
  { title: '落地页深色重构', time: '10:24', active: true },
  { title: 'API 报错排查', time: '09:12', active: false },
  { title: '文档站迁移', time: '昨天', active: false },
]

const tasks = [
  { id: '1', text: '梳理现有落地页结构', status: 'completed' },
  { id: '2', text: '应用深色主题 tokens', status: 'completed' },
  { id: '3', text: '生成价格表组件', status: 'in_progress' },
  { id: '4', text: '整体视觉走查', status: 'pending' },
]

const text = ref('')
const busy = ref(false)
const extraMessages = ref<string[]>([])

function send(value: string) {
  extraMessages.value.push(value)
  busy.value = true
  setTimeout(() => (busy.value = false), 1200)
}
</script>

<template>
  <div class="flex h-full min-h-[620px] bg-zinc-50 text-zinc-900">
    <!-- 会话侧边栏 -->
    <aside class="hidden w-56 shrink-0 flex-col border-r border-zinc-200 bg-white p-3 sm:flex">
      <div class="flex items-center gap-2 px-2 py-1.5">
        <span class="flex size-7 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white">U</span>
        <span class="text-sm font-semibold">UIRef Agent</span>
      </div>
      <UButton size="sm" block class="mt-4">＋ 新建会话</UButton>
      <nav class="mt-4 flex-1 space-y-1">
        <button
          v-for="session in sessions"
          :key="session.title"
          type="button"
          class="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors"
          :class="session.active ? 'bg-indigo-50' : 'hover:bg-zinc-100'"
        >
          <span class="truncate text-sm" :class="session.active ? 'font-medium text-indigo-700' : 'text-zinc-700'">
            {{ session.title }}
          </span>
          <span class="text-[11px] text-zinc-400">{{ session.time }}</span>
        </button>
      </nav>
      <div class="flex items-center gap-2.5 border-t border-zinc-100 px-2 pt-3">
        <span class="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600">陈</span>
        <span class="text-xs font-medium text-zinc-700">陈晨</span>
      </div>
    </aside>

    <!-- 主区域 -->
    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-14 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white px-5">
        <h1 class="truncate text-sm font-semibold">落地页深色重构</h1>
        <UModelPicker v-model="model" :options="modelOptions" class="ml-auto" />
        <UButton size="sm" variant="outline">分享</UButton>
      </header>

      <!-- 对话线程 -->
      <div class="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
        <UAgentMessage role="user">
          <p>帮我把落地页改成深色风格，并生成一个三档价格表。</p>
        </UAgentMessage>

        <UAgentMessage name="UIRef Agent">
          <div class="space-y-4">
            <UThinking status="done" duration="3.4s">
              深色主题先抽 tokens（背景 zinc-950、卡片 zinc-900），价格表沿用 PlanCard
              结构加 featured 高亮。分四步执行，先改 tokens 再生成组件。
            </UThinking>

            <UTaskList :items="tasks" />

            <UToolCall
              name="write_file"
              args='{"path": "app/assets/css/dark-tokens.css"}'
              status="success"
              duration="0.6s"
              result="✓ File written successfully (42 lines)"
            />

            <p class="text-sm leading-relaxed text-zinc-800">
              深色 tokens 已就位，价格表组件正在生成，预计 1 分钟内完成。
            </p>
          </div>
        </UAgentMessage>

        <UQuickReplies :items="['加一个企业版定制入口', '价格表支持年付切换', '生成深色模式截图']" />

        <UAgentMessage v-for="(message, index) in extraMessages" :key="index" role="user">
          <p>{{ message }}</p>
        </UAgentMessage>
      </div>

      <!-- 输入器 -->
      <div class="shrink-0 border-t border-zinc-200 bg-white p-4">
        <USender v-model="text" :loading="busy" placeholder="继续下达指令…" @submit="send" />
      </div>
    </div>
  </div>
</template>
