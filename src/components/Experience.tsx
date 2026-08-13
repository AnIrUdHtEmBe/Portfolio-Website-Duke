'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TracingBeam } from '@/components/ui/TracingBeam'
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react'

const TIMELINE = [
  {
    role: 'Software Developer',
    company: 'Lazy Idli Pvt. Ltd.',
    period: 'Sep 2025 – Present',
    location: 'Bangalore',
    type: 'work',
    bullets: [
      'Built a streaming AI document editor for QuikESG using OpenAI APIs, transforming structured Markdown outputs into Lexical nodes for real-time assisted editing and reducing response latency by 4 seconds per request',
      'Engineered a Retrieval-Augmented Generation pipeline using OpenAI embeddings and pgvector with optimized chunked indexing and contextual prompt injection, achieving approximately 80% accuracy against human-written ESG documents',
      'Reduced AWS infrastructure costs by 98 percent, from $300 per month to under $5 per month, by migrating media delivery to S3 with CloudFront CDN and eliminating EC2 bandwidth egress',
      'Managed production infrastructure on AWS EC2 with Nginx reverse proxy, automated SSL provisioning via Certbot, IP-restricted PostgreSQL access, and Cloudflare CDN, maintaining 99.9% uptime',
      'Contributed to a QR-based workflow tracking system for TCIL, implementing stage-wise process logging to generate granular datasets for bottleneck analysis and processing time optimization',
      'Designed real-time multi-channel messaging infrastructure using Ably Chat, enabling presence detection and channel-based communication with approximately 100ms end-to-end message latency',
      'Architected SimCuts, a real-time multi-sim media automation platform with a Python telemetry pipeline that ingests F1 24 UDP packets for lap detection, flashback correction, and highlight zone capture',
      'Built a GPU-accelerated video rendering pipeline using FFmpeg and NVIDIA NVENC with automated OBS recording via WebSocket, supporting 5 distinct render presets with fully automated slice-and-deliver on race finish',
      'Engineered zero-latency live streaming through MediaMTX for RTMP to WebRTC delivery, deployed across a multi-PC LAN architecture with AWS S3 and CloudFront powering the recorded video CDN',
    ],
    tags: ['OpenAI', 'FastAPI', 'pgvector', 'AWS', 'Ably', 'SimCuts', 'FFmpeg', 'WebRTC'],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Lazy Idli Pvt. Ltd.',
    period: 'Jul 2025 – Aug 2025',
    location: 'Bangalore',
    type: 'work',
    bullets: [
      'Implemented responsive web and mobile frontend interfaces from Figma designs using React, collaborating via GitHub workflows within the team to deliver scalable UI components with sub-200ms render performance',
      'Scaled Python and Express backend features and API integrations, managing schema migrations via Alembic and debugging production issues to ensure high availability across SaaS workflows',
    ],
    tags: ['React', 'Python', 'Express', 'Alembic'],
  },
  {
    role: 'BTech Electronics & Communication Engineering',
    company: 'Presidency University, Bangalore',
    period: 'Dec 2021 – May 2025',
    location: 'Bangalore',
    type: 'edu',
    bullets: ['CGPA: 7.95 / 10.0'],
    tags: ['ECE', 'Electronics', 'Communication', 'Python', 'DSA', 'C', 'MATLAB', 'R Studio'],
  },
]

interface TimelineEntryProps {
  entry: typeof TIMELINE[0]
  index: number
}

function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 last:mb-0"
    >
      <div className="relative rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 hover:border-ktm/20 transition-all duration-300 group">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
          <div className={`p-2.5 rounded-xl flex-shrink-0 ${entry.type === 'work' ? 'bg-ktm/10 border border-ktm/20' : 'bg-violet-500/10 border border-violet-500/20'}`}>
            {entry.type === 'work'
              ? <Briefcase size={16} className="text-ktm" />
              : <GraduationCap size={16} className="text-violet-400" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-syne font-bold text-white text-lg">{entry.role}</h3>
            <p className={`font-mono text-sm ${entry.type === 'work' ? 'text-ktm' : 'text-violet-400'}`}>{entry.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-white/30 font-mono text-xs">
              <Calendar size={11} />{entry.period}
            </div>
            <div className="flex items-center gap-1.5 text-white/20 font-mono text-xs">
              <MapPin size={11} />{entry.location}
            </div>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-4">
          {entry.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-white/50 font-grotesk text-sm">
              <span className="text-ktm/60 flex-shrink-0 mt-1.5">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md font-mono text-[10px] text-white/40 bg-white/[0.03] border border-white/[0.05] group-hover:border-ktm/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="experience" className="py-28 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(139,92,246,0.04)_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-ktm text-xs tracking-[0.4em] uppercase mb-3">Work History</p>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white">Experience</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-ktm to-transparent mx-auto" />
        </motion.div>

        <TracingBeam>
          {TIMELINE.map((entry, i) => (
            <TimelineEntry key={i} entry={entry} index={i} />
          ))}
        </TracingBeam>
      </div>
    </section>
  )
}
