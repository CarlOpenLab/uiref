/**
 * 路由名 → 实际渲染的 Demo 组件（异步加载：每个页面只下载自己渲染的 demo，SSR 照常直出）。
 * 新增条目时在 registry/index.ts 加元数据，在这里加一行映射。
 */
import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
import { isPattern } from '#shared/registry-meta'
import type { MetaEntry } from '#shared/registry-meta'

export const demoMap: Record<string, Component> = {
  button: defineAsyncComponent(() => import('~/components/demo/DemoButton.vue')),
  badge: defineAsyncComponent(() => import('~/components/demo/DemoBadge.vue')),
  input: defineAsyncComponent(() => import('~/components/demo/DemoInput.vue')),
  card: defineAsyncComponent(() => import('~/components/demo/DemoCard.vue')),
  tabs: defineAsyncComponent(() => import('~/components/demo/DemoTabs.vue')),
  alert: defineAsyncComponent(() => import('~/components/demo/DemoAlert.vue')),
  modal: defineAsyncComponent(() => import('~/components/demo/DemoModal.vue')),
  table: defineAsyncComponent(() => import('~/components/demo/DemoTable.vue')),
  sender: defineAsyncComponent(() => import('~/components/demo/DemoSender.vue')),
  'agent-message': defineAsyncComponent(() => import('~/components/demo/DemoAgentMessage.vue')),
  thinking: defineAsyncComponent(() => import('~/components/demo/DemoThinking.vue')),
  'stream-text': defineAsyncComponent(() => import('~/components/demo/DemoStreamText.vue')),
  'tool-call': defineAsyncComponent(() => import('~/components/demo/DemoToolCall.vue')),
  'quick-replies': defineAsyncComponent(() => import('~/components/demo/DemoQuickReplies.vue')),
  permission: defineAsyncComponent(() => import('~/components/demo/DemoPermission.vue')),
  'task-list': defineAsyncComponent(() => import('~/components/demo/DemoTaskList.vue')),
  'code-diff': defineAsyncComponent(() => import('~/components/demo/DemoCodeDiff.vue')),
  'terminal-block': defineAsyncComponent(() => import('~/components/demo/DemoTerminalBlock.vue')),
  'browser-step': defineAsyncComponent(() => import('~/components/demo/DemoBrowserStep.vue')),
  attachments: defineAsyncComponent(() => import('~/components/demo/DemoAttachments.vue')),
  'model-picker': defineAsyncComponent(() => import('~/components/demo/DemoModelPicker.vue')),
  sources: defineAsyncComponent(() => import('~/components/demo/DemoSources.vue')),
  toast: defineAsyncComponent(() => import('~/components/demo/DemoToast.vue')),
  skeleton: defineAsyncComponent(() => import('~/components/demo/DemoSkeleton.vue')),
  select: defineAsyncComponent(() => import('~/components/demo/DemoSelect.vue')),
  checkbox: defineAsyncComponent(() => import('~/components/demo/DemoCheckbox.vue')),
  pagination: defineAsyncComponent(() => import('~/components/demo/DemoPagination.vue')),
}

export const patternDemoMap: Record<string, Component> = {
  login: defineAsyncComponent(() => import('~/components/patterns/PatternLogin.vue')),
  dashboard: defineAsyncComponent(() => import('~/components/patterns/PatternDashboard.vue')),
  'agent-workspace': defineAsyncComponent(() => import('~/components/patterns/PatternAgentWorkspace.vue')),
  landing: defineAsyncComponent(() => import('~/components/patterns/PatternLanding.vue')),
}

/**
 * @description 取条目对应的渲染组件：页面模板查 patternDemoMap，组件查 demoMap
 * @param {MetaEntry} entry - 注册表条目
 * @returns {Component | undefined} 渲染组件；映射里没登记时为 undefined
 */
export function demoFor(entry: MetaEntry): Component | undefined {
  return (isPattern(entry) ? patternDemoMap : demoMap)[entry.name]
}
