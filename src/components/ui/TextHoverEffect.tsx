'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TextHoverEffectProps {
  text: string
  className?: string
}

export function TextHoverEffect({ text, className = '' }: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hovered, setHovered] = useState(false)
  const [maskPos, setMaskPos] = useState({ cx: '50%', cy: '50%' })
  const [dimensions, setDimensions] = useState({ width: 500, height: 100 })

  useEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox?.()
      if (bbox) {
        setDimensions({ width: Math.max(bbox.width + 40, 200), height: Math.max(bbox.height + 20, 80) })
      }
    }
  }, [text])

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%'
    const cy = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%'
    setMaskPos({ cx, cy })
  }

  const id = `the-${text.replace(/\s/g, '-').toLowerCase()}`

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`select-none cursor-default ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse"
          x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CC5500" />
          <stop offset="40%" stopColor="#FF6B00" />
          <stop offset="70%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
        <motion.radialGradient
          id={`${id}-mask-grad`}
          gradientUnits="userSpaceOnUse"
          r="25%"
          animate={maskPos}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="80%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`${id}-mask`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id}-mask-grad)`} />
        </mask>
      </defs>

      {/* Base stroke text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        strokeWidth="0.5"
        className="fill-transparent"
        stroke="rgba(255,255,255,0.08)"
        fontSize="60"
        fontFamily="var(--font-syne)"
        fontWeight="800"
        letterSpacing="4"
      >
        {text}
      </text>

      {/* Gradient fill text (revealed by mouse mask) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        strokeWidth="0.5"
        stroke="rgba(255,107,0,0.4)"
        fill={`url(#${id}-grad)`}
        fontSize="60"
        fontFamily="var(--font-syne)"
        fontWeight="800"
        letterSpacing="4"
        mask={`url(#${id}-mask)`}
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        {text}
      </text>
    </svg>
  )
}
