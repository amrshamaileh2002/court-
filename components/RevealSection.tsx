'use client'
import React, { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  tag?: keyof React.JSX.IntrinsicElements
}

export default function RevealSection({ children, className = '', delay = 0, tag: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}ms`
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    // @ts-ignore
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
