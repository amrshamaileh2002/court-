'use client'
import { useRef, ReactNode, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  className?: string
  maxDeg?: number
}

export default function TiltCard({ children, className = '', maxDeg = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el   = ref.current!
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform  = `perspective(1000px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) translateY(-6px)`
    el.style.transition = 'transform 0.1s linear'
  }

  const onLeave = () => {
    const el = ref.current!
    el.style.transform  = ''
    el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
