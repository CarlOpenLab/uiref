import { createHighlighter } from 'shiki'

type Highlighter = Awaited<ReturnType<typeof createHighlighter>>

let highlighterPromise: Promise<Highlighter> | null = null

/** 懒加载单例：只注册站点用到的语言，避免全量 grammar */
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: ['vue', 'ts', 'bash', 'json', 'markdown'],
    })
  }
  return highlighterPromise
}

/** 高亮为 HTML；失败返回空串，由调用方回退为纯文本 */
export async function highlightCode(code: string, lang = 'vue'): Promise<string> {
  try {
    const highlighter = await getHighlighter()
    return highlighter.codeToHtml(code, { lang, theme: 'github-dark' })
  } catch {
    return ''
  }
}
