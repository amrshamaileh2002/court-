'use client'
import { useEffect, useRef } from 'react'

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const boxRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = loaderRef.current!
    const box    = boxRef.current!

    // Phase 1 – expand vertically
    setTimeout(() => { box.style.height = '100vh' }, 200)
    // Phase 2 – expand horizontally
    setTimeout(() => { box.style.width  = '100vw' }, 640)
    // Phase 3 – fade out
    setTimeout(() => {
      loader.style.opacity    = '0'
      loader.style.transition = 'opacity 0.35s ease'
    }, 1080)
    // Phase 4 – remove + trigger hero
    setTimeout(() => {
      loader.style.display = 'none'
      document.body.classList.add('loaded')
      document.dispatchEvent(new CustomEvent('preloader-done'))
    }, 1450)
  }, [])

  return (
    <div id="preloader" ref={loaderRef}>
      <div
        id="preloader-box"
        ref={boxRef}
        style={{ width: 260, height: 88 }}
      >
        <span id="preloader-logo">LA3EBEH ARENA</span>
      </div>
    </div>
  )
}
