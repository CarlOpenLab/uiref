/**
 * GET /api/registry
 * 全站条目的机器可读元数据 + 构建期注入的完整源码，供 Agent 一次 GET 获取全部物料。
 * 详情页路由同时提供可交互预览（SSR HTML 内含源码）。
 */
import { categories, components, patterns, siteMeta, toPascal } from '#shared/registry-meta'
import registryCode from '../generated/registry-code.json'

interface GeneratedCode {
  source: string
  usage?: string
}

const code = registryCode as Record<string, GeneratedCode>

export default defineEventHandler(() => {
  return {
    ...siteMeta,
    categories,
    components: components.map((c) => ({
      ...c,
      page: `/components/${c.name}`,
      source_file: `app/components/ui/U${toPascal(c.name)}.vue`,
      usage_file: `app/components/demo/Demo${toPascal(c.name)}.vue`,
      source: code[c.name]?.source ?? '',
      usage: code[c.name]?.usage ?? '',
    })),
    patterns: patterns.map((p) => ({
      ...p,
      page: `/patterns/${p.name}`,
      source_file: `app/components/patterns/Pattern${toPascal(p.name)}.vue`,
      source: code[p.name]?.source ?? '',
    })),
  }
})
