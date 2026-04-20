'use client'
import { useRef, ReactNode, MouseEvent, CSSProperties, forwardRef } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const BASE = 'relative inline-flex items-center justify-center gap-2 font-bold select-none outline-none border-0 cursor-pointer overflow-hidden'

const VARIANTS: Record<string, string> = {
  primary:   'kortna-btn-primary',
  secondary: 'kortna-btn-secondary',
  ghost:     'kortna-btn-ghost',
}

const SIZES: Record<string, string> = {
  sm: 'px-5 py-2.5 text-sm rounded-xl',
  md: 'px-7 py-3.5 text-sm rounded-2xl',
  lg: 'px-9 py-4 text-base rounded-2xl',
}

export default function KortnaButton({
  children,
  className = '',
  style,
  onClick,
  type = 'button',
  disabled,
  variant = 'primary',
  size = 'md',
  fullWidth,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current!
    const rect = btn.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 80) {
      const f = (80 - dist) / 80
      btn.style.transform = `translate(${dx * f * 0.12}px, ${dy * f * 0.12}px)`
      btn.style.transition = 'transform 0.08s linear'
    }
  }

  const onLeave = () => {
    const btn = ref.current!
    btn.style.transform = ''
    btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
  }

  return (
    <button
      ref={ref}
      type={type}
      style={style}
      disabled={disabled}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
