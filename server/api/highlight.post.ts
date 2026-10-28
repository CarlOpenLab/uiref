/**
 * POST /api/highlight
 * 批量高亮代码块：{ blocks: [{ code, lang? }] } → { html: string[] }
 * CodeBlock 在 SSR 期间调用，首屏即为带色彩的代码。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ blocks?: Array<{ code?: string; lang?: string }> }>(event)
  const blocks = Array.isArray(body?.blocks) ? body.blocks.slice(0, 4) : []

  const html = await Promise.all(
    blocks.map((block) => highlightCode(String(block?.code ?? ''), block?.lang ?? 'vue')),
  )

  return { html }
})
