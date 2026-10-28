/**
 * app 端注册表：把 shared 元数据与真实源码（?raw 导入，保证与组件文件永远同步）合并。
 * 页面从这里取条目渲染详情页，不要直接 import 单个组件。
 */
import { categories, components, patterns, toPascal } from '#shared/registry-meta'
import type { CategoryMeta, MetaEntry } from '#shared/registry-meta'

import buttonSource from '~/components/ui/UButton.vue?raw'
import buttonUsage from '~/components/demo/DemoButton.vue?raw'
import badgeSource from '~/components/ui/UBadge.vue?raw'
import badgeUsage from '~/components/demo/DemoBadge.vue?raw'
import inputSource from '~/components/ui/UInput.vue?raw'
import inputUsage from '~/components/demo/DemoInput.vue?raw'
import cardSource from '~/components/ui/UCard.vue?raw'
import cardUsage from '~/components/demo/DemoCard.vue?raw'
import tabsSource from '~/components/ui/UTabs.vue?raw'
import tabsUsage from '~/components/demo/DemoTabs.vue?raw'
import alertSource from '~/components/ui/UAlert.vue?raw'
import alertUsage from '~/components/demo/DemoAlert.vue?raw'
import modalSource from '~/components/ui/UModal.vue?raw'
import modalUsage from '~/components/demo/DemoModal.vue?raw'
import tableSource from '~/components/ui/UTable.vue?raw'
import tableUsage from '~/components/demo/DemoTable.vue?raw'
import senderSource from '~/components/ui/USender.vue?raw'
import senderUsage from '~/components/demo/DemoSender.vue?raw'
import agentMessageSource from '~/components/ui/UAgentMessage.vue?raw'
import agentMessageUsage from '~/components/demo/DemoAgentMessage.vue?raw'
import thinkingSource from '~/components/ui/UThinking.vue?raw'
import thinkingUsage from '~/components/demo/DemoThinking.vue?raw'
import streamTextSource from '~/components/ui/UStreamText.vue?raw'
import streamTextUsage from '~/components/demo/DemoStreamText.vue?raw'
import toolCallSource from '~/components/ui/UToolCall.vue?raw'
import toolCallUsage from '~/components/demo/DemoToolCall.vue?raw'
import quickRepliesSource from '~/components/ui/UQuickReplies.vue?raw'
import quickRepliesUsage from '~/components/demo/DemoQuickReplies.vue?raw'
import permissionSource from '~/components/ui/UPermission.vue?raw'
import permissionUsage from '~/components/demo/DemoPermission.vue?raw'
import taskListSource from '~/components/ui/UTaskList.vue?raw'
import taskListUsage from '~/components/demo/DemoTaskList.vue?raw'
import codeDiffSource from '~/components/ui/UCodeDiff.vue?raw'
import codeDiffUsage from '~/components/demo/DemoCodeDiff.vue?raw'
import terminalBlockSource from '~/components/ui/UTerminalBlock.vue?raw'
import terminalBlockUsage from '~/components/demo/DemoTerminalBlock.vue?raw'
import browserStepSource from '~/components/ui/UBrowserStep.vue?raw'
import browserStepUsage from '~/components/demo/DemoBrowserStep.vue?raw'
import attachmentsSource from '~/components/ui/UAttachments.vue?raw'
import attachmentsUsage from '~/components/demo/DemoAttachments.vue?raw'
import modelPickerSource from '~/components/ui/UModelPicker.vue?raw'
import modelPickerUsage from '~/components/demo/DemoModelPicker.vue?raw'
import sourcesSource from '~/components/ui/USources.vue?raw'
import sourcesUsage from '~/components/demo/DemoSources.vue?raw'
import toastSource from '~/components/ui/UToast.vue?raw'
import toastUsage from '~/components/demo/DemoToast.vue?raw'
import skeletonSource from '~/components/ui/USkeleton.vue?raw'
import skeletonUsage from '~/components/demo/DemoSkeleton.vue?raw'
import selectSource from '~/components/ui/USelect.vue?raw'
import selectUsage from '~/components/demo/DemoSelect.vue?raw'
import checkboxSource from '~/components/ui/UCheckbox.vue?raw'
import checkboxUsage from '~/components/demo/DemoCheckbox.vue?raw'
import paginationSource from '~/components/ui/UPagination.vue?raw'
import paginationUsage from '~/components/demo/DemoPagination.vue?raw'
import agentWorkspaceSource from '~/components/patterns/PatternAgentWorkspace.vue?raw'
import landingSource from '~/components/patterns/PatternLanding.vue?raw'
import loginSource from '~/components/patterns/PatternLogin.vue?raw'
import dashboardSource from '~/components/patterns/PatternDashboard.vue?raw'

