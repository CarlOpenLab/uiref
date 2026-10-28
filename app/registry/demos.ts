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
import DemoSender from '~/components/demo/DemoSender.vue'
import DemoAgentMessage from '~/components/demo/DemoAgentMessage.vue'
import DemoThinking from '~/components/demo/DemoThinking.vue'
import DemoStreamText from '~/components/demo/DemoStreamText.vue'
import DemoToolCall from '~/components/demo/DemoToolCall.vue'
import DemoQuickReplies from '~/components/demo/DemoQuickReplies.vue'
import DemoPermission from '~/components/demo/DemoPermission.vue'
import DemoTaskList from '~/components/demo/DemoTaskList.vue'
import DemoCodeDiff from '~/components/demo/DemoCodeDiff.vue'
import DemoTerminalBlock from '~/components/demo/DemoTerminalBlock.vue'
import DemoBrowserStep from '~/components/demo/DemoBrowserStep.vue'
import DemoAttachments from '~/components/demo/DemoAttachments.vue'
import DemoModelPicker from '~/components/demo/DemoModelPicker.vue'
import DemoSources from '~/components/demo/DemoSources.vue'
import DemoToast from '~/components/demo/DemoToast.vue'
import DemoSkeleton from '~/components/demo/DemoSkeleton.vue'
import DemoSelect from '~/components/demo/DemoSelect.vue'
import DemoCheckbox from '~/components/demo/DemoCheckbox.vue'
import DemoPagination from '~/components/demo/DemoPagination.vue'
import PatternAgentWorkspace from '~/components/patterns/PatternAgentWorkspace.vue'
import PatternLanding from '~/components/patterns/PatternLanding.vue'
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
  sender: DemoSender,
  'agent-message': DemoAgentMessage,
  thinking: DemoThinking,
  'stream-text': DemoStreamText,
  'tool-call': DemoToolCall,
  'quick-replies': DemoQuickReplies,
  permission: DemoPermission,
  'task-list': DemoTaskList,
  'code-diff': DemoCodeDiff,
  'terminal-block': DemoTerminalBlock,
  'browser-step': DemoBrowserStep,
  attachments: DemoAttachments,
  'model-picker': DemoModelPicker,
  sources: DemoSources,
  toast: DemoToast,
  skeleton: DemoSkeleton,
  select: DemoSelect,
  checkbox: DemoCheckbox,
  pagination: DemoPagination,
}

export const patternDemoMap: Record<string, Component> = {
  login: PatternLogin,
  dashboard: PatternDashboard,
  'agent-workspace': PatternAgentWorkspace,
  landing: PatternLanding,
}
