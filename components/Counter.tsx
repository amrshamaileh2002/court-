'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export default function Counter({ target, suffix = '', duration = 1600, className = '' }: Props) {
  const [val, setVal] = useState(0)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          setVal(Math.floor(target * easeOutQuart(t)))
          if (t < 1) requestAnimationFrame(tick)
          else setDone(true)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className={className}>
      {val}{done ? suffix : ''}
    </span>
  )
}
