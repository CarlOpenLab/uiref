<script setup lang="ts">
import { categories, components, patterns } from '#shared/registry-meta'

type TaskStatus = 'pending' | 'in_progress' | 'completed'

/** 工具调用的返回结果：直接取注册表实时数量 */
const registrySummary = `${components.length} components · ${patterns.length} patterns · ${categories.length} categories`

const tasks: Array<{ id: string; text: string; status: TaskStatus }> = [
  { id: '1', text: '读取 /api/registry 物料', status: 'completed' },
  { id: '2', text: '对齐 zinc + indigo 样式基准', status: 'completed' },
  { id: '3', text: '生成三档价格表组件', status: 'in_progress' },
]

const text = ref('')
const busy = ref(false)
const sent = ref<string[]>([])
const thread = ref<HTMLElement | null>(null)

/**
 * @description 模拟一次发送：指令追加到对话线程并滚到底部，发送器短暂进入「生成中」态
 * @param {string} value - 用户输入的指令
 * @returns {void}
 */
function send(value: string): void {
  sent.value.push(value)
  busy.value = true
  nextTick(() => thread.value?.scrollTo({ top: thread.value.scrollHeight, behavior: 'smooth' }))
  setTimeout(() => (busy.value = false), 1200)
}
</script>

<template>
  <!-- Hero 演示窗：完全由本库组件拼装，标签可点进对应组件页 -->
  <div class="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-indigo-950/10">
    <div class="flex h-11 items-center gap-3 border-b border-zinc-200 bg-zinc-50/80 px-4">
      <div class="flex gap-1.5" aria-hidden="true">
        <span v-for="n in 3" :key="n" class="size-2.5 rounded-full bg-zinc-300" />
      </div>
      <span class="truncate text-xs font-medium text-zinc-600">UIRef Agent · 定价页</span>
      <UBadge class="ml-auto" tone="indigo" size="sm" dot>由 UIRef 组件拼装</UBadge>
    </div>

    <div ref="thread" class="scrollbar-thin h-[27rem] space-y-5 overflow-y-auto px-5 pb-5 pt-6">
      <UAgentMessage role="user">
        <p>做一个深色风格的 SaaS 定价页，要三档价格。</p>
      </UAgentMessage>

      <UAgentMessage name="UIRef Agent" time="刚刚">
        <!-- 消息内容默认按内容收缩，这里给定宽度让卡片铺开 -->
        <div class="w-[26rem] max-w-full space-y-4">
          <AnnotatedBlock name="thinking">
            <UThinking status="done" duration="2.1s">
              先从 /api/registry 拿到价格卡片与按钮范式，再按 zinc + indigo 基准生成深色变体，推荐档做高亮。
            </UThinking>
          </AnnotatedBlock>
          <AnnotatedBlock name="task-list">
            <UTaskList :items="tasks" />
          </AnnotatedBlock>
          <AnnotatedBlock name="tool-call">
            <UToolCall
              name="fetch_registry"
              args='{"url": "/api/registry"}'
              status="success"
              duration="0.4s"
              :result="registrySummary"
            />
          </AnnotatedBlock>
          <UStreamText text="物料已就绪，正在按 UIRef 范式生成 PricingPage.vue……" :speed="60" />
        </div>
      </UAgentMessage>

      <UAgentMessage v-for="(message, index) in sent" :key="index" role="user">
        <p>{{ message }}</p>
      </UAgentMessage>
    </div>

    <div class="border-t border-zinc-200 p-3.5">
      <AnnotatedBlock name="sender">
        <USender v-model="text" :loading="busy" placeholder="试着输入一句指令…" @submit="send" />
      </AnnotatedBlock>
    </div>
  </div>
</template>
