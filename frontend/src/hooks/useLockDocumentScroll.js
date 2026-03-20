import { useLayoutEffect } from 'react'

/** While mounted, prevents html/body from scrolling (window scrollbar). Inner panes keep overflow-y-auto. */
export function useLockDocumentScroll() {
  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
    }
  }, [])
}
