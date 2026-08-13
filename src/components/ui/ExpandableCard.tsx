'use client'
import { useState, useEffect, useId } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface CardSpec {
  label: string
  value: string
  icon?: React.ReactNode
}

export interface ExpandableCardItem {
  id: string
  title: string
  subtitle: string
  image: string
  category: string
  specs: CardSpec[]
  description?: string
}

interface ExpandableCardGridProps {
  items: ExpandableCardItem[]
}

export function ExpandableCardGrid({ items }: ExpandableCardGridProps) {
  const [activeCard, setActiveCard] = useState<ExpandableCardItem | null>(null)
  const uid = useId()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCard(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeCard ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeCard])

  return (
    <>
      {/* Expanded overlay */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              layoutId={`card-${uid}-${activeCard.id}`}
              className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-ktm/30 bg-[#0A0A0A] shadow-[0_0_80px_rgba(255,107,0,0.15)]"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
              {/* Image */}
              <div className="relative h-64 bg-black">
                <Image
                  src={activeCard.image}
                  alt={activeCard.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 512px) 100vw, 512px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-md text-xs font-mono font-medium bg-ktm/90 text-black">
                    {activeCard.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div layoutId={`title-${uid}-${activeCard.id}`}>
                  <h3 className="font-syne font-black text-2xl text-white">{activeCard.title}</h3>
                  <p className="font-mono text-ktm text-sm mt-1">{activeCard.subtitle}</p>
                </motion.div>

                {activeCard.description && (
                  <p className="mt-4 text-white/60 font-grotesk text-sm leading-relaxed">
                    {activeCard.description}
                  </p>
                )}

                {/* Specs grid */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {activeCard.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-ktm/30 transition-colors"
                    >
                      <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{spec.label}</p>
                      <p className="text-white font-syne font-bold text-sm mt-1">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 border border-white/10 hover:border-ktm/50 text-white/60 hover:text-white transition-all"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <motion.div
            layoutId={`card-${uid}-${item.id}`}
            key={item.id}
            onClick={() => setActiveCard(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A0A0A] hover:border-ktm/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Card image */}
            <div className="relative h-48 bg-black overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 rounded-md text-xs font-mono font-medium bg-ktm/80 text-black">
                  {item.category}
                </span>
              </div>
              {/* Hover hint */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-mono text-ktm bg-black/70 px-2 py-1 rounded border border-ktm/30">
                  Tap to expand
                </span>
              </div>
            </div>

            {/* Card footer */}
            <div className="p-4">
              <motion.div layoutId={`title-${uid}-${item.id}`}>
                <h3 className="font-syne font-bold text-white text-lg leading-tight">{item.title}</h3>
                <p className="font-mono text-ktm text-xs mt-1">{item.subtitle}</p>
              </motion.div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.specs.slice(0, 3).map((spec, i) => (
                  <span key={i} className="text-[10px] font-mono text-white/40 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded">
                    {spec.label}: {spec.value}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}
