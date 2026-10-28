/**
 * GET /api/registry
 * 全站条目的机器可读元数据，供 Agent 做目录发现。
 * 每条 entry.page 即详情路由；详情页 SSR HTML 内含完整源码。
 */
import { categories, components, patterns, siteMeta, toPascal } from '#shared/registry-meta'

export default defineEventHandler(() => {
  return {
    ...siteMeta,
    categories,
    components: components.map((c) => ({
      ...c,
      page: `/components/${c.name}`,
      source_file: `app/components/ui/U${toPascal(c.name)}.vue`,
      usage_file: `app/components/demo/Demo${toPascal(c.name)}.vue`,
    })),
    patterns: patterns.map((p) => ({
      ...p,
      page: `/patterns/${p.name}`,
      source_file: `app/components/patterns/Pattern${toPascal(p.name)}.vue`,
    })),
  }
})
