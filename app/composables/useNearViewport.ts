import { onScopeDispose, ref } from 'vue'
import type { Ref } from 'vue'

/**
 * @description 元素接近视口时置 true（一次性，之后保持 true）：目录页几十张缩略图只在滚到附近才挂载，
 *   首屏不批量拉起几十个 demo 异步分片。SSR 期间恒为 false，因此包在里面的内容天然不参与服务端渲染
 * @param {string} rootMargin - 提前量：元素进入视口前多少距离就算「接近」，默认 300px
 * @returns {{ el: Ref<HTMLElement | null>, visible: Ref<boolean> }} el 绑到被观测元素上，visible 为挂载开关
 */
export function useNearViewport(
  rootMargin = '300px',
): { el: Ref<HTMLElement | null>; visible: Ref<boolean> } {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)

  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      visible.value = true
      return
    }

    // 首屏已在视口附近的元素直接挂载，不等 IO 的首次异步回调（也兜底后台标签页暂停回调的环境）
    const margin = Number.parseFloat(rootMargin) || 0
    const rect = el.value?.getBoundingClientRect()
    if (rect && rect.top < window.innerHeight + margin && rect.bottom > -margin) {
      visible.value = true
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          visible.value = true
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    if (el.value) observer.observe(el.value)
    onScopeDispose(() => observer.disconnect())
  })

  return { el, visible }
}
