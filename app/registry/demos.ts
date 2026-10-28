/**
 * 路由名 → 实际渲染的 Demo 组件。
 * 新增条目时在 registry/index.ts 加元数据，在这里加一行映射。
 */
import type { Component } from 'vue'

import DemoButton from '~/components/demo/DemoButton.vue'
import DemoBadge from '~/components/demo/DemoBadge.vue'
import DemoInput from '~/components/demo/DemoInput.vue'
import DemoCard from '~/components/demo/DemoCard.vue'
import DemoTabs from '~/components/demo/DemoTabs.vue'
import DemoAlert from '~/components/demo/DemoAlert.vue'
import DemoModal from '~/components/demo/DemoModal.vue'
import DemoTable from '~/components/demo/DemoTable.vue'
import PatternLogin from '~/components/patterns/PatternLogin.vue'
import PatternDashboard from '~/components/patterns/PatternDashboard.vue'

export const demoMap: Record<string, Component> = {
  button: DemoButton,
  badge: DemoBadge,
  input: DemoInput,
  card: DemoCard,
  tabs: DemoTabs,
  alert: DemoAlert,
  modal: DemoModal,
  table: DemoTable,
}

export const patternDemoMap: Record<string, Component> = {
  login: PatternLogin,
  dashboard: PatternDashboard,
}
