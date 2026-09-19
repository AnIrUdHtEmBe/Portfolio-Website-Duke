'use client'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Zap, Gauge, Wind, Clock, Shield, Layers } from 'lucide-react'
import { CometCard } from '@/components/ui/CometCard'
import { StaticImageData } from 'next/image'
import KTM_DUKE_SIDE_4 from '../../../public/KTM-DUKE-SIDE-4.png'
import KTM_RIGHT_FRONT from '../../../public/KTM-RIGHT-FRONT.png'
import KTM_SIDE_RIGHT from '../../../public/KTM-SIDE-RIGHT.png'
import KTM_LEFT_FRONT from '../../../public/KTM-LEFT-FRONT.png'
import KTM_TOP_VIEW_RIGHT from '../../../public/KTM-TOP-VIEW-RIGHT.png'

// ── Types ──────────────────────────────────────────────────────────────────────

interface Hotspot {
  x: string
  y: string
  label: string
  detail: string
}

interface BikeView {
  src: string | StaticImageData
  label: string
  shortLabel: string
  hotspots: Hotspot[]
}

interface SpecItem {
  label: string
  value: string
  icon?: React.ReactNode
}

// ── Hotspot Position Config (tune these x/y values to reposition dots) ────────

const HOTSPOT_POSITIONS = {
  side: {
    engine:     { x: '58%', y: '70%' },
    exhaust:    { x: '42%', y: '65%' },
    rearShock:  { x: '50%', y: '55%' },
    tftDisplay: { x: '63%', y: '15%' },
  },
  rightFront: {
    headlight:  { x: '66%', y: '40%' },
    frontFork:  { x: '65%', y: '47%' },
    frontBrake: { x: '64%', y: '78%' },
    tftDisplay: { x: '45%', y: '28%' },
    rearShock:  { x: '55%', y: '52%' },
  },
  sideRight: {
    tail:     { x: '22%', y: '45%' },
    frontWheel:  { x: '82%', y: '60%' },
    rearWheel: { x: '18%', y: '65%' },
  },
  leftFront: {
    brake:      { x: '33.75%', y: '69.75%' },
    engine:     { x: '65%', y: '70%' },
    header:     { x: '49%', y: '67%' },
    levers:   { x: '37%', y: '28%' },
  },
  topView: {
    fuelTank:   { x: '45%', y: '30%' },
    exhaust:    { x: '25%', y: '70%' },
  },
}

// ── Data ───────────────────────────────────────────────────────────────────────

