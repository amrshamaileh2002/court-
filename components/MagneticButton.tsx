'use client'
import { useRef, ReactNode, MouseEvent, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function MagneticButton({ children, className = '', style, onClick, type = 'button', disabled }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current!
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 80) {
      const force = (80 - dist) / 80
      btn.style.transform  = `translate(${dx * force * 0.15}px, ${dy * force * 0.15}px)`
      btn.style.transition = 'transform 0.1s linear'
    }
  }

  const onLeave = () => {
    const btn = ref.current!
    btn.style.transform  = ''
    btn.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)'
  }

  return (
    <button
      ref={ref}
      type={type}
      style={style}
      className={`btn-magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
