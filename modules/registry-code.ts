import fs from 'node:fs'
import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { components, patterns, toPascal } from '../shared/registry-meta'

/**
 * 构建期把全部组件/模板源码扫成 server/generated/registry-code.json，
 * 供 /api/registry 一次 GET 返回全量代码（nitro 无法解析 .vue?raw）。
 * dev 期间组件文件变更时自动重写。
 */
export default defineNuxtModule({
  meta: { name: 'registry-code' },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const generate = () => {
      const read = (rel: string) =>
        fs.readFileSync(resolver.resolve(nuxt.options.rootDir, rel), 'utf8')

      const code: Record<string, { source: string; usage?: string }> = {}

      for (const component of components) {
        code[component.name] = {
          source: read(`app/components/ui/U${toPascal(component.name)}.vue`),
          usage: read(`app/components/demo/Demo${toPascal(component.name)}.vue`),
        }
      }
      for (const pattern of patterns) {
        code[pattern.name] = {
          source: read(`app/components/patterns/Pattern${toPascal(pattern.name)}.vue`),
        }
      }

      const outDir = resolver.resolve(nuxt.options.rootDir, 'server/generated')
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(
        resolver.resolve(outDir, 'registry-code.json'),
        JSON.stringify(code, null, 2),
      )
    }

    generate()

    nuxt.hook('builder:watch', (event, relativePath) => {
      if (event === 'change' && relativePath.includes('components/')) {
        try {
          generate()
        } catch {
          // 文件半写入状态下失败则静默，下次变更会重试
        }
      }
    })
  },
})