const BIKE_VIEWS: BikeView[] = [
  {
    src: KTM_DUKE_SIDE_4,
    label: 'Side Profile',
    shortLabel: 'Side',
    hotspots: [
      { ...HOTSPOT_POSITIONS.side.engine, label: 'Engine', detail: '373.3cc LC Single Cylinder 43.5 HP 37 nm Torque DOHC Camshafts Bi-directional Quickshifter' },
      { ...HOTSPOT_POSITIONS.side.exhaust, label: 'Exhaust', detail: 'Slip-on exhaust with catalytic converter' },
      { ...HOTSPOT_POSITIONS.side.rearShock, label: 'Rear Shock', detail: 'WP Apex Monoshock with Adjustable Preload' },
      { ...HOTSPOT_POSITIONS.side.tftDisplay, label: 'TFT Display', detail: '5" Full-Color TFT Dashboard' },
    ],
  },
  {
    src: KTM_RIGHT_FRONT,
    label: 'Right Front',
    shortLabel: 'RF 3/4',
    hotspots: [
      { ...HOTSPOT_POSITIONS.rightFront.headlight, label: 'Headlight', detail: 'Full LED DRL Headlight' },
      { ...HOTSPOT_POSITIONS.rightFront.frontFork, label: 'Front Fork', detail: 'WP Apex USD Forks — 43mm' },
      { ...HOTSPOT_POSITIONS.rightFront.frontBrake, label: 'Front Brake', detail: 'Bybre 320mm Disc with Cornering ABS' },
      { ...HOTSPOT_POSITIONS.rightFront.tftDisplay, label: 'TFT Display', detail: '13.7ltr Fuel Tank' },
      { ...HOTSPOT_POSITIONS.rightFront.rearShock, label: 'Rear Shock', detail: 'Liquid cooled Mono Fan Radiator' },
    ],
  },
  {
    src: KTM_SIDE_RIGHT,
    label: 'Side Right',
    shortLabel: 'Side R',
    hotspots: [
      { ...HOTSPOT_POSITIONS.sideRight.tail, label: 'Tail Tidy', detail: 'Integrated Tail Tidy' },
      { ...HOTSPOT_POSITIONS.sideRight.frontWheel, label: 'Front Wheel', detail: '110/70 R17 Metzeler Tire' },
      { ...HOTSPOT_POSITIONS.sideRight.rearWheel, label: 'Rear Wheel', detail: '150/60 R17 Metzeler Tire' },
    ],
  },
  {
    src: KTM_LEFT_FRONT,
    label: 'Left Front',
    shortLabel: 'LF 3/4',
    hotspots: [
      { ...HOTSPOT_POSITIONS.leftFront.brake, label: 'Front Brake', detail: 'Bybre 320mm Disc with Cornering ABS' },
      { ...HOTSPOT_POSITIONS.leftFront.engine, label: 'Engine', detail: '15-teeth Front Sprocket, 42-teeth Rear Sprocket, O-Rings Chain Drive' },
      { ...HOTSPOT_POSITIONS.leftFront.header, label: 'Header Pipe', detail: 'Stainless Steel Header Pipe equipped with O2 sensor' },
      { ...HOTSPOT_POSITIONS.leftFront.levers, label: 'Levers', detail: 'Adjustable Brake Lever and Clutch Lever' },
    ],
  },
  {
    src: KTM_TOP_VIEW_RIGHT,
    label: 'Top View',
    shortLabel: 'Top',
    hotspots: [
      { ...HOTSPOT_POSITIONS.topView.fuelTank, label: 'POV', detail: '390!' },
      { ...HOTSPOT_POSITIONS.topView.exhaust, label: 'Tail Light', detail: 'Rival\'s best view' },
    ],
  },
]

