'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Meteor {
  id: number
  top: number
  left: number
  delay: number
  duration: number
}

function Meteors({ number = 12 }: { number?: number }) {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id: i,
        top: Math.floor(Math.random() * 100),
        left: Math.floor(Math.random() * 100),
        delay: Math.random() * 2,
        duration: Math.random() * 6 + 4,
      }))
    )
  }, [number])

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-px w-px rounded-full bg-ktm rotate-[215deg] animate-meteor"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        >
          <span className="absolute top-0 right-0 h-px w-16 -translate-y-1/2 bg-gradient-to-r from-ktm to-transparent" />
        </span>
      ))}
    </>
  )
}

interface CometCardProps {
  children: React.ReactNode
  className?: string
  meteorCount?: number
}

export function CometCard({ children, className, meteorCount = 12 }: CometCardProps) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm',
      className
    )}>
      <Meteors number={meteorCount} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
