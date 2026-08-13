'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    title: 'SimCuts',
    period: 'Jun 2026 – Present',
    company: 'Lazy Idli Pvt. Ltd.',
    description: 'Real-time telemetry-driven multi-sim media automation platform. Ingests F1 24 UDP telemetry for live lap detection and highlight zone capture. GPU-accelerated video rendering with FFmpeg and NVIDIA NVENC, automated OBS recording, and zero-latency live streaming via MediaMTX to WebRTC endpoints. Deployed across a multi-PC LAN architecture with AWS S3 and CloudFront for CDN delivery.',
    stack: ['Python', 'FastAPI', 'React', 'Vite', 'Socket.IO', 'FFmpeg', 'NVENC', 'WebRTC', 'MediaMTX', 'AWS S3'],
    stat: 'Multi-media Automation',
    color: '#10B981',
  },
  {
    title: 'Teho-X',
    period: 'Mar 2026 - May 2026',
    company: 'Lazy Idli Pvt. Ltd.',
    description: 'Multi-platform tournament organising and management system supporting 10+ competitive game titles. Features a real-time score and points ranking engine with tiered reward distribution, Razorpay payment integration with dynamic discount logic, and a live leaderboard updated in real time across mobile and web clients.',
    stack: ['FastAPI', 'React Native', 'React', 'Razorpay', 'MongoDB', 'Expo'],
    stat: '3,000+ Monthly Users',
    color: '#FF6B00',
  },
  {
    title: 'QuikESG',
    period: 'Dec 2025 – Feb 2026',
    company: 'Lazy Idli Pvt. Ltd.',
    description: 'AI-powered SaaS document platform for ESG reporting. Streams OpenAI completions directly into a Lexical rich text editor through Markdown parsing and node-level transformations. Orchestrates a multi-source RAG pipeline that parses, chunks, and embeds documents into a pgvector index for semantic retrieval and structured report generation.',
    stack: ['OpenAI', 'FastAPI', 'React', 'PostgreSQL', 'pgvector', 'Lexical'],
    stat: 'AI SaaS',
    color: '#8B5CF6',
  },
  {
    title: 'Chat & Booking System',
    period: 'Jul 2025 – Nov 2025',
    company: 'Lazy Idli Pvt. Ltd.',
    description: 'Booking and customer engagement platform built for the Forge fitness center. Features calendar-based scheduling workflows with role-based access control and a Redis caching layer that reduced API latency by 800ms. Renders hundreds of interactive timeslot cells for real-time space occupancy tracking. Integrated a standalone real-time chat microservice using Ably for direct customer communication with presence detection and sub-100ms message delivery.',
    stack: ['FastAPI', 'Ably', 'Redis', 'Node.js', 'React', 'TypeScript', 'MongoDB'],
    stat: 'Real-time Chat & Concurrent Bookings',
    color: '#3B82F6',
  },
]

interface Project {
  title: string
  period: string
  company: string
  description: string
  stack: string[]
  stat: string
  color: string
}

function DirectionAwareCard({ project, index }: { project: Project, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [overlay, setOverlay] = useState({ x: 0, y: 0, opacity: 0 })
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setOverlay({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setOverlay(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 flex flex-col gap-4 group cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Direction-aware glow follow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: overlay.opacity,
          background: `radial-gradient(300px circle at ${overlay.x}px ${overlay.y}px, ${project.color}12, transparent 60%)`,
        }}
      />

      {/* Top border glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
          opacity: overlay.opacity,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-syne font-black text-xl text-white">{project.title}</h3>
          <p className="font-mono text-[11px] text-white/30 mt-0.5">{project.company}, {project.period}</p>
        </div>
        <div
          className="px-2.5 py-1 rounded-lg font-mono text-xs font-bold"
          style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
        >
          {project.stat}
        </div>
      </div>

      {/* Description */}
      <p className="font-grotesk text-white/50 text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md font-mono text-[10px] text-white/40 bg-white/[0.03] border border-white/[0.05] group-hover:border-white/[0.1] transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="projects" className="py-28 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_80%_50%,rgba(59,130,246,0.04)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-ktm text-xs tracking-[0.4em] uppercase mb-3">Quality Work</p>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white">Projects</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-ktm to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <DirectionAwareCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