const FULL_SPECS: SpecItem[] = [
  { label: 'Engine', value: '373.3cc Single Cylinder Liquid Cooled', icon: <Zap size={14} /> },
  { label: 'Power', value: '43.5 HP @ 9,000 RPM', icon: <Gauge size={14} /> },
  { label: 'Torque', value: '37 Nm @ 7,000 RPM', icon: <Zap size={14} /> },
  { label: '0–100', value: '5.5 seconds', icon: <Clock size={14} /> },
  { label: 'Top Speed', value: '171 km/h', icon: <Wind size={14} /> },
  { label: 'Wet Weight', value: '163 kg', icon: <Layers size={14} /> },
  { label: 'Fuel Tank', value: '13.4 Litres', icon: <Gauge size={14} /> },
  { label: 'Front Brake', value: '320mm Disc, 4-Piston Bybre', icon: <Shield size={14} /> },
  { label: 'Rear Brake', value: '230mm Disc, Single Piston', icon: <Shield size={14} /> },
  { label: 'Electronics', value: 'Switchable ABS, Traction Control, Cornering ABS', icon: <Zap size={14} /> },
  { label: 'Display', value: '5" Full-Color TFT', icon: <Layers size={14} /> },
  { label: 'Chassis', value: 'Chromoly Steel Trellis', icon: <Layers size={14} /> },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

interface HotspotMarkerProps {
  hotspot: Hotspot
}

function HotspotMarker({ hotspot }: HotspotMarkerProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`absolute ${hovered ? 'z-50' : 'z-20'}`}
      style={{ left: hotspot.x, top: hotspot.y, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-ktm/40 animate-hotspot-ping" />

      {/* Dot */}
      <button
        className="relative w-5 h-5 rounded-full bg-ktm border-2 border-white/80 shadow-[0_0_12px_rgba(255,107,0,0.8)] hover:scale-125 transition-transform duration-200 cursor-pointer"
        aria-label={hotspot.label}
      />

      {/* Glassmorphism tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[200px] pointer-events-none"
          >
            <div className="glass-orange rounded-xl px-3 py-2 shadow-[0_0_20px_rgba(255,107,0,0.15)]">
              <p className="font-mono text-ktm text-[10px] uppercase tracking-widest">{hotspot.label}</p>
              <p className="font-grotesk text-white text-xs mt-0.5 leading-snug">{hotspot.detail}</p>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-ktm/20 border-r border-b border-ktm/30 rotate-45 -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface SpecCardProps {
  spec: SpecItem
  index: number
}

function SpecCard({ spec, index }: SpecCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-xl border border-white/[0.06] bg-[#0A0A0A] p-4 hover:border-ktm/40 transition-all duration-300 overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,107,0,0.06),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-ktm/60">{spec.icon}</span>
          <p className="font-mono text-white/30 text-[10px] uppercase tracking-widest">{spec.label}</p>
        </div>
        <p className="font-syne font-bold text-white text-sm leading-snug">{spec.value}</p>
      </div>
    </motion.div>
  )
}

// ── Draggable 360 Bar ──────────────────────────────────────────────────────────

interface DragBarProps {
  viewCount: number
  activeView: number
  onViewChange: (index: number) => void
  onLabelClick?: (index: number) => void
}

function DragBar360({ viewCount, activeView, onViewChange, onLabelClick }: DragBarProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const getViewFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const index = Math.min(viewCount - 1, Math.floor(ratio * viewCount))
    onViewChange(index)
  }, [viewCount, onViewChange])

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    getViewFromPosition(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    getViewFromPosition(e.clientX)
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
    setIsDragging(false)
  }

  const handlePercent = ((activeView / (viewCount - 1)) * 100)

  return (
    <div className="mt-6 px-4">
      <div
        ref={trackRef}
        className="relative h-3 rounded-full bg-white/[0.06] cursor-pointer touch-none flex items-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Filled track */}
        <div
          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-ktm-lo via-ktm to-ktm-hi ${isDragging ? '' : 'transition-all duration-200'}`}
          style={{ width: `${handlePercent}%` }}
        />

        {/* Snap zone markers */}
        {Array.from({ length: viewCount }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-white/20 -translate-y-1/2"
            style={{ left: `${(i / (viewCount - 1)) * 100}%`, transform: `translateX(-50%) translateY(-50%)` }}
          />
        ))}

        {/* Drag handle */}
        <div
          className={`absolute w-6 h-6 rounded-full bg-ktm border-2 border-white/80 shadow-[0_0_16px_rgba(255,107,0,0.6)] cursor-grab active:cursor-grabbing ${isDragging ? '' : 'transition-all duration-200'}`}
          style={{ left: `${handlePercent}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </div>
      {/* Labels beneath */}
      <div className="flex justify-between mt-3">
        {BIKE_VIEWS.map((view, i) => (
          <button
            key={i}
            className={`font-mono text-[10px] tracking-wider cursor-pointer transition-colors duration-200 px-1 py-0.5 rounded ${
              i === activeView ? 'text-ktm font-bold' : 'text-white/20 hover:text-white/40'
            }`}
            onClick={() => onLabelClick ? onLabelClick(i) : onViewChange(i)}
          >
            {view.shortLabel}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function BikePage() {
  const [activeView, setActiveView] = useState(0)
  const isSpinning = useRef(false)

  const spinToView = useCallback(async (targetIndex: number) => {
    if (isSpinning.current || targetIndex === activeView) return
    isSpinning.current = true
    
    let current = activeView
    const direction = targetIndex > current ? 1 : -1
    const delay = 120 // ms per frame
    
    for (let i = current + direction; direction > 0 ? i <= targetIndex : i >= targetIndex; i += direction) {
      setActiveView(i)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
    
    isSpinning.current = false
  }, [activeView])

  const currentView = BIKE_VIEWS[activeView]

  const titleChars = 'KTM 390 DUKE'.split('')

  const handleScrollToShowcase = () => {
    const el = document.getElementById('showcase')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background: blurred SIDE-4 image */}
        <div className="absolute inset-0">
          <Image
            src={KTM_DUKE_SIDE_4}
            alt="KTM 390 Duke background"
            fill
            className="object-cover object-center scale-110 blur-sm opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(255,107,0,0.08),transparent_70%)]" />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ktm/30 bg-ktm/5 text-ktm text-xs font-mono tracking-widest mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ktm animate-pulse" />
            READY TO RACE
          </motion.div>

          {/* Animated title */}
          <div className="flex flex-wrap justify-center gap-0 overflow-hidden mb-6">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-syne font-black text-5xl md:text-7xl xl:text-8xl leading-none ${
                  char === ' ' ? 'mr-4' : ''
                } ${
                  char === 'K' || char === 'T' || char === 'M'
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-ktm-hi to-ktm'
                    : 'text-white'
                }`}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </div>

          {/* Clickable Explore button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            onClick={handleScrollToShowcase}
            className="font-grotesk text-white/40 text-lg tracking-widest uppercase hover:text-ktm transition-colors duration-300 cursor-pointer"
          >
            Explore Every Angle ↓
          </motion.button>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-ktm/60 to-transparent"
          />
          <span className="font-mono text-white/20 text-[10px] tracking-[0.3em]">SCROLL</span>
        </motion.div>
      </section>

      {/* ── INTERACTIVE SHOWCASE ─────────────────────────────────────────────── */}
      <section id="showcase" className="py-24 bg-[#030303] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,107,0,0.04),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-ktm text-xs tracking-[0.4em] uppercase mb-3">Interactive</p>
            <h2 className="font-syne font-black text-4xl md:text-5xl text-white">360° Showcase</h2>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-ktm to-transparent mx-auto" />
          </motion.div>

          {/* View selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {BIKE_VIEWS.map((view, i) => (
              <button
                key={i}
                onClick={() => spinToView(i)}
                className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
                  i === activeView
                    ? 'bg-ktm text-black font-bold shadow-[0_0_20px_rgba(255,107,0,0.4)]'
                    : 'border border-white/10 text-white/40 hover:border-ktm/40 hover:text-white/70'
                }`}
              >
                {view.shortLabel}
              </button>
            ))}
          </div>

          {/* Image + hotspots */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black aspect-[16/9] max-h-[600px]">
            {/* Glow border */}
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(255,107,0,0.04)] pointer-events-none z-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, filter: 'blur(12px)', scale: 1.04 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(12px)', scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentView.src}
                  alt={`KTM 390 Duke — ${currentView.label}`}
                  fill
                  className="object-contain p-8 drop-shadow-[0_0_50px_rgba(255,107,0,0.25)]"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Hotspots */}
            <AnimatePresence>
              {currentView.hotspots.map((hs, i) => (
                <motion.div
                  key={`${activeView}-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                  className="absolute inset-0"
                >
                  <HotspotMarker hotspot={hs} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* View label */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className="px-3 py-1.5 rounded-lg font-mono text-xs text-ktm bg-black/70 border border-ktm/30 backdrop-blur-sm">
                {currentView.label}
              </span>
            </div>
          </div>

          {/* Draggable 360° Bar */}
          <DragBar360
            viewCount={BIKE_VIEWS.length}
            activeView={activeView}
            onViewChange={setActiveView}
            onLabelClick={spinToView}
          />
        </div>
      </section>

      {/* ── FULL SPECS GRID ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-ktm text-xs tracking-[0.4em] uppercase mb-3">Technical</p>
            <h2 className="font-syne font-black text-4xl md:text-5xl text-white">Full Spec Sheet</h2>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-ktm to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FULL_SPECS.map((spec, i) => (
              <SpecCard key={spec.label} spec={spec} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BIRD'S EYE BEAST (CometCard) ─────────────────────────────────────── */}
      <section className="py-24 bg-[#030303] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(255,107,0,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <CometCard meteorCount={16} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[300px]">
                {/* Image */}
                <div className="relative min-h-[260px]">
                  <Image
                    src={KTM_TOP_VIEW_RIGHT}
                    alt="KTM 390 Duke — Top View"
                    fill
                    className="object-contain p-6 drop-shadow-[0_0_30px_rgba(255,107,0,0.3)]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col justify-center p-8">
                  <p className="font-mono text-ktm text-xs tracking-[0.3em] uppercase mb-3">Top-Down View</p>
                  <h3 className="font-syne font-black text-2xl text-white mb-3">390 Beast</h3>
                  <p className="font-grotesk text-white/40 text-sm leading-relaxed mb-6">
                   Every angle of this machine tells the same story aggressive lines, purposeful details, and a design built to be admired from every perspective.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Tank', value: '13.4L' },
                      { label: 'Seat Height', value: '820mm' },
                      { label: 'TFT Display', value: '5 inch' },
                      { label: 'Kerb Weight', value: '163 kg' },
                    ].map(spec => (
                      <div key={spec.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <p className="font-mono text-white/30 text-[10px] uppercase tracking-widest">{spec.label}</p>
                        <p className="font-syne font-bold text-white text-sm mt-0.5">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CometCard>
          </motion.div>
        </div>
      </section>

      {/* ── PERSONAL NOTE ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,107,0,0.05),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A0A0A]">
              {/* Left orange border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ktm-hi via-ktm to-ktm-lo" />

              <div className="pl-8 pr-8 py-10">
                {/* Quote */}
                <blockquote className="font-syne font-black text-2xl md:text-3xl lg:text-4xl text-white italic leading-snug mb-6">
                  &ldquo;The 390 Duke is not a forgiving machine. Neither is production software&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="h-px w-16 bg-ktm/40 mb-6" />

                {/* Body */}
                <div className="space-y-4 font-grotesk text-white/50 text-sm leading-relaxed max-w-2xl">
                  <p>
                    The 390 Duke delivers 43.5 horsepower through a 373.3cc single-cylinder engine. It is
                    lightweight, aggressive, and demands absolute precision from its rider. A single lazy
                    throttle input at the wrong moment, and the trellis frame lets you know immediately.
                    There is no room for half-measures.
                  </p>
                  <p>
That is exactly how I approach software engineering. Every system I build follows the same principle: strip away the unnecessary, optimize what remains, and make every component behave exactly as intended. Whether it is a real-time telemetry pipeline processing UDP packets at wire speed or an AI document editor streaming OpenAI completions into a live editor, the philosophy is the same. Precision is non-negotiable, every decision has a consequence, and the end result has to perform predictably under pressure.

                  </p>
                  <p>
                    The Duke taught me that the best machines are built with purpose, not compromise. The
                    software I write reflects that. Fast, focused, and engineered to deliver when it matters.
                  </p>
                  <p className="text-white/30 font-mono text-xs tracking-widest uppercase">
                    — Anirudh A Tembe · KTM 390 Duke · Bangalore
                  </p>
                </div>
              </div>

              {/* Background decorative text */}
              <div className="absolute bottom-4 right-6 font-syne font-black text-[80px] text-white/[0.02] leading-none select-none pointer-events-none">
                DUKE
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BACK BUTTON ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-black relative">
        <div className="relative z-10 max-w-6xl mx-auto px-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/10 text-white/50 font-grotesk text-sm hover:border-ktm/50 hover:text-ktm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,0,0.1)]"
            >
              <motion.span
                animate={{ x: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowLeft size={16} />
              </motion.span>
              Back to Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
