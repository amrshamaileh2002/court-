'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mx = useRef(-200), my = useRef(-200)
  const rx = useRef(-200), ry = useRef(-200)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
    }

    const onEnter = () => {
      dot.classList.add('hovering')
      ring.classList.add('hovering')
    }
    const onLeave = () => {
      dot.classList.remove('hovering')
      ring.classList.remove('hovering')
    }
    const onDown = () => ring.classList.add('clicking')
    const onUp   = () => ring.classList.remove('clicking')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)

    const targets = () => document.querySelectorAll('a, button, [data-hover], input, select, label')
    const attach = () => targets().forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    const loop = () => {
      rx.current += (mx.current - rx.current) * 0.12
      ry.current += (my.current - ry.current) * 0.12
      dot.style.transform  = `translate(${mx.current}px, ${my.current}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${rx.current}px, ${ry.current}px) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
