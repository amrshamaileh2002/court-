'use client'
import { useId } from 'react'

export function KortnaLogoMark({ size = 36 }: { size?: number }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `kball-${uid}`

  return (
    <svg
      width={size}
      height={Math.round(size * 1.14)}
      viewBox="0 0 100 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="47" r="44" />
        </clipPath>
      </defs>

      {/* Ball base */}
      <circle cx="50" cy="47" r="44" fill="#E85A1E" />

      {/* Geodesic facet lines */}
      <g clipPath={`url(#${clipId})`} stroke="#A03010" strokeWidth="1.8" strokeLinecap="round" fill="none">
        {/* Outer hexagon chords */}
        <line x1="94" y1="47" x2="72" y2="85" />
        <line x1="72" y1="85" x2="28" y2="85" />
        <line x1="28" y1="85" x2="6"  y2="47" />
        <line x1="6"  y1="47" x2="28" y2="9"  />
        <line x1="28" y1="9"  x2="72" y2="9"  />
        <line x1="72" y1="9"  x2="94" y2="47" />
        {/* Inner hexagon */}
        <line x1="71" y1="59" x2="50" y2="71" />
        <line x1="50" y1="71" x2="29" y2="59" />
        <line x1="29" y1="59" x2="29" y2="35" />
        <line x1="29" y1="35" x2="50" y2="23" />
        <line x1="50" y1="23" x2="71" y2="35" />
        <line x1="71" y1="35" x2="71" y2="59" />
        {/* Outer → inner spokes */}
        <line x1="94" y1="47" x2="71" y2="35" />
        <line x1="94" y1="47" x2="71" y2="59" />
        <line x1="72" y1="85" x2="71" y2="59" />
        <line x1="72" y1="85" x2="50" y2="71" />
        <line x1="28" y1="85" x2="50" y2="71" />
        <line x1="28" y1="85" x2="29" y2="59" />
        <line x1="6"  y1="47" x2="29" y2="59" />
        <line x1="6"  y1="47" x2="29" y2="35" />
        <line x1="28" y1="9"  x2="29" y2="35" />
        <line x1="28" y1="9"  x2="50" y2="23" />
        <line x1="72" y1="9"  x2="50" y2="23" />
        <line x1="72" y1="9"  x2="71" y2="35" />
      </g>

      {/* Circle border */}
      <circle cx="50" cy="47" r="44" stroke="#A03010" strokeWidth="1.2" fill="none" />

      {/* Speed swoosh lines */}
      <line x1="18" y1="97"  x2="58" y2="101" stroke="#E85A1E" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="10" y1="107" x2="50" y2="111" stroke="#E85A1E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
