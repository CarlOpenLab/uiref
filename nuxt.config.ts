import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['./modules/registry-code'],

  css: ['~/assets/css/main.css'],

  // 组件按文件名注册（不带目录前缀），路由页与 demo 都按名字直接引用
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'UIRef · 给 Agent 的 UI 范式参考库',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'UIRef：给 AI Agent 的 UI 范式参考库。每个路由对应一个可交互预览 + 完整源码的组件或页面模板，Nuxt 4 + Tailwind CSS 实现。',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
