<script setup lang="ts">
interface ChatMessage {
  id: number
  role: 'user' | 'agent'
  content: string
}

// 第一节：在对话流中的用法（模拟 Agent 回复）
const text = ref('')
const busy = ref(false)
const messages = ref<ChatMessage[]>([
  { id: 1, role: 'user', content: '做一个 SaaS 落地页，深色风格，要带价格表。' },
  { id: 2, role: 'agent', content: '好的。确认两点：① 主色用 indigo 还是 emerald？② 价格表需要年付 / 月付切换吗？' },
])

function send(value: string) {
  messages.value.push({ id: Date.now(), role: 'user', content: value })
  busy.value = true
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'agent',
      content: '收到，开始生成。你可以继续补充细节，我会实时应用。',
    })
    busy.value = false
  }, 900)
}

// 第二节：生成中 → 停止按钮
const streamText = ref('')
const streaming = ref(true)

// 第三节：自定义工具栏
const chip =
  'flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition-colors'
const chipDefault = 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
const chipActive = 'border-indigo-200 bg-indigo-50 text-indigo-700'
const iconBtn =
  'flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800'
const customText = ref('')
const deepThink = ref(true)
</script>

<template>
  <div class="space-y-10">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">对话场景（Enter 发送，模拟 Agent 回复）</h3>
      <div class="mt-3 w-full max-w-xl rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <div class="h-56 space-y-3 overflow-y-auto pr-1">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <p
              class="max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed"
              :class="
                msg.role === 'user'
                  ? 'rounded-br-md bg-indigo-600 text-white'
                  : 'rounded-bl-md border border-zinc-200 bg-white text-zinc-800'
              "
            >
              {{ msg.content }}
            </p>
          </div>
        </div>
        <USender v-model="text" class="mt-3" :loading="busy" @submit="send" />
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">生成中（发送按钮变停止按钮）</h3>
      <div class="mt-3 w-full max-w-xl">
        <USender
          v-model="streamText"
          :loading="streaming"
          placeholder="Agent 正在生成中，点右侧按钮可停止…"
          @stop="streaming = false"
        />
        <UButton variant="outline" size="sm" class="mt-3" @click="streaming = !streaming">
          切换 loading = {{ streaming }}
        </UButton>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">自定义工具栏与提示（#toolbar / #hint 插槽）</h3>
      <div class="mt-3 w-full max-w-xl">
        <USender v-model="customText" placeholder="描述你要生成的页面…">
          <template #toolbar>
            <button type="button" :class="[chip, chipDefault]" aria-label="选择模型">
              <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Flash 2.5
              <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              :class="[chip, deepThink ? chipActive : chipDefault]"
              @click="deepThink = !deepThink"
            >
              <svg class="size-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
              </svg>
              深度思考
            </button>
            <button type="button" :class="iconBtn" aria-label="添加附件">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l8.49-8.48a4 4 0 1 1 5.66 5.65l-8.49 8.49a2 2 0 0 1-2.83-2.83l7.78-7.78" />
              </svg>
            </button>
          </template>
          <template #hint>
            <p class="hidden text-xs text-zinc-400 sm:block">回复由 AI 生成，请注意甄别</p>
          </template>
        </USender>
      </div>
    </section>
  </div>
</template>
