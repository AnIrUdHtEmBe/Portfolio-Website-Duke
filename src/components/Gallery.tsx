'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExpandableCardGrid, type ExpandableCardItem } from '@/components/ui/ExpandableCard'
import { CometCard } from '@/components/ui/CometCard'
import Image from 'next/image'
import KTM_DUKE_SIDE_4 from '../../public/KTM-DUKE-SIDE-4.png'
import KTM_RIGHT_FRONT from '../../public/KTM-RIGHT-FRONT.png'
import KTM_SIDE_RIGHT from '../../public/KTM-SIDE-RIGHT.png'
import KTM_LEFT_FRONT from '../../public/KTM-LEFT-FRONT.png'
import KTM_TOP_VIEW_RIGHT from '../../public/KTM-TOP-VIEW-RIGHT.png'

const BIKE_CARDS: ExpandableCardItem[] = [
  {
    id: 'side-4',
    title: 'Duke — Signature Stance',
    subtitle: 'Side Profile View',
    image: KTM_DUKE_SIDE_4,
    category: 'Side View',
    description: 'The KTM 390 Duke in its most iconic pose. The chromoly steel trellis frame and underbelly exhaust system define its aggressive stance.',
    specs: [
      { label: 'Frame', value: 'Chromoly Steel Trellis' },
      { label: 'Exhaust', value: 'Underbelly System' },
      { label: 'Seat Height', value: '820mm' },
      { label: 'Wet Weight', value: '163 kg' },
      { label: 'Wheelbase', value: '1,357mm' },
      { label: 'Suspension', value: 'WP Apex USD + Monoshock' },
    ],
  },
  {
    id: 'right-front',
    title: 'Duke — Aggressive Angle',
    subtitle: 'Right Front 3/4',
    image: KTM_RIGHT_FRONT,
    category: '3/4 Front',
    description: 'Full LED DRL headlight and the iconic KTM trellis frame on display. The 43mm inverted USD forks and 4-piston radial caliper mean serious stopping power.',
    specs: [
      { label: 'Front Brake', value: '320mm Disc, Bybre 4-Piston' },
      { label: 'Front Fork', value: 'WP Apex USD 43mm' },
      { label: 'Front Tire', value: '110/70 R17 Metzeler' },
      { label: 'Headlight', value: 'Full LED DRL' },
      { label: 'Rake', value: '63.5°' },
      { label: 'Trail', value: '103.5mm' },
    ],
  },
  {
    id: 'side-right',
    title: 'Duke — Side Right',
    subtitle: 'Lateral View',
    image: KTM_SIDE_RIGHT,
    category: 'Side View',
    description: 'The 373.2cc single-cylinder liquid-cooled engine delivers 43.5 HP at 9,000 RPM. The WP Monoshock rear suspension handles every corner with precision.',
    specs: [
      { label: 'Engine', value: '373.2cc LC Single' },
      { label: 'Power', value: '43.5 HP @ 9,000 RPM' },
      { label: 'Torque', value: '37 Nm @ 7,000 RPM' },
      { label: 'Rear Shock', value: 'WP Monoshock' },
      { label: 'Fuel Tank', value: '13.4 Litres' },
      { label: 'Top Speed', value: '167 km/h' },
    ],
  },
  {
    id: 'left-front',
    title: 'Duke — Left Approach',
    subtitle: 'Left Front 3/4',
    image: KTM_LEFT_FRONT,
    category: '3/4 Front',
    description: 'Launch Control, Traction Control, and Ride Modes — the 390 Duke punches well above its class with electronics borrowed from KTM\'s superbike lineup.',
    specs: [
      { label: 'Electronics', value: 'ABS + Traction Control' },
      { label: 'Display', value: '5" Full-Color TFT' },
      { label: 'Ride Modes', value: 'Sport, Street, Rain' },
      { label: 'Launch Ctrl', value: 'Yes' },
      { label: '0–100', value: '5.5 seconds' },
      { label: 'Gearbox', value: '6-Speed + Quickshifter' },
    ],
  },
]

export default function Gallery() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })
  const cometRef = useRef(null)
  const cometInView = useInView(cometRef, { once: true, margin: '-60px' })

  return (
    <section id="garage" className="py-28 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(255,107,0,0.04)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-ktm text-xs tracking-[0.4em] uppercase mb-3">The Machine</p>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white">The Garage</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-ktm to-transparent mx-auto" />
          <p className="mt-4 text-white/30 font-grotesk text-sm">Tap any card to see full specs</p>
        </motion.div>

        {/* Expandable Cards */}
        <ExpandableCardGrid items={BIKE_CARDS} />

        {/* Comet Card — Top View Feature */}
        <motion.div
          ref={cometRef}
          initial={{ opacity: 0, y: 32 }}
          animate={cometInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8"
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
                <h3 className="font-syne font-black text-2xl text-white mb-3">Bird&apos;s Eye Beast</h3>
                <p className="font-grotesk text-white/40 text-sm leading-relaxed mb-6">
                  From above, the 13.4L fuel tank and single-piece race seat tell the full story of this machine&apos;s purpose.
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
  )
}
