'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'

const BIKE_IMAGES = [
  { src: '/KTM-RIGHT-FRONT.png', label: 'Front Angle' },
  { src: '/KTM-SIDE-RIGHT.png', label: 'Side Profile' },
  { src: '/KTM-LEFT-FRONT.png', label: 'Head-On' },
]

const WORDS = ['Software', 'Developer', '·', 'DevOPS', '·', 'FullStack', 'AI']

const SPECS = [
  { label: 'Engine', value: '373.3cc LC Single Cylinder', skill: 'Software Developer' },
  { label: 'Power', value: '43.5 HP @ 9,000 RPM', skill: 'Python · AWS' },
  { label: 'Torque', value: '37 Nm @ 7,000 RPM', skill: 'React · TypeScript' },
  { label: '0–100', value: '5.5 sec', skill: 'FastAPI · Node.js' },
  { label: 'Top Speed', value: '171 km/h', skill: 'OpenAI · RAG' },
]

export default function Hero() {
  const [activeImg, setActiveImg] = useState(0)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  }
  const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-black">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(255,107,0,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* LEFT */}
        <div className="flex flex-col gap-8">


          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-syne font-black text-5xl md:text-6xl xl:text-7xl leading-[0.95] text-white"
          >
            Anirudh
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ktm via-ktm-hi to-ktm-lo">
              A Tembe
            </span>
          </motion.h1>

          {/* Subtitle words */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-1.5 text-white/50 font-grotesk text-base"
          >
            {WORDS.map((word, i) => (
              <motion.span key={i} variants={wordVariants}>
                {word === '·' ? <span className="text-ktm">{word}</span> : word}
              </motion.span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/40 font-grotesk text-sm leading-relaxed max-w-md"
          >
            Building AI systems that scale. I build software as fast as the 390.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ktm text-black font-syne font-bold text-sm hover:bg-ktm-hi transition-all duration-200 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_40px_rgba(255,107,0,0.5)]"
            >
              View Projects <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/resume.pdf" download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/70 font-grotesk text-sm hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <Download size={14} /> Resume
            </a>
          </motion.div>

          {/* Spec Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="glass-orange rounded-2xl p-5 animate-pulse-glow max-w-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-ktm/30" />
              <p className="font-mono text-ktm text-[10px] tracking-[0.3em] uppercase">KTM 390 Duke</p>
              <div className="h-px flex-1 bg-ktm/30" />
            </div>
            <div className="space-y-2">
              {SPECS.map(({ label, value, skill }) => (
                <div key={label} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2">
                  <span className="font-mono text-white/30 text-xs">{label}</span>
                  <span className="font-mono text-white/80 text-xs">{value}</span>
                  <span className="font-mono text-ktm/70 text-[10px] text-right">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Bike images */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center gap-4"
        >
          {/* Main image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 border border-white/[0.04]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={BIKE_IMAGES[activeImg].src}
                  alt={`KTM 390 Duke — ${BIKE_IMAGES[activeImg].label}`}
                  fill
                  className="object-contain p-4 drop-shadow-[0_0_40px_rgba(255,107,0,0.35)]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Orange corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-ktm/20 to-transparent rounded-bl-full" />
          </div>

          {/* Image selector buttons */}
          <div className="flex gap-2">
            {BIKE_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
                  i === activeImg
                    ? 'bg-ktm text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.5)]'
                    : 'border border-white/10 text-white/40 hover:border-ktm/40 hover:text-white/70'
                }`}
              >
                {img.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-white/20 text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-ktm/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
