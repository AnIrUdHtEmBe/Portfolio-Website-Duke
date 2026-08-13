'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onComplete: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [currentRPM, setCurrentRPM] = useState(0)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'sweeping' | 'ready' | 'exit'>('sweeping')

  const MAX_RPM = 390
  const MILESTONES = [0, 125, 200, 250, 390]

  useEffect(() => {
    const DURATION = 2200
    const FPS = 60
    const INTERVAL = 1000 / FPS
    const TOTAL_FRAMES = DURATION / INTERVAL
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const t = frame / TOTAL_FRAMES
      // ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      const rpm = Math.floor(MAX_RPM * eased)
      setCurrentRPM(rpm)
      setProgress(eased)

      if (frame >= TOTAL_FRAMES) {
        clearInterval(timer)
        setCurrentRPM(390)
        setProgress(1)
        setTimeout(() => setPhase('ready'), 100)
        setTimeout(() => setPhase('exit'), 1900)
        setTimeout(() => onComplete(), 2500)
      }
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [onComplete])

  // SVG tachometer config
  const cx = 200, cy = 195, r = 140
  const startAngle = 135
  const sweepDeg = 270
  const endAngle = startAngle + sweepDeg
  const circumference = 2 * Math.PI * r
  const arcLength = (sweepDeg / 360) * circumference
  const progressArc = progress * arcLength

  function polarToXY(deg: number, radius: number) {
    const rad = (deg - 90) * (Math.PI / 180)
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
  }

  function describeArc(start: number, end: number, radius: number) {
    const s = polarToXY(start, radius)
    const e = polarToXY(end, radius)
    const large = end - start > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const needleAngleDeg = startAngle + progress * sweepDeg
  const needleTip = polarToXY(needleAngleDeg, r - 18)

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Radial bg glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,107,0,0.07)_0%,transparent_70%)]" />

          <div className="relative flex flex-col items-center">
            <svg width="400" height="340" viewBox="0 0 400 340" className="overflow-visible">
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#CC5500" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background arc track */}
              <path
                d={describeArc(startAngle, endAngle, r)}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Progress arc */}
              <path
                d={describeArc(startAngle, endAngle, r)}
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={arcLength}
                strokeDashoffset={arcLength - progressArc}
                filter="url(#glow)"
              />

              {/* Milestone ticks + labels */}
              {MILESTONES.map((rpm, i) => {
                const angle = startAngle + (rpm / MAX_RPM) * sweepDeg
                const inner = polarToXY(angle, r - 22)
                const outer = polarToXY(angle, r + 6)
                const label = polarToXY(angle, r + 26)
                const isActive = currentRPM >= rpm
                return (
                  <g key={rpm}>
                    <line
                      x1={inner.x} y1={inner.y}
                      x2={outer.x} y2={outer.y}
                      stroke={isActive ? '#FF6B00' : 'rgba(255,255,255,0.15)'}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <text
                      x={label.x} y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? '#FF8C00' : 'rgba(255,255,255,0.2)'}
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      fontWeight="500"
                    >
                      {rpm}
                    </text>
                  </g>
                )
              })}

              {/* Needle */}
              <line
                x1={cx} y1={cy}
                x2={needleTip.x} y2={needleTip.y}
                stroke="#FF6B00"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#needleGlow)"
              />
              <circle cx={cx} cy={cy} r="9" fill="#FF6B00" filter="url(#glow)" />
              <circle cx={cx} cy={cy} r="4" fill="#000" />

              {/* Center RPM readout */}
              <text
                x={cx} y={cy - 22}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#FF6B00"
                fontSize="42"
                fontFamily="var(--font-syne)"
                fontWeight="800"
                filter="url(#glow)"
              >
                {currentRPM}
              </text>
              <text
                x={cx} y={cy + 18}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#FF6B00"
                fontSize="10"
                fontFamily="var(--font-mono)"
                letterSpacing="3"
              >
                KTM 390 DUKE
              </text>

              {/* "READY TO RACE" label */}
              <AnimatePresence>
                {phase === 'ready' && (
                  <motion.text
                    x={cx} y={cy + 80}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FF6B00"
                    fontSize="16"
                    fontFamily="var(--font-syne)"
                    fontWeight="800"
                    letterSpacing="8"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    READY TO RACE
                  </motion.text>
                )}
              </AnimatePresence>


            </svg>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
