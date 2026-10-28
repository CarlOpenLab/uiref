/**
 * app 端注册表：把 shared 元数据与真实源码（?raw 导入，保证与组件文件永远同步）合并。
 * 页面从这里取条目渲染详情页，不要直接 import 单个组件。
 */
import { categories, components, patterns } from '#shared/registry-meta'
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
}

const patternSourceMap: Record<string, string> = {
  login: loginSource,
  dashboard: dashboardSource,
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

/** 按分类分组，供目录页渲染 */
export function groupByCategory(): Array<CategoryMeta & { items: RegistryEntry[] }> {
  return categories.map((cat) => ({
    ...cat,
    items: componentEntries.filter((c) => c.category === cat.id),
  }))
}

/** 路由名 → 源码文件名约定：button → UButton.vue / DemoButton.vue */
function pascal(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function uiFile(name: string): string {
  return `app/components/ui/U${pascal(name)}.vue`
}

export function demoFile(name: string): string {
  return `app/components/demo/Demo${pascal(name)}.vue`
}

export function patternFile(name: string): string {
  return `app/components/patterns/Pattern${pascal(name)}.vue`
}