export { categories }
export type { CategoryMeta, MetaEntry }

export interface RegistryEntry extends MetaEntry {
  /** 组件源码（app/components/ui/） */
  source: string
  /** 用法示例源码（app/components/demo/） */
  usage: string
}

export interface PatternEntry extends MetaEntry {
  /** 页面模板源码（app/components/patterns/） */
  source: string
}

const sourceMap: Record<string, { source: string; usage: string }> = {
  button: { source: buttonSource, usage: buttonUsage },
  badge: { source: badgeSource, usage: badgeUsage },
  input: { source: inputSource, usage: inputUsage },
  card: { source: cardSource, usage: cardUsage },
  tabs: { source: tabsSource, usage: tabsUsage },
  alert: { source: alertSource, usage: alertUsage },
  modal: { source: modalSource, usage: modalUsage },
  table: { source: tableSource, usage: tableUsage },
  sender: { source: senderSource, usage: senderUsage },
  'agent-message': { source: agentMessageSource, usage: agentMessageUsage },
  thinking: { source: thinkingSource, usage: thinkingUsage },
  'stream-text': { source: streamTextSource, usage: streamTextUsage },
  'tool-call': { source: toolCallSource, usage: toolCallUsage },
  'quick-replies': { source: quickRepliesSource, usage: quickRepliesUsage },
  permission: { source: permissionSource, usage: permissionUsage },
  'task-list': { source: taskListSource, usage: taskListUsage },
  'code-diff': { source: codeDiffSource, usage: codeDiffUsage },
  'terminal-block': { source: terminalBlockSource, usage: terminalBlockUsage },
  'browser-step': { source: browserStepSource, usage: browserStepUsage },
  attachments: { source: attachmentsSource, usage: attachmentsUsage },
  'model-picker': { source: modelPickerSource, usage: modelPickerUsage },
  sources: { source: sourcesSource, usage: sourcesUsage },
  toast: { source: toastSource, usage: toastUsage },
  skeleton: { source: skeletonSource, usage: skeletonUsage },
  select: { source: selectSource, usage: selectUsage },
  checkbox: { source: checkboxSource, usage: checkboxUsage },
  pagination: { source: paginationSource, usage: paginationUsage },
}

const patternSourceMap: Record<string, string> = {
  login: loginSource,
  dashboard: dashboardSource,
  'agent-workspace': agentWorkspaceSource,
  landing: landingSource,
}

export const componentEntries: RegistryEntry[] = components.map((c) => ({
  ...c,
  ...sourceMap[c.name],
}))

export const patternEntries: PatternEntry[] = patterns.map((p) => ({
  ...p,
  source: patternSourceMap[p.name],
}))

export function getComponent(name: string): RegistryEntry | undefined {
  return componentEntries.find((c) => c.name === name)
}

export function getPattern(name: string): PatternEntry | undefined {
  return patternEntries.find((p) => p.name === name)
}

/** 列表中某条目的上/下邻居，用于详情页底部导航 */
export function neighbors<T extends { name: string }>(
  list: T[],
  name: string,
): { prev?: T; next?: T } {
  const index = list.findIndex((item) => item.name === name)
  if (index === -1) return {}
  return { prev: list[index - 1], next: list[index + 1] }
}

/** 按分类分组，供目录页渲染 */
export function groupByCategory(): Array<CategoryMeta & { items: RegistryEntry[] }> {
  return categories.map((cat) => ({
    ...cat,
    items: componentEntries.filter((c) => c.category === cat.id),
  }))
}

/** 路由名 → 源码文件名约定：button → UButton.vue，agent-message → UAgentMessage.vue */
export function uiFile(name: string): string {
  return `app/components/ui/U${toPascal(name)}.vue`
}

export function demoFile(name: string): string {
  return `app/components/demo/Demo${toPascal(name)}.vue`
}

export function patternFile(name: string): string {
  return `app/components/patterns/Pattern${toPascal(name)}.vue`
}
